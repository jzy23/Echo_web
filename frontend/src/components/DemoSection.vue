<script setup>
import demoImage from "../assets/applications/passenger-960.jpg";
</script>

<template>
  <section
    id="demo"
    class="demo-section"
    :style="{ backgroundImage: `url(${demoImage})` }"
    aria-labelledby="demo-title"
  >
    <div class="demo-overlay" aria-hidden="true"></div>
    <div class="demo-inner section-inner">
      <div class="demo-copy">
        <span class="section-eyebrow">DEMO</span>
        <h2 id="demo-title" class="section-title">看见运动，也看清系统关系</h2>
        <p class="section-description">
          通过真实的车辆仿真场景，直观呈现整车运动与多系统的耦合关系，<br class="desktop-break" />
          帮助研发团队更早发现问题、验证方案。
        </p>
        <a
          class="demo-trigger"
          href="/media/vehicle-comparison.mp4"
          target="_blank"
          rel="noopener"
          aria-label="观看产品演示"
        >
          <span class="play-icon" aria-hidden="true">▶</span>
          <span>观看产品演示</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo-section {
  position: relative;
  min-height: 282px;
  overflow: hidden;
  --section-eyebrow-color: #70cbed;
  --section-title-color: #ffffff;
  --section-title-fluid-size: 3.35vw;
  --section-title-max-size: 46px;
  --section-title-font-weight: 740;
  --section-title-line-height: 1.15;
  --section-description-color: #c3d6e9;
  --section-description-font-size: 13px;
  --section-description-margin-top: 13px;
  background-color: #082c50;
  background-position: center right;
  background-size: cover;
  color: #ffffff;
  isolation: isolate;
}

.demo-overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(4 25 52 / 97%) 0%, rgb(5 34 66 / 88%) 37%, rgb(5 34 66 / 28%) 73%, rgb(5 34 66 / 12%) 100%),
    linear-gradient(0deg, rgb(4 23 45 / 25%), transparent 45%);
}

.demo-inner {
  display: flex;
  align-items: center;
  min-height: 282px;
}

.demo-copy {
  max-width: 580px;
  padding-block: 38px;
}

.demo-copy .section-description {
  max-width: 500px;
  line-height: 1.7;
}

.demo-trigger {
  display: inline-flex;
  align-items: center;
  margin-top: 17px;
  gap: 10px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 650;
  text-decoration: none;
  border-radius: 4px;
  transition: color 180ms ease, transform 180ms ease;
}

.demo-trigger:hover,
.demo-trigger:focus-visible {
  color: #80daf7;
  transform: translateY(-1px);
}

.demo-trigger:focus {
  outline: 2px solid #23b7e5;
  outline-offset: 4px;
}

.play-icon {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  padding-left: 2px;
  border: 1px solid rgb(255 255 255 / 88%);
  border-radius: 50%;
  font-size: 12px;
}

@media (max-width: 680px) {
  .demo-section {
    min-height: 350px;
    background-position: 63% center;
  }

  .demo-overlay {
    background: linear-gradient(90deg, rgb(4 25 52 / 96%) 0%, rgb(5 34 66 / 70%) 64%, rgb(5 34 66 / 23%) 100%);
  }

  .demo-inner {
    min-height: 350px;
  }

  .demo-copy {
    padding-block: 34px;
  }

}
</style>
