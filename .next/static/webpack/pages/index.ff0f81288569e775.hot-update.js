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

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/components/AppBar */ \"./src/components/AppBar.tsx\");\n/* harmony import */ var _components_Statistics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/components/Statistics */ \"./src/components/Statistics.tsx\");\n/* harmony import */ var _data_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/data/api */ \"./src/data/api.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst MainPage = ()=>{\n    _s();\n    const { data, isLoading } = (0,_data_api__WEBPACK_IMPORTED_MODULE_4__.useIRCCData)(true);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Canada PR Statistics\"\n                }, void 0, false, {\n                    fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                    lineNumber: 12,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                lineNumber: 11,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col sm:m-1 md:mx-6 justify-start items-center grow gap-y-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AppBar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                        lineNumber: 15,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col w-full grow gap-8\",\n                        children: [\n                            !isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Statistics__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                isLoading: isLoading,\n                                data: data\n                            }, void 0, false, {\n                                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                                lineNumber: 17,\n                                columnNumber: 36\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex grow items-center justify-center\",\n                                children: isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"flex justify-center items-center \",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                                            className: \"animate-spin -ml-1 mr-3 h-8 w-8 text-blue-800\",\n                                            xmlns: \"http://www.w3.org/2000/svg\",\n                                            fill: \"none\",\n                                            viewBox: \"0 0 24 24\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"circle\", {\n                                                    className: \"opacity-25\",\n                                                    cx: \"12\",\n                                                    cy: \"12\",\n                                                    r: \"10\",\n                                                    stroke: \"currentColor\",\n                                                    strokeWidth: \"4\"\n                                                }, void 0, false, {\n                                                    fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                                                    lineNumber: 22,\n                                                    columnNumber: 37\n                                                }, undefined),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                                    className: \"opacity-75\",\n                                                    fill: \"currentColor\",\n                                                    d: \"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"\n                                                }, void 0, false, {\n                                                    fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                                                    lineNumber: 23,\n                                                    columnNumber: 37\n                                                }, undefined)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                                            lineNumber: 21,\n                                            columnNumber: 33\n                                        }, undefined),\n                                        \" Loading\"\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                                    lineNumber: 20,\n                                    columnNumber: 29\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                                lineNumber: 18,\n                                columnNumber: 21\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                        lineNumber: 16,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/pages/index.tsx\",\n                lineNumber: 14,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_s(MainPage, \"/lEDCWdjM0GKTIjW3gtddFOTOYk=\", false, function() {\n    return [\n        _data_api__WEBPACK_IMPORTED_MODULE_4__.useIRCCData\n    ];\n});\n_c = MainPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainPage);\nvar _c;\n$RefreshReg$(_c, \"MainPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBNkI7QUFDWTtBQUNRO0FBQ1I7QUFFekMsTUFBTUksV0FBVzs7SUFDYixNQUFNLEVBQUVDLElBQUksRUFBRUMsU0FBUyxFQUFFLEdBQUdILHNEQUFXQSxDQUFDO0lBRXhDLHFCQUNJOzswQkFDSSw4REFBQ0gsa0RBQUlBOzBCQUNELDRFQUFDTzs4QkFBTTs7Ozs7Ozs7Ozs7MEJBRVgsOERBQUNDO2dCQUFJQyxXQUFVOztrQ0FDWCw4REFBQ1IsMERBQU1BOzs7OztrQ0FDUCw4REFBQ087d0JBQUlDLFdBQVU7OzRCQUNWLENBQUNILDJCQUFhLDhEQUFDSiw4REFBVUE7Z0NBQUNJLFdBQVdBO2dDQUFXRCxNQUFNQTs7Ozs7OzBDQUN2RCw4REFBQ0c7Z0NBQUlDLFdBQVU7MENBQ1ZILDJCQUNHLDhEQUFDSTtvQ0FBS0QsV0FBVTs7c0RBQ1osOERBQUNFOzRDQUFJRixXQUFVOzRDQUFnREcsT0FBTTs0Q0FBNkJDLE1BQUs7NENBQU9DLFNBQVE7OzhEQUNsSCw4REFBQ0M7b0RBQU9OLFdBQVU7b0RBQWFPLElBQUc7b0RBQUtDLElBQUc7b0RBQUtDLEdBQUU7b0RBQUtDLFFBQU87b0RBQWVDLGFBQVk7Ozs7Ozs4REFDeEYsOERBQUNDO29EQUFLWixXQUFVO29EQUFhSSxNQUFLO29EQUFlUyxHQUFFOzs7Ozs7Ozs7Ozs7d0NBQ2pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVN0QztHQTNCTWxCOztRQUMwQkQsa0RBQVdBOzs7S0FEckNDO0FBOEJOLCtEQUFlQSxRQUFRQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9pbmRleC50c3g/MTlhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgQXBwQmFyIGZyb20gXCJ+L2NvbXBvbmVudHMvQXBwQmFyXCI7XG5pbXBvcnQgU3RhdGlzdGljcyBmcm9tIFwifi9jb21wb25lbnRzL1N0YXRpc3RpY3NcIjtcbmltcG9ydCB7IHVzZUlSQ0NEYXRhIH0gZnJvbSBcIn4vZGF0YS9hcGlcIjtcblxuY29uc3QgTWFpblBhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBpc0xvYWRpbmcgfSA9IHVzZUlSQ0NEYXRhKHRydWUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDx0aXRsZT5DYW5hZGEgUFIgU3RhdGlzdGljczwvdGl0bGU+XG4gICAgICAgICAgICA8L0hlYWQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206bS0xIG1kOm14LTYganVzdGlmeS1zdGFydCBpdGVtcy1jZW50ZXIgZ3JvdyBnYXAteS00XCI+XG4gICAgICAgICAgICAgICAgPEFwcEJhciAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCB3LWZ1bGwgZ3JvdyBnYXAtOFwiPlxuICAgICAgICAgICAgICAgICAgICB7IWlzTG9hZGluZyAmJiA8U3RhdGlzdGljcyBpc0xvYWRpbmc9e2lzTG9hZGluZ30gZGF0YT17ZGF0YX0gLz59XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBncm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzTG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiYW5pbWF0ZS1zcGluIC1tbC0xIG1yLTMgaC04IHctOCB0ZXh0LWJsdWUtODAwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJvcGFjaXR5LTI1XCIgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjRcIj48L2NpcmNsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzTmFtZT1cIm9wYWNpdHktNzVcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00IDEyYTggOCAwIDAxOC04VjBDNS4zNzMgMCAwIDUuMzczIDAgMTJoNHptMiA1LjI5MUE3Ljk2MiA3Ljk2MiAwIDAxNCAxMkgwYzAgMy4wNDIgMS4xMzUgNS44MjQgMyA3LjkzOGwzLTIuNjQ3elwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+IExvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICApO1xuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IE1haW5QYWdlOyJdLCJuYW1lcyI6WyJIZWFkIiwiQXBwQmFyIiwiU3RhdGlzdGljcyIsInVzZUlSQ0NEYXRhIiwiTWFpblBhZ2UiLCJkYXRhIiwiaXNMb2FkaW5nIiwidGl0bGUiLCJkaXYiLCJjbGFzc05hbWUiLCJzcGFuIiwic3ZnIiwieG1sbnMiLCJmaWxsIiwidmlld0JveCIsImNpcmNsZSIsImN4IiwiY3kiLCJyIiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJwYXRoIiwiZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n"));

/***/ })

});