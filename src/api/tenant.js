import request from '@/utils/request'

const prefix = 'tenant/';

export function add_tenant(data) {
    return request({
        url: prefix + 'addTenant.json',
        method: 'post',
        data
    })
}

export function del_tenant(data) {
    return request({
        url: prefix + 'delTenant.json',
        method: 'post',
        data
    })
}

export function update_tenant(data) {
    return request({
        url: prefix + 'updateTenant.json',
        method: 'post',
        data
    })
}

export function search_tenant(data) {
    return request({
        url: prefix + 'getTenantList.json',
        method: 'post',
        data
    })
}
