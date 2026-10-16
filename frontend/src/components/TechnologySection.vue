<script setup>
import modelViewImage from "../assets/technology/adams-model-view.jpg";
import modelWireframeImage from "../assets/technology/adams-model-wireframe.jpg";
import validationImage from "../assets/technology/validation-curves.jpg";
</script>

<template>
  <section id="technology" class="technology-section homepage-section" aria-labelledby="technology-title">
    <div class="technology-inner section-inner">
      <header class="technology-heading">
        <span class="section-eyebrow">TECHNOLOGY</span>
        <h2 id="technology-title" class="section-title">精度、效率与工程可用性</h2>
        <p class="section-description">
          提供高精度的建模方法、高效稳定的求解器与开放的工程化能力，<br class="desktop-break" />
          支持从模型开发到算法验证的完整流程，满足实际研发场景需求。
        </p>
      </header>

      <ul class="technology-topics" aria-label="技术能力主题">
        <li>工程化建模环境</li>
        <li>仿真结果与数据分析</li>
        <li>与 ADAMS 的模型对接</li>
        <li>MIL / SIL / HIL 验证链路</li>
      </ul>

      <div class="technology-grid">
        <article class="technology-feature">
          <div class="feature-image-wrap">
            <img :src="modelViewImage" alt="车辆底盘多体动力学模型软件界面" />
          </div>
          <p>直观的工程化建模环境，支持整车与底盘多体动力学建模、参数化配置与结果查看。</p>
        </article>

        <div class="technology-evidence">
          <article class="evidence-card evidence-model">
            <div>
              <h3>高精度的模型对接与求解能力</h3>
              <p>支持与 ADAMS 等多体动力学软件中的模型对接，提供可靠的求解与复用基础。</p>
            </div>
            <div class="model-compare" aria-label="模型对接示意">
              <figure>
                <img :src="modelWireframeImage" alt="导入的车辆线框模型" />
                <figcaption>ADAMS 模型</figcaption>
              </figure>
              <span aria-hidden="true">›</span>
              <figure>
                <img :src="modelViewImage" alt="EchoSim 车辆模型" />
                <figcaption>EchoSim 仿真模型</figcaption>
              </figure>
            </div>
          </article>

          <article class="evidence-card evidence-chart">
            <div>
              <h3>仿真结果与工程验证</h3>
              <p>提供可追溯的曲线与数据分析工具，支持多组结果对比和工程验证。</p>
            </div>
            <img :src="validationImage" alt="仿真结果对比曲线" />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.technology-section {
  background: #f7fafc;
  color: #0d223a;
}

.technology-heading {
  max-width: 850px;
}

.technology-topics {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 12px;
  margin-top: 25px;
  gap: 10px clamp(20px, 3vw, 40px);
  border-bottom: 1px solid #dce5ef;
  list-style: none;
}

.technology-topics li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6d88a2;
  font-size: 12px;
  white-space: nowrap;
}

.technology-topics li::before {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #8ba7c6;
  content: "";
}

.technology-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.86fr);
  gap: 18px;
  margin-top: 24px;
}

.technology-feature,
.evidence-card {
  border: 1px solid #dce5ef;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 9px 22px rgb(22 59 92 / 6%);
}

.technology-feature {
  padding: 14px;
}

.feature-image-wrap {
  overflow: hidden;
  border: 1px solid #e0e8ef;
  border-radius: 3px;
  background: #14263c;
}

.feature-image-wrap img {
  display: block;
  width: 100%;
  aspect-ratio: 1.66;
  object-fit: cover;
}

.technology-feature > p {
  margin: 12px 2px 0;
  color: #6b829b;
  font-size: 12px;
  line-height: 1.65;
}

.technology-evidence {
  display: grid;
  gap: 18px;
}

.evidence-card {
  min-width: 0;
  padding: 15px;
}

.evidence-card h3 {
  margin: 0;
  color: #123b65;
  font-size: 15px;
  font-weight: 720;
  line-height: 1.35;
}

.evidence-card p {
  margin: 6px 0 0;
  color: #6b829b;
  font-size: 11px;
  line-height: 1.55;
}

.model-compare {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 18px minmax(0, 1fr);
  align-items: center;
  gap: 5px;
  margin-top: 12px;
}

.model-compare figure {
  min-width: 0;
  margin: 0;
}

.model-compare img {
  display: block;
  width: 100%;
  aspect-ratio: 1.55;
  border: 1px solid #e0e8ef;
  border-radius: 3px;
  object-fit: cover;
}

.model-compare figcaption {
  margin-top: 4px;
  color: #48698c;
  font-size: 10px;
  text-align: center;
}

.model-compare > span {
  color: #1476ef;
  font-size: 24px;
  text-align: center;
}

.evidence-chart img {
  display: block;
  width: 100%;
  margin-top: 11px;
  aspect-ratio: 1.75;
  border: 1px solid #e0e8ef;
  border-radius: 3px;
  object-fit: cover;
}

@media (max-width: 900px) {
  .technology-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .technology-topics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
  }

  .technology-topics li {
    white-space: normal;
  }

  .technology-grid {
    gap: 14px;
    margin-top: 18px;
  }

  .technology-evidence {
    gap: 14px;
  }
}
</style>
