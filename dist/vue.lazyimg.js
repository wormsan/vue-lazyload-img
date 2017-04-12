(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Lazyload"] = factory();
	else
		root["Lazyload"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var cntr = 0;
    var lastCntr = 0;
    var diff = 0;
    var scrollEnd = document.createEvent('HTMLEvents');
    scrollEnd.initEvent('scrollEnd', true, false);
    scrollEnd.eventType = 'message';
    function enterFrame() {
        if (cntr !== lastCntr) {
            diff++;
            if (diff === 5) {
                window.dispatchEvent(scrollEnd);
                cntr = lastCntr;
            }
        }
        requestAnimationFrame(enterFrame);
    }
    window.requestAnimationFrame(enterFrame);
    window.addEventListener('scroll', function () {
        lastCntr = cntr;
        diff = 0;
        cntr++;
    });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scrollEnd = __webpack_require__(0);

var _scrollEnd2 = _interopRequireDefault(_scrollEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
    time: 300,
    fade: false,
    speed: 20
};

(0, _scrollEnd2.default)();
var compute = function compute(el, time, cb) {
    var rect = el.getBoundingClientRect();
    if ((rect.bottom >= 0 && rect.bottom <= window.screen.height || rect.top >= 0 && rect.top <= window.screen.height) && (rect.right >= 0 && rect.right <= window.screen.width || rect.left >= 0 && rect.left <= window.screen.width)) {
        if (el.src != el.newSrc && !!el.newSrc) {
            el.src = el.newSrc;
            el.onload = function () {
                el.style.opacity = '1';
                el.onload = new Function();
            };
            el.style.transition = 'opacity ' + time + 'ms';
            if (cb) {
                cb();
            }
        }
    }
};
var getSpeed = function getSpeed(opt) {
    var lastPos = opt.lastPos;
    var lastSpeeds = opt.lastSpeeds;
    var aveSpeed = opt.aveSpeed;
    var curPos = document.body.getBoundingClientRect().top;
    var speed = lastPos - curPos;
    if (lastSpeeds.length < 10) {
        lastSpeeds.push(speed);
    } else {
        lastSpeeds.shift();
        lastSpeeds.push(speed);
    }
    var sumSpeed = 0;
    lastSpeeds.forEach(function (speed) {
        sumSpeed += speed;
    });
    aveSpeed = Math.abs(sumSpeed / lastSpeeds.length);
    lastPos = curPos;
    return {
        lastPos: lastPos,
        lastSpeeds: lastSpeeds,
        aveSpeed: aveSpeed
    };
};
var compareSrc = function compareSrc(src, newSrc) {
    if (src.replace(/^http:/, '').replace(/^https:/, '').match(newSrc.replace(/^http:/, '').replace(/^https:/, ''))) {
        return true;
    } else return false;
};

var lazyload = {
    install: function install(Vue, _options) {
        if (_options) {
            for (var key in _options) {
                options[key] = _options[key];
            }
        }
        Vue.directive('lazyload', {
            inserted: function inserted(el, binding, vnode, oldVnode) {
                if (!el) return;
                if (compareSrc(el.src, binding.value)) return;
                if (options.fade) el.style.opacity = 0;
                if (!el.src) {
                    el.src = 'data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                }
                var speed = {
                    lastPos: document.body.getBoundingClientRect().top,
                    lastSpeeds: [],
                    aveSpeed: 0
                };
                el.newSrc = binding.value;
                var computeBySpeed = function computeBySpeed() {
                    if (!el.newSrc || el.newSrc === el.src) return;
                    speed = getSpeed(speed);
                    if (speed.aveSpeed > options.speed) return;
                    compute(el, options.time);
                };
                var onScrollEnd = function onScrollEnd() {
                    if (!el.newSrc || el.newSrc === el.src) return;
                    compute(el, options.time);
                };
                el.onload = function () {
                    el.onload = new Function();
                    el.onerror = new Function();
                    compute(el, options.time);
                    window.addEventListener('scroll', computeBySpeed);
                    window.addEventListener('scrollEnd', onScrollEnd);
                };
                el.onerror = function () {
                    el.onload = new Function();
                    el.onerror = new Function();
                    window.removeEventListener('scroll', computeBySpeed);
                    window.removeEventListener('scrollEnd', onScrollEnd);
                };
                //compute(el, options.time)
            },
            update: function update(el, binding) {
                if (compareSrc(el.src, binding.value)) return;
                el.style.opacity = 0;
                el.style.transition = 'opacity ' + options.time / 2 + 'ms';
                el.newSrc = binding.value;
                setTimeout(function () {
                    compute(el, options.time / 2);
                }, 150);
            }
        });
    }
};

module.exports = lazyload;

/***/ })
/******/ ]);
});