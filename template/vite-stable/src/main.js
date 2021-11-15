import App from "./App.vue";
import { createVueFrontApp } from "@vuefront-create-app";

export const createApp = async () => {
  const m = await createVueFrontApp(App);
  return m;
};
