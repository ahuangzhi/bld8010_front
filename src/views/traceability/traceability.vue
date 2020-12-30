<template>
  <div class="traceability">
    <div class="top">
      <div class="item">
        <div class="num">{{ tnodes }}/1</div>
        <div class="name">当前节点</div>
      </div>
      <div class="item">
        <img class="img" src="@/assets/404_images/970c5ab7a35d27ff9f6a1d77896ce40.png" />
        <div class="name">区块高度</div>
        <div class="num">{{ tableData[0].lastBlock.toLocaleString() }}</div>
      </div>
      <div class="item">
        <img class="img" src="@/assets/404_images/067f318d1f881472195c03ed8756c66.png" />
        <div class="name">最近出块时间</div>
        <div class="num">{{ tableData[0].lastBlockTime }}</div>
      </div>
      <div class="item">
        <img class="img" style="width: 90px" src="@/assets/404_images/cfb581578f9652d5b748ecdf1c98921.png" />
        <div class="name">平均出块时间</div>
        <div class="num">{{ tableData[0].avgBlocktime }}</div>
      </div>
      <div class="item">
        <img class="img" src="@/assets/404_images/9e1a981384a6a4d66f75d5611da1c8a.png" />
        <div class="name">平均哈希值</div>
        <div class="num">{{ tableData[0].avgHashrate }}</div>
      </div>
    </div>

    <div class="middle">
      <div class="item">
        <div class="title">出块时间</div>
        <div id="main" class="box"></div>
      </div>
      <div class="item">
        <div class="title">交易</div>
        <div id="main1" class="box"></div>
      </div>
      <div class="item">
        <div class="title">手续费</div>
        <div id="main2" class="box"></div>
      </div>
      <div class="item">
        <div class="title">出块矿工</div>
        <div class="box">
          <div style="font-size: 14px">{{ tableData[0].lastBlockMiners1 }}</div>
          <div><img src="@/assets/404_images/0fd64ad27c6d27bd549112d4a6ec0c8.png" /></div>
          <div style="font-size: 14px">{{ tableData[0].lastBlockMiners2 }}</div>
          <div><img src="@/assets/404_images/0fd64ad27c6d27bd549112d4a6ec0c8.png" /></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="item">
        <div class="title">块传播</div>
        <div id="main3" class="box"></div>
      </div>
      <div class="item second">
        <systementity></systementity>
      </div>
      <div class="item">
        <div class="title">区块文件</div>
        <div id="main4" class="box"></div>
      </div>
    </div>
    <div class="tab">
      <el-table :data="tableData" style="width: 100%; margin-bottom: 20px">
        <el-table-column prop="nodeName" label="节点名称" width="100" />
        <el-table-column prop="nodeType" label="节点类型" min-width="120" />
        <el-table-column prop="nodeLatency" label="节点延迟时间" />
        <el-table-column prop="nodeMining" label="node mining" />
        <el-table-column prop="nodePeers" label="node peers" />
        <el-table-column prop="lastBlock" label="last block" />
        <el-table-column prop="totalDifficulty" label="total difficulty" min-width="80" />
        <el-table-column prop="blockTransactions" label="block transactions" min-width="80" />
        <el-table-column prop="blockUncles" label="block uncles" />
        <el-table-column prop="lastBlockTime" label="last block time" />
        <el-table-column prop="propagationTime" label="propagation time" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { option } from "runjs";
