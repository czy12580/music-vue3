<template>
    <div class="wrapper">
      <div class="block">
        <van-loading size="36px" color="#1989fa"
                     vertical style="margin: auto;">加载中...</van-loading>
      </div>
  </div>
</template>
<script>
export default {
  setup() {

  },
}
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.block {
  display: flex;
  width: 120px;
  height: 120px;
  border-radius: 5px;
  text-align: center;
  background: #fff;
}
</style>
