webpackJsonp([0],{

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_lazy_scss__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_lazy_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_lazy_scss__);


/* harmony default export */ __webpack_exports__["default"] = ('Hello from lazy');

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(41)(true);
// imports


// module
exports.push([module.i, "body {\n  color: blue; }\n", "", {"version":3,"sources":["/Users/frankface/WebpackWS/webpack-demo/app/styles/lazy.scss"],"names":[],"mappings":"AAAA;EACE,YAAW,EACZ","file":"lazy.scss","sourcesContent":["body {\n  color: blue;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(39)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/style-loader/index.js!../../node_modules/css-loader/index.js??ref--2-3!../../node_modules/postcss-loader/lib/index.js??ref--2-4!../../node_modules/sass-loader/lib/loader.js??ref--2-5!./lazy.scss", function() {
			var newContent = require("!!../../node_modules/style-loader/index.js!../../node_modules/css-loader/index.js??ref--2-3!../../node_modules/postcss-loader/lib/index.js??ref--2-4!../../node_modules/sass-loader/lib/loader.js??ref--2-5!./lazy.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(39)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true}!../../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true,\"importLoaders\":2}!../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./lazy.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true}!../../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true,\"importLoaders\":2}!../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./lazy.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});