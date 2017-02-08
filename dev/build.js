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

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _index = __webpack_require__(2);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_index2.default);
	_vue2.default.use(_index2.default);

	//let imgList = ["http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg"];
	var imgList = ["http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg"];

	var App = new _vue2.default({
	    el: '#app',
	    template: '\n        <div style="height:1000px">\n            <img :src="\'http://desk.fd.zol-img.com.cn/t_s960x600c5/g4/M00/0D/01/Cg-4y1ULoXCII6fEAAeQFx3fsKgAAXCmAPjugYAB5Av166.jpg\'" \n                v-lazyload = "item"\n                v-for = "item in imgList"></img>\n        </div>\n    ',
	    data: function data() {
	        return {
	            imgList: imgList,
	            msg: 'not updated'
	        };
	    },
	    mounted: function mounted() {
	        var _this = this;

	        console.log('mounted');
	        this.$watch('img', function (v) {
	            console.log('aa', v);
	        });
	        setTimeout(function () {
	            _this.msg = 'update';
	            _this.imgList = ['http://gfs6.gomein.net.cn/T1HoxTB5E_1RCvBVdK'];
	            //this.$set('imgList','0','http://gfs6.gomein.net.cn/T1HoxTB5E_1RCvBVdK')
	            //this.imgList = ["http://gfs6.gomein.net.cn/T1HoxTB5E_1RCvBVdK","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg"];
	            // this.imgList = ["http://gfs6.gomein.net.cn/T1HoxTB5E_1RCvBVdK","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg","http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg"];
	            // console.log(this.imgList)
	        }, 2000);
	    },
	    updated: function updated() {
	        console.log('update');
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Filter = __webpack_require__(3);

	var _Filter2 = _interopRequireDefault(_Filter);

	var _scrollEnd = __webpack_require__(6);

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
/* 3 */
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
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

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
	                global.dispatchEvent(scrollEnd);
	                cntr = lastCntr;
	            }
	        }
	        requestAnimationFrame(enterFrame);
	    }
	    global.requestAnimationFrame(enterFrame);
	    global.addEventListener('scroll', function () {
	        lastCntr = cntr;
	        diff = 0;
	        cntr++;
	    });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;