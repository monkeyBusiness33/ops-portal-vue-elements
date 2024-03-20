import { createApp } from "vue";
import "./assets/main.scss";
import App from "./App.vue";
import clickOutSide from "@/directives/clickOutSide";
import { createPinia } from "pinia";
import {
  // Directives
  // Components
  Dropdown,
  Menu,
} from "floating-vue";
import VueSweetalert2 from "vue-sweetalert2";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import vuetify from "@/plugins/vuetify";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(vuetify);

// Floating vue
app.component("VDropdown", Dropdown);
app.component("FVMenu", Menu);

// add global instance for Swal
app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;

app.use(PerfectScrollbar);

// directives
app.directive("click-outside", clickOutSide);

app.mount("#chat-app");
