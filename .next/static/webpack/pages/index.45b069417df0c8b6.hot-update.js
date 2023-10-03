"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/StatsCard.tsx":
/*!**************************************!*\
  !*** ./src/components/StatsCard.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ StatsCard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _DiffViewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DiffViewer */ \"./src/components/DiffViewer.tsx\");\n\n\n\nfunction StatsCard(props) {\n    const { value, lastValue, label, invert = false } = props;\n    let change = 0;\n    if (lastValue) {\n        change = value - lastValue;\n    }\n    const isPositive = change > 0;\n    const sign = change === 0 ? \"\" : isPositive ? \"+\" : \"-\";\n    const bgColor = sign === \"+\" ? \"from-green-100\" : sign === \"-\" && \"from-red-100\";\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex border-l-2 gap-y-4 first:rounded-l-lg last:rounded-r-lg first:border-none flex-col px-8 py-10 bg-gradient-to-br \".concat(bgColor, \" via-white to-white\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex  justify-between\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"text-gray-500 font-semibold \",\n                        children: label\n                    }, void 0, false, {\n                        fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/StatsCard.tsx\",\n                        lineNumber: 23,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"\".concat(sign === \"+\" ? \"text-green-600\" : sign === \"-\" && \"text-red-600\", \" flex gap-1\"),\n                        children: [\n                            \"\".concat(sign, \" \").concat(Math.abs(change)),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DiffViewer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                invert: invert,\n                                diff: change\n                            }, void 0, false, {\n                                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/StatsCard.tsx\",\n                                lineNumber: 28,\n                                columnNumber: 21\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/StatsCard.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/StatsCard.tsx\",\n                lineNumber: 22,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"font-extrabold text-4xl leading-6 text-gray-950\",\n                children: value\n            }, void 0, false, {\n                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/StatsCard.tsx\",\n                lineNumber: 31,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/StatsCard.tsx\",\n        lineNumber: 21,\n        columnNumber: 9\n    }, this);\n}\n_c = StatsCard;\nvar _c;\n$RefreshReg$(_c, \"StatsCard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9TdGF0c0NhcmQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMEI7QUFDWTtBQVF2QixTQUFTRSxVQUFVQyxLQUFpQjtJQUMvQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsU0FBUyxFQUFFQyxLQUFLLEVBQUVDLFNBQVMsS0FBSyxFQUFFLEdBQUdKO0lBQ3BELElBQUlLLFNBQVM7SUFDYixJQUFJSCxXQUFXO1FBQ1hHLFNBQVNKLFFBQVFDO0lBRXJCO0lBQ0EsTUFBTUksYUFBYUQsU0FBUztJQUM1QixNQUFNRSxPQUFPRixXQUFXLElBQUksS0FBS0MsYUFBYSxNQUFNO0lBQ3BELE1BQU1FLFVBQVVELFNBQVMsTUFBTSxtQkFBbUJBLFNBQVMsT0FBTztJQUNsRSxxQkFDSSw4REFBQ0U7UUFBSUMsV0FBVyx3SEFBZ0ksT0FBUkYsU0FBUTs7MEJBQzVJLDhEQUFDQztnQkFBSUMsV0FBVTs7a0NBQ1gsOERBQUNDO3dCQUFLRCxXQUFVO2tDQUNYUDs7Ozs7O2tDQUVMLDhEQUFDUTt3QkFBS0QsV0FBVyxHQUFvRSxPQUFqRUgsU0FBUyxNQUFNLG1CQUFtQkEsU0FBUyxPQUFPLGdCQUFlOzs0QkFDL0UsR0FBVUssT0FBUkwsTUFBSyxLQUFvQixPQUFqQkssS0FBS0MsR0FBRyxDQUFDUjswQ0FDckIsOERBQUNQLG1EQUFVQTtnQ0FBQ00sUUFBUUE7Z0NBQVFVLE1BQU1UOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBRzFDLDhEQUFDVTtnQkFBR0wsV0FBVTswQkFBbURUOzs7Ozs7Ozs7Ozs7QUFHN0U7S0F4QndCRiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9TdGF0c0NhcmQudHN4PzI1OWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IERpZmZWaWV3ZXIgZnJvbSBcIi4vRGlmZlZpZXdlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0c0NhcmQge1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgbGFzdFZhbHVlPzogbnVtYmVyO1xuICAgIGxhYmVsOiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgaW52ZXJ0PzogYm9vbGVhblxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RhdHNDYXJkKHByb3BzOiBJU3RhdHNDYXJkKSB7XG4gICAgY29uc3QgeyB2YWx1ZSwgbGFzdFZhbHVlLCBsYWJlbCwgaW52ZXJ0ID0gZmFsc2UgfSA9IHByb3BzO1xuICAgIGxldCBjaGFuZ2UgPSAwO1xuICAgIGlmIChsYXN0VmFsdWUpIHtcbiAgICAgICAgY2hhbmdlID0gdmFsdWUgLSBsYXN0VmFsdWU7XG5cbiAgICB9XG4gICAgY29uc3QgaXNQb3NpdGl2ZSA9IGNoYW5nZSA+IDA7XG4gICAgY29uc3Qgc2lnbiA9IGNoYW5nZSA9PT0gMCA/IFwiXCIgOiBpc1Bvc2l0aXZlID8gXCIrXCIgOiBcIi1cIjtcbiAgICBjb25zdCBiZ0NvbG9yID0gc2lnbiA9PT0gXCIrXCIgPyBcImZyb20tZ3JlZW4tMTAwXCIgOiBzaWduID09PSBcIi1cIiAmJiBcImZyb20tcmVkLTEwMFwiO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBib3JkZXItbC0yIGdhcC15LTQgZmlyc3Q6cm91bmRlZC1sLWxnIGxhc3Q6cm91bmRlZC1yLWxnIGZpcnN0OmJvcmRlci1ub25lIGZsZXgtY29sIHB4LTggcHktMTAgYmctZ3JhZGllbnQtdG8tYnIgJHtiZ0NvbG9yfSB2aWEtd2hpdGUgdG8td2hpdGVgfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCAganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCBmb250LXNlbWlib2xkIFwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YCR7c2lnbiA9PT0gXCIrXCIgPyBcInRleHQtZ3JlZW4tNjAwXCIgOiBzaWduID09PSBcIi1cIiAmJiBcInRleHQtcmVkLTYwMFwifSBmbGV4IGdhcC0xYH0+XG4gICAgICAgICAgICAgICAgICAgIHtgJHtzaWdufSAke01hdGguYWJzKGNoYW5nZSl9YH1cbiAgICAgICAgICAgICAgICAgICAgPERpZmZWaWV3ZXIgaW52ZXJ0PXtpbnZlcnR9IGRpZmY9e2NoYW5nZX0gLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LWV4dHJhYm9sZCB0ZXh0LTR4bCBsZWFkaW5nLTYgdGV4dC1ncmF5LTk1MFwiPnt2YWx1ZX08L2gyPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSJdLCJuYW1lcyI6WyJSZWFjdCIsIkRpZmZWaWV3ZXIiLCJTdGF0c0NhcmQiLCJwcm9wcyIsInZhbHVlIiwibGFzdFZhbHVlIiwibGFiZWwiLCJpbnZlcnQiLCJjaGFuZ2UiLCJpc1Bvc2l0aXZlIiwic2lnbiIsImJnQ29sb3IiLCJkaXYiLCJjbGFzc05hbWUiLCJzcGFuIiwiTWF0aCIsImFicyIsImRpZmYiLCJoMiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/StatsCard.tsx\n"));

/***/ })

});