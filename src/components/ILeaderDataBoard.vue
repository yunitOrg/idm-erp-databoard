<template>
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" class="ILeaderDataBoard_app">
    <div class="ILeaderDataBoard_app_header flex_between">
      <div class="left">
        <span class="title">销售数据看板</span>
        <span class="tip">合同与回款周度数据概览</span>
      </div>
      <div class="right flex_end">
        <div class="button_box flex_center">
          <svg-icon icon-class="refresh" />
          <span>刷新数据</span>
        </div>
        <div class="button_box flex_center">
          <span>汇报视图</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAbstractTemplateList } from "@/mockData"
import vuescroll from '../mixins/vueScroll'
import SvgIcon from '../icons/SvgIcon.vue'
export default {
  components: { SvgIcon },
  name: 'ILeaderDataBoard',
  mixins: [vuescroll],
  data(){
    return {
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        contentField:"description",
        titleField: "title"
      },
      abstractValue: '',
      dataList:[],
      total:0,
      keywords: '',
      currentPage: 1,
      pageSize: 12,
      pageSizeOptions: ['12', '24', '36', '48'],

    }
  },
  props: {
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.pageSize = this.propData.pageSize || 12;
    this.handleCustomFunction();
    this.convertAttrToStyleObject();
    this.initData(true);
  },
  mounted() {
    
  },
  destroyed() {},
  methods:{
    handleCustomFunction() {
      this.propData.createdFunction?.length&&IDM.invokeCustomFunctions.apply(this,[this.propData.createdFunction,{
        _this: this,
      }])
    },
    handleSubmit() {
      this.propData.clickSubmitFunction?.length&&IDM.invokeCustomFunctions.apply(this,[this.propData.clickSubmitFunction,{
        _this: this,
        abstractValue: this.abstractValue,
      }])
    },
    handleCancel() {
      this.propData.clickCancelFunction?.length&&IDM.invokeCustomFunctions.apply(this,[this.propData.clickCancelFunction,{
        _this: this,
        abstractValue: this.abstractValue,
      }])
    },
    handleClickItem(item) {
      if(this.propData.clickItemFunction?.length) {
        IDM.invokeCustomFunctions.apply(this,[this.propData.clickItemFunction,{
          _this: this,
          item: item,
        }])
      } else {
        this.abstractValue = item[this.propData.templateField];
      }
    },
    handleSearch() {
      this.initData(true);
    },
    handlePageChange(page, size) {
      this.currentPage = page;
      this.initData();
    },
    handlePageSizeChange(page, size) {
      this.pageSize = size;
      this.initData(true);
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
        let result = getAbstractTemplateList()
        this.total = result.total;
        this.dataList = result.rows;
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
  .ILeaderDataBoard_app_header{
    height: 96px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 4px 9px 0px rgba(0,0,0,0.06);
    .left{
      .title{
        margin-right: 20px;
        font-family: PingFang-SC-Bold;
        font-size: 32px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 700;
      }
      .tip{
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #666666;
        letter-spacing: 0;
        font-weight: 400;
      }
    }
    .right{
      .button_box{
        height: 44px;
        margin-left: 20px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        letter-spacing: 0;
        font-weight: 400;
        cursor: pointer;
        &:nth-child(1){
          width: 128px;
          color: #2563EB;
          background: #F9FAFB;
          border: 1px solid rgba(223,236,254,1);
          border-radius: 4px;
          .svg-icon{
            margin-right: 10px;
            color: #2563EB;
            font-size: 17px;
          }
        }
        &:nth-child(2){
          width: 108px;
          color: #FFFFFF;
          background: #2563EB;
          border: 1px solid rgba(223,236,254,1);
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
