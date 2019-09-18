<template>
  <div class="second">
    这是第二步
    <div class="btn">
      <router-link :to="{name: 'index.breadcrumbDemo.first'}">
        <el-button>第一步</el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Second extends Vue {

}
</script>

<style lang="scss" scoped>
.btn {
  margin-top: 20px;
}
</style>
