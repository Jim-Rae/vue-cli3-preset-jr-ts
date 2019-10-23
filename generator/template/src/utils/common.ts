/**
 * @Author: Jim Rae
 * @Date: 2019-09-16
 * @Last Modified by: Jim Rae
 * @Last Modified time: 2019-10-23
 * @Desc 常用工具库
 */

import { isArray } from './validator'

/**
 * 计算浏览器默认滚动条宽度
 * @method computeScrollBarWidth
 * @return {Number} 浏览器默认滚动条宽度
 */
const computeScrollBarWidth = (): number => {
  // 创建一个div来计算浏览器默认滚动条宽度
  const box = document.createElement('div')
  box.style.width = '100px'
  box.style.visibility = 'hidden'
  box.style.position = 'absolute'
  box.style.top = '-9999px'
  box.style.overflow = 'scroll'
  document.body.appendChild(box)
  // 在box没有border的情况下，box.offsetWidth和box.clientWidth的差值就是滚动条宽度
  const scrollBarWidth = box.offsetWidth - box.clientWidth
  box.parentNode!.removeChild(box)

  return scrollBarWidth
}

/**
 * 快速深拷贝
 * @method fastCopy
 * @param {Object} obj 需要拷贝的对象
 * @param {Array<String>} keysArr 过滤要拷贝的字段
 */
const fastCopy = (obj: object, keysArr?: Array<string>) => {
  const clone = window.JSON.parse(window.JSON.stringify(obj))
  if (!keysArr) {
    return clone
  }

  const result: { [propName: string]: any } = {}
  keysArr.forEach(key => {
    result[key] = clone[key]
  })
  return result
}

/**
 * 去除字符串前后的空格
 *
 * @param {String} str 需要操作的字符串
 * @returns {String}
 */
function trim(str: string) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * 遍历一个数组或者一个对象里的所有项去执行某个函数
 *
 * @param {Object|Array} obj 要遍历的数组或者对象
 * @param {Function} fn 每个项需要调用的函数
 */
function forEach (obj: any, fn: Function) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * 深合并多个对象
 *
 * @method deepMerge
 * @param {Object} obj1 需要合并的对象
 * @returns {Object} 合并后的对象
 */
function deepMerge(...params: any[]) {
  var result: any = {};
  function assignValue(val: any, key: string | number) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = params.length; i < l; i++) {
    forEach(params[i], assignValue);
  }
  return result;
}

/**
 * Date实例转化为YYYY-MM-DD格式，可配置分隔符
 *
 * @method dateToString
 * @param {Date} dateInstance Date实例
 * @param {String} seperator 分隔符
 * @returns {String} 当天日期YYYY-MM-DD
 */
function dateToString (dateInstance: Date, seperator: string = '-') {
  const year: number = dateInstance.getFullYear()
  const month: number = dateInstance.getMonth() + 1
  const date: number = dateInstance.getDate()
  let yearStr: string = year.toString()
  let monthStr: string = ''
  let dateStr: string = ''
  if (month >= 1 && month <= 9) {
    monthStr = '0' + month;
  }
  if (date >= 0 && date <= 9) {
    dateStr = '0' + date;
  }
  const currentdate: string = yearStr + seperator + monthStr + seperator + dateStr;
  return currentdate;
}

/**
 * Date实例转化为YYYY-MM-DD格式，可配置分隔符
 *
 * @method getWeekNameFromDate
 * @param {Date} date Date实例
 * @param {String} prefix 前缀
 * @returns {String} 周几
 */
function getWeekNameFromDate (date: Date, prefix: string = '周') {
  return prefix + '日一二三四五六'.charAt(date.getDay())
}

export {
  computeScrollBarWidth,
  fastCopy,
  trim,
  forEach,
  deepMerge,
  dateToString,
  getWeekNameFromDate
}
