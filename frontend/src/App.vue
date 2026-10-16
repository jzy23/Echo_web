<script setup>
import { onMounted, ref } from "vue";

import ApplicationsSection from "./components/ApplicationsSection.vue";
import CapabilitiesSection from "./components/CapabilitiesSection.vue";
import ContactFooter from "./components/ContactFooter.vue";
import DemoSection from "./components/DemoSection.vue";
import HeroCarousel from "./components/HeroCarousel.vue";
import SiteConfigState from "./components/SiteConfigState.vue";
import SiteHeader from "./components/SiteHeader.vue";
import TechnologySection from "./components/TechnologySection.vue";
import WorkflowSection from "./components/WorkflowSection.vue";


const siteConfig = ref(null);
const configState = ref("loading");
const configError = ref("");

function isValidSiteConfig(value) {
  return Boolean(
    value?.brand?.name &&
      value?.brand?.company &&
      Array.isArray(value?.navigation) &&
      value.navigation.length > 0 &&
      value?.contact?.phone &&
      value?.contact?.email,
  );
}

async function loadSiteConfig() {
  configState.value = "loading";
  configError.value = "";

  try {
    const response = await fetch("/api/site-config/");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!isValidSiteConfig(data)) throw new Error("Invalid site configuration");

    siteConfig.value = data;
    configState.value = "ready";
  } catch (error) {
    console.error("Unable to load site configuration.", error);
    siteConfig.value = null;
    configError.value = "网站内容暂时无法加载，请稍后重试。";
    configState.value = "error";
  }
}

onMounted(loadSiteConfig);
</script>

<template>
  <SiteConfigState
    v-if="configState !== 'ready'"
    :state="configState"
    :message="configError"
    @retry="loadSiteConfig"
  />

  <div v-else id="top" class="site-shell">
    <SiteHeader :brand="siteConfig.brand" :navigation="siteConfig.navigation" />

    <main class="page-stage">
      <HeroCarousel />
      <WorkflowSection />
      <CapabilitiesSection />
      <ApplicationsSection />
      <DemoSection />
      <TechnologySection />
    </main>

    <ContactFooter
      :brand="siteConfig.brand"
      :contact="siteConfig.contact"
      :navigation="siteConfig.navigation"
    />
  </div>
</template>

