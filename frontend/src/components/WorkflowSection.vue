<script setup>
const steps = [
  {
    number: "01",
    title: "车辆建模",
    summary: "整车与底盘\n多体动力学建模",
    icon: "car-front",
  },
  {
    number: "02",
    title: "动力学求解",
    summary: "刚柔耦合求解\n多工况高效仿真",
    icon: "cog",
  },
  {
    number: "03",
    title: "场景与工况",
    summary: "构建及自定义场景\n道路与环境模拟",
    icon: "route",
  },
  {
    number: "04",
    title: "控制器联调",
    summary: "控制算法集成\nMIL/SIL/HIL 协同",
    icon: "cpu",
  },
  {
    number: "05",
    title: "数据分析",
    summary: "多维度结果分析\n支撑工程决策",
    icon: "chart-no-axes-combined",
  },
];
</script>

<template>
  <section id="workflow" class="workflow-section homepage-section" aria-labelledby="workflow-title">
    <div class="workflow-wave" aria-hidden="true"></div>
    <div class="workflow-inner section-inner">
      <div class="workflow-heading">
        <span class="section-eyebrow">WORKFLOW</span>
        <h2 id="workflow-title" class="section-title">从车辆模型到闭环验证</h2>
        <p class="section-description">
          基于统一的建模与仿真技术，覆盖整车、底盘、控制与场景测试，<br class="desktop-break" />
          为车辆研发提供高效、可复用的工程仿真流程。
        </p>
      </div>

      <ol class="workflow-list">
        <li v-for="(step, index) in steps" :key="step.number" class="workflow-step">
          <span class="step-number">{{ step.number }}</span>

          <img
            class="step-icon"
            :src="`/icons/${step.icon}.svg`"
            alt=""
            aria-hidden="true"
          />

          <h3>{{ step.title }}</h3>
          <p>{{ step.summary }}</p>

          <span v-if="index < steps.length - 1" class="step-arrow" aria-hidden="true">›</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.workflow-section {
  position: relative;
  overflow: hidden;
  background: #f7fafc;
  color: #0d223a;
  isolation: isolate;
}

.workflow-section::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: #dce5ef;
  content: "";
}

.workflow-inner {
  position: relative;
  z-index: 1;
}

.workflow-heading {
  max-width: 740px;
}

.workflow-heading .section-description {
  --section-description-margin-top: 16px;
}

.workflow-wave {
  position: absolute;
  z-index: -1;
  top: -4px;
  right: -2%;
  width: min(49vw, 580px);
  height: 180px;
  opacity: 0.75;
  background-image:
    linear-gradient(12deg, transparent 48%, rgb(112 180 239 / 24%) 49%, transparent 50%),
    linear-gradient(174deg, transparent 47%, rgb(112 180 239 / 19%) 48%, transparent 50%);
  background-position: 0 0, 0 0;
  background-size: 28px 23px, 28px 23px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 0%, #000 0%, transparent 72%);
  mask-image: radial-gradient(ellipse at 50% 0%, #000 0%, transparent 72%);
  transform: perspective(500px) rotateX(37deg) rotateZ(-4deg) skewY(-7deg);
}

.workflow-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(20px, 3vw, 48px);
  padding: 0;
  margin: clamp(52px, 6vw, 70px) 0 0;
  list-style: none;
}

.workflow-step {
  position: relative;
  min-width: 0;
}

.step-number {
  color: #b8cce1;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 0.04em;
}

.step-icon {
  display: block;
  width: 58px;
  height: 58px;
  margin: 17px 0 14px;
  object-fit: contain;
  filter: invert(31%) sepia(93%) saturate(2654%) hue-rotate(208deg) brightness(86%) contrast(98%);
}

.workflow-step h3 {
  margin: 0;
  color: #0b2c51;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.workflow-step p {
  min-height: 48px;
  margin: 9px 0 0;
  color: #6f87a2;
  font-size: 12px;
  line-height: 1.65;
  white-space: pre-line;
}

.step-arrow {
  position: absolute;
  top: 97px;
  right: clamp(-34px, -2.5vw, -22px);
  color: #7190b2;
  font-family: Arial, sans-serif;
  font-size: 34px;
  font-weight: 300;
  line-height: 1;
}

@media (max-width: 900px) {
  .workflow-list {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
  }

  .step-arrow {
    right: -9px;
  }

  .workflow-step h3 {
    font-size: 15px;
  }
}

@media (max-width: 680px) {
  .workflow-wave {
    right: -34%;
    width: 90vw;
    height: 140px;
    opacity: 0.52;
  }

  .workflow-heading .section-description {
    max-width: 420px;
  }

  .workflow-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    margin-top: 42px;
  }

  .workflow-step {
    display: grid;
    grid-template-columns: 44px 66px 1fr;
    grid-template-rows: auto auto;
    column-gap: 14px;
    min-height: 98px;
    padding-bottom: 24px;
  }

  .step-number {
    position: relative;
    grid-row: 1 / -1;
    padding-top: 4px;
    display: block;
    font-size: 12px;
  }

  .workflow-step:not(:last-child)::after {
    position: absolute;
    top: 26px;
    bottom: 0;
    left: 6px;
    width: 1px;
    background: #c4d6e8;
    content: "";
  }

  .step-icon {
    grid-row: 1 / -1;
    width: 58px;
    height: 58px;
    margin: 0;
  }

  .workflow-step h3 {
    align-self: end;
    font-size: 17px;
  }

  .workflow-step p {
    min-height: 0;
    margin-top: 5px;
    font-size: 12px;
  }

  .step-arrow {
    top: 24px;
    right: auto;
    left: 58px;
    color: #95afca;
    font-size: 24px;
    transform: rotate(90deg);
  }
}
</style>
