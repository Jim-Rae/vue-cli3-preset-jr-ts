/*!
 * @Author: Jim Rae
 * @Time: 2019-11-19 14:48:00
 * @Last Modified by: Jim Rae
 * @Last Modified Time: 2019-11-20 10:25:00
 * @Dec: 长按事件监听
 */

export interface LCElement extends HTMLElement {
  addEventListener: (...args: any) => void;
  attachEvent: (...args: any) => void;
  removeEventListener: (...args: any) => void;
  detachEvent: (...args: any) => void;
  [eventType: string]: any;
}

interface HandlerFn {
  (...args: any): void;
}

export default class LCEvent {
  // 目标元素
  private target: LCElement;
  // 长按阈值，单位ms
  private threshold: number;
  // 定时器
  private timer = 0;
  // 长按标志
  private isLongClick = false;
  // 长按事件队列
  private lCHandlers: Array<HandlerFn> = [];
  // 点击事件队列
  private cHandlers: Array<HandlerFn> = [];

  constructor (target: LCElement, threshold = 500) {
    this.target = target;
    this.threshold = threshold;
    // 添加事件
    this.registerEvents();
  }

  // 添加长按事件处理函数
  public addLCHandler (handler: HandlerFn): LCEvent {
    this.lCHandlers.push(handler);
    return this;
  }

  // 添加点击事件处理函数
  public addCHandler (handler: HandlerFn): LCEvent {
    this.cHandlers.push(handler);
    return this;
  }

  // 移除长按事件处理函数
  public removeLCHandler (handler?: HandlerFn): LCEvent {
    return this.removeHandler(this.lCHandlers, handler);
  }
  // 移除点击事件处理函数
  public removeCHandler (handler?: HandlerFn): LCEvent {
    return this.removeHandler(this.cHandlers, handler);
  }

  // 绑定原生事件
  private registerEvents (): void {
    this.registerEvent(this.target, 'touchstart', this.touchStartEventHandler);
    this.registerEvent(this.target, 'touchmove', this.touchMoveEventHandler);
    this.registerEvent(this.target, 'touchend', this.touchEndEventHandler);
  }

  // 移除原生事件
  private removeEvents (): void {
    this.removeEvent(this.target, 'touchstart', this.touchStartEventHandler);
    this.removeEvent(this.target, 'touchmove', this.touchMoveEventHandler);
    this.removeEvent(this.target, 'touchend', this.touchEndEventHandler);
  }

  // touchstart事件处理函数
  private touchStartEventHandler = (e: TouchEvent) => {
    this.isLongClick = false;
    this.timer = setTimeout(() => {
      // 此处为长按事件处理
      this.isLongClick = true;
      this.lCHandlers.forEach(handler => {
        handler(e);
      })
      this.isLongClick = false;
    }, this.threshold);
  }

  // touchmove事件处理函数
  private touchMoveEventHandler = () => {
    // 鼠标或手指移动则不算长按
    this.clearTimer();
  }

  // touchend事件处理函数
  private touchEndEventHandler = (e: TouchEvent) => {
    this.clearTimer();
    if (!this.isLongClick) {
      // 点击时间未超过长按阈值，判断为点击事件
      this.cHandlers.forEach(handler => {
        handler(e);
      });
    }
  }

  // 清空计时器
  private clearTimer (): void{
    this.timer && clearTimeout(this.timer);
    this.timer = 0;
  }

  // 清空回调队列
  private removeHandler (handlerList: Array<HandlerFn>, handler?: HandlerFn): LCEvent {
    if (handler) {
      // 有传handler，移除指定处理函数
      const index = handlerList.indexOf(handler);
      if (index !== -1) {
        handlerList.splice(index, 1);
      }
    } else {
      // 没传handler，直接清空所有事件队列
      handlerList = [];
      // 若长按事件队列和点击事件队列为空，则直接移除原生事件
      if (this.cHandlers.length === 0 && this.lCHandlers.length === 0) {
        this.removeEvents();
      }
    }
    return this;
  }

  // 兼容的方式绑定事件
  private registerEvent (target: LCElement, type: string, handler: HandlerFn) {
    if (target.addEventListener) {
      target.addEventListener(type, handler);
    } else if (target.attachEvent) {
      // 兼容低版本ie
      target.attachEvent('on' + type, handler);
    } else {
      target['on' + type] = handler;
    }
  }

  // 兼容的方式解绑事件
  private removeEvent (target: LCElement, type: string, handler: HandlerFn) {
    if (target.removeEventListener) {
      target.removeEventListener(type, handler);
    } else if (target.detachEvent) {
      // 兼容低版本ie
      target.detachEvent('on' + type, handler);
    } else {
      target['on' + type] = null;
    }
  }
}
