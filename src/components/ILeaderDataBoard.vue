<template>
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" class="ILeaderDataBoard_app">
    <DataboardHeader
      title="销售数据看板"
      rightTitle="合同与回款周度数据概览"
      @refreshData="refreshData"
    />
    <div class="ILeaderDataBoard_app_main">
      <div class="data_block">
        <DataboardContainer title="合同进展看板" :iconUrl="contract_process" >
          <div class="grid_block">
            <ComBoard :items="contract_process_grid_list"> </ComBoard >
          </div>
          <div class="table_block">
            <div class="tip">
              单位：万元，差额=实际-计划
            </div>
            <ComTable :columns="contract_table_columns" :dataSource="contract_table_data" :bordered="true"> </ComTable>
          </div>
        </DataboardContainer>
      </div>
      <div class="data_block data_block_backmoney">
        <DataboardContainer title="回款进展看板" :iconUrl="payment_collection" >
          <div class="grid_block">
            <ComBoard :items="backMoneyGridList"> </ComBoard >
          </div>
          <div class="table_block">
            <div class="tip">
              单位：万元，差额=实际-计划
            </div>
            <ComTable :columns="backMoneyColumns" :dataSource="backMoneyTableData"> </ComTable>
          </div>
        </DataboardContainer>
      </div>
    </div>
  </div>
</template>

<script>
import DataboardHeader from '@/commonComponents/DataboardHeader.vue'
import ComTable from "@/commonComponents/ComTable.vue";
import DataboardContainer from "@/commonComponents/DataboardContainer.vue";
import ComBoard from "@/commonComponents/ComBoard.vue";


import payment_collection from "@/assets/payment_collection.png"
import performanceIndicatorIcon from "@/assets/performance_indicator.png";
import paymentReceivedIcon from "@/assets/payment_received.png";
import completionRateIcon from "@/assets/completion_rate.png";
import performanceGapIcon from "@/assets/performance_gap.png";
import contract_process from "@/assets/contract_process.png"


