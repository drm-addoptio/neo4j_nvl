"use strict";
(self["webpackChunknvl_boilerplate_plainjs_webpack"] = self["webpackChunknvl_boilerplate_plainjs_webpack"] || []).push([[2],{

/***/ 382:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPlanEventEnabled: () => (/* binding */ isPlanEventEnabled)
/* harmony export */ });
/**
 * Determines whether a track event is allowed to be sent based on the
 * user's tracking plan.
 * If the user does not have a tracking plan or the event is allowed based
 * on the tracking plan configuration, returns true.
 */
function isPlanEventEnabled(plan, planEvent) {
    var _a, _b;
    // Always prioritize the event's `enabled` status
    if (typeof (planEvent === null || planEvent === void 0 ? void 0 : planEvent.enabled) === 'boolean') {
        return planEvent.enabled;
    }
    // Assume absence of a tracking plan means events are enabled
    return (_b = (_a = plan === null || plan === void 0 ? void 0 : plan.__default) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : true;
}
//# sourceMappingURL=is-plan-event-enabled.js.map

/***/ }),

/***/ 381:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LegacyDestination: () => (/* binding */ LegacyDestination),
/* harmony export */   ajsDestinations: () => (/* binding */ ajsDestinations)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(260);
/* harmony import */ var _segment_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(318);
/* harmony import */ var _segment_facade__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_segment_facade__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_connection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(271);
/* harmony import */ var _core_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(273);
/* harmony import */ var _core_context__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(280);
/* harmony import */ var _core_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(272);
/* harmony import */ var _segment_analytics_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(302);
/* harmony import */ var _lib_is_plan_event_enabled__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(382);
/* harmony import */ var _lib_merged_options__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(347);
/* harmony import */ var _lib_p_while__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(344);
/* harmony import */ var _lib_priority_queue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(295);
/* harmony import */ var _lib_priority_queue_persisted__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(294);
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(353);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(383);
/* harmony import */ var _segment_analytics_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(270);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(384);
/* harmony import */ var _core_stats_metric_helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(354);
/* harmony import */ var _segment_analytics_generic_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(355);

















