<script setup>
defineProps({
  brand: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <a class="brand-mark" href="#top" :aria-label="`${brand.name} 首页`">
    <img src="/echosim-logo.png" :alt="`${brand.name} ${brand.tagline}`" />
  </a>
</template>

<style scoped>
.brand-mark {
  display: inline-flex;
  align-items: center;
  min-width: max-content;
  text-decoration: none;
}

.brand-mark img {
  display: block;
  width: auto;
  height: 56px;
  object-fit: contain;
}

@media (max-width: 480px) {
  .brand-mark img {
    height: 48px;
  }
}
</style>

