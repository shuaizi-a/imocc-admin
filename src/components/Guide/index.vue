<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide', '功能引导')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n/index';
import steps from './steps';

const i18n = useI18n();

// eslint-disable-next-line no-unused-vars
let driver = null;
onMounted(() => {
  driver = new Driver({
    allowClose: false, // 禁止点击蒙版关闭
    stageBackground: '#fff', // 引导对话的背景色
    animate: false, // 显示透明引导框
    closeBtnText: i18n.t('msg.guide.close', '关闭'),
    nextBtnText: i18n.t('msg.guide.next', '下一步'),
    prevBtnText: i18n.t('msg.guide.prev', '上一步')
  });
});

const onClick = () => {
  driver.defineSteps(steps(i18n));
  driver.start();
};
</script>

<style scoped></style>
