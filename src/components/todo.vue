<template>
  <div class="page">
    <nav>
      <!-- todo 的头部显示状态 -->
      <div class="page-title" v-show="!isUpdate">
        <div class="title-left" @click="isUpdate = true">
          <span class="title-text">
            {{ todo.title }}
          </span>
          <span class="count-list">{{ todo.count || 0 }}</span>
        </div>
        <div class="title-right">
          <span @click="onlock">
            <svgicon name="lock" v-show="todo.locked"></svgicon>
            <svgicon name="unlock" v-show="!todo.locked"></svgicon>
          </span>
          <svgicon name="delete" @click="onDelete"></svgicon>
        </div>
      </div>
      <!-- todo 头部编辑状态 -->
      <div class="title-edit" v-show="isUpdate">
        <div class="title-left">
          <input type="text" v-model="todo.title" :disabled ="todo.locked" />
        </div>
        <div class="title-right">
          <svgicon
            @click="isUpdate = false;updateTodo()"
            width="20px"
            height="20px"
            name="close"
          >
          </svgicon>
        </div>
      </div>
      <!-- todo 添加 -->
      <div class="todo-new">
        <input type="text" v-model="text" placeholder="请输入" @keyup.enter="onAdd" :disabled="todo.locked"/>
        <svgicon width="18px" height="18px" name="add-radius"></svgicon>
      </div>
    </nav>
    <!-- 头部 End -->
    <!-- todo list 主体 -->
    <div class="list-main">
      <item
        v-for="(item, index) in itemList"
        :key="index"
        :item="item"
        :index="index"
        :id="todo.id"
        :init="init"
        :locked="todo.locked"
      ></item>
    </div>
  </div>
</template>
<script>
import item from "./item";
import { addRecord, getTodo, editTodo } from "../api/service";
export default {
  data() {
    return {
      todo: {
        title: "星期一", // 标题
        count: 12, // 数量
        locked: false // 是否绑定
      },
      itemList: [
        // 代办单项列表
      ],
      text: "", // 用户输入单项项绑定的输入
      isUpdate: false // 新增修改状态
    };
  },
  components: {
    item
  },
  watch: {
    "$route.params.id"() {
      /*路由ID 发生改变，重新初始清单列表数据 */
      this.init();
    }
  },
  methods: {
    init() {
      const ID = this.$route.params.id;
      getTodo({ id: ID }).then(res => {
        /*返回清单列表数据 */
        let todo = res.result.todo;
        this.itemList = todo.record;
        this.todo = {
          id: todo.id,
          title: todo.title,
          count: todo.count,
          locked: todo.locked,
          isDelete: todo.isDelete
        };
      });
    },
    updateTodo() {
      /*更新todo操作 */
      let _this = this;
      editTodo({
        todo: this.todo
      }).then(data => {
        _this.$store.dispatch("getTodo");
      });
    },
    onlock() {
      /*加锁 */
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    },
    onAdd (){
      /*添加事项 */
      const ID = this.$route.params.id;
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = '';
        this.init();
        this.$store.dispatch('getTodo');
      });
    },
    onDelete (){
      /*删除 */
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    }
  }
};
</script>
<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  input {
    background: transparent;
    font-size: 1.125em;
    width: 100%;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 400;
    border: none;
    border-radius: 0;
    box-sizing: border-box;
    color: #333;
    outline: none;
  }
  nav {
    background: linear-gradient(to bottom, #d0edf5, #e1e5f0 100%);
    padding: 12px 12px;
    .title-edit,
    .page-title {
      display: flex;
      justify-content: space-between;
    }
    .title-edit {
      svg {
        fill: #1c3f53;
      }
      input[disabled] {
        opacity: 0.5;
      }
    }
    .todo-new {
      display: flex;
      margin-top: 10px;
      svg {
        fill: #aaa;
      }
      input[type="text"]{
        order: 2;
        margin-left: 12px;
        color: #777;
        font-size: 14px;
        &:focus{
          & ~ svg{
            fill: #2cc5d2;
          }
        }
      }
      input[disabled] {
        opacity: 0.5;
      }
    }
  }
  .list-main {
    flex: 1;
    overflow: auto;
  }
  .title-edit,
  .page-title {
    .title-left {
      flex: 1;
      text-align: left;
      width: 1px;
      max-width: calc(100% - 250px);
      cursor: pointer;
      .title-text {
        color: #1c3f53;
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: top;
        max-width: calc(100% - 20px);
      }
      .count-list {
        float: none;
        position: relative;
        top: -8px;
      }
    }
    svg {
      fill: #1c3f53;
      margin-left: 10px;
    }
  }
}
</style>
