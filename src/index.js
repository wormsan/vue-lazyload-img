import Filter from './Filter.js';
import scrollEnd from './scrollEnd.js';

scrollEnd();
const compute = function(el, time, cb) {
    const rect = el.getBoundingClientRect();
    if(rect.bottom >=0 && rect.top <= window.screen.height
        && rect.right >0 && rect.left < window.screen.width){
        if(el.src != el.newSrc && !!el.newSrc){
            el.src = el.newSrc;
            el.style.opacity = '1';
            el.style.transition = !time ? 'opacity .3s' : 'opacity '+time;
            if(cb){
                cb();
            }
        }
    }
}
const getSpeed = function(opt){
    let lastPos = opt.lastPos;
    let lastSpeeds = opt.lastSpeeds;
    let aveSpeed = opt.aveSpeed;
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
    install: (Vue, options) => {
        Vue.directive('lazyload', {
            inserted (el, binding, vnode, oldVnode) {
                if(!el)return;
                if(compareSrc(el.src,binding.value))return;
                el.style.opacity = 0;
                if(!el.src){
                    el.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                }
                let speed = {
                    lastPos: document.body.getBoundingClientRect().top,
                    lastSpeeds: [],
                    aveSpeed: 0
                }
                el.newSrc = binding.value;
                const computeBySpeed = function(){
                    if(!el.newSrc || el.newSrc === el.src)return;
                    speed = getSpeed(speed);
                    if(speed.aveSpeed > 10)return;
                    compute(el);
                }
                const onScrollEnd = function(){
                    if(!el.newSrc || el.newSrc === el.src)return;
                    compute(el);
                }
                el.onload = function() {
                    compute(el);
                    el.onload = new Function();
                    el.onerror = new Function();
                    window.addEventListener('scroll', computeBySpeed);
                    window.addEventListener('scrollEnd', onScrollEnd);
                }
                el.onerror = function () {
                    el.onload = new Function();
                    el.onerror = new Function();
                    window.removeEventListener('scroll', computeBySpeed);
                    window.removeEventListener('scrollEnd', onScrollEnd);
                }
                compute(el);
            },
            update (el, binding) {
                if(compareSrc(el.src,binding.value))return;
                el.style.opacity = 0;
                el.style.transition = 'opacity .15s';
                el.newSrc = binding.value;
                setTimeout(() => {
                    compute(el, '.15');
                },150)
            },
        });
    }
};
export default lazyload;
