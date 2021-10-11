import Vue from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import "dayjs/locale/id";


dayjs.extend(relativeTime);
// dayjs.locale("id");

Object.defineProperties(Vue.prototype, {
  $date: {
    get() {
      return dayjs;
    }
  }
});
