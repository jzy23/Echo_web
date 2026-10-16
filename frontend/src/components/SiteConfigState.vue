<script setup>
defineProps({
  state: {
    type: String,
    required: true,
    validator: (value) => ["loading", "error"].includes(value),
  },
  message: {
    type: String,
    default: "",
  },
});

defineEmits(["retry"]);
</script>

<template>
  <main
    class="config-state"
    :aria-busy="state === 'loading'"
    aria-live="polite"
  >
    <img src="/echosim-logo.png" alt="EchoSim" />

    <div v-if="state === 'loading'" class="loading-status">
      <span class="spinner" aria-hidden="true"></span>
      <p>正在加载网站内容…</p>
    </div>

    <div v-else class="error-status" role="alert">
      <h1>暂时无法打开网站</h1>
      <p>{{ message || "网站内容暂时无法加载，请稍后重试。" }}</p>
      <button type="button" @click="$emit('retry')">重新加载</button>
    </div>
  </main>
</template>

<style scoped>
.config-state {
  display: grid;
  min-height: 100vh;
  padding: 40px 20px;
  place-content: center;
  justify-items: center;
  background:
    radial-gradient(circle at 70% 34%, rgb(20 87 200 / 24%), transparent 30%),
    #071a33;
  color: #ffffff;
  text-align: center;
}

.config-state > img {
  width: auto;
  height: 72px;
  margin-bottom: 36px;
}

.loading-status,
.error-status {
  display: grid;
  justify-items: center;
}

.loading-status {
  gap: 16px;
}

.loading-status p,
.error-status p {
  margin: 0;
  color: #aebfd2;
  line-height: 1.7;
}

.spinner {
  width: 34px;
  height: 34px;
  border: 3px solid rgb(98 199 237 / 24%);
  border-top-color: #62c7ed;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

.error-status h1 {
  margin: 0 0 16px;
  font-size: clamp(28px, 5vw, 42px);
}

.error-status button {
  min-height: 44px;
  margin-top: 26px;
  padding: 0 20px;
  border: 0;
  border-radius: 5px;
  background: #1476ef;
  color: #ffffff;
  font: inherit;
  font-weight: 650;
  cursor: pointer;
}

.error-status button:hover,
.error-status button:focus-visible {
  background: #2486ff;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }
}
</style>
