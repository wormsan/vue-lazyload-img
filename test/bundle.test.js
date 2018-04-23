// import Vue from 'vue'
const Vue = require('vue')
import Lazyload from '../dist/vue.lazyimg.js'
Vue.use(Lazyload, {
    //ms
    time: 300,
    fade: true,
    speed: 0,
    // px
    preload: 500,
})
const template = `
<div id="app" >
    <div id="hori" style="overflow:scroll;">
        <div  style="display:-webkit-box;width:3000px;height:300px;">
            <img v-for="img in imgs"
                v-lazyload="img"
                src="./images/blocker.jpg" 
                style="display:block;height:400px;">    
        </div>
    </div>
    <div id="container"  v-for="img in imgs" >
        <img v-lazyload="img"
            src="./images/blocker.jpg" 
            style="display:block;width:100%;">
    </div>
</div>
`
const a = new Vue({
    el: '#app',
    template,
    data: {
        imgs: [
            './images/1.jpg',
            './images/2.jpg',
            './images/3.jpg',
            './images/4.jpg',
            './images/5.jpg',
            // 'http://ee/images/5.jpg',
            './images/6.jpg',
            './images/7.jpg',
            './images/8.jpg'
        ]
    }
})

