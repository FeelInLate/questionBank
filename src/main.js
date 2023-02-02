import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/global.css";
import request from "@/utils/request";
import MathJax from "@/utils/MathJax";

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "small" });
Vue.prototype.request = request;
Vue.prototype.MathJax = MathJax;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
