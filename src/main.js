import Vue from 'vue';
import firebase from 'firebase/app';
import ElementUI, { Notification } from 'element-ui';
import locale from 'element-ui/lib/locale/lang/es';
import 'element-ui/lib/theme-chalk/index.css';

import firebaseConfig from './config/firebase';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ElementUI, { locale });

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

Vue.prototype.$notification = function (data) {
  Notification({
    title: data.title,
    message: data.message,
    type: data.type,
    duration: 2000,
  });
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
