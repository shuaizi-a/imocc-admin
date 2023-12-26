<template>
  <el-icon v-if="/^[A-Z][A-z]*$/.test(icon)" class="sub-el-icon" :size="14">
    <component :is="icon" />
  </el-icon>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue';
import { generateTitle } from '@/utils/i18n';

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
