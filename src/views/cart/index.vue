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
        prop="createAt"
        label="添加时间"
      ></el-table-column>
      <el-table-column align="center" prop="productStatus" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status == 0 ? "可购买" : scope.row.status == 1 ? "已删除" : "已购买" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="handleBuy(scope.row.id)"
            size="mini"
            >购买</el-button
          >
          <el-button type="danger" @click="handleDelete(scope.row.id)" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addCart, getCartList, cartDeleteItem } from "@/api/cart";
import { addFromCart } from "@/api/order";

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
      getCartList().then((response) => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

  handleBuy(id) {
    this.$confirm("确认购买此商品吗？", "消息：", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
        // 发送购买请求
        addFromCart(id).then((response) => {
          // 处理响应结果提示
      if (response.status === 200) {
        this.$confirm("支付并购买成功", "消息：", {
        confirmButtonText: "查看订单",
        cancelButtonText: "留在购物车",
        type: "success",
        }).then(() => {
        this.$router.push('/user/order');
      }).catch(() => {});
      } else {
        this.$confirm("购买失败", "消息：", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        })
      }
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
      if (response.status === 200) {
        this.$confirm("删除成功", "消息：", {
        confirmButtonText: "去商城逛逛",
        cancelButtonText: "留在购物车",
        type: "success",
        }).then(() => {
        this.$router.push('/tao');
      }).catch(() => {});
      } else {
        this.$confirm("添加购物车失败", "消息：", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        })
      }
        });
        // 刷新列表数据
        this.fetchData();
      })
      .catch(() => {
        // 取消删除，不用理会
        this.fetchData();
      });
  },
},
};
</script>