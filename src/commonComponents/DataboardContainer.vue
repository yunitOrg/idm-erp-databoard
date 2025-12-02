<template>
  <div class="databoard-container">
    <div class="header">
      <img :src="iconUrl">
      <span class="title">
        {{ title }}
      </span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    iconUrl: {
      type: String,
      default: "",
    }
  },
};
</script>

<style scoped lang="scss">
.databoard-container {
  color: #333333;
  padding: 0 20px 20px;
  background-color: #fff;

  .header {
    display: flex;
    align-items: center;
    padding: 20px 0  17px;
    img {
      width: 38px;
      height: 38px;
      margin-right: 14px;
    }
    .title {
      font-family: PingFang-SC-Bold;
      font-size: 24px;
      color: #333333;
      letter-spacing: 0;
      line-height: 32px;
      font-weight: 700;
    }
  }
}
</style>