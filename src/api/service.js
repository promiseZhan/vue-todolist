import { post, get } from "./axios";

export function getTodoList(params) {
  /*获取菜单列表 */
  return get("/todo/list", params).then(res => res.data);
}
export function getTodo(params) {
  /*根据ID获取具体清单 */
  return get("/todo/listId", params).then(res => res.data);
}
export function editRecord(params) {
  /*修改清单列表 */
  return post("/todo/editRecord", params).then(res => res.data);
}
export function editTodo(params) {
  /*更新某个清单数据 */
  return post("/todo/editTodo", params).then(res => res.data);
}
export function addRecord(params) {
  /*添加事项 */
  return post("/todo/addRecord", params).then(res => res.data);
}
export function addTodo(params) {
  /*新增清单 */
  return post("/todo/addTodo", params).then(res => res.data);
}
