import Distpicker from './index.vue'
import Vue, { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    init (title: string, callback: Function): void
    show (): void
    close (): void
    /* eslint-disable-next-line */
    $_distpicker: any
  }
}

export default {
  install (Vue: VueConstructor) {
    const VuePicker = Vue.extend(Distpicker)
    const $vm = new VuePicker({
      el: document.createElement('div')
    })
    document.body.appendChild($vm.$el)

    const myPicker = {
      init (title: string, callback: Function) {
        $vm.init(title, callback)
      },
      show () {
        $vm.show()
      },
      close () {
        $vm.close()
      }
    }

    Vue.mixin({
      created () {
        (this as Vue).$_distpicker = myPicker
      }
    })
  }
}
