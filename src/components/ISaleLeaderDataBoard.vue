<template>
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" class="ISaleLeaderDataBoard_app">
    <DataboardHeader
      title="项目数据看板"
      rightTitle="回款与验收进展数据概览"
      :ctrlId="moduleObject.id"
      printClass="ILeaderDataBoard_app_main"
      @refreshData="refreshData"
      showReporter
    />
    <div class="ILeaderDataBoard_app_main">
      <div class="data_block">
        <DataboardContainer title="回款进展看板" titleTip="金额：均为税后净回款额" :iconUrl="payment_collection" >
          <div class="grid_block">
            <ComBoard :items="contract_process_grid_list"> </ComBoard >
          </div>
          <div class="date_filter_block">
            <div @click="handleClickDateFilter(item, 'weekNumber')" v-for="(item) in date_filter_list" :key="item.value" class="list" :class="item.value == weekNumber ? 'active' : ''">
              {{ item.name }}
            </div>
          </div>
          <div class="table_block">
            <ComTable :columns="contract_table_columns" :dataSource="resultData?.hksj?.hkDetail" :rowClickFunction="rowClickFunctionHK" rowKey="pk"> </ComTable>
          </div>
        </DataboardContainer>
      </div>
      <div class="data_block data_block_backmoney">
        <DataboardContainer title="验收进展看板" titleTip="金额：均为税后净验收额" :iconUrl="acceptance" >
          <div class="grid_block">
            <ComBoard :items="backMoneyGridList"> </ComBoard >
          </div>
          <div class="table_block">
            <ComTable :columns="backMoneyColumns" :dataSource="resultData?.yssj?.ysDetail" :rowClickFunction="rowClickFunctionYS" rowKey="pk"> </ComTable>
          </div>
        </DataboardContainer>
      </div>
    </div>
  </div>
</template>

<script>
import payment_collection from "@/assets/payment_collection.png"
import performanceIndicatorIcon from "@/assets/performance_indicator.png";
import paymentReceivedIcon from "@/assets/payment_received.png";
import completionRateIcon from "@/assets/completion_rate.png";
import performanceGapIcon from "@/assets/performance_gap.png";
import contract_process from "@/assets/contract_process.png"
import acceptance from "@/assets/acceptance.png"

import DataboardHeader from '@/commonComponents/DataboardHeader.vue'
import ComTable from "@/commonComponents/ComTable.vue";
import DataboardContainer from "@/commonComponents/DataboardContainer.vue";
import ComBoard from "@/commonComponents/ComBoard.vue";
import { getCurrentWeekNumber,getValueColor } from "@/utils"