function flushQueue(xt, queue) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
        var failedQueue;
        var _this = this;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failedQueue = [];
                    if ((0,_core_connection__WEBPACK_IMPORTED_MODULE_2__.isOffline)()) {
                        return [2 /*return*/, queue];
                    }
                    return [4 /*yield*/, (0,_lib_p_while__WEBPACK_IMPORTED_MODULE_3__.pWhile)(function () { return queue.length > 0 && (0,_core_connection__WEBPACK_IMPORTED_MODULE_2__.isOnline)(); }, function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(_this, void 0, void 0, function () {
                            var ctx, result, success;
                            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ctx = queue.pop();
                                        if (!ctx) {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, (0,_segment_analytics_core__WEBPACK_IMPORTED_MODULE_4__.attempt)(ctx, xt)];
                                    case 1:
                                        result = _a.sent();
                                        success = result instanceof _core_context__WEBPACK_IMPORTED_MODULE_5__.Context;
                                        if (!success) {
                                            failedQueue.push(ctx);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                        // re-add failed tasks
                    ];
                case 1:
                    _a.sent();
                    // re-add failed tasks
                    failedQueue.map(function (failed) { return queue.pushWithBackoff(failed); });
                    return [2 /*return*/, queue];
            }
        });
    });
}
var LegacyDestination = /** @class */ (function () {
    function LegacyDestination(name, version, writeKey, settings, options, integrationSource) {
        if (settings === void 0) { settings = {}; }
        var _this = this;
        this.options = {};
        this.type = 'destination';
        this.middleware = [];
        this.initializePromise = (0,_segment_analytics_generic_utils__WEBPACK_IMPORTED_MODULE_6__.createDeferred)();
        this.flushing = false;
        this.name = name;
        this.version = version;
        this.settings = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, settings);
        this.disableAutoISOConversion = options.disableAutoISOConversion || false;
        this.integrationSource = integrationSource;
        // AJS-Renderer sets an extraneous `type` setting that clobbers
        // existing type defaults. We need to remove it if it's present
        if (this.settings['type'] && this.settings['type'] === 'browser') {
            delete this.settings['type'];
        }
        this.initializePromise.promise.then(function (isInitialized) { return (_this._initialized = isInitialized); }, function () { });
        this.options = options;
        this.buffer = options.disableClientPersistence
            ? new _lib_priority_queue__WEBPACK_IMPORTED_MODULE_7__.PriorityQueue(4, [])
            : new _lib_priority_queue_persisted__WEBPACK_IMPORTED_MODULE_8__.PersistedPriorityQueue(4, "".concat(writeKey, ":dest-").concat(name));
        this.scheduleFlush();
    }
    LegacyDestination.prototype.isLoaded = function () {
        return !!this._ready;
    };
    LegacyDestination.prototype.ready = function () {
        var _this = this;
        return this.initializePromise.promise.then(function () { var _a; return (_a = _this.onReady) !== null && _a !== void 0 ? _a : Promise.resolve(); });
    };
    LegacyDestination.prototype.load = function (ctx, analyticsInstance) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            var integrationSource, _b;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this._ready || this.onReady !== undefined) {
                            return [2 /*return*/];
                        }
                        if (!((_a = this.integrationSource) !== null && _a !== void 0)) return [3 /*break*/, 1];
                        _b = _a;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, (0,_loader__WEBPACK_IMPORTED_MODULE_9__.loadIntegration)(ctx, this.name, this.version, this.options.obfuscate)];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        integrationSource = _b;
                        this.integration = (0,_loader__WEBPACK_IMPORTED_MODULE_9__.buildIntegration)(integrationSource, this.settings, analyticsInstance);
                        this.onReady = new Promise(function (resolve) {
                            var onReadyFn = function () {
                                _this._ready = true;
                                resolve(true);
                            };
                            _this.integration.once('ready', onReadyFn);
                        });
                        this.integration.on('initialize', function () {
                            _this.initializePromise.resolve(true);
                        });
                        try {
                            (0,_core_stats_metric_helpers__WEBPACK_IMPORTED_MODULE_10__.recordIntegrationMetric)(ctx, {
                                integrationName: this.name,
                                methodName: 'initialize',
                                type: 'classic',
                            });
                            this.integration.initialize();
                        }
                        catch (error) {
                            (0,_core_stats_metric_helpers__WEBPACK_IMPORTED_MODULE_10__.recordIntegrationMetric)(ctx, {
                                integrationName: this.name,
                                methodName: 'initialize',
                                type: 'classic',
                                didError: true,
                            });
                            this.initializePromise.resolve(false);
                            throw error;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LegacyDestination.prototype.unload = function (_ctx, _analyticsInstance) {
        return (0,_loader__WEBPACK_IMPORTED_MODULE_9__.unloadIntegration)(this.name, this.version, this.options.obfuscate);
    };
    LegacyDestination.prototype.addMiddleware = function () {
        var _a;
        var fn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fn[_i] = arguments[_i];
        }
        this.middleware = (_a = this.middleware).concat.apply(_a, fn);
    };
    LegacyDestination.prototype.shouldBuffer = function (ctx) {
        return (
        // page events can't be buffered because of destinations that automatically add page views
        ctx.event.type !== 'page' &&
            ((0,_core_connection__WEBPACK_IMPORTED_MODULE_2__.isOffline)() || this._ready !== true || this._initialized !== true));
    };
    LegacyDestination.prototype.send = function (ctx, clz, eventType) {
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            var plan, ev, planEvent, afterMiddleware, event, err_1;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.shouldBuffer(ctx)) {
                            this.buffer.push(ctx);
                            this.scheduleFlush();
                            return [2 /*return*/, ctx];
                        }
                        plan = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.plan) === null || _b === void 0 ? void 0 : _b.track;
                        ev = ctx.event.event;
                        if (plan && ev && this.name !== 'Segment.io') {
                            planEvent = plan[ev];
                            if (!(0,_lib_is_plan_event_enabled__WEBPACK_IMPORTED_MODULE_11__.isPlanEventEnabled)(plan, planEvent)) {
                                ctx.updateEvent('integrations', (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, ctx.event.integrations), { All: false, 'Segment.io': true }));
                                ctx.cancel(new _core_context__WEBPACK_IMPORTED_MODULE_12__.ContextCancelation({
                                    retry: false,
                                    reason: "Event ".concat(ev, " disabled for integration ").concat(this.name, " in tracking plan"),
                                    type: 'Dropped by plan',
                                }));
                            }
                            else {
                                ctx.updateEvent('integrations', (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, ctx.event.integrations), planEvent === null || planEvent === void 0 ? void 0 : planEvent.integrations));
                            }
                            if ((planEvent === null || planEvent === void 0 ? void 0 : planEvent.enabled) && (planEvent === null || planEvent === void 0 ? void 0 : planEvent.integrations[this.name]) === false) {
                                ctx.cancel(new _core_context__WEBPACK_IMPORTED_MODULE_12__.ContextCancelation({
                                    retry: false,
                                    reason: "Event ".concat(ev, " disabled for integration ").concat(this.name, " in tracking plan"),
                                    type: 'Dropped by plan',
                                }));
                            }
                        }
                        return [4 /*yield*/, (0,_middleware__WEBPACK_IMPORTED_MODULE_13__.applyDestinationMiddleware)(this.name, ctx.event, this.middleware)];
                    case 1:
                        afterMiddleware = _c.sent();
                        if (afterMiddleware === null) {
                            return [2 /*return*/, ctx];
                        }
                        event = new clz(afterMiddleware, {
                            traverse: !this.disableAutoISOConversion,
                        });
                        (0,_core_stats_metric_helpers__WEBPACK_IMPORTED_MODULE_10__.recordIntegrationMetric)(ctx, {
                            integrationName: this.name,
                            methodName: eventType,
                            type: 'classic',
                        });
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 5, , 6]);
                        if (!this.integration) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.integration.invoke.call(this.integration, eventType, event)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _c.sent();
                        (0,_core_stats_metric_helpers__WEBPACK_IMPORTED_MODULE_10__.recordIntegrationMetric)(ctx, {
                            integrationName: this.name,
                            methodName: eventType,
                            type: 'classic',
                            didError: true,
                        });
                        throw err_1;
                    case 6: return [2 /*return*/, ctx];
                }
            });
        });
    };
    LegacyDestination.prototype.track = function (ctx) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                return [2 /*return*/, this.send(ctx, _segment_facade__WEBPACK_IMPORTED_MODULE_0__.Track, 'track')];
            });
        });
    };
    LegacyDestination.prototype.page = function (ctx) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (((_a = this.integration) === null || _a === void 0 ? void 0 : _a._assumesPageview) && !this._initialized) {
                            this.integration.initialize();
                        }
                        return [4 /*yield*/, this.initializePromise.promise];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, this.send(ctx, _segment_facade__WEBPACK_IMPORTED_MODULE_0__.Page, 'page')];
                }
            });
        });
    };
    LegacyDestination.prototype.identify = function (ctx) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                return [2 /*return*/, this.send(ctx, _segment_facade__WEBPACK_IMPORTED_MODULE_0__.Identify, 'identify')];
            });
        });
    };
    LegacyDestination.prototype.alias = function (ctx) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                return [2 /*return*/, this.send(ctx, _segment_facade__WEBPACK_IMPORTED_MODULE_0__.Alias, 'alias')];
            });
        });
    };
    LegacyDestination.prototype.group = function (ctx) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                return [2 /*return*/, this.send(ctx, _segment_facade__WEBPACK_IMPORTED_MODULE_0__.Group, 'group')];
            });
        });
    };
    LegacyDestination.prototype.scheduleFlush = function () {
        var _this = this;
        if (this.flushing) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        setTimeout(function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(_this, void 0, void 0, function () {
            var _a;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if ((0,_core_connection__WEBPACK_IMPORTED_MODULE_2__.isOffline)() || this._ready !== true || this._initialized !== true) {
                            this.scheduleFlush();
                            return [2 /*return*/];
                        }
                        this.flushing = true;
                        _a = this;
                        return [4 /*yield*/, flushQueue(this, this.buffer)];
                    case 1:
                        _a.buffer = _b.sent();
                        this.flushing = false;
                        if (this.buffer.todo > 0) {
                            this.scheduleFlush();
                        }
                        return [2 /*return*/];
                }
            });
        }); }, Math.random() * 5000);
    };
    return LegacyDestination;
}());

