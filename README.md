# vue-lazyload-img

## intro
    a plugin of vue for image lazyload, especially optimized for mobile browser

[demo](http://jalbaa.github.io/vue-lazyload-img/example/demo.html)

* support require.js(AMD),sea.js(CMD),webpack(CommonJs)
* detect image's visibility not only from vertical direction, but also horizontal
* detect scrolling speed, when scrolling speed is faster than threshold, image will not be loaded

## API

### init

Vue.use(Vue.lazyimg[,options])

### options
global options
#### fade: all images will use fadein fx

* true: all images will fadein if lazyload Complete
* false **(default)**: no fadein fx of all

#### nohori: disable lazyload from horizontal direction

* true: all images will not detect horizontal direction
* false **(default)**:  detect horizontal direction

#### speed: threshold of loading lazyload iamge

* 0 **(default)**: load lazy-image when the image is visible at the 1st time
* >0 **(recommend 20)**: average changes of document y-pos and any scroller's x-pos from last 10 frames, awesome in mobile browsers

```
Vue.use(Vue.lazyimg,{
    fade: true,
    nohori: true,
    speed: 20,
})
```

### directive

#### v-lazyload

* v-lazyload="src"
* v-lazyload:opt.nohri="src"
* v-lazyload:opt.fadein="src"
* v-lazyload:opt.nohri.fadein="src"

## How to import?

### In CommonJs

#### 1st
``` shell
npm install vue-lazyload-img
```

#### 2nd
es6

``` javascript
import "vue-lazyload-img"
Vue.use(Vue.lazyimg)
```
es5

``` javascript
require("vue-lazyload-img")
Vue.use(Vue.lazyimg)
```
### In browser

because this plugins supports `umd`, so you can use it as a `<script>` or with JS module loader like `require.js`.

## 介绍
    vue图片懒加载插件，特别为移动端优化

[demo](http://jalbaa.github.io/vue-lazyload-img/example/demo.html)

* 符合umd规范，有效适配require.js，sea.js，webpack等各种模块加载器，普通引入也可以
* 十字方向检测图片是否可显示，不仅能做到上下滚动懒加载，还能做到水平方向懒加载
* 监测屏幕滚动速率，阈值可自定义，尤其适合移动端，比如屏幕快速向下滑动，其间的图片不会被加载
* 可选的淡入特效

## API

### 初始化

Vue.use(Vue.lazyimg[,options])

### options（可选参数）

全局选项

#### fade: 全部图片使用淡入特效

* true: 所有的图片都会使用淡入特效
* false **(默认)**: 不使用淡入特效

#### nohori: 禁用水平方向的检测

* true: 禁用水平方向的检测
* false **(默认)**:  不禁用水平方向的检测

#### speed: 速度检测的临界值

* 0 **(默认)**: 只要图片在屏幕里出现了，那么图片就开始懒加载
* >0 **(推荐 20)**: 只有当屏幕滚动速度小于speed且图片在屏幕中出现了才开始懒加载

```
Vue.use(Vue.lazyimg,{
    fade: true,
    nohori: true,
    speed: 20,
})
```

### directive

#### v-lazyload

* v-lazyload="src"
* v-lazyload:opt.nohri="src"
* v-lazyload:opt.fadein="src"
* v-lazyload:opt.nohri.fadein="src"


## 如何引入?

### 在CommonJs中

#### 首先
``` shell
npm install vue-lazyload-img
```

#### 然后
es6

``` javascript
import "vue-lazyload-img"
Vue.use(Vue.lazyimg)
```
es5

``` javascript
require("vue-lazyload-img")
Vue.use(Vue.lazyimg)
```
#### 在浏览器中

由于使用了`umd`规范，所以可以用`<script>`标签引入，或使用其他的JS模块加载器，比如`require.js`
