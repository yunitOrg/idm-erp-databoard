<template>
  <div class="databoard-header">
    <div class="databoard-header-left">
      <span class="title">
        {{ title }}
      </span>
      <span class="right-title">
        {{ rightTitle }}
      </span>
    </div>
    <div class="databoard-header-right">
      <a-space>
        <a-button @click="refreshData"><svg-icon icon-class="refresh" />刷新数据</a-button>
        <a-button type="primary">汇报视图</a-button>
      </a-space>
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
    rightTitle: {
      type: String,
      default: "",
    },
  },
  methods: {
    refreshData(){
      this.$emit("refreshData")
    }
  },
};
</script>

<style scoped lang="scss">
.databoard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 30px 29px;
  color: #333333;
  box-shadow: 0px 4px 9px 0px rgba(0,0,0,0.06);

  .databoard-header-left {
    .title {
      font-family: PingFang-SC-Bold;
      font-size: 32px;
      font-weight: 700;
    }
    .right-title {
      font-size: 18px;
      color: #666666;
      font-weight: 400;
      margin-left: 10px;
    }
  }

  .databoard-header-right {
    .ant-btn  {
      height: 44px;
      font-size: 18px;
      background-color: #F9FAFB;
      border: 1px solid rgba(223,236,254,1);
      color: #2563EB;
      &.ant-btn-primary {
        background-color: #2563EB;
        border: 1px solid #DFECFE;
        color: #FFFFFF;
      }
      .svg-icon {
        margin-right: 6px;
      }
    }
  }
}
</style>