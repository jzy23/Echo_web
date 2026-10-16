const fs = require("node:fs");
const path = require("node:path");

function loadPlaywright() {
  const candidates = [
    process.env.PLAYWRIGHT_MODULE_PATH,
    "playwright",
    path.resolve(path.dirname(process.execPath), "..", "node_modules", "playwright"),
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch (error) {
      if (error.code !== "MODULE_NOT_FOUND") throw error;
    }
  }

  throw new Error(
    "Playwright is unavailable. Install it in the Node environment or set PLAYWRIGHT_MODULE_PATH to the Playwright module directory.",
  );
}

const { chromium } = loadPlaywright();


const previewUrl = process.argv[2] || "http://127.0.0.1:5173";
const outputDirectory = process.argv[3] || path.join(process.cwd(), "artifacts");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function assertInternalAnchorsResolve(page) {
  const missingTargets = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.flatMap((link) => {
      const href = link.getAttribute("href");
      const id = href ? decodeURIComponent(href.slice(1)) : "";
      return id && document.getElementById(id) ? [] : [href || "(empty href)"];
    }),
  );

  assert(
    missingTargets.length === 0,
    `Internal anchor targets are missing: ${missingTargets.join(", ")}`,
  );
}

async function assertPrimarySectionsExist(page) {
  const sectionIds = [
    "echosim",
    "workflow",
    "capabilities",
    "applications",
    "demo",
    "technology",
    "contact",
    "about",
  ];
  const missingSections = await page.evaluate(
    (ids) => ids.filter((id) => !document.getElementById(id)),
    sectionIds,
  );

  assert(
    missingSections.length === 0,
    `Main page sections are missing: ${missingSections.join(", ")}`,
  );
}

async function assertDemoLink(page) {
  const demoLink = page.locator("#demo a.demo-trigger");
  assert((await demoLink.count()) === 1, "Demo action is not a semantic link");
  assert(await demoLink.evaluate((link) => link.tabIndex >= 0), "Demo link is not keyboard focusable");

  await demoLink.focus();
  assert(await demoLink.evaluate((link) => document.activeElement === link), "Demo link cannot receive focus");
  const focusOutline = await demoLink.evaluate((link) => {
    const styles = getComputedStyle(link);
    return { style: styles.outlineStyle, width: Number.parseFloat(styles.outlineWidth) };
  });
  assert(
    focusOutline.style !== "none" && focusOutline.width >= 2,
    "Demo link does not have a clear focus indicator",
  );

  const href = await demoLink.getAttribute("href");
  assert(href === "/media/vehicle-comparison.mp4", `Unexpected demo video URL: ${href}`);
  const response = await page.request.get(new URL(href, previewUrl).href);
  assert(response.ok(), `Demo video is unavailable: HTTP ${response.status()}`);
  await response.dispose();
}

async function loadLazyImagesForScreenshot(page) {
  await page.evaluate(async () => {
    const step = Math.max(Math.floor(window.innerHeight * 0.75), 300);
    const bottom = document.documentElement.scrollHeight - window.innerHeight;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    for (let offset = 0; offset <= bottom; offset += step) {
      window.scrollTo(0, offset);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  });

  await page.waitForTimeout(500);
  const unloadedImages = await page.locator('img[loading="lazy"]').evaluateAll((images) =>
    images
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.getAttribute("src")),
  );
  assert(
    unloadedImages.length === 0,
    `Lazy-loaded images failed to load: ${unloadedImages.join(", ")}`,
  );
}