function ajsDestinations(writeKey, settings, globalIntegrations, options, routingMiddleware, legacyIntegrationSources) {
    var _a, _b;
    if (globalIntegrations === void 0) { globalIntegrations = {}; }
    if (options === void 0) { options = {}; }
    if ((0,_core_environment__WEBPACK_IMPORTED_MODULE_14__.isServer)()) {
        return [];
    }
    if (settings.plan) {
        options = options !== null && options !== void 0 ? options : {};
        options.plan = settings.plan;
    }
    var routingRules = (_b = (_a = settings.middlewareSettings) === null || _a === void 0 ? void 0 : _a.routingRules) !== null && _b !== void 0 ? _b : [];
    var remoteIntegrationsConfig = settings.integrations;
    var localIntegrationsConfig = options.integrations;
    // merged remote CDN settings with user provided options
    var integrationOptions = (0,_lib_merged_options__WEBPACK_IMPORTED_MODULE_15__.mergedOptions)(settings, options !== null && options !== void 0 ? options : {});
    var adhocIntegrationSources = legacyIntegrationSources === null || legacyIntegrationSources === void 0 ? void 0 : legacyIntegrationSources.reduce(function (acc, integrationSource) {
        var _a;
        return ((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, acc), (_a = {}, _a[(0,_loader__WEBPACK_IMPORTED_MODULE_9__.resolveIntegrationNameFromSource)(integrationSource)] = integrationSource, _a)));
    }, {});
    var installableIntegrations = new Set((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], Object.keys(remoteIntegrationsConfig).filter(function (name) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_16__.isInstallableIntegration)(name, remoteIntegrationsConfig[name]);
    }), true), Object.keys(adhocIntegrationSources || {}).filter(function (name) {
        return (0,_segment_analytics_core__WEBPACK_IMPORTED_MODULE_17__.isPlainObject)(remoteIntegrationsConfig[name]) ||
            (0,_segment_analytics_core__WEBPACK_IMPORTED_MODULE_17__.isPlainObject)(localIntegrationsConfig === null || localIntegrationsConfig === void 0 ? void 0 : localIntegrationsConfig[name]);
    }), true));
    return Array.from(installableIntegrations)
        .filter(function (name) { return !(0,_utils__WEBPACK_IMPORTED_MODULE_16__.isDisabledIntegration)(name, globalIntegrations); })
        .map(function (name) {
        var integrationSettings = remoteIntegrationsConfig[name];
        var version = (0,_loader__WEBPACK_IMPORTED_MODULE_9__.resolveVersion)(integrationSettings);
        var destination = new LegacyDestination(name, version, writeKey, integrationOptions[name], options, adhocIntegrationSources === null || adhocIntegrationSources === void 0 ? void 0 : adhocIntegrationSources[name]);
        var routing = routingRules.filter(function (rule) { return rule.destinationName === name; });
        if (routing.length > 0 && routingMiddleware) {
            destination.addMiddleware(routingMiddleware);
        }
        return destination;
    });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 383:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildIntegration: () => (/* binding */ buildIntegration),
