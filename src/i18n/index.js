import { createI18n } from 'vue-i18n/index';
import store from '@/store';

// 自定义语言包
import mZhLocale from './lang/zh';
import mEnLocale from './lang/en';

/**
 * 返回当前 lang
 */
function getLanguage() {
  return store && store.getters && store.getters.language;
}

// 语言包信息整合
const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
};

// 配置vue-i18n
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  warnHtmlMessage: false,
  messages
});

// 导出
export default i18n;
