import Vue, { PluginObject, VNode, PluginFunction, VNodeDirective, VueConstructor} from 'vue/types'

import ImageElement from './ImageElement'

import scrollEnd from './scrollEnd'
import Set from './Set'

const scrollListeners = new Set
const scrollEndListeners = new Set
const screenHeight = document.documentElement

window.addEventListener('scroll', function (e: UIEvent) {
    scrollListeners.forEach((listener: Function) => {
        listener()
    })
}, true)

window.addEventListener('scrollEnd', function (e: UIEvent) {
    scrollEndListeners.forEach((listener: Function) => {
        listener()
    })
}, true)

const compute = function(el: ImageElement, time: number, preload: number = 0, cb: Function = function(){}) {
    const rect = el.getBoundingClientRect()
    if ( ((rect.bottom >= 0 - preload && rect.bottom <= window.screen.height + preload)
        || (rect.top >= 0 - preload && rect.top <= window.screen.height + preload))
    && ((rect.right >=0 && rect.right <= window.screen.width)
        || (rect.left >=0 && rect.left <= window.screen.width)) ) {
        if (el.src != el.newSrc && !!el.newSrc) {
            el.src = el.newSrc
            el.onload = function() {
                el.style.opacity = '1'
                el.onload = function(){}
                scrollListeners.delete(el.__scrollListener__)
                scrollEndListeners.delete(el.__scrollEndListener__)
                el.__scrollListener__ = null
                el.__scrollEndListener__ = null
            }
            el.style.transition = `opacity ${time}ms`
            cb()
        }
    }
}
type GetSpeedArgs =  {
    lastPos: number,
    lastSpeeds: Array<number>,
    aveSpeed: number,
}
const getSpeed = function({
    lastPos,
    lastSpeeds,
    aveSpeed,
} : GetSpeedArgs) {
    const clientRect = document.body.getBoundingClientRect()
    const curPos = clientRect.top
    // const curPos = document.body.getBoundingClientRect().top
    let speed = lastPos - curPos
    if(lastSpeeds.length<10){
        lastSpeeds.push(speed)
    }else{
        lastSpeeds.shift()
        lastSpeeds.push(speed)
    }
    let sumSpeed = 0
    lastSpeeds.forEach(function(speed: number){
        sumSpeed += speed
    })
    aveSpeed = Math.abs(sumSpeed/lastSpeeds.length)
    lastPos = curPos
    return {
        lastPos,
        lastSpeeds,
        aveSpeed,
    }
}
const compareSrc = function(src: string, newSrc: string) {
    if (src.replace(/^http:/,'').replace(/^https:/,'').match(newSrc.replace(/^http:/,'').replace(/^https:/,'')))
        return true
    else 
        return false
}
type LazyLoadOptions = {
    time?: number,
    fade?: boolean,
    speed?: number,
    preload?: number,
}
const Lazyload:PluginObject<LazyLoadOptions> = {
    install: (Vue: VueConstructor, {
        time = 300,
        fade = false,
        speed = 0,
        preload = 0,
    }: LazyLoadOptions) => {
        if (speed > 0)
            scrollEnd()
        Vue.directive('lazyload', {
            inserted (el: ImageElement, binding: VNodeDirective, vnode: VNode, oldVnode: VNode) {
                if (!el) return
                if (compareSrc(el.src, binding.value)) return
                if (fade)
                    el.style.opacity = '0'
                if (!el.src) {
                    el.src = 'data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                }
                let speedInfo = {
                    lastPos: document.body.getBoundingClientRect().top,
                    lastSpeeds: [],
                    aveSpeed: 0,
                } as GetSpeedArgs
                el.newSrc = binding.value
                const computeBySpeed = function () {
                    if(!el.newSrc || el.newSrc === el.src)return
                    if (speed == 0) {
                        compute(el, time, preload) 
                        return
                    }
                    speedInfo = getSpeed(speedInfo)
                    if(speedInfo.aveSpeed > speed)return
                    compute(el, time, preload)
                }
                const onScrollEnd = function(){
                    if(!el.newSrc || el.newSrc === el.src)return
                    compute(el, time, preload)
                }
                el.__scrollListener__  = computeBySpeed
                el.__scrollEndListener__ = onScrollEnd
                el.onload = function() {
                    el.onload = function(){}
                    el.removeEventListener('error', onError)
                    compute(el, time, preload)
                    scrollListeners.add(computeBySpeed)
                    if (speed > 0)
                        scrollEndListeners.add(onScrollEnd)
                }
                function onError () {
                    el.onload = function(){}
                    el.removeEventListener('error', onError)
                    scrollListeners.delete(computeBySpeed)
                    scrollEndListeners.delete(onScrollEnd)
                }
                el.addEventListener('error', onError)
                // setTimeout(function(){
                //     compute(el, time)
                // })
            },
            update (el: ImageElement, binding: VNodeDirective) {
                if (compareSrc(el.src,binding.value)) return
                el.style.opacity = '0'
                el.style.transition = `opacity ${time/2}ms`
                el.newSrc = binding.value
                setTimeout(() => {
                    compute(el, time/2, preload)
                }, 150)
            },
        })
    }
}

export default Lazyload