/* harmony export */   loadIntegration: () => (/* binding */ loadIntegration),
/* harmony export */   resolveIntegrationNameFromSource: () => (/* binding */ resolveIntegrationNameFromSource),
/* harmony export */   resolveVersion: () => (/* binding */ resolveVersion),
/* harmony export */   unloadIntegration: () => (/* binding */ unloadIntegration)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(260);
/* harmony import */ var _lib_parse_cdn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(262);
/* harmony import */ var _lib_load_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(352);



function normalizeName(name) {
    return name.toLowerCase().replace('.', '').replace(/\s+/g, '-');
}
function obfuscatePathName(pathName, obfuscate) {
    if (obfuscate === void 0) { obfuscate = false; }
    return obfuscate ? btoa(pathName).replace(/=/g, '') : undefined;
}
function resolveIntegrationNameFromSource(integrationSource) {
    return ('Integration' in integrationSource
        ? integrationSource.Integration
        : integrationSource).prototype.name;
}
function recordLoadMetrics(fullPath, ctx, name) {
    var _a, _b;
    try {
        var metric = ((_b = (_a = window === null || window === void 0 ? void 0 : window.performance) === null || _a === void 0 ? void 0 : _a.getEntriesByName(fullPath, 'resource')) !== null && _b !== void 0 ? _b : [])[0];
        // we assume everything that took under 100ms is cached
        metric &&
            ctx.stats.gauge('legacy_destination_time', Math.round(metric.duration), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([
                name
            ], (metric.duration < 100 ? ['cached'] : []), true));
    }
    catch (_) {
        // not available
    }
}
function buildIntegration(integrationSource, integrationSettings, analyticsInstance) {
    var integrationCtr;
    // GA and Appcues use a different interface to instantiating integrations
    if ('Integration' in integrationSource) {
        var analyticsStub = {
            user: function () { return analyticsInstance.user(); },
            addIntegration: function () { },
        };
        integrationSource(analyticsStub);
        integrationCtr = integrationSource.Integration;
    }
    else {
        integrationCtr = integrationSource;
    }
    var integration = new integrationCtr(integrationSettings);
    integration.analytics = analyticsInstance;
    return integration;
}
function loadIntegration(ctx, name, version, obfuscate) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var pathName, obfuscatedPathName, path, fullPath, err_1, deps;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pathName = normalizeName(name);
                    obfuscatedPathName = obfuscatePathName(pathName, obfuscate);
                    path = (0,_lib_parse_cdn__WEBPACK_IMPORTED_MODULE_1__.getNextIntegrationsURL)();
                    fullPath = "".concat(path, "/integrations/").concat(obfuscatedPathName !== null && obfuscatedPathName !== void 0 ? obfuscatedPathName : pathName, "/").concat(version, "/").concat(obfuscatedPathName !== null && obfuscatedPathName !== void 0 ? obfuscatedPathName : pathName, ".dynamic.js.gz");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0,_lib_load_script__WEBPACK_IMPORTED_MODULE_2__.loadScript)(fullPath)];
                case 2:
                    _a.sent();
                    recordLoadMetrics(fullPath, ctx, name);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    ctx.stats.gauge('legacy_destination_time', -1, ["plugin:".concat(name), "failed"]);
                    throw err_1;
                case 4:
                    deps = window["".concat(pathName, "Deps")];
                    return [4 /*yield*/, Promise.all(deps.map(function (dep) { return (0,_lib_load_script__WEBPACK_IMPORTED_MODULE_2__.loadScript)(path + dep + '.gz'); }))
                        // @ts-ignore
                    ];
                case 5:
                    _a.sent();
                    // @ts-ignore
                    window["".concat(pathName, "Loader")]();
                    return [2 /*return*/, window[
                        // @ts-ignore
                        "".concat(pathName, "Integration")]];
            }
        });
    });
}
function unloadIntegration(name, version, obfuscate) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var path, pathName, obfuscatedPathName, fullPath;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_a) {
            path = (0,_lib_parse_cdn__WEBPACK_IMPORTED_MODULE_1__.getNextIntegrationsURL)();
            pathName = normalizeName(name);
            obfuscatedPathName = obfuscatePathName(name, obfuscate);
            fullPath = "".concat(path, "/integrations/").concat(obfuscatedPathName !== null && obfuscatedPathName !== void 0 ? obfuscatedPathName : pathName, "/").concat(version, "/").concat(obfuscatedPathName !== null && obfuscatedPathName !== void 0 ? obfuscatedPathName : pathName, ".dynamic.js.gz");
            return [2 /*return*/, (0,_lib_load_script__WEBPACK_IMPORTED_MODULE_2__.unloadScript)(fullPath)];
        });
    });
}
function resolveVersion(integrationConfig) {
    var _a, _b, _c, _d;
    return ((_d = (_b = (_a = integrationConfig === null || integrationConfig === void 0 ? void 0 : integrationConfig.versionSettings) === null || _a === void 0 ? void 0 : _a.override) !== null && _b !== void 0 ? _b : (_c = integrationConfig === null || integrationConfig === void 0 ? void 0 : integrationConfig.versionSettings) === null || _c === void 0 ? void 0 : _c.version) !== null && _d !== void 0 ? _d : 'latest');
}
//# sourceMappingURL=loader.js.map

