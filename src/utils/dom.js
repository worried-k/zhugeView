/**
 * Created by yqdong on 2017/10/12.
 * qq: 1013501639
 * @author yqdong
 *
 */
const on = function (dom, eventName, handle) {
  if (!dom || !eventName || !handle) return
  if (document.addEventListener) {
    dom.addEventListener(eventName, handle, false)
  } else {
    dom.attachEvent('on' + eventName, handle)
  }
}
export default {
  on
}
