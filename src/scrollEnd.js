export default function(){
    let cntr = 0
    let lastCntr = 0
    let diff = 0
    const scrollEnd = document.createEvent('HTMLEvents');
    scrollEnd.initEvent('scrollEnd',true, false);
    scrollEnd.eventType = 'message';
    function enterFrame(){
        if(cntr !== lastCntr){
            diff++
            if(diff === 5){
                window.dispatchEvent(scrollEnd);
                cntr = lastCntr;
            }
        }
        requestAnimationFrame(enterFrame);
    }
    window.requestAnimationFrame(enterFrame);
    window.addEventListener('scroll', () => {
        lastCntr = cntr;
        diff = 0;
        cntr++;
    })
}