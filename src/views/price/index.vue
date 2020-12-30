<template>
  <el-container id="device_manage" v-loading="loading">
    <el-header class="device_search">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row :gutter="20">
              <el-col :span="10">
                <div>
                  <el-input class="search_input" placeholder="请输入设备信息" v-model="search.search" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="1.5">
                <el-button class="spacing20" type="primary" @click="search_maintain" icon="el-icon-search" round>设备搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!--设备列表-->
      <el-table :data="table_data" style="width: 100%">

        <el-table-column label="设备名称" prop="deviceName" align="center"></el-table-column>
        <el-table-column label="00:00-07:59" prop="00:00-07:59" align="center"></el-table-column>
        <el-table-column label="08:00-17:59" prop="08:00-17:59" align="center"></el-table-column>
        <el-table-column label="18:00-23:59" prop="18:00-23:59" align="center"></el-table-column>

        <el-table-column label="操作" v-if="!isCustomer" align="center">
          <template slot-scope="scope">
            <el-button class="round_button" @click="update_maintain_button(scope.row, scope.$index)" title="修改信息">
              <svg-icon icon-class="update" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="search.pageNum"
                :page-size="search.pageSize"
                layout="prev, pager, next, jumper"
                :total="search.total">
        </el-pagination>
      </div>
    </el-main>

    <!--修改维护信息-->
    <el-dialog :visible.sync="update_maintain_dialog">
      <el-form ref="attribute_from" :model="update_from" label-width="80px">
        <el-form-item label="00:00-07:59">
          <el-input v-model="update_from.time1"></el-input>
        </el-form-item>
        <el-form-item label="08:00-17:59">
          <el-input v-model="update_from.time2"></el-input>
        </el-form-item>
        <el-form-item label="18:00-23:59">
          <el-input v-model="update_from.time3"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="update_price">立即修改</el-button>
          <el-button @click="update_maintain_dialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
    import { searchMaintain, add_device_attributes } from "@/api/device"

    export default {
        name: "price",
        data() {
            return {
                isCustomer: false,
                loading: false,
                search: {
                    search: null,
                    pageSize: 9,
                    pageNum: 0,
                    total: 0
                },
                table_data: [],
                update_maintain_dialog: false,
                update_from: {
                    index: 0,
                    id: '',
                    type: 'SHARED_SCOPE',
                    time1 : '',
                    time2: '',
                    time3: ''
                }
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.search_maintain();
            },
            search_maintain() {
                this.loading = true;
                searchMaintain(this.search).then(res => {
                    if (res.success) {
                        this.search.total = res.total;
                        this.search.pageSize = res.pageSize;
                        this.search.pageNum = res.pageNum;
                        let data = res.data;
                        console.log(data)
                        let d = [];
                        for (let i = 0; i < data.length; i++) {
                            let cf = data[i].ChargingFee;
                            let j = JSON.parse(cf);
                            j["deviceName"] = data[i].deviceName
                            j["deviceId"] = data[i].deviceId
                            d.push(j)
                        }
                        this.table_data = d
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                    }
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                })
            },
            device_status(row){
                this.$confirm('确定将该设备修改为' + (row.maintaining && row.maintaining === true ? '维护' : '启用') + '状态吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {"id": row.deviceId, "type": "SHARED_SCOPE", "attribute": "{\"maintaining\": \"" + row.maintaining + "\"}"};
                    add_device_attributes(param).then(res => {
                        if (!res.success) {
                            row.maintaining = !row.maintaining
                        }
                    }).catch(() => {
                        row.maintaining = !row.maintaining
                    })
                }).catch(() => {
                    row.maintaining = !row.maintaining
                })

            },
            update_maintain_button(row, index){
                this.update_from.index = index;
                this.update_maintain_dialog = true;
                this.update_from.id = row.deviceId;
                this.update_from.time1 = row["00:00-07:59"]
                this.update_from.time2 = row["08:00-17:59"]
                this.update_from.time3 = row["18:00-23:59"]
            },
            update_price(){
                this.loading = true;
                let param = {"id": this.update_from.id, "type": "SHARED_SCOPE", "attribute": "{\"ChargingFee\": \"{\\\"00:00-07:59\\\": \\\"" + this.update_from.time1 + "\\\", \\\"08:00-17:59\\\": \\\"" + this.update_from.time2 + "\\\", \\\"18:00-23:59\\\":\\\"" + this.update_from.time3 + "\\\"}\"}"};
                add_device_attributes(param).then(res => {
                    if (res.success){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        let data = this.table_data[this.update_from.index];
                        data["00:00-07:59"] = this.update_from.time1
                        data["08:00-17:59"] = this.update_from.time2
                        data["18:00-23:59"] = this.update_from.time3
                        this.update_maintain_dialog = false;
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.message
                        });
                    }
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                })
            }
        },
        created(){
            this.search_maintain( )
        }
    }
</script>

<style lang="scss" scoped>
  .close_button {
    float: right;
    border: none;
    z-index: 1000;
    height: .918rem;
    border-radius: 0;
    position: relative;
    border-bottom: .038rem solid #E4E7ED;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .chart {
    display: flex;
    div{
      display: flex;
      flex-direction: column;
      width: 49.9%;
      span{
        font-weight: bold;
        font-size: 24px;
        display: flex;
        justify-content: center;
      }
    }
  }

  .chart > div > .chart_main {
    width: 600px;
    height: 400px;
    display: inline-block
  }

  .pagination{
    margin-top: .4rem;
    display: flex;
    justify-content: center;
  }
  .round_button{
    color: #606266;
  }
</style>