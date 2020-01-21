import { getTodoList } from "../api/service";

export const getTodo = ({ commit }) => {
  return new Promise(resolve => {
    getTodoList().then(res => {
      commit("EDIT_TODO", res.result.todos);
      resolve(res.result.todos);
    });
  });
};
