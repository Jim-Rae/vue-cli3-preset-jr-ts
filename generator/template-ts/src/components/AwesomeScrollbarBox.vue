/*
 * @Author: JimRae
 * @Date: 2019-09-04
 * @Last Modified by: JimRae
 * @Last Modified time: 2019-11-27
 * @Desc 自带滚动条的box，可以更好的自定义滚动条。（当前组设置height为100%，如果要兼容ie 9-10，则需要外部设置准确的height）
 */

<template>
  <div class="scrollbar-box" >
    <div class="scroll-wrapper" ref="wrapper">
      <div ref="content">
        <slot></slot>
      </div>
    </div>
    <div v-show="scrollVisible" class='scrollbar-bar' ref="bar">
      <div class="scrollbar-thumb" ref="thumb" :style="`height: ${thumbHeight}%; transform: translateY(${thumbMoveY}%)`"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { addResizeListener, removeResizeListener } from '@/utils/resizeEventListener'
import { scrollAnimateTo } from '@/utils/animate'
import { computeScrollBarWidth } from '@/utils/common'

@Component
export default class AwesomeScrollbarBox extends Vue {
  scrollVisible = false
  cursorDown = false // 是否按下滚动条
  thumbClickPosition = 0 // 鼠标点击位置到Thumb顶部的距离
  gutter = 0 // 浏览器默认滚动条的宽度
  thumbHeight = 100
  thumbMoveY = 0

  get wrapper () {
    return this.$refs.wrapper as HTMLElement
  }

  get content () {
    return this.$refs.content as HTMLElement
  }

  get bar () {
    return this.$refs.bar as HTMLElement
  }

  get thumb () {
    return this.$refs.thumb as HTMLElement
  }

  created () {
    this.gutter = computeScrollBarWidth()
  }

  mounted () {
    this.scrollVisible = this.wrapper.clientHeight < this.wrapper.scrollHeight
    if (this.gutter) {
      // 隐藏浏览器默认滚动条
      this.wrapper.style.marginRight = `-${this.gutter}px`
    }
    this.addEventListeners()
  }

  beforeDestroy () {
    this.removeEventListeners()
  }

  // 添加事件监听器
  addEventListeners () {
    addResizeListener(this.content, this.updateThumb)
    this.wrapper.addEventListener('scroll', this.handleScroll)
    this.bar.addEventListener('click', this.clickTrackHandle)
    this.thumb.addEventListener('mousedown', this.handleMousedown)
  }
  // 移除事件监听器
  removeEventListeners () {
    removeResizeListener(this.content, this.updateThumb)
    this.wrapper.removeEventListener('scroll', this.handleScroll)
    this.bar.removeEventListener('click', this.clickTrackHandle)
    this.thumb.removeEventListener('mousedown', this.handleMousedown)
  }
  // 更新Thumb长度
  updateThumb (e: Event) {
    let heightPercentage = (this.wrapper.clientHeight * 100 / this.wrapper.scrollHeight)
    if (heightPercentage < 100) {
      // this.thumb.style.height = heightPercentage + '%'
      this.thumbHeight = heightPercentage
      this.scrollVisible = true
    } else {
      this.scrollVisible = false
    }
  }
  // 处理scroll事件
  handleScroll () {
    // let moveY = (this.wrapper.scrollTop * 100 / this.wrapper.clientHeight)
    // // 通过计算出来的百分比，然后对滚动条执行translate移动
    // this.thumb.style.transform = 'translateY(' + moveY + '%)'
    this.thumbMoveY = this.wrapper.scrollTop * 100 / this.wrapper.clientHeight
  }
  // 处理点击滚动轨道时的click事件
  clickTrackHandle (e: MouseEvent) {
    // 获得点击位置与滚动框顶部之间的距离
    const offset = Math.abs((e.currentTarget as HTMLElement).getBoundingClientRect().top - e.clientY)
    // 让点击位置处于滚动条的中间
    const thumbHalf = this.thumb.offsetHeight / 2
    // 控制点击位置，防止溢出
    let pos = offset
    if (pos < thumbHalf) pos = thumbHalf
    else if (pos > (e.currentTarget as HTMLElement).offsetHeight - thumbHalf) pos = (e.currentTarget as HTMLElement).offsetHeight - thumbHalf
    // 计算出滚动条在滚动框的百分比位置
    const thumbPositionPercentage = (pos - thumbHalf) * 100 / this.wrapper.offsetHeight
    // 通过改变scrollTop来操作。所有操作滚动条的最后一步都是通过handleScroll来实现
    scrollAnimateTo(this.wrapper, thumbPositionPercentage * this.wrapper.scrollHeight / 100, 200)
  }
  handleMousedown (e: MouseEvent) {
    this.startDrag(e)
    this.thumbClickPosition = e.clientY - (e.currentTarget! as HTMLElement).getBoundingClientRect().top
  }
  // 开始拖动滚动条
  startDrag (e: MouseEvent) {
    e.stopImmediatePropagation()
    this.cursorDown = true
    document.addEventListener('mousemove', this.mouseMoveDocumentHandler)
    document.addEventListener('mouseup', this.mouseUpDocumentHandler)
  }
  // 鼠标移动事件处理
  mouseMoveDocumentHandler (e: MouseEvent) {
    // 防止拖动鼠标时选中页面内容
    e.preventDefault()
    if (this.cursorDown === false) return

    // 获得点击位置与 滚动框顶部 之间的距离
    const offset = (this.bar.getBoundingClientRect().top - e.clientY) * -1

    // 获得滚动条所处的百分比位置
    const thumbPositionPercentage = (offset - this.thumbClickPosition) * 100 / this.bar.offsetHeight
    // 计算出滚动条应该在滚动框中所处的位置，scrollTop

    this.wrapper.scrollTop = thumbPositionPercentage * this.wrapper.scrollHeight / 100
  }
  // 鼠标弹起事件处理
  mouseUpDocumentHandler (e: MouseEvent) {
    this.cursorDown = false
    document.removeEventListener('mousemove', this.mouseMoveDocumentHandler)
  }
}
</script>

<style lang="scss" scoped>

.scrollbar-box {
  position: relative;
  overflow: hidden;
  height: 100%;

  .scroll-wrapper {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .scrollbar-bar{
    position: absolute;
    right: 2px;
    top: 2px;
    bottom: 2px;
    z-index: 1;
    opacity: 0;
    width: 6px;
    border-radius: 4px;
    background-color: rgba(0,0,0,.1);
    transition: opacity 120ms ease-out;
    cursor: pointer;
  }
  .scrollbar-thumb {
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    border-radius: inherit;
    background-color: rgba(135,141,153,.3);
    transition: .3s background-color;
    cursor: pointer;
  }

  &:hover .scrollbar-bar{
    opacity: 1;
    transition: opacity 340ms ease-out;
  }
}
</style>
