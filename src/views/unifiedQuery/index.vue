<!--统一查询-->
<template>
  <div class="unifiedQuery">
    <el-form :inline="true" :model="tablePageReturnMoneyData" class="demo-form-inline">
      <el-row>
        <el-col :span="8"><el-input v-model="tablePageReturnMoneyData.search" placeholder="设备名称 | 钱包地址 | 设备token | 交易hash" style="padding-right:20px" /></el-col>
        <el-col :span="2"><el-button round type="primary" @click="onSubmit">统一查询</el-button></el-col>
      </el-row>
    </el-form>
    <el-table :data="tableMoneyData" style="width: 100%">
      <el-table-column label="设备名称" prop="chipId" />
      <el-table-column label="钱包地址" prop="deviceWallet" />
      <el-table-column label="设备token" prop="deviceToken" />
      <el-table-column label="交易hash" prop="hash" />
    </el-table>
    <el-pagination
      :page-sizes="[10, 20, 50, 100, 200]"
      :page-size="tablePageReturnMoneyData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tablePageReturnMoneyData.total"
      :current-page="tablePageReturnMoneyData.pageNum"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { searchTableMoneyData } from './hzTraceability';
export default {
  name: 'unifiedQuery',
  data() {
    return {
      tablePageReturnMoneyData: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        search: ''
      },
      tableMoneyData: []
    };
  },
  mounted() {
    this.searchTableMoneyData();
  },
  methods: {
    searchTableMoneyData() {
      this.loading = true;
      searchTableMoneyData(this.tablePageReturnMoneyData)
        .then(res => {
          if (res.success) {
            this.tableMoneyData = res.data;
            this.tablePageReturnMoneyData.total = res.total;
          } else {
            this.$message({
              type: 'info',
              message: res.message
            });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.tablePageReturnMoneyData.pageSize = 10;
      this.tablePageReturnMoneyData.pageNum = 1;
      this.searchTableMoneyData();
    },
    handleSizeChange(val) {
      this.tablePageReturnMoneyData.pageSize = val;
      this.searchTableMoneyData();
    },
    handleCurrentChange(val) {
      this.tablePageReturnMoneyData.pageNum = val;
      this.searchTableMoneyData();
    }
  }
};
</script>

<style lang="scss" scoped>
.unifiedQuery {
  padding: 10px;
}
</style>
