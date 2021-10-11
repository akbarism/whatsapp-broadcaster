<template>
  <div>
    <div class="pa-3 mt-3">
      <v-card flat class="max_rounded pa-3">
        <v-textarea
          v-model="content"
          outlined
          hide-details
          label="ketik Pesan"
        ></v-textarea>
      </v-card>
      <div class="d-flex justify-end mt-3">
        <v-btn color="#0E31D9" class="text-capitalize" @click="broadcast" dark>
          <v-icon class="mr-2">mdi-comment</v-icon> Send</v-btn
        >
      </div>
    </div>
    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-text>
          <div class="d-flex justify-center align-center" style="height: 200px">
            <div>
              <b>Sedang Mengirim {{ count }} pesan...</b>
              <v-progress-linear
                indeterminate
                color="#0E31D9"
              ></v-progress-linear>
              <p class="red--text text-center mt-5">
                Dimohon untuk tidak merefresh atau close halaman saat proses
                pengiriman masih berlangsung
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "generatelist",
  computed: {
    ...mapState({
      list: (state) => state.listNumber,
    }),
  },
  components: {},
  data() {
    return {
      content: "",
      isIntervaled: false,
      dialog: false,
      count: null,
    };
  },
  mounted() {},
  methods: {
    broadcast() {
      this.dialog = true;
      let i = 0;
      let loop = null;
      this.isIntervaled = true;
      loop = setInterval(() => {
        this.send(this.list[i], i);
        i++;
        if (i == this.list.length) {
          clearInterval(loop);
          this.isIntervaled = false;
          console.log("looping selesai");
          this.dialog = false;
        }
      }, 3000);
    },
    send(ppl, i) {
      console.log(ppl);
      let data = {
        phone_number: ppl,
        message: this.content,
        device_id: "xiamoi-kentang",
        message_type: "text",
      };
      this.$store
        .dispatch("sendMsg", data)
        .then(() => {
          this.count = i + 1;
          if (!this.isIntervaled) {
            let today = this.$date().format("YYYY-MM-DD");
            this.content = "";
            this.$router.push(`/recent-sent/${today}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
