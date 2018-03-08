<script type="text/jsx">
  import emitter from '../../mixins/emitter'
  import ZgGroupHeader from './groupHeader.vue'
  export default {
    components: {ZgGroupHeader},
    name: 'ZgOptGroup',
    mixins: [emitter],
    props: {
      groupData: {
        type: Object
      },
      store: {
        type: Array
      },
      checkedMap: {
        type: Object
      },
      showMap: {
        type: Object
      },
      disableOptions: {
        type: Array
      },
      keyField: {
        type: String,
        required: true
      },
      labelField: {
        type: String,
        required: true
      },
      multiple: {
        type: Boolean,
        default: false
      },
      hideHead: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: true
      }
    },
    methods: {
      onClickOption (checked, data) {
        this.$emit('click', checked, data)
      }
    },
    render (h) {
      return (
        <ul class="zg-opt-group" v-show={this.show}>
          <zg-group-header groupData={this.groupData}
                           labelField={this.labelField}
                           show={!this.hideHead}
                           scopedSlots={{default: this.$scopedSlots.header}}></zg-group-header>
          {this.store.map(option => {
            if (this.showMap[option[this.keyField]]) {
              return (
                <zg-option key={option[this.keyField]}
                           checked={this.checkedMap[option[this.keyField]]}
                           disable={this.disableOptions.indexOf(option[this.keyField]) > -1}
                           data={option}
                           labelField={this.labelField}
                           multiple={this.multiple}
                           onClick={this.onClickOption}
                           scopedSlots={{default: this.$scopedSlots.default}}
                ></zg-option>
              )
            }
          })}
        </ul>
      )
    }
  }
</script>

<style lang="sass">
@import "styles/optGroup"
</style>
