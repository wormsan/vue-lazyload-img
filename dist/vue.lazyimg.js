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

var _scrollEnd = __webpack_require__(1);

var _scrollEnd2 = _interopRequireDefault(_scrollEnd);

var _Set = __webpack_require__(2);

var _Set2 = _interopRequireDefault(_Set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrollListeners = new _Set2.default();
var scrollEndListeners = new _Set2.default();

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

var compute = function compute(el, time, cb) {
    var rect = el.getBoundingClientRect();
    if ((rect.bottom >= 0 && rect.bottom <= window.screen.height || rect.top >= 0 && rect.top <= window.screen.height) && (rect.right >= 0 && rect.right <= window.screen.width || rect.left >= 0 && rect.left <= window.screen.width)) {
        if (el.src != el.newSrc && !!el.newSrc) {
            el.src = el.newSrc;
            el.onload = function () {
                el.style.opacity = '1';
                el.onload = new Function();
                scrollListeners.delete(el.__scrollListener__);
                scrollEndListeners.delete(el.__scrollEndListener__);
                el.__scrollListener__ = null;
                el.__scrollEndListener__ = null;
            };
            el.style.transition = 'opacity ' + time + 'ms';
            if (cb) {
                cb();
            }
        }
    }
};
var getSpeed = function getSpeed(_ref) {
    var lastPos = _ref.lastPos,
        lastSpeeds = _ref.lastSpeeds,
        aveSpeed = _ref.aveSpeed;

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
    install: function install(Vue, _ref2) {
        var _ref2$time = _ref2.time,
            time = _ref2$time === undefined ? 300 : _ref2$time,
            _ref2$fade = _ref2.fade,
            fade = _ref2$fade === undefined ? false : _ref2$fade,
            _ref2$speed = _ref2.speed,
            speed = _ref2$speed === undefined ? 0 : _ref2$speed;

        if (speed > 0) (0, _scrollEnd2.default)();
        Vue.directive('lazyload', {
            inserted: function inserted(el, binding, vnode, oldVnode) {
                if (!el) return;
                if (compareSrc(el.src, binding.value)) return;
                if (fade) el.style.opacity = 0;
                if (!el.src) {
                    el.src = 'data:image/gifbase64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                }
                var speedInfo = {
                    lastPos: document.body.getBoundingClientRect().top,
                    lastSpeeds: [],
                    aveSpeed: 0
                };
                el.newSrc = binding.value;
                var computeBySpeed = function computeBySpeed() {
                    if (!el.newSrc || el.newSrc === el.src) return;
                    if (speed == 0) {
                        compute(el, time);
                        return;
                    }
                    speedInfo = getSpeed(speedInfo);
                    if (speedInfo.aveSpeed > speed) return;
                    compute(el, time);
                };
                var onScrollEnd = function onScrollEnd() {
                    if (!el.newSrc || el.newSrc === el.src) return;
                    compute(el, time);
                };
                el.__scrollListener__ = computeBySpeed;
                el.__scrollEndListener__ = onScrollEnd;
                el.onload = function () {
                    el.onload = new Function();
                    el.removeEventListener('error', onError);
                    compute(el, time);
                    scrollListeners.add(computeBySpeed);
                    if (speed > 0) scrollEndListeners.add(onScrollEnd);
                };
                function onError() {
                    el.onload = new Function();
                    el.removeEventListener('error', onError);
                    scrollListeners.delete(computeBySpeed);
                    scrollEndListeners.delete(onScrollEnd);
                }
                el.addEventListener('error', onError);
                // setTimeout(function(){
                //     compute(el, time)
                // })
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// simple Set
var cid = 0;

var Set = function () {
    function Set() {
        _classCallCheck(this, Set);

        this._map = {};
    }

    _createClass(Set, [{
        key: "add",
        value: function add(obj) {
            obj.__cid__ = cid;
            cid++;
            this._map[obj.__cid__] = obj;
        }
    }, {
        key: "delete",
        value: function _delete(obj) {
            if (obj && obj.__cid__ && this._map.hasOwnProperty(obj.__cid__)) delete this._map[obj.__cid__];
        }
    }, {
        key: "forEach",
        value: function forEach(cb) {
            for (var key in this._map) {
                if (this._map.hasOwnProperty(key)) {
                    cb(this._map[key]);
                }
            }
        }
    }]);

    return Set;
}();

exports.default = Set;

/***/ })
/******/ ]);
});