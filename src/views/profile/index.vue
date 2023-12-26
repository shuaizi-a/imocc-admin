<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card" :features="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature','功能')" name="feature">
              <feature :features="featureData"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter','章节')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author','作者')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue';
import Chapter from './components/Chapter.vue';
// eslint-disable-next-line no-unused-vars
import Feature from './components/Feature.vue';
import Author from './components/Author.vue';
import { ref } from 'vue';
import { watchSwitchLang } from '@/utils/i18n'

import { feature } from '@/api/user'
const activeName = ref('feature');

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()

// 监听语言切换
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
