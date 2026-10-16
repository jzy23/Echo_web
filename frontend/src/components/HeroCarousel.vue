<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { heroSlides } from "../config/hero";


const AUTOPLAY_DELAY = 5600;
const SWIPE_THRESHOLD = 44;

const activeIndex = ref(0);
const touchStartX = ref(null);
let autoplayTimer;
let reduceMotionQuery;

const activeSlide = computed(() => heroSlides[activeIndex.value]);

function selectSlide(index, restart = true) {
  activeIndex.value = (index + heroSlides.length) % heroSlides.length;
  if (restart) startAutoplay();
}

function nextSlide(restart = true) {
  selectSlide(activeIndex.value + 1, restart);
}

function previousSlide() {
  selectSlide(activeIndex.value - 1);
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
  autoplayTimer = undefined;
}

function startAutoplay() {
  stopAutoplay();
  if (reduceMotionQuery?.matches) return;
  autoplayTimer = window.setInterval(() => nextSlide(false), AUTOPLAY_DELAY);
}

function handleFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) startAutoplay();
}

function handlePointerDown(event) {
  if (!event.isPrimary) return;
  touchStartX.value = event.clientX;
  stopAutoplay();
}

function handlePointerUp(event) {
  if (touchStartX.value === null) return;
  const distance = event.clientX - touchStartX.value;
  touchStartX.value = null;

  if (Math.abs(distance) >= SWIPE_THRESHOLD) {
    distance < 0 ? nextSlide() : previousSlide();
  } else {
    startAutoplay();
  }
}

function handlePointerCancel() {
  touchStartX.value = null;
  startAutoplay();
}

function handleVisibilityChange() {
  document.hidden ? stopAutoplay() : startAutoplay();
}

