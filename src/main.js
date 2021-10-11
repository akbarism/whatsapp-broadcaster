import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/Dayjs";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDUIrRMTSTJ4BnfGWBHCGhg7E5-8CTP8Nk",
  authDomain: "image-saver-89e43.firebaseapp.com",
  projectId: "image-saver-89e43",
  storageBucket: "image-saver-89e43.appspot.com",
  messagingSenderId: "31186518176",
  appId: "1:31186518176:web:7c96090962c5a0dfcd49c5"
};
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
