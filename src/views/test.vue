<template>
  <div class="">
    <div class="my-3 d-flex pa-5">
      <v-file-input v-model="lifes" @change="getType"></v-file-input>
      <v-btn @click="crot">print</v-btn>
    </div>
    <div class="d-flex justify-center align-center">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="false"
        filename="hehehe"
        :paginate-elements-by-height="1100"
        :pdf-quality="2"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        :manual-pagination="false"
        @beforeDownload="beforeDownload($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <div class="phone_">
            <div class="interact">
              <div class="headle">
                <b>Interactive</b>
              </div>
              <div id="chart">
                <apexchart
                  type="area"
                  height="230"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
            </div>
            <div class="summary">
              <div class="_50 teals">
                <p>Cahs Out</p>
                <h3>$56.000</h3>
                <div class="temp_chrt">
                  <apexchart
                    type="line"
                    height="130"
                    :options="dummy.opt"
                    :series="dummy.series"
                  ></apexchart>
                </div>
              </div>
              <div class="_50 indigos">
                <p>Pending Cash</p>
                <h3>$23.000</h3>
                <div class="temp_chrt">
                  <apexchart
                    type="line"
                    height="130"
                    :options="dummy.opt"
                    :series="dummy.series"
                  ></apexchart>
                </div>
              </div>
            </div>
          </div>
        </section>
      </vue-html2pdf>
    </div>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  name: "testchart",
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      lifes: null,
      dummy: {
        series: [
          {
            name: "Desktops",
            data: [10, 41, 35, 51],
          },
        ],
        opt: {
          chart: {
            type: "line",
            height: 130,
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#fff"],
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          grid: {
            show: false,
            xaxis: {
              lines: {
                show: true,
              },
            },
          },
        },
      },
      series: [
        {
          name: "STOCK ABC",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chartOptions: {
        chart: {
          type: "area",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        labels: [21, 23, 25, 26, 27, 28, 29],
        colors: ["#009688"],

        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          opposite: true,
        },
        grid: {
          show: false,
        },
        legend: {
          horizontalAlign: "left",
        },
      },
    };
  },
  methods: {
    getType() {
      console.log(this.lifes);
    },
    crot() {
      this.$refs.html2Pdf.generatePdf();
    },
    async beforeDownload({ html2pdf, options, pdfContent }) {
      let vm = this;
      await html2pdf()
        .set(options)
        .from(pdfContent)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          let file = `data:application/pdf;base64, ${btoa(pdf.output())}`;
          var byteString = atob(file.split(",")[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);

          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          let filename = `wwww`;
          let newBlob = new File([ab], filename, { type: "application/pdf" });
          console.log(newBlob);
          vm.checkapi(newBlob);
        });
    },

    checkapi(pdf) {
      let data = new FormData();
      data.append("path", pdf, "bayu.pdf");
      this.$store.dispatch("check", data).then((data) => {
        console.log(data);
      });
    },
  },
};
</script>

<style scoped>
.bg-gray {
  background: gray;
}
.phone_ {
  width: 350px;
  height: 500px;
  border-radius: 15px;
  background: #fff;
  padding: 20px;
}
.interact {
  background: #fff;
  height: 250px;
  border-radius: 10px;
  width: 100%;
  -webkit-box-shadow: 0px 6px 85px -51px rgba(0, 0, 0, 0.62);
  -moz-box-shadow: 0px 6px 85px -51px rgba(0, 0, 0, 0.62);
  box-shadow: 0px 6px 85px -51px rgba(0, 0, 0, 0.62);
}
.summary {
  display: flex;
  margin-top: 20px;
}
._50 {
  width: 50%;
  background: #fff;
  height: 150px;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin: 5px;
  -webkit-box-shadow: 0px 6px 85px -51px rgba(0, 0, 0, 0.62);
  -moz-box-shadow: 0px 6px 85px -51px rgba(0, 0, 0, 0.62);
  box-shadow: 0px 6px 85px -51px rgba(0, 0, 0, 0.62);
}
.teals {
  background: #64cacb;
  color: #fff;
}
.indigos {
  background: #311b92;
  color: #fff;
}
.headle {
  padding: 5px;
  color: #64cacb;
}
p {
  margin: 0;
}
.temp_chrt {
  margin-top: -40px;
}
</style>