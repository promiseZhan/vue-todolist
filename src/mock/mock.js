/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import Mock from "mockjs";
import { Todos } from "./data/todoList";

const { handleSuccess, handleError } = require("./handle");

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

export default {
  start() {
    let mock = new MockAdapter(axios);
    // 获取todo列表
    mock.onGet("/todo/list").reply(config => {
      /*请求menu菜单数据接口 */
      let mockTodo = Todos.map(todo => {
        /* 重组数据*/
        return {
          id: todo.id,
          title: todo.title,
          count: todo.record.filter(data => {
            return data.checked === false;
          }).length,
          locked: todo.locked,
          isDelete: todo.isDelete
        };
      }).filter(todo => {
        /*过滤已删除的 */
        return todo.isDelete === false;
      });

      return new Promise((resolve, reject) => {
        resolve([
          200,
          handleSuccess({
            result: {
              todos: mockTodo // 返回状态为200，并且返回todos数据
            }
          })
        ]);
      });
    });

    mock.onGet("/todo/listId").reply(config => {
      /*根据清单ID 查询 清单列表 */
      let { id } = config.params; // id 是传进来的值
      /*根据ID 找到对应清单 */
      let todo = Todos.find(todo => {
        return id && todo.id === id;
      });
      // 计算未完成数
      todo.count = null;
      if (todo) {
        todo.count = todo.record.filter(data => {
          return data.checked === false;
        }).length;
      }
      return new Promise((resolve, reject) => {
        /*返回 */
        resolve([
          200,
          handleSuccess({
            result: {
              todo: todo // 返回状态为200，并且返回todos数据
            }
          })
        ]);
      });
    });

    mock.onPost("/todo/editRecord").reply(config => {
      /*修改具体某个清单列表 */
      let { id, record, index } = JSON.parse(config.data);
      Todos.some(t => {
        if (t.id === id) {
          /* */
          t.record[index] = record;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        resolve([200]);
      });
    });

    mock.onPost("/todo/editTodo").reply(config => {
      /*更改某个清单的状态 */
      let { todo } = JSON.parse(config.data);
      Todos.some(t => {
        if (t.id === todo.id) {
          t.title = todo.title;
          t.locked = todo.locked;
          t.isDelete = todo.isDelete;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        resolve([200]);
      });
    });

    mock.onPost("/todo/addRecord").reply(config => {
      /*添加事项 */
      let { id, text } = JSON.parse(config.data);
      // id 是传进来的值唯一待办项的id
      // text 用户新增输入的数据
      Todos.some((t, index) => {
        if (t.id === id) {
          t.record.push({
            text: text,
            isDelete: false,
            checked: false
          });
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        resolve([200]);
      });
    });

    mock.onPost("/todo/addTodo").reply(config => {
      /*添加清单 */
      Todos.push({
        id: Mock.Random.guid(),
        title: "newList",
        isDelete: false,
        locked: false,
        record: []
      });
      return new Promise((resolve, reject) => {
        resolve([200]);
      });
    });
  }
};
