import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/Dayjs";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from './plugins/firebase/config'
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_apiKey,
//   authDomain: process.env.VUE_APP_authDomain,
//   projectId: process.env.VUE_APP_projectId,
//   storageBucket: process.env.VUE_APP_storageBucket,
//   messagingSenderId: process.env.VUE_APP_messagingSenderId,
//   appId: process.env.VUE_APP_appId
// };
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
