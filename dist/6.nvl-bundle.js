"use strict";
(self["webpackChunknvl_boilerplate_plainjs_webpack"] = self["webpackChunknvl_boilerplate_plainjs_webpack"] || []).push([[6],{

/***/ 389:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryString: () => (/* binding */ queryString)
/* harmony export */ });
/* harmony import */ var _pickPrefix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(390);
/* harmony import */ var _gracefulDecodeURIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(349);
/* harmony import */ var _segment_analytics_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(270);



function queryString(analytics, query) {
    var a = document.createElement('a');
    a.href = query;
    var parsed = a.search.slice(1);
    var params = parsed.split('&').reduce(function (acc, str) {
        var _a = str.split('='), k = _a[0], v = _a[1];
        acc[k] = (0,_gracefulDecodeURIComponent__WEBPACK_IMPORTED_MODULE_0__.gracefulDecodeURIComponent)(v);
        return acc;
    }, {});
    var calls = [];
    var ajs_uid = params.ajs_uid, ajs_event = params.ajs_event, ajs_aid = params.ajs_aid;
    var _a = (0,_segment_analytics_core__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(analytics.options.useQueryString)
        ? analytics.options.useQueryString
        : {}, _b = _a.aid, aidPattern = _b === void 0 ? /.+/ : _b, _c = _a.uid, uidPattern = _c === void 0 ? /.+/ : _c;
    if (ajs_aid) {
        var anonId = Array.isArray(params.ajs_aid)
            ? params.ajs_aid[0]
            : params.ajs_aid;
        if (aidPattern.test(anonId)) {
            analytics.setAnonymousId(anonId);
        }
    }
    if (ajs_uid) {
        var uid = Array.isArray(params.ajs_uid)
            ? params.ajs_uid[0]
            : params.ajs_uid;
        if (uidPattern.test(uid)) {
            var traits = (0,_pickPrefix__WEBPACK_IMPORTED_MODULE_2__.pickPrefix)('ajs_trait_', params);
            calls.push(analytics.identify(uid, traits));
        }
    }
    if (ajs_event) {
        var event_1 = Array.isArray(params.ajs_event)
            ? params.ajs_event[0]
            : params.ajs_event;
        var props = (0,_pickPrefix__WEBPACK_IMPORTED_MODULE_2__.pickPrefix)('ajs_prop_', params);
        calls.push(analytics.track(event_1, props));
    }
    return Promise.all(calls);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pickPrefix: () => (/* binding */ pickPrefix)
/* harmony export */ });
/**
 * Returns an object containing only the properties prefixed by the input
 * string.
 * Ex: prefix('ajs_traits_', { ajs_traits_address: '123 St' })
 * will return { address: '123 St' }
 **/
function pickPrefix(prefix, object) {
    return Object.keys(object).reduce(function (acc, key) {
        if (key.startsWith(prefix)) {
            var field = key.substr(prefix.length);
            acc[field] = object[key];
        }
        return acc;
    }, {});
}
//# sourceMappingURL=pickPrefix.js.map

/***/ })

}]);