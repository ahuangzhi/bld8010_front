import request from '@/utils/request'

const prefix = 'tenantAdmin/';

export function add_tenant_admin(data) {
    return request({
        url: prefix + 'addTenantAdmin.json',
        method: 'post',
        data
    })
}

export function del_tenant_admin(data) {
    return request({
        url: prefix + 'delTenantAdmin.json',
        method: 'post',
        data
    })
}

export function update_tenant_admin(data) {
    return request({
        url: prefix + 'updateTenantAdmin.json',
        method: 'post',
        data
    })
}

export function search_tenant_admin(data) {
    return request({
        url: prefix + 'getTenantAdminList.json',
        method: 'post',
        data
    })
}
