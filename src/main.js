import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/global.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";

library.add(faBomb, faFlag);

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.mount("#app");