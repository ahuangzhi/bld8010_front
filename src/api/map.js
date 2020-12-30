import request from '@/utils/request'

const prefix = "block/";

export function search_map(chipId) {
    return request({
        url: prefix + (chipId ? 'searchDeviceGps.json?chipId=' + chipId : 'searchDeviceGps.json'),
        method: 'get'
    })
}

export function update_map(data) {
    return request({
        url: prefix + 'updateDeviceGps.json',
        method: 'post',
        data
    })
}
