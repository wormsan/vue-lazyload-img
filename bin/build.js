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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Filter = __webpack_require__(1);

	var _Filter2 = _interopRequireDefault(_Filter);

	var _scrollEnd = __webpack_require__(2);

	var _scrollEnd2 = _interopRequireDefault(_scrollEnd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _scrollEnd2.default)();
	var compute = function compute(el, time, cb) {
	    var rect = el.getBoundingClientRect();
	    if (rect.bottom >= 0 && rect.top <= window.screen.height && rect.right > 0 && rect.left < window.screen.width) {
	        if (el.src != el.newSrc && !!el.newSrc) {
	            el.src = el.newSrc;
	            el.style.opacity = '1';
	            el.style.transition = !time ? 'opacity .3s' : 'opacity ' + time;
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

	var lazyload = {
	    install: function install(Vue, options) {
	        Vue.directive('lazyload', {
	            inserted: function inserted(el, binding, vnode, oldVnode) {
	                if (!el) return;
	                el.style.opacity = 0;
	                if (!el.src) {
	                    el.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
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
	                    if (speed.aveSpeed > 10) return;
	                    compute(el);
	                };
	                var onScrollEnd = function onScrollEnd() {
	                    if (!el.newSrc || el.newSrc === el.src) return;
	                    compute(el);
	                };
	                var onload = function onload() {
	                    compute(el);
	                    el.removeEventListener('load', onload);
	                    window.addEventListener('scroll', computeBySpeed);
	                    window.addEventListener('scrollEnd', onScrollEnd);
	                };
	                el.addEventListener('load', onload);
	            },
	            update: function update(el, binding) {
	                if (el.src === binding.value) return;
	                el.style.opacity = 0;
	                el.style.transition = 'opacity .15s';
	                el.newSrc = binding.value;
	                setTimeout(function () {
	                    compute(el, '.15');
	                }, 150);
	            }
	        });
	    }
	};
	exports.default = lazyload;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    'product': {
	        matches: [{
	            'range': {
	                'start': 0,
	                'end': 320
	            },
	            'resolution': '_260'
	        }, {
	            'range': {
	                'start': 320,
	                'end': 414
	            },
	            'resolution': '_360'
	        }, {
	            'range': {
	                'start': 414,
	                'end': Number.MAX_VALUE
	            },
	            'resolution': '_400'
	        }],
	        rule: {
	            'regex': /\/.[^\/_]+(_\d*)+\.(bmp|jpg|jpeg|gif|png|webp)$/,
	            'pos': '$1'
	        }
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var cntr = 0;
	    var lastCntr = 0;
	    var diff = 0;
	    var scrollEnd = document.createEvent('HTMLEvents');
	    scrollEnd.initEvent('scrollEnd');
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

/***/ }
/******/ ])
});
;