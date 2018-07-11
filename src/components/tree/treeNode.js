import zrender from 'zrender'
import {util} from '../../utils'

const backgroundColors = ['#FFCEA3', '#FAE692', '#C0F5A2', '#78EBA8', '#8CEBDB', '#9EE0FF', '#C4C2FF', '#ECB4F4', '#FFA3D1', '#FEB1B1',
  '#FFAEAB', '#F0C673', '#74D681', '#85D6B8', '#8BB6E0', '#7E9BE0', '#AA8BE0', '#EB88D7', '#F08BA9', '#E87984']

const textColor = ['#333333', '#858585']

const defaultColor = {
  fill: '#ffffff',
  stroke: '#dadada'
}
const disabledStyle = {
  fill: '#fafafa',
  stroke: '#dadada'
}
export default class {
  constructor (options) {
    this._options = util.mergeObject({
      name: '',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      index: 0,
      silence: false, // 静默状态：不响应点击事件
      defaultActive: false,
      data: {},
      onMouseout: () => {},
      onMouseover: () => {},
      onClick: () => {}
    }, options)

    this._treeNode = null
    this._text = null
    this._active = !!this._options.defaultActive
    this._activeColor = this._getColor()

    this._init()
  }

  _init () {
    this._initTreeNode()
    this._initTitle()
    if (this._active) {
      this._onClick()
    }
  }

  _resetStyle () {
    if (this._active) {
      return
    }
    this._treeNode.setStyle({
      stroke: defaultColor.stroke,
      fill: defaultColor.fill
    })
    this._text.setStyle({
      fill: textColor[0]
    })
  }

  _activeStyle () {
    this._treeNode.setStyle({
      stroke: this._activeColor,
      fill: this._activeColor
    })
    this._text.setStyle({
      fill: textColor[1]
    })
  }

  _onMouseout () {
    this._resetStyle()
    if (util.isFunction(this._options.onMouseout)) {
      this._options.onMouseout()
    }
  }

  _onMouseover () {
    if (this._options.silence) return
    this._activeStyle()
    if (util.isFunction(this._options.onMouseover)) {
      this._options.onMouseover(this.getPosition(), this._options.name)
    }
  }

  _onClick (event) {
    if (event && this._active) return
    this._active = true
    this._activeStyle()
    if (util.isFunction(this._options.onClick)) {
      this._options.onClick({
        ...this.getPosition(),
        index: this._options.index,
        data: this._options.data,
        event: event
      })
    }
  }

  _getColor () {
    let maxLen = backgroundColors.length
    let index = this._options.index
    return backgroundColors[maxLen > index ? index : index % maxLen]
  }

  /**
   * 设置innerGraph相对于outerGraph居中
   * @param inner
   * @param outer
   * @private
   */
  _makeGrahpCenter (inner, outer) {
    const innerShape = inner.getBoundingRect()
    const outerShape = outer.getBoundingRect()
    const position = {
      x: (outerShape.width - innerShape.width) / 2 + outerShape.x,
      y: (outerShape.height - innerShape.height) / 2 + outerShape.y
    }

    inner.setStyle({
      x: position.x,
      y: position.y
    })
  }

  _initTreeNode () {
    let colorObj = this._options.silence ? disabledStyle : defaultColor
    this._treeNode = new zrender.Rect({
      shape: this.getPosition(),
      style: {
        stroke: colorObj.stroke,
        fill: colorObj.fill
      },
      cursor: this._options.silence ? 'default' : 'pointer'
    })
    if (!this._options.silence) {
      this._treeNode.on('click', this._onClick, this)
    }
    this._treeNode.on('mouseover', this._onMouseover, this)
    this._treeNode.on('mouseout', this._onMouseout, this)
  }

  _initTitle () {
    const textLength = Math.floor((this._options.width + 30) / 14)
    this._text = new zrender.Text({
      style: {
        text: util.strMiddleSplit(this._options.name, {
          maxLength: textLength,
          beginLength: (textLength / 2) - 1,
          endLength: (textLength / 2) - 1,
          replaceStr: '...'
        }),
        textFill: this._options.silence ? textColor[1] : textColor[0],
        textFont: '14px sans-serif',
        textBaseline: 'top'
      },
      cursor: this._options.silence ? 'default' : 'pointer',
      z: 1
    })
    this._makeGrahpCenter(this._text, this._treeNode)
    if (!this._options.silence) {
      this._text.on('click', this._onClick, this)
    }
    this._text.on('mouseover', this._onMouseover, this)
  }

  addTo (zr) {
    if (zr && zr.add) {
      zr.add(this._treeNode)
      zr.add(this._text)
    }
  }

  getPosition () {
    return {
      width: this._options.width,
      height: this._options.height,
      x: this._options.x,
      y: this._options.y,
      paddingTop: this._options.paddingTop,
      paddingRight: this._options.paddingRight,
      paddingBottom: this._options.paddingBottom,
      paddingLeft: this._options.paddingLeft
    }
  }

  reset () {
    this._active = !!this._options.defaultActive
    this._resetStyle()
  }

  triggerClick () {
    this._treeNode.trigger('click')
  }
}
