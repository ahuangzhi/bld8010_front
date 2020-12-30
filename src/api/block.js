import request from '@/utils/request'

const prefix = "block/";

export function search_block (data) {
  return request({
    url: prefix + 'searchBlock.json?limit=' + data.pageSize + '&search=' + data.search + '&pageNum=' + data.pageNum,
    method: 'get'
  })
}

export function search_block_hash (chipId, pageNum, pageSize) {
  return request({
    url: prefix + 'searchBlockHash.json?pageSize=' + pageSize + '&chipId=' + chipId + '&pageNum=' + pageNum,
    method: 'get'
  })
}

export function block_hash_info (hash) {
  return request({
    url: prefix + 'blockHashInfo.json?hash=' + hash,
    method: 'get'
  })
}

export function block_info (blockNum) {
  return request({
    url: prefix + 'getBlockInfo.json?blockNum=' + blockNum,
    method: 'get'
  })
}