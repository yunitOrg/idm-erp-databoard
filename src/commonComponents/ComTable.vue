<template>
  <div class="table-wrapper">
    <a-table :customRow="customRow" :columns="columns" :data-source="dataSource" :pagination="false" :bordered="bordered" :rowKey="rowKey">
      <span
        slot="flag"
        slot-scope="text, record"
        :style="`color:${
          parseFloat(record.wcl || 0)  >= 100 ? '#00B78E ' : '#EF4444'
        }`"
        ><svg-icon icon-class="flag"
      /></span>
      <span
        slot="completionRate"
        slot-scope="text"
        :style="`color:${getProcessColor(text)}`"
        >{{ text === '%' ? '0.00%' : text }}</span
      >
      <span
        slot="gap"
        slot-scope="text"
        :style="`color:${getGapValueColor(text)}`"
        >{{ text }}</span
      >
      <template slot="zc" scope="text,record,index">
        <img class="address-icon" :src="addressIcon" alt="" v-if="getCurrentWeekNumber() === index">
        {{ text }}
      </template>
    </a-table>
  </div>
</template>

<script>
import {getProcessColor,getGapValueColor, getCurrentWeekNumber} from '@/utils/index.js'
import addressIcon from "@/assets/address.png";
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
    bordered: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    propData: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      getProcessColor,
      getGapValueColor,
      getCurrentWeekNumber,
      addressIcon
    }
  },
  methods: {
    customRow(row, index) {
      return {
        style: {
          backgroundColor: getCurrentWeekNumber() === index  ? '#f5faff' : '#FFFFFF',
        },
        on: {
          click: () => {
            IDM.invokeCustomFunctions.apply(this, [this.propData.tableRowClickFunction, {_this:this,row,index}]); // => [function result 1,function result 2]
          },
        },
      };
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

    .address-icon {
      width: 26px;
      margin-right: 10px;
    }
  }
}
</style>