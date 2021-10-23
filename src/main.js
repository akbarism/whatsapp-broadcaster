import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/Dayjs";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./plugins/firebase/config";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts)
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
