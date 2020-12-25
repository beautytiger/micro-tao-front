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
        prop="productId"
        label="商品ID"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="productPrice"
        label="购买价格"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createAt"
        label="购买时间"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOrderList } from "@/api/order";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "danger",
        2: "gray",
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
      getOrderList().then((response) => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

  handleBuy(id) {
    this.$confirm("确认购买此商品吗？", "消息：", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        // 发送购买请求
        addFromCart(id).then((response) => {
          // 处理响应结果提示
          this.$message({
            type: response.status === 200 ? "success" : "error",
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

  handleDelete(id) {
    this.$confirm("确认从购物车删除此商品吗？", "消息：", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        // 发送购买请求
        cartDeleteItem(id).then((response) => {
          // 处理响应结果提示
          this.$message({
            type: response.status === 200 ? "success" : "error",
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