webpackJsonp([1],{

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function () {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Hello World';

  //console.log(lazy.default);
  var element = document.createElement('div');
  element.innerHTML = text;

  element.onclick = function () {
    __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 40)).then(function (lazy) {
      element.textContent = lazy.default;
      return lazy.default;
    }).catch(function (err) {
      console.error(err);
    });
  };

  return element;
});

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_purecss__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_purecss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_purecss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component__ = __webpack_require__(18);



//import './styles/main.scss';


document.body.appendChild(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__component__["a" /* default */])());

/***/ })

},[21]);