/**
 * @Author: Jim Rae
 * @Date: 2019-10-23
 * @Last Modified by: Jim Rae
 * @Last Modified time: 2019-10-23
 * @Desc 常用工具库
 */

var toString = Object.prototype.toString;

/**
 * 判断一个值是否为Array
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isArray(val: any) {
  return toString.call(val) === '[object Array]';
}

/**
 * 判断一个值是否为ArrayBuffer
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isArrayBuffer(val: any) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * 判断一个值是否为FormData
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isFormData(val: any) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * 判断一个值是否为ArrayBufferView
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isArrayBufferView(val: any) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * 判断一个值是否为String
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isString(val: any) {
  return typeof val === 'string';
}

/**
 * 判断一个值是否为Number
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isNumber(val: any) {
  return typeof val === 'number';
}

/**
 * 判断一个值是否为Undefined
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isUndefined(val: any) {
  return typeof val === 'undefined';
}

/**
 * 判断一个值是否为Object
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isObject(val: any) {
  return val !== null && typeof val === 'object';
}

/**
 * 判断一个值是否为数组
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isDate(val: any) {
  return toString.call(val) === '[object Date]';
}

/**
 * 判断一个值是否为数组
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isFile(val: any) {
  return toString.call(val) === '[object File]';
}

/**
 * 判断一个值是否为Blob
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isBlob(val: any) {
  return toString.call(val) === '[object Blob]';
}

/**
 * 判断一个值是否为Function
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isFunction(val: any) {
  return toString.call(val) === '[object Function]';
}

/**
 * 判断一个值是否为Stream
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isStream(val: any) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * 判断一个值是否为URLSearchParams
 *
 * @param {Object} val 被判断的值
 * @returns {boolean}
 */
function isURLSearchParams(val: any) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * 判断是否为最多保留两位小数的金额格式
 *
 * @param {string} val 要校验的值
 * @param {boolean}
 */
function checkPriceFormat (val: string) {
  const reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/
  return reg.test(val)
}

/**
 * 校验手机号
 *
 * @param {string} mobile 要校验的值
 * @param {boolean}
 */
function checkMobileFormat (mobile: string) {
  const reg = /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
  return reg.test(mobile)
}

export {
  isArray,
  isArrayBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  checkPriceFormat,
  checkMobileFormat
}
