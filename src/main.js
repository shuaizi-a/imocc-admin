import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 导入全局样式
import './styles/index.scss';
// 导入 svgIcon
import installIcons from '@/icons';

const app = createApp(App);

installElementPlus(app); // element ui plus
installIcons(app); // svg-icon

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store).use(router).mount('#app');
