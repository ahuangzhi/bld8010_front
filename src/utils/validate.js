// 邮箱
const emailReg = new RegExp("^([a-zA-Z0-9_.\\-])+@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$");

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} v
 * @returns {Boolean}
 */
export function validUsername(v) {
  return v.length < 1 ? '请输入用户名' : emailReg.test(v) ? null : '用户名错误'
}
