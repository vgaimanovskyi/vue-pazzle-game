import { createStore } from "vuex";
import { optionsModule } from "@/store/modules/optionsModule";
import { imageModule } from "@/store/modules/imageModule";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    options: optionsModule,
    image: imageModule,
  },
});
