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
      <a-button v-if="showRefreshBtn" @click="refreshData"
        ><svg-icon icon-class="refresh" />刷新数据</a-button
      >
      <a-button style="margin-left: 20px" type="primary" @click="toReportView"
        >汇报视图</a-button
      >
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
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
    showRefreshBtn: {
      type: Boolean,
      default: true,
    },
    ctrlId: {
      type: String,
      default: "",
    },
    printClass: {
      type: String,
      default: "container",
    },
  },
  methods: {
    refreshData() {
      this.$emit("refreshData");
    },
    async toReportView() {
      // 第一步：用 html2canvas 截图原始内容
      const targetElement = document.querySelector(`#${this.ctrlId} .${this.printClass}`);
      const originalCanvas = await html2canvas(
        targetElement,
        {
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          scrollY: -window.scrollY, // 从页面顶部开始捕获
          height: targetElement.scrollHeight + 60, // 捕获元素的完整滚动高度
          windowHeight: targetElement.scrollHeight + 60, // 设置窗口高度为元素的完整高度
        }
      );
      const originalWidth = originalCanvas.width;
      const originalHeight = originalCanvas.height;

      // 第二步：创建一个新的 canvas 用于叠加水印
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = originalWidth;
      finalCanvas.height = originalHeight;
      const ctx = finalCanvas.getContext("2d");

      // 先绘制原始截图
      ctx.drawImage(originalCanvas, 0, 0);

      // 第三步：绘制多个水印（平铺）
      const userInfo = window.IDM.user.getCurrentUserInfo();
      const now = new Date();
      const watermarkText = `${userInfo?.username || ""} ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() } ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` || "© 机密文件 - 仅限内部使用";
      ctx.globalAlpha = 0.48; // 透明度
      ctx.font = "44px Arial";
      ctx.fillStyle = "#ccc";

      // 水印间距（可根据需要调整）
      const spacingX = 500;
      const spacingY = 400;

      // 保存当前状态（用于恢复旋转前的坐标系）
      for (let x = -originalWidth; x < originalWidth * 2; x += spacingX) {
        for (let y = -originalHeight; y < originalHeight * 2; y += spacingY) {
          ctx.save();
          ctx.translate(x + spacingX / 2, y + spacingY / 2);
          ctx.rotate((-48 * Math.PI) / 180); // 转换为弧度
          ctx.fillText(
            watermarkText,
            -ctx.measureText(watermarkText).width / 2,
            0
          );
          ctx.restore();
        }
      }

      // 第四步：下载图片
      const link = document.createElement("a");
      link.download = this.title + ".png";
      link.href = finalCanvas.toDataURL("image/png");
      link.click();
    },
  },
};
</script>

<style scoped lang="scss">
.databoard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  padding: 0 30px;
  color: #333333;
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.06);
  background-color: #fff;

  .databoard-header-left {
    .title {
      font-family: PingFang-SC-Bold;
      font-size: 32px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 700;
    }
    .right-title {
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #666666;
      letter-spacing: 0;
      font-weight: 400;
      margin-left: 10px;
    }
  }

  .databoard-header-right {
    .ant-btn {
      height: 44px;
      font-size: 18px;
      background-color: #f9fafb;
      border: 1px solid rgba(223, 236, 254, 1);
      color: #2563eb;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      letter-spacing: 0;
      font-weight: 400;
      &.ant-btn-primary {
        background-color: #2563eb;
        border: 1px solid #dfecfe;
        color: #ffffff;
      }
      .svg-icon {
        margin-right: 6px;
      }
    }
  }
}
</style>