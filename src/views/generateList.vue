<template>
  <div>
    <div class="pa-3 mt-3">
      <v-tabs
        v-model="tab"
        background-color="#0E31D9"
        centered
        dark
        icons-and-text
        class="mb-3 max_rounded"
      >
        <v-tab href="#tab-1">
          Import Excel
          <v-icon>mdi-file-excel-outline</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Manual Input
          <v-icon>mdi-pencil-box-multiple-outline</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="max_rounded">
        <v-tab-item value="tab-1">
          <v-card flat>
            <v-card-text class="pa-1">
              <div v-if="!listNumber">
                <div class="d-flex justify-end">
                  <v-btn
                    class="text-capitalize"
                    color="green"
                    text
                    :href="`${templateXl}`"
                  >
                    <v-icon>mdi-download</v-icon> Template
                  </v-btn>
                </div>
                <div class="d-flex justify-center pa-3" style="height: 100px">
                  <div class="upload-btn-wrapper">
                    <v-btn class="text-capitalize" color="#0E31D9" block dark>
                      <v-icon class="mr-2">mdi-file-excel-outline</v-icon>
                      <h4>Choose File</h4>
                    </v-btn>
                    <input
                      @change="chooseFile"
                      type="file"
                      name="myfile"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                  </div>
                </div>
              </div>
              <div v-if="listNumber" class="pa-3">
                <div v-for="(item, idx) in listNumber" :key="idx">
                  <div class="list_numb d-flex align-center mb-2">
                    <div class="mr-2">
                      <v-icon color="orange" size="40">mdi-account-box</v-icon>
                    </div>
                    <b>{{ item }}</b>
                  </div>
                  <v-divider></v-divider>
                </div>
                <div class="d-flex justify-space-between mt-5">
                  <v-btn
                    color="red"
                    class="text-capitalize"
                    dark
                    @click="resetList"
                  >
                    <v-icon class="mr-2">mdi-recycle</v-icon> reset</v-btn
                  >
                  <v-btn
                    color="#0E31D9"
                    class="text-capitalize"
                    to="/type-message"
                    dark
                  >
                    <v-icon class="mr-2">mdi-comment-multiple</v-icon> Tulis
                    Pesan</v-btn
                  >
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <v-card flat class="pa-3">
            <h3>Tulis Nomor</h3>
            <p style="font-size: small; color: red">
              Nomor <b>Wajib</b> di awali dengan angka 62!
            </p>
            <div class="pa-3">
              <section v-for="(item, idx) in manualNumber" :key="idx">
                <v-text-field
                  v-model="manualNumber[idx]"
                  class="mb-3"
                  label="Nomor Wa"
                  placeholder="Nomor Wa"
                  outlined
                  type="number"
                  dense
                  hide-details="auto"
                ></v-text-field>
              </section>
              <div class="d-flex justify-end mt-5 mb-2">
                <v-btn
                  color="#0E31D9"
                  class="text-capitalize"
                  dark
                  @click="addField"
                >
                  <v-icon class="mr-1">mdi-plus</v-icon> Tambah nomor</v-btn
                >
              </div>
              <v-divider></v-divider>
              <div class="d-flex justify-space-between mt-5">
                <v-btn
                  color="red"
                  class="text-capitalize"
                  dark
                  @click="resetList"
                >
                  <v-icon class="mr-2">mdi-recycle</v-icon> reset</v-btn
                >
                <v-btn
                  color="#0E31D9"
                  class="text-capitalize"
                  @click="validate"
                  dark
                >
                  <v-icon class="mr-2">mdi-comment-multiple</v-icon> Tulis
                  Pesan</v-btn
                >
              </div>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <div class="pa-3">
            <div class="d-flex justify-center mb-2">
              <img src="../assets/img/warncon.png" height="100px" alt="" />
            </div>
            <p class="text-center ma-0">
              <b>Nomor Tidak Valid!</b>
            </p>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="indigo" text @click="dialog = false"> ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "generatelist",

  components: {},
  data() {
    return {
      tab: null,
      listNumber: null,
      dialog: false,
      templateXl:
        "https://files.fm/down.php?cf&i=7eb4tcrvt&n=format-boradcast.xlsx",
      manualNumber: ["62"],
    };
  },
  mounted() {},
  methods: {
    chooseFile(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          let getVal = [];
          console.log(data);
          data.forEach((el, i) => {
            if (i > 1 && el[0] != null) {
              getVal.push(el[0]);
            }
          });
          this.listNumber = getVal;
          this.$store.commit("SET_LIST_PPL", getVal);
          localStorage.setItem("queue", JSON.stringify(getVal));
        };

        reader.readAsBinaryString(this.file);
      }
    },
    addField() {
      let idx = this.manualNumber.length - 1;
      console.log(this.manualNumber[idx].length);
      if (this.manualNumber[idx].length <= 2) {
        this.dialog = true
      } else {
        this.manualNumber.push("62");
      }
    },
    validate() {
      let parsedNumber = [];
      this.manualNumber.forEach((el) => {
        if (el.length > 2 && el != null) {
          parsedNumber.push(parseInt(el));
        }
      });
      this.listNumber = parsedNumber;
      this.$store.commit("SET_LIST_PPL", parsedNumber);
      localStorage.setItem("queue", JSON.stringify(parsedNumber));
      this.$router.push('/type-message')
    },
    resetList() {
      this.listNumber = null;
    },
  },
};
</script>
<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
