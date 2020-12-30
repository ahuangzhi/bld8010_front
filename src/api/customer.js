import request from '@/utils/request'

let prefix = 'system/user/';

export function add_customer(data) {
    return request({
        url: prefix + 'addUserInfo.json',
        method: 'post',
        data
    })
}

export function del_customer(data) {
    return request({
        url: prefix + 'deleteUserInfo.json',
        method: 'post',
        data
    })
}

export function update_customer(data) {
    return request({
        url: prefix + 'updateUserInfo.json',
        method: 'post',
        data
    })
}

export function modify_status(data) {
    return request({
        url: prefix + 'modifyUserStatus.json',
        method: 'post',
        data
    })
}

export function search_customer(data) {
    return request({
        url: prefix + 'getUserListByCustomerId.json',
        method: 'post',
        data
    })
}

export function activation_url(id) {
    return request({
        url: prefix + 'getUrl.json?userId=' + id,
        method: 'get'
    })
}
