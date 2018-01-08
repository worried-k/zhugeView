<script type="text/jsx">
  export default {
    name: 'zgRadio',
    props: {
      value: null,
      store: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      onClickRadio (item) {
        return () => {
          this.$emit('input', item)
        }
      }
    },
    render (h) {
      return (
        <ul class="zg-radio-list">
          {this.store.map(item => {
            let itemClass = {
              'zg-radio-item': true,
              'zg-disable': true,
              'zg-checked': item === this.value
            }
            return (
              <li class={itemClass} onClick={this.onClickRadio(item)}>
                <span class="zg-cycle"></span>
                {item.label}
              </li>
            )
          })}
        </ul>
      )
    }
  }
</script>

<style lang="sass">
@import "styles/radio"
</style>
