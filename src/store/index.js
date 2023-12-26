import { createStore } from 'vuex';
import getters from './getters';
// modules
import app from './modules/app';
import user from './modules/user.js';
import theme from './modules/theme.js';
import permission from './modules/permission';

export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    permission
  }
});
