<template>
  <div>
    <div class="mt-3" v-if="!loading">
      <v-card
        flat
        class="rounded_max pa-2 mb-2"
        v-for="(msg, idx) in sentMsg"
        :key="idx"
      >
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon class="mr-2" color="orange" size="40"
              >mdi-account-box</v-icon
            >
            <div>
              <p class="ma-0 pa-0">
                <b>{{ msg.payload.phone_number }}</b>
              </p>
            </div>
          </div>
          <v-btn
            depressed
            :color="msg.status == 'success' ? 'green' : 'red'"
            dark
            small
            class="text-capitalize"
            >{{ msg.status }}</v-btn
          >
        </div>
        <small class="grey--text"
          >{{ $date(msg.created_at).format("DD.MM.YYYY") }}
          {{ $date(msg.created_at).format("HH:MM") }}
        </small>
      </v-card>
      <div class="d-flex justify-center" v-if="meta">
        <v-btn
          color="#0E31D9"
          class="text-capitalize"
          dark
          v-if="!loadSent"
          @click.once="getSentMsg"
        >
          More</v-btn
        >
        <v-btn color="#0E31D9" class="text-capitalize" dark v-if="loadSent">
          Loading</v-btn
        >
      </div>
    </div>
    <div class="pa-3" v-if="loading">loading...</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "generatelist",
  computed: {
    ...mapState({
      sentMsg: (state) => state,
    }),
  },
  components: {},
  data() {
    return {
      loading: false,
      loadSent: false,
      meta: null,
    };
  },
  mounted() {
    this.getSentMsg(true);
    this.today = this.$route.params.date
  },
  methods: {
    getSentMsg(tab) {
      if (tab == true) {
        this.meta = null;
        this.loading = true;
      }
      let data = {
        meta: this.meta,
        status: "success",
        date: this.today
      };
      this.loadSent = true;
      this.$store
        .dispatch("getSentMsg", data)
        .then((data) => {
          this.meta = data.meta.last_key;
          this.loadSent = false;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadSent = false;
          this.loading = false;
        });
    },
  },
};
</script>
<style>
