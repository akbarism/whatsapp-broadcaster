import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    env: process.env.VUE_APP_ENV,
    token: process.env.VUE_APP_TOKEN,
    qr_code: null,
    res: null,
    status_device: null,
    success_msg: null,
    pending_msg: null,
    fail_msg: null,
    listNumber: null,
    quota: null,
  },
  mutations: {
    QR_CODE(state, data) {
      state.qr_code = data;
    },
    GET_DEVICE(state, data) {
      state.status_device = data;
    },
    GET_QUOTA(state, data) {
      state.quota = data.quota;
    },
    GET_SENT(state, data) {
      state.sent_msg = data;
    },
    SET_LIST_PPL(state, data) {
      state.listNumber = data;
    },
    ERR_MSG(state, error) {
      state.errMsg = error;
    },
    RES_MSG(state, error) {
      state.res = error;
    },
  },
  actions: {
    getDevice(context) {
      return new Promise((resolve, reject) => {
        let token = context.state.token;
        let env = context.state.env;
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(`${env}devices/xiamoi-kentang`, config)
          .then((res) => {
            let data = res.data;
            context.commit("GET_DEVICE", data);
            resolve(data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getQr(context) {
      return new Promise((resolve, reject) => {
        let token = context.state.token;
        let env = context.state.env;
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(`${env}qr?device_id=xiamoi-kentang`, config)
          .then((res) => {
            let data = res.data;
            context.commit("QR_CODE", data);
            resolve(data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getQuota(context) {
      return new Promise((resolve, reject) => {
        let token = context.state.token;
        let env = context.state.env;
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(`${env}quotas`, config)
          .then((res) => {
            let data = res.data;
            context.commit("GET_QUOTA", data);
            resolve(data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    sendMsg(context, data) {
      return new Promise((resolve, reject) => {
        let token = context.state.token;
        let env = context.state.env;
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${env}messages`, data, config)
          .then((res) => {
            let data = res.data;
            context.commit("RES_MSG", data);
            resolve(data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getSentMsg(context, data) {
      return new Promise((resolve, reject) => {
        let token = context.state.token;
        let env = context.state.env;
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        let meta = data.meta ? `start_key=${data.meta}` : ``;
        let status = data.status ? `&status=${data.status}` : ``;
        let date = data.date ? `&date=${data.date}` : ``;
        let endpoint = `${env}messages?${meta}${status}${date}`;
        axios
          .get(endpoint, config)
          .then((res) => {
            let response = res.data;
            if (meta) {
              context.state[`${data.status}_msg`].push(...res.data.data);
            } else {
              context.state[`${data.status}_msg`] = res.data.data;
              console.log(context.state[`${data.status}_msg`]);
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    reconnect(context, data) {
      return new Promise((resolve, reject) => {
        let token = context.state.token;
        let env = context.state.env;
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${env}reconnect`, data, config)
          .then((res) => {
            let data = res.data;
            context.commit("RES_MSG", data);
            resolve(data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
  },
  modules: {},
});
