<script setup>
import coSimulationImage from "../assets/capabilities/co-simulation.jpg";
import dynamicsImage from "../assets/capabilities/dynamics.jpg";
import modelLibraryImage from "../assets/capabilities/model-library.jpg";
import validationImage from "../assets/capabilities/validation.jpg";


const capabilities = [
  {
    title: "整车与底盘动力学",
    summary: "多体动力学建模与高精度求解",
    image: dynamicsImage,
    alt: "EchoSim 软件中的整车多体动力学模型",
    points: ["整车 / 底盘 / 悬架 / 转向建模", "刚柔耦合与复杂约束处理", "高效稳定的动力学求解"],
  },
  {
    title: "高可靠车辆模型库",
    summary: "乘用车、商用车、特种车辆",
    image: modelLibraryImage,
    alt: "EchoSim 软件中的乘用车与商用车参数模型",
    points: ["丰富的整车与零部件模型库", "支持参数化建模与校正", "更适配多车型与场景阶段"],
  },
  {
    title: "联合仿真与开放接口",
    summary: "机·电·热·控一体化仿真环境",
    image: coSimulationImage,
    alt: "EchoSim 软件中的跨域联合仿真模型",
    points: ["多学科联合仿真", "控制器与模型协同", "API / FMU / CSV 开放接口"],
  },
  {
    title: "MIL / SIL / HIL 验证",
    summary: "从算法到整车的闭环验证",
    image: validationImage,
    alt: "EchoSim 虚拟试验场中的车辆验证画面",
    points: ["支持 MIL / SIL / HIL 验证体系", "场景仿真与自动化测试", "数据分析与工程化评价"],
  },
];
</script>

<template>
  <section id="capabilities" class="capabilities-section homepage-section" aria-labelledby="capabilities-title">
    <div class="capabilities-inner section-inner">
      <header class="capabilities-heading">
        <span class="section-eyebrow">CAPABILITIES</span>
        <h2 id="capabilities-title" class="section-title">EchoSim 核心能力</h2>
        <p class="section-description">覆盖车辆研发关键环节，提供从建模、仿真到验证的完整能力，帮助工程团队更高效地解决复杂的车辆开发问题。</p>
      </header>

      <div class="capability-grid">
        <article v-for="capability in capabilities" :key="capability.title" class="capability-card">
          <div class="card-heading">
            <h3>{{ capability.title }}</h3>
            <p>{{ capability.summary }}</p>
          </div>

          <img class="card-image" :src="capability.image" :alt="capability.alt" loading="lazy" />

          <ul class="card-points">
            <li v-for="point in capability.points" :key="point">
              <span aria-hidden="true">✓</span>
              {{ point }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.capabilities-section {
  position: relative;
  overflow: hidden;
  --section-eyebrow-color: #6bc9ec;
  --section-title-color: #ffffff;
  --section-description-color: #aec8e1;
  background:
    radial-gradient(circle at 8% 5%, rgb(20 87 200 / 22%), transparent 31%),
    linear-gradient(128deg, #061a34 0%, #082e56 54%, #061a34 100%);
  color: #ffffff;
  isolation: isolate;
}

.capabilities-section::before {
  position: absolute;
  z-index: -1;
  right: -10%;
  bottom: -58%;
  width: 56%;
  height: 80%;
  background-image:
    linear-gradient(rgb(55 184 235 / 12%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(55 184 235 / 12%) 1px, transparent 1px);
  background-size: 32px 32px;
  content: "";
  opacity: 0.7;
  transform: perspective(560px) rotateX(62deg) rotateZ(-5deg);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000, transparent 72%);
  mask-image: radial-gradient(ellipse at 50% 50%, #000, transparent 72%);
}

.capabilities-heading {
  max-width: 1040px;
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: clamp(32px, 4vw, 48px);
}

.capability-card {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgb(43 137 219 / 62%);
  border-radius: 6px;
  background: linear-gradient(180deg, rgb(14 60 105 / 96%), rgb(7 39 74 / 96%));
  box-shadow: inset 0 1px 0 rgb(111 205 245 / 12%), 0 14px 32px rgb(2 14 31 / 18%);
}

.capability-card:nth-child(3)::before,
.capability-card:nth-child(4)::before {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 4px;
  height: 52px;
  border-radius: 6px 0 0;
  background: #ff3b30;
  content: "";
}

.card-heading {
  min-height: 72px;
  padding: 16px 16px 11px;
}

.card-heading h3 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(15px, 1.35vw, 19px);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1.35;
}

.card-heading p {
  margin: 4px 0 0;
  color: #98c3e0;
  font-size: 11px;
  line-height: 1.4;
}

.card-image {
  display: block;
  width: calc(100% - 20px);
  aspect-ratio: 1.58;
  margin: 0 10px;
  border: 1px solid rgb(154 207 236 / 24%);
  border-radius: 4px;
  background: #eef4f8;
  object-fit: cover;
}

.card-points {
  display: grid;
  gap: 7px;
  padding: 14px 15px 18px;
  margin: 0;
  list-style: none;
}

.card-points li {
  display: grid;
  grid-template-columns: 15px minmax(0, 1fr);
  align-items: start;
  gap: 6px;
  color: #d4e4f3;
  font-size: 11px;
  line-height: 1.45;
}

.card-points li span {
  display: grid;
  width: 14px;
  height: 14px;
  place-items: center;
  border: 1px solid rgb(85 203 239 / 72%);
  border-radius: 50%;
  color: #6fdbf5;
  font-size: 9px;
  font-weight: 800;
}

@media (max-width: 980px) {
  .capabilities-inner {
    width: min(calc(100% - 40px), 680px);
  }

  .capability-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card-heading h3 {
    font-size: 17px;
  }
}

@media (max-width: 680px) {
  .capability-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .card-heading {
    min-height: 0;
  }

  .card-image {
    aspect-ratio: 1.75;
  }
}
</style>
