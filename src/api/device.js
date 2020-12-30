import request from '@/utils/request'

const urlPrefix = 'device/';

export function add_device(data) {
    return request({
        url: urlPrefix + 'addDevice.json',
        method: 'post',
        data
    })
}

export function del_device(data) {
    return request({
        url: urlPrefix + 'delDevice.json',
        method: 'post',
        data
    })
}

export function update_device(data) {
    return request({
        url: urlPrefix + 'updateDevice.json',
        method: 'post',
        data
    })
}

export function search_device(data) {
    return request({
        url: urlPrefix + 'searchDeviceList.json',
        method: 'post',
        data
    })
}

export function device_types() {
    return request({
        url: urlPrefix + 'getDeviceTypes.json',
        method: 'get'
    })
}

export function device_token(id) {
    return request({
        url: urlPrefix + '/getDeviceToken.json?deviceId=' + id,
        method: 'get'
    })
}

export function public_device(data) {
    return request({
        url: urlPrefix + 'publicDevice.json',
        method: 'post',
        data
    })
}

export function dis_device(data) {
    return request({
        url: urlPrefix + 'deviceDistribution.json',
        method: 'post',
        data
    })
}

export function del_dis_device(data) {
    return request({
        url: urlPrefix + 'delDeviceDistribution.json',
        method: 'post',
        data
    })
}

export function add_device_attributes(data) {
    return request({
        url: urlPrefix + 'addDeviceAttribute.json',
        method: 'post',
        data
    })
}

export function add_device_attributes_list(data) {
    return request({
        url: urlPrefix + 'addDeviceAttributeList.json',
        method: 'post',
        data
    })
}

export function del_device_attributes(data) {
    return request({
        url: urlPrefix + 'delDeviceAttributes.json',
        method: 'post',
        data
    })
}

export function device_attributes(socketId, attributeType) {
    return request({
        url: urlPrefix + 'attributes.json?id=' + socketId + '&type=' + attributeType,
        method: 'get'
    })
}

export function device_telemetry(keys, deviceId) {
    return request({
        url: '/telemetry/getTelemetrys.json?keys=' + keys + '&deviceId=' + deviceId,
        method: 'get'
    })
}

export function searchMaintain(data) {
    return request({
        url: urlPrefix + 'searchMaintain.json?pageSize=' + data.pageSize + '&pageNum=' + data.pageNum + (data.search ? '&search=' + data.search : ''),
        method: 'get'
    })
}
