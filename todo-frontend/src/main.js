import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faObjectGroup,
  faPen,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getTasks } from "./request/tasks";
import { getGroups } from "./request/groups";

Vue.config.productionTip = false;

library.add(faCaretDown, faObjectGroup, faPen, faPlus, faTimes);
Vue.component("fa-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Promise.all([getTasks(), getGroups()]).then(data => {
      store.state.tasks = data[0];
      store.state.groups = data[1];
      store.state.init = true;
    });
  }
}).$mount("#app");
