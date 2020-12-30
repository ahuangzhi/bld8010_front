import request from '@/utils/request'
const prefix = "block/";

export function searchTableMoneyData (data) {
  return request({
    url: prefix + 'searchTableMoneyData.json?pageSize=' + data.pageSize + '&search=' + data.search +
      '&pageNum=' + data.pageNum,
    method: 'get'
  })
}