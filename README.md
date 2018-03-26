[中文文档看这里](./README.zh-CN.md)

## Update v2.1.0

* Add requestAnimationFrame polyfill.
* Now img lazyload detects horizontal direction automatically
* Imporve perfomence, since the scroll event liseners were as many as pictures * 2 before, there is only two liseners now. 


## Next in V2.1.1

* Preload, let you set a range to preload images before a image enters the viewport.

# English doc

# Finally Available on vue2, if you use v1, use `npm install vue-lazyload-img@1`

# vue-lazyload-img

## intro
    a plugin of vue for image lazyload, especially optimized for mobile browser
## demo

Use mobile mode if possible

[var with script tag](http://docs.gomeminus.com/vue-lazyload-img/test/var.html)


[bundle with webpack](http://docs.gomeminus.com/vue-lazyload-img/test/bundle.html)



## API

### init

Vue.use(Lazyload[,options])

### options
global options
#### fade: all images will use fadein fx

* true: all images will fadein if lazyload Complete
* false **(default)**: no fadein fx of all

#### speed: threshold of loading lazyload iamge

* 0 : load lazy-image when the image is visible at the 1st time
* >0 **(defult 0)**: average changes of document y-pos and any scroller's x-pos from last 10 frames

#### time: duration of fade in or fade out

* 300 **(default, unit: ms)**

```
Vue.use(Lazyload,{
    // default false, recommand true
    fade: true,
    // it's better not set the speed now
    // speed: 20, 
    // default 300, it's not necessary to set it I think
    time: 300
})
```

### directive

#### v-lazyload

* v-lazyload="src"

## How to import?

### In CommonJs

#### 1st
``` shell
npm install vue-lazyload-img
```

#### 2nd

es6
```
import Lazyload from "vue-lazyload-img"
Vue.use(Lazyload)
```
es5

```
var Lazyload = require("vue-lazyload-img")
Vue.use(Lazyload)
```


**in this way, you'll need `babel` or something like it**

### In browser

because this plugins supports `umd`, so you can use it as a `<script>` or with JS module loader like `require.js`.

the released bundle is in:

`dist/vue.lazyimg.min.js`
`dist/vue.lazyimg.js`



