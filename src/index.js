import scrollEnd from './scrollEnd.js'

let options = {
    time: 300,
    fade: false,
    speed: 20,
    //nohori: true
}

scrollEnd()
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
            }
            el.style.transition = 'opacity '+time+'ms'
            if(cb){
                cb()
            }
        }
    }
}
const getSpeed = function(opt){
    let lastPos = opt.lastPos
    let lastSpeeds = opt.lastSpeeds
    let aveSpeed = opt.aveSpeed
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
    install: (Vue, _options) => {
        if(_options){
            for(var key in _options){
                options[key] = _options[key]
            }
        }
        Vue.directive('lazyload', {
            inserted (el, binding, vnode, oldVnode) {
                if(!el)return
                if(compareSrc(el.src,binding.value))return
                if(options.fade)
                    el.style.opacity = 0
                if(!el.src){
                    el.src = 'data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                }
                let speed = {
                    lastPos: document.body.getBoundingClientRect().top,
                    lastSpeeds: [],
                    aveSpeed: 0
                }
                el.newSrc = binding.value
                const computeBySpeed = function(){
                    if(!el.newSrc || el.newSrc === el.src)return
                    speed = getSpeed(speed)
                    if(speed.aveSpeed > options.speed)return
                    compute(el, options.time)
                }
                const onScrollEnd = function(){
                    if(!el.newSrc || el.newSrc === el.src)return
                    compute(el, options.time)
                }
                el.onload = function() {
                    el.onload = new Function()
                    el.onerror = new Function()
                    compute(el, options.time)
                    window.addEventListener('scroll', computeBySpeed)
                    window.addEventListener('scrollEnd', onScrollEnd)
                }
                el.addEventListener('error', function () {
                    el.onload = new Function()
                    el.onerror = new Function()
                    window.removeEventListener('scroll', computeBySpeed)
                    window.removeEventListener('scrollEnd', onScrollEnd)
                }
                //compute(el, options.time)
            },
            update (el, binding) {
                if(compareSrc(el.src,binding.value))return
                el.style.opacity = 0
                el.style.transition = 'opacity ' + options.time/2 + 'ms'
                el.newSrc = binding.value
                setTimeout(() => {
                    compute(el, options.time/2)
                },150)
            },
        })
    }
}

module.exports = lazyload
