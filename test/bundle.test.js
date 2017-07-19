var Vue = require('vue')
var Lazyload = require('../src/index.js')



Vue.use(Lazyload, {
    //ms
    time: 200,
    fade: true,
    nohori: false
})
var a = new Vue({
    el: '#app',
    template: document.querySelector('#template').innerHTML,
    data: {
        imgs: [
            './images/1.jpg',
            './images/2.jpg',
            './images/3.jpg',
            './images/4.jpg',
            'http://ee/images/5.jpg',
            './images/6.jpg',
            './images/7.jpg',
            './images/8.jpg'
        ]
    }
})
console.log(a)