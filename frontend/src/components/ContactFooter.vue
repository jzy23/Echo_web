<script setup>
import { computed } from "vue";


const props = defineProps({
  brand: { type: Object, required: true },
  contact: { type: Object, required: true },
  navigation: { type: Array, required: true },
});

const currentYear = new Date().getFullYear();
const footerNavigation = computed(() =>
  props.navigation.filter((item) => item.showInFooter === true),
);
</script>

<template>
  <footer id="contact" class="contact-footer">
    <section class="contact-cta" aria-labelledby="contact-title">
      <div class="contact-inner">
        <div class="contact-copy">
          <span class="eyebrow">CONTACT · 技术咨询</span>
          <h2 id="contact-title">把车辆研发问题带入 <em>{{ brand.name }}</em></h2>
          <p>与技术团队交流车型、工况、算法或验证需求，了解如何使用 EchoSim 建立工程仿真流程。</p>
        </div>

        <div class="contact-actions">
          <a class="primary-action" :href="`tel:${contact.phone}`">
            <span>预约产品演示</span>
            <svg aria-hidden="true" viewBox="0 0 20 20">
              <path d="M4 10h12m-5-5 5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <div class="footer-main">
      <div class="footer-grid">
        <div id="about" class="footer-brand">
          <span class="footer-logo">ECHO<span>SIM</span></span>
          <p>{{ brand.company }}</p>
          <p class="footer-note">让模型驱动车辆研发</p>
        </div>

        <div class="footer-links">
          <span class="footer-label">快速导航</span>
          <div>
            <a v-for="item in footerNavigation" :key="item.label" :href="item.href">
              {{ item.label }}
            </a>
          </div>
        </div>

        <address class="footer-contact">
          <span class="footer-label">联系我们</span>
          <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        </address>
      </div>

      <div class="footer-bottom">
        <span>© {{ currentYear }} {{ brand.company }}</span>
        <span>EchoSim 车辆仿真平台</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.contact-footer {
  overflow: hidden;
  background: #05162b;
  color: #ffffff;
}

.contact-cta {
  position: relative;
  min-height: 330px;
  isolation: isolate;
  background:
    radial-gradient(circle at 77% 44%, rgb(20 87 200 / 24%), transparent 29%),
    linear-gradient(120deg, #071a33 14%, #08284d 58%, #061b35 100%);
}

.contact-cta::before,
.contact-cta::after {
  position: absolute;
  z-index: -1;
  right: -6%;
  bottom: -82px;
  width: 58%;
  height: 240px;
  background-image:
    linear-gradient(rgb(35 183 229 / 14%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(35 183 229 / 14%) 1px, transparent 1px);
  background-size: 24px 24px;
  content: "";
  opacity: 0.7;
  transform: perspective(500px) rotateX(59deg) rotateZ(-8deg);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent);
}

.contact-cta::after {
  right: 6%;
  bottom: -118px;
  height: 270px;
  opacity: 0.36;
  transform: perspective(520px) rotateX(61deg) rotateZ(7deg);
}

.contact-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  width: min(100% - 48px, 1240px);
  min-height: 330px;
  margin-inline: auto;
  gap: 64px;
}

.contact-copy {
  max-width: 760px;
}

.eyebrow {
  display: block;
  margin-bottom: 18px;
  color: #65c8ed;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

h2 {
  margin: 0;
  font-size: clamp(32px, 4vw, 54px);
  font-weight: 690;
  letter-spacing: -0.045em;
  line-height: 1.14;
}

h2 em {
  color: #74cbe9;
  font-style: normal;
}

.contact-copy p {
  max-width: 660px;
  margin: 20px 0 0;
  color: #aebfd2;
  font-size: 16px;
  line-height: 1.8;
}

.contact-actions {
  display: grid;
  align-items: center;
  min-width: 180px;
  gap: 16px;
}

.primary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 22px;
  gap: 14px;
  border-radius: 6px;
  background: #146bea;
  box-shadow: 0 14px 32px rgb(0 60 150 / 28%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 650;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;
}

.primary-action:hover,
.primary-action:focus-visible {
  background: #2183ff;
  transform: translateY(-2px);
}

.primary-action svg {
  width: 18px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.footer-main {
  width: min(100% - 48px, 1240px);
  margin-inline: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  padding: 54px 0 46px;
  gap: 40px;
}

.footer-logo {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.footer-logo span {
  color: #ff4b42;
}

.footer-brand p {
  margin: 12px 0 0;
  color: #9eb0c4;
  font-size: 14px;
}

.footer-brand .footer-note {
  margin-top: 6px;
  color: #6f89a5;
  font-size: 12px;
}

.footer-label {
  display: block;
  margin-bottom: 14px;
  color: #6d86a1;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.footer-links div {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 10px 24px;
}

.footer-links a,
.footer-contact a {
  color: #bac8d7;
  font-size: 13px;
  text-decoration: none;
}

.footer-links a:hover,
.footer-links a:focus-visible,
.footer-contact a:hover,
.footer-contact a:focus-visible {
  color: #ffffff;
}

.footer-contact {
  display: grid;
  align-content: start;
  justify-self: end;
  margin: 0;
  gap: 10px;
  font-style: normal;
}

.footer-contact .footer-label {
  margin-bottom: 4px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 28px;
  border-top: 1px solid rgb(146 178 211 / 13%);
  color: #637d99;
  font-size: 11px;
}

@media (max-width: 820px) {
  .contact-inner {
    grid-template-columns: 1fr;
    align-content: center;
    min-height: 400px;
    gap: 30px;
  }

  .contact-actions {
    grid-template-columns: max-content max-content;
    justify-content: start;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-contact {
    justify-self: start;
  }
}

@media (max-width: 560px) {
  .contact-inner,
  .footer-main {
    width: calc(100% - 40px);
  }

  .contact-inner {
    min-height: 430px;
    padding-block: 58px;
  }

  h2 {
    font-size: 35px;
  }

  .contact-copy p {
    font-size: 14px;
  }

  .contact-actions {
    grid-template-columns: 1fr;
  }

  .primary-action {
    justify-self: start;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    padding-block: 42px;
    gap: 34px;
  }

  .footer-bottom {
    display: grid;
    gap: 7px;
  }
}
</style>

