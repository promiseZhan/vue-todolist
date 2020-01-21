<template>
  <div class="layouts">
    <section class="menu">
      <menus></menus>
    </section>
    <div class="layouts-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menus from "@/components/menus";
export default {
  name: "layouts",
  components: {
    menus
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.layouts {
  display: flex;
  height: 100%;
  width: 75%;
  margin: 0 auto;
  .menu {
    width: 270px;
  }
  .layouts-content {
    flex: 1;
    background: #fff;
  }
}
</style>
