import request from '@/utils/request'

const prefix = 'customer/';

export function search_client(data) {
    return request({
        url: prefix + 'selectCustomer.json',
        method: 'post',
        data
    })
}

export function search_client_ids(ids) {
    return request({
        url: prefix + 'getCustomerName.json?ids=' + ids,
        method: 'get'
    })
}

export function del_client(data) {
    return request({
        url: prefix + 'deleteCustomer.json',
        method: 'post',
        data
    })
}

export function add_client(data) {
    return request({
        url: prefix + 'addCustomer.json',
        method: 'post',
        data
    })
}

export function update_client(data) {
    return request({
        url: prefix + 'updateCustomer.json',
        method: 'post',
        data
    })
}

export function get_attributes(id, search) {
    return request({
        url: prefix + ('getCustomerAttributes.json?customerId=' + (id ?  id : '')) + '&search=' + (search ? search : ''),
        method: 'get'
    })
}

export function update_attributes(data) {
    return request({
        url: prefix + 'updateCustomerAttributes.json',
        method: 'post',
        data
    })
}

export function device_collect(id) {
    return request({
        url: prefix + 'blockCollect.json' + (id ? '?id=' + id : ''),
        method: 'get'
    })
}