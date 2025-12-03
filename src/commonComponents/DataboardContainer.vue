<template>
  <div class="databoard-container">
    <div class="header">
      <div class="header-left">
        <img :src="iconUrl">
        <span class="title">
          {{ title }}
        </span>
        <span class="right-title">
          金额：均为税后净合同额
        </span>
      </div>
      <div class="header-right">
        {{tips}}
      </div>
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
    },
    tips: {
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
    justify-content: space-between;
    padding: 20px 0  17px;

    .header-left {
      display: flex;
      align-items: center;

      .right-title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666;
        letter-spacing: 0;
        font-weight: 400;
        margin-left: 20px;
      }
    }
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

    .header-right {
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
}
</style>