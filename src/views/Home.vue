<template>
  <div class="home_ pa-3">
    <div class="my-7">
      <h2 class="white--text">Whatsapp Broadcaster</h2>
      <div class="d-flex white--text align-center">
        <v-icon color="white" class="mr-2">mdi-wifi-strength-outline</v-icon>
        Connected
      </div>
    </div>
    <div class="quota d-flex max_rounded white--text pa-3" v-if="quota">
      <div class="d-flex align-center" style="height: 100%">
        <v-progress-circular
          :size="130"
          :width="25"
          :value="quota.message_per_day - quota.today_usage"
          color="#B4CFEA"
        >
          <h1 class="white--text">
            {{ quota.message_per_day - quota.today_usage }}
          </h1>
        </v-progress-circular>
      </div>
      <div class="d-flex align-center px-3">
        <div>
          <h3>Sisa Kuota kirim pesan hari ini</h3>
          <p style="font-size: small">
            kuota akan di reset pada pukul
            {{ $date(quota.next_reset).format("HH:mm") }}
          </p>
          <div class="d-flex justify-end">
            <v-btn
              class="text-capitalize"
              color="white"
              to="/create-list"
              depressed
              >Mulai Broadcast</v-btn
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="quota d-flex align-center justify-center max_rounded white--text"
      v-if="!quota"
    >
      Sedang memuat...
    </div>
    <h2 class="white--text my-3">Summary</h2>
    <v-row class="">
      <v-col cols="6">
        <div
          v-if="device"
          class="
            home_card
            max_rounded
            d-flex
            justify-center
            align-center
            flex-column
            _150height
          "
        >
          <h2 class="white--text">{{ device.status }}</h2>
          <p
            style="color: #eeeeee; font-size: small"
            v-if="device.status == 'connected'"
          >
            At {{ $date(device.connected_at).format("DD.MM.YYYY") }}
            {{ $date(device.connected_at).format("HH:mm") }}
          </p>
          <p
            style="color: #eeeeee; font-size: small"
            v-if="device.status == 'disconnected'"
          >
            At {{ $date(device.disconnected_at).format("DD.MM.YYYY") }}
            {{ $date(device.disconnected_at).format("HH:mm") }}
          </p>
        </div>
        <div
          v-if="!device"
          class="
            home_card
            max_rounded
            d-flex
            justify-center
            align-center
            _150height
            white--text
          "
        >
          Sedang memuat...
        </div>
      </v-col>
      <v-col cols="6">
        <div
          v-if="quota"
          class="
            home_card
            max_rounded
            d-flex
            justify-center
            align-center
            flex-column
            _150height
          "
        >
          <h1 class="white--text">{{ quota.today_usage }}</h1>
          <p style="color: #eeeeee; font-size: small">Terpakai</p>
        </div>
        <div
          v-if="!quota"
          class="
            home_card
            max_rounded
            d-flex
            justify-center
            align-center
            _150height
            white--text
          "
        >
          Sedang memuat...
        </div>
      </v-col>
    </v-row>
    <div
      class="home_card max_rounded pa-5 d-flex align-center pointer"
      style="margin-top: 20px"
    >
      <img
        src="../assets/img/bmc_icon_black.png"
        class="mr-3"
        height="50px"
        alt=""
      />
      <h3 class="white--text">Buy me a coffee</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState({
      quota: (state) => state.quota,
      device: (state) => state.status_device,
    }),
  },
  components: {},

  data() {
    return {};
  },
  mounted() {
    this.getQuota();
    this.checkStatusDevice();
  },
  methods: {
    getQuota() {
      this.$store.dispatch("getQuota").then((data) => {
        console.log(data.quota);
      });
    },
    checkStatusDevice() {
      this.$store.dispatch("getDevice").then((data) => {
        if (data.status == "connected") {
          localStorage.setItem("isConnected", true);
        } else {
          this.$router.push("/generate-qrcode");
        }
      });
    },
  },
};
</script>
<style>
.home_ {
  height: 100%;
  background: #1916a5;
}
.quota {
  background: #4d56b9;
  width: 100%;
  height: 200px;
  -webkit-box-shadow: 0px 49px 69px -24px rgba(0, 0, 0, 0.31);
  -moz-box-shadow: 0px 49px 69px -24px rgba(0, 0, 0, 0.31);
  box-shadow: 0px 49px 69px -24px rgba(0, 0, 0, 0.31);
  margin-bottom: 50px;
}
.v-progress-circular__underlay {
  stroke: #545dbc;
}
.home_card {
  background: #4d56b9;
  -webkit-box-shadow: 0px 49px 69px -24px rgba(0, 0, 0, 0.31);
  -moz-box-shadow: 0px 49px 69px -24px rgba(0, 0, 0, 0.31);
  box-shadow: 0px 49px 69px -24px rgba(0, 0, 0, 0.31);
}
._150height {
  height: 150px;
}
.pointer {
  cursor: pointer;
}
</style>
