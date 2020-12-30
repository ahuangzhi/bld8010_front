<template>
  <el-container id="tenant_manage" v-loading="loading">
    <el-header class="tenant_search">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row :gutter="20">
              <el-col :span="10">
                <div>
                  <el-input class="search_input" placeholder="请输入租户信息" v-model="search.search" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="1.5">
                <el-button class="spacing20" type="primary" @click="search_tenant" icon="el-icon-search" round>租户搜索</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button round @click="add_tenant_drawer = true" icon="el-icon-plus" class="spacing20">添加新租户</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!--客户列表-->
      <el-table :data="table_data" style="width: 100%">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a class="menuItem" :href="user_manage_api(scope.row.id)" v-if="scope.row.name != 'Public'">
              <el-button title="管理员管理"
                         size="mini"
                         type="primary">管理
              </el-button>
            </a>
            <el-button
                    size="mini"
                    @click="info_tenant(scope.row)">详情
            </el-button>
            <el-button type="danger" size="mini" slot="reference" @click="del_tenant(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!--添加租户-->
    <el-drawer
            size="70%"
            title="添加新租户"
            custom-class="drawer_class"
            :visible.sync="add_tenant_drawer"
            :direction="direction">
      <el-form status-icon ref="add_tenant_data" :model="add_tenant_data" :rules="add_tenant_rules" label-width="80px" class="tenant_add_from">
        <el-form-item label="名称" prop="title">
          <el-input v-model="add_tenant_data.title"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="add_tenant_data.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="add_tenant_data.phone"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="add_tenant_data.description"></el-input>
        </el-form-item>
        <el-form-item label="国家">
          <el-input v-model="add_tenant_data.country"></el-input>
        </el-form-item>
        <el-form-item label="省市">
          <el-input v-model="add_tenant_data.state"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="add_tenant_data.city"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="add_tenant_data.address"></el-input>
        </el-form-item>
        <el-form-item label="详细地址2">
          <el-input v-model="add_tenant_data.address2"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="add_tenant_data.zip"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add_tenant">立即创建</el-button>
          <el-button @click="add_tenant_drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!--详细信息-->
    <el-drawer title="详细信息"
               custom-class="drawer_class"
               :direction="direction"
               :visible.sync="tenant_info_drawer"
               size="70%">
      <el-form status-icon ref="update_data" :model="update_data" :rules="add_tenant_rules" label-width="80px" class="add_from" v-if="update_mode">
        <el-form-item label="名称" prop="title">
          <el-input v-model="update_data.title"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="update_data.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="update_data.phone"></el-input>
        </el-form-item>
        <el-form-item label="详情">
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
        <el-form-item label="详细地址">
          <el-input v-model="update_data.address"></el-input>
        </el-form-item>
        <el-form-item label="详细地址2">
          <el-input v-model="update_data.address2"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="update_data.zip"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="show_button" @click="update_info">确认修改</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="show_button" type="primary" @click="update_mode = false">取消修改</el-button>
        </el-form-item>
      </el-form>
      <div class="tenant_show_list" v-if="!update_mode">
        <template v-for="data1 in show_table_data">
          <dataShowInput :data1="data1"></dataShowInput>
        </template>
        <el-button class="show_button update_button" @click="update_mode = true">修改信息</el-button>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
    import DataShowInput from "@/components/DataShowInput"
    import { add_tenant, del_tenant, update_tenant, search_tenant } from "@/api/tenant"
    import { date_format } from "@/utils/functions"

    export default {
        name: "tenant",
        components:{
            DataShowInput
        },
        data() {
            return {
                customerId: '',
                search: {
                    limit: 50,
                    search: '',  
                },
                table_data: [],
                add_tenant_data: {
                    id: '',
                    createdTime: '',
                    description: '',
                    country: '',
                    state: '',
                    city: '',
                    address: '',
                    address2: '',
                    phone: '',
                    email: '',
                    title: '',
                    region: '',
                    name: ''
                },
                add_tenant_rules: {
                    title: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ]
                },
                update_data: '',
                update_mode: false,
                show_table_data: '',
                tenant_info_drawer: false,
                add_tenant_drawer: false,
                direction: 'rtl',
                button_type: '',
                status: "",
                loading: false
            }
        },
        methods: {
            search_tenant() {
                this.loading = true;
                search_tenant(this.search).then((res)=>{
                    if(res.success){
                        this.table_data = res.data;
                        this.add_tenant_drawer = false;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                    }
                    this.loading = false
                })
            },
            info_tenant(row) {
                this.update_data = row;
                this.direction = "rtl";
                let ati = row.additionalInfo;
                this.show_table_data = [{k: '名称', v : row.name}, {k: 'ID', v: row.id.id} , {k: '说明', v: ati ? ati.description : null}, {k: '手机', v: row.phone}, {k: '邮箱', v: row.mail}, {k: '国家', v: row.country}, {k: '省市', v: row.state}, {k: '城市', v: row.city}, {k: '邮政编号', v: row.zip}, {k: '地址1', v: row.address}, {k: '地址2', v: row.address2}, {k: '创建时间', v: date_format(row.createdTime)}];
                if (!ati) {
                    this.update_data.additionalInfo = {'description': null}
                }else if (!ati.description){
                    this.update_data.additionalInfo.forEach((v, i) => {
                        v['description'] = null
                    })
                }
                this.tenant_info_drawer = true;
            },
            del_tenant(id){
                this.$confirm('确定删除该租户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    del_tenant({'tenantId': id.id}).then(res=>{
                        if (res.success){
                            this.search_tenant();
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
            add_tenant(){
                this.$refs['add_tenant_data'].validate((valid) => {
                    if (valid) {
                        add_tenant({"additionalInfo": this.add_tenant_data.description ? {"description": this.add_tenant_data.description} : null,"country": this.add_tenant_data.country,"state":this.add_tenant_data.state,"city": this.add_tenant_data.city,"address": this.add_tenant_data.address,"address2": this.add_tenant_data.address2,"zip": this.add_tenant_data.zip,"phone": this.add_tenant_data.phone,"email": this.add_tenant_data.email,"title": this.add_tenant_data.title}).then((res)=>{
                            if (res.success){
                                this.search_tenant()
                            }else {
                                this.$message({
                                    type: 'info',
                                    message: res.message
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            user_manage_api(id){
                return "/#/tenantAdmin/index?userId=" + id.id
            },
            update_info(){
                this.$refs['update_data'].validate((valid) => {
                    if (valid) {
                        update_tenant(this.update_data).then((res)=>{
                            if (res.success){
                                this.$message({
                                    type: 'success',
                                    message: "修改成功"
                                });
                                let ati = res.data.additionalInfo;
                                this.update_tenant_admin_data = res.data;
                                this.show_table_data = [{k: '名称', v : res.data.name}, {k: 'ID', v: res.data.id.id} , {k: '说明', v: ati ? ati.description : null}, {k: '手机', v: res.data.phone}, {k: '邮箱', v: res.data.mail}, {k: '国家', v: res.data.country}, {k: '省市', v: res.data.state}, {k: '城市', v: res.data.city}, {k: '邮政编号', v: res.data.zip}, {k: '地址1', v: res.data.address}, {k: '地址2', v: res.data.address2}, {k: '创建时间', v: date_format(res.data.createdTime)}];
                                this.update_mode = false;
                            }else {
                                this.$message({
                                    type: 'info',
                                    message: res.message
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                })
            }
        },
        created(){
            this.search_tenant()
        }
    }
</script>

<style scoped>
  .menuItem{
    margin-right: 10px;
  }
</style>