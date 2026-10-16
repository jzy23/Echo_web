<script setup>
import { onBeforeUnmount, ref } from "vue";

import BrandMark from "./BrandMark.vue";


defineProps({
  brand: { type: Object, required: true },
  navigation: { type: Array, required: true },
});

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  document.body.classList.toggle("menu-open", menuOpen.value);
}

function closeMenu() {
  menuOpen.value = false;
  document.body.classList.remove("menu-open");
}

onBeforeUnmount(() => document.body.classList.remove("menu-open"));
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <BrandMark :brand="brand" />

      <nav class="desktop-nav" aria-label="主导航">
        <a
          v-for="item in navigation"
          :key="item.label"
          :href="item.href"
          :class="{ active: item.active }"
        >
          {{ item.label }}
        </a>
      </nav>

      <a class="consult-button" href="#contact">
        <span>联系咨询</span>
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
        </svg>
      </a>

      <button
        class="menu-button"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? '关闭导航菜单' : '打开导航菜单'"
        @click="toggleMenu"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <Transition name="menu">
      <nav v-if="menuOpen" id="mobile-menu" class="mobile-nav" aria-label="移动端主导航">
        <a
          v-for="item in navigation"
          :key="item.label"
          :href="item.href"
          :class="{ active: item.active }"
          @click="closeMenu"
        >
          {{ item.label }}
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  z-index: 20;
  top: 0;
  background: rgb(7 26 51 / 96%);
  border-bottom: 1px solid rgb(132 177 222 / 14%);
  box-shadow: 0 12px 30px rgb(0 15 35 / 14%);
  backdrop-filter: blur(14px);
}

.header-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: min(100% - 48px, 1240px);
  min-height: 72px;
  margin-inline: auto;
  gap: 34px;
}

.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(18px, 2.1vw, 34px);
}

.desktop-nav a {
  position: relative;
  padding-block: 26px 24px;
  color: #c6d4e4;
  font-size: 14px;
  font-weight: 560;
  text-decoration: none;
  white-space: nowrap;
  transition: color 180ms ease;
}

.desktop-nav a::after {
  position: absolute;
  right: 50%;
  bottom: 17px;
  left: 50%;
  height: 2px;
  border-radius: 999px;
  background: #ff3b30;
  content: "";
  transition: inset 180ms ease;
}

.desktop-nav a:hover,
.desktop-nav a:focus-visible,
.desktop-nav a.active {
  color: #ffffff;
}

.desktop-nav a:hover::after,
.desktop-nav a:focus-visible::after,
.desktop-nav a.active::after {
  right: 28%;
  left: 28%;
}

.consult-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  gap: 8px;
  border: 1px solid #327fc4;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
}

.consult-button:hover,
.consult-button:focus-visible {
  border-color: #64c8f1;
  background: rgb(35 183 229 / 12%);
  transform: translateY(-1px);
}

.consult-button svg {
  width: 16px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.menu-button,
.mobile-nav {
  display: none;
}

@media (max-width: 1100px) {
  .desktop-nav {
    gap: 18px;
  }

  .desktop-nav a {
    font-size: 13px;
  }
}

@media (max-width: 900px) {
  .header-inner {
    grid-template-columns: auto 1fr auto;
    width: min(100% - 40px, 1240px);
    min-height: 66px;
    gap: 14px;
  }

  .desktop-nav {
    display: none;
  }

  .consult-button {
    justify-self: end;
    min-height: 36px;
    padding-inline: 13px;
    font-size: 13px;
  }

  .menu-button {
    display: grid;
    width: 38px;
    height: 38px;
    padding: 10px 8px;
    place-content: center;
    gap: 4px;
    border: 1px solid rgb(113 157 200 / 45%);
    border-radius: 5px;
    background: transparent;
    color: #ffffff;
    cursor: pointer;
  }

  .menu-button span {
    display: block;
    width: 18px;
    height: 1px;
    background: currentcolor;
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .menu-button[aria-expanded="true"] span:first-child {
    transform: translateY(5px) rotate(45deg);
  }

  .menu-button[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
  }

  .menu-button[aria-expanded="true"] span:last-child {
    transform: translateY(-5px) rotate(-45deg);
  }

  .mobile-nav {
    display: grid;
    padding: 12px 20px 20px;
    background: #071a33;
    border-top: 1px solid rgb(132 177 222 / 12%);
  }

  .mobile-nav a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 2px;
    border-bottom: 1px solid rgb(151 187 224 / 12%);
    color: #c6d4e4;
    font-size: 15px;
    text-decoration: none;
  }

  .mobile-nav a.active {
    color: #ffffff;
  }

  .mobile-nav a.active::before {
    width: 3px;
    height: 16px;
    margin-right: 9px;
    border-radius: 999px;
    background: #ff3b30;
    content: "";
  }

  .mobile-nav a span {
    margin-left: auto;
    color: #23b7e5;
  }

  .menu-enter-active,
  .menu-leave-active {
    transition: opacity 160ms ease, transform 160ms ease;
    transform-origin: top;
  }

  .menu-enter-from,
  .menu-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@media (max-width: 480px) {
  .header-inner {
    width: calc(100% - 32px);
  }

  .consult-button span {
    display: none;
  }

  .consult-button {
    width: 36px;
    padding: 0;
  }
}
</style>

