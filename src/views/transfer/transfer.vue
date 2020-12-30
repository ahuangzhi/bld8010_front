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
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-main>
    <!--用户列表-->
    <el-table :data="table_data" style="width: 100%">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="钱包地址" prop="wallet" min-width="150"></el-table-column>
      <el-table-column label="钱包余额" prop="balance"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="round_button" slot="reference" @click="update_wallet_button(scope.row, scope.$index)" title="修改钱包" v-if="!isCustomer">
            <svg-icon icon-class="update" />
          </el-button>
          <el-button class="round_button" @click="device_collect(scope.row.id)" title="归结资金">
            <svg-icon icon-class="collect" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>

  <!--修改客户钱包地址-->
  <el-dialog :visible.sync="update_dialog">
    <el-form ref="attribute_from" :model="update_form" label-width="80px">
      <el-form-item label="钱包地址">
        <el-input v-model="update_form.wallet"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update_wallet()">立即修改</el-button>
        <el-button @click="update_maintain_dialog = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</el-container>
</template>

<script>
import {
  get_attributes,
  update_attributes,
  device_collect
} from "@/api/client"

export default {
  name: "transfer",
  data() {
    return {
      customerId: '',
      search: {
        limit: 50,
        search: '',
        id: ''
      },
      table_data: [],
      loading: false,
      update_form: {
        wallet: '',
        id: '',
        attribute: '',
        index: 0
      },
      update_dialog: false,
      isCustomer: false
    }
  },
  methods: {
    search_user() {
      this.loading = true;
      get_attributes(this.search.id, this.search.search).then((res) => {
        //console.log(res);
        if (res.success) {
          this.table_data = res.data;
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    update_wallet_button(row, index) {
      this.update_dialog = true
      this.update_form.id = row.id
      this.update_form.wallet = row.wallet
      this.update_form.index = index
    },
    update_wallet() {
      this.update_form.attribute = "{\"wallet\": \"" + this.update_form.wallet + "\"}"
      update_attributes(this.update_form).then(res => {
        if (res.success) {
          //console.log(this.table_data, this.table_data[this.update_form.index], this.update_form.index)
          this.table_data[this.update_form.index].wallet = this.update_form.wallet
          this.update_dialog = false
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      })
    },
    device_collect(id) {
      this.$confirm('确定要进行设备的资金归集，低于手续费的设备资金将不会进行归集, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        this.$message({
          type: 'info',
          message: "正在归集，请稍后"
        });
        device_collect(id).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: "归集成功"
            });
            this.search_user()
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  created() {
    let user = this.$store.state.user.user;
    let role = user.authority;
    if (role === 'CUSTOMER_USER') {
      this.isCustomer = true;
    }
    this.search_user()
  }
}
</script>

<style scoped>
.svg-icon {
  width: 0.4rem;
  height: 0.48rem;
}
</style>
