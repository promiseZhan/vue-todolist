<template>
  <div class="list-item" :class="{checked: item.checked}" v-show="!item.isDelete">
    <label class="checkbox">
      <span class="checkbox-custom">
        <svgicon name="ok"></svgicon>
        <input v-model="item.checked" type="checkbox" name="checked" @change="onChange" :disabled="locked"/>
      </span>
    </label>
    <input type="text" v-model="item.text" placeholder="写点什么。。。" :disabled="item.checked || locked" @keyup.enter="onChange"/>
    <span class="item-delete" v-if="item.checked && !locked" @click="item.isDelete = true;onChange()">
      <svgicon width="16px" height="16px" name="delete"></svgicon>
    </span>
  </div>
</template>
<script>
import { editRecord } from "../api/service";
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: "Hello World"
        };
      }
    },
    index: {},
    id: {},
    init: {},
    locked: {}
  },
  data() {
    return {};
  },
  methods: {
    onChange() {
      editRecord({
        id: this.id, record: this.item, index: this.index
      }).then(data => {
        this.init();
        this.$store.dispatch("getTodo");
      });
    }
  }
};
</script>
<style scoped lang="scss">
.list-item {
  display: flex;
  font-size: 14px;
  align-items: center;
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
  input {
    font-size: 14px;
    flex: 1;
  }
  input[disabled] {
    color: #aaa;
  }
  label {
    width: 44px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    input[type="checkbox"] {
      visibility: hidden;
    }
    .checkbox-custom {
      svg {
        position: absolute;
        fill: #ccc;
        top: 50%;
        right: auto;
        bottom: auto;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: none;
      }
      position: relative;
      &:before {
        position: absolute;
        top: 50%;
        right: auto;
        bottom: auto;
        left: 50%;
        width: 0.85em;
        height: 0.85em;
        transform: translate3d(-50%, -50%, 0);
        background: transparent;
        box-shadow: #abdfe3 0 0 0 1px inset;
        content: "";
        display: block;
      }
    }
  }
  &.checked {
    /*清单勾选状态 */
    .checkbox-custom {
      &:before {
        content: none;
        display: none;
      }
      svg {
        display: block;
      }
    }
    input[type="text"] {
      color: #ddd;
      text-decoration: line-through;
    }
  }
  .item-delete {
    color: #ccc;
    padding: 0 15px;
    svg {
      fill: #888;
    }
  }
}
</style>
