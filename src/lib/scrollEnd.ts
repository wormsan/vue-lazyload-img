import ScrollEvent from './ScrollEvent'

if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame
    } else {
        window.requestAnimationFrame = function requestAnimationFrame (cb) {
            setTimeout(function () {
                cb(0)
            }, 1000 / 60)
            return 0
        }
    }
}
export default function () {
    let cntr = 0
    let lastCntr = 0
    let diff = 0
    const scrollEnd = document.createEvent('HTMLEvents') as ScrollEvent
    scrollEnd.initEvent('scrollEnd',true, false)
    scrollEnd.eventType = 'message'
    function enterFrame(){
        if (cntr !== lastCntr) {
            diff++
            if (diff === 5) {
                window.dispatchEvent(scrollEnd)
                cntr = lastCntr
            }
        }
        requestAnimationFrame(enterFrame)
    }
    window.requestAnimationFrame(enterFrame)
    window.addEventListener('scroll', () => {
        lastCntr = cntr;
        diff = 0;
        cntr++;
    })
}