<template>
  <div class="myclass">
    <div class="item">
      <div class="title">内存使用量</div>
      <div class="box" id="mem"></div>
    </div>
    <div class="item">
      <div class="title">硬盘使用量</div>
      <div class="box" id="bis"></div>
    </div>
    <div class="item">
      <div class="title">CPU使用率</div>
      <div class="box" id="cpu"></div>
    </div>
  </div>
</template>

<script>
import { resetRouter } from "@/router";

import { selectbues } from "./systementityjs";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      websock: null,
      systementity: null,
      gaugecpu: {
        title: {
          // text: "CPU使用率",
          //subtext: '单位G',
          left: "center ",
        },
        series: [
          {
            name: "CPU使用率",
            type: "gauge",
            detail: {
              formatter: "{value}%",
            },
            data: [
              {
                value: 50,
                name: "CPU",
              },
            ],
          },
        ],
      },
      gaugemen: {
        title: {
          // text: "内存使用量",
          subtext: "单位G",
          left: "center ",
        },
        series: [
          {
            name: "内存使用",
            type: "gauge",
            detail: {
              formatter: "{value}%",
            },
            data: [
              {
                value: 50,
                name: "内存",
              },
            ],
          },
        ],
      },
      bisfileoption: {
        title: {
          // text: "硬盘使用量",
          subtext: "单位G",
          left: "center ",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            type: "pie",

            center: ["50%", "50%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 9,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      filedata: [],
      myehartsgauge: null,
      myechartsbis: null,
      myehartscpu: null,
      now: null,
      date: [],
      data: [],
    };
  },
  //方法集合
  methods: {
    initgauge() {
      this.myehartsgauge = this.$echarts.init(document.getElementById("mem"));
    },
    initcpu() {
      this.myehartscpu = this.$echarts.init(document.getElementById("cpu"));
    },
    initwebsockt() {
      let wss = "ws://125.64.98.21:8010/imserver/";
      this.websock = new WebSocket(wss);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage(e) {
      let data = JSON.parse(e.data);
      this.systementity = data;
      this.$nextTick(() => {
        this.memuse(data);
        this.fileuse(data);
        this.cpuuse(data);
      });
    },
    websocketonopen() {
      console.log("链接打开");
    },
    websocketonerror() {},
    websocketclose() {},
    memuse(data) {
      this.gaugemen.series[0].data[0].value = (data.menUse * 100).toFixed(2) - 0;
      this.myehartsgauge.setOption(this.gaugemen, true);
    },
    initbis() {
      this.myechartsbis = this.$echarts.init(document.getElementById("bis"));
    },
    fileuse(data) {
      let pl = [
        {
          name: "使用量",
          value: data.fileUse,
        },
        {
          name: "未使用",
          value: data.fileFree,
        },
      ];
      this.bisfileoption.series[0].data = pl;

      this.myechartsbis.setOption(this.bisfileoption);
    },
    cpuuse(data) {
      this.gaugecpu.series[0].data[0].value = (data.cpuuse * 100).toFixed(2) - 0;
      this.myehartscpu.setOption(this.gaugecpu, true);
    },
  },
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initgauge();
    this.initbis();
    this.initcpu();
    let that = this;
    setTimeout(function () {
      that.initwebsockt();
    }, 3000);
  },
  destroyed() {
    this.websock.close();
  },
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
.myclass {
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: center;
  // align-items: center;
  .item {
    background: #ffffff;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
    }
    .box {
      width: 100%;
      height: 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
