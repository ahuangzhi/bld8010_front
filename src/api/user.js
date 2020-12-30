import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/system/user/getCurrentUserInfo.json',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout.json',
    method: 'get'
  })
}

export function modify_password(data) {
  return request({
    url: '/system/user/modifyPassword.json',
    method: 'post',
    data
  })
}
