<!--  -->
<template>
<div style="padding: 20px;height: 80%;">
  <el-form :inline="true" :model="tableData" class="demo-form-inline">
    <el-form-item label="">
      <el-select v-model="tableData.selectData" placeholder="设备名称">
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="del">删除</el-button>
    </el-form-item>
    <el-form-item :label-position="labelPosition">
      <el-button type="primary" @click="add">新增</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData.data" height="750" border style="width: 100%" @selection-change="changeFun">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="sectionalName" label="设备名称" width="180" align="center">
    </el-table-column>
    <el-table-column prop="name" label="时段类型" width="180" align="center">
    </el-table-column>
    <el-table-column prop="timeSectional" label="时段区间" width="480" align="center">
    </el-table-column>
    <el-table-column prop="price" label="每度电价格" align="center">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150" align="center">
      <template slot-scope="scope">
        <el-button @click="updateClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.tableData.pageNum" :page-sizes="[10,20,30,50,100]" :page-size="this.tableData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.total">
  </el-pagination>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  searchTableData,
  deleteOperation
} from "./basics_sectional_tariff"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        data: [],
        selectData: []
      },
      ids: [],
      labelPosition: 'right',
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getData() {
      searchTableData(this.tableData.pageNum, this.tableData.pageSize).then(res => {
        console.log(res);
        if (res.success) {
          this.tableData.data = res.data;
        }
      })

    },
    query() {
      console.log(1);
    },
    updateClick(row) {
      console.log("这是修改");

    },
    deleteClick(row) {
      let ids = [];
      ids.push(row.id);
      deleteOperation(ids).then(res => {
        if (res.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getData();
        }
      });
    },
    add() {
      console.log("这是新增");
    },
    del() {
      if (this.ids <= 0) {
        this.$message({
          message: '请选择至少一项进行删除',
          type: 'error'
        });
      } else {
        deleteOperation(this.ids).then(res => {
          if (res.success) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getData();
          }
        });
      }

    },
    changeFun(val) {
      let idsCopy = [];
      val.forEach((item) => {
        idsCopy.push(item.id)
      })
      this.ids = idsCopy
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style scoped>
</style>
