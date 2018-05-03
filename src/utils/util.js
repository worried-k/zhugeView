let util = {
  type (obj) {
    return Object.prototype.toString.call(obj)
  },
  isObject (obj) {
    return this.type(obj) === '[object Object]'
  },
  isArray (obj) {
    return this.type(obj) === '[object Array]'
  },
  isString (obj) {
    return this.type(obj) === '[object String]'
  },
  isNumber (obj) {
    return this.type(obj) === '[object Number]'
  },
  isDate (obj) {
    return this.type(obj) === '[object Date]'
  },
  isFunction (obj) {
    return this.type(obj) === '[object Function]'
  },
  equal (a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
  },
  /**
   * 获取指定范围的随机数
   * @param min
   * @param max
   * @returns {*}
   */
  random (min, max) {
    return Math.round(Math.random() * (max - min)) + min
  },
  /**
   * 克隆对象
   * @param obj
   * @returns {*}
   */
  clone (obj) {
    if (this.isObject(obj)) {
      let result = {}
      for (let key in obj) {
        const prop = obj[key]
        result[key] = this.clone(prop)
      }
      return result
    } else if (this.isArray(obj)) {
      let result = []
      for (let i = 0; i < obj.length; i++) {
        const item = obj[i]
        result.push(this.clone(item))
      }
      return result
    } else {
      return obj
    }
  },
  mergeObject (defaults, option) {
    defaults = defaults || {}
    option = option || {}
    for (let prop in defaults) {
      if (this.isObject(defaults[prop])) {
        option[prop] = option[prop] ? option[prop] : {}
        this.mergeObject(defaults[prop], option[prop])
      } else if (this.isArray(defaults[prop])) {
        if (!option[prop] || option[prop] === []) {
          option[prop] = defaults[prop]
        } else {
          let i = 0
          let optLenght = option[prop].length
          let defaultLength = defaults[prop].length
          for (i; i < optLenght && i < defaultLength; i++) {
            option[prop][i] = this.mergeObject(defaults[prop][i], option[prop][i])
          }
        }
      } else {
        option[prop] = (option[prop] === null || option[prop] === undefined) ? defaults[prop] : option[prop]
      }
    }
    return option
  },
  /**
   * 将数字转为千分位分割格式
   * @param num
   * @returns {string}
   */
  toThousands (num) {
    let source = String(num).split('.') // 按小数点分成2部分
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,') // 只将整数部分进行都好分割
    return source.join('.') // 再将小数部分合并进来
  },
  getRegExp (str) {
    let keyWords = /\\|\^|\$|\*|\+|\?|\{|\}|\[|\]|\.|:|=|\||-|\/|<|!|\(|\)/
    let words = []
    str.split(/\s{0}/).forEach(code => {
      if (keyWords.test(code)) {
        words.push(`\\${code}`)
      } else {
        words.push(code)
      }
    })
    return new RegExp(words.join(''))
  },
  /**
   * 区分中英文截取字符串长度
   * @param str
   * @param config
   * @returns {{str: string, len: number}}
   */
  splitString (str, config = {
    maxLength: 20,
    replaceStr: '...'
  }) {
    let resString = ''
    let len = 0
    let reg = new RegExp(/[^\x00-\xff]/)
    let isOverflow = false
    for (let i = 0; i < str.length; i++) {
      let char = str.charAt(i)
      len += (reg.test(char) ? 2 : 1)
      if (len <= config.maxLength) {
        resString += char
      } else {
        isOverflow = true
      }
    }
    return {
      str: isOverflow ? (resString + config.replaceStr) : resString,
      len: len
    }
  },
  /**
   * 从中间拆分字符串,长度超出的话，解析为xxx...xxx
   * @param str
   * @param config
   * @returns {string}
   */
  strMiddleSplit (str, config = {
    maxLength: 20,
    begenLength: 8,
    endLength: 8,
    replaceStr: '...'
  }) {
    str += ''
    let reg = {
      fullCharReg: /[^\x00-\xff]/,
      fullCharsReg: /[^\x00-\xff]/g,
      anyChars: /[\S\s]{1}/g
    }

    let fullCharLength = (str.match(reg.fullCharsReg) || []).length
    let fullLength = str.length + fullCharLength
    let beginArr = []
    let beginLength = 0
    let endArr = []
    let endLength = 0

    if (fullLength > config.maxLength) {
      let strArr = str.match(reg.anyChars)

      strArr.forEach(char => {
        if (beginLength >= config.begenLength) return
        let len = reg.fullCharReg.test(char) ? 2 : 1
        beginLength += len
        beginArr.push(char)
      })

      strArr.reverse().forEach(char => {
        if (endLength >= config.endLength) return
        let len = reg.fullCharReg.test(char) ? 2 : 1
        endLength += len
        endArr.push(char)
      })

      return beginArr.join('') + config.replaceStr + endArr.reverse().join('')
    }

    return str
  }
}

export default util
