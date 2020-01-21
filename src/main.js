import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Mock from "./mock";

Mock.start();

import SvgIcon from "vue-svgicon";
import "./static/icons";

import "./static/css/style.scss";

Vue.config.productionTip = false;

Vue.use(SvgIcon, {
  tagName: "svgicon",
  defaultWidth: "14px",
  defaultHeight: "14px"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
