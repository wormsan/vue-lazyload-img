(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Lazyload"] = factory();
	else
		root["Lazyload"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Lazyload = __webpack_require__(1);

exports.default = Lazyload;


module.exports = Lazyload.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var scrollEnd_1 = __webpack_require__(2);
var Set_1 = __webpack_require__(3);
var scrollListeners = new Set_1["default"];
var scrollEndListeners = new Set_1["default"];
var screenHeight = document.documentElement;
window.addEventListener('scroll', function (e) {
    scrollListeners.forEach(function (listener) {
        listener();
    });
}, true);
window.addEventListener('scrollEnd', function (e) {
    scrollEndListeners.forEach(function (listener) {
        listener();
    });
}, true);
var compute = function (el, time, preload, cb) {
    if (preload === void 0) { preload = 0; }
    if (cb === void 0) { cb = function () { }; }
    var rect = el.getBoundingClientRect();
    if (((rect.bottom >= 0 - preload && rect.bottom <= window.screen.height + preload)
        || (rect.top >= 0 - preload && rect.top <= window.screen.height + preload))
        && ((rect.right >= 0 && rect.right <= window.screen.width)
            || (rect.left >= 0 && rect.left <= window.screen.width))) {
        if (el.src != el.newSrc && !!el.newSrc) {
            el.src = el.newSrc;
            el.onload = function () {
                el.style.opacity = '1';
                el.onload = function () { };
                scrollListeners["delete"](el.__scrollListener__);
                scrollEndListeners["delete"](el.__scrollEndListener__);
                el.__scrollListener__ = null;
                el.__scrollEndListener__ = null;
            };
            el.style.transition = "opacity " + time + "ms";
            cb();
        }
    }
};
var getSpeed = function (_a) {
    var lastPos = _a.lastPos, lastSpeeds = _a.lastSpeeds, aveSpeed = _a.aveSpeed;
    var clientRect = document.body.getBoundingClientRect();
    var curPos = clientRect.top;
    var speed = lastPos - curPos;
    if (lastSpeeds.length < 10) {
        lastSpeeds.push(speed);
    }
    else {
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
var compareSrc = function (src, newSrc) {
    if (src.replace(/^http:/, '').replace(/^https:/, '').match(newSrc.replace(/^http:/, '').replace(/^https:/, '')))
        return true;
    else
        return false;
};
var Lazyload = {
    install: function (Vue, _a) {
        var _b = _a.time, time = _b === void 0 ? 300 : _b, _c = _a.fade, fade = _c === void 0 ? false : _c, _d = _a.speed, speed = _d === void 0 ? 0 : _d, _e = _a.preload, preload = _e === void 0 ? 0 : _e;
        if (speed > 0)
            scrollEnd_1["default"]();
        Vue.directive('lazyload', {
            inserted: function (el, binding, vnode, oldVnode) {
                if (!el)
                    return;
                if (compareSrc(el.src, binding.value))
                    return;
                if (fade)
                    el.style.opacity = '0';
                if (!el.src) {
                    el.src = 'data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                }
                var speedInfo = {
                    lastPos: document.body.getBoundingClientRect().top,
                    lastSpeeds: [],
                    aveSpeed: 0
                };
                el.newSrc = binding.value;
                var computeBySpeed = function () {
                    if (!el.newSrc || el.newSrc === el.src)
                        return;
                    if (speed == 0) {
                        compute(el, time, preload);
                        return;
                    }
                    speedInfo = getSpeed(speedInfo);
                    if (speedInfo.aveSpeed > speed)
                        return;
                    compute(el, time, preload);
                };
                var onScrollEnd = function () {
                    if (!el.newSrc || el.newSrc === el.src)
                        return;
                    compute(el, time, preload);
                };
                el.__scrollListener__ = computeBySpeed;
                el.__scrollEndListener__ = onScrollEnd;
                el.onload = function () {
                    el.onload = function () { };
                    el.removeEventListener('error', onError);
                    compute(el, time, preload);
                    scrollListeners.add(computeBySpeed);
                    if (speed > 0)
                        scrollEndListeners.add(onScrollEnd);
                };
                function onError() {
                    el.onload = function () { };
                    el.removeEventListener('error', onError);
                    scrollListeners["delete"](computeBySpeed);
                    scrollEndListeners["delete"](onScrollEnd);
                }
                el.addEventListener('error', onError);
            },
            update: function (el, binding) {
                if (compareSrc(el.src, binding.value))
                    return;
                el.style.opacity = '0';
                el.style.transition = "opacity " + time / 2 + "ms";
                el.newSrc = binding.value;
                setTimeout(function () {
                    compute(el, time / 2, preload);
                }, 150);
            }
        });
    }
};
exports["default"] = Lazyload;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    }
    else {
        window.requestAnimationFrame = function requestAnimationFrame(cb) {
            setTimeout(function () {
                cb(0);
            }, 1000 / 60);
            return 0;
        };
    }
}
function default_1() {
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
}
exports["default"] = default_1;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var cid = 0;
var Set = (function () {
    function Set() {
        this._map = {};
    }
    Set.prototype.add = function (obj) {
        obj.__cid__ = cid;
        cid++;
        this._map[obj.__cid__] = obj;
    };
    Set.prototype["delete"] = function (obj) {
        if (obj && obj.__cid__ && this._map.hasOwnProperty(obj.__cid__))
            delete this._map[obj.__cid__];
    };
    Set.prototype.forEach = function (cb) {
        for (var key in this._map) {
            if (this._map.hasOwnProperty(key)) {
                cb(this._map[key]);
            }
        }
    };
    return Set;
}());
exports["default"] = Set;


/***/ })
/******/ ]);
});
//# sourceMappingURL=vue.lazyimg.js.map