import request from "@/utils/request";

export function addCart(productId) {
  var data = new Object();
  data.productId = productId;
  return request({
    url: "/api/v1/cart/",
    method: "post",
    data
  });
}

export function getCartList() {
  return request({
    url: "/api/v1/cart/",
    method: "get"
  });
}

export function cartDeleteItem(cartId) {
  return request({
    url: "/api/v1/cart/" + cartId,
    method: "delete"
  });
}
