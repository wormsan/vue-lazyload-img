import scrollEnd from './scrollEnd.js'
import Set from './Set.js'

const scrollListeners = new Set
const scrollEndListeners = new Set

window.addEventListener('scroll', function (e) {
    scrollListeners.forEach(listener => {
        listener()
    })
}, true)

window.addEventListener('scrollEnd', function (e) {
    scrollEndListeners.forEach(listener => {
        listener()
    })
}, true)

const compute = function(el, time, cb) {
    const rect = el.getBoundingClientRect()
    if(((rect.bottom >=0 && rect.bottom <= window.screen.height) 
        || (rect.top >=0 && rect.top <= window.screen.height))
    && ((rect.right >=0 && rect.right <= window.screen.width) 
        || (rect.left >=0 && rect.left <= window.screen.width))){
        if(el.src != el.newSrc && !!el.newSrc){
            el.src = el.newSrc
            el.onload = function(){
                el.style.opacity = '1'
                el.onload = new Function
                scrollListeners.delete(el.__scrollListener__)
                scrollEndListeners.delete(el.__scrollEndListener__)
                el.__scrollListener__ = null
                el.__scrollEndListener__ = null
            }
            el.style.transition = `opacity ${time}ms`
            if(cb){
                cb()
            }
        }
    }
}
const getSpeed = function({
    lastPos,
    lastSpeeds,
    aveSpeed,
}){
    const curPos = document.body.getBoundingClientRect().top
    let speed = lastPos - curPos
    if(lastSpeeds.length<10){
        lastSpeeds.push(speed)
    }else{
        lastSpeeds.shift()
        lastSpeeds.push(speed)
    }
    let sumSpeed = 0
    lastSpeeds.forEach(function(speed){
        sumSpeed += speed
    })
    aveSpeed = Math.abs(sumSpeed/lastSpeeds.length)
    lastPos = curPos
    return {
        lastPos,
        lastSpeeds,
        aveSpeed
    }
}
const compareSrc = function(src, newSrc) {
    if(src.replace(/^http:/,'').replace(/^https:/,'').match(newSrc.replace(/^http:/,'').replace(/^https:/,''))){
        return true
    }else return false
}

const lazyload = {
    install: (Vue, {
        time = 300,
        fade = false,
        speed = 0,
    }) => {
        if (speed > 0)
            scrollEnd()
        Vue.directive('lazyload', {
            inserted (el, binding, vnode, oldVnode) {
                if(!el)return
                if(compareSrc(el.src,binding.value))return
                if(fade)
                    el.style.opacity = 0
                if(!el.src){
                    el.src = 'data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                }
                let speedInfo = {
                    lastPos: document.body.getBoundingClientRect().top,
                    lastSpeeds: [],
                    aveSpeed: 0,
                }
                el.newSrc = binding.value
                const computeBySpeed = function () {
                    if(!el.newSrc || el.newSrc === el.src)return
                    if (speed == 0) {
                        compute(el, time) 
                        return
                    }
                    speedInfo = getSpeed(speedInfo)
                    if(speedInfo.aveSpeed > speed)return
                    compute(el, time)
                }
                const onScrollEnd = function(){
                    if(!el.newSrc || el.newSrc === el.src)return
                    compute(el, time)
                }
                el.__scrollListener__  = computeBySpeed
                el.__scrollEndListener__ = onScrollEnd
                el.onload = function() {
                    el.onload = new Function()
                    el.removeEventListener('error', onError)
                    compute(el, time)
                    scrollListeners.add(computeBySpeed)
                    if (speed > 0)
                        scrollEndListeners.add(onScrollEnd)
                }
                function onError () {
                    el.onload = new Function()
                    el.removeEventListener('error', onError)
                    scrollListeners.delete(computeBySpeed)
                    scrollEndListeners.delete(onScrollEnd)
                }
                el.addEventListener('error', onError)
                // setTimeout(function(){
                //     compute(el, time)
                // })
            },
            update (el, binding) {
                if(compareSrc(el.src,binding.value))return
                el.style.opacity = 0
                el.style.transition = `opacity ${time/2}ms`
                el.newSrc = binding.value
                setTimeout(() => {
                    compute(el, time/2)
                }, 150)
            },
        })
    }
}

export default lazyload
