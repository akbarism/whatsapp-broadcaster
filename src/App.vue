<template>
  <v-app>
    <v-main>
      <div class="home d-flex justify-center">
        <div class="breakpoint bg_primary">
          <v-app-bar color="#0E31D9" dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          </v-app-bar>
          <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
              <v-list-item-group>
                <v-list-item
                  active-class="deep-purple--text text--accent-4"
                  link
                  to="/"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item
                  active-class="deep-purple--text text--accent--accent-4"
                  link
                  to="/sent-message"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-comment-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Sent Message</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: false,
    };
  },
};
</script>
<style>
.breakpoint {
  width: 100%;
}
.bg_primary {
  background: #eff1f9 !important;
  min-height: 100vh;
}
.max_rounded {
  border-radius: 10px !important;
}
/* input file custom */
.upload-btn-wrapper {
  width: max-content;
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
@media (min-width: 576px) {
  .breakpoint {
    width: 400px;
  }
}
@media (min-width: 768px) {
  .breakpoint {
    width: 400px;
  }
}
@media (min-width: 992px) {
  .breakpoint {
    width: 400px;
  }
}
</style>
