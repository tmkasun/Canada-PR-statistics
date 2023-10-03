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

/***/ "./src/components/ProgramCard.tsx":
/*!****************************************!*\
  !*** ./src/components/ProgramCard.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ProgramCard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _data_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/data/consts */ \"./src/data/consts.ts\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _AppBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AppBar */ \"./src/components/AppBar.tsx\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dayjs/plugin/relativeTime */ \"./node_modules/dayjs/plugin/relativeTime.js\");\n/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var dayjs_plugin_calendar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dayjs/plugin/calendar */ \"./node_modules/dayjs/plugin/calendar.js\");\n/* harmony import */ var dayjs_plugin_calendar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_calendar__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dayjs/plugin/customParseFormat */ \"./node_modules/dayjs/plugin/customParseFormat.js\");\n/* harmony import */ var dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_8__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\ndayjs__WEBPACK_IMPORTED_MODULE_5___default().extend((dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_8___default()));\ndayjs__WEBPACK_IMPORTED_MODULE_5___default().extend((dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_6___default()));\ndayjs__WEBPACK_IMPORTED_MODULE_5___default().extend((dayjs_plugin_calendar__WEBPACK_IMPORTED_MODULE_7___default()));\nfunction ProgramCard(props) {\n    var _program, _program1, _program2, _program3, _program4, _program5;\n    _s();\n    const { program, lastValue, label, isLatest = false } = props;\n    const [isToolTipOpen, setIsToolTipOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative flex border-l-2 gap-y-4 first:rounded-l-lg last:rounded-r-lg first:border-none flex-col px-8 py-10 bg-gradient-to-br via-white to-white\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex  justify-between\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        href: _data_consts__WEBPACK_IMPORTED_MODULE_2__.DRAW_ENDPOINT + ((_program = program) === null || _program === void 0 ? void 0 : _program.drawNumber),\n                        target: \"_blank\",\n                        className: \"text-blue-600 font-semibold flex justify-center items-center gap-1\",\n                        children: [\n                            \"#\",\n                            (_program1 = program) === null || _program1 === void 0 ? void 0 : _program1.drawNumber,\n                            \" \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AppBar__WEBPACK_IMPORTED_MODULE_4__.IconExternalLink, {}, void 0, false, {\n                                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/ProgramCard.tsx\",\n                                lineNumber: 28,\n                                columnNumber: 44\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/ProgramCard.tsx\",\n                        lineNumber: 27,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \" flex gap-1\",\n                        children: [\n                            (_program2 = program) === null || _program2 === void 0 ? void 0 : _program2.drawDate,\n                            \" (\",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"highlightGreen\",\n                                children: dayjs__WEBPACK_IMPORTED_MODULE_5___default()((_program3 = program) === null || _program3 === void 0 ? void 0 : _program3.drawDate, [\n                                    \"YYYY-MM-DD\",\n                                    \"DD-MM-YYYY\"\n                                ]).fromNow()\n                            }, void 0, false, {\n                                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/ProgramCard.tsx\",\n                                lineNumber: 32,\n                                columnNumber: 21\n                            }, this),\n                            \")\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/ProgramCard.tsx\",\n                        lineNumber: 30,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/ProgramCard.tsx\",\n                lineNumber: 26,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                onMouseEnter: ()=>setIsToolTipOpen(true),\n                onMouseLeave: ()=>setIsToolTipOpen(false),\n                className: \"font-extrabold text-xl leading-[3rem] text-gray-950 block truncate cursor-help\",\n                children: (_program4 = program) === null || _program4 === void 0 ? void 0 : _program4.drawName\n            }, void 0, false, {\n                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/ProgramCard.tsx\",\n                lineNumber: 37,\n                columnNumber: 13\n            }, this),\n            isToolTipOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute bottom-2 bg-gray-950 text-white p-2 whitespace-nowrap rounded-lg\",\n                children: (_program5 = program) === null || _program5 === void 0 ? void 0 : _program5.drawName\n            }, void 0, false, {\n                fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/ProgramCard.tsx\",\n                lineNumber: 42,\n                columnNumber: 17\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/kasun/projects/Canada-PR-statistics/src/components/ProgramCard.tsx\",\n        lineNumber: 25,\n        columnNumber: 9\n    }, this);\n}\n_s(ProgramCard, \"cMdYN6pMYriVO8S+cRXMnDKP2bw=\");\n_c = ProgramCard;\nvar _c;\n$RefreshReg$(_c, \"ProgramCard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9Qcm9ncmFtQ2FyZC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNjO0FBQ3pCO0FBQ2U7QUFFbEI7QUFDMkI7QUFDUjtBQUNrQjtBQUUvREssbURBQVksQ0FBQ0csdUVBQWlCQTtBQUM5QkgsbURBQVksQ0FBQ0Msa0VBQVlBO0FBQ3pCRCxtREFBWSxDQUFDRSw4REFBUUE7QUFRTixTQUFTRyxZQUFZQyxLQUFpQjtRQU1UQyxVQUN0QkEsV0FHREEsV0FFVUEsV0FPNkVBLFdBRUFBOztJQXBCeEcsTUFBTSxFQUFFQSxPQUFPLEVBQUVDLFNBQVMsRUFBRUMsS0FBSyxFQUFFQyxXQUFXLEtBQUssRUFBRSxHQUFHSjtJQUN4RCxNQUFNLENBQUNLLGVBQWVDLGlCQUFpQixHQUFHaEIsK0NBQVFBLENBQUM7SUFDbkQscUJBQ0ksOERBQUNpQjtRQUFJQyxXQUFXOzswQkFDWiw4REFBQ0Q7Z0JBQUlDLFdBQVU7O2tDQUNYLDhEQUFDaEIsa0RBQUlBO3dCQUFDaUIsTUFBTWxCLHVEQUFhQSxLQUFHVSxXQUFBQSxxQkFBQUEsK0JBQUFBLFNBQVNTLFVBQVU7d0JBQUVDLFFBQU87d0JBQVNILFdBQVU7OzRCQUFxRTs2QkFDMUlQLFlBQUFBLHFCQUFBQSxnQ0FBQUEsVUFBU1MsVUFBVTs0QkFBQzswQ0FBQyw4REFBQ2pCLHFEQUFnQkE7Ozs7Ozs7Ozs7O2tDQUU1Qyw4REFBQ21CO3dCQUFLSixXQUFXOzs2QkFDWlAsWUFBQUEscUJBQUFBLGdDQUFBQSxVQUFTWSxRQUFROzRCQUFDOzBDQUNuQiw4REFBQ0Q7Z0NBQUtKLFdBQVU7MENBQ1hkLDRDQUFLQSxFQUFDTyxZQUFBQSxxQkFBQUEsZ0NBQUFBLFVBQVNZLFFBQVEsRUFBRTtvQ0FBQztvQ0FBYztpQ0FBYSxFQUFFQyxPQUFPOzs7Ozs7NEJBQzVEOzs7Ozs7Ozs7Ozs7OzBCQUdmLDhEQUFDQztnQkFDR0MsY0FBYyxJQUFNVixpQkFBaUI7Z0JBQ3JDVyxjQUFjLElBQU1YLGlCQUFpQjtnQkFDckNFLFdBQVU7MkJBQWtGUCxZQUFBQSxxQkFBQUEsZ0NBQUFBLFVBQVNpQixRQUFROzs7Ozs7WUFDaEhiLCtCQUNHLDhEQUFDRTtnQkFBSUMsV0FBVTsyQkFBNkVQLFlBQUFBLHFCQUFBQSxnQ0FBQUEsVUFBU2lCLFFBQVE7Ozs7Ozs7Ozs7OztBQUk3SDtHQXpCd0JuQjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9Qcm9ncmFtQ2FyZC50c3g/YWZkZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IERSQVdfRU5EUE9JTlQsIElSb3VuZCB9IGZyb20gXCJ+L2RhdGEvY29uc3RzXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyBJY29uRXh0ZXJuYWxMaW5rIH0gZnJvbSBcIi4vQXBwQmFyXCI7XG5cbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCByZWxhdGl2ZVRpbWUgZnJvbSBcImRheWpzL3BsdWdpbi9yZWxhdGl2ZVRpbWVcIjtcbmltcG9ydCBjYWxlbmRhciBmcm9tIFwiZGF5anMvcGx1Z2luL2NhbGVuZGFyXCI7XG5pbXBvcnQgY3VzdG9tUGFyc2VGb3JtYXQgZnJvbSBcImRheWpzL3BsdWdpbi9jdXN0b21QYXJzZUZvcm1hdFwiO1xuXG5kYXlqcy5leHRlbmQoY3VzdG9tUGFyc2VGb3JtYXQpO1xuZGF5anMuZXh0ZW5kKHJlbGF0aXZlVGltZSk7XG5kYXlqcy5leHRlbmQoY2FsZW5kYXIpO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0c0NhcmQge1xuICAgIHByb2dyYW06IElSb3VuZCB8IG51bGw7XG4gICAgbGFzdFZhbHVlPzogbnVtYmVyO1xuICAgIGxhYmVsOiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgaXNMYXRlc3Q/OiBib29sZWFuXG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9ncmFtQ2FyZChwcm9wczogSVN0YXRzQ2FyZCkge1xuICAgIGNvbnN0IHsgcHJvZ3JhbSwgbGFzdFZhbHVlLCBsYWJlbCwgaXNMYXRlc3QgPSBmYWxzZSB9ID0gcHJvcHM7XG4gICAgY29uc3QgW2lzVG9vbFRpcE9wZW4sIHNldElzVG9vbFRpcE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJlbGF0aXZlIGZsZXggYm9yZGVyLWwtMiBnYXAteS00IGZpcnN0OnJvdW5kZWQtbC1sZyBsYXN0OnJvdW5kZWQtci1sZyBmaXJzdDpib3JkZXItbm9uZSBmbGV4LWNvbCBweC04IHB5LTEwIGJnLWdyYWRpZW50LXRvLWJyIHZpYS13aGl0ZSB0by13aGl0ZVwifT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCAganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj17RFJBV19FTkRQT0lOVCArIHByb2dyYW0/LmRyYXdOdW1iZXJ9IHRhcmdldD1cIl9ibGFua1wiIGNsYXNzTmFtZT1cInRleHQtYmx1ZS02MDAgZm9udC1zZW1pYm9sZCBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAje3Byb2dyYW0/LmRyYXdOdW1iZXJ9IDxJY29uRXh0ZXJuYWxMaW5rIC8+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17XCIgZmxleCBnYXAtMVwifT5cbiAgICAgICAgICAgICAgICAgICAge3Byb2dyYW0/LmRyYXdEYXRlfSAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naGlnaGxpZ2h0R3JlZW4nPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RheWpzKHByb2dyYW0/LmRyYXdEYXRlLCBbXCJZWVlZLU1NLUREXCIsIFwiREQtTU0tWVlZWVwiXSkuZnJvbU5vdygpfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+KVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyXG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRJc1Rvb2xUaXBPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SXNUb29sVGlwT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1leHRyYWJvbGQgdGV4dC14bCBsZWFkaW5nLVszcmVtXSB0ZXh0LWdyYXktOTUwIGJsb2NrIHRydW5jYXRlIGN1cnNvci1oZWxwXCI+e3Byb2dyYW0/LmRyYXdOYW1lfTwvaDI+XG4gICAgICAgICAgICB7aXNUb29sVGlwT3BlbiAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMiBiZy1ncmF5LTk1MCB0ZXh0LXdoaXRlIHAtMiB3aGl0ZXNwYWNlLW5vd3JhcCByb3VuZGVkLWxnXCI+e3Byb2dyYW0/LmRyYXdOYW1lfTwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn0iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkRSQVdfRU5EUE9JTlQiLCJMaW5rIiwiSWNvbkV4dGVybmFsTGluayIsImRheWpzIiwicmVsYXRpdmVUaW1lIiwiY2FsZW5kYXIiLCJjdXN0b21QYXJzZUZvcm1hdCIsImV4dGVuZCIsIlByb2dyYW1DYXJkIiwicHJvcHMiLCJwcm9ncmFtIiwibGFzdFZhbHVlIiwibGFiZWwiLCJpc0xhdGVzdCIsImlzVG9vbFRpcE9wZW4iLCJzZXRJc1Rvb2xUaXBPcGVuIiwiZGl2IiwiY2xhc3NOYW1lIiwiaHJlZiIsImRyYXdOdW1iZXIiLCJ0YXJnZXQiLCJzcGFuIiwiZHJhd0RhdGUiLCJmcm9tTm93IiwiaDIiLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJkcmF3TmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/ProgramCard.tsx\n"));

/***/ })

});