<template>
  <div class="table-wrapper">
    <a-table :columns="columns" :data-source="dataSource" :pagination="false">
      <span
        slot="flag"
        slot-scope="text, record"
        :style="`color:${
          record.completionRate >= 100 ? '#00B78E ' : '#EF4444'
        }`"
        ><svg-icon icon-class="flag"
      /></span>
      <span
        slot="completionRate"
        slot-scope="text, record"
        :style="`color:${
          record.completionRate >= 100 ? '#00B78E ' : '#EF4444'
        }`"
        >{{ record.completionRate }}%</span
      >
      <span
        slot="gap"
        slot-scope="text, record"
        :style="`color:${record.gap >= 0 ? '#00B78E' : '#EF4444'}`"
        >{{ record.gap }}</span
      >
    </a-table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.table-wrapper {
  ::v-deep {
    .ant-table {
      border-left: 1px solid rgba(245, 245, 245, 1);
      border-right: 1px solid rgba(245, 245, 245, 1);
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 400;

      .ant-table-thead > tr > th {
        background: #f5faff;
      }
      .ant-table-tbody > tr > td {
        border-bottom: 1px solid rgba(245, 245, 245, 1);
      }
      .ant-table-thead > tr > th {
        border-bottom: 1px solid rgba(245, 245, 245, 1);
      }
      .ant-table-column-title {
        font-family: PingFang-SC-Bold;
        font-size: 20px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 700;
      }
    }
  }
}
</style>