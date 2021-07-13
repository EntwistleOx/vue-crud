import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const API_URI = "https://us-central1-vuecrud-jd.cloudfunctions.net/users";

export default new Vuex.Store({
  state: {
    users: [],
    user: {},
    loading: true,
    isCreate: true,
  },
  mutations: {
    IS_LOADING(state) {
      state.loading = true;
    },
    IS_CREATE(state, value) {
      state.isCreate = value;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    GET_USERS(state, users) {
      state.users = users;
      state.loading = false;
    },
  },
  actions: {
    async fetch_Users({ commit }) {
      try {
        const response = await axios.get(`${API_URI}/users`);
        commit("GET_USERS", response.data);
      } catch (error) {
        Vue.prototype.$notification({
          title: "Error",
          message: `Ha ocurrido un error: ${error}`,
          type: "error",
        });
      }
    },
    async create_User({ commit }, user) {
      try {
        commit("IS_LOADING");
        await axios.post(`${API_URI}/users`, user);
        Vue.prototype.$notification({
          title: "Exito",
          message: "Usuario creado.",
          type: "success",
        });
      } catch (error) {
        Vue.prototype.$notification({
          title: "Error",
          message: `Ha ocurrido un error: ${error}`,
          type: "error",
        });
      }
    },
    async delete_User({ commit }, id) {
      try {
        commit("IS_LOADING");
        await axios.delete(`${API_URI}/users/${id}`);
        Vue.prototype.$notification({
          title: "Exito",
          message: "Usuario eliminado.",
          type: "success",
        });
      } catch (error) {
        Vue.prototype.$notification({
          title: "Error",
          message: `Ha ocurrido un error: ${error}`,
          type: "error",
        });
      }
    },
    set_Edit({ commit, state }, id) {
      commit("IS_CREATE", false);
      const user = state.users.find((user) => user.id === id);
      const clonedUser = { id, ...user.data };
      commit("SET_USER", clonedUser);
    },
    unset_Edit({ commit }) {
      commit("IS_CREATE", true);
      commit("SET_USER", {});
    },
    async edit_User({ commit }, user) {
      try {
        const data = { name: user.name, email: user.email };
        commit("IS_LOADING");
        await axios.put(`${API_URI}/users/${user.id}`, data);
        Vue.prototype.$notification({
          title: "Exito",
          message: "Usuario editado.",
          type: "success",
        });
      } catch (error) {
        Vue.prototype.$notification({
          title: "Error",
          message: `Ha ocurrido un error: ${error}`,
          type: "error",
        });
      }
    },
  },

  modules: {},
});