/***/ }),

/***/ 384:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDisabledIntegration: () => (/* binding */ isDisabledIntegration),
/* harmony export */   isInstallableIntegration: () => (/* binding */ isInstallableIntegration)
/* harmony export */ });
var isInstallableIntegration = function (name, integrationSettings) {
    var _a;
    var type = integrationSettings.type, bundlingStatus = integrationSettings.bundlingStatus, versionSettings = integrationSettings.versionSettings;
    // We use `!== 'unbundled'` (versus `=== 'bundled'`) to be inclusive of
    // destinations without a defined value for `bundlingStatus`
    var deviceMode = bundlingStatus !== 'unbundled' &&
        (type === 'browser' || ((_a = versionSettings === null || versionSettings === void 0 ? void 0 : versionSettings.componentTypes) === null || _a === void 0 ? void 0 : _a.includes('browser')));
    // checking for iterable is a quick fix we need in place to prevent
    // errors showing Iterable as a failed destiantion. Ideally, we should
    // fix the Iterable metadata instead, but that's a longer process.
    return !name.startsWith('Segment') && name !== 'Iterable' && deviceMode;
};
var isDisabledIntegration = function (integrationName, globalIntegrations) {
    var allDisableAndNotDefined = globalIntegrations.All === false &&
        globalIntegrations[integrationName] === undefined;
    return (globalIntegrations[integrationName] === false || allDisableAndNotDefined);
};
//# sourceMappingURL=utils.js.map

/***/ })

}]);