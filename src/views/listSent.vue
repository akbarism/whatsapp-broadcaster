<template>
  <div>
    <div class="pa-3 mt-3">
      <v-tabs
        v-model="tab"
        background-color="#0E31D9"
        centered
        dark
        class="mb-3 max_rounded"
      >
        <v-tab href="#tab-1" @click="swipeTab('sent')"> Success </v-tab>
        <v-tab href="#tab-2" @click="swipeTab('pend')"> Pending </v-tab>
        <v-tab href="#tab-3" @click="swipeTab('er')"> Failed </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1" active-class="secondarys">
          <SuccessSent ref="sent" />
        </v-tab-item>
        <v-tab-item value="tab-2" active-class="secondarys">
          <PendingSent ref="pend" />
        </v-tab-item>
        <v-tab-item value="tab-3" active-class="secondarys">
          <FailedSent ref="er" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import FailedSent from "../components/Sent/failedSent.vue";
import PendingSent from "../components/Sent/pendingSent.vue";
import SuccessSent from "../components/Sent/successSent.vue";
export default {
  name: "generatelist",

  components: { SuccessSent, PendingSent, FailedSent },
  data() {
    return {
      tab: null,
      listNumber: null,
      templateXl:
        "https://files.fm/down.php?cf&i=7eb4tcrvt&n=format-boradcast.xlsx",
    };
  },
  mounted() {},
  methods: {
    swipeTab() {
      setTimeout(() => {
        // this.$refs[tab].getSentMsg(true);
      }, 500);
    },
  },
};
</script>
<style scoped>
.secondarys {
  background: #eff1f9;
}
</style>
