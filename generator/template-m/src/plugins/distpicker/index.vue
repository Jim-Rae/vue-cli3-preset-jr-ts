<template>
  <van-popup
    id="my-distpicker"
    v-model="visible"
    position="bottom"
  >
    <van-picker
      ref="distpicker"
      :columns="columns"
      :show-toolbar="true"
      :visible-item-count=5
      @change="onValuesChange"
      @touchmove.native="$event.preventDefault()"
    >
      <div class="picker-toolbar">
        <van-button plain type="primary" size="small" class="cancel-btn" @click="close">取消</van-button>
        <header class="picker-toolbar-title">{{title}}</header>
        <van-button type="primary" size="small" class="confirm-btn" @click="confirm">确认</van-button>
      </div>
    </van-picker>
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import DISTRICTS, { DISTRICTSType } from './districts'
import { Picker } from 'vant'

interface DistpickerElement extends Element {
  getColumnValues (columnIndex: number) : string[]
  setColumnValues (columnIndex: number, values: Object[]) : string[]
}

const DEFAULT_CODE = '100000'

@Component
export default class Distpicker extends Vue {
  visible: boolean = false
  title: string = '请选择地区'
  columns: { values: string[] }[] = [
    { values: [] },
    { values: [] },
    { values: [] }
  ]
  /* eslint-disable-next-line */
  callback: Function = new Function()
  province: string | null = null
  city: string | null = null
  district: string | null = null

  get distpicker (): DistpickerElement {
    return this.$refs.distpicker as DistpickerElement
  }

  @Watch('province')
  onProvinceChange (val: string) {
    let citys = this.getDistricts(this.getAreaCode(val))
    this.distpicker.setColumnValues(1, Object.keys(citys).map(key => citys[key]))
    this.city = this.distpicker.getColumnValues(1)[0]
  }
  @Watch('city')
  onCityChange (val: string) {
    let districts = this.getDistricts(this.getAreaCode(val))
    this.distpicker.setColumnValues(2, Object.keys(districts).map(key => districts[key]))
    this.district = this.distpicker.getColumnValues(2)[0]
  }

  created () {
    let provinces = this.getDistricts()
    this.columns[0].values = Object.keys(provinces).map(key => provinces[key])
  }

  getDistricts (code: string = DEFAULT_CODE) {
    return (DISTRICTS as DISTRICTSType)[code] || {}
  }
  getAreaCode (name: string) {
    for (let x in DISTRICTS) {
      for (let y in (DISTRICTS as DISTRICTSType)[x]) {
        if (name === (DISTRICTS as DISTRICTSType)[x][y]) {
          return y
        }
      }
    }
  }
  onValuesChange (picker: Picker, values: string[]) {
    this.province = values[0]
    this.city = values[1]
    this.district = values[2]
  }
  confirm () {
    this.visible = false
    this.callback({
      province: this.province,
      city: this.city,
      district: this.district
    })
  }
  init (title: string, callback: Function) {
    this.title = title
    this.callback = callback
  }
  show () {
    this.visible = true
    this.$nextTick(() => {
      this.province = this.columns[0].values[0]
    })
  }
  close () {
    this.visible = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss';

#my-distpicker{

  .picker{
    width:100vw;
  }

  .picker-item{
    font-size: 30px;
    color: $g-fs-bs;
  }

  .picker-selected {
    color: $g-fs-lg;
  }

  .picker-toolbar{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-content: center;

    &-title{
      font-size: 34px;
      color: $g-fs-lg;
      max-width: 350px;
      height: 80px;
      line-height: 80px;
    }

    .cancel-btn{
      margin: auto 30px;
    }

    .confirm-btn{
      margin: auto 30px;
    }
  }
}
</style>
