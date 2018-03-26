(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define(["Vue"], factory);
	else if(typeof exports === 'object')
		exports["Lazyload"] = factory(require("Vue"));
	else
		root["Lazyload"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scrollEnd = __webpack_require__(2);

var _scrollEnd2 = _interopRequireDefault(_scrollEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    install: function install(Vue, _ref) {
        var _ref$time = _ref.time,
            time = _ref$time === undefined ? 300 : _ref$time,
            _ref$fade = _ref.fade,
            fade = _ref$fade === undefined ? false : _ref$fade,
            _ref$speed = _ref.speed,
            speed = _ref$speed === undefined ? 20 : _ref$speed;

        Vue.directive('lazyload', {
            inserted: function inserted(el, binding, vnode, oldVnode) {
                if (!el) return;
                if (compareSrc(el.src, binding.value)) return;
                if (fade) el.style.opacity = 0;
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
                    if (speed.aveSpeed > speed) return;
                    compute(el, time);
                };
                var onScrollEnd = function onScrollEnd() {
                    if (!el.newSrc || el.newSrc === el.src) return;
                    compute(el, time);
                };
                el.onload = function () {
                    el.onload = new Function();
                    el.removeEventListener('error', onError);
                    compute(el, time);
                    window.addEventListener('scroll', computeBySpeed);
                    window.addEventListener('scrollEnd', onScrollEnd);
                };
                function onError() {
                    el.onload = new Function();
                    el.removeEventListener('error', onError);
                    window.removeEventListener('scroll', computeBySpeed);
                    window.removeEventListener('scrollEnd', onScrollEnd);
                }
                el.addEventListener('error', onError);
                setTimeout(function () {
                    compute(el, time);
                });
            },
            update: function update(el, binding) {
                if (compareSrc(el.src, binding.value)) return;
                el.style.opacity = 0;
                el.style.transition = 'opacity ' + time / 2 + 'ms';
                el.newSrc = binding.value;
                setTimeout(function () {
                    compute(el, time / 2);
                }, 150);
            }
        });
    }
};

exports.default = lazyload;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
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

if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    } else {
        window.requestAnimationFrame = function (cb) {
            setTimeout(function () {
                cb();
            }, 1000 / 60);
        };
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vue = __webpack_require__(1);
var Lazyload = __webpack_require__(0);

Vue.use(Lazyload, {
    //ms
    time: 200,
    fade: true,
    nohori: false
});
var a = new Vue({
    el: '#app',
    template: document.querySelector('#template').innerHTML,
    data: {
        imgs: ['./images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg', './images/5.jpg',
        // 'http://ee/images/5.jpg',
        './images/6.jpg', './images/7.jpg', './images/8.jpg']
    }
});
console.log(a);

/***/ })
/******/ ]);
});