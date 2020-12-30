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
                <el-button class="spacing20" type="primary" @click="search_map" icon="el-icon-search" round>设备搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!--设备列表-->
      <el-table :data="table_data" style="width: 100%">
        <el-table-column label="设备名称" prop="chipId"></el-table-column>
        <el-table-column label="拥有人" prop="customerName"></el-table-column>
        <el-table-column label="设备坐标" prop="gps"></el-table-column>
        <el-table-column label="设备地址" prop="addr"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="round_button" @click="update_map_button(scope.row, scope.$index)" title="修改设备地址坐标">
              <svg-icon icon-class="update" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!--修改设备地址-->
    <el-dialog :visible.sync="update_map_dialog">
      <el-form ref="attribute_from" :model="update_from" label-width="80px">
        <el-form-item label="设备经度" prop="k">
          <el-input v-model="update_from.x"></el-input>
        </el-form-item>
        <el-form-item label="设备纬度" prop="v">
          <el-input v-model="update_from.y"></el-input>
        </el-form-item>
        <el-form-item label="设备地址" prop="v">
          <el-input v-model="update_from.addr"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update_map">立即修改</el-button>
          <el-button @click="update_map_dialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
    import { search_map, update_map } from "@/api/map"

    export default {
        data() {
            return {
                search: {
                    search: null
                },
                table_data: [],
                update_from: {
                    chipId: null,
                    x: '',
                    y: '',
                    addr: '',
                    gps: null,
                    index: null,
                },
                update_map_dialog: false,
                loading: false
            }
        },
        methods: {
            search_map(){
                this.loading = true;
                search_map(this.search.search).then(res => {
                    if (res.success){
                        this.table_data = res.data
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.message
                        });
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            update_map(){
                this.update_from.gps = this.update_from.x + "," + this.update_from.y
                update_map(this.update_from).then(res => {
                    if (res.success){
                       this.table_data[this.update_from.index].gps = this.update_from.gps
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.message
                        });
                    }
                    this.update_map_dialog = false
                })
            },
            update_map_button(row, index){
                let gpss = row.gps;
                let gps = gpss ? gpss.split(",") : [];
                this.update_from.x = gps[0]
                this.update_from.y = gps[1];
                this.update_from.addr = row.addr;
                this.update_from.chipId = row.chipId;
                this.update_from.index = index;
                this.update_map_dialog = true
            }
        },
        created() {
            this.loading = true;
            this.search_map()
        }
    }
</script>

<style scoped>
  .round_button{
    color: #606266;
  }
</style>