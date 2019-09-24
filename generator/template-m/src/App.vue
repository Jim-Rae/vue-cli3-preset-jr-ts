<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class App extends Vue {
  render (h: CreateElement) {
    return h('div', {
      attrs: {
        id: 'app'
      }
    },
    [h('router-view')])
  }
}
</script>

<style lang="scss">

</style>
