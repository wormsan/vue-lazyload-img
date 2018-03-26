## v2.1.0升级

* 加了一个requestAnimationFrame polyfill.
* 现在lazyload自动检测横向了
* 优化了一下性能，之前scroll的侦听器太多了，一张图片就有一个，现在改成只有两个了


## 下一个版本要做的 v2.1.1

* 预加载，即允许用户设定一个范围，当图片还没有进如到视口中，也进行加载

# Chinese doc
# vue-lazyload-img

# 目前新版本升级到v2，使用v1的同志们，请使用`npm install vue-lazyload-img@1`安装

## 介绍

vue图片懒加载插件，特别为移动端优化

适配vue2的更新

*作为vue-ui-kit体系的可搭配套件使用, on roadmap*

## 示例

[var with script tag](http://docs.gomeminus.com/vue-lazyload-img/test/var.html)


[bundle with webpack](http://docs.gomeminus.com/vue-lazyload-img/test/bundle.html)


## API

### 初始化

Vue.use(Lazyload[, options])

### options
global options

#### fade: 是否开启渐显效果

* true: all images will fadein if lazyload Complete
* false **(default)**: no fadein fx of all

#### speed: 一个检测屏幕速度的阈值，默认值已经改为0，考虑到现在的硬件性能的提高，没有太大必要再做细微检测

* 0 : load lazy-image when the image is visible at the 1st time
* >0 **(defult 0)**: average changes of document y-pos and any scroller's x-pos from last 10 frames

#### time: 渐显的时间，单位是毫秒

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

## 如何引入?

### 在CommonJs中

#### 首先

```
npm install vue-lazyload-img
```
#### 然后

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

**由于源码使用了部分es6特性需要使用类似`babel`的工具进行编译**

### 在浏览器中

由于使用了umd规范，所以可以用<script>标签引入，或使用其他的JS模块加载器，比如require.js

引用`dist/vue.lazyimg.min.js`或`dist/vue.lazyimg.js`即可

## v1迁移到v2

### 兼容

* 目前v2不支持可扩展的`directive`
* <dev>目前不支持横向检测（nohori暂时失效）</dev>已支持，且为自动检测

*上述问题后续版本会解决*

### 引用

* `require("vue-lazyload-img")` 改为 `var Lazyload = require("vue-lazyload-img")`
* `Vue.use(Vue.lazyimg)` 改为 `Vue.use(Lazyload)`
