<template>
  <div class="list-todos">
    <div
      @click="goList(item.id)"
      class="list-todo"
      :class="{ active: item.id === todoId }"
      v-for="item in todoList"
      :key="item.id"
    >
      <svgicon name="lock" v-show="item.locked"></svgicon>
      <span class="count-list" v-show="item.count > 0">{{ item.count }}</span>
      {{ item.title }}
    </div>
    <div class="add-todo" @click="addTodoList">
      <svgicon name="add"></svgicon>
      新增
    </div>
  </div>
</template>
<script>
import { addTodo } from "../api/service";
// 引入我们 封装好的两个接口函数。
export default {
  data() {
    return {
      todoId: "",
      todoNum: 0
    };
  },
  watch: {
    todoId(id) {
      this.$router.push({ name: "todo", params: { id: id } });
    }
  },
  computed: {
    todoList() {
      const number = this.$store.getters.getTodoList.length;
      //this.todoNum = number;
      return this.$store.getters.getTodoList;
    }
  },
  created() {
    this.$store.dispatch("getTodo").then(() => {
      // 调用vuex actions.js 里面的 getTodo函数
      this.$nextTick(() => {
        this.goList(this.todoList[0].id);
      });
    });
  },
  methods: {
    goList(id) {
      // 点击菜单时候,替换选中id
      this.todoId = id;
    },
    addTodoList() {
      /*添加新的清单 */
      addTodo().then(data => {
        this.$store.dispatch("getTodo").then(todos => {
          this.$nextTick(() => {
            this.goList(todos[todos.length - 1].id);
          });
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.list-todos {
  .list-todo,
  .add-todo {
    /*文字省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*文字省略号 */
    box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 0;
    display: block;
    line-height: 23px;
    padding: 12px 40px;
    position: relative;
    text-decoration: none;
    text-align: left;
    cursor: pointer;
    overflow-x: hidden;
    color: rgba(255, 255, 255, 0.4);
    font-size: 15px;
    svg {
      fill: rgba(255, 255, 255, 0.4);
      float: left;
      margin-left: -30px;
      margin-top: 3px;
    }
  }
  .list-todo.active {
    color: #fff;
    svg {
      fill: #fff;
    }
  }
  .add-todo {
    color: #5db9ff;
    svg {
      width: 15px;
      height: 15px;
      fill: #5db9ff;
    }
  }
}
</style>
