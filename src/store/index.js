import { createStore } from "vuex";
import auth from "./modules/auth";
import inquiry from "./modules/inquiry";
import user from "./modules/user";

export default createStore({
  modules: {
    auth,
    inquiry,
    user,
  },
});
