import request from '@/utils/request'

export function addOrder(productId) {
    var data = new Object();
    data.productId = productId;
    return request({
    url: '/api/v1/order/',
    method: 'post',
    data
    });
}

export function addFromCart(cartId) {
    var data = new Object();
    data.id = cartId;
    return request({
    url: '/api/v1/order/fromcart',
    method: 'post',
    data
    });
}

export function getOrderList() {
    return request({
    url: '/api/v1/order/',
    method: 'get'
    });
}