export default {
  components: { 
    DataboardHeader,
    ComTable,
    DataboardContainer,
    ComBoard
  },
  name: 'ISaleLeaderDataBoard',
  data(){
    return {
      contract_process,
      payment_collection,
      paymentReceivedIcon,
      completionRateIcon,
      performanceGapIcon,
      acceptance,
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        contentField:"description",
        titleField: "title"
      },
      contract_process_grid_list: [
        {
          title: "绩效指标金额（万元）",
          value: "",
          imgUrl: performanceIndicatorIcon,
        },
        {
          title: "已回款（万元）",
          value: "",
          imgUrl: paymentReceivedIcon,
          note:"截止目前最新的已回款数据"
        },
        {
          title: "完成率",
          value: "",
          isPercent: true,
          color: '',
          flex: "1.2",
          imgUrl: completionRateIcon,
          note:"已回款数据/绩效指标数据*100"
        },
        {
          title: "绩效差额（万元）",
          value: "",
          color: '',
          imgUrl: performanceGapIcon,
          note:"截止到11月23号已回款数据+后6周待回款计划-绩效指标数据"
        }
      ],
      contract_table_columns: [
        {
          title: "项目DT",
          dataIndex: "name",
          key: "name",
          customRender: (text, record, rowIndex) => {
            if(text == "合计"){
              return (
                <div style="font-weight: 800;">
                  <div>合计</div>
                </div>
              );
            } else {
              return text
            }
          }
        },
        {
          title: "计划金额（万元）",
          dataIndex: "jhje",
          key: "jhje"
        },
        {
          title: "实际金额（万元）",
          dataIndex: "sjje",
          key: "sjje"
        },
        {
          title: "完成率",
          dataIndex: "wcl",
          key: "wcl",
          scopedSlots: { customRender: "completionRate" },
        },
        {
          title: "实际-计划",
          dataIndex: "bzce",
          key: "bzce",
          scopedSlots: { customRender: "gap" },
        }
      ],
      // 验收模块
      date_filter_list: [
        {
          name: "第一周（11.24-11.30）",
          value: 1
        },
        {
          name: " 第二周（12.01-12.07）",
          value: 2
        },
        {
          name: "第三周（12.08-12.14）",
          value: 3
        },
        {
          name: "第四周（12.15-12.21）",
          value: 4
        },
        {
          name: "第五周（12.22-12.28）",
          value: 5
        },
        {
          name: "第六周（12.29-01.04）",
          value: 6
        }
      ],
      weekNumber: 1,
      backMoneyColumns: [
        {
          title: "项目DT",
          dataIndex: "name",
          key: "name",
          customRender: (text, record, rowIndex) => {
            if(text == "合计"){
              return (
                <div style="font-weight: 800;">
                  <div>合计</div>
                </div>
              );
            } else {
              return text
            }
          }
        },
        {
          title: "计划验收金额（万元）",
          dataIndex: "jhje",
          key: "jhje"
        },
        {
          title: "实际验收金额（万元）",
          dataIndex: "sjje",
          key: "sjje"
        },
        {
          title: "完成率",
          dataIndex: "wcl",
          key: "wcl",
          scopedSlots: { customRender: "completionRate" },
        }
      ],
      backMoneyGridList: [
        {
          title: "计划验收金额（万元）",
          value: "",
          imgUrl: performanceIndicatorIcon,
        },
        {
          title: "实际验收金额（万元）",
          value: "",
          imgUrl: paymentReceivedIcon,
        },
        {
          title: "完成率",
          value: '',
          isPercent: true,
          color: "",
          imgUrl: completionRateIcon,
        }
      ],
      resultData: {},
    }
  },
  props: {
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.getWeekNumber()
    this.getInitData()
  },
  mounted() {
    
  },
  destroyed() {},
  methods:{
    rowClickFunctionHK(row, index) {
      this.propData.tableRowClickFunction?.length&&IDM.invokeCustomFunctions.apply(this,[this.propData.tableRowClickFunction,{
        _this: this,
        row,
        index,
        type: 'HK'
      }])
    },
    rowClickFunctionYS(row, index) {
      this.propData.tableRowClickFunction?.length&&IDM.invokeCustomFunctions.apply(this,[this.propData.tableRowClickFunction,{
        _this: this,
        row,
        index,
        type: 'YS'
      }])
    },
    refreshData() {
      this.getInitData()
    },
    getInitData() {
      IDM.http.get('/ctrl/insertXsHztj/getSj', {
        type: "xdS8",
        week: this.weekNumber,
      }).then((res) => {
        if(res?.data?.type == 'success') {
          this.resultData = res.data.data ?? {};
          this.contract_process_grid_list[0].value = this.resultData.hksj?.jxxbje;
          this.contract_process_grid_list[1].value = this.resultData.hksj?.haveDo;
          this.contract_process_grid_list[2].value = this.resultData.hksj?.wcl;
          this.contract_process_grid_list[3].value = this.resultData.hksj?.jxce;
          this.backMoneyGridList[0].value = this.resultData.yssj?.jxxbje;
          this.backMoneyGridList[1].value = this.resultData.yssj?.haveDo;
          this.backMoneyGridList[2].value = this.resultData.yssj?.wcl;

          this.contract_process_grid_list[2].color = getValueColor(this.resultData.hksj?.jxxbje,this.resultData.hksj?.haveDo);
          this.backMoneyGridList[2].color = getValueColor(this.resultData.yssj?.jxxbje,this.resultData.yssj?.haveDo);
          this.contract_process_grid_list[3].color = getValueColor(this.resultData.hksj?.jxxbje,this.resultData.hksj?.haveDo);
        } else {
          this.resultData = {}
        }
      }).error((err) => {
        console.log(err)
      })
    },
    getWeekNumber() {
      this.weekNumber = getCurrentWeekNumber()
    },
    handleClickDateFilter(item, key) {
      this.$set(this, key, item.value)
      this.getInitData()
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
.ISaleLeaderDataBoard_app{
  height: 100vh;
  background: #f5f5f5;
  .ILeaderDataBoard_app_main{
    height: calc(100% - 96px);
    padding: 20px 20px;
    box-sizing: border-box;
    overflow-y: auto;
    .data_block{
      // padding: 0 0px 30px 0px;
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
      }
    }
  }
}
</style>
