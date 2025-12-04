<template>
  <div class="table-wrapper">
    <a-table :customRow="customRow" :columns="columns" :data-source="dataSource" :pagination="false" :bordered="bordered" :rowKey="rowKey">
      <span
        slot="flag"
        slot-scope="text, record"
        :style="`color:${
          getValueColor(record[planAmountKey], record[actualAmountKey])
        }`"
        ><svg-icon icon-class="flag"
      /></span>
      <span
        slot="completionRate"
        slot-scope="text,record"
        :style="`color:${getValueColor(record[planAmountKey], record[actualAmountKey])}`"
        >{{ text === '%' ? '0.00%' : text }}</span
      >
      <span
        slot="gap"
        slot-scope="text,record"
        :style="`color:${getValueColor(record[planAmountKey], record[actualAmountKey])}`"
        >{{ text }}</span
      >
      <template slot="zc" scope="text,record,index">
        <span v-if="text == '合计'" style="font-weight: 800;">{{ text }}</span>
        <span v-else>{{ text }}</span>
        <img v-if="getCurrentWeekNumber() === index + 1" class="address-icon" :src="getImageSrc('', 'address')">
      </template>
    </a-table>
  </div>
</template>

<script>
import { getValueColor, getCurrentWeekNumber} from '@/utils/index.js'
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
    },
    rowClickFunction: {
      type: Function,
      default: () => {},
    },
    moduleObject: {
      type: Object,
      default: () => {},
    },
    planAmountKey: {
      type: String,
      default: 'jhje',
    },
    actualAmountKey: {
      type: String,
      default: 'sjje',
    },
    showAddress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      getValueColor,
      getCurrentWeekNumber
    }
  },
  methods: {
    getImageSrc(url,name) {
      if ( url ) {
        return IDM.url.getWebPath(url)
      } else {
        return IDM.url.getModuleAssetsWebPath(require(`../assets/${name}.png`),this.moduleObject)
      }
    },
    customRow(row, index) {
      return {
        style: {
          backgroundColor: this.showAddress && getCurrentWeekNumber() === index + 1 ? '#f5faff' : '#FFFFFF',
        },
        on: {
          click: () => {
            this.rowClickFunction(row,index);
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
      margin-left: 10px;
    }
  }
}
</style>