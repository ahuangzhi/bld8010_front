import request from '@/utils/request'
const prefix = "hzBasics/";

export function searchTableData (pageNum, pageSize) {
  return request({
    url: prefix + 'searchTableData.json?pageSize=' + pageSize + '&pageNum=' + pageNum,
    method: 'get'
  })
}

export function deleteOperation (ids) {
  return request({
    url: prefix + 'deleteOperation.json?ids=' + ids,
    method: 'post'
  })
}