export default {
  components: { 
    DataboardHeader,
    ComTable,
    DataboardContainer,
    ComBoard
  },
  name: 'ILeaderDataBoard',
  data(){
    return {
      contract_process,
      payment_collection,
      paymentReceivedIcon,
      completionRateIcon,
      performanceGapIcon,
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        contentField:"description",
        titleField: "title"
      },
      contract_process_grid_list: [
        {
          title: "绩效指标金额（万元）",
          value: "4,500",
          imgUrl: performanceIndicatorIcon,
        },
        {
          title: "已签订（万元）",
          value: "4,500",
          imgUrl: paymentReceivedIcon,
        },
        {
          title: "完成率",
          value: 63.0,
          isPercent: true,
          color: "#EF4444",
          imgUrl: completionRateIcon,
        },
        {
          title: "绩效差额（万元）",
          value: "-1,665",
          color: "#EF4444",
          imgUrl: performanceGapIcon,
        }
      ],
      border: true,
      contract_table_columns: [
        {
          title: "销售老大",
          dataIndex: "week",
          key: "name"
        },
        {
          title: "第一周（11.24-11.30）",
          dataIndex: "week",
          children: [
            {
              title: "计划金额",
              dataIndex: "planAmount1",
              key: "planAmount1"
            },
            {
              title: "实际金额",
              dataIndex: "actualAmount1",
              key: "actualAmount1"
            },
            {
              title: "完成率",
              dataIndex: "completionRate1",
              key: "completionRate1",
            },
            {
              title: "差额",
              dataIndex: "gap1",
              key: "gap1"
            }
          ]
        },
        {
          title: "第二周（12.01-12.07）",
          dataIndex: "week",
          children: [
            {
              title: "计划金额",
              dataIndex: "planAmount2",
              key: "planAmount2"
            },
            {
              title: "实际金额",
              dataIndex: "actualAmount2",
              key: "actualAmount2"
            },
            {
              title: "完成率",
              dataIndex: "completionRate2",
              key: "completionRate2",
            },
            {
              title: "差额",
              dataIndex: "gap2",
              key: "gap2"
            }
          ]
        },
        {
          title: "第三周（12.08-12.14）",
          dataIndex: "week",
          children: [
            {
              title: "计划金额",
              dataIndex: "planAmount3",
              key: "planAmount3"
            },
            {
              title: "实际金额",
              dataIndex: "actualAmount3",
              key: "actualAmount3"
            },
            {
              title: "完成率",
              dataIndex: "completionRate3",
              key: "completionRate3",
            },
            {
              title: "差额",
              dataIndex: "gap3",
              key: "gap3"
            }
          ]
        },
        {
          title: "第四周（12.15-12.21）",
          dataIndex: "week",
          children: [
            {
              title: "计划金额",
              dataIndex: "planAmount4",
              key: "planAmount4"
            },
            {
              title: "实际金额",
              dataIndex: "actualAmount4",
              key: "actualAmount4"
            },
            {
              title: "完成率",
              dataIndex: "completionRate4",
              key: "completionRate4",
            },
            {
              title: "差额",
              dataIndex: "gap4",
              key: "gap4"
            }
          ]
        }
      ],
      contract_table_data: [ ],
      // 回款模块
      backMoneyColumns: [
        {
          title: "销售老大",
          dataIndex: "week",
          key: "name"
        },
        {
          title: "第一周（11.24-11.30）",
          dataIndex: "week",
          children: [
            {
              title: "计划金额",
              dataIndex: "planAmount1",
              key: "planAmount1"
            },
            {
              title: "实际金额",
              dataIndex: "actualAmount1",
              key: "actualAmount1"
            },
            {
              title: "完成率",
              dataIndex: "completionRate1",
              key: "completionRate1",
            },
            {
              title: "差额",
              dataIndex: "gap1",
              key: "gap1"
            }
          ]
        },
        {
          title: "第二周（12.01-12.07）",
          dataIndex: "week",
          children: [
            {
              title: "计划金额",
              dataIndex: "planAmount2",
              key: "planAmount2"
            },
            {
              title: "实际金额",
              dataIndex: "actualAmount2",
              key: "actualAmount2"
            },
            {
              title: "完成率",
              dataIndex: "completionRate2",
              key: "completionRate2",
            },
            {
              title: "差额",
              dataIndex: "gap2",
              key: "gap2"
            }
          ]
        },
        {
          title: "第三周（12.08-12.14）",
          dataIndex: "week",
          children: [
            {
              title: "计划金额",
              dataIndex: "planAmount3",
              key: "planAmount3"
            },
            {
              title: "实际金额",
              dataIndex: "actualAmount3",
              key: "actualAmount3"
            },
            {
              title: "完成率",
              dataIndex: "completionRate3",
              key: "completionRate3",
            },
            {
              title: "差额",
              dataIndex: "gap3",
              key: "gap3"
            }
          ]
        },
        {
          title: "第四周（12.15-12.21）",
          dataIndex: "week",
          children: [
            {
              title: "计划金额",
              dataIndex: "planAmount4",
              key: "planAmount4"
            },
            {
              title: "实际金额",
              dataIndex: "actualAmount4",
              key: "actualAmount4"
            },
            {
              title: "完成率",
              dataIndex: "completionRate4",
              key: "completionRate4",
            },
            {
              title: "差额",
              dataIndex: "gap4",
              key: "gap4"
            }
          ]
        }
      ],
      backMoneyTableData: [ ],
      backMoneyGridList: [
        {
          title: "绩效指标金额（万元）",
          value: "4,500",
          imgUrl: performanceIndicatorIcon,
        },
        {
          title: "已回款（万元）",
          value: "4,500",
          imgUrl: paymentReceivedIcon,
        },
        {
          title: "完成率",
          value: 63.0,
          isPercent: true,
          color: "#EF4444",
          imgUrl: completionRateIcon,
        },
        {
          title: "绩效差额（万元）",
          value: "-1,665",
          color: "#EF4444",
          imgUrl: performanceGapIcon,
        },
      ],
    }
  },
  props: {
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
  },
  mounted() {
    
  },
  destroyed() {},
  methods:{
    handleClickDateFilter(item, key) {
      this.$set(this, key, item.value)
    },
    handleCustomFunction() {
      this.propData.createdFunction?.length&&IDM.invokeCustomFunctions.apply(this,[this.propData.createdFunction,{
        _this: this,
      }])
    },
    getImageSrc(url,name) {
      if ( url ) {
        return IDM.url.getWebPath(url)
      } else {
        return IDM.url.getModuleAssetsWebPath(require(`../assets/${name}.png`),this.moduleObject)
      }
    },
    
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData){
      this.propData = propData.compositeAttr||{};
      this.convertAttrToStyleObject();
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(){
      var styleObject = {};
      if(this.propData.bgSize&&this.propData.bgSize=="custom"){
        styleObject["background-size"]=(this.propData.bgSizeWidth?this.propData.bgSizeWidth.inputVal+this.propData.bgSizeWidth.selectVal:"auto")+" "+(this.propData.bgSizeHeight?this.propData.bgSizeHeight.inputVal+this.propData.bgSizeHeight.selectVal:"auto")
      }else if(this.propData.bgSize){
        styleObject["background-size"]=this.propData.bgSize;
      }
      if(this.propData.positionX&&this.propData.positionX.inputVal){
        styleObject["background-position-x"]=this.propData.positionX.inputVal+this.propData.positionX.selectVal;
      }
      if(this.propData.positionY&&this.propData.positionY.inputVal){
        styleObject["background-position-y"]=this.propData.positionY.inputVal+this.propData.positionY.selectVal;
      }
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if(!element&&element!==false&&element!=0){
            continue;
          }
          switch (key) {
            case "width":
            case "height":
              styleObject[key]=element;
              break;
            case "bgColor":
              if(element&&element.hex8){
                styleObject["background-color"]=element.hex8;
              }
              break;
            case "box":
              IDM.style.setBoxStyle(styleObject,element)
              break;
            case "bgImgUrl":
              styleObject["background-image"]=`url(${window.IDM.url.getWebPath(element)})`;
              break;
            case "positionX":
              //背景横向偏移
              
              break;
            case "positionY":
              //背景纵向偏移
              
              break;
            case "bgRepeat":
              //平铺模式
                styleObject["background-repeat"]=element;
              break;
            case "bgAttachment":
              //背景模式
                styleObject["background-attachment"]=element;
              break;
            case "border":
              IDM.style.setBorderStyle(styleObject,element)
              break;
            case "font":
              IDM.style.setFontStyle(styleObject,element)
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id,styleObject);
    },
    /**
     * 通用的url参数对象
     * 所有地址的url参数转换
     */
    commonParam(){
      let urlObject = IDM.url.queryObject();
      var params = {
        pageId: window.IDM.broadcast && window.IDM.broadcast.pageModule ? window.IDM.broadcast.pageModule.id : "",
        urlData: JSON.stringify(urlObject),
      };
      return params;
    },
    /**
     * 重新加载
     */
    reload(){
      //请求数据源
      this.initData(true);
    },
    /**
     * 加载动态数据
     */
    initData(isInit){
      if(isInit) {
        this.currentPage = 1;
      }
      let that = this;
      //所有地址的url参数转换
      var params = that.commonParam();
      if(!this.propData.dataSource?.length) {
        
        return;
      } else {
        let newParam = {
          ...params,
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          keywords: this.keywords
        }
        IDM.datasource.request(
          this.propData.dataSource[0].id,
          {
            moduleObject: this.moduleObject,
            param: {
              ...newParam,
            },
          },
          function (res) {
            console.log("组件获取数据++++++++", res);
            that.total = res.total;
            that.dataList = res.data;
          },
          function (error) {
            //这里是请求失败的返回结果
            console.log("error", error);
          }
        );
      }
    },
    /**
     * 通用的获取表达式匹配后的结果
     */
    getExpressData(dataName,dataFiled,resultData){
      //给defaultValue设置dataFiled的值
      var _defaultVal = undefined;
      if(dataFiled){
        var filedExp = dataFiled;
        filedExp =
          dataName +
          (filedExp.startsWiths("[") ? "" : ".") +
          filedExp;
        var dataObject = { IDM: window.IDM };
        dataObject[dataName] = resultData;
        _defaultVal = window.IDM.express.replace.call(
          this,
          "@[" + filedExp + "]",
          dataObject
        );
      }
      //对结果进行再次函数自定义
      if(this.propData.customFunction&&this.propData.customFunction.length>0){
        var params = this.commonParam();
        var resValue = "";
        try {
          resValue = window[this.propData.customFunction[0].name]&&window[this.propData.customFunction[0].name].call(this,{
            ...params,
            ...this.propData.customFunction[0].param,
            moduleObject:this.moduleObject,
            expressData:_defaultVal,interfaceData:resultData
          });
        } catch (error) {
        }
        _defaultVal = resValue;
      }
      
      return _defaultVal;
    },
    /**
     * 组件通信：接收消息的方法
     * @param {
     *  type:"发送消息的时候定义的类型，这里可以自己用来要具体做什么，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）"
     *  message:{发送的时候传输的消息对象数据}
     *  messageKey:"消息数据的key值，代表数据类型是什么，常用于表单交互上，比如通过这个key判断是什么数据"
     *  isAcross:如果为true则代表发送来源是其他页面的组件，默认为false
     * } object 
     */
    receiveBroadcastMessage(object){
      console.log("组件收到消息",object)
      if (object.type && object.type == "linkageResult") {
        this.abstractValue = object.message;
      }
    },
    /**
     * 组件通信：发送消息的方法
     * @param {
     *  type:"自己定义的，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）",
     *  message:{实际的消息对象},
     *  rangeModule:"为空发送给全部，根据配置的属性中设定的值（值的内容是组件的packageid数组），不取子表的，比如直接 this.$root.propData.compositeAttr["attrKey"]（注意attrKey是属性中定义的bindKey）,这里的格式为：['1','2']"",
     *  className:"指定的组件类型，比如只给待办组件发送，然后再去过滤上面的值"
     *  globalSend:如果为true则全站发送消息，注意全站rangeModule是无效的，只有className才有效，默认为false
     * } object 
     */
    sendBroadcastMessage(object){
      window.IDM.broadcast&&window.IDM.broadcast.send(object);
    },
    /**
     * 交互功能：设置组件的上下文内容值
     * @param {
     *  type:"定义的类型，已知类型：pageCommonInterface（页面统一接口返回值）、"
     *  key:"数据key标识，页面每个接口设置的数据集名称，方便识别获取自己需要的数据"
     *  data:"数据集，内容为：字符串 or 数组 or 对象"
     * }
     */
    setContextValue(object) {
      console.log("统一接口设置的值", object);
    }
  }
}
</script>
<style lang="scss" scoped>
.ILeaderDataBoard_app{
  height: 100vh;
  background: #f5f5f5;
  .ILeaderDataBoard_app_main{
    height: calc(100% - 96px);
    padding: 20px 20px;
    box-sizing: border-box;
    overflow-y: auto;
    .data_block{
      padding: 0 0px 30px 0px;
      background: #FFFFFF;
      &.data_block_backmoney{
        margin-top: 20px;
      }
      &>.title{
        height: 76px;
        img{
          width: 38px;
          height: 38px;
        }
        span{
          margin-left: 14px;
          font-family: PingFang-SC-Bold;
          font-size: 24px;
          color: #333333;
          letter-spacing: 0;
          line-height: 32px;
          font-weight: 700;
        }
      }
      .date_filter_block{
        margin: 30px 0 20px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 0 20px;
        .list{
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 400;
          background: #F7F7F7;
          cursor: pointer;
          &.active{
            background: #2563EB;
            color: #FFFFFF;
          }
        }
      }
      .table_block{
        margin-top: 30px;
        .tip{
          margin-bottom: 6px;
          text-align: right;
          font-family: PingFang-SC-Bold;
          font-size: 20px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
