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
            @click="handleAddCart(scope.row.pid)"
            size="mini"
            >加入购物车</el-button
          >
          <el-button type="danger" @click="handleBuy(scope.row.pid)" size="mini"
            >直接购买</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/product";
import { addCart } from "@/api/cart";
import { addOrder } from "@/api/order";
import { getToken } from '@/utils/auth' // get token from cookie

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
    console.log(id)
    const hasToken = getToken()
    if (!hasToken) {
        this.$router.push('/login');
        return
    }
    addCart(id).then((response) => {
      if (response.status === 200) {
        this.$confirm("添加购物车成功", "消息：", {
        confirmButtonText: "去购物车",
        cancelButtonText: "继续逛逛",
        type: "success",
        }).then(() => {
        this.$router.push('/user/cart');
      }).catch(() => {});
      } else {
        this.$confirm("添加购物车失败", "消息：", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        })
      }
    });
  },

  handleBuy(id) {
    const hasToken = getToken()
    if (!hasToken) {
        this.$router.push('/login');
        return
    }
    this.$confirm("确认购买此商品吗？", "消息：", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
        // 发送购买请求
        addOrder(id).then((response) => {
          // 处理响应结果提示
      if (response.status === 200) {
        this.$confirm("支付并购买成功", "消息：", {
        confirmButtonText: "查看订单",
        cancelButtonText: "继续逛逛",
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
        this.fetchData();
      });
  },
},
};
</script>