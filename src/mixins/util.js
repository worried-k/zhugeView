/**
 * Created by yqdong on 2017/11/6.
 * qq: 1013501639
 * @author yqdong
 *
 */
export default {
  methods: {
    time (label) {
      if (this.logTime) console.time(label)
    },
    timeEnd (label) {
      if (this.logTime) console.timeEnd(label)
    }
  }
}
