<template>
  <div class="board-wrapper" :style="{ flexWrap: isWrap ? 'wrap' : 'nowrap' }">
    <div class="remark" v-html="remark"></div>
    <div
      v-for="item in items"
      :key="item.title"
      class="board-item"
      :style="`flex: ${item.flex ? item.flex : '1'};cursor: ${handleClick? 'pointer' : 'default'};`"
      @click="handleClick(item)"
    >
      <div class="left">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="value" :style="`color: ${item.color}`">
          <span v-if="item.isPercent">{{item.value === '%' || !item.value ? '0.00%' : item.value}}</span>
          <span v-else>{{item.value || '0'}}</span>
        </div>
        <div v-if="item.isPercent" class="progress">
          <div
            class="progress-value"
            :style="{ width: item.value, background: item.color }"
          ></div>
        </div>
      </div>
      <div class="right">
        <img v-if="item.imgUrl" :src="item.imgUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isWrap: {
      type: Boolean,
      default: false,
    },
    handleClick: {
      type: Function,
      default: null,
    },
    remark: {
      type: String,
      default: '',
    }
  },
};
</script>

<style scoped lang="scss">
.board-wrapper {
  color: #333333;
  display: flex;
  gap: 20px;
  align-items: center;
  .remark {
    width: 30px;
    font-family: PingFang-SC-Bold;
    font-size: 18px;
    color: #333;
    letter-spacing: 0;
    font-weight: 700;
    text-align: center;
  }
  .board-item {
    flex: 1;
    height: 168px;
    display: flex;
    background: #f4faff;
    border-radius: 10px;
    padding: 28px 20px 20px 40px;

    .left {
      display: flex;
      flex-direction: column;
      flex: 1;
      .title {
        font-family: PingFang-SC-Bold;
        font-size: 18px;
        color: #666666;
        letter-spacing: 0;
        font-weight: 700;
      }
      .value {
        font-family: MicrosoftYaHei-Bold;
        font-size: 40px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 700;
      }
      .progress {
        height: 10px;
        background: #e5e7eb;
        border-radius: 5px;
        margin-right: 30px;
        position: relative;
        margin-top: 10px;

        .progress-value {
          position: absolute;
          top: 0;
          left: 0;
          height: 10px;
          border-radius: 5px;
        }
      }
    }
    .right {
      display: flex;
      align-items: flex-end;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>