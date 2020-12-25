import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/v1/product/',
    method: 'get',
    params
  })
}