import systementity from "./systementity";
import { selectbues } from "./systementityjs";
let websocket;
export default {
  name: "app",
  components: {
    systementity,
  },
  data() {
    //这里存放数据
    return {
      tnodes: 1, //页面节点
      tableData: [
        {
          nodeName: "",
          nodeType: "",
          nodeLatency: "",
          nodeMining: "",
          nodePeers: "",
          lastBlock: "",
          totalDifficulty: "",
          blockTransactions: "0",
          blockUncles: "0",
          lastBlockTime: "",
          propagationTime: "",
          lastBlockMiners1: "",
          lastBlockMiners2: "",
          avgBlocktime: "",
          avgHashrate: "",
        },
      ],
      tableMoneyData: [],
      tablePageReturnMoneyData: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        search: "",
      },
      option: {
        color: ["#45A7E6"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: "",
            axisTick: {
              alignWithLabel: true,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            data: "",
          },
        ],
      },
      option1: {
        color: ["#fde7ac"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: "",
            axisTick: {
              alignWithLabel: true,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            data: "",
          },
        ],
      },
      option2: {
        color: ["#e89380"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: "",
            axisTick: {
              alignWithLabel: true,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            data: "",
          },
        ],
      },
      option3: {
        // color: ["#71ffe0"],
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          data: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75],
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "",
            type: "line",
            data: [0.9999999999999453, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      option4: {
        title: {
          subtext: "单位M",
          left: "left ",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          data: "",
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            data: "",
            type: "line",
          },
        ],
      },
    };
  },
  methods: {
    addData() {
      const that = this;
      selectbues().then((res) => {
        if (res.success) {
          let createTime = [];
          let fileSize = [];
          for (let i = 0; i < res.data.length; i++) {
            createTime.push(res.data[i].createTime);
            fileSize.push(res.data[i].fileSize);
          }
          that.option4.xAxis.data = createTime;
          that.option4.series[0].data = fileSize;
        }
      });
    },
    getData() {
      setInterval(() => {
        this.tableData[0].lastBlockTime = parseInt(this.tableData[0].lastBlockTime) + 1 + "s ago";
      }, 1000);
      websocket = new WebSocket("ws://125.64.98.21:3000/primus/?_primuscb=" + new Date().getTime() + "-1");
      websocket.onopen = () => {
        websocket.send(
          JSON.stringify({
            emit: ["ready"],
          })
        );
      };

      websocket.onmessage = (e) => {
        let domData = JSON.parse(e.data);
        let emit = domData.emit;
        if (emit && emit[0] === "init") {
          this.tableData[0].nodeName = emit[1].nodes[0].info.name;
          this.tableData[0].nodeType = emit[1].nodes[0].info.node;
          this.tableData[0].nodeLatency = emit[1].nodes[0].stats.latency + " ms";
          this.tableData[0].nodeMining = (emit[1].nodes[0].stats.mining == true ? 0 : 1) + " KH/s";
          this.tableData[0].nodePeers = emit[1].nodes[0].stats.peers;
          this.tableData[0].lastBlock = "#" + emit[1].nodes[0].stats.block.number.toLocaleString();
          this.tableData[0].lastBlockTime = Math.round(new Date().getTime() / 1000 - emit[1].nodes[0].stats.block.timestamp) + "s ago";
        } else {
          if (domData.action === "block") {
            this.tnodes = domData.data.block.difficulty; // 页面节点

            this.tableData[0].lastBlock = "#" + domData.data.block.number.toLocaleString();
            this.tableData[0].totalDifficulty = parseInt(domData.data.block.totalDifficulty).toLocaleString();
            this.tableData[0].blockTransactions = domData.data.block.transactions.length;
            this.tableData[0].blockUncles = domData.data.block.uncles.length;
            this.tableData[0].lastBlockTime = "0s ago";
            this.tableData[0].propagationTime = domData.data.block.propagation + " ms";
          } else if (domData.action === "charts") {
            this.$nextTick(() => {
              if (domData.data.miners.length === 1) {
                this.tableData[0].lastBlockMiners1 = domData.data.miners[0].miner;
              }
              if (domData.data.miners.length > 1) {
                this.tableData[0].lastBlockMiners1 = domData.data.miners[0].miner;
                this.tableData[0].lastBlockMiners2 = domData.data.miners[1].miner;
              }
              if (domData.data.avgBlocktime != "" && domData.data.avgBlocktime != null) {
                this.tableData[0].avgBlocktime = domData.data.avgBlocktime.toFixed(2) + "s";
              }
              if (domData.data.avgHashrate != "" && domData.data.avgHashrate != null) {
                this.tableData[0].avgHashrate = domData.data.avgHashrate.toFixed(1) + "H/s";
              }

              this.option.xAxis[0].data = domData.data.blocktime;
              this.option.series[0].data = domData.data.blocktime;

              this.option1.xAxis[0].data = domData.data.transactions;
              this.option1.series[0].data = domData.data.transactions;

              this.option2.xAxis[0].data = domData.data.gasSpending;
              this.option2.series[0].data = domData.data.gasSpending;

              let histogramList = domData.data.propagation.histogram;
              let xList = histogramList.map((item) => {
                return item.x / 1000;
              });
              let yList = histogramList.map((item) => {
                return item.y;
              });
              this.option3.xAxis.data = xList;
              this.option3.series.data = yList;
            });
          } else if (domData.action === "client-ping") {
            websocket.send(
              JSON.stringify({
                emit: [
                  "client-pong",
                  {
                    serverTime: domData.data.serverTime,
                    clientTime: new Date().getTime(),
                  },
                ],
              })
            );
          }
        }
      };
    },
  },
  created() {
    this.addData();
    this.getData();
  },
  mounted() {
    let that = this;
    var myChart = this.$echarts.init(document.getElementById("main"));
    var myChart1 = this.$echarts.init(document.getElementById("main1"));
    var myChart2 = this.$echarts.init(document.getElementById("main2"));
    var myChart3 = this.$echarts.init(document.getElementById("main3"));
    var myChart4 = this.$echarts.init(document.getElementById("main4"));

    var interval3 = setInterval(function () {
      myChart.setOption(that.option);
      myChart1.setOption(that.option1);
      myChart2.setOption(that.option2);
      myChart3.setOption(that.option3);
      myChart4.setOption(that.option4);
    }, 1000);
  },
};
</script>
<style lang="scss" scoped>
.traceability {
  background: #f2f7fa;
  padding: 20px;
  .top {
    display: flex;
    height: 140px;
    .item {
      background: #ffffff;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:first-child {
        background: #45a7e6;
        margin-right: 20px;
        color: #ffffff;
      }
      .img {
        width: 64px;
        height: 64px;
      }
      .name {
        text-align: center;
        font-size: 24px;
      }
      .num {
        text-align: center;
        font-size: 18px;
        margin-top: 10px;
      }
    }
  }
  .middle {
    margin-top: 20px;
    display: flex;
    height: 280px;
    overflow: hidden;
    .item {
      margin-right: 20px;
      background: #ffffff;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:last-child {
        margin-right: 0px;
      }
      .title {
        height: 40px;
        line-height: 40px;
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
  .bottom {
    margin-top: 20px;
    display: flex;
    height: 280px;
    overflow: hidden;
    .item {
      margin-right: 20px;
      background: #ffffff;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:last-child {
        margin-right: 0px;
      }
      &.second {
        flex: 2;
      }
      .title {
        height: 40px;
        line-height: 40px;
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
  .tab {
    margin-top: 20px;
  }
}
</style>
