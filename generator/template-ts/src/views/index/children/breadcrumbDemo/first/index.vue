<template>
  <div class="first">
    这是第一步
    <div class="btn">
      <router-link :to="{name: 'index.breadcrumbDemo.second'}">
        <el-button>第二步</el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, namespace } from 'vuex-class'

const userModule = namespace('user')

@Component
export default class First extends Vue {
  @userModule.Action getRouteInfo: any

  created () {
    this.getRouteInfo()
  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin-top: 20px;
}
</style>
