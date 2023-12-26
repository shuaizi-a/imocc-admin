<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFromRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title', '用户登录') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input v-model="loginForm.username" placeholder="username" name="username" type="text" clearable />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input :type="passwordType" v-model="loginForm.password" placeholder="password" name="password" clearable />
        <span class="show-pwd">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType"></svg-icon>
        </span>
      </el-form-item>

      <el-button type="primary" :loading="loading" style="width: 100%; margin-bottom: 30px" @click="handleLogin()">
        {{ $t('msg.login.loginBtn', '登录') }}
      </el-button>

      <!-- 提示信息 -->
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { validatePassword } from './rules';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n/index';
import LangSelect from '@/components/LangSelect';
const i18n = useI18n();
const store = useStore();

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
});

// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule', '用户名为必填项')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
});

// 登录动作处理
const loading = ref(false);
const loginFromRef = ref(null);
const handleLogin = () => {
  loginFromRef.value.validate((valid) => {
    if (!valid) return;

    loading.value = true;

    try {
      store.dispatch('user/login', loginForm.value);
    } catch (error) {
      console.log(error);
    }

    loading.value = false;
  });
};

// 处理密码框文本显示状态
const passwordType = ref('password');
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
  } else {
    passwordType.value = 'password';
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      &__wrapper {
        width: 100%;
      }

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
