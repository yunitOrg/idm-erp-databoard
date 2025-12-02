<template>
  <div class="board-wrapper">
    <div v-for="item in items" :key="item.title" class="board-item">
      <div class="left">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="value" :style="`color: ${item.color}`">
          <span>{{ item.isPercent? item.value.toFixed(2) : item.value }}</span><span v-if="item.isPercent">%</span>
        </div>
        <div v-if="item.isPercent" class="progress">
          <div
            class="progress-value"
            :style="{ width: item.value + '%', background: item.color }"
          ></div>
        </div>
      </div>
      <div class="right">
        <img :src="item.imgUrl" alt="" />
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
  },
};
</script>

<style scoped lang="scss">
.board-wrapper {
  color: #333333;
  display: flex;
  gap: 20px;
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
        font-size: 18px;
        color: #666666;
      }
      .value {
        font-size: 40px;
        font-weight: 700;
        margin: 8px 0;
      }
      .progress {
        height: 10px;
        background: #e5e7eb;
        border-radius: 5px;
        margin-right: 30px;
        position: relative;

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