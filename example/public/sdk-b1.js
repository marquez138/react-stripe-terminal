var StripeTerminal = function(e) {
    var t = {};
    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
        o.l = !0,
        o.exports
    }
    return n.m = e,
    n.c = t,
    n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }
    ,
    n.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "",
    n(n.s = 53)
}([function(e, t, n) {
    "use strict";
    var r;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        e.NO_ESTABLISHED_CONNECTION = "no_established_connection",
        e.INVALID_READER_SHAPE = "invalid_reader_shape",
        e.INVALID_PAYMENT_INTENT_CLIENT_SECRET = "invalid_reader_shape",
        e.INVALID_PAYMENT_INTENT_INPUT_SHAPE = "invalid_payment_intent_input_shape",
        e.NO_ACTIVE_COLLECT_PAYMENT_METHOD_ATTEMPT = "no_active_collect_payment_method_attempt",
        e.NO_ACTIVE_READ_SOURCE_ATTEMPT = "no_active_read_source_attempt",
        e.UNEXPECTED_INTENT_STATUS = "unexpected_intent_status",
        e.CANCELED = "canceled",
        e.CANCELED_BY_CUSTOMER = "canceled_by_customer",
        e.CANCELABLE_ALREADY_COMPLETED = "cancelable_already_completed",
        e.CANCELABLE_ALREADY_CANCELED = "cancelable_already_canceled",
        e.NETWORK_ERROR = "network_error",
        e.NETWORK_TIMEOUT = "network_timeout",
        e.READER_CONNECTION_INTERRUPTED = "reader_connection_interrupted",
        e.ALREADY_CONNECTED = "already_connected",
        e.AUTHENTICATION_ERROR = "authentication_error",
        e.INVALID_CONNECTION_TOKEN = "invalid_connection_token",
        e.FAILED_FETCH_CONNECTION_TOKEN = "failed_fetch_connection_token",
        e.DISCOVERY_ALREADY_RUNNING = "discovery_already_running",
        e.DISCOVERY_NOT_RUNNING = "discovery_not_running",
        e.INVALID_TYPE = "invalid_type",
        e.ILLEGAL_STATE = "illegal_state",
        e.INVALID_ARGUMENT = "invalid_argument",
        e.INVALID_ON_FETCH_CONNECTION_TOKEN = "invalid_on_fetch_connection_token",
        e.INVALID_ON_UNEXPECTED_READER_DISCONNECT = "invalid_on_unexpected_reader_disconnect",
        e.INVALID_ON_CONNECTION_STATUS_CHANGE = "invalid_on_connection_status_change",
        e.INVALID_ON_PAYMENT_STATUS_CHANGE = "invalid_on_payment_status_change",
        e.INVALID_READER_VERSION = "invalid_reader_version",
        e.JSON_RPC_PARSE_ERROR = "json_rpc_parse_error",
        e.READER_ERROR = "reader_error",
        e.RPC_ERROR = "rpc_error"
    }(r = t.ErrorCodes || (t.ErrorCodes = {})),
    function(e) {
        function t(t, n) {
            return e.CodeToMessageMap[t](n)
        }
        var n;
        e.CodeToMessageMap = ((n = {})[r.NO_ESTABLISHED_CONNECTION] = function() {
            return "No established connection to the Reader. Make sure \n            you `discoverReaders()` and then `connectReader()` to one of the resolved discovered readers. \n            You should not make any other calls to the SDK until the `connectReader()` response resolves without an error or until the connectionStatus changes to 'connected'."
        }
        ,
        n[r.INVALID_READER_SHAPE] = function() {
            return "This should be a reader from the results of the `discoverReaders()` method call."
        }
        ,
        n[r.INVALID_PAYMENT_INTENT_CLIENT_SECRET] = function() {
            return "Invalid `PaymentIntent` `client_secret`. This should be the `client_secret` field from the `PaymentIntent` associated with your checkout."
        }
        ,
        n[r.INVALID_PAYMENT_INTENT_INPUT_SHAPE] = function() {
            return "This should be the `PaymentIntent` object resolved from the `collectPaymentMethod()` method call."
        }
        ,
        n[r.NO_ACTIVE_COLLECT_PAYMENT_METHOD_ATTEMPT] = function() {
            return "`cancelCollectPaymentMethod()` cancels an active attempt to get a payment method from a customer. However, there was no active attempt."
        }
        ,
        n[r.NO_ACTIVE_READ_SOURCE_ATTEMPT] = function() {
            return "`cancelReadSource()` cancels an active attempt to get a payment method from a customer. However, there was no active attempt."
        }
        ,
        n[r.UNEXPECTED_INTENT_STATUS] = function(e) {
            return "You must provide a `PaymentIntent` object that has " + e.expectedState + " status but has status of " + e.intentStatus + ".\n            The expected lifecycle for a `PaymentIntent` is Create `PaymentIntent` on Backend -> `collectPaymentMethod()` -> `confirmPaymentIntent()`."
        }
        ,
        n[r.CANCELED_BY_CUSTOMER] = function(e) {
            e.actionName;
            return "Action canceled by customer."
        }
        ,
        n[r.CANCELED] = function() {
            return "Action canceled."
        }
        ,
        n[r.CANCELABLE_ALREADY_COMPLETED] = function() {
            return "Failed to cancel as action has already completed."
        }
        ,
        n[r.CANCELABLE_ALREADY_CANCELED] = function() {
            return "This action has already been canceled."
        }
        ,
        n[r.NETWORK_TIMEOUT] = function() {
            return "Network timed out! Check and ensure your browser is connected to the internet and has a stable connection."
        }
        ,
        n[r.READER_CONNECTION_INTERRUPTED] = function() {
            return "Error connecting to Reader. Ensure the device is on and connectable on the local network."
        }
        ,
        n[r.ALREADY_CONNECTED] = function() {
            return "Already have an active connection to a reader. Call `disconnectReader()` first."
        }
        ,
        n[r.AUTHENTICATION_ERROR] = function() {
            return "Detected Authentication Error. There may be an issue with the connection token or the `Reader` might have been hot swapped."
        }
        ,
        n[r.INVALID_CONNECTION_TOKEN] = function(e) {
            return "Invalid `ConnectionToken`. Expected Promise that resolves to pst_xxxxx. Resolved to " + e.token
        }
        ,
        n[r.FAILED_FETCH_CONNECTION_TOKEN] = function() {
            return "`onFetchConnectionToken` failure. Please make sure your function creates a new connection token via your backend."
        }
        ,
        n[r.DISCOVERY_ALREADY_RUNNING] = function() {
            return "Discovery is already running"
        }
        ,
        n[r.DISCOVERY_NOT_RUNNING] = function() {
            return "Discovery isn't running. Start discovery with `startDiscovery()`"
        }
        ,
        n[r.INVALID_TYPE] = function(e) {
            return "Invalid Type. Received " + e.actual + " but expected something of format: " + e.expectedType + ". " + e.typeDescription
        }
        ,
        n[r.ILLEGAL_STATE] = function(e) {
            return "Invalid State: " + e.msg
        }
        ,
        n[r.INVALID_ARGUMENT] = function(e) {
            return "Invalid Argument: " + e.msg
        }
        ,
        n[r.INVALID_ON_FETCH_CONNECTION_TOKEN] = function() {
            return "Invalid `onFetchConnectionToken` handler given.\n            You must pass a function that will retreive an connection token via your backend using your api secret key."
        }
        ,
        n[r.INVALID_ON_UNEXPECTED_READER_DISCONNECT] = function() {
            return "Invalid `onUnexpectedReaderDisconnect` handler given.\n            You must pass a function that will handle unexpected disconnects from a connected reader."
        }
        ,
        n[r.INVALID_ON_CONNECTION_STATUS_CHANGE] = function() {
            return "Invalid `onConnectionStatusChange` handler given.\n            You must pass a function that will accept an updated connection status as an argument."
        }
        ,
        n[r.INVALID_ON_PAYMENT_STATUS_CHANGE] = function() {
            return "Invalid `onPaymentStatusChange` handler given.\n            You must pass a function that will accept an updated payment status as an argument."
        }
        ,
        n[r.INVALID_READER_VERSION] = function() {
            return "Invalid Reader version. Please upgrade your device to use this version of the SDK"
        }
        ,
        n[r.JSON_RPC_PARSE_ERROR] = function(e) {
            return "Failed to parse json rpc content: " + e.content
        }
        ,
        n[r.NETWORK_ERROR] = function(e) {
            return "Unknown Network Error Occured: " + e.content
        }
        ,
        n[r.READER_ERROR] = function(e) {
            return "Reader Error: " + e.msg
        }
        ,
        n[r.RPC_ERROR] = function(e) {
            return "Rpc Error: " + e.msg
        }
        ,
        n),
        e.generateErrorMessage = t,
        e.generateError = function(e, n) {
            return {
                code: e.toLowerCase(),
                message: t(e, n)
            }
        }
    }(t.ErrorTemplates || (t.ErrorTemplates = {}))
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), i = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
    , c = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function(e) {
        function t(n) {
            var r = e.call(this, n.message) || this;
            return r.error = n,
            Object.setPrototypeOf(r, t.prototype),
            r
        }
        return o(t, e),
        t.prototype.toExposedError = function() {
            return this.error
        }
        ,
        t
    }(Error);
    function s(e) {
        return i(this, void 0, void 0, function() {
            var t;
            return c(this, function(n) {
                switch (n.label) {
                case 0:
                    return n.trys.push([0, 2, , 3]),
                    [4, e()];
                case 1:
                    return [2, n.sent()];
                case 2:
                    if ((t = n.sent())instanceof a)
                        return [2, {
                            error: t.toExposedError()
                        }];
                    throw t;
                case 3:
                    return [2]
                }
            })
        })
    }
    t.IxApplicationError = a,
    t.runWithApplicationErrorsLifted = s,
    t.extractErrorMsg = function(e) {
        if ("string" == typeof e)
            return e;
        try {
            return e.message
        } catch (t) {
            return JSON.stringify(e)
        }
    }
    ,
    t.WithApplicationErrorsLiftedToTry = function(e, t, n) {
        var r = n.value;
        return n.value = function() {
            for (var e = this, t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            return s(function() {
                return r.apply(e, t)
            })
        }
        ,
        n
    }
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var o in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(11)
      , i = n(1)
      , c = function() {
        function e() {}
        return e.setCollectors = function(e) {
            this.collectors = e
        }
        ,
        e.forwardToCollectors = function(e) {
            this.collectors.forEach(function(t) {
                return t.collect(e)
            })
        }
        ,
        e.log = function(t, n) {
            e.textLog("log", n, t)
        }
        ,
        e.debug = function(t) {
            var n = "";
            n = t instanceof Error ? i.extractErrorMsg(t) : JSON.stringify(t),
            e.textLog("debug", o.LogLevel.DEBUG, n)
        }
        ,
        e.info = function(t) {
            e.textLog("log", o.LogLevel.INFO, t)
        }
        ,
        e.warning = function(t) {
            e.textLog("log", o.LogLevel.WARN, t)
        }
        ,
        e.user_error = function(t) {
            e.textLog("user_error", o.LogLevel.WARN, t)
        }
        ,
        e.error = function(t) {
            e.textLog("log", o.LogLevel.ERROR, t)
        }
        ,
        e.exception = function(t) {
            var n = r({}, e.baseLog("exception", o.LogLevel.ERROR), {
                type: "exception",
                exception: i.extractErrorMsg(t)
            });
            e.forwardToCollectors(n)
        }
        ,
        e.textLog = function(t, n, o) {
            var i = r({
                type: "text",
                message: o
            }, e.baseLog(t, n));
            e.forwardToCollectors(i)
        }
        ,
        e.baseLog = function(e, t) {
            return {
                log_level: t,
                tag: e
            }
        }
        ,
        e.collectors = [],
        e
    }();
    t.default = c
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(11)
      , o = n(2)
      , i = n(4)
      , c = n(0)
      , a = function() {
        function e() {}
        return e.assert = function(e, t, n, a, s) {
            if (void 0 === n && (n = {}),
            void 0 === s && (s = r.LogLevel.ERROR),
            !e) {
                i.default.count("AssertUtils", "FailedAssertion", "FailedAssert", "ERROR", t);
                var u = c.ErrorTemplates.generateErrorMessage(t, n)
                  , l = a ? c.ErrorTemplates.generateErrorMessage(a, {
                    msg: u
                }) : u;
                throw o.default.log(l, s),
                new Error(l)
            }
        }
        ,
        e.checkUserGivenArg = function(t, n, o) {
            void 0 === o && (o = {}),
            e.assert(t, n, o, c.ErrorCodes.INVALID_ARGUMENT, r.LogLevel.WARN)
        }
        ,
        e.checkState = function(t, n, r) {
            void 0 === r && (r = {}),
            e.assert(t, n, r, c.ErrorCodes.ILLEGAL_STATE)
        }
        ,
        e.checkType = function(e, t, n) {
            if (!e.matchesType(t)) {
                i.default.count("AssertUtils", "FailedAssertion", "TypeError", "ERROR", n);
                var r = null == n ? "" : c.ErrorTemplates.generateErrorMessage(n)
                  , a = {
                    actual: JSON.stringify(t, null, 2),
                    expectedType: JSON.stringify(e.getTypeDescriptor(), null, 2),
                    typeDescription: r
                }
                  , s = c.ErrorTemplates.generateErrorMessage(c.ErrorCodes.INVALID_TYPE, a);
                throw o.default.error(s),
                new Error(s)
            }
        }
        ,
        e
    }();
    t.AssertUtils = a;
    var s = function() {
        function e() {}
        return e.prototype.matchesType = function(e) {
            return null == e
        }
        ,
        e.prototype.getTypeDescriptor = function() {
            return "null | undefined"
        }
        ,
        e
    }();
    t.NullType = s;
    var u = function() {
        function e(e, t) {
            this.regex = e,
            this.regexName = t
        }
        return e.prototype.matchesType = function(e) {
            return this.regex.test(e)
        }
        ,
        e.prototype.getTypeDescriptor = function() {
            return (this.regexName ? "(" + this.regexName + ") " : "") + this.regex.toString()
        }
        ,
        e
    }();
    t.RegexType = u;
    var l = function() {
        function e(e) {
            this.expected = e
        }
        return e.prototype.matchesType = function(e) {
            return JSON.stringify(this.expected) === JSON.stringify(e)
        }
        ,
        e.prototype.getTypeDescriptor = function() {
            return this.expected
        }
        ,
        e
    }();
    t.ExactValueType = l;
    var p = function() {
        function e(e, t) {
            this.checker1 = e,
            this.checker2 = t
        }
        return e.prototype.matchesType = function(e) {
            return this.checker1.matchesType(e) || this.checker2.matchesType(e)
        }
        ,
        e.prototype.getTypeDescriptor = function() {
            return {
                "<oneOf>": [this.checker1.getTypeDescriptor(), this.checker2.getTypeDescriptor()]
            }
        }
        ,
        e
    }();
    t.OneofType = p,
    t.NullableType = function(e) {
        return new p(new s,e)
    }
    ;
    var f = function() {
        function e(e) {
            this.type = e
        }
        return e.prototype.matchesType = function(e) {
            return typeof e == this.type
        }
        ,
        e.prototype.getTypeDescriptor = function() {
            return this.type
        }
        ,
        e
    }();
    t.TypeofChecker = f;
    var h = function() {
        function e(e) {
            this.checker = e
        }
        return e.prototype.matchesType = function(e) {
            var t = this;
            return !!Array.isArray(e) && e.reduce(function(e, n) {
                return e && t.checker.matchesType(n)
            }, !0)
        }
        ,
        e.prototype.getTypeDescriptor = function() {
            return [this.checker.getTypeDescriptor()]
        }
        ,
        e
    }();
    t.ArrayChecker = h;
    var d = function() {
        function e(e, t) {
            void 0 === t && (t = !1),
            this.objectTypeDef = e,
            this.strictMode = t
        }
        return e.prototype.matchesType = function(e) {
            var t = this;
            if (!new f("object").matchesType(e))
                return !1;
            var n = !this.strictMode || Object.keys(e).reduce(function(e, n) {
                return e && n in t.objectTypeDef
            }, !0)
              , r = Object.keys(this.objectTypeDef).reduce(function(n, r) {
                return n && t.objectTypeDef[r].matchesType(e[r])
            }, !0);
            return n && r
        }
        ,
        e.prototype.getTypeDescriptor = function() {
            var e = this
              , t = {};
            return Object.keys(this.objectTypeDef).forEach(function(n) {
                t[n] = e.objectTypeDef[n].getTypeDescriptor()
            }),
            t
        }
        ,
        e
    }();
    t.ObjectChecker = d
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var o in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
    }
      , o = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
      , i = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = n(1)
      , a = function() {
        function e() {}
        return e.setCollectors = function(e) {
            this.collectors = e
        }
        ,
        e.forwardToCollectors = function(e) {
            this.collectors.forEach(function(t) {
                return t.collect(e)
            })
        }
        ,
        e.collect = function(e) {
            this.captureMeter("Tracer", e.service, e.method, e.start_time_ms, e.total_time_ms, "success" === e.type)
        }
        ,
        e.count = function(t, n, o, i, c) {
            var a = r({
                type: "count"
            }, e.baseEvent(t, n, o, i, c));
            e.forwardToCollectors(a)
        }
        ,
        e.gauge = function(t, n, o, i, c, a) {
            var s = r({
                type: "gauge",
                measurement: c
            }, e.baseEvent(t, n, o, i, a));
            e.forwardToCollectors(s)
        }
        ,
        e.meterAsync = function(e, t, n, r) {
            return o(this, void 0, void 0, function() {
                var o, a, s, u, l, p;
                return i(this, function(i) {
                    switch (i.label) {
                    case 0:
                        o = (new Date).valueOf(),
                        a = null,
                        s = !0,
                        u = null,
                        i.label = 1;
                    case 1:
                        return i.trys.push([1, 3, , 4]),
                        [4, r()];
                    case 2:
                        return a = i.sent(),
                        [3, 4];
                    case 3:
                        return l = i.sent(),
                        s = !1,
                        a = l,
                        l instanceof c.IxApplicationError && (u = l.error.code),
                        [3, 4];
                    case 4:
                        return p = (new Date).valueOf() - o,
                        [2, {
                            result: function() {
                                if (s)
                                    return a;
                                throw a
                            },
                            meter: this.captureMeter(e, t, n, o, p, s, u)
                        }]
                    }
                })
            })
        }
        ,
        e.captureMeter = function(t, n, o, i, c, a, s) {
            var u = r({
                type: "meter",
                duration: c
            }, e.baseEvent(t, n, o, a ? "OK" : "ERROR", s));
            return e.forwardToCollectors(u),
            u
        }
        ,
        e.baseEvent = function(e, t, n, r, o) {
            return {
                domain: e,
                scope: t,
                event: n,
                result: r,
                error_code: o
            }
        }
        ,
        e.collectors = [],
        e
    }();
    t.default = a
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(52)
      , o = n(7)
      , i = n(50)
      , c = n(48)
      , a = n(47)
      , s = r.model_common_commonmodel.DeviceInfo.DeviceClass
      , u = i.detect() || {
        os: "unknown",
        name: "unknown",
        version: "unknown"
    }
      , l = (new c.StorageMgr).getStorageBin("posdeviceid")
      , p = new a.DeviceFingerprinter(l).getDeviceFingerprint();
    function f(e) {
        return e.split(/\.|-/).map(function(e) {
            return parseInt(e)
        })
    }
    t.getDeviceInfo = function() {
        var e = u.os + ":" + u.name + ":" + u.version;
        return {
            device_class: s.POS,
            device_uuid: p,
            host_os_version: e,
            hardware_model: {
                pos_info: {
                    description: e
                }
            }
        }
    }
    ,
    t.VERSION_INFO = {
        client_type: r.model_common_commonmodel.VersionInfoPb.ClientType.JS_SDK,
        client_version: o.PackageUtils.getVersion()
    },
    t.extractSemanticVersion = f,
    t.isVersionCompatible = function(e, t) {
        var n = f(e)
          , r = f(t);
        return n.reduce(function(e, t, n) {
            return e && r[n] >= t
        }, !0)
    }
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
      , o = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i, c = n(29), a = n(28), s = n(8), u = n(12), l = n(5), p = n(27), f = c.net_rpc_proto_applicationerrorcode.ApplicationEC, h = a.net_rpc_proto_rpc.RpcEC, d = a.net_rpc_proto_rpc.RpcRequest.RequestType, y = n(0), _ = function() {
        return function() {}
    }();
    function v(e) {
        return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
            return String.fromCharCode("0x" + t)
        }))
    }
    function E(e) {
        return decodeURIComponent(atob(e).split("").map(function(e) {
            return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
        }).join(""))
    }
    t.RpcEndpoint = _,
    function(e) {
        e[e.HTTP = 0] = "HTTP",
        e[e.HTTPS = 1] = "HTTPS"
    }(i = t.Scheme || (t.Scheme = {})),
    t.b64EncodeUnicode = v,
    t.b64DecodeUnicode = E;
    var m = function() {
        function e(e, t, n, r, o, i) {
            this.serviceName = e,
            this.postClient = t,
            this.rpcEndpoint = n,
            this.scheme = r,
            this.networkMonitor = o,
            this.retryBackoff = i
        }
        return e.prototype.getUntracedMethods = function() {
            return []
        }
        ,
        e.prototype.rpc = function(t, n, c, a) {
            return void 0 === a && (a = {
                isRetriable: !0
            }),
            r(this, void 0, void 0, function() {
                var r, _, m, T, b, g, R, O = this;
                return o(this, function(o) {
                    return r = i[this.scheme].toLowerCase(),
                    _ = this.rpcEndpoint.port ? ":" + this.rpcEndpoint.port : "",
                    m = r + "://" + this.rpcEndpoint.url_path + _ + "/protojsonservice/" + this.serviceName,
                    T = {
                        id: Date.now(),
                        service: this.serviceName,
                        method: t,
                        content: v(JSON.stringify(n)),
                        session_token: c || "",
                        request_type: d.STANDARD,
                        version_info: l.VERSION_INFO,
                        parent_trace_id: s.default.getActiveTraceId() || "",
                        device_info: l.getDeviceInfo()
                    },
                    b = function(e) {
                        return a.isRetriable && e.errorType() === p.RpcErrorType.RPC && p.isRetriableRpcNetworkError(e.rpcEc())
                    }
                    ,
                    R = g = function() {
                        return O.postClient.post(m, T).catch(function(e) {
                            return {
                                rpc_error_code: h.NETWORK_UNAVAILABLE,
                                app_error_code: f.OK,
                                error: e.message
                            }
                        }).then(function(e) {
                            if (e.rpc_error_code !== h.RPC_OK || e.app_error_code !== f.OK) {
                                var t = new p.IxRpcError(e);
                                return Promise.reject(t)
                            }
                            try {
                                return JSON.parse(E(e.content))
                            } catch (t) {
                                throw new Error(y.ErrorTemplates.generateErrorMessage(y.ErrorCodes.JSON_RPC_PARSE_ERROR, {
                                    content: e.content
                                }))
                            }
                        })
                    }
                    ,
                    this.getUntracedMethods().includes(t) || (R = function() {
                        return O.networkMonitor.withMonitoring(O.serviceName, t, g)
                    }
                    ),
                    [2, u.retryWithBackoff(R, b, e.NUM_RETRIES, this.retryBackoff)]
                })
            })
        }
        ,
        e.NUM_RETRIES = 1,
        e
    }();
    t.default = m
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(51)
      , o = function() {
        function e() {}
        return e.getProjectName = function() {
            return r.name
        }
        ,
        e.getVersion = function() {
            var e = r.versionTag ? "-" + r.versionTag : "";
            return r.version + e
        }
        ,
        e.getProjectConfig = function() {
            return r.pos
        }
        ,
        e
    }();
    t.PackageUtils = o
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var o in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1)
      , i = n(5)
      , c = n(7)
      , a = function() {
        function e() {}
        return e.setCollectors = function(e) {
            this.collectors = e
        }
        ,
        e.forwardToCollectors = function(e) {
            this.collectors.forEach(function(t) {
                return t.collect(e)
            })
        }
        ,
        e.collect = function(t) {
            e.logPoints.push({
                timestamp: (new Date).valueOf(),
                log: t
            })
        }
        ,
        e.getActiveTraceId = function() {
            var t = e.activeTraceIds.slice();
            return e.transactionId && t.unshift("txn!" + e.transactionId),
            t.join(e.TRACE_ID_SEPARATOR)
        }
        ,
        e.setTransactionId = function(t) {
            e.transactionId = t
        }
        ,
        e.clearTransactionId = function() {
            e.transactionId = null
        }
        ,
        e.traceFn = function(t, n) {
            return function() {
                for (var r = [], o = 0; o < arguments.length; o++)
                    r[o] = arguments[o];
                var a = e.openTracingContext(n)
                  , s = a.traceId
                  , u = a.startTime
                  , l = a.parentTraceId
                  , p = n || t.name
                  , f = JSON.stringify(r)
                  , h = {
                    id: s,
                    parent_trace_id: l,
                    start_time_ms: u,
                    service: c.PackageUtils.getProjectName(),
                    method: p,
                    request: f,
                    version_info: i.VERSION_INFO,
                    trace_points: []
                };
                try {
                    var d = t.apply(this, r);
                    if (d instanceof Promise)
                        e.tracePromise(h, d);
                    else {
                        var y = JSON.stringify(d);
                        e.successTrace(h, y)
                    }
                    return d
                } catch (t) {
                    throw e.exceptionTrace(h, t),
                    t
                }
            }
        }
        ,
        e.openTracingContext = function(t) {
            void 0 === t && (t = "unknown");
            var n = t + "!" + Math.floor(1e7 * Math.random())
              , r = e.getActiveTraceId();
            return e.activeTraceIds.push(n),
            {
                traceId: n,
                parentTraceId: r,
                startTime: (new Date).valueOf()
            }
        }
        ,
        e.closeTracingContext = function(t) {
            var n = e.activeTraceIds.indexOf(t.id);
            -1 != n && e.activeTraceIds.splice(n, 1);
            var o = e.logPoints.map(function(n) {
                return {
                    type: "log",
                    time_offset_ms: e.calculateElapsedTimeMs(t.start_time_ms, n.timestamp),
                    log: n.log
                }
            });
            return e.logPoints = [],
            r({}, t, {
                total_time_ms: e.calculateElapsedTimeMs(t.start_time_ms),
                trace_points: o
            })
        }
        ,
        e.successTrace = function(t, n) {
            var o = r({}, e.closeTracingContext(t), {
                type: "success",
                response: n
            });
            e.forwardToCollectors(o)
        }
        ,
        e.exceptionTrace = function(t, n) {
            var i = r({}, e.closeTracingContext(t), {
                type: "exception",
                exception: o.extractErrorMsg(n)
            });
            e.forwardToCollectors(i)
        }
        ,
        e.tracePromise = function(t, n) {
            var o = r({}, t);
            o.service = "Async",
            n.then(function(t) {
                var n = JSON.stringify(t);
                e.successTrace(o, n)
            }).catch(function(t) {
                e.exceptionTrace(o, t)
            })
        }
        ,
        e.calculateElapsedTimeMs = function(e, t) {
            return void 0 === t && (t = (new Date).valueOf()),
            t - e
        }
        ,
        e.collectors = [],
        e.TRACE_ID_SEPARATOR = ">",
        e.transactionId = null,
        e.activeTraceIds = [],
        e.logPoints = [],
        e
    }();
    t.default = a
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), i = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
    , c = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(10)
      , s = n(3)
      , u = n(0);
    t.DEFAULT_DISCOVERY_CONFIG = {
        method: "registered"
    };
    var l = function() {
        function e(e) {
            this.discoveryClient = e
        }
        return e.prototype.createDiscoveryMethod = function(e) {
            return "simulated" === e.method ? new d(e) : new h(e,this.discoveryClient)
        }
        ,
        e
    }();
    t.DiscoveryMethodFactory = l;
    var p = function() {
        function e(e) {
            this.discoveryMethodFactory = e,
            this.activeDiscovery = null,
            this.lastResult = null,
            this.nextResult = null
        }
        return e.prototype.getDiscoveredReaders = function() {
            return s.AssertUtils.assert(!!this.activeDiscovery, u.ErrorCodes.DISCOVERY_NOT_RUNNING),
            this.lastResult
        }
        ,
        e.prototype.discoverReaders = function(e) {
            return void 0 === e && (e = t.DEFAULT_DISCOVERY_CONFIG),
            i(this, void 0, void 0, function() {
                var t = this;
                return c(this, function(n) {
                    return this.activeDiscovery || (this.nextResult = new Promise(function(n, r) {
                        t.startDiscovery(e, function(e) {
                            return n(e)
                        }, function(e) {
                            return r(e)
                        })
                    }
                    ).then(function(e) {
                        return t.stopDiscovery(),
                        e
                    }, function(e) {
                        return Promise.reject(e)
                    })),
                    [2, this.nextResult]
                })
            })
        }
        ,
        e.prototype.startDiscovery = function(e, n, r) {
            var o = this;
            void 0 === e && (e = t.DEFAULT_DISCOVERY_CONFIG),
            s.AssertUtils.assert(!this.activeDiscovery, u.ErrorCodes.DISCOVERY_ALREADY_RUNNING),
            this.activeDiscovery = this.discoveryMethodFactory.createDiscoveryMethod(e);
            this.activeDiscovery.startDiscovery(function(e) {
                var t = {
                    discoveredReaders: e
                };
                JSON.stringify(t) !== JSON.stringify(o.lastResult) && (o.lastResult = t,
                n(o.lastResult))
            }, function(e) {
                o.stopDiscovery(),
                r(e)
            })
        }
        ,
        e.prototype.stopDiscovery = function() {
            this.activeDiscovery && this.activeDiscovery.stopDiscovery(),
            this.lastResult = null,
            this.activeDiscovery = null,
            this.nextResult = null
        }
        ,
        e
    }();
    t.default = p;
    var f = function() {
        return function(e) {
            this.config = e
        }
    }();
    t.BaseDiscoverMethod = f;
    var h = function(e) {
        function t(t, n, r) {
            void 0 === r && (r = 5e3);
            var o = e.call(this, t) || this;
            return o.discoveryClient = n,
            o.queryIntervalMs = r,
            o
        }
        return o(t, e),
        t.prototype.startDiscovery = function(e, t) {
            var n = this;
            this.intervalId = a.setIntervalAndExecute(function() {
                return i(n, void 0, void 0, function() {
                    var n, r;
                    return c(this, function(o) {
                        switch (o.label) {
                        case 0:
                            return o.trys.push([0, 2, , 3]),
                            [4, this.discoveryClient.discoverReaders({
                                location: this.config.location
                            })];
                        case 1:
                            return n = o.sent(),
                            e(n.data),
                            [3, 3];
                        case 2:
                            return r = o.sent(),
                            t(r),
                            [3, 3];
                        case 3:
                            return [2]
                        }
                    })
                })
            }, this.queryIntervalMs)
        }
        ,
        t.prototype.stopDiscovery = function() {
            this.intervalId && clearInterval(this.intervalId)
        }
        ,
        t
    }(f);
    t.RegisteredDiscoveryMethod = h;
    var d = function(e) {
        function t(t) {
            return e.call(this, t) || this
        }
        return o(t, e),
        t.prototype.startDiscovery = function(e, n) {
            e([{
                id: t.SIMULATED_ID,
                object: "terminal.reader",
                device_type: "verifone_P400",
                ip_address: "0.0.0.0",
                label: t.SIMULATED_ID,
                serial_number: t.SIMULATED_ID,
                location: "st_simulated",
                status: "online"
            }])
        }
        ,
        t.prototype.stopDiscovery = function() {}
        ,
        t.SIMULATED_ID = "SIMULATED",
        t
    }(f);
    t.SimulatedDiscoveryMethod = d
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(12);
    t.setIntervalAndExecute = function(e, t) {
        return e(),
        setInterval(e, t)
    }
    ,
    t.setBeacon = function(e, t, n) {
        var o = !0
          , i = function(t) {
            return o && r.timeout(e, t),
            null
        };
        return e().then(function(e) {
            return i(t)
        }).catch(function(e) {
            return i(n)
        }),
        function() {
            o = !1
        }
    }
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        e.DEBUG = "debug",
        e.INFO = "info",
        e.WARN = "warn",
        e.ERROR = "error"
    }(t.LogLevel || (t.LogLevel = {}))
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
      , o = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    function i(e) {
        return r(this, void 0, void 0, function() {
            return o(this, function(t) {
                return [2, new Promise(function(t) {
                    return setTimeout(t, e)
                }
                )]
            })
        })
    }
    function c(e, t, n) {
        return void 0 === t && (t = function() {
            return !0
        }
        ),
        void 0 === n && (n = 2),
        e().catch(function(r) {
            if (0 === n)
                throw r;
            return Promise.resolve().then(function() {
                return t(r)
            }).then(function(o) {
                return o ? c(e, t, n - 1) : Promise.reject(r)
            })
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.liftToPromise = function(e) {
        return Promise.resolve().then(function() {
            return e
        })
    }
    ,
    t.sleep = i,
    t.timeout = function(e, t) {
        return r(this, void 0, void 0, function() {
            return o(this, function(n) {
                return [2, i(t).then(function(t) {
                    return e()
                })]
            })
        })
    }
    ,
    t.retry = c,
    t.retryWithBackoff = function(e, t, n, a) {
        var s = this;
        return void 0 === a && (a = 2500),
        c(e, function(e) {
            return r(s, void 0, void 0, function() {
                return o(this, function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, t(e)];
                    case 1:
                        return n.sent() ? [4, i(a)] : [2, !1];
                    case 2:
                        return n.sent(),
                        [2, !0]
                    }
                })
            })
        }, n)
    }
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        e.NONE = "none",
        e.VERBOSE = "verbose"
    }(t.OutputLogLevel || (t.OutputLogLevel = {})),
    function(e) {
        e.DEV = "DEV",
        e.CANARY = "CANARY",
        e.PROD = "PROD"
    }(t.DevMode || (t.DevMode = {}))
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), i = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
    , c = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, s = n(2), u = n(4), l = n(27), p = n(3), f = n(10), h = n(7), d = n(22), y = n(13), _ = n(9), v = n(1), E = n(0), m = n(21), T = n(5);
    !function(e) {
        e.CONNECTING = "connecting",
        e.CONNECTED = "connected",
        e.NOT_CONNECTED = "not_connected"
    }(a = t.ConnectionStatus || (t.ConnectionStatus = {}));
    var b = 4443
      , g = "rabbit-lan.goindex-dev.com"
      , R = "rabbit-lan.goindex.com"
      , O = "b5rxknncfl.execute-api.us-west-1.amazonaws.com/prod"
      , C = null;
    function N(e, t) {
        return t.id === _.SimulatedDiscoveryMethod.SIMULATED_ID ? {
            url_path: O,
            port: C
        } : {
            url_path: t.ip_address.replace(/\./g, "-") + "." + (e === y.DevMode.DEV ? g : R),
            port: b
        }
    }
    t.rpcEndpointFromReader = N;
    var A = function(e) {
        function t(n) {
            var r = e.call(this, {
                message: n.message,
                request_id: n.request_id,
                code: E.ErrorCodes.READER_ERROR
            }) || this;
            return Object.setPrototypeOf(r, t.prototype),
            r
        }
        return o(t, e),
        t
    }(v.IxApplicationError);
    function w(e) {
        return e instanceof l.IxRpcError ? new A(e.toExposedError()) : (u.default.count("JackRabbitConnectionMgr", "UnexpectedNonRpcError", e.toString(), "ERROR"),
        new A({
            message: e.toString()
        }))
    }
    t.IxRabbitError = A,
    t.rabbitErrorMapper = w;
    var I = function() {
        function e(e, t, n, r, o, i) {
            void 0 === i && (i = 6e4),
            this.deviceFingerprint = e,
            this.devMode = t,
            this.connectionTokenMgr = n,
            this.terminalDelegate = r,
            this.jackRabbitRpcServiceFactory = o,
            this.heartbeatIntervalMs = i,
            this.sessionToken = null,
            this.jackRabbitRpcClient = null,
            this.connectionStatus = a.NOT_CONNECTED,
            this.synchronizer = new d.Synchronizer,
            this.activeConnection = null
        }
        return e.prototype.connect = function(e) {
            return i(this, void 0, void 0, function() {
                var t, n, r, o, i, s, l, d = this;
                return c(this, function(c) {
                    switch (c.label) {
                    case 0:
                        p.AssertUtils.assert(!this.activeConnection, E.ErrorCodes.ALREADY_CONNECTED),
                        t = e,
                        n = N(this.devMode, t),
                        r = this.jackRabbitRpcServiceFactory(n),
                        this.setConnectionStatus(a.CONNECTING),
                        c.label = 1;
                    case 1:
                        return c.trys.push([1, 4, , 5]),
                        [4, this.connectionTokenMgr.getActiveCredentials()];
                    case 2:
                        return o = c.sent(),
                        [4, this.activateTerminal(o, r)];
                    case 3:
                        if (i = c.sent(),
                        s = m.tryOrDefault(function() {
                            return i.version.client_version
                        }, "0.0.0"),
                        !T.isVersionCompatible(h.PackageUtils.getProjectConfig().minRabbitVersion, s))
                            throw new A(E.ErrorTemplates.generateError(E.ErrorCodes.INVALID_READER_VERSION));
                        return u.default.count("JackRabbitConnectionMgr", "ReaderVersion", s, "OK"),
                        u.default.count("JackRabbitConnectionMgr", "ReaderType", m.tryOrDefault(function() {
                            return i.version.client_type
                        }, "Unknown"), "OK"),
                        this.sessionToken = i.session_token,
                        this.jackRabbitRpcClient = r,
                        this.activeConnection = {
                            posId: this.deviceFingerprint,
                            reader: t,
                            sdkRpcSession: i.sdk_rpc_session,
                            heartbeatIntervalId: f.setIntervalAndExecute(function() {
                                return d.terminalHeartbeat()
                            }, this.heartbeatIntervalMs)
                        },
                        this.setConnectionStatus(a.CONNECTED),
                        [2, this.activeConnection];
                    case 4:
                        throw l = c.sent(),
                        this.clearSession(),
                        l;
                    case 5:
                        return [2]
                    }
                })
            })
        }
        ,
        e.prototype.getConnectionStatus = function() {
            return this.connectionStatus
        }
        ,
        e.prototype.disconnect = function() {
            return this.clearSession(),
            Promise.resolve({})
        }
        ,
        e.prototype.rabbitCallAuthenticated = function(e) {
            return i(this, void 0, void 0, function() {
                return c(this, function(t) {
                    return p.AssertUtils.assert(null != this.jackRabbitRpcClient && null != this.sessionToken, E.ErrorCodes.NO_ESTABLISHED_CONNECTION),
                    [2, this.rabbitCall(this.jackRabbitRpcClient, e, this.sessionToken)]
                })
            })
        }
        ,
        e.prototype.rabbitCall = function(e, t, n) {
            return i(this, void 0, void 0, function() {
                var r, o = this;
                return c(this, function(a) {
                    return r = function() {
                        return i(o, void 0, void 0, function() {
                            var r;
                            return c(this, function(o) {
                                switch (o.label) {
                                case 0:
                                    return o.trys.push([0, 2, , 3]),
                                    [4, t(e, n)];
                                case 1:
                                    return [2, o.sent()];
                                case 2:
                                    throw r = o.sent(),
                                    this.handleErrors(r),
                                    w(r);
                                case 3:
                                    return [2]
                                }
                            })
                        })
                    }
                    ,
                    [2, this.synchronizer.synchronize(r)]
                })
            })
        }
        ,
        e.prototype.setConnectionStatus = function(e) {
            this.connectionStatus = e,
            this.terminalDelegate.onConnectionStatusChange && this.terminalDelegate.onConnectionStatusChange({
                status: this.connectionStatus
            })
        }
        ,
        e.prototype.clearSession = function() {
            this.activeConnection && clearInterval(this.activeConnection.heartbeatIntervalId),
            this.activeConnection = null,
            this.connectionTokenMgr.invalidateConnectionToken(),
            this.sessionToken = null,
            this.jackRabbitRpcClient = null,
            this.setConnectionStatus(a.NOT_CONNECTED)
        }
        ,
        e.prototype.handleErrors = function(e) {
            if (e instanceof l.IxRpcError) {
                var t = e.errorType() === l.RpcErrorType.RPC && l.isRetriableRpcNetworkError(e.rpcEc())
                  , n = e.errorType() === l.RpcErrorType.APPLICATION && l.isRpcUnauthenticatedError(e.applicationEc());
                if (n && s.default.error(E.ErrorTemplates.generateErrorMessage(E.ErrorCodes.AUTHENTICATION_ERROR)),
                t && s.default.error(E.ErrorTemplates.generateErrorMessage(E.ErrorCodes.READER_CONNECTION_INTERRUPTED)),
                n || t) {
                    var r = this.getConnectionStatus() === a.CONNECTED;
                    this.clearSession(),
                    r && this.terminalDelegate.onUnexpectedReaderDisconnect && this.terminalDelegate.onUnexpectedReaderDisconnect({
                        status: this.getConnectionStatus(),
                        error: {
                            message: e.message
                        }
                    })
                }
            }
        }
        ,
        e.prototype.terminalHeartbeat = function() {
            return i(this, void 0, void 0, function() {
                return c(this, function(e) {
                    return [2, this.rabbitCallAuthenticated(function(e, t) {
                        return e.terminalHeartbeat({}, t)
                    })]
                })
            })
        }
        ,
        e.prototype.activateTerminal = function(e, t) {
            return i(this, void 0, void 0, function() {
                var n;
                return c(this, function(r) {
                    return n = {
                        pos_activation_token: e,
                        store_name: "empty",
                        pos_device_id: this.deviceFingerprint,
                        pos_software_info: {
                            pos_type: h.PackageUtils.getProjectName(),
                            sdk_version: h.PackageUtils.getVersion()
                        }
                    },
                    [2, this.rabbitCall(t, function() {
                        return t.activateTerminal(n)
                    })]
                })
            })
        }
        ,
        e
    }();
    t.default = I
}
, function(e, t) {
    !function(e) {
        "use strict";
        if (!e.fetch) {
            var t = {
                searchParams: "URLSearchParams"in e,
                iterable: "Symbol"in e && "iterator"in Symbol,
                blob: "FileReader"in e && "Blob"in e && function() {
                    try {
                        return new Blob,
                        !0
                    } catch (e) {
                        return !1
                    }
                }(),
                formData: "FormData"in e,
                arrayBuffer: "ArrayBuffer"in e
            };
            if (t.arrayBuffer)
                var n = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"]
                  , r = function(e) {
                    return e && DataView.prototype.isPrototypeOf(e)
                }
                  , o = ArrayBuffer.isView || function(e) {
                    return e && n.indexOf(Object.prototype.toString.call(e)) > -1
                }
                ;
            l.prototype.append = function(e, t) {
                e = a(e),
                t = s(t);
                var n = this.map[e];
                this.map[e] = n ? n + "," + t : t
            }
            ,
            l.prototype.delete = function(e) {
                delete this.map[a(e)]
            }
            ,
            l.prototype.get = function(e) {
                return e = a(e),
                this.has(e) ? this.map[e] : null
            }
            ,
            l.prototype.has = function(e) {
                return this.map.hasOwnProperty(a(e))
            }
            ,
            l.prototype.set = function(e, t) {
                this.map[a(e)] = s(t)
            }
            ,
            l.prototype.forEach = function(e, t) {
                for (var n in this.map)
                    this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
            }
            ,
            l.prototype.keys = function() {
                var e = [];
                return this.forEach(function(t, n) {
                    e.push(n)
                }),
                u(e)
            }
            ,
            l.prototype.values = function() {
                var e = [];
                return this.forEach(function(t) {
                    e.push(t)
                }),
                u(e)
            }
            ,
            l.prototype.entries = function() {
                var e = [];
                return this.forEach(function(t, n) {
                    e.push([n, t])
                }),
                u(e)
            }
            ,
            t.iterable && (l.prototype[Symbol.iterator] = l.prototype.entries);
            var i = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            _.prototype.clone = function() {
                return new _(this,{
                    body: this._bodyInit
                })
            }
            ,
            y.call(_.prototype),
            y.call(E.prototype),
            E.prototype.clone = function() {
                return new E(this._bodyInit,{
                    status: this.status,
                    statusText: this.statusText,
                    headers: new l(this.headers),
                    url: this.url
                })
            }
            ,
            E.error = function() {
                var e = new E(null,{
                    status: 0,
                    statusText: ""
                });
                return e.type = "error",
                e
            }
            ;
            var c = [301, 302, 303, 307, 308];
            E.redirect = function(e, t) {
                if (-1 === c.indexOf(t))
                    throw new RangeError("Invalid status code");
                return new E(null,{
                    status: t,
                    headers: {
                        location: e
                    }
                })
            }
            ,
            e.Headers = l,
            e.Request = _,
            e.Response = E,
            e.fetch = function(e, n) {
                return new Promise(function(r, o) {
                    var i = new _(e,n)
                      , c = new XMLHttpRequest;
                    c.onload = function() {
                        var e, t, n = {
                            status: c.status,
                            statusText: c.statusText,
                            headers: (e = c.getAllResponseHeaders() || "",
                            t = new l,
                            e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
                                var n = e.split(":")
                                  , r = n.shift().trim();
                                if (r) {
                                    var o = n.join(":").trim();
                                    t.append(r, o)
                                }
                            }),
                            t)
                        };
                        n.url = "responseURL"in c ? c.responseURL : n.headers.get("X-Request-URL");
                        var o = "response"in c ? c.response : c.responseText;
                        r(new E(o,n))
                    }
                    ,
                    c.onerror = function() {
                        o(new TypeError("Network request failed"))
                    }
                    ,
                    c.ontimeout = function() {
                        o(new TypeError("Network request failed"))
                    }
                    ,
                    c.open(i.method, i.url, !0),
                    "include" === i.credentials ? c.withCredentials = !0 : "omit" === i.credentials && (c.withCredentials = !1),
                    "responseType"in c && t.blob && (c.responseType = "blob"),
                    i.headers.forEach(function(e, t) {
                        c.setRequestHeader(t, e)
                    }),
                    c.send(void 0 === i._bodyInit ? null : i._bodyInit)
                }
                )
            }
            ,
            e.fetch.polyfill = !0
        }
        function a(e) {
            if ("string" != typeof e && (e = String(e)),
            /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))
                throw new TypeError("Invalid character in header field name");
            return e.toLowerCase()
        }
        function s(e) {
            return "string" != typeof e && (e = String(e)),
            e
        }
        function u(e) {
            var n = {
                next: function() {
                    var t = e.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    }
                }
            };
            return t.iterable && (n[Symbol.iterator] = function() {
                return n
            }
            ),
            n
        }
        function l(e) {
            this.map = {},
            e instanceof l ? e.forEach(function(e, t) {
                this.append(t, e)
            }, this) : Array.isArray(e) ? e.forEach(function(e) {
                this.append(e[0], e[1])
            }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
                this.append(t, e[t])
            }, this)
        }
        function p(e) {
            if (e.bodyUsed)
                return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0
        }
        function f(e) {
            return new Promise(function(t, n) {
                e.onload = function() {
                    t(e.result)
                }
                ,
                e.onerror = function() {
                    n(e.error)
                }
            }
            )
        }
        function h(e) {
            var t = new FileReader
              , n = f(t);
            return t.readAsArrayBuffer(e),
            n
        }
        function d(e) {
            if (e.slice)
                return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)),
            t.buffer
        }
        function y() {
            return this.bodyUsed = !1,
            this._initBody = function(e) {
                if (this._bodyInit = e,
                e)
                    if ("string" == typeof e)
                        this._bodyText = e;
                    else if (t.blob && Blob.prototype.isPrototypeOf(e))
                        this._bodyBlob = e;
                    else if (t.formData && FormData.prototype.isPrototypeOf(e))
                        this._bodyFormData = e;
                    else if (t.searchParams && URLSearchParams.prototype.isPrototypeOf(e))
                        this._bodyText = e.toString();
                    else if (t.arrayBuffer && t.blob && r(e))
                        this._bodyArrayBuffer = d(e.buffer),
                        this._bodyInit = new Blob([this._bodyArrayBuffer]);
                    else {
                        if (!t.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !o(e))
                            throw new Error("unsupported BodyInit type");
                        this._bodyArrayBuffer = d(e)
                    }
                else
                    this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }
            ,
            t.blob && (this.blob = function() {
                var e = p(this);
                if (e)
                    return e;
                if (this._bodyBlob)
                    return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer)
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData)
                    throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }
            ,
            this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? p(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(h)
            }
            ),
            this.text = function() {
                var e, t, n, r = p(this);
                if (r)
                    return r;
                if (this._bodyBlob)
                    return e = this._bodyBlob,
                    t = new FileReader,
                    n = f(t),
                    t.readAsText(e),
                    n;
                if (this._bodyArrayBuffer)
                    return Promise.resolve(function(e) {
                        for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++)
                            n[r] = String.fromCharCode(t[r]);
                        return n.join("")
                    }(this._bodyArrayBuffer));
                if (this._bodyFormData)
                    throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }
            ,
            t.formData && (this.formData = function() {
                return this.text().then(v)
            }
            ),
            this.json = function() {
                return this.text().then(JSON.parse)
            }
            ,
            this
        }
        function _(e, t) {
            var n, r, o = (t = t || {}).body;
            if (e instanceof _) {
                if (e.bodyUsed)
                    throw new TypeError("Already read");
                this.url = e.url,
                this.credentials = e.credentials,
                t.headers || (this.headers = new l(e.headers)),
                this.method = e.method,
                this.mode = e.mode,
                o || null == e._bodyInit || (o = e._bodyInit,
                e.bodyUsed = !0)
            } else
                this.url = String(e);
            if (this.credentials = t.credentials || this.credentials || "omit",
            !t.headers && this.headers || (this.headers = new l(t.headers)),
            this.method = (n = t.method || this.method || "GET",
            r = n.toUpperCase(),
            i.indexOf(r) > -1 ? r : n),
            this.mode = t.mode || this.mode || null,
            this.referrer = null,
            ("GET" === this.method || "HEAD" === this.method) && o)
                throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(o)
        }
        function v(e) {
            var t = new FormData;
            return e.trim().split("&").forEach(function(e) {
                if (e) {
                    var n = e.split("=")
                      , r = n.shift().replace(/\+/g, " ")
                      , o = n.join("=").replace(/\+/g, " ");
                    t.append(decodeURIComponent(r), decodeURIComponent(o))
                }
            }),
            t
        }
        function E(e, t) {
            t || (t = {}),
            this.type = "default",
            this.status = void 0 === t.status ? 200 : t.status,
            this.ok = this.status >= 200 && this.status < 300,
            this.statusText = "statusText"in t ? t.statusText : "OK",
            this.headers = new l(t.headers),
            this.url = t.url || "",
            this._initBody(e)
        }
    }("undefined" != typeof self ? self : this)
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
      , o = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(3)
      , c = n(2)
      , a = n(0)
      , s = function() {
        function e(e, t) {
            this.fetchConnectionTokenFn = e,
            this.networkMonitor = t,
            this.activeCredentials = null
        }
        return e.prototype.getActiveCredentials = function() {
            return r(this, void 0, void 0, function() {
                var e = this;
                return o(this, function(t) {
                    return this.activeCredentials || (this.activeCredentials = this.networkMonitor.withMonitoring("ConnectionTokenMgr", "get", function() {
                        return r(e, void 0, void 0, function() {
                            var e, t, n;
                            return o(this, function(r) {
                                switch (r.label) {
                                case 0:
                                    e = this.fetchConnectionTokenFn(),
                                    r.label = 1;
                                case 1:
                                    return r.trys.push([1, 3, , 4]),
                                    [4, e];
                                case 2:
                                    return t = r.sent(),
                                    i.AssertUtils.assert(!!t && "string" == typeof t && t.startsWith("pst_"), a.ErrorCodes.INVALID_CONNECTION_TOKEN, {
                                        token: t
                                    }),
                                    [2, t];
                                case 3:
                                    throw n = r.sent(),
                                    this.invalidateConnectionToken(),
                                    c.default.error(a.ErrorTemplates.generateErrorMessage(a.ErrorCodes.FAILED_FETCH_CONNECTION_TOKEN)),
                                    n;
                                case 4:
                                    return [2]
                                }
                            })
                        })
                    })),
                    [2, this.activeCredentials]
                })
            })
        }
        ,
        e.prototype.invalidateConnectionToken = function() {
            this.activeCredentials = null
        }
        ,
        e
    }();
    t.default = s
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(22)
      , c = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.synchronizer = new i.Synchronizer,
            t
        }
        return o(t, e),
        t.prototype.rpc = function(t, n, r, o) {
            var i = this;
            return this.synchronizer.synchronize(function() {
                return e.prototype.rpc.call(i, t, n, r, o)
            })
        }
        ,
        t
    }(n(6).default);
    t.default = c
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(10)
      , o = n(2)
      , i = function() {
        function e(e, t) {
            void 0 === e && (e = 45e3),
            void 0 === t && (t = 10),
            this.flushInterval = e,
            this.maxCapacity = t,
            this.items = []
        }
        return e.prototype.start = function() {
            var e = this;
            this.interval = r.setIntervalAndExecute(function() {
                return e.flush()
            }, this.flushInterval);
            try {
                var t = window.onbeforeunload;
                window.onbeforeunload = function(n) {
                    return e.flush(),
                    t ? t(n) : null
                }
            } catch (e) {}
        }
        ,
        e.prototype.collect = function(e) {
            this.items.push(e),
            this.items.length === this.maxCapacity && this.flush()
        }
        ,
        e.prototype.flush = function() {
            if (this.items.length > 0) {
                var e = this.items;
                this.items = [],
                this.doFlush(e).catch(function(e) {
                    return o.default.debug(e)
                })
            }
        }
        ,
        e.prototype.shutdown = function() {
            clearInterval(this.interval)
        }
        ,
        e
    }();
    t.PeriodicFlusher = i
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        e.READY = "ready",
        e.COLLECTING_PAYMENT_METHOD = "collecting_payment_method",
        e.CONFIRMING_PAYMENT_INTENT = "confirming_payment_intent"
    }(t.PaymentStatus || (t.PaymentStatus = {}))
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
      , o = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(1)
      , c = n(0)
      , a = function() {
        function e(e) {
            var t = this;
            this.cancelableOp = e,
            this.isPending = !0,
            this.canceled = !1,
            this.internalPromise = new Promise(function(e, n) {
                t.rejectFn = n;
                var r = t.cancelableOp.execute(function() {
                    return t.isCanceled()
                });
                t.resource = r.resource,
                r.result.then(function(e) {
                    return t.isPending = !1,
                    e
                }, function(e) {
                    return t.isPending = !1,
                    Promise.reject(e)
                }).then(e, n)
            }
            )
        }
        return e.chainCancelable = function(t, n) {
            var r = t;
            return new e({
                execute: function() {
                    return {
                        result: t.result().then(function(e) {
                            var t = n(e);
                            return r = t,
                            t.result()
                        })
                    }
                },
                onCancel: function(e) {
                    !r.isCanceled() && r.isPending && r.cancel()
                }
            })
        }
        ,
        e.prototype.result = function() {
            return this.internalPromise
        }
        ,
        e.prototype.cancel = function() {
            return r(this, void 0, void 0, function() {
                var e;
                return o(this, function(t) {
                    if (!this.isPending)
                        throw new Error("Failed to cancel. Action has already completed.");
                    if (this.canceled)
                        throw new Error("Action has already been canceled.");
                    return this.canceled = !0,
                    this.rejectFn(new i.IxApplicationError(c.ErrorTemplates.generateError(c.ErrorCodes.CANCELED))),
                    e = null,
                    this.cancelableOp.onCancel && (e = this.cancelableOp.onCancel(this.resource)),
                    [2, Promise.resolve().then(function() {
                        return e
                    }).then(function() {})]
                })
            })
        }
        ,
        e.prototype.isCanceled = function() {
            return this.canceled
        }
        ,
        e
    }();
    t.Cancelable = a
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.tryOrDefault = function(e, t) {
        var n;
        try {
            void 0 === (n = e()) && (n = t)
        } catch (e) {
            n = t
        }
        return n
    }
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e() {
            this.serializedPromise = Promise.resolve()
        }
        return e.prototype.synchronize = function(e) {
            return this.serializedPromise = this.serializedPromise.then(function() {
                return e()
            }, function() {
                return e()
            }),
            this.serializedPromise
        }
        ,
        e
    }();
    t.Synchronizer = r
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    n(15);
    var i = n(4)
      , c = n(2)
      , a = n(12)
      , s = n(1)
      , u = n(0)
      , l = function(e) {
        function t(n, r) {
            var o = e.call(this, u.ErrorTemplates.generateError(u.ErrorCodes.NETWORK_ERROR, {
                content: r
            })) || this;
            return o.response = n,
            o.errorText = r,
            Object.setPrototypeOf(o, t.prototype),
            o
        }
        return o(t, e),
        t.prototype.responseStatusCode = function() {
            return this.response.status
        }
        ,
        t
    }(s.IxApplicationError);
    t.IxHttpError = l;
    var p = function() {
        function e(e) {
            void 0 === e && (e = 15e3),
            this.requestTimeout = e
        }
        return e.prototype.get = function(e, t, n) {
            void 0 === n && (n = new Headers);
            var r = {
                method: "GET",
                headers: n
            }
              , o = e + "?" + Object.keys(t).filter(function(e) {
                return void 0 != t[e]
            }).map(function(e) {
                return encodeURIComponent(e) + "=" + encodeURIComponent(t[e])
            }).join("&");
            return this.doFetch(o, r)
        }
        ,
        e.prototype.post = function(e, t, n) {
            void 0 === n && (n = new Headers),
            n.append("Content-Type", "application/json");
            var r = {
                method: "POST",
                body: JSON.stringify(t),
                headers: {
                    // having headers set to the Headers class breaks isomorphiic-fetch
                    "Content-Type": "application/json"
                }
            };
            return this.doFetch(e, r)
        }
        ,
        e.prototype.doFetch = function(e, t) {
            var n = this
              , r = fetch(e, t)
              , o = a.timeout(function() {
                return Promise.resolve(n.createFakeTimeoutResponse(e))
            }, this.requestTimeout);
            return Promise.race([r, o]).then(function(e) {
                return 408 === e.status && c.default.error(u.ErrorTemplates.generateErrorMessage(u.ErrorCodes.NETWORK_TIMEOUT)),
                e.ok ? e.json() : function(e, t) {
                    return function(e) {
                        return e.text()
                    }(t).then(function(n) {
                        throw i.default.count("HttpClient", e, t.status + "", "ERROR"),
                        new l(t,n)
                    })
                }(t.method, e)
            }, function(e) {
                throw new s.IxApplicationError(u.ErrorTemplates.generateError(u.ErrorCodes.NETWORK_TIMEOUT))
            })
        }
        ,
        e.prototype.createFakeTimeoutResponse = function(e) {
            return new Response(u.ErrorTemplates.generateErrorMessage(u.ErrorCodes.NETWORK_TIMEOUT),{
                status: 408,
                statusText: "Client Timeout"
            })
        }
        ,
        e
    }();
    t.default = p
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), i = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
    , c = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(5)
      , s = n(23)
      , u = n(1)
      , l = "api.stripe.com/"
      , p = JSON.stringify(a.VERSION_INFO);
    var f = function(e) {
        function t(n, r, o) {
            var i = e.call(this, {
                message: n,
                request_id: r,
                code: o
            }) || this;
            return Object.setPrototypeOf(i, t.prototype),
            i
        }
        return o(t, e),
        t.fromHttpError = function(e) {
            var n = {
                message: e.message,
                code: e.error.code
            };
            try {
                n = JSON.parse(e.message).error
            } catch (e) {}
            var r = e.response.headers ? e.response.headers.get("request-id") : "";
            return new t(n.message,r,n.code)
        }
        ,
        t
    }(u.IxApplicationError);
    t.IxStripeHttpError = f;
    var h = function() {
        function e(e, t, n, r) {
            void 0 === r && (r = "v1"),
            this.resourceName = e,
            this.httpClient = t,
            this.networkMonitor = n,
            this.resourceVersion = r
        }
        return e.prototype.get = function(e, t, n) {
            var r, o, a, u = this, h = (r = this.resourceVersion,
            o = this.resourceName,
            "https://" + l + r + "/" + o + ((a = e) ? "/" + a : "")), d = new Headers;
            d.append("Stripe-Version", "2018-08-23"),
            d.append("X-Stripe-Terminal-User-Agent", p),
            n && d.append("Authorization", "Bearer " + n);
            return this.networkMonitor.withMonitoring(this.resourceName, e, function() {
                return i(u, void 0, void 0, function() {
                    var e;
                    return c(this, function(n) {
                        switch (n.label) {
                        case 0:
                            return n.trys.push([0, 2, , 3]),
                            [4, this.httpClient.get(h, t, d)];
                        case 1:
                            return [2, n.sent()];
                        case 2:
                            throw (e = n.sent())instanceof s.IxHttpError ? f.fromHttpError(e) : e;
                        case 3:
                            return [2]
                        }
                    })
                })
            })
        }
        ,
        e
    }();
    t.IxStripeClient = h;
    var d = function(e) {
        function t(t, n, r, o) {
            return void 0 === o && (o = "v1"),
            e.call(this, t, n, r, o) || this
        }
        return o(t, e),
        t.prototype.loadResource = function(t, n, r) {
            return e.prototype.get.call(this, t, n, r)
        }
        ,
        t.prototype.queryResource = function(t, n) {
            return e.prototype.get.call(this, null, t, n)
        }
        ,
        t
    }(h);
    t.default = d
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), i = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
    , c = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(24)
      , s = n(3)
      , u = n(0)
      , l = function(e) {
        function t(t, n, r) {
            var o = e.call(this, "payment_intents", t, r) || this;
            return o.connectionTokenMgr = n,
            o
        }
        return o(t, e),
        t.prototype.getPaymentIntentIdFromClientSecret = function(e) {
            var n = e.match(t.CLIENT_SECRET_REGEX);
            return s.AssertUtils.assert(!!n, u.ErrorCodes.INVALID_PAYMENT_INTENT_CLIENT_SECRET),
            n[1]
        }
        ,
        t.prototype.loadPaymentIntentBySecret = function(t) {
            return i(this, void 0, void 0, function() {
                var n, r, o;
                return c(this, function(i) {
                    switch (i.label) {
                    case 0:
                        return n = this.getPaymentIntentIdFromClientSecret(t),
                        [4, this.connectionTokenMgr.getActiveCredentials()];
                    case 1:
                        return r = i.sent(),
                        [4, e.prototype.loadResource.call(this, n, {
                            client_secret: t
                        }, r)];
                    case 2:
                        return [2, {
                            id: (o = i.sent()).id,
                            created: o.created,
                            metadata: o.metadata,
                            amount: o.amount,
                            currency: o.currency,
                            statement_descriptor: o.statement_descriptor,
                            description: o.description,
                            status: o.status
                        }]
                    }
                })
            })
        }
        ,
        t.CLIENT_SECRET_REGEX = /^(pi_[^_]+)_secret_[^-]+$/,
        t
    }(a.default);
    t.default = l
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var o in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
    }
      , o = this && this.__decorate || function(e, t, n, r) {
        var o, i = arguments.length, c = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            c = Reflect.decorate(e, t, n, r);
        else
            for (var a = e.length - 1; a >= 0; a--)
                (o = e[a]) && (c = (i < 3 ? o(c) : i > 3 ? o(t, n, c) : o(t, n)) || c);
        return i > 3 && c && Object.defineProperty(t, n, c),
        c
    }
      , i = this && this.__metadata || function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    }
      , c = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
      , a = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = n(4)
      , u = n(46)
      , l = n(3)
      , p = n(25)
      , f = n(14);
    t.ConnectionStatus = f.ConnectionStatus;
    var h = n(9)
      , d = n(1)
      , y = n(20)
      , _ = n(19)
      , v = n(0)
      , E = new l.ObjectChecker({
        ip_address: new l.TypeofChecker("string"),
        serial_number: new l.TypeofChecker("string")
    })
      , m = function() {
        function e(e, t, n, r, o, i, c) {
            this.posDeviceId = e,
            this.discoveryService = t,
            this.jackRabbitService = n,
            this.delegate = r,
            this.paymentIntentClient = o,
            this.healthMonitor = i,
            this.connectionTokenMgr = c,
            this.collectPaymentMethodAttempt = null,
            this.collectSourceAttempt = null,
            this.paymentStatus = _.PaymentStatus.READY,
            s.default.count("Terminal", "TerminalCreated", e, "OK")
        }
        return e.prototype.getPosDeviceId = function() {
            return this.posDeviceId
        }
        ,
        e.prototype.getConnectionStatus = function() {
            return this.jackRabbitService.getConnectionStatus()
        }
        ,
        e.prototype.getPaymentStatus = function() {
            return this.paymentStatus
        }
        ,
        e.prototype.discoverReaders = function(e) {
            return c(this, void 0, void 0, function() {
                var t;
                return a(this, function(n) {
                    return t = new l.ObjectChecker({
                        method: l.NullableType(new l.OneofType(new l.ExactValueType("registered"),new l.ExactValueType("simulated"))),
                        location: l.NullableType(new l.TypeofChecker("string"))
                    },!0),
                    l.AssertUtils.checkType(l.NullableType(t), e),
                    [2, this.discoveryService.discoverReaders(e)]
                })
            })
        }
        ,
        e.prototype.startReaderDiscovery = function(e, t, n) {
            return void 0 === e && (e = h.DEFAULT_DISCOVERY_CONFIG),
            c(this, void 0, void 0, function() {
                return a(this, function(r) {
                    return this.discoveryService.startDiscovery(e, t, n),
                    [2]
                })
            })
        }
        ,
        e.prototype.getDiscoveredReaders = function() {
            return this.discoveryService.getDiscoveredReaders()
        }
        ,
        e.prototype.stopReaderDiscovery = function() {
            return c(this, void 0, void 0, function() {
                return a(this, function(e) {
                    return this.discoveryService.stopDiscovery(),
                    [2]
                })
            })
        }
        ,
        e.prototype.connectReader = function(e) {
            return c(this, void 0, void 0, function() {
                var t;
                return a(this, function(n) {
                    switch (n.label) {
                    case 0:
                        return l.AssertUtils.checkType(E, e, v.ErrorCodes.INVALID_READER_SHAPE),
                        [4, this.jackRabbitService.connect(e)];
                    case 1:
                        // we need to do thiis for jsdom to not execute the transpiled await
                        return t = n.sent(),
                        t ? this.healthMonitor.start(t.sdkRpcSession) : null,
                        [2, {
                            connection: {
                                reader: t? t.reader : null
                            }
                        }]
                    }
                })
            })
        }
        ,
        e.prototype.disconnectReader = function() {
            return c(this, void 0, void 0, function() {
                return a(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, this.jackRabbitService.disconnect()];
                    case 1:
                        return e.sent(),
                        [2, {}]
                    }
                })
            })
        }
        ,
        e.prototype.clearConnectionToken = function() {
            return c(this, void 0, void 0, function() {
                return a(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, this.disconnectReader()];
                    case 1:
                        return e.sent(),
                        this.connectionTokenMgr.invalidateConnectionToken(),
                        [2, {}]
                    }
                })
            })
        }
        ,
        e.prototype.clearReaderDisplay = function() {
            return c(this, void 0, void 0, function() {
                return a(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, this.jackRabbitService.clearReaderDisplay()];
                    case 1:
                        return e.sent(),
                        [2, {}]
                    }
                })
            })
        }
        ,
        e.prototype.setReaderDisplay = function(e) {
            return c(this, void 0, void 0, function() {
                var t, n, o, i;
                return a(this, function(c) {
                    switch (c.label) {
                    case 0:
                        return t = new l.ObjectChecker({
                            description: new l.TypeofChecker("string"),
                            quantity: new l.TypeofChecker("number"),
                            amount: new l.TypeofChecker("number")
                        },!0),
                        n = new l.ObjectChecker({
                            lineItems: new l.ArrayChecker(t),
                            tax: l.NullableType(new l.TypeofChecker("number")),
                            total: new l.TypeofChecker("number"),
                            currency: new l.TypeofChecker("string")
                        },!0),
                        o = new l.ObjectChecker({
                            cart: n,
                            type: new l.ExactValueType("cart")
                        },!0),
                        l.AssertUtils.checkType(o, e),
                        this.ensureConnected(),
                        i = r({}, e.cart, {
                            currency: e.cart.currency.toLowerCase()
                        }),
                        [4, this.jackRabbitService.setReaderDisplay({
                            type: e.type,
                            cart: i
                        })];
                    case 1:
                        return c.sent(),
                        [2, {}]
                    }
                })
            })
        }
        ,
        e.prototype.collectPaymentMethod = function(e) {
            return c(this, void 0, void 0, function() {
                var t, n, r, o, i, c = this;
                return a(this, function(a) {
                    switch (a.label) {
                    case 0:
                        l.AssertUtils.checkType(new l.RegexType(p.default.CLIENT_SECRET_REGEX,"PaymentIntent client_secret"), e, v.ErrorCodes.INVALID_PAYMENT_INTENT_CLIENT_SECRET),
                        this.ensureConnected(),
                        t = this.fetchPaymentIntent(e),
                        n = function(e) {
                            return c.startCollectingPaymentMethod(e)
                        }
                        ,
                        a.label = 1;
                    case 1:
                        return a.trys.push([1, , 4, 5]),
                        this.collectPaymentMethodAttempt = y.Cancelable.chainCancelable(t, n),
                        this.setPaymentStatus(_.PaymentStatus.COLLECTING_PAYMENT_METHOD),
                        [4, t.result()];
                    case 2:
                        return r = a.sent(),
                        [4, this.collectPaymentMethodAttempt.result()];
                    case 3:
                        return o = a.sent(),
                        i = {
                            payment_method: o,
                            status: "requires_confirmation"
                        },
                        [2, {
                            paymentIntent: Object.assign({}, r, i)
                        }];
                    case 4:
                        return this.collectPaymentMethodAttempt = null,
                        this.setPaymentStatus(_.PaymentStatus.READY),
                        [7];
                    case 5:
                        return [2]
                    }
                })
            })
        }
        ,
        e.prototype.confirmPaymentIntent = function(e) {
            return c(this, void 0, void 0, function() {
                var t, n;
                return a(this, function(r) {
                    switch (r.label) {
                    case 0:
                        t = new l.ObjectChecker({
                            id: new l.RegexType(/^pi_/),
                            payment_method: new l.TypeofChecker("object")
                        }),
                        l.AssertUtils.checkType(t, e, v.ErrorCodes.INVALID_PAYMENT_INTENT_INPUT_SHAPE),
                        this.validateIntentState(e, "requires_confirmation"),
                        this.ensureConnected(),
                        this.setPaymentStatus(_.PaymentStatus.CONFIRMING_PAYMENT_INTENT),
                        r.label = 1;
                    case 1:
                        return r.trys.push([1, , 3, 4]),
                        [4, this.jackRabbitService.confirmPayment({
                            payment_intent_id: e.id,
                            payment_method: e.payment_method
                        })];
                    case 2:
                        return n = r.sent(),
                        [2, this.resultingChargeToUpdatedPaymentIntent(e, n)];
                    case 3:
                        return this.setPaymentStatus(_.PaymentStatus.READY),
                        [7];
                    case 4:
                        return [2]
                    }
                })
            })
        }
        ,
        e.prototype.cancelCollectPaymentMethod = function() {
            return c(this, void 0, void 0, function() {
                return a(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return l.AssertUtils.checkState(null != this.collectPaymentMethodAttempt, v.ErrorCodes.NO_ACTIVE_COLLECT_PAYMENT_METHOD_ATTEMPT),
                        [4, this.collectPaymentMethodAttempt.cancel()];
                    case 1:
                        return e.sent(),
                        this.setPaymentStatus(_.PaymentStatus.READY),
                        [2, {}]
                    }
                })
            })
        }
        ,
        e.prototype.readSource = function() {
            return c(this, void 0, void 0, function() {
                var e;
                return a(this, function(t) {
                    switch (t.label) {
                    case 0:
                        return this.ensureConnected(),
                        this.collectSourceAttempt = this.jackRabbitService.readSource(),
                        [4, this.collectSourceAttempt.result()];
                    case 1:
                        return (e = t.sent()).confirm_error ? [2, {
                            error: {
                                request_id: e.request_id,
                                code: e.confirm_error.code,
                                message: e.confirm_error.message
                            }
                        }] : [2, {
                            source: e.created_source
                        }]
                    }
                })
            })
        }
        ,
        e.prototype.cancelReadSource = function() {
            return c(this, void 0, void 0, function() {
                return a(this, function(e) {
                    switch (e.label) {
                    case 0:
                        return l.AssertUtils.checkState(null != this.collectSourceAttempt, v.ErrorCodes.NO_ACTIVE_READ_SOURCE_ATTEMPT),
                        [4, this.collectSourceAttempt.cancel()];
                    case 1:
                        return e.sent(),
                        [2, {}]
                    }
                })
            })
        }
        ,
        e.prototype.fetchPaymentIntent = function(e) {
            var t = this;
            return new y.Cancelable({
                execute: function() {
                    return {
                        result: t.paymentIntentClient.loadPaymentIntentBySecret(e)
                    }
                }
            })
        }
        ,
        e.prototype.startCollectingPaymentMethod = function(e) {
            var t = this;
            return new y.Cancelable({
                execute: function() {
                    var n = {
                        charge_amount: e.amount,
                        currency: e.currency,
                        tip_amount: 0,
                        cashback_amount: 0
                    }
                      , r = t.jackRabbitService.collectPaymentMethod({
                        charge_amount: n
                    });
                    return {
                        result: r.result,
                        resource: r
                    }
                },
                onCancel: function(e) {
                    e.cancel()
                }
            })
        }
        ,
        e.prototype.resultingChargeToUpdatedPaymentIntent = function(e, t) {
            var n = JSON.parse(JSON.stringify(r({}, e, {
                payment_method: void 0
            })));
            return t.processed_charge ? (s.default.count("Terminal", "ConfirmResult", "ChargeApprove", "OK"),
            n.status = "requires_capture",
            n.source = {
                id: t.processed_charge.source.id,
                card_present: t.processed_charge.source.card_present
            },
            {
                paymentIntent: n
            }) : t.confirm_error ? (s.default.count("Terminal", "ConfirmResult", "ConfirmError", "ERROR", t.confirm_error.code),
            {
                error: {
                    code: t.confirm_error.code,
                    message: t.confirm_error.message,
                    paymentIntent: null
                }
            }) : (s.default.count("Terminal", "ConfirmResult", "ChargeDecline", "ERROR", t.declined_charge.error.code),
            n.status = "requires_source",
            {
                error: {
                    request_id: t.request_id,
                    code: "card_declined",
                    decline_code: t.declined_charge.error.code,
                    message: t.declined_charge.error.message,
                    paymentIntent: n
                }
            })
        }
        ,
        e.prototype.validateIntentState = function(e, t) {
            l.AssertUtils.checkState(e && e.status === t, v.ErrorCodes.UNEXPECTED_INTENT_STATUS, {
                expectedState: t,
                intentStatus: e.status
            })
        }
        ,
        e.prototype.ensureConnected = function() {
            var e = this.getConnectionStatus();
            l.AssertUtils.checkState(e === f.ConnectionStatus.CONNECTED, v.ErrorCodes.NO_ESTABLISHED_CONNECTION)
        }
        ,
        e.prototype.setPaymentStatus = function(e) {
            this.paymentStatus = e,
            this.delegate.onPaymentStatusChange && this.delegate.onPaymentStatusChange({
                status: e
            })
        }
        ,
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", [Object]), i("design:returntype", Promise)], e.prototype, "discoverReaders", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", [Object, Function, Function]), i("design:returntype", Promise)], e.prototype, "startReaderDiscovery", null),
        o([u.TraceMethod, i("design:type", Function), i("design:paramtypes", []), i("design:returntype", Object)], e.prototype, "getDiscoveredReaders", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", []), i("design:returntype", Promise)], e.prototype, "stopReaderDiscovery", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", [Object]), i("design:returntype", Promise)], e.prototype, "connectReader", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", []), i("design:returntype", Promise)], e.prototype, "disconnectReader", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", []), i("design:returntype", Promise)], e.prototype, "clearConnectionToken", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", []), i("design:returntype", Promise)], e.prototype, "clearReaderDisplay", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", [Object]), i("design:returntype", Promise)], e.prototype, "setReaderDisplay", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", [String]), i("design:returntype", Promise)], e.prototype, "collectPaymentMethod", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", [Object]), i("design:returntype", Promise)], e.prototype, "confirmPaymentIntent", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", []), i("design:returntype", Promise)], e.prototype, "cancelCollectPaymentMethod", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", []), i("design:returntype", Promise)], e.prototype, "readSource", null),
        o([u.TraceMethod, d.WithApplicationErrorsLiftedToTry, i("design:type", Function), i("design:paramtypes", []), i("design:returntype", Promise)], e.prototype, "cancelReadSource", null),
        e
    }();
    t.default = m
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i, c = n(29), a = n(28), s = c.net_rpc_proto_applicationerrorcode.ApplicationEC, u = a.net_rpc_proto_rpc.RpcEC, l = n(1), p = n(0);
    !function(e) {
        e[e.RPC = 0] = "RPC",
        e[e.APPLICATION = 1] = "APPLICATION"
    }(i = t.RpcErrorType || (t.RpcErrorType = {})),
    t.isRetriableRpcNetworkError = function(e) {
        return e === u.SERVER_UNREACHABLE || e === u.SERVER_UNRESOLVABLE || e === u.RETRY || e === u.SERVER_BUSY || e === u.TIMEOUT || e === u.NETWORK_UNAVAILABLE
    }
    ,
    t.isRpcUnauthenticatedError = function(e) {
        return e === s.AUTHENTICATION_FAILURE || e === s.UNAUTHORIZED || e === s.INVALID_SESSION_TOKEN
    }
    ;
    var f = function(e) {
        function t(n) {
            var r = e.call(this, p.ErrorTemplates.generateError(p.ErrorCodes.RPC_ERROR, {
                msg: n.error
            })) || this;
            return r.response = n,
            Object.setPrototypeOf(r, t.prototype),
            r
        }
        return o(t, e),
        t.prototype.errorType = function() {
            return this.applicationEc() !== s.OK ? i.APPLICATION : i.RPC
        }
        ,
        t.prototype.rpcEc = function() {
            return this.response.rpc_error_code || u.UNKNOWN_RPC_ERROR
        }
        ,
        t.prototype.applicationEc = function() {
            return this.response.app_error_code || s.UNKNOWN_APPLICATION_ERROR
        }
        ,
        t
    }(l.IxApplicationError);
    t.IxRpcError = f
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        !function(e) {
            e.UNKNOWN_RPC_ERROR = "UNKNOWN_RPC_ERROR",
            e.RPC_OK = "RPC_OK",
            e.RPC_ERROR = "RPC_ERROR",
            e.NETWORK_UNAVAILABLE = "NETWORK_UNAVAILABLE",
            e.SERVER_UNRESOLVABLE = "SERVER_UNRESOLVABLE",
            e.SERVER_UNREACHABLE = "SERVER_UNREACHABLE",
            e.BAD_REQUEST = "BAD_REQUEST",
            e.BAD_RESPONSE = "BAD_RESPONSE",
            e.TIMEOUT = "TIMEOUT",
            e.RETRY = "RETRY",
            e.SERVER_BUSY = "SERVER_BUSY"
        }(e.RpcEC || (e.RpcEC = {})),
        function(e) {
            !function(e) {
                e.STANDARD = "STANDARD",
                e.DEV = "DEV"
            }(e.RequestType || (e.RequestType = {}))
        }(e.RpcRequest || (e.RpcRequest = {}))
    }(t.net_rpc_proto_rpc || (t.net_rpc_proto_rpc = {}))
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        !function(e) {
            e.UNKNOWN_APPLICATION_ERROR = "UNKNOWN_APPLICATION_ERROR",
            e.OK = "OK",
            e.LOCK_RESOURCES_EXCEPTION = "LOCK_RESOURCES_EXCEPTION",
            e.INVALID_LOAD_ID = "INVALID_LOAD_ID",
            e.ILLEGAL_STATE = "ILLEGAL_STATE",
            e.AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE",
            e.INVALID_SESSION_TOKEN = "INVALID_SESSION_TOKEN",
            e.SHORT_LIVED_SESSION = "SHORT_LIVED_SESSION",
            e.UNAUTHORIZED = "UNAUTHORIZED",
            e.INVALID_REQUEST = "INVALID_REQUEST",
            e.INVALID_RESPONSE = "INVALID_RESPONSE",
            e.ILLEGAL_VERSION = "ILLEGAL_VERSION",
            e.SERVER_ERROR = "SERVER_ERROR",
            e.HEALTH_FAILURE = "HEALTH_FAILURE",
            e.UNREACHABLE_ENDPOINT = "UNREACHABLE_ENDPOINT",
            e.INVALID_CONFIG = "INVALID_CONFIG",
            e.PERSISTER_FAILURE = "PERSISTER_FAILURE",
            e.MONGO_SOCKET_FAILURE = "MONGO_SOCKET_FAILURE",
            e.INTERRUPTED = "INTERRUPTED",
            e.CREATE_MERCHANT_FAILED = "CREATE_MERCHANT_FAILED",
            e.CREATE_STORE_FAILED = "CREATE_STORE_FAILED",
            e.ACCOUNT_ALREADY_EXISTS = "ACCOUNT_ALREADY_EXISTS"
        }(e.ApplicationEC || (e.ApplicationEC = {}))
    }(t.net_rpc_proto_applicationerrorcode || (t.net_rpc_proto_applicationerrorcode = {}))
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
      , o = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(4)
      , c = function() {
        function e(e, t) {
            this.connectivityVoter = e,
            this.latencyVoter = t
        }
        return e.prototype.withMonitoring = function(e, t, n) {
            return r(this, void 0, void 0, function() {
                var r;
                return o(this, function(o) {
                    switch (o.label) {
                    case 0:
                        return [4, i.default.meterAsync("NetworkMonitor", e, t, n)];
                    case 1:
                        return r = o.sent(),
                        this.connectivityVoter.reportHealthMetric(e, "OK" === r.meter.result ? "OK" : "GENERIC_PROBLEM", r.meter.error_code),
                        this.latencyVoter.reportHealthMetric(e, "OK" === r.meter.result ? "OK" : "GENERIC_PROBLEM", r.meter.error_code, r.meter.duration),
                        [2, r.result()]
                    }
                })
            })
        }
        ,
        e
    }();
    t.NetworkMonitor = c
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(6)
      , c = n(17);
    t.DEFAULT_ARMADA_ENDPOINT = {
        url_path: "armada.stripe.com",
        port: 443
    };
    var a = function(e) {
        function n(n, r, o) {
            return void 0 === o && (o = t.DEFAULT_ARMADA_ENDPOINT),
            e.call(this, "ArmadaService", n, o, i.Scheme.HTTPS, r) || this
        }
        return o(n, e),
        n.prototype.reportHealth = function(e, t) {
            return this.rpc("reportHealth", e, t)
        }
        ,
        n
    }(c.default);
    t.default = a
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e) {
            this.maxSize = e,
            this.internal = []
        }
        return e.prototype.push = function(e) {
            this.internal.length === this.maxSize && this.internal.shift(),
            this.internal.push(e)
        }
        ,
        e.prototype.getItems = function() {
            return this.internal.slice(0)
        }
        ,
        e.prototype.isAtCapacity = function() {
            return this.internal.length === this.maxSize
        }
        ,
        e.prototype.maxCapacity = function() {
            return this.maxSize
        }
        ,
        e
    }();
    t.EvictionQueue = r
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        !function(e) {
            e[e.INVALID_HEALTH_STATUS = 0] = "INVALID_HEALTH_STATUS",
            e[e.OK = 1] = "OK",
            e[e.GENERIC_PROBLEM = 2] = "GENERIC_PROBLEM"
        }(e.HealthStatus || (e.HealthStatus = {}))
    }(t.model_monitor_healthmodel || (t.model_monitor_healthmodel = {}))
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), i = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
    , c = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, s = n(33), u = n(5), l = n(10), p = n(32), f = s.model_monitor_healthmodel.HealthStatus, h = n(2);
    function d(e) {
        return e.some(function(e) {
            return e.health_status != f[f.OK]
        }) ? f[f.GENERIC_PROBLEM] : f[f.OK]
    }
    !function(e) {
        e.CONNECTION = "connection",
        e.LATENCY = "latency"
    }(a = t.HealthVoterName || (t.HealthVoterName = {}));
    var y = function() {
        function e(e, t, n) {
            void 0 === n && (n = 6e4),
            this.armada = e,
            this.voters = t,
            this.reportInterval = n,
            this.rpcSession = null,
            this.deviceInfo = null,
            this.interval = null,
            this.deviceInfo = u.getDeviceInfo()
        }
        return e.prototype.start = function(e) {
            var t = this;
            this.interval && this.stop(),
            this.rpcSession = e,
            this.interval = l.setIntervalAndExecute(function() {
                return t.reportHealthToServer()
            }, this.reportInterval)
        }
        ,
        e.prototype.stop = function() {
            this.interval && clearInterval(this.interval)
        }
        ,
        e.prototype.getCurrentHealthReport = function() {
            var e = this.voters.map(function(e) {
                return e.getHealthVoterStatus()
            });
            return {
                role: "pos-js",
                health_voters: e,
                health_status: d(e)
            }
        }
        ,
        e.prototype.reportHealthToServer = function() {
            return i(this, void 0, void 0, function() {
                var e;
                return c(this, function(t) {
                    switch (t.label) {
                    case 0:
                        return t.trys.push([0, 2, , 3]),
                        [4, this.armada.reportHealth({
                            device_info: this.deviceInfo,
                            health_summary: this.getCurrentHealthReport()
                        }, this.rpcSession)];
                    case 1:
                        return t.sent(),
                        [3, 3];
                    case 2:
                        return e = t.sent(),
                        h.default.debug(e),
                        [3, 3];
                    case 3:
                        return [2]
                    }
                })
            })
        }
        ,
        e
    }();
    function _(e) {
        var t = e.map(function(e) {
            return e.detail
        }).filter(function(e) {
            return null != e
        });
        if (0 !== t.length) {
            var n = [];
            return new Set(t).forEach(function(e) {
                n.push(e)
            }),
            n.join(";")
        }
    }
    t.HealthMonitor = y;
    var v = function() {
        function e(e, t) {
            void 0 === t && (t = 5),
            this.healthVoterName = e,
            this.queueSize = t,
            this.recentReportsMap = {}
        }
        return e.prototype.reportHealthMetric = function(e, t, n, r) {
            this.recentReportsMap[e] || (this.recentReportsMap[e] = new p.EvictionQueue(this.queueSize)),
            this.recentReportsMap[e].push({
                name: e,
                health_status: t,
                detail: n,
                metric_value: r
            })
        }
        ,
        e.prototype.getHealthVoterStatus = function() {
            var e = this
              , t = Object.keys(this.recentReportsMap).map(function(t) {
                return e.reduceMetricsPoints(t, e.recentReportsMap[t])
            })
              , n = this.reduceMetricsToSummary(t);
            return {
                name: this.healthVoterName,
                metrics: t,
                health_status: n.health_status,
                detail: n.detail
            }
        }
        ,
        e.prototype.reduceMetricsToSummary = function(e) {
            return {
                health_status: d(e)
            }
        }
        ,
        e
    }();
    t.HealthVoter = v;
    var E = function(e) {
        function t() {
            return e.call(this, a.CONNECTION) || this
        }
        return o(t, e),
        t.prototype.reduceMetricsPoints = function(e, t) {
            return {
                name: e,
                health_status: d(t.getItems()),
                detail: _(t.getItems())
            }
        }
        ,
        t
    }(v);
    t.ConnectivityVoter = E;
    var m = function(e) {
        function t(t) {
            void 0 === t && (t = 1e4);
            var n = e.call(this, a.LATENCY) || this;
            return n.maxAllowableLatency = t,
            n
        }
        return o(t, e),
        t.prototype.reduceMetricsPoints = function(e, t) {
            var n = this;
            return {
                name: e,
                health_status: t.getItems().some(function(e) {
                    return e.metric_value && e.metric_value > n.maxAllowableLatency
                }) ? "GENERIC_PROBLEM" : "OK",
                detail: _(t.getItems()),
                metric_value: Math.max.apply(Math, t.getItems().map(function(e) {
                    return e.metric_value || 0
                }))
            }
        }
        ,
        t
    }(v);
    t.LatencyVoter = m
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(6)
      , c = n(6);
    t.DEFAULT_GATOR_ENDPOINT = {
        url_path: "gator.stripe.com",
        port: 443
    };
    var a = function(e) {
        function n(n, r, o) {
            return void 0 === o && (o = t.DEFAULT_GATOR_ENDPOINT),
            e.call(this, "GatorService", n, o, i.Scheme.HTTPS, r) || this
        }
        return o(n, e),
        n.prototype.reportEvent = function(e) {
            return this.rpc("reportEvent", e)
        }
        ,
        n.prototype.reportTrace = function(e) {
            return this.rpc("reportTrace", e)
        }
        ,
        n
    }(c.default);
    t.default = a
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), i = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
    , c = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function(e) {
        function t(t, n, r) {
            var o = e.call(this, "terminal/readers", t, r) || this;
            return o.connectionTokenMgr = n,
            o
        }
        return o(t, e),
        t.prototype.discoverReaders = function(t) {
            return i(this, void 0, void 0, function() {
                var n;
                return c(this, function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, this.connectionTokenMgr.getActiveCredentials()];
                    case 1:
                        return n = r.sent(),
                        [2, e.prototype.queryResource.call(this, t, n)]
                    }
                })
            })
        }
        ,
        t
    }(n(24).default);
    t.default = a
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        !function(e) {
            !function(e) {
                e.SOURCE_PENDING = "SOURCE_PENDING",
                e.SOURCE_CANCELED = "SOURCE_CANCELED"
            }(e.SourceRequestStatus || (e.SourceRequestStatus = {}))
        }(e.QueryCollectSourceResponse || (e.QueryCollectSourceResponse = {})),
        function(e) {
            !function(e) {
                e.PAYMENT_PENDING = "PAYMENT_PENDING",
                e.PAYMENT_CANCELED = "PAYMENT_CANCELED"
            }(e.PaymentRequestStatus || (e.PaymentRequestStatus = {}))
        }(e.QueryPaymentMethodResponse || (e.QueryPaymentMethodResponse = {}))
    }(t.rabbit_api_jackrabbitservice || (t.rabbit_api_jackrabbitservice = {}))
}
, function(e, t, n) {
    "use strict";
    var r = this && this.__assign || Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var o in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e
    }
      , o = this && this.__awaiter || function(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
            function c(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function a(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                e.done ? o(e.value) : new n(function(t) {
                    t(e.value)
                }
                ).then(c, a)
            }
            s((r = r.apply(e, t || [])).next())
        }
        )
    }
      , i = this && this.__generator || function(e, t) {
        var n, r, o, i, c = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return i = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (i[Symbol.iterator] = function() {
            return this
        }
        ),
        i;
        function a(i) {
            return function(a) {
                return function(i) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; c; )
                        try {
                            if (n = 1,
                            r && (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(o = o.call(r, i[1])).done)
                                return o;
                            switch (r = 0,
                            o && (i = [0, o.value]),
                            i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return c.label++,
                                {
                                    value: i[1],
                                    done: !1
                                };
                            case 5:
                                c.label++,
                                r = i[1],
                                i = [0];
                                continue;
                            case 7:
                                i = c.ops.pop(),
                                c.trys.pop();
                                continue;
                            default:
                                if (!(o = (o = c.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                    c = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    c.label = i[1];
                                    break
                                }
                                if (6 === i[0] && c.label < o[1]) {
                                    c.label = o[1],
                                    o = i;
                                    break
                                }
                                if (o && c.label < o[2]) {
                                    c.label = o[2],
                                    c.ops.push(i);
                                    break
                                }
                                o[2] && c.ops.pop(),
                                c.trys.pop();
                                continue
                            }
                            i = t.call(e, c)
                        } catch (e) {
                            i = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & i[0])
                        throw i[1];
                    return {
                        value: i[0] ? i[1] : void 0,
                        done: !0
                    }
                }([i, a])
            }
        }
    }
    ;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = n(21)
      , a = n(12)
      , s = n(37)
      , u = n(14)
      , l = s.rabbit_api_jackrabbitservice.QueryPaymentMethodResponse.PaymentRequestStatus
      , p = s.rabbit_api_jackrabbitservice.QueryCollectSourceResponse.SourceRequestStatus
      , f = n(8)
      , h = n(20)
      , d = n(0)
      , y = function() {
        function e(e, t, n) {
            void 0 === n && (n = 400),
            this.deviceFingerprint = e,
            this.connectionMgr = t,
            this.querySettleIntervaMs = n,
            this.transactionContext = null
        }
        return e.hasPaymentMethod = function(e) {
            return null != e.payment_method
        }
        ,
        e.hasSource = function(e) {
            return null != e.source_method
        }
        ,
        e.hasUserCancelledCollectPayment = function(e) {
            return c.tryOrDefault(function() {
                return e.payment_status === l.PAYMENT_CANCELED
            }, !1)
        }
        ,
        e.prototype.connect = function(e) {
            return this.connectionMgr.connect(e)
        }
        ,
        e.prototype.getConnectionStatus = function() {
            return this.connectionMgr.getConnectionStatus()
        }
        ,
        e.prototype.disconnect = function() {
            return this.connectionMgr.disconnect()
        }
        ,
        e.prototype.setReaderDisplay = function(e) {
            return o(this, void 0, void 0, function() {
                var t;
                return i(this, function(n) {
                    return this.maybeSetTransactionContext(),
                    t = r({}, e, {
                        transaction_context: this.transactionContext
                    }),
                    [2, this.connectionMgr.rabbitCallAuthenticated(function(e, n) {
                        return e.setReaderDisplay(t, n)
                    })]
                })
            })
        }
        ,
        e.prototype.clearReaderDisplay = function() {
            return o(this, void 0, void 0, function() {
                var e, t;
                return i(this, function(n) {
                    switch (n.label) {
                    case 0:
                        return this.maybeSetTransactionContext(),
                        e = {
                            transaction_context: this.transactionContext
                        },
                        [4, this.connectionMgr.rabbitCallAuthenticated(function(t, n) {
                            return t.clearReaderDisplay(e, n)
                        })];
                    case 1:
                        return t = n.sent(),
                        this.clearTransactionContext(),
                        [2, t]
                    }
                })
            })
        }
        ,
        e.prototype.collectPaymentMethod = function(e) {
            this.maybeSetTransactionContext();
            var t = r({}, e, {
                transaction_context: this.transactionContext
            });
            return this.connectionMgr.rabbitCallAuthenticated(function(e, n) {
                return e.collectPaymentMethod(t, n)
            }),
            this.queryUntilPaymentMethod()
        }
        ,
        e.prototype.confirmPayment = function(e) {
            var t = this;
            this.maybeSetTransactionContext();
            var n = r({}, e, {
                transaction_context: this.transactionContext
            });
            return this.connectionMgr.rabbitCallAuthenticated(function(e, t) {
                return e.confirmPayment(n, t)
            }).then(function(e) {
                return t.clearTransactionContext(),
                e
            }, function(e) {
                return t.clearTransactionContext(),
                Promise.reject(e)
            })
        }
        ,
        e.prototype.readSource = function() {
            var t = this
              , n = new h.Cancelable({
                execute: function(n) {
                    return {
                        result: o(t, void 0, void 0, function() {
                            var t;
                            return i(this, function(r) {
                                switch (r.label) {
                                case 0:
                                    return [4, this.connectionMgr.rabbitCallAuthenticated(function(e, t) {
                                        return e.collectSource({}, t)
                                    })];
                                case 1:
                                    r.sent(),
                                    t = {},
                                    r.label = 2;
                                case 2:
                                    return e.hasSource(t) ? [3, 5] : [4, a.sleep(this.querySettleIntervaMs)];
                                case 3:
                                    if (r.sent(),
                                    n())
                                        throw new u.IxRabbitError(d.ErrorTemplates.generateError(d.ErrorCodes.CANCELED));
                                    if (t.source_status === p.SOURCE_CANCELED)
                                        throw new u.IxRabbitError(d.ErrorTemplates.generateError(d.ErrorCodes.CANCELED_BY_CUSTOMER));
                                    return [4, this.connectionMgr.rabbitCallAuthenticated(function(e, t) {
                                        return e.queryCollectSource({}, t)
                                    })];
                                case 4:
                                    return t = r.sent(),
                                    [3, 2];
                                case 5:
                                    return [2, t.source_method]
                                }
                            })
                        })
                    }
                },
                onCancel: function(e) {
                    t.connectionMgr.rabbitCallAuthenticated(function(e, t) {
                        return e.cancelCollectSource({}, t)
                    })
                }
            });
            return h.Cancelable.chainCancelable(n, function(e) {
                return new h.Cancelable({
                    execute: function() {
                        return {
                            result: t.connectionMgr.rabbitCallAuthenticated(function(t, n) {
                                return t.confirmSource({
                                    source_method: e
                                }, n)
                            })
                        }
                    }
                })
            })
        }
        ,
        e.prototype.maybeSetTransactionContext = function(e) {
            void 0 === e && (e = {}),
            null == this.transactionContext && (this.transactionContext = {
                terminal_id: this.deviceFingerprint,
                start_time: (new Date).valueOf(),
                operator_id: e.cashierName || this.deviceFingerprint,
                transaction_id: e.transactionId || Math.floor(1e5 * Math.random()) + ""
            },
            f.default.setTransactionId(this.transactionContext.transaction_id))
        }
        ,
        e.prototype.clearTransactionContext = function() {
            f.default.clearTransactionId(),
            this.transactionContext = null
        }
        ,
        e.prototype.cancelCollectPaymentMethod = function(e) {
            return o(this, void 0, void 0, function() {
                var t;
                return i(this, function(n) {
                    return t = {
                        transaction_context: e
                    },
                    [2, this.connectionMgr.rabbitCallAuthenticated(function(e, n) {
                        return e.cancelCollectPaymentMethod(t, n)
                    })]
                })
            })
        }
        ,
        e.prototype.queryUntilPaymentMethod = function() {
            var t = this
              , n = !1
              , r = this.transactionContext;
            return {
                result: o(t, void 0, void 0, function() {
                    var t, o;
                    return i(this, function(i) {
                        switch (i.label) {
                        case 0:
                            return t = {
                                transaction_context: r
                            },
                            [4, this.queryPaymentMethod(t)];
                        case 1:
                            o = i.sent(),
                            i.label = 2;
                        case 2:
                            return e.hasPaymentMethod(o) ? [3, 5] : [4, a.sleep(this.querySettleIntervaMs)];
                        case 3:
                            if (i.sent(),
                            n)
                                throw new u.IxRabbitError(d.ErrorTemplates.generateError(d.ErrorCodes.CANCELED));
                            if (e.hasUserCancelledCollectPayment(o))
                                throw new u.IxRabbitError(d.ErrorTemplates.generateError(d.ErrorCodes.CANCELED_BY_CUSTOMER));
                            return [4, this.queryPaymentMethod(t)];
                        case 4:
                            return o = i.sent(),
                            [3, 2];
                        case 5:
                            return [2, o.payment_method]
                        }
                    })
                }),
                cancel: function() {
                    return n = !0,
                    t.cancelCollectPaymentMethod(r)
                }
            }
        }
        ,
        e.prototype.queryPaymentMethod = function(e) {
            return o(this, void 0, void 0, function() {
                return i(this, function(t) {
                    return [2, this.connectionMgr.rabbitCallAuthenticated(function(t, n) {
                        return t.queryPaymentMethod(e, n)
                    })]
                })
            })
        }
        ,
        e
    }();
    t.default = y
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(6)
      , c = function(e) {
        function t(t, n, r) {
            return e.call(this, "JackRabbitService", t, r, i.Scheme.HTTPS, n) || this
        }
        return o(t, e),
        t.prototype.getUntracedMethods = function() {
            return ["queryPaymentMethod", "queryCollectSource"]
        }
        ,
        t.prototype.activateTerminal = function(e) {
            return this.rpc("activateTerminal", e, null, {
                isRetriable: !1
            })
        }
        ,
        t.prototype.terminalHeartbeat = function(e, t) {
            return this.rpc("terminalHeartbeat", e, t)
        }
        ,
        t.prototype.setReaderDisplay = function(e, t) {
            return this.rpc("setReaderDisplay", e, t)
        }
        ,
        t.prototype.clearReaderDisplay = function(e, t) {
            return this.rpc("clearReaderDisplay", e, t)
        }
        ,
        t.prototype.collectPaymentMethod = function(e, t) {
            return this.rpc("collectPaymentMethod", e, t)
        }
        ,
        t.prototype.queryPaymentMethod = function(e, t) {
            return this.rpc("queryPaymentMethod", e, t)
        }
        ,
        t.prototype.confirmPayment = function(e, t) {
            return this.rpc("confirmPayment", e, t)
        }
        ,
        t.prototype.cancelCollectPaymentMethod = function(e, t) {
            return this.rpc("cancelCollectPaymentMethod", e, t)
        }
        ,
        t.prototype.collectSource = function(e, t) {
            return this.rpc("collectSource", e, t)
        }
        ,
        t.prototype.queryCollectSource = function(e, t) {
            return this.rpc("queryCollectSource", e, t)
        }
        ,
        t.prototype.confirmSource = function(e, t) {
            return this.rpc("confirmSource", e, t)
        }
        ,
        t.prototype.cancelCollectSource = function(e, t) {
            return this.rpc("cancelCollectSource", e, t)
        }
        ,
        t
    }(n(17).default);
    t.default = c
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(11)
      , c = n(18)
      , a = n(7);
    n(15);
    var s = n(8);
    function u(e) {
        return {
            event_name: e.event,
            elapsed_ms: e.duration
        }
    }
    function l(e) {
        var t;
        return ((t = {})[i.LogLevel.DEBUG] = 0,
        t[i.LogLevel.INFO] = 1,
        t[i.LogLevel.WARN] = 2,
        t[i.LogLevel.ERROR] = 3,
        t)[e]
    }
    function p(e) {
        return {
            log_level: l(e.log_level),
            tag: e.tag,
            message: "text" === e.type ? e.message : void 0,
            exception: "exception" === e.type ? e.exception : void 0
        }
    }
    function f(e) {
        return {
            time_offset_ms: e.time_offset_ms,
            log_point: "log" === e.type ? p(e.log) : void 0,
            meter_point: "meter" === e.type ? u(e.meter) : void 0
        }
    }
    function h(e) {
        return {
            id: (e.parent_trace_id ? e.parent_trace_id + s.default.TRACE_ID_SEPARATOR : "") + e.id,
            request_info: {
                user_agent: navigator.userAgent
            },
            start_time_ms: e.start_time_ms,
            total_time_ms: e.total_time_ms,
            service: e.service,
            method: e.method,
            request: e.request,
            response: "success" === e.type ? e.response : void 0,
            exception: "exception" === e.type ? e.exception : void 0,
            version_info: e.version_info,
            traces: e.trace_points.map(function(e) {
                return f(e)
            })
        }
    }
    t.mapMeterEventToMeterPoint = u,
    t.mapLogLevelToNumber = l,
    t.mapLogToLogPoint = p,
    t.mapTracePointToTracePointPb = f,
    t.mapTraceToTracePb = h;
    var d = function(e) {
        function t(t, n, r) {
            void 0 === r && (r = 9e4);
            var o = e.call(this, r) || this;
            return o.posDeviceId = t,
            o.gator = n,
            o
        }
        return o(t, e),
        t.prototype.doFlush = function(e) {
            var t = this
              , n = e.map(function(e) {
                return h(e)
            }).map(function(e) {
                return {
                    origin_role: a.PackageUtils.getProjectName(),
                    origin_id: t.posDeviceId,
                    trace: e
                }
            });
            return this.gator.reportTrace({
                proxy_traces: n
            })
        }
        ,
        t
    }(c.PeriodicFlusher);
    t.GatorTraceCollector = d
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        !function(e) {
            !function(e) {
                e.OK = "OK",
                e.ERROR = "ERROR"
            }(e.Result || (e.Result = {}))
        }(e.EventResultPb || (e.EventResultPb = {}))
    }(t.api_gator_gatorservice || (t.api_gator_gatorservice = {}))
}
, function(e, t, n) {
    "use strict";
    var r, o = this && this.__extends || (r = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    );
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(18)
      , c = n(41).api_gator_gatorservice.EventResultPb
      , a = n(7);
    function s(e) {
        return {
            domain: e.domain,
            scope: e.scope,
            event: e.event,
            result: "OK" === e.result ? c.Result.OK : c.Result.ERROR,
            outcome: e.error_code,
            duration: "meter" === e.type ? e.duration : void 0,
            measurement: "gauge" === e.type ? e.measurement : void 0
        }
    }
    t.mapEventToEventResultPb = s;
    var u = function(e) {
        function t(t, n, r) {
            var o = e.call(this, r) || this;
            return o.posDeviceId = t,
            o.gator = n,
            o
        }
        return o(t, e),
        t.prototype.doFlush = function(e) {
            var t = this
              , n = e.map(function(e) {
                return {
                    origin_role: a.PackageUtils.getProjectName(),
                    origin_id: t.posDeviceId,
                    event: s(e)
                }
            });
            return this.gator.reportEvent({
                proxy_events: n
            })
        }
        ,
        t
    }(i.PeriodicFlusher);
    t.GatorEventCollector = u
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e() {}
        return e.prototype.collect = function(e) {
            console.log(e)
        }
        ,
        e
    }();
    t.ConsoleCollector = r
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(11);
    n(15);
    var o = function() {
        function e(e) {
            void 0 === e && (e = console),
            this.stdOut = e
        }
        return e.prototype.collect = function(e) {
            e.log_level !== r.LogLevel.WARN && e.log_level !== r.LogLevel.ERROR || this.stdOut.warn(e.message || e.exception)
        }
        ,
        e
    }();
    t.DeveloperFriendlyLogCollector = o
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(44)
      , o = n(43)
      , i = n(42)
      , c = n(40)
      , a = n(2)
      , s = n(4)
      , u = n(8)
      , l = n(23)
      , p = n(3)
      , f = n(5)
      , h = n(9)
      , d = n(39)
      , y = n(38)
      , _ = n(14)
      , v = n(25)
      , E = n(36)
      , m = n(26)
      , T = n(13)
      , b = n(35)
      , g = n(34)
      , R = n(31)
      , O = n(30)
      , C = n(16)
      , N = n(0);
    t.create = function(e) {
        return A.create(e)
    }
    ;
    var A = function() {
        function e() {}
        return e.create = function(e) {
            p.AssertUtils.checkUserGivenArg("function" == typeof e.onFetchConnectionToken, N.ErrorCodes.INVALID_ON_FETCH_CONNECTION_TOKEN),
            p.AssertUtils.checkUserGivenArg(!e.onUnexpectedReaderDisconnect || "function" == typeof e.onUnexpectedReaderDisconnect, N.ErrorCodes.INVALID_ON_UNEXPECTED_READER_DISCONNECT),
            p.AssertUtils.checkUserGivenArg(!e.onConnectionStatusChange || "function" == typeof e.onConnectionStatusChange, N.ErrorCodes.INVALID_ON_CONNECTION_STATUS_CHANGE),
            p.AssertUtils.checkUserGivenArg(!e.onPaymentStatusChange || "function" == typeof e.onPaymentStatusChange, N.ErrorCodes.INVALID_ON_PAYMENT_STATUS_CHANGE);
            var t = new l.default
              , n = f.getDeviceInfo()
              , A = new g.ConnectivityVoter
              , w = new g.LatencyVoter
              , I = new O.NetworkMonitor(A,w)
              , S = new R.default(t,I)
              , P = new g.HealthMonitor(S,[A, w])
              , D = [new r.DeveloperFriendlyLogCollector, u.default]
              , M = []
              , L = [s.default];
            if (e.logLevel === T.OutputLogLevel.VERBOSE) {
                var x = new o.ConsoleCollector;
                D.push(x),
                M.push(x),
                L.push(x),
                console.log("Stripe Terminal: Pos Device ID is " + n.device_uuid + ". Please send this when requesting assistance from support for fastest help. Happy Coding :)")
            }
            if (e.devMode !== T.DevMode.DEV && e.devMode !== T.DevMode.CANARY) {
                var k = new b.default(t,I)
                  , U = new i.GatorEventCollector(n.device_uuid,k);
                U.start(),
                M.push(U);
                var j = new c.GatorTraceCollector(n.device_uuid,k);
                j.start(),
                L.push(j)
            }
            a.default.setCollectors(D),
            s.default.setCollectors(M),
            u.default.setCollectors(L);
            var V = new C.default(e.onFetchConnectionToken,I)
              , F = new E.default(t,V,I)
              , B = new h.DiscoveryMethodFactory(F)
              , H = new h.default(B)
              , G = new _.default(n.device_uuid,e.devMode,V,e,function(e) {
                return new d.default(t,I,e)
            }
            )
              , Y = new y.default(n.device_uuid,G)
              , W = new v.default(t,V,I);
            return new m.default(n.device_uuid,H,Y,e,W,P,V)
        }
        ,
        e
    }();
    t.TerminalFactory = A
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(8);
    t.TraceMethod = function(e, t, n) {
        var o = n.value;
        return n.value = r.default.traceFn(o, t),
        n
    }
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e) {
            this.storageBin = e
        }
        return e.prototype.getDeviceFingerprint = function() {
            return this.storageBin.getValue() || this.storageBin.setValue("pos-" + Math.random().toString(36).substring(2)),
            this.storageBin.getValue()
        }
        ,
        e
    }();
    t.DeviceFingerprinter = r
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(e) {
            this.binName = e
        }
        return e.isEnabled = function() {
            try {
                var e = window.localStorage
                  , t = "__storage_test__";
                return e.setItem(t, t),
                e.removeItem(t),
                !0
            } catch (e) {
                return !1
            }
        }
        ,
        e.prototype.setValue = function(e) {
            localStorage.setItem(this.binName, JSON.stringify(e))
        }
        ,
        e.prototype.getValue = function() {
            var e = localStorage.getItem(this.binName);
            return null == e ? e : JSON.parse(e)
        }
        ,
        e.prototype.clearValue = function() {
            localStorage.setItem(this.binName, null)
        }
        ,
        e
    }();
    t.LocalStorageBin = r;
    var o = function() {
        function e(e) {
            this.binName = e
        }
        return e.isEnabled = function() {
            return !0
        }
        ,
        e.prototype.setValue = function(t) {
            e.storageMap[this.binName] = t
        }
        ,
        e.prototype.getValue = function() {
            return e.storageMap[this.binName] || null
        }
        ,
        e.prototype.clearValue = function() {
            e.storageMap[this.binName] = null
        }
        ,
        e.storageMap = {},
        e
    }();
    t.InMemoryStorageBin = o;
    var i = function() {
        function e(e) {
            void 0 === e && (e = "pos"),
            this.namespace = e
        }
        return e.prototype.getStorageBin = function(e) {
            var t = this.namespace + "-" + e;
            return r.isEnabled() ? new r(t) : new o(t)
        }
        ,
        e
    }();
    t.StorageMgr = i
}
, function(e, t) {
    var n, r, o = e.exports = {};
    function i() {
        throw new Error("setTimeout has not been defined")
    }
    function c() {
        throw new Error("clearTimeout has not been defined")
    }
    function a(e) {
        if (n === setTimeout)
            return setTimeout(e, 0);
        if ((n === i || !n) && setTimeout)
            return n = setTimeout,
            setTimeout(e, 0);
        try {
            return n(e, 0)
        } catch (t) {
            try {
                return n.call(null, e, 0)
            } catch (t) {
                return n.call(this, e, 0)
            }
        }
    }
    !function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : i
        } catch (e) {
            n = i
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : c
        } catch (e) {
            r = c
        }
    }();
    var s, u = [], l = !1, p = -1;
    function f() {
        l && s && (l = !1,
        s.length ? u = s.concat(u) : p = -1,
        u.length && h())
    }
    function h() {
        if (!l) {
            var e = a(f);
            l = !0;
            for (var t = u.length; t; ) {
                for (s = u,
                u = []; ++p < t; )
                    s && s[p].run();
                p = -1,
                t = u.length
            }
            s = null,
            l = !1,
            function(e) {
                if (r === clearTimeout)
                    return clearTimeout(e);
                if ((r === c || !r) && clearTimeout)
                    return r = clearTimeout,
                    clearTimeout(e);
                try {
                    r(e)
                } catch (t) {
                    try {
                        return r.call(null, e)
                    } catch (t) {
                        return r.call(this, e)
                    }
                }
            }(e)
        }
    }
    function d(e, t) {
        this.fun = e,
        this.array = t
    }
    function y() {}
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
        u.push(new d(e,t)),
        1 !== u.length || l || a(h)
    }
    ,
    d.prototype.run = function() {
        this.fun.apply(null, this.array)
    }
    ,
    o.title = "browser",
    o.browser = !0,
    o.env = {},
    o.argv = [],
    o.version = "",
    o.versions = {},
    o.on = y,
    o.addListener = y,
    o.once = y,
    o.off = y,
    o.removeListener = y,
    o.removeAllListeners = y,
    o.emit = y,
    o.prependListener = y,
    o.prependOnceListener = y,
    o.listeners = function(e) {
        return []
    }
    ,
    o.binding = function(e) {
        throw new Error("process.binding is not supported")
    }
    ,
    o.cwd = function() {
        return "/"
    }
    ,
    o.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }
    ,
    o.umask = function() {
        return 0
    }
}
, function(e, t, n) {
    (function(t) {
        function n(e) {
            var t = i([["iOS", /iP(hone|od|ad)/], ["Android OS", /Android/], ["BlackBerry OS", /BlackBerry|BB10/], ["Windows Mobile", /IEMobile/], ["Amazon OS", /Kindle/], ["Windows 3.11", /Win16/], ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/], ["Windows 98", /(Windows 98)|(Win98)/], ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/], ["Windows XP", /(Windows NT 5.1)|(Windows XP)/], ["Windows Server 2003", /(Windows NT 5.2)/], ["Windows Vista", /(Windows NT 6.0)/], ["Windows 7", /(Windows NT 6.1)/], ["Windows 8", /(Windows NT 6.2)/], ["Windows 8.1", /(Windows NT 6.3)/], ["Windows 10", /(Windows NT 10.0)/], ["Windows ME", /Windows ME/], ["Open BSD", /OpenBSD/], ["Sun OS", /SunOS/], ["Linux", /(Linux)|(X11)/], ["Mac OS", /(Mac_PowerPC)|(Macintosh)/], ["QNX", /QNX/], ["BeOS", /BeOS/], ["OS/2", /OS\/2/], ["Search Bot", /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]]).filter(function(t) {
                return t.rule && t.rule.test(e)
            })[0];
            return t ? t.name : null
        }
        function r() {
            return void 0 !== t && t.version && {
                name: "node",
                version: t.version.slice(1),
                os: t.platform
            }
        }
        function o(e) {
            var t = i([["aol", /AOLShield\/([0-9\._]+)/], ["edge", /Edge\/([0-9\._]+)/], ["yandexbrowser", /YaBrowser\/([0-9\._]+)/], ["vivaldi", /Vivaldi\/([0-9\.]+)/], ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/], ["samsung", /SamsungBrowser\/([0-9\.]+)/], ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/], ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/], ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/], ["fxios", /FxiOS\/([0-9\.]+)/], ["opera", /Opera\/([0-9\.]+)(?:\s|$)/], ["opera", /OPR\/([0-9\.]+)(:?\s|$)$/], ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/], ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ["ie", /MSIE\s(7\.0)/], ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/], ["android", /Android\s([0-9\.]+)/], ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/], ["safari", /Version\/([0-9\._]+).*Safari/], ["facebook", /FBAV\/([0-9\.]+)/], ["instagram", /Instagram\ ([0-9\.]+)/], ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/]]);
            if (!e)
                return null;
            var r = t.map(function(t) {
                var n = t.rule.exec(e)
                  , r = n && n[1].split(/[._]/).slice(0, 3);
                return r && r.length < 3 && (r = r.concat(1 == r.length ? [0, 0] : [0])),
                n && {
                    name: t.name,
                    version: r.join(".")
                }
            }).filter(Boolean)[0] || null;
            return r && (r.os = n(e)),
            /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(e) && ((r = r || {}).bot = !0),
            r
        }
        function i(e) {
            return e.map(function(e) {
                return {
                    name: e[0],
                    rule: e[1]
                }
            })
        }
        e.exports = {
            detect: function() {
                return "undefined" != typeof navigator ? o(navigator.userAgent) : r()
            },
            detectOS: n,
            getNodeVersion: r,
            parseUserAgent: o
        }
    }
    ).call(this, n(49))
}
, function(e) {
    e.exports = {
        name: "pos-js",
        pos: {
            minRabbitVersion: "3.0.0.1"
        },
        version: "1.0.0",
        versionTag: "b1",
        license: "MIT",
        scripts: {
            build: "tsc",
            "build:bundle": "webpack --config webpack.config.js",
            protos: "../scripts/get_latest_bamboo_model.py",
            test: "jest --config 'otter/test/jest.config.json'",
            "integration-test": "jest --config 'otter/integration/jest.config.json'"
        },
        private: !0,
        dependencies: {
            "detect-browser": "^3.0.0",
            "whatwg-fetch": "^2.0.4"
        },
        devDependencies: {
            "@types/detect-browser": "^2.0.1",
            "@types/jest": "^22.0.1",
            "@types/node": "7.0.5",
            jest: "^23.0.1",
            "ts-jest": "^22.0.1",
            "ts-loader": "^4.1.0",
            "ts-node": "3.2.0",
            tslint: "5.5.0",
            typescript: "2.7.2",
            webpack: "^4.3.0",
            "webpack-cli": "^2.0.13"
        }
    }
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    function(e) {
        !function(e) {
            e[e.PROD = 0] = "PROD",
            e[e.DEV = 1] = "DEV"
        }(e.RunMode || (e.RunMode = {})),
        function(e) {
            e[e.CSV = 0] = "CSV",
            e[e.JSON = 1] = "JSON"
        }(e.FileExtension || (e.FileExtension = {})),
        function(e) {
            e[e.INVALID_DB_INDEX = 0] = "INVALID_DB_INDEX",
            e[e.ID = 1] = "ID"
        }(e.DbIndex || (e.DbIndex = {})),
        function(e) {
            !function(e) {
                e[e.INVALID_REDEMPTION = 0] = "INVALID_REDEMPTION",
                e[e.SYNCHRONY = 1] = "SYNCHRONY"
            }(e.TenderRedemptionType || (e.TenderRedemptionType = {}))
        }(e.TenderRedemptionPb || (e.TenderRedemptionPb = {})),
        function(e) {
            !function(e) {
                e.JS_SDK = "JS_SDK"
            }(e.ClientType || (e.ClientType = {}))
        }(e.VersionInfoPb || (e.VersionInfoPb = {})),
        function(e) {
            !function(e) {
                e.INVALID = "INVALID",
                e.POS = "POS",
                e.READER = "READER"
            }(e.DeviceClass || (e.DeviceClass = {}))
        }(e.DeviceInfo || (e.DeviceInfo = {})),
        function(e) {
            !function(e) {
                e[e.UNKNOWN = 0] = "UNKNOWN",
                e[e.FORCE_IMMEDIATE = 1] = "FORCE_IMMEDIATE",
                e[e.ON_SIGN_OFF = 2] = "ON_SIGN_OFF",
                e[e.MIDNIGHT = 3] = "MIDNIGHT",
                e[e.CUSTOM = 4] = "CUSTOM",
                e[e.DO_NOT_UPGRADE = 5] = "DO_NOT_UPGRADE"
            }(e.UpgradeTimeArgument || (e.UpgradeTimeArgument = {}))
        }(e.ClientUpgradeArgumentPb || (e.ClientUpgradeArgumentPb = {}))
    }(t.model_common_commonmodel || (t.model_common_commonmodel = {}))
}
, function(e, t, n) {
    "use strict";
    function r(e) {
        for (var n in e)
            t.hasOwnProperty(n) || (t[n] = e[n])
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(6);
    t.RpcEndpoint = o.RpcEndpoint;
    var i = n(26);
    t.Terminal = i.default,
    r(n(9)),
    r(n(45)),
    r(n(16)),
    r(n(13)),
    r(n(19))
}
]);
