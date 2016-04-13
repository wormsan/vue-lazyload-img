# vue-lazyload-img

## intro
    a plugin of vue for image lazyload, especially optimized for mobile browser（vue图片懒加载插件，特别为移动端优化）

* support require.js(AMD),sea.js(CMD),webpack(CommonJs)
* detect image's visibility not only from vertical direction, but also horizontal
* detect scrolling speed, when scrolling speed is faster than threshold, image will not be loaded

## API

### init

Vue.use(Vue.lazyimg,options)

### options
global options
#### fade: switch of all images' fadein fx

* true: all images will fadein if lazyload Complete
* false **(default)**: no fadein fx of all

#### nohori: detect or not detect all images' visibility from horizontal direction

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
