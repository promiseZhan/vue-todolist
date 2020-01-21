import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";

Vue.use(Vuex);
//创建初始应用全局状态变量
const state = {
  todoList: [], //待办事项列表数据
  menuOpen: false //移动端菜单是否开启
};

// 更新数据事件
const mutations = {
  EDIT_TODO(state, data) {
    //更新todoList数据
    state.todoList = data;
  },
  MENUOPEN(state) {
    //改变menuOpen的值
    state.menuOpen = !state.menuOpen;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
