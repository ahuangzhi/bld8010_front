<template>
  <el-container id="tenant_admin_manage" v-loading="loading">
    <el-header class="tenant_admin_search">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row :gutter="20">
              <el-col :span="10">
                <div>
                  <el-input class="search_input" placeholder="请输入租户管理员信息" v-model="search_name" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="1.5">
                <el-button class="spacing20" type="primary" @click="search_tenant_admin" icon="el-icon-search" round>租户管理员搜索</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button round @click="add_tenant_admin_drawer = true" icon="el-icon-plus" class="spacing20">添加新租户管理员</el-button>
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
            <el-button
                    size="mini"
                    @click="info_tenant_admin(scope.row)">详情
            </el-button>
            <el-button type="danger" size="mini" slot="reference" @click="del_tenant_admin(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!--添加租户管理员-->
    <el-drawer
            size="70%"
            title="添加新租户管理员"
            custom-class="drawer_class"
            :visible.sync="add_tenant_admin_drawer"
            :direction="direction">
      <el-form status-icon ref="add_tenant_admin_data" :model="add_tenant_admin_data" :rules="add_tenant_admin_rules" label-width="80px" class="add_from">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="add_tenant_admin_data.email"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="add_tenant_admin_data.lastName"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="add_tenant_admin_data.firstName"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="add_tenant_admin_data.description"></el-input>
        </el-form-item>
        <el-form-item label="激活邮件">
          <el-switch v-model="add_tenant_admin_data.sendActivationMail"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add_tenant_admin">立即创建</el-button>
          <el-button @click="add_tenant_admin_drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!--详细信息-->
    <el-drawer title="详细信息"
               custom-class="drawer_class"
               :direction="direction"
               :visible.sync="tenant_admin_info_drawer"
               size="70%">
      <el-form status-icon ref="update_tenant_admin_data" :model="update_tenant_admin_data" :rules="add_tenant_admin_rules" label-width="80px" class="add_from" v-if="update_mode">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="update_tenant_admin_data.email"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="update_tenant_admin_data.lastName"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="update_tenant_admin_data.firstName"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="update_tenant_admin_data.additionalInfo.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="show_button" @click="update_info">确认修改</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="show_button" type="primary" @click="update_mode = false">取消修改</el-button>
        </el-form-item>
      </el-form>
      <div  v-if="!update_mode">
        <div class="show_list">
          <template v-for="data1 in show_table_data">
            <DataShowInput :data1="data1"></DataShowInput>
          </template>
        </div>
        <div class="show_operate">
          <el-button
                  class="show_button"
                  @click="update_mode = true">修改信息
          </el-button>
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
                  @click="modify_tenant_admin_status">
            {{status ? '禁用用户' : '启用用户'}}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
    import DataShowInput from "@/components/DataShowInput"
    import { add_tenant_admin, del_tenant_admin, update_tenant_admin, search_tenant_admin } from "@/api/tenantAdmin"
    import { activation_url, modify_status } from  "@/api/customer"

    var email_verify = (rule, value, callback) => {
        let mail_reg = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");
        callback(mail_reg.test(value) ? "" : new Error("请输入正确邮箱格式"))
    };

    export default {
        name: "tenantAdmin",
        components:{
            DataShowInput
        },
        data() {
            return {
                tenant_id: '',
                limit: 50,
                search_name: '',
                table_data: [],
                add_tenant_admin_data: {
                    email: '',
                    lastName: '',
                    firstName: '',
                    description: '',
                    sendActivationMail: false
                },
                update_tenant_admin_data: '',
                add_tenant_admin_rules: {
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {validator: email_verify, trigger: 'blur'}
                    ]
                },
                show_table_data: '',
                tenant_admin_info_drawer: false,
                add_tenant_admin_drawer: false,
                direction: 'rtl',
                button_type: '',
                status: "",
                update_mode: false,
                loading: false
            }
        },
        methods: {
            search_tenant_admin() {
                this.loading = true;
                let thi = this;
                let param = {"limit": this.limit, "search": thi.search_name, "id": this.tenant_id};
                search_tenant_admin(param).then((res)=>{
                    if(res.success){
                        thi.table_data = res.data;
                        this.add_tenant_admin_drawer = false;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                    }
                    this.loading = false
                })
            },
            info_tenant_admin(row) {
                this.direction = "rtl";
                this.tenant_admin_status(row);
                this.update_tenant_admin_data = row;
                this.button_type =  this.status ? "danger" : "success";
                let ati = row.additionalInfo;
                this.show_table_data = [{k: '邮箱', v: row.email}, {k: 'ID', v: row.id.id} , {k: '说明', v: (ati == null || ati === undefined) ? '' : row.additionalInfo.description}, {k: '姓', v: row.lastName}, {k: '名', v: row.firstName}];
                this.tenant_admin_info_drawer = true;
            },
            del_tenant_admin(id){
                this.$confirm('确定删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    del_tenant_admin({'tbUserId': id.id}).then(res=>{
                        if (res.success){
                            this.search_tenant_admin();
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
            add_tenant_admin(){
                this.$refs['add_tenant_admin_data'].validate((valid) => {
                    if (valid) {
                        add_tenant_admin({'email': this.add_tenant_admin_data.email, 'firstName': this.add_tenant_admin_data.firstName, 'lastName': this.add_tenant_admin_data.lastName, 'sendActivationMail': this.add_tenant_admin_data.sendActivationMail, 'tenantId': {'id': this.tenant_id, 'entityType': 'TENANT'}, 'authority': 'TENANT_ADMIN', 'additionalInfo': {'description' : this.add_tenant_admin_data.description}}).then((res)=>{
                            if (res.success){
                                this.search_tenant_admin()
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
            modify_tenant_admin_status(){
                modify_status({'userId': this.show_table_data[1].v, "status": this.status === false}).then((res)=>{
                    if (res.success){
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                        this.status = !this.status;
                        this.button_type =  this.status ? "danger" : "success";
                    }else {
                        this.$message({
                            type: 'info',
                            message: res.message
                        });
                    }
                })
            },
            tenant_admin_status(row){
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
                        let data = res.data;
                        this.$alert(data == null ? '用户已激活' : data, '激活链接', {
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
                this.$refs['update_tenant_admin_data'].validate((valid) => {
                    if (valid) {
                        update_tenant_admin(this.update_tenant_admin_data).then((res)=>{
                            if (res.success){
                                this.$message({
                                    type: 'info',
                                    message: res.message
                                });
                                let data = res.data;
                                let ati = data.additionalInfo
                                this.update_tenant_admin_data = data;
                                this.show_table_data = [{k: '邮箱', v: data.email}, {k: 'ID', v: data.id.id} , {k: '说明', v: (ati == null || ati === undefined) ? '' : data.additionalInfo.description}, {k: '姓', v: data.lastName}, {k: '名', v: data.firstName}];
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
            let number = url.indexOf("userId=");
            if (number < 1) {
                this.$message({
                    type: 'warning',
                    message: '没有获取到您的查询客户ID'
                });
                return;
            }
            this.tenant_id = url.substr(number + 7);
            this.search_tenant_admin()
        }
    }
</script>

<style scoped>

</style>