onMounted(() => {
  reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  startAutoplay();
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeUnmount(() => {
  stopAutoplay();
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<template>
  <section
    id="echosim"
    class="hero-carousel"
    aria-labelledby="hero-title"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @focusin="stopAutoplay"
    @focusout="handleFocusOut"
    @keydown.left.prevent="previousSlide"
    @keydown.right.prevent="nextSlide"
  >
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="hero-inner">
      <div class="hero-copy">
        <span class="hero-eyebrow">VEHICLE SIMULATION PLATFORM</span>
        <h1 id="hero-title"><span>EchoSim</span> 车辆仿真平台</h1>
        <p class="hero-tagline">让模型驱动车辆研发</p>
        <p class="hero-summary">统一建模 · 动力学仿真 · 场景测试 · 闭环验证</p>

        <div class="hero-actions">
          <a class="primary-action" href="#contact">
            <span>联系技术团队</span>
            <svg aria-hidden="true" viewBox="0 0 18 18">
              <path d="M3.5 9h10M10 5.5 13.5 9 10 12.5" />
            </svg>
          </a>
          <a
            class="secondary-action"
            href="/media/vehicle-comparison.mp4"
            target="_blank"
            rel="noopener"
          >
            <span class="play-icon" aria-hidden="true">
              <svg viewBox="0 0 18 18"><path d="m7 5 6 4-6 4Z" /></svg>
            </span>
            <span>观看仿真演示</span>
          </a>
        </div>

        <div class="slide-indicators" role="group" aria-label="选择展示画面">
          <button
            v-for="(slide, index) in heroSlides"
            :key="slide.src"
            type="button"
            :aria-current="index === activeIndex ? 'true' : undefined"
            :aria-label="`显示第 ${index + 1} 张：${slide.label}`"
            @click="selectSlide(index)"
          >
            <span></span>
          </button>
        </div>
      </div>

      <div
        id="hero-gallery"
        class="visual-panel"
        role="group"
        aria-roledescription="轮播图"
        :aria-label="`${activeIndex + 1} / ${heroSlides.length}：${activeSlide.label}`"
        @pointerdown="handlePointerDown"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerCancel"
      >
        <div class="image-stage">
          <img
            v-for="(slide, index) in heroSlides"
            :key="slide.src"
            :src="slide.src"
            :alt="index === activeIndex ? slide.alt : ''"
            :aria-hidden="index !== activeIndex"
            :class="{ active: index === activeIndex }"
            :style="{
              objectPosition: slide.objectPosition,
              '--slide-zoom': slide.zoom,
            }"
            :loading="index === 0 ? 'eager' : 'lazy'"
          />
        </div>

        <div class="visual-caption" aria-live="polite">
          <strong>{{ activeSlide.label }}</strong>
          <small>{{ activeSlide.detail }}</small>
        </div>

        <div class="carousel-controls">
          <button type="button" aria-label="上一张" @click="previousSlide">
            <svg aria-hidden="true" viewBox="0 0 18 18">
              <path d="m11 4-5 5 5 5" />
            </svg>
          </button>
          <button type="button" aria-label="下一张" @click="nextSlide">
            <svg aria-hidden="true" viewBox="0 0 18 18">
              <path d="m7 4 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-carousel {
  position: relative;
  width: min(calc(100% - 48px), 1240px);
  min-height: clamp(560px, calc(82svh - 72px), 680px);
  margin-inline: auto;
  overflow: hidden;
  border: 1px solid rgb(82 143 195 / 20%);
  border-radius: 10px;
  background:
    radial-gradient(circle at 77% 42%, rgb(20 87 200 / 30%), transparent 34%),
    linear-gradient(112deg, #06182f 0%, #082c55 52%, #06182f 100%);
  box-shadow: 0 22px 54px rgb(11 35 61 / 15%);
  color: #ffffff;
  isolation: isolate;
}

.hero-carousel::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(4 19 39 / 98%) 0%, rgb(4 22 44 / 92%) 38%, transparent 68%),
    linear-gradient(180deg, transparent 72%, rgb(3 15 31 / 54%));
  content: "";
  pointer-events: none;
}

.hero-grid {
  position: absolute;
  z-index: -1;
  right: -10%;
  bottom: -34%;
  width: 72%;
  height: 58%;
  opacity: 0.18;
  background-image:
    linear-gradient(rgb(72 183 235 / 42%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(72 183 235 / 42%) 1px, transparent 1px);
  background-size: 38px 38px;
  transform: perspective(520px) rotateX(62deg) rotateZ(-4deg);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 22%, #000 74%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 22%, #000 74%, transparent);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(390px, 0.84fr) minmax(0, 1.42fr);
  align-items: center;
  width: 100%;
  min-height: inherit;
  margin-inline: auto;
  padding-left: clamp(36px, 4.3vw, 68px);
  gap: clamp(28px, 4vw, 72px);
}

.hero-copy {
  position: relative;
  z-index: 3;
  padding-block: 72px 56px;
}

.hero-eyebrow {
  display: block;
  margin-bottom: 18px;
  color: #62c7ed;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

h1 {
  max-width: 520px;
  margin: 0;
  font-size: clamp(43px, 4.6vw, 68px);
  font-weight: 720;
  letter-spacing: -0.055em;
  line-height: 1.12;
}

h1 span {
  display: block;
  letter-spacing: -0.035em;
}

.hero-tagline {
  margin: 22px 0 0;
  color: #eef7ff;
  font-size: clamp(22px, 2.1vw, 30px);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.hero-summary {
  margin: 14px 0 0;
  color: #a8bfd7;
  font-size: 15px;
  letter-spacing: 0.02em;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  margin-top: 34px;
  gap: 12px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 20px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
}

.primary-action {
  gap: 12px;
  background: #1476ef;
  box-shadow: 0 14px 30px rgb(0 61 157 / 28%);
}

.primary-action:hover,
.primary-action:focus-visible {
  background: #2486ff;
  transform: translateY(-2px);
}

.primary-action svg,
.carousel-controls svg {
  width: 18px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.secondary-action {
  gap: 10px;
  border: 1px solid rgb(116 198 239 / 62%);
  background: rgb(7 38 73 / 58%);
  backdrop-filter: blur(10px);
}

.secondary-action:hover,
.secondary-action:focus-visible {
  border-color: #7cd7f7;
  background: rgb(11 61 111 / 78%);
  transform: translateY(-2px);
}

.play-icon {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  background: #ffffff;
  color: #0b4b83;
}

.play-icon svg {
  width: 14px;
  fill: currentcolor;
}

.slide-indicators {
  display: flex;
  margin-top: 38px;
  gap: 9px;
}

.slide-indicators button {
  width: 34px;
  height: 18px;
  padding: 8px 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.slide-indicators span {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: rgb(153 189 222 / 35%);
  transition: background 180ms ease, transform 180ms ease;
}

.slide-indicators button[aria-current="true"] span {
  background: #ff3b30;
  transform: scaleY(1.5);
}

.visual-panel {
  position: relative;
  z-index: 1;
  align-self: stretch;
  min-width: 0;
  margin-right: 0;
  touch-action: pan-y;
  user-select: none;
}

.visual-panel::before {
  position: absolute;
  z-index: 3;
  inset: 0 auto 0 0;
  width: 34%;
  background: linear-gradient(90deg, #072548 0%, rgb(7 37 72 / 72%) 38%, transparent 100%);
  content: "";
  pointer-events: none;
}

.image-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #061a33;
}

.image-stage::after {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgb(3 18 37 / 15%), rgb(2 14 28 / 30%)),
    radial-gradient(circle at 52% 45%, transparent 28%, rgb(1 12 25 / 22%) 100%);
  content: "";
}

.image-stage img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  filter: saturate(0.88) contrast(1.06) brightness(0.82);
  transform: scale(calc(var(--slide-zoom, 1) + 0.035));
  transition: opacity 650ms ease, transform 1100ms ease;
}

.image-stage img.active {
  opacity: 1;
  transform: scale(var(--slide-zoom, 1));
}

.visual-caption {
  position: absolute;
  z-index: 4;
  right: 26px;
  bottom: 46px;
  display: grid;
  gap: 4px;
  text-align: right;
  text-shadow: 0 2px 8px rgb(0 8 18 / 76%);
  pointer-events: none;
}

.visual-caption strong {
  display: block;
  font-size: clamp(22px, 2.1vw, 30px);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.visual-caption small {
  display: block;
  color: #c3d2e1;
  font-size: 15px;
  line-height: 1.5;
}

.carousel-controls {
  position: absolute;
  z-index: 5;
  right: 26px;
  top: 26px;
  display: flex;
  gap: 7px;
}

.carousel-controls button {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgb(138 204 237 / 32%);
  border-radius: 50%;
  background: rgb(4 25 49 / 60%);
  color: #ffffff;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: border-color 180ms ease, background 180ms ease;
}

.carousel-controls button:hover,
.carousel-controls button:focus-visible {
  border-color: #70cff2;
  background: rgb(13 74 129 / 76%);
}

@media (max-width: 900px) {
  .hero-carousel {
    width: min(calc(100% - 40px), 1240px);
    min-height: auto;
    border-radius: 8px;
  }

  .hero-carousel::before {
    background: linear-gradient(180deg, rgb(4 19 39 / 98%) 0%, rgb(5 25 49 / 80%) 52%, transparent 76%);
  }

  .hero-inner {
    grid-template-columns: 1fr;
    width: 100%;
    padding-left: 0;
    gap: 0;
  }

  .hero-copy {
    width: min(100% - 40px, 680px);
    margin-inline: auto;
    padding: 70px 0 44px;
  }

  h1 {
    max-width: 640px;
  }

  .visual-panel {
    min-height: clamp(320px, 58vw, 520px);
    margin-right: 0;
  }

  .visual-panel::before {
    inset: 0 0 auto;
    width: 100%;
    height: 22%;
    background: linear-gradient(180deg, #06203e 0%, transparent 100%);
  }
}

@media (max-width: 560px) {
  .hero-copy {
    width: calc(100% - 40px);
    padding-block: 54px 38px;
  }

  .hero-eyebrow {
    margin-bottom: 14px;
    font-size: 9px;
  }

  h1 {
    font-size: 42px;
  }

  .hero-tagline {
    margin-top: 18px;
    font-size: 22px;
  }

  .hero-summary {
    max-width: 320px;
    font-size: 13px;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 28px;
    gap: 9px;
  }

  .primary-action,
  .secondary-action {
    min-height: 46px;
    padding-inline: 12px;
    font-size: 13px;
  }

  .slide-indicators {
    margin-top: 30px;
  }

  .visual-panel {
    min-height: 300px;
  }

  .visual-caption {
    right: 16px;
    bottom: 30px;
  }

  .carousel-controls {
    top: 16px;
    right: 16px;
  }
}

@media (max-width: 480px) {
  .hero-carousel {
    width: calc(100% - 32px);
  }
}
</style>

