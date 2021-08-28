/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(14);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// import VueJsonPretty from 'vue-json-pretty';

window.adminCards = {
    basePath: '/admin-cards'
};

Nova.booting(function (Vue, router, store) {
    Vue.component('component-loading', __webpack_require__(3));

    Vue.component('supervisor-status', __webpack_require__(6));

    // Vue.component('admin-cards-stats', require('./components/Cards/Stats'));
    // Vue.component('admin-cards-workload', require('./components/Cards/Workload'));
    // Vue.component('admin-cards-pending-jobs', require('./components/Cards/PendingJobs'));
    // Vue.component('admin-cards-completed-jobs', require('./components/Cards/CompletedJobs'));
    // Vue.component('admin-cards-failed-jobs', require('./components/Cards/FailedJobs'));
    //
    // Vue.component('admin-cards-jobs-per-minute', require('./components/Cards/JobsPerMinute'));
    // Vue.component('admin-cards-recent-jobs-count', require('./components/Cards/RecentJobsCount'));
    // Vue.component('admin-cards-failed-jobs-count', require('./components/Cards/FailedJobsCount'));
    // Vue.component('admin-cards-status', require('./components/Cards/Status'));
    // Vue.component('admin-cards-total-processes', require('./components/Cards/TotalProcesses'));
    // Vue.component('admin-cards-max-wait-time', require('./components/Cards/MaxWaitTime'));
    // Vue.component('admin-cards-max-runtime', require('./components/Cards/maxRuntime'));
    // Vue.component('admin-cards-max-throughput', require('./components/Cards/MaxThroughput'));
    //
    // Vue.component('admin-cards-stack-trace', require('./components/StackTrace'));
    // Vue.component('admin-cards-json-pretty', VueJsonPretty);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(5)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Material/Loading.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15b946c2", Component.options)
  } else {
    hotAPI.reload("data-v-15b946c2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "p-8 border-t-2 rounded-b-lg border-gray-300 text-center bg-gray-100 flex items-center justify-center"
    },
    [
      _c(
        "svg",
        {
          staticClass: "spin mr-2 w-8 fill-primary",
          attrs: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }
        },
        [
          _c("path", {
            attrs: {
              d:
                "M12 10a2 2 0 0 1-3.41 1.41A2 2 0 0 1 10 8V0a9.97 9.97 0 0 1 10 10h-8zm7.9 1.41A10 10 0 1 1 8.59.1v2.03a8 8 0 1 0 9.29 9.29h2.02zm-4.07 0a6 6 0 1 1-7.25-7.25v2.1a3.99 3.99 0 0 0-1.4 6.57 4 4 0 0 0 6.56-1.42h2.1z"
            }
          })
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-15b946c2", module.exports)
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(7)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(12)
/* template */
var __vue_template__ = __webpack_require__(13)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-984eb01e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Cards/SupervisorStatus.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-984eb01e", Component.options)
  } else {
    hotAPI.reload("data-v-984eb01e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("29ae2eb4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-984eb01e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SupervisorStatus.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-984eb01e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SupervisorStatus.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "\n.p-8[data-v-984eb01e] {\n    padding: 2rem;\n}\n.bg-gray-100[data-v-984eb01e] {\n    background: #f7fafc;\n}\n.border-gray-300[data-v-984eb01e] {\n    border-color: #e2e8f0;\n}\n.title[data-v-984eb01e] {\n    font-size: 1rem;\n}\n.blink[data-v-984eb01e] {\n    animation: blink-animation-data-v-984eb01e 1s steps(5, start) infinite;\n    -webkit-animation: blink-animation-data-v-984eb01e 1s steps(5, start) infinite;\n    background-color: #dc3545 !important;\n    color: white;\n}\n@keyframes blink-animation-data-v-984eb01e {\nto {\n        visibility: hidden;\n}\n}\n@-webkit-keyframes blink-animation-data-v-984eb01e {\nto {\n        visibility: hidden;\n}\n}\n.service-status[data-v-984eb01e] {\n    width: 20px;\n    background-color: rgb(90, 230, 172);\n    display: inline-block;\n    border-radius: 1px;\n    padding: 10px;\n    margin: 5px;\n    border-radius: 50%;\n}\n.supervisor-status[data-v-984eb01e] {\n    width: 100px;\n    display: inline-block;\n    border-radius: 1px;\n    padding: 10px;\n    margin: 5px;\n    border-radius: 8px;\n}\n.runnig[data-v-984eb01e] {\n    background-color: rgb(90, 230, 172) !important;\n}\n.stop[data-v-984eb01e] {\n    background-color: #dc3545 !important;\n}\n.starting[data-v-984eb01e] {\n    background-color: #f3d618 !important;\n}\n.btn[data-v-984eb01e] {\n    border-radius: 8px;\n    text-align: center;\n    font-weight: normal;\n    padding: 10px;\n    margin: 0 10px;\n    outline: none !important;\n}\n.btn-success[data-v-984eb01e] {\n    background-color: rgb(90, 230, 172);\n}\n.btn-success[data-v-984eb01e]:hover:enabled {\n    background-color: green;\n}\n.btn-danger[data-v-984eb01e] {\n    background-color: #dc3545;\n}\n.btn-danger[data-v-984eb01e]:hover:enabled {\n    background-color: #840000;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(11)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            disableButton: false,
            microservices: {},
            ready: false
        };
    },
    mounted: function mounted() {
        var _this = this;

        this.getMicroservices();
        this.interval = setInterval(function () {
            _this.getMicroservices();
        }, 15000);
    },
    beforeDestroy: function beforeDestroy() {
        clearInterval(this.interval);
    },

    methods: {
        capitalizeFirstLetter: function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        startSupervisor: function startSupervisor(microservice) {
            var _this2 = this;

            this.disableButton = true;
            Nova.request().get("/admin-cards/supervisor/start/" + microservice).then(function (response) {
                _this2.disableButton = false;
                if (response.data.status === 200) {
                    _this2.$toasted.show(response.data.message, { type: "success" });
                } else {
                    _this2.$toasted.show(response.data.message, { type: "error" });
                }
            }).catch(function (error) {
                _this2.disableButton = false;
                _this2.$toasted.show("خطای ناشناس", { type: "error" });
            });
        },
        restartSupervisor: function restartSupervisor(microservice) {
            var _this3 = this;

            this.disableButton = true;
            Nova.request().get("/admin-cards/supervisor/restart/" + microservice).then(function (response) {
                _this3.disableButton = false;
                if (response.data.status === 200) {
                    _this3.$toasted.show(response.data.message, { type: "success" });
                } else {
                    _this3.$toasted.show(response.data.message, { type: "error" });
                }
            }).catch(function (error) {
                _this3.disableButton = false;
                _this3.$toasted.show("خطای ناشناس", { type: "error" });
            });
        },
        stopSupervisor: function stopSupervisor(microservice) {
            var _this4 = this;

            this.disableButton = true;
            Nova.request().get("/admin-cards/supervisor/stop/" + microservice).then(function (response) {
                _this4.disableButton = false;
                if (response.data.status === 200) {
                    _this4.$toasted.show(response.data.message, { type: "success" });
                } else {
                    _this4.$toasted.show(response.data.message, { type: "error" });
                }
            }).catch(function (error) {
                _this4.disableButton = false;
                _this4.$toasted.show("خطای ناشناس", { type: "error" });
            });
        },
        getMicroservices: function getMicroservices() {
            var _this5 = this;

            Nova.request().get('/admin-cards/supervisors').then(function (response) {
                _this5.microservices = response.data.microservices;
                _this5.ready = true;
                // this.models = response.data.models;
                // this.getErrorsChart();
            });
        }
    }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "card",
    [
      _c("div", { staticClass: "flex items-center justify-between p-3" }, [
        _c("h5", { staticClass: "text-base text-80 font-bold" }, [
          _vm._v("وضعیت Supervisor ها")
        ])
      ]),
      _vm._v(" "),
      !_vm.ready ? _c("component-loading") : _vm._e(),
      _vm._v(" "),
      _vm.ready
        ? _c("table", { staticClass: "table w-full" }, [
            _c("thead", [
              _c("tr", [
                _c("th", { attrs: { scope: "col" } }, [_vm._v("میکروسرویس")]),
                _vm._v(" "),
                _c("th", { attrs: { scope: "col" } }, [_vm._v("وضعیت سرویس")]),
                _vm._v(" "),
                _c("th", { attrs: { scope: "col" } }, [
                  _vm._v("وضعیت Supervisor")
                ]),
                _vm._v(" "),
                _c("th", { attrs: { scope: "col" } }, [
                  _vm._v("عملیات Supervisor")
                ])
              ])
            ]),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.microservices, function(microservice) {
                return _c("tr", [
                  _c("td", { staticStyle: { "text-align": "center" } }, [
                    _vm._v(
                      _vm._s(
                        _vm.capitalizeFirstLetter(
                          microservice.name.replace("ml_", "")
                        )
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", { staticStyle: { "text-align": "center" } }, [
                    _c(
                      "div",
                      {
                        class: [
                          "service-status",
                          { blink: !microservice.status }
                        ]
                      },
                      [
                        _c("div", {
                          staticStyle: {
                            "text-align": "center",
                            "text-transform": "capitalize",
                            "font-weight": "bold"
                          }
                        })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", { staticStyle: { "text-align": "center" } }, [
                    _c(
                      "div",
                      {
                        class: [
                          "supervisor-status",
                          {
                            blink:
                              microservice["supervisor"]["statename"] ===
                                "FATAL" ||
                              microservice["supervisor"]["statename"] ===
                                "BACKOFF" ||
                              microservice["supervisor"]["statename"] ===
                                "NOT FOUND"
                          },
                          {
                            starting:
                              microservice["supervisor"]["statename"] ===
                                "STARTING" ||
                              microservice["supervisor"]["statename"] ===
                                "STOPPED"
                          },
                          {
                            runnig:
                              microservice["supervisor"]["statename"] ===
                              "RUNNING"
                          }
                        ]
                      },
                      [
                        microservice["supervisor"] == []
                          ? _c(
                              "div",
                              { staticStyle: { "text-align": "center" } },
                              [
                                _vm._v(
                                  "\n                        یافت نشد\n                    "
                                )
                              ]
                            )
                          : _c(
                              "div",
                              { staticStyle: { "text-align": "center" } },
                              [
                                _vm._v(
                                  "\n                        " +
                                    _vm._s(
                                      microservice["supervisor"]["statename"]
                                    ) +
                                    "\n                    "
                                )
                              ]
                            )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", { staticStyle: { "text-align": "center" } }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-success",
                        attrs: { disabled: _vm.disableButton },
                        on: {
                          click: function($event) {
                            return _vm.startSupervisor(microservice.name)
                          }
                        }
                      },
                      [_vm._v("Start\n                ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-success",
                        attrs: { disabled: _vm.disableButton },
                        on: {
                          click: function($event) {
                            return _vm.restartSupervisor(microservice.name)
                          }
                        }
                      },
                      [_vm._v("Restart\n                ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-danger",
                        attrs: { disabled: _vm.disableButton },
                        on: {
                          click: function($event) {
                            return _vm.stopSupervisor(microservice.name)
                          }
                        }
                      },
                      [_vm._v("\n                    Stop\n                ")]
                    )
                  ])
                ])
              }),
              0
            )
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-984eb01e", module.exports)
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);