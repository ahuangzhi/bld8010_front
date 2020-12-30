import request from '@/utils/request'
const prefix = "besufile/";

export function selectbues(){
    return request({
        url: prefix + 'list',
        method: 'get'
    })
}