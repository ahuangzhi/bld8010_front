import request from '@/utils/request'

const prefix = 'assetsManage/';

export function add_asset(data) {
    return request({
        url: prefix + 'addAsset.json',
        method: 'post',
        data
    })
}

export function del_asset(data) {
    return request({
        url: prefix + 'delAsset.json',
        method: 'post',
        data
    })
}

export function update_asset(data) {
    return request({
        url: prefix + 'updateAsset.json',
        method: 'post',
        data
    })
}

export function search_asset(data) {
    return request({
        url: prefix + 'assetsList.json',
        method: 'post',
        data
    })
}

export function public_asset(data) {
    return request({
        url: prefix + 'publicAsset.json',
        method: 'post',
        data
    })
}

export function dis_asset(data) {
    return request({
        url: prefix + 'distributionAssets.json',
        method: 'post',
        data
    })
}

export function delDis_asset(data) {
    return request({
        url: prefix + 'delDistribution.json',
        method: 'post',
        data
    })
}

export function asset_types(data) {
    return request({
        url: prefix + 'getAssetsTypes.json',
        method: 'get',
        data
    })
}
