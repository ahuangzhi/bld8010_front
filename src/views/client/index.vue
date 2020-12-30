<template>
  <el-container id="client_manage" v-loading="loading">
    <el-header class="user_search">
      <el-row>
        <el-col :span="24">
          <div class="grid-content BG-PURPLE-DARK">
            <el-row :gutter="20">
              <el-col :span="8">
                <div>
                  <el-input class="search_input" placeholder="请输入名称" v-model="search_form.search" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="1.5">
                <el-button class="spacing20" type="primary" @click="search_client" icon="el-icon-search" round>客户搜索</el-button>
              </el-col>
              <el-col :span="1.5" v-if="">
                <el-button round @click="add_client_drawer = true" icon="el-icon-plus" class="spacing20">添加新客户</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!--客户列表-->
      <el-table :data="table_data" style="width: 100%">
        <el-table-column label="名称" prop="name" rowspan=".5"></el-table-column>
        <el-table-column label="客户ID" prop="id.id"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a class="menuItem" href="javascript:void(0)">
              <el-button class="round_button" @click="client_info(scope.row)" title="详细信息">
                <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M828.5 886.3H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM828.5 684.6H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM409 449.5H230.2c-17.6 0-32-14.4-32-32V238.7c0-17.6 14.4-32 32-32H409c17.6 0 32 14.4 32 32v178.8c0 17.6-14.4 32-32 32z m-170.8-40H401V246.7H238.2v162.8zM822.4 437.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20zM822.4 269.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20z" fill="#888888"></path><path d="M884.4 1024H182.5c-46.3 0-83.9-37.7-83.9-83.9V91.9C98.6 45.7 136.3 8 182.5 8h701.9c46.3 0 83.9 37.7 83.9 83.9V940c0 46.3-37.7 84-83.9 84zM182.5 48c-24.2 0-43.9 19.7-43.9 43.9V940c0 24.2 19.7 43.9 43.9 43.9h701.9c24.2 0 43.9-19.7 43.9-43.9V91.9c0-24.2-19.7-43.9-43.9-43.9H182.5z" fill="#888888"></path></svg>
              </el-button>
            </a>
            <a class="menuItem" :href="user_manage(scope.row.id.id)" v-if="scope.row.name !== 'Public'" title="用户管理">
              <el-button class="round_button">
                <svg t="1591601144425" class="bld_icon" viewBox="0 0 1130 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2523" width="200" height="200"><path d="M423.535859 640.663936a282.456786 282.456786 0 1 1 199.706688-82.737112 280.586727 280.586727 0 0 1-199.706688 82.737112z m0-481.799851c-109.917896 0-199.330078 89.412182-199.330078 199.330079s89.412182 199.330078 199.330078 199.330078 199.278132-89.399196 199.278133-199.304105-89.373223-199.330078-199.278133-199.330079z" p-id="2524"></path><path d="M805.495353 1024H41.56338a41.55686 41.55686 0 0 1-41.556861-41.55686 423.52934 423.52934 0 1 1 847.045694 0 41.55686 41.55686 0 0 1-41.55686 41.55686z m-719.829755-83.113721h675.727536c-20.648565-168.084514-164.318423-298.689934-337.857275-298.689934s-317.221697 130.592434-337.870261 298.689934zM752.263612 583.185603a41.55686 41.55686 0 0 1-10.85673-81.672217 213.264613 213.264613 0 0 0 157.02-205.485688c0-117.411117-95.50286-212.913977-212.97891-212.913977a213.23864 213.23864 0 0 0-62.620994 9.337307 41.55686 41.55686 0 1 1-24.349723-79.373603 296.09263 296.09263 0 0 1 383.102307 283.015205c0 133.358562-89.801778 250.860585-218.381301 285.703416a41.55686 41.55686 0 0 1-10.934649 1.389557z" p-id="2525"></path><path d="M1089.030019 981.430191h-138.955752a41.55686 41.55686 0 0 1 0-83.113721h95.035345a361.362874 361.362874 0 0 0-294.910857-314.455568 41.565951 41.565951 0 0 1 14.739699-81.815069 445.190854 445.190854 0 0 1 365.648426 437.801525 41.55686 41.55686 0 0 1-41.556861 41.55686z" p-id="2526"></path></svg>
              </el-button>
            </a>
            <a class="menuItem" :href="manage_device(scope.row.id.id)" title="设备管理">
              <el-button class="round_button">
                <svg t="1591602035987" class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4051" width="200" height="200"><path d="M170.666667 256l768 0 0-85.333333-768 0c-47.146667 0-85.333333 38.186667-85.333333 85.333333l0 469.333333-85.333333 0 0 128 597.333333 0 0-128-426.666667 0 0-469.333333zM981.333333 341.333333l-256 0c-23.466667 0-42.666667 19.2-42.666667 42.666667l0 426.666667c0 23.466667 19.2 42.666667 42.666667 42.666667l256 0c23.466667 0 42.666667-19.2 42.666667-42.666667l0-426.666667c0-23.466667-19.2-42.666667-42.666667-42.666667zM938.666667 725.333333l-170.666667 0 0-298.666667 170.666667 0 0 298.666667z" p-id="4052"></path></svg>
              </el-button>
            </a>
            <a class="menuItem" :href="manage_assets(scope.row.id.id)" title="资产管理">
              <el-button class="round_button">
                <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M895.488 192.512L270.848 68.096a44.8 44.8 0 0 0-8.192-1.024c-69.12 0-126.976 58.368-126.976 126.976v67.584C73.728 270.848 25.6 324.096 25.6 387.584v442.368a126.976 126.976 0 0 0 126.976 126.976h718.336a126.976 126.976 0 0 0 126.976-126.976V320.512c0.512-62.464-36.864-110.08-102.4-128zM259.072 155.648l526.848 104.96H223.744v-66.56c0-19.456 15.872-36.352 35.328-38.4z m612.352 712.704H152.576a38.912 38.912 0 0 1-38.912-38.912V387.584c0-20.48 17.92-38.4 37.888-38.912H909.824v480.768c0 21.504-17.408 38.912-38.4 38.912z" fill="" p-id="1570"></path><path d="M203.264 569.856c-20.48 21.504-20.48 56.832 0 78.848 21.504 20.48 56.832 20.48 78.336 0 21.504-21.504 21.504-56.832 0-78.848-21.504-21.504-56.832-21.504-78.336 0z" fill=""></path></svg>
              </el-button>
            </a>
            <a class="menuItem" href="javascript:void(0)" v-if="scope.row.name !== 'Public'" title="删除">
              <el-button class="round_button" slot="reference" @click="del_client(scope.row.id.id)">
                <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M967.111 227.556H739.556V56.889H284.444v170.667H56.89v56.888h113.778v682.667h682.666V284.444h113.778v-56.888zM341.333 113.778h341.334v113.778H341.333V113.778z m455.111 796.444H227.556V284.444h568.888v625.778z" fill="#73777A" p-id="2331"></path><path d="M398.222 341.333h56.89v512h-56.89z m170.667 0h56.889v512h-56.89z" fill="#73777A"></path></svg>
              </el-button>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!--添加客户-->
    <el-drawer
            size="70%"
            title="添加新客户"
            custom-class="drawer_class"
            :visible.sync="add_client_drawer"
            :direction="direction">
      <el-form status-icon ref="add_client_data" :model="add_client_data" :rules="add_client_rules" label-width="80px" class="client_add_from">
        <el-form-item label="名称" prop="name">
          <el-input v-model="add_client_data.name"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="add_client_data.description"></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-input v-model="add_client_data.country"></el-input>
        </el-form-item>
        <el-form-item label="省市">
          <el-input v-model="add_client_data.state"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="add_client_data.city"></el-input>
        </el-form-item>
        <el-form-item label="详细地址1">
          <el-input v-model="add_client_data.address"></el-input>
        </el-form-item>
        <el-form-item label="详细地址2">
          <el-input v-model="add_client_data.address2"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="add_client_data.zip"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="add_client_data.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="add_client_data.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add_client">立即创建</el-button>
          <el-button @click="add_client_drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!--详细信息-->
    <el-drawer size="70%"
               title="客户详细信息"
               custom-class="drawer_class"
               :direction="direction"
               :visible.sync="client_info_drawer">
      <div class="client_show_list">
        <el-form status-icon ref="update_data" :model="update_data" :rules="add_client_rules" label-width="80px" class="add_from" v-if="update_mode">
          <el-form-item label="名称" prop="title">
            <el-input v-model="update_data.title"></el-input>
          </el-form-item>
          <el-form-item label="说明">
            <el-input v-model="update_data.additionalInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="国家">
            <el-input v-model="update_data.country"></el-input>
          </el-form-item>
          <el-form-item label="省市">
            <el-input v-model="update_data.state"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="update_data.city"></el-input>
          </el-form-item>
          <el-form-item label="详细地址1">
            <el-input v-model="update_data.address"></el-input>
          </el-form-item>
          <el-form-item label="详细地址2">
            <el-input v-model="update_data.address2"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="update_data.zip"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="update_data.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="update_data.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="show_button" @click="update_info">确认修改</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="show_button" type="primary" @click="update_mode = false">取消修改</el-button>
          </el-form-item>
        </el-form>
        <div class="show_list" v-if="!update_mode">
          <template v-for="data1 in show_table_data">
            <DataShowInput :data1="data1"></DataShowInput>
          </template>
          <el-button class="show_button update_button" @click="update_mode = true" v-if="show_table_data[0].v && show_table_data[0].v !== 'Public'">修改信息</el-button>
        </div>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
  import { search_client, del_client, add_client, update_client } from "@/api/client"
  import DataShowInput from "@/components/DataShowInput"
  import { date_format } from "@/utils/functions";

  export default {
        name: "client",
        components:{
            DataShowInput
        },
        data() {
            return {
                search_form:{
                    limit: 50,
                    search: ''
                },
                table_data: [],
                show_table_data: [{
                    k: '',
                    v: ''
                }],
                add_client_data: {
                    name: '',
                    description: '',
                    country: '',
                    state: '',
                    city: '',
                    address: '',
                    address2: '',
                    zip: '',
                    phone: '',
                    email: ''
                },
                add_client_rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ]
                },
                update_rules: {
                    title: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ]
                },
                client_info_drawer: false,
                add_client_drawer: false,
                direction: 'rtl',
                update_data: '',
                update_mode: false,
                loading: false
            }
        },
        methods: {
            search_client() {
                this.loading = true;
                search_client(this.search_form).then(res => {
                        this.table_data = res.data;
                        this.loading = false;
                        this.update_mode = false;
                    }).catch(e => {
                        this.loading = false;
                        this.update_mode = false;
                        this.add_client_drawer = false
                    })
            },
            client_info(row) {
                this.direction = "rtl";
                let ati = row.additionalInfo;
                this.client_info_drawer = true;
                this.show_table_data = [{k: '名称', v : row.name}, {k: 'ID', v: row.id.id} , {k: '说明', v: ati ? ati.description : null}, {k: '手机', v: row.phone}, {k: '邮箱', v: row.mail}, {k: '国家', v: row.country}, {k: '省市', v: row.sheng}, {k: '城市', v: row.shi}, {k: '区县', v: row.qu}, {k: '邮政编号', v: row.zip}, {k: '地址1', v: row.addr1}, {k: '地址2', v: row.addr2}];
                this.update_data = row;
                if (!ati) {
                    this.update_data.additionalInfo = {'description': null}
                }else if (!ati.description && row.name !== "Public"){
                    console.log("this.update_data.additionalInfo", this.update_data.additionalInfo)
                    this.update_data.additionalInfo.forEach((v, i) => {
                        v['description'] = null
                    })
                }
            },
            del_client(id){
                this.$confirm('确定删除该客户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    del_client({'userId': id}).then(res=>{
                        if (res.success){
                            this.search_client();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.message
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            add_client(){
                add_client({'email': this.add_client_data.email, 'name': this.add_client_data.name, 'country': this.add_client_data.country, 'state': this.add_client_data.state, 'city': this.add_client_data.city, 'zip': this.add_client_data.zip, 'address': this.add_client_data.address, 'address2': this.add_client_data.address2, 'description': this.add_client_data.description, 'phone': this.add_client_data.phone}).then((res)=>{
                    if (res.success){
                        this.search_client();
                        this.add_client_drawer = false;
                    }else {
                        this.$message({
                            type: 'info',
                            message: res.message
                        });
                    }
                }).catch((err)=>{
                        this.$message({
                            type: 'info',
                            message: '添加客户失败，请稍后再试'
                        });
                    })
            },
            update_info(){
                this.$refs['update_data'].validate((valid) => {
                    if (valid) {
                        update_client(this.update_data).then((res)=>{
                            if (res.success){
                                this.$message({
                                    type: 'success',
                                    message: res.message
                                });
                                let data = res.data;
                                let ati = data.additionalInfo;
                                this.update_tenant_admin_data = data;
                                this.show_table_data = [{k: '名称', v : data.name}, {k: 'ID', v: data.id.id} , {k: '说明', v: ati ? ati.description : null}, {k: '手机', v: data.phone}, {k: '邮箱', v: data.mail}, {k: '国家', v: data.country}, {k: '省市', v: data.state}, {k: '城市', v: data.city}, {k: '邮政编号', v: data.zip}, {k: '地址1', v: data.address}, {k: '地址2', v: data.address2}, {k: '创建时间', v: date_format(data.createdTime)}];
                                this.update_mode = false;
                            }else {
                                this.$message({
                                    type: 'info',
                                    message: res.message
                                });
                            }
                        }).catch((err)=>{
                                this.$message({
                                    type: 'info',
                                    message: '修改信息失败，请稍后再试'
                                });
                            })
                    } else {
                        return false;
                    }
                })
            },
            manage_device(id){
                return "/#/device/index?customerId=" + id
            },
            manage_assets(id){
                return "/#/asset/index?customerId=" + id
            },
            user_manage(id){
                return "/#/customer/index?customerId=" + id
            }
        },
        created(){
            this.search_client()
        }
    }
</script>

<style scoped>
  .hide{
    display: none!important;
  }
  .menuItem{
    margin-left: .1rem;
    margin-right: .1rem;
  }
</style>