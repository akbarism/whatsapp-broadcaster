<template>
  <div class="d-flex flex-column justify-center align-center">

    <div
      v-if="!base64QR"
      class="d-flex flex-column justify-center align-center mt-5 pa-3"
    >
      <img src="../assets/img/qrcode.png" alt="" />
      <v-btn
        v-if="!generating"
        class="text-capitalize mt-5"
        color="#0E31D9"
        dark
        @click="generatQr"
        >Generate QR Code</v-btn
      >
      <v-btn v-if="generating" class="text-capitalize mt-5" color="#0E31D9" dark
        >Generating...</v-btn
      >
    </div>
    <div
      class="d-flex flex-column justify-center align-center mt-5 pa-3"
      v-if="base64QR"
    >
      <img :src="base64QR" height="300px" alt="" />
      <v-alert dense outlined type="warning" class="mt-5">
        QR Code hanya berlaku selama 20 detik!
      </v-alert>
    </div>
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <div class="pa-3">
          <div class="d-flex justify-center mb-2">
            <img
              src="../assets/img/V.1 0921 Online Test Hara Anargya Alert.png"
              height="100px"
              alt=""
            />
          </div>
          <p class="text-center ma-0">
            Device tidak di temukan! Silakan Generate QR Code untuk kembali
            menggunakan aplkasi.
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialog = false"> ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div style="position: absolute; bottom: 0" class="pa-3 d-flex align-center">
      <p class="ma-0 mr-3">Koneksi terputus?</p>
      <v-btn
        v-if="!reconnecting"
        class="text-capitalize"
        color="#0E31D9"
        dark
        @click="reconnect"
        >reconnect</v-btn
      >
      <v-btn
        v-if="reconnecting"
        class="text-capitalize"
        color="#0E31D9"
        dark
        @click="reconnect"
        >reconnecting...</v-btn
      >
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import QRCode from "qrcode";
export default {
  name: "QRCODE",

  components: {},

  data() {
    return {
      checkConnection: null,
      generating: false,
      reconnecting: false,
      checking: false,
      base64QR: null,
      counter: null,
      dialog: false,
      file: null,
      imgFile: null,
    };
  },
  mounted() {
    this.checkStatusDevice();
    const uid = localStorage.getItem("uid");
    if (!uid) {
      this.anonymously();
    }
  },
  methods: {
    anonymously() {
      firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            localStorage.setItem("uid", user.uid);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onUpload() {
      const storage = firebase
        .storage()
        .ref(`whatsapp_broadcaster/${this.file.name}`);
      storage.put(this.file).then(() => {
        storage.getDownloadURL().then((url) => {
          this.imgFile = url;
        });
      });
    },
    generatQr() {
      this.generating = true;
      this.$store
        .dispatch("getQr")
        .then((data) => {
          this.generating = false;
          this.displayQr(data.qr_code);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    displayQr(qr_code) {
      QRCode.toDataURL(qr_code)
        .then((url) => {
          this.base64QR = url;
          this.isConnected();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    isConnected(reconnect) {
      let second = 1;
      this.checkConnection = setInterval(() => {
        second++;
        this.checkStatusDevice(second, reconnect);
      }, 2000);
    },
    checkStatusDevice(second, reconnect) {
      this.counter = second;
      this.$store.dispatch("getDevice").then((data) => {
        if (data.status == "connected") {
          clearInterval(this.checkConnection);
          localStorage.setItem("isConnected", true);
          this.$router.push("/");
          this.reconnecting = false;
        } else {
          if (!reconnect) {
            if (second >= 9) {
              localStorage.setItem("isConnected", false);
              clearInterval(this.checkConnection);
              this.generatQr();
            }
          } else {
            if (second >= 7) {
              clearInterval(this.checkConnection);
              this.dialog = true;
              this.reconnecting = false;
            }
          }
        }
      });
    },
    reconnect() {
      this.reconnecting = true;
      let data = {
        device_id: "xiamoi-kentang",
      };
      this.$store.dispatch("reconnect", data).then(() => {
        this.isConnected(true);
      });
    },
  },
};
</script>
