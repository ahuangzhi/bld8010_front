<template>
  <el-container id="user_manage" v-loading="loading">
    <el-header class="user_search">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row :gutter="20">
              <el-col :span="10">
                <div>
                  <el-input class="search_input" placeholder="请输入用户信息" v-model="search.search" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="1.5">
                <el-button class="spacing20" type="primary" @click="search_user" icon="el-icon-search" round>用户搜索</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button round @click="add_user_drawer = true" icon="el-icon-plus" class="spacing20">添加新用户</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!--用户列表-->
      <el-table :data="table_data" style="width: 100%">
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="姓" prop="lastName"></el-table-column>
        <el-table-column label="名" prop="firstName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="round_button" @click="info_user(scope.row, scope.$index)" title="详细信息">
              <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M828.5 886.3H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM828.5 684.6H238.4c-9.9 0-18-8.1-18-18v-4c0-9.9 8.1-18 18-18h590.1c9.9 0 18 8.1 18 18v4c0 9.9-8.1 18-18 18zM409 449.5H230.2c-17.6 0-32-14.4-32-32V238.7c0-17.6 14.4-32 32-32H409c17.6 0 32 14.4 32 32v178.8c0 17.6-14.4 32-32 32z m-170.8-40H401V246.7H238.2v162.8zM822.4 437.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20zM822.4 269.5H552.9c-11 0-20-9-20-20s9-20 20-20h269.5c11 0 20 9 20 20s-9 20-20 20z" fill="#888888"></path><path d="M884.4 1024H182.5c-46.3 0-83.9-37.7-83.9-83.9V91.9C98.6 45.7 136.3 8 182.5 8h701.9c46.3 0 83.9 37.7 83.9 83.9V940c0 46.3-37.7 84-83.9 84zM182.5 48c-24.2 0-43.9 19.7-43.9 43.9V940c0 24.2 19.7 43.9 43.9 43.9h701.9c24.2 0 43.9-19.7 43.9-43.9V91.9c0-24.2-19.7-43.9-43.9-43.9H182.5z" fill="#888888"></path></svg>
            </el-button>
            <el-button class="round_button" slot="reference" @click="del_user(scope.row.id.id)" title="删除用户">
              <svg class="bld_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2330" width="200" height="200"><path d="M967.111 227.556H739.556V56.889H284.444v170.667H56.89v56.888h113.778v682.667h682.666V284.444h113.778v-56.888zM341.333 113.778h341.334v113.778H341.333V113.778z m455.111 796.444H227.556V284.444h568.888v625.778z" fill="#73777A" p-id="2331"></path><path d="M398.222 341.333h56.89v512h-56.89z m170.667 0h56.889v512h-56.89z" fill="#73777A"></path></svg>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!--添加用户-->
    <el-drawer
            size="70%"
            title="添加新用户"
            custom-class="drawer_class"
            :visible.sync="add_user_drawer"
            :direction="direction">
      <el-form status-icon ref="add_user_data" :model="add_user_data" :rules="add_user_rules" label-width="80px" class="user_add_from">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="add_user_data.email"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="add_user_data.lastName"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="add_user_data.firstName"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="add_user_data.description"></el-input>
        </el-form-item>
        <el-form-item label="激活邮件">
          <el-switch v-model="add_user_data.sendActivationMail"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add_user">立即创建</el-button>
          <el-button @click="add_user_drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!--详细信息-->
    <el-drawer title="详细信息"
               custom-class="drawer_class"
               :direction="direction"
               :visible.sync="user_info_drawer"
               size="70%">
      <div class="user_show_list">
        <el-form status-icon ref="update_data" :model="update_data" :rules="add_user_rules" label-width="80px" v-if="update_mode">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="update_data.email"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="update_data.lastName"></el-input>
          </el-form-item>
          <el-form-item label="名字">
            <el-input v-model="update_data.firstName"></el-input>
          </el-form-item>
          <el-form-item label="说明">
            <el-input v-model="update_data.additionalInfo.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="show_button" @click="update_info">确认修改</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="show_button" type="primary" @click="update_mode = false">取消修改</el-button>
          </el-form-item>
        </el-form>
        <div v-if="!update_mode">
          <template v-for="data1 in show_table_data">
            <dataShowInput :data1="data1"></dataShowInput>
          </template>
          <el-button class="show_button update_button" @click="update_mode = true">修改信息</el-button>
          <el-button
                  class="show_button"
                  type="primary"
                  @click="activation_url()">激活链接
          </el-button>
          <el-button
                  class="show_button"
                  type="primary"
                  @click="activation_mail()">激活邮件
          </el-button>
          <el-button
                  slot="reference"
                  class="show_button"
                  :type="button_type"
                  @click="modify_user_status">
            {{status ? '禁用用户' : '启用用户'}}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
    import { add_customer, del_customer, update_customer, modify_status, search_customer, activation_url } from "@/api/customer"
    import DataShowInput from "@/components/DataShowInput"
    import { date_format } from "@/utils/functions";

    var email_verify = (rule, value, callback) => {
        let mail_reg = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");
        callback(mail_reg.test(value) ? "" : new Error("请输入正确邮箱格式"))
    };

    export default {
        name: "user",
        components:{
            DataShowInput
        },
        data() {
            return {
                customerId: '',
                search: {
                    limit: 50,
                    search: '',
                    id: ''
                },
                table_data: [],
                add_user_data: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    authority: ''
                },
                add_user_rules: {
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {validator: email_verify, trigger: 'blur'}
                    ]
                },
                show_table_data: '',
                show_index: 0,
                user_info_drawer: false,
                add_user_drawer: false,
                direction: 'rtl',
                button_type: '',
                status: "",
                update_data: '',
                update_mode: false,
                loading: false
            }
        },
        methods: {
            search_user() {
                this.loading = true;
                let thi = this;
                search_customer(this.search).then((res)=>{
                    if(res.success){
                        thi.table_data = res.data;
                        this.add_user_drawer = false;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                    }
                    this.loading = false
                })
            },
            info_user(row, index) {
                this.user_status(row);
                this.show_index = index;
                this.direction = "rtl";
                this.user_info_drawer = true;
                let ati = row.additionalInfo;
                this.button_type =  this.status ? "danger" : "success";
                this.show_table_data = [{k: '邮箱', v: row.email}, {k: 'ID', v: row.id.id} , {k: '说明', v: (ati == null || ati === undefined) ? '' : row.additionalInfo.description}, {k: '姓', v: row.lastName}, {k: '名', v: row.firstName}];
                this.update_data = row;
                if (!ati) {
                    this.update_data.additionalInfo = {'description': null}
                }else if (!ati.description){
                    this.update_data.additionalInfo['description'] = null
                }
            },
            del_user(id){
                this.$confirm('确定删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    del_customer({'tbUserId': id}).then(res=>{
                        if (res.success){
                            this.search_user();
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
            add_user(){
                this.$refs['add_user_data'].validate((valid) => {
                    if (valid) {
                        add_customer({'email': this.add_user_data.email, 'firstName': this.add_user_data.firstName, 'lastName': this.add_user_data.lastName, 'sendActivationMail': this.add_user_data.sendActivationMail, 'customerId': {'id': this.customerId, 'entityType': 'CUSTOMER'}, 'authority': 'CUSTOMER_USER', 'additionalInfo': {'description': this.add_user_data.description}}).then((res)=>{
                            if (res.success){
                                this.search_user()
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
            activation_mail(){
                alert("重新发送激活邮件")
            },
            modify_user_status(){
                modify_status({'userId': this.show_table_data[1].v, "status": this.status === false}).then((res)=>{
                    if (res.success){
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                        let ati = this.table_data[this.show_index].additionalInfo;
                        if (ati){
                            ati.userCredentialsEnabled = !ati.userCredentialsEnabled
                        } else {
                            ati = {'userCredentialsEnabled': true}
                        }

                    }else {
                        this.$message({
                            type: 'info',
                            message: res.message
                        });
                    }
                })
            },
            user_status(row){
                let additionalInfo = row.additionalInfo;
                if (additionalInfo == null || additionalInfo === undefined){
                    this.status = true
                }else {
                    let status = additionalInfo.userCredentialsEnabled;
                    this.status = !!(status || status !== false);
                }
            },
            activation_url(){
                activation_url(this.show_table_data[1].v).then((res)=>{
                    if (res.success){
                        this.$alert(res.data == null ? '用户已激活' : res.data, '激活链接', {
                            confirmButtonText: '确定'
                        });
                    }else {
                        this.$message({
                            type: 'info',
                            message: res.message
                        });
                    }
                })
            },
            update_info(){
                console.log(this.update_data)
                this.$refs['update_data'].validate((valid) => {
                    if (valid) {
                        update_customer(this.update_data).then((res)=>{
                            if (res.success){
                                this.$message({
                                    type: 'info',
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
                        })
                    } else {
                        return false;
                    }
                })
            }
        },
        created(){
            let url = window.location.href;
            let number = url.lastIndexOf("customerId=");
            if (number < 1) {
                this.customerId = '';
                this.search.id = '';
                this.$message({
                    type: 'warning',
                    message: '没有获取到您的查询客户ID'
                });
                return;
            }
            this.customerId = url.substr(number + 11);
            this.search.id = this.customerId;
            this.search_user()
        }
    }
</script>

<style scoped>
  .spacing20{
    letter-spacing: 2px;
  }
</style>