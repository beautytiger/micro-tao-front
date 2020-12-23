<template>
  <div class="app-container">
    <!-- stripe 带斑马纹 -->
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="productName"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="productPrice"
        label="价格"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="productSales"
        label="销量"
      ></el-table-column>
      <el-table-column align="center" prop="productStatus" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.productStatus | statusFilter">
            {{ scope.row.productStatus ? "已下架" : "正常" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleAddCart(scope.row.id)"
            size="mini"
            >加入购物车</el-button
          >
          <el-button type="danger" @click="handleBuy(scope.row.id)" size="mini"
            >直接购买</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/product";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "gray",
        2: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList({ token: "abc" }).then((response) => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

  handleAddCart(id) {
    // 通过id查询详情
    api.getById(id).then((response) => {
      if (response.code === 20000) {
        // 将查询的详情传递
        this.edit.formData = response.data;
        this.edit.title = "编辑";
        this.edit.visible = true;
      }
    });
  },

  handleBuy(id) {
    this.$confirm("确认删除这条记录吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        // 发送删除请求
        api.deleteById(id).then((response) => {
          // 处理响应结果提示
          this.$message({
            type: response.code === 20000 ? "success" : "error",
            message: response.message,
          });
        });
        // 刷新列表数据
        this.fetchData();
      })
      .catch(() => {
        // 取消删除，不用理会
      });
  },
},
};
</script>