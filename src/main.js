import { createApp } from 'vue';
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import installFilter from '@/filters';
import installDirective from '@/directives';

// 导入全局样式
import './styles/index.scss';
// 导入 svgIcon
import installIcons from '@/icons';
// 导入权限控制模块
import './permission';

const app = createApp(App);
installElementPlus(app); // element ui plus
installIcons(app); // svg-icon
installFilter(app); // 全局屬性
installDirective(app); // 全局指令

// 全局注册element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store).use(router).use(i18n).mount('#app');
