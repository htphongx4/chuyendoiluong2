import { defineStore } from "pinia";
import actions from "./actions";
import getters from "./getters";
import state from "./state";

export const useSalaryStore = defineStore({
  id: "salary",
  state,
  actions,
  getters,
});
