import App from "./App.vue";
import { createVueFrontApp } from "@vuefront-create-app";
createVueFrontApp(App).then((m) => {
  m.$mount("#app");
});
