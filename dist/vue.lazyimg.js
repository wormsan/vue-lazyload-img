(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define(["Vue"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("Vue")) : factory(root["Vue"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Vue lazyload img plugin
	 * especially optimized for mobile browsers
	 * support umd(https://github.com/umdjs/umd)
	 * capable of require.js, sea.js, CommonJS
	 * @author: JALBAA
	 * @email: 116682877@qq.com
	 */
	var Vue = __webpack_require__(1)
	Vue.lazyimg ={
	    install: function(Vue,options){
	        options = options || {
	            fadein: false,
	            speed: 20,
	            nohori: false
	        }
	        //custom scrollEnd event
	        if(options.speed){
	            var cntr = 0
	            var lastCntr = 0
	            var diff = 0
	            var scrollEnd = document.createEvent('HTMLEvents');
	            scrollEnd.initEvent('scrollEnd')
	            scrollEnd.eventType = 'message'
	            function enterFrame(){
	                if(cntr != lastCntr){
	                    diff++
	                    if(diff == 5){
	                        window.dispatchEvent(scrollEnd)
	                        cntr = lastCntr
	                    }
	                }
	                requestAnimationFrame(enterFrame);
	            }
	            window.requestAnimationFrame(enterFrame)
	            document.addEventListener('scroll',function(){
	                lastCntr = cntr
	                diff = 0
	                cntr++
	            },true)
	        }
	        //compute scroll speed
	        var lastPosY = document.body ? document.body.getBoundingClientRect().top : document.head.parentNode.getBoundingClientRect().top
	        var lastPosX = document.body ? document.body.getBoundingClientRect().left : document.head.parentNode.getBoundingClientRect().left
	        var lastSpeeds = []
	        var aveSpeed = 0
	        function getSpeed(el){
	            var curPosY = el ? el.getBoundingClientRect().top : 0
	            var curPosX = el ? el.getBoundingClientRect().left: 0
	            var speedY = lastPosY - curPosY
	            var speedX = lastPosX - curPosX
	            if(lastSpeeds.length<10){
	                lastSpeeds.push((speedY+speedX)/2)
	            }else{
	                lastSpeeds.shift()
	                lastSpeeds.push((speedY+speedX)/2)
	            }
	            var sumSpeed = 0
	            lastSpeeds.forEach(function(speed){
	                sumSpeed += speed
	            })
	            aveSpeed = Math.abs(sumSpeed/lastSpeeds.length)
	            lastPosY = curPosY
	            lastPosX = curPosX
	        }
	        document.addEventListener('scroll',function(e){
	            if(!options.speed) return
	            var el = null
	            for(var i=0; i<e.target.childNodes.length; i++){
	                if(e.target.childNodes[i].nodeType == 1){
	                    el = e.target.childNodes[i]
	                    break;
	                }
	            }
	            getSpeed(el)
	        },true)

	        //vue directive update
	        function update(value){
	            var isFadeIn = this.modifiers.fadein || options.fadein
	            var isNoHori = this.modifiers.nohori || options.nohori
	            if(isFadeIn){
	                this.el.style.opacity = 0
	                this.el.style.transition = 'opacity .3s'
	                this.el.style.webkitTransition = 'opacity .3s'
	            }
	            var compute = function(){
	                var rect = this.el.getBoundingClientRect();
	                var vpWidth = document.head.parentNode.clientWidth
	                var vpHeight = document.head.parentNode.clientHeight
	                var loadImg = function(){
	                    var self = this
	                    this.el.src = value
	                    this.el.addEventListener('load',onloadEnd)
	                    window.removeEventListener('scrollEnd',compute,true)
	                    window.removeEventListener('resize',compute,true)
	                    window.removeEventListener('scroll',computeBySpeed,true)
	                    lastSpeeds = []
	                }.bind(this)
	                if(this.el.src == value)return
	                if(isNoHori){
	                    if(rect.bottom >=0 && rect.top <= vpHeight){
	                        loadImg()
	                    }
	                }else if(rect.bottom >=0 && rect.top <= vpHeight
	                        && rect.right >= 0 && rect.left <= vpWidth){
	                    loadImg()
	                }
	            }.bind(this)
	            var computeBySpeed = function(){
	                if(options.speed && aveSpeed > options.speed)return
	                compute()
	            }.bind(this)
	            var onload = function(){
	                compute();
	                this.el.removeEventListener('load',onload)
	                window.addEventListener('scrollEnd',compute,true)
	                window.addEventListener('resize',compute,true)
	                window.addEventListener('scroll',computeBySpeed,true)
	            }.bind(this)
	            var onloadEnd = function(){
	                if(isFadeIn)
	                    this.el.style.opacity = 1
	                this.el.removeEventListener('load',onloadEnd)
	            }.bind(this)
	            this.el.addEventListener('load',onload)
	        }
	        Vue.directive('lazyload',update)
	    }
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;