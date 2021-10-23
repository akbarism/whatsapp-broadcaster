<template>
  <div>
    <div class="pa-3 mt-3">
      <!-- <div class="pa-3">
        <v-file-input
          accept="image/png, image/gif, image/jpeg"
          v-model="file"
          @change="onUpload"
          label="File input"
        ></v-file-input>
      </div> -->
      <!-- <div v-if="urlImg" class="pa-3">
        <div style="position: relative">
          <v-btn
            fab
            depressed
            x-small
            color="red"
            dark
            style="position: absolute; right: -10px; top: -20px"
            @click="deleteImage"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <img :src="urlImg" width="100%" alt="" />
      </div> -->
      <v-text-field label="link" v-model="link"></v-text-field>
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
import firebase from "firebase";
export default {
  name: "typemsg",
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
      file: null,
      urlImg: null,
      link: '',
    };
  },
  mounted() {
    let file = JSON.parse(localStorage.getItem("file"));
    if (file) {
      this.urlImg = file.url;
    }
  },
  methods: {
    onUpload() {
      const ref = `whatsapp_broadcaster/${this.file.name}`;
      const storage = firebase.storage().ref();
      storage
        .child(ref)
        .put(this.file)
        .then((snapshot) => {
          console.log(snapshot);
          storage
            .child(ref)
            .getDownloadURL()
            .then((url) => {
              this.urlImg = url;
              let file = {
                ref: ref,
                url: url,
              };
              localStorage.setItem("file", JSON.stringify(file));
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteImage() {
      let ref = JSON.parse(localStorage.getItem("file")).ref;
      const storage = firebase.storage().ref().child(ref);
      storage.delete().then(() => {
        localStorage.removeItem("file");
        this.urlImg = null;
      });
    },
    broadcast() {
      this.dialog = true;
      let body = {};

      let i = 0;
      let loop = null;
      this.isIntervaled = true;
      loop = setInterval(() => {
        if (this.urlImg) {
          body = {
            phone_number: this.list[i],
            message: `${this.urlImg}`,
            caption: this.content,
            device_id: "xiamoi-kentang",
            message_type: "image",
          };
        } else {
          body = {
            phone_number: this.list[i],
            message: this.content,
            device_id: "xiamoi-kentang",
            message_type: "text",
          };
        }
        this.send(body, this.list[i], i);
        i++;
        if (i == this.list.length) {
          clearInterval(loop);
          this.isIntervaled = false;
          console.log("looping selesai");
          this.dialog = false;
        }
      }, 3000);
    },
    send(body, ppl, i) {
      console.log(ppl);
      this.$store
        .dispatch("sendMsg", body)
        .then(() => {
          this.count = i + 1;
          if (!this.isIntervaled) {
            // let today = this.$date().format("YYYY-MM-DD");
            let file = localStorage.getItem("file");
            if (file) {
              localStorage.removeItem("file");
              this.urlImg = null;
            }
            this.content = "";
            this.$router.push(`/sent-message`);
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