async function inspectPage(page, screenshotName) {
  await page.goto(previewUrl, { waitUntil: "networkidle" });
  await page.locator("#hero-title").waitFor();
  await assertInternalAnchorsResolve(page);
  await assertPrimarySectionsExist(page);

  const slideCount = await page.locator(".image-stage img").count();
  const firstCaption = await page.locator(".visual-caption strong").textContent();
  const titleBefore = await page.locator("#hero-title").boundingBox();

  assert(slideCount === 3, `Expected 3 slides, found ${slideCount}`);
  assert(firstCaption?.includes("整车动力学"), "The first slide is not active");
  assert((await page.locator('[role="tab"]').count()) === 0, "Carousel uses incomplete tab semantics");
  assert(
    (await page.getByRole("button", { name: /显示第 1 张/ }).getAttribute("aria-current")) ===
      "true",
    "Active carousel indicator is not exposed",
  );

  await page.getByRole("button", { name: "下一张" }).click();
  await page.waitForTimeout(750);

  const secondCaption = await page.locator(".visual-caption strong").textContent();
  const titleAfter = await page.locator("#hero-title").boundingBox();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  const alignment = await page.evaluate(() => {
    const header = document.querySelector(".header-inner").getBoundingClientRect();
    const hero = document.querySelector(".hero-carousel").getBoundingClientRect();
    return {
      leftDifference: Math.abs(header.left - hero.left),
      rightDifference: Math.abs(
        document.documentElement.clientWidth - header.right -
          (document.documentElement.clientWidth - hero.right),
      ),
    };
  });

  assert(secondCaption?.includes("底盘系统建模"), "Next-slide control did not update the image");
  assert(titleBefore?.x === titleAfter?.x, "Fixed hero copy moved when the slide changed");
  assert(!overflow, "The page has horizontal overflow");
  assert(alignment.leftDifference < 1, "Hero does not align with the logo-side header edge");
  assert(alignment.rightDifference < 1, "Hero left and right margins are not symmetrical");

  await page.screenshot({ path: path.join(outputDirectory, screenshotName), fullPage: false });

  if (screenshotName.includes("desktop")) {
    await page.getByRole("button", { name: /显示第 3 张/ }).click();
    await page.waitForTimeout(750);
    const thirdCaption = await page.locator(".visual-caption strong").textContent();
    assert(thirdCaption?.includes("场景与工况"), "Third slide did not render");
    await page.screenshot({
      path: path.join(outputDirectory, "echosim-hero-desktop-third-slide.png"),
      fullPage: false,
    });

    await page.getByRole("button", { name: /显示第 1 张/ }).click();
    await page.locator("#hero-gallery").dispatchEvent("pointerdown", {
      isPrimary: true,
      clientX: 240,
    });
    await page.locator("#hero-gallery").dispatchEvent("pointercancel", { isPrimary: true });
    await page.waitForTimeout(5900);
    const captionAfterCancel = await page.locator(".visual-caption strong").textContent();
    assert(captionAfterCancel?.includes("底盘系统建模"), "Autoplay did not recover after pointer cancel");
  }
}

async function main() {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await inspectPage(desktop, "echosim-hero-desktop.png");
    await assertDemoLink(desktop);
    await loadLazyImagesForScreenshot(desktop);
    await desktop.screenshot({
      path: path.join(outputDirectory, "echosim-homepage-desktop-full.png"),
      fullPage: true,
    });

    const mobile = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    await inspectPage(mobile, "echosim-hero-mobile.png");
    await loadLazyImagesForScreenshot(mobile);
    await mobile.screenshot({
      path: path.join(outputDirectory, "echosim-homepage-mobile-full.png"),
      fullPage: true,
    });

    await mobile.getByRole("button", { name: "打开导航菜单" }).click();
    assert(await mobile.locator("#mobile-menu").isVisible(), "Mobile navigation did not open");
    await assertInternalAnchorsResolve(mobile);

    const loadingPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await loadingPage.route("**/api/site-config/", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      await route.continue();
    });
    await loadingPage.goto(previewUrl, { waitUntil: "domcontentloaded" });
    assert(await loadingPage.locator('[aria-busy="true"]').isVisible(), "Loading skeleton was not shown");
    await loadingPage.screenshot({
      path: path.join(outputDirectory, "echosim-config-loading.png"),
      fullPage: false,
    });
    await loadingPage.locator("#hero-title").waitFor();

    const errorPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await errorPage.route("**/api/site-config/", (route) =>
      route.fulfill({ status: 503, contentType: "application/json", body: "{}" }),
    );
    await errorPage.goto(previewUrl, { waitUntil: "networkidle" });
    assert(await errorPage.getByRole("alert").isVisible(), "Configuration error state was not shown");
    assert(
      await errorPage.getByRole("button", { name: "重新加载" }).isVisible(),
      "Configuration error state has no retry action",
    );
    await errorPage.screenshot({
      path: path.join(outputDirectory, "echosim-config-error.png"),
      fullPage: false,
    });

    console.log(
      "Visual QA passed: responsive layout, internal anchors, demo link, main sections, carousel semantics, pointer-cancel recovery, loading skeleton, error state, and mobile menu.",
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
