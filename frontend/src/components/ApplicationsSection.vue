<script setup>
import adasImage from "../assets/applications/adas-960.jpg";
import commercialImage from "../assets/applications/commercial-960.jpg";
import passengerImage from "../assets/applications/passenger-960.jpg";
import specialVehicleImage from "../assets/applications/special-vehicle-960.jpg";


const applications = [
  {
    title: "乘用车研发",
    image: passengerImage,
    alt: "道路上的乘用车仿真场景",
    description: "整车与底盘性能开发",
    detail: "操稳、平顺性、制动等仿真分析",
  },
  {
    title: "商用车研发",
    image: commercialImage,
    alt: "道路上的商用车仿真场景",
    description: "重载车辆动力学与控制仿真",
    detail: "适用于卡车、客车等商用车型",
  },
  {
    title: "特种车辆研发",
    image: specialVehicleImage,
    alt: "复杂地形中的特种车辆仿真场景",
    description: "面向非典型场景的动力学建模",
    detail: "复杂地形与特殊工况验证",
  },
  {
    title: "ADAS 与控制策略",
    image: adasImage,
    alt: "道路交通环境中的 ADAS 仿真场景",
    description: "感知与控制系统联合验证",
    detail: "控制算法开发与闭环验证",
  },
];
</script>

<template>
  <section id="applications" class="applications-section homepage-section" aria-labelledby="applications-title">
    <div class="applications-inner section-inner">
      <header class="applications-heading">
        <span class="section-eyebrow">APPLICATIONS</span>
        <h2 id="applications-title" class="section-title">面向车辆研发的应用场景</h2>
        <p class="section-description">EchoSim 覆盖乘用车、商用车、特种车辆等多类车型的研发需求，支持从整车性能开发到 ADAS / 控制策略验证。</p>
      </header>

      <div class="application-grid">
        <article v-for="application in applications" :key="application.title" class="application-card">
          <img class="application-image" :src="application.image" :alt="application.alt" loading="lazy" />
          <div class="application-body">
            <h3>{{ application.title }}</h3>
            <p>{{ application.description }}</p>
            <p>{{ application.detail }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.applications-section {
  background: #f7fafc;
  color: #0d223a;
}

.applications-heading {
  max-width: 1040px;
}

.application-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: clamp(32px, 4vw, 48px);
}

.application-card {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #dce5ef;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 8px 18px rgb(22 59 92 / 7%);
}

.application-image {
  display: block;
  width: 100%;
  aspect-ratio: 1.55;
  object-fit: cover;
  object-position: center;
}

.application-body {
  min-height: 106px;
  padding: 14px 32px 20px 14px;
}

.application-body h3 {
  margin: 0 0 8px;
  color: #0d2b4c;
  font-size: 16px;
  font-weight: 720;
  letter-spacing: -0.035em;
}

.application-body p {
  margin: 3px 0 0;
  color: #6b829b;
  font-size: 11px;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .applications-inner {
    width: min(calc(100% - 40px), 680px);
  }

  .application-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .application-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .application-image {
    aspect-ratio: 1.8;
  }
}
</style>
