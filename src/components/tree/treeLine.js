import zrender from 'zrender'
import {util} from '../../utils'

export default class {
  constructor (options) {
    this._options = util.mergeObject({
      shape: {},
      text: '',
      direction: '',
      active: false
    }, options)

    this._style = {
      lineWidth: 1,
      stroke: '#dadada'
    }
    if (this._options.active) {
      this._style = {
        lineWidth: 3,
        stroke: '#f5bf49',
        color: '#333333'
      }
    }

    this._bezier = null
    this._lineText = null
    this._lineTextBackground = null
    this._init()
  }

  _init () {
    this._initTreeLine()
    if (this._options.text) {
      this._initText()
    }
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

  _initTreeLine () {
    this._bezier = new zrender.BezierCurve({
      shape: this._options.shape,
      style: this._style,
      cursor: 'default'
    })
  }

  _initText () {
    let shape = this._options.shape
    let direction = this._options.direction
    let x = 0
    let y = 0
    switch (direction) {
      case 'top-bottom':
        x = shape.x2 - 15
        y = shape.y2 - 23
        break
      case 'bottom-top':
        x = shape.x2 - 15
        y = shape.y2 + 3
        break
      case 'left-right':
        x = shape.x2 - 35
        y = shape.y2 - 10
        break
      case 'right-left':
        x = shape.x2 + 5
        y = shape.y2 - 10
        break
    }

    this._lineTextBackground = new zrender.Rect({
      shape: {
        width: 30,
        height: 20,
        x: x,
        y: y
      },
      style: {
        fill: '#ffffff'
      },
      cursor: 'default'
    })
    this._lineText = new zrender.Text({
      style: {
        x: x,
        y: y,
        text: this._options.text,
        textFill: '#858585',
        textFont: '14px sans-serif',
        textBaseline: 'top'
      },
      cursor: 'default',
      z: 1
    })
    this._makeGrahpCenter(this._lineText, this._lineTextBackground)
  }

  addTo (zr) {
    if (zr && zr.add) {
      zr.add(this._bezier)
      if (this._lineTextBackground && this._lineText) {
        zr.add(this._lineTextBackground)
        zr.add(this._lineText)
      }
    }
  }
}
