'use strict';

var get = require('lodash/get.js');
var fastDeepEqual = require('fast-deep-equal/es6/index.js');
var uniqWith = require('lodash/uniqWith.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var get__default = /*#__PURE__*/_interopDefault(get);
var fastDeepEqual__default = /*#__PURE__*/_interopDefault(fastDeepEqual);
var uniqWith__default = /*#__PURE__*/_interopDefault(uniqWith);

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/configs.ts
var validationEnabled = true;
function setGlobalValidationEnabled(enabled) {
  validationEnabled = enabled;
}
__name(setGlobalValidationEnabled, "setGlobalValidationEnabled");
function getGlobalValidationEnabled() {
  return validationEnabled;
}
__name(getGlobalValidationEnabled, "getGlobalValidationEnabled");

// src/lib/Result.ts
var _Result = class _Result {
  constructor(success, value, error) {
    this.success = success;
    if (success) {
      this.value = value;
    } else {
      this.error = error;
    }
  }
  isOk() {
    return this.success;
  }
  isErr() {
    return !this.success;
  }
  unwrap() {
    if (this.isOk())
      return this.value;
    throw this.error;
  }
  static ok(value) {
    return new _Result(true, value);
  }
  static err(error) {
    return new _Result(false, void 0, error);
  }
};
__name(_Result, "Result");
var Result = _Result;

// src/validators/util/getValue.ts
function getValue(valueOrFn) {
  return typeof valueOrFn === "function" ? valueOrFn() : valueOrFn;
}
__name(getValue, "getValue");

// node_modules/@jspm/core/nodelibs/browser/chunk-5decc758.js
var e;
var t;
var n;
var r = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : globalThis;
var o = e = {};
function i() {
  throw new Error("setTimeout has not been defined");
}
__name(i, "i");
function u() {
  throw new Error("clearTimeout has not been defined");
}
__name(u, "u");
function c(e3) {
  if (t === setTimeout)
    return setTimeout(e3, 0);
  if ((t === i || !t) && setTimeout)
    return t = setTimeout, setTimeout(e3, 0);
  try {
    return t(e3, 0);
  } catch (n3) {
    try {
      return t.call(null, e3, 0);
    } catch (n4) {
      return t.call(this || r, e3, 0);
    }
  }
}
__name(c, "c");
!function() {
  try {
    t = "function" == typeof setTimeout ? setTimeout : i;
  } catch (e3) {
    t = i;
  }
  try {
    n = "function" == typeof clearTimeout ? clearTimeout : u;
  } catch (e3) {
    n = u;
  }
}();
var l;
var s = [];
var f = false;
var a = -1;
function h() {
  f && l && (f = false, l.length ? s = l.concat(s) : a = -1, s.length && d());
}
__name(h, "h");
function d() {
  if (!f) {
    var e3 = c(h);
    f = true;
    for (var t3 = s.length; t3; ) {
      for (l = s, s = []; ++a < t3; )
        l && l[a].run();
      a = -1, t3 = s.length;
    }
    l = null, f = false, function(e4) {
      if (n === clearTimeout)
        return clearTimeout(e4);
      if ((n === u || !n) && clearTimeout)
        return n = clearTimeout, clearTimeout(e4);
      try {
        n(e4);
      } catch (t4) {
        try {
          return n.call(null, e4);
        } catch (t5) {
          return n.call(this || r, e4);
        }
      }
    }(e3);
  }
}
__name(d, "d");
function m(e3, t3) {
  (this || r).fun = e3, (this || r).array = t3;
}
__name(m, "m");
function p() {
}
__name(p, "p");
o.nextTick = function(e3) {
  var t3 = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n3 = 1; n3 < arguments.length; n3++)
      t3[n3 - 1] = arguments[n3];
  s.push(new m(e3, t3)), 1 !== s.length || f || c(d);
}, m.prototype.run = function() {
  (this || r).fun.apply(null, (this || r).array);
}, o.title = "browser", o.browser = true, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = p, o.addListener = p, o.once = p, o.off = p, o.removeListener = p, o.removeAllListeners = p, o.emit = p, o.prependListener = p, o.prependOnceListener = p, o.listeners = function(e3) {
  return [];
}, o.binding = function(e3) {
  throw new Error("process.binding is not supported");
}, o.cwd = function() {
  return "/";
}, o.chdir = function(e3) {
  throw new Error("process.chdir is not supported");
}, o.umask = function() {
  return 0;
};
var T = e;
T.addListener;
T.argv;
T.binding;
T.browser;
T.chdir;
T.cwd;
T.emit;
T.env;
T.listeners;
T.nextTick;
T.off;
T.on;
T.once;
T.prependListener;
T.prependOnceListener;
T.removeAllListeners;
T.removeListener;
T.title;
T.umask;
T.version;
T.versions;

// node_modules/@jspm/core/nodelibs/browser/chunk-b4205b57.js
var t2 = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;
var e2 = Object.prototype.toString;
var o2 = /* @__PURE__ */ __name(function(o3) {
  return !(t2 && o3 && "object" == typeof o3 && Symbol.toStringTag in o3) && "[object Arguments]" === e2.call(o3);
}, "o");
var n2 = /* @__PURE__ */ __name(function(t3) {
  return !!o2(t3) || null !== t3 && "object" == typeof t3 && "number" == typeof t3.length && t3.length >= 0 && "[object Array]" !== e2.call(t3) && "[object Function]" === e2.call(t3.callee);
}, "n");
var r2 = function() {
  return o2(arguments);
}();
o2.isLegacyArguments = n2;
var l2 = r2 ? o2 : n2;
var t$1 = Object.prototype.toString;
var o$1 = Function.prototype.toString;
var n$1 = /^\s*(?:function)?\*/;
var e$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;
var r$1 = Object.getPrototypeOf;
var c2 = function() {
  if (!e$1)
    return false;
  try {
    return Function("return function*() {}")();
  } catch (t3) {
  }
}();
var u2 = c2 ? r$1(c2) : {};
var i2 = /* @__PURE__ */ __name(function(c3) {
  return "function" == typeof c3 && (!!n$1.test(o$1.call(c3)) || (e$1 ? r$1(c3) === u2 : "[object GeneratorFunction]" === t$1.call(c3)));
}, "i");
var t$2 = "function" == typeof Object.create ? function(t3, e3) {
  e3 && (t3.super_ = e3, t3.prototype = Object.create(e3.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }));
} : function(t3, e3) {
  if (e3) {
    t3.super_ = e3;
    var o3 = /* @__PURE__ */ __name(function() {
    }, "o");
    o3.prototype = e3.prototype, t3.prototype = new o3(), t3.prototype.constructor = t3;
  }
};
var i$1 = /* @__PURE__ */ __name(function(e3) {
  return e3 && "object" == typeof e3 && "function" == typeof e3.copy && "function" == typeof e3.fill && "function" == typeof e3.readUInt8;
}, "i$1");
var o$2 = {};
var u$1 = i$1;
var f2 = l2;
var a2 = i2;
function c$1(e3) {
  return e3.call.bind(e3);
}
__name(c$1, "c$1");
var s2 = "undefined" != typeof BigInt;
var p2 = "undefined" != typeof Symbol;
var y = p2 && void 0 !== Symbol.toStringTag;
var l$1 = "undefined" != typeof Uint8Array;
var d2 = "undefined" != typeof ArrayBuffer;
if (l$1 && y)
  var g = Object.getPrototypeOf(Uint8Array.prototype), b = c$1(Object.getOwnPropertyDescriptor(g, Symbol.toStringTag).get);
var m2 = c$1(Object.prototype.toString);
var h2 = c$1(Number.prototype.valueOf);
var j = c$1(String.prototype.valueOf);
var A = c$1(Boolean.prototype.valueOf);
if (s2)
  var w = c$1(BigInt.prototype.valueOf);
if (p2)
  var v = c$1(Symbol.prototype.valueOf);
function O(e3, t3) {
  if ("object" != typeof e3)
    return false;
  try {
    return t3(e3), true;
  } catch (e4) {
    return false;
  }
}
__name(O, "O");
function S(e3) {
  return l$1 && y ? void 0 !== b(e3) : B(e3) || k(e3) || E(e3) || D(e3) || U(e3) || P(e3) || x(e3) || I(e3) || M(e3) || z(e3) || F(e3);
}
__name(S, "S");
function B(e3) {
  return l$1 && y ? "Uint8Array" === b(e3) : "[object Uint8Array]" === m2(e3) || u$1(e3) && void 0 !== e3.buffer;
}
__name(B, "B");
function k(e3) {
  return l$1 && y ? "Uint8ClampedArray" === b(e3) : "[object Uint8ClampedArray]" === m2(e3);
}
__name(k, "k");
function E(e3) {
  return l$1 && y ? "Uint16Array" === b(e3) : "[object Uint16Array]" === m2(e3);
}
__name(E, "E");
function D(e3) {
  return l$1 && y ? "Uint32Array" === b(e3) : "[object Uint32Array]" === m2(e3);
}
__name(D, "D");
function U(e3) {
  return l$1 && y ? "Int8Array" === b(e3) : "[object Int8Array]" === m2(e3);
}
__name(U, "U");
function P(e3) {
  return l$1 && y ? "Int16Array" === b(e3) : "[object Int16Array]" === m2(e3);
}
__name(P, "P");
function x(e3) {
  return l$1 && y ? "Int32Array" === b(e3) : "[object Int32Array]" === m2(e3);
}
__name(x, "x");
function I(e3) {
  return l$1 && y ? "Float32Array" === b(e3) : "[object Float32Array]" === m2(e3);
}
__name(I, "I");
function M(e3) {
  return l$1 && y ? "Float64Array" === b(e3) : "[object Float64Array]" === m2(e3);
}
__name(M, "M");
function z(e3) {
  return l$1 && y ? "BigInt64Array" === b(e3) : "[object BigInt64Array]" === m2(e3);
}
__name(z, "z");
function F(e3) {
  return l$1 && y ? "BigUint64Array" === b(e3) : "[object BigUint64Array]" === m2(e3);
}
__name(F, "F");
function T2(e3) {
  return "[object Map]" === m2(e3);
}
__name(T2, "T");
function N(e3) {
  return "[object Set]" === m2(e3);
}
__name(N, "N");
function W(e3) {
  return "[object WeakMap]" === m2(e3);
}
__name(W, "W");
function $(e3) {
  return "[object WeakSet]" === m2(e3);
}
__name($, "$");
function C(e3) {
  return "[object ArrayBuffer]" === m2(e3);
}
__name(C, "C");
function V(e3) {
  return "undefined" != typeof ArrayBuffer && (C.working ? C(e3) : e3 instanceof ArrayBuffer);
}
__name(V, "V");
function G(e3) {
  return "[object DataView]" === m2(e3);
}
__name(G, "G");
function R(e3) {
  return "undefined" != typeof DataView && (G.working ? G(e3) : e3 instanceof DataView);
}
__name(R, "R");
function J(e3) {
  return "[object SharedArrayBuffer]" === m2(e3);
}
__name(J, "J");
function _(e3) {
  return "undefined" != typeof SharedArrayBuffer && (J.working ? J(e3) : e3 instanceof SharedArrayBuffer);
}
__name(_, "_");
function H(e3) {
  return O(e3, h2);
}
__name(H, "H");
function Z(e3) {
  return O(e3, j);
}
__name(Z, "Z");
function q(e3) {
  return O(e3, A);
}
__name(q, "q");
function K(e3) {
  return s2 && O(e3, w);
}
__name(K, "K");
function L(e3) {
  return p2 && O(e3, v);
}
__name(L, "L");
o$2.isArgumentsObject = f2, o$2.isGeneratorFunction = a2, o$2.isPromise = function(e3) {
  return "undefined" != typeof Promise && e3 instanceof Promise || null !== e3 && "object" == typeof e3 && "function" == typeof e3.then && "function" == typeof e3.catch;
}, o$2.isArrayBufferView = function(e3) {
  return d2 && ArrayBuffer.isView ? ArrayBuffer.isView(e3) : S(e3) || R(e3);
}, o$2.isTypedArray = S, o$2.isUint8Array = B, o$2.isUint8ClampedArray = k, o$2.isUint16Array = E, o$2.isUint32Array = D, o$2.isInt8Array = U, o$2.isInt16Array = P, o$2.isInt32Array = x, o$2.isFloat32Array = I, o$2.isFloat64Array = M, o$2.isBigInt64Array = z, o$2.isBigUint64Array = F, T2.working = "undefined" != typeof Map && T2(/* @__PURE__ */ new Map()), o$2.isMap = function(e3) {
  return "undefined" != typeof Map && (T2.working ? T2(e3) : e3 instanceof Map);
}, N.working = "undefined" != typeof Set && N(/* @__PURE__ */ new Set()), o$2.isSet = function(e3) {
  return "undefined" != typeof Set && (N.working ? N(e3) : e3 instanceof Set);
}, W.working = "undefined" != typeof WeakMap && W(/* @__PURE__ */ new WeakMap()), o$2.isWeakMap = function(e3) {
  return "undefined" != typeof WeakMap && (W.working ? W(e3) : e3 instanceof WeakMap);
}, $.working = "undefined" != typeof WeakSet && $(/* @__PURE__ */ new WeakSet()), o$2.isWeakSet = function(e3) {
  return $(e3);
}, C.working = "undefined" != typeof ArrayBuffer && C(new ArrayBuffer()), o$2.isArrayBuffer = V, G.working = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView && G(new DataView(new ArrayBuffer(1), 0, 1)), o$2.isDataView = R, J.working = "undefined" != typeof SharedArrayBuffer && J(new SharedArrayBuffer()), o$2.isSharedArrayBuffer = _, o$2.isAsyncFunction = function(e3) {
  return "[object AsyncFunction]" === m2(e3);
}, o$2.isMapIterator = function(e3) {
  return "[object Map Iterator]" === m2(e3);
}, o$2.isSetIterator = function(e3) {
  return "[object Set Iterator]" === m2(e3);
}, o$2.isGeneratorObject = function(e3) {
  return "[object Generator]" === m2(e3);
}, o$2.isWebAssemblyCompiledModule = function(e3) {
  return "[object WebAssembly.Module]" === m2(e3);
}, o$2.isNumberObject = H, o$2.isStringObject = Z, o$2.isBooleanObject = q, o$2.isBigIntObject = K, o$2.isSymbolObject = L, o$2.isBoxedPrimitive = function(e3) {
  return H(e3) || Z(e3) || q(e3) || K(e3) || L(e3);
}, o$2.isAnyArrayBuffer = function(e3) {
  return l$1 && (V(e3) || _(e3));
}, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(e3) {
  Object.defineProperty(o$2, e3, { enumerable: false, value: function() {
    throw new Error(e3 + " is not supported in userland");
  } });
});
var Q = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : globalThis;
var X = {};
var Y = T;
var ee = Object.getOwnPropertyDescriptors || function(e3) {
  for (var t3 = Object.keys(e3), r3 = {}, n3 = 0; n3 < t3.length; n3++)
    r3[t3[n3]] = Object.getOwnPropertyDescriptor(e3, t3[n3]);
  return r3;
};
var te = /%[sdj%]/g;
X.format = function(e3) {
  if (!ge(e3)) {
    for (var t3 = [], r3 = 0; r3 < arguments.length; r3++)
      t3.push(oe(arguments[r3]));
    return t3.join(" ");
  }
  r3 = 1;
  for (var n3 = arguments, i3 = n3.length, o3 = String(e3).replace(te, function(e4) {
    if ("%%" === e4)
      return "%";
    if (r3 >= i3)
      return e4;
    switch (e4) {
      case "%s":
        return String(n3[r3++]);
      case "%d":
        return Number(n3[r3++]);
      case "%j":
        try {
          return JSON.stringify(n3[r3++]);
        } catch (e5) {
          return "[Circular]";
        }
      default:
        return e4;
    }
  }), u3 = n3[r3]; r3 < i3; u3 = n3[++r3])
    le(u3) || !he(u3) ? o3 += " " + u3 : o3 += " " + oe(u3);
  return o3;
}, X.deprecate = function(e3, t3) {
  if (void 0 !== Y && true === Y.noDeprecation)
    return e3;
  if (void 0 === Y)
    return function() {
      return X.deprecate(e3, t3).apply(this || Q, arguments);
    };
  var r3 = false;
  return function() {
    if (!r3) {
      if (Y.throwDeprecation)
        throw new Error(t3);
      Y.traceDeprecation ? console.trace(t3) : console.error(t3), r3 = true;
    }
    return e3.apply(this || Q, arguments);
  };
};
var re = {};
var ne = /^$/;
if (Y.env.NODE_DEBUG) {
  ie = Y.env.NODE_DEBUG;
  ie = ie.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), ne = new RegExp("^" + ie + "$", "i");
}
var ie;
function oe(e3, t3) {
  var r3 = { seen: [], stylize: fe };
  return arguments.length >= 3 && (r3.depth = arguments[2]), arguments.length >= 4 && (r3.colors = arguments[3]), ye(t3) ? r3.showHidden = t3 : t3 && X._extend(r3, t3), be(r3.showHidden) && (r3.showHidden = false), be(r3.depth) && (r3.depth = 2), be(r3.colors) && (r3.colors = false), be(r3.customInspect) && (r3.customInspect = true), r3.colors && (r3.stylize = ue), ae(r3, e3, r3.depth);
}
__name(oe, "oe");
function ue(e3, t3) {
  var r3 = oe.styles[t3];
  return r3 ? "\x1B[" + oe.colors[r3][0] + "m" + e3 + "\x1B[" + oe.colors[r3][1] + "m" : e3;
}
__name(ue, "ue");
function fe(e3, t3) {
  return e3;
}
__name(fe, "fe");
function ae(e3, t3, r3) {
  if (e3.customInspect && t3 && we(t3.inspect) && t3.inspect !== X.inspect && (!t3.constructor || t3.constructor.prototype !== t3)) {
    var n3 = t3.inspect(r3, e3);
    return ge(n3) || (n3 = ae(e3, n3, r3)), n3;
  }
  var i3 = function(e4, t4) {
    if (be(t4))
      return e4.stylize("undefined", "undefined");
    if (ge(t4)) {
      var r4 = "'" + JSON.stringify(t4).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return e4.stylize(r4, "string");
    }
    if (de(t4))
      return e4.stylize("" + t4, "number");
    if (ye(t4))
      return e4.stylize("" + t4, "boolean");
    if (le(t4))
      return e4.stylize("null", "null");
  }(e3, t3);
  if (i3)
    return i3;
  var o3 = Object.keys(t3), u3 = function(e4) {
    var t4 = {};
    return e4.forEach(function(e5, r4) {
      t4[e5] = true;
    }), t4;
  }(o3);
  if (e3.showHidden && (o3 = Object.getOwnPropertyNames(t3)), Ae(t3) && (o3.indexOf("message") >= 0 || o3.indexOf("description") >= 0))
    return ce(t3);
  if (0 === o3.length) {
    if (we(t3)) {
      var f3 = t3.name ? ": " + t3.name : "";
      return e3.stylize("[Function" + f3 + "]", "special");
    }
    if (me(t3))
      return e3.stylize(RegExp.prototype.toString.call(t3), "regexp");
    if (je(t3))
      return e3.stylize(Date.prototype.toString.call(t3), "date");
    if (Ae(t3))
      return ce(t3);
  }
  var a3, c3 = "", s4 = false, p3 = ["{", "}"];
  (pe(t3) && (s4 = true, p3 = ["[", "]"]), we(t3)) && (c3 = " [Function" + (t3.name ? ": " + t3.name : "") + "]");
  return me(t3) && (c3 = " " + RegExp.prototype.toString.call(t3)), je(t3) && (c3 = " " + Date.prototype.toUTCString.call(t3)), Ae(t3) && (c3 = " " + ce(t3)), 0 !== o3.length || s4 && 0 != t3.length ? r3 < 0 ? me(t3) ? e3.stylize(RegExp.prototype.toString.call(t3), "regexp") : e3.stylize("[Object]", "special") : (e3.seen.push(t3), a3 = s4 ? function(e4, t4, r4, n4, i4) {
    for (var o4 = [], u4 = 0, f4 = t4.length; u4 < f4; ++u4)
      ke(t4, String(u4)) ? o4.push(se(e4, t4, r4, n4, String(u4), true)) : o4.push("");
    return i4.forEach(function(i5) {
      i5.match(/^\d+$/) || o4.push(se(e4, t4, r4, n4, i5, true));
    }), o4;
  }(e3, t3, r3, u3, o3) : o3.map(function(n4) {
    return se(e3, t3, r3, u3, n4, s4);
  }), e3.seen.pop(), function(e4, t4, r4) {
    var n4 = 0;
    if (e4.reduce(function(e5, t5) {
      return n4++, t5.indexOf("\n") >= 0 && n4++, e5 + t5.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60)
      return r4[0] + ("" === t4 ? "" : t4 + "\n ") + " " + e4.join(",\n  ") + " " + r4[1];
    return r4[0] + t4 + " " + e4.join(", ") + " " + r4[1];
  }(a3, c3, p3)) : p3[0] + c3 + p3[1];
}
__name(ae, "ae");
function ce(e3) {
  return "[" + Error.prototype.toString.call(e3) + "]";
}
__name(ce, "ce");
function se(e3, t3, r3, n3, i3, o3) {
  var u3, f3, a3;
  if ((a3 = Object.getOwnPropertyDescriptor(t3, i3) || { value: t3[i3] }).get ? f3 = a3.set ? e3.stylize("[Getter/Setter]", "special") : e3.stylize("[Getter]", "special") : a3.set && (f3 = e3.stylize("[Setter]", "special")), ke(n3, i3) || (u3 = "[" + i3 + "]"), f3 || (e3.seen.indexOf(a3.value) < 0 ? (f3 = le(r3) ? ae(e3, a3.value, null) : ae(e3, a3.value, r3 - 1)).indexOf("\n") > -1 && (f3 = o3 ? f3.split("\n").map(function(e4) {
    return "  " + e4;
  }).join("\n").substr(2) : "\n" + f3.split("\n").map(function(e4) {
    return "   " + e4;
  }).join("\n")) : f3 = e3.stylize("[Circular]", "special")), be(u3)) {
    if (o3 && i3.match(/^\d+$/))
      return f3;
    (u3 = JSON.stringify("" + i3)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (u3 = u3.substr(1, u3.length - 2), u3 = e3.stylize(u3, "name")) : (u3 = u3.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), u3 = e3.stylize(u3, "string"));
  }
  return u3 + ": " + f3;
}
__name(se, "se");
function pe(e3) {
  return Array.isArray(e3);
}
__name(pe, "pe");
function ye(e3) {
  return "boolean" == typeof e3;
}
__name(ye, "ye");
function le(e3) {
  return null === e3;
}
__name(le, "le");
function de(e3) {
  return "number" == typeof e3;
}
__name(de, "de");
function ge(e3) {
  return "string" == typeof e3;
}
__name(ge, "ge");
function be(e3) {
  return void 0 === e3;
}
__name(be, "be");
function me(e3) {
  return he(e3) && "[object RegExp]" === ve(e3);
}
__name(me, "me");
function he(e3) {
  return "object" == typeof e3 && null !== e3;
}
__name(he, "he");
function je(e3) {
  return he(e3) && "[object Date]" === ve(e3);
}
__name(je, "je");
function Ae(e3) {
  return he(e3) && ("[object Error]" === ve(e3) || e3 instanceof Error);
}
__name(Ae, "Ae");
function we(e3) {
  return "function" == typeof e3;
}
__name(we, "we");
function ve(e3) {
  return Object.prototype.toString.call(e3);
}
__name(ve, "ve");
function Oe(e3) {
  return e3 < 10 ? "0" + e3.toString(10) : e3.toString(10);
}
__name(Oe, "Oe");
X.debuglog = function(e3) {
  if (e3 = e3.toUpperCase(), !re[e3])
    if (ne.test(e3)) {
      var t3 = Y.pid;
      re[e3] = function() {
        var r3 = X.format.apply(X, arguments);
        console.error("%s %d: %s", e3, t3, r3);
      };
    } else
      re[e3] = function() {
      };
  return re[e3];
}, X.inspect = oe, oe.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, oe.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" }, X.types = o$2, X.isArray = pe, X.isBoolean = ye, X.isNull = le, X.isNullOrUndefined = function(e3) {
  return null == e3;
}, X.isNumber = de, X.isString = ge, X.isSymbol = function(e3) {
  return "symbol" == typeof e3;
}, X.isUndefined = be, X.isRegExp = me, X.types.isRegExp = me, X.isObject = he, X.isDate = je, X.types.isDate = je, X.isError = Ae, X.types.isNativeError = Ae, X.isFunction = we, X.isPrimitive = function(e3) {
  return null === e3 || "boolean" == typeof e3 || "number" == typeof e3 || "string" == typeof e3 || "symbol" == typeof e3 || void 0 === e3;
}, X.isBuffer = i$1;
var Se = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function Be() {
  var e3 = /* @__PURE__ */ new Date(), t3 = [Oe(e3.getHours()), Oe(e3.getMinutes()), Oe(e3.getSeconds())].join(":");
  return [e3.getDate(), Se[e3.getMonth()], t3].join(" ");
}
__name(Be, "Be");
function ke(e3, t3) {
  return Object.prototype.hasOwnProperty.call(e3, t3);
}
__name(ke, "ke");
X.log = function() {
  console.log("%s - %s", Be(), X.format.apply(X, arguments));
}, X.inherits = t$2, X._extend = function(e3, t3) {
  if (!t3 || !he(t3))
    return e3;
  for (var r3 = Object.keys(t3), n3 = r3.length; n3--; )
    e3[r3[n3]] = t3[r3[n3]];
  return e3;
};
var Ee = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0;
function De(e3, t3) {
  if (!e3) {
    var r3 = new Error("Promise was rejected with a falsy value");
    r3.reason = e3, e3 = r3;
  }
  return t3(e3);
}
__name(De, "De");
X.promisify = function(e3) {
  if ("function" != typeof e3)
    throw new TypeError('The "original" argument must be of type Function');
  if (Ee && e3[Ee]) {
    var t3;
    if ("function" != typeof (t3 = e3[Ee]))
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    return Object.defineProperty(t3, Ee, { value: t3, enumerable: false, writable: false, configurable: true }), t3;
  }
  function t3() {
    for (var t4, r3, n3 = new Promise(function(e4, n4) {
      t4 = e4, r3 = n4;
    }), i3 = [], o3 = 0; o3 < arguments.length; o3++)
      i3.push(arguments[o3]);
    i3.push(function(e4, n4) {
      e4 ? r3(e4) : t4(n4);
    });
    try {
      e3.apply(this || Q, i3);
    } catch (e4) {
      r3(e4);
    }
    return n3;
  }
  __name(t3, "t");
  return Object.setPrototypeOf(t3, Object.getPrototypeOf(e3)), Ee && Object.defineProperty(t3, Ee, { value: t3, enumerable: false, writable: false, configurable: true }), Object.defineProperties(t3, ee(e3));
}, X.promisify.custom = Ee, X.callbackify = function(e3) {
  if ("function" != typeof e3)
    throw new TypeError('The "original" argument must be of type Function');
  function t3() {
    for (var t4 = [], r3 = 0; r3 < arguments.length; r3++)
      t4.push(arguments[r3]);
    var n3 = t4.pop();
    if ("function" != typeof n3)
      throw new TypeError("The last argument must be of type Function");
    var i3 = this || Q, o3 = /* @__PURE__ */ __name(function() {
      return n3.apply(i3, arguments);
    }, "o");
    e3.apply(this || Q, t4).then(function(e4) {
      Y.nextTick(o3.bind(null, null, e4));
    }, function(e4) {
      Y.nextTick(De.bind(null, e4, o3));
    });
  }
  __name(t3, "t");
  return Object.setPrototypeOf(t3, Object.getPrototypeOf(e3)), Object.defineProperties(t3, ee(e3)), t3;
};

// node_modules/@jspm/core/nodelibs/browser/chunk-ce0fbc82.js
X._extend;
X.callbackify;
X.debuglog;
X.deprecate;
X.format;
X.inherits;
X.inspect;
X.isArray;
X.isBoolean;
X.isBuffer;
X.isDate;
X.isError;
X.isFunction;
X.isNull;
X.isNullOrUndefined;
X.isNumber;
X.isObject;
X.isPrimitive;
X.isRegExp;
X.isString;
X.isSymbol;
X.isUndefined;
X.log;
X.promisify;
X._extend;
X.callbackify;
X.debuglog;
X.deprecate;
X.format;
X.inherits;
X.inspect;
X.isArray;
X.isBoolean;
X.isBuffer;
X.isDate;
X.isError;
X.isFunction;
X.isNull;
X.isNullOrUndefined;
X.isNumber;
X.isObject;
X.isPrimitive;
X.isRegExp;
X.isString;
X.isSymbol;
X.isUndefined;
X.log;
X.promisify;
X.types;

// node-modules-polyfills:util
X._extend;
X.callbackify;
X.debuglog;
X.deprecate;
X.format;
X.inherits;
var inspect2 = X.inspect;
X.isArray;
X.isBoolean;
X.isBuffer;
X.isDate;
X.isError;
X.isFunction;
X.isNull;
X.isNullOrUndefined;
X.isNumber;
X.isObject;
X.isPrimitive;
X.isRegExp;
X.isString;
X.isSymbol;
X.isUndefined;
X.log;
X.promisify;
X.types;
X.TextEncoder = globalThis.TextEncoder;
X.TextDecoder = globalThis.TextDecoder;

// src/lib/errors/BaseError.ts
var customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");
var customInspectSymbolStackLess = Symbol.for("nodejs.util.inspect.custom.stack-less");
var _BaseError = class _BaseError extends Error {
  [customInspectSymbol](depth, options) {
    return `${this[customInspectSymbolStackLess](depth, options)}
${this.stack.slice(this.stack.indexOf("\n"))}`;
  }
};
__name(_BaseError, "BaseError");
var BaseError = _BaseError;

// src/lib/errors/BaseConstraintError.ts
var _BaseConstraintError = class _BaseConstraintError extends BaseError {
  constructor(constraint, message, given) {
    super(message);
    this.constraint = constraint;
    this.given = given;
  }
};
__name(_BaseConstraintError, "BaseConstraintError");
var BaseConstraintError = _BaseConstraintError;

// src/lib/errors/ExpectedConstraintError.ts
var _ExpectedConstraintError = class _ExpectedConstraintError extends BaseConstraintError {
  constructor(constraint, message, given, expected) {
    super(constraint, message, given);
    this.expected = expected;
  }
  toJSON() {
    return {
      name: this.name,
      constraint: this.constraint,
      given: this.given,
      expected: this.expected
    };
  }
  [customInspectSymbolStackLess](depth, options) {
    const constraint = options.stylize(this.constraint, "string");
    if (depth < 0) {
      return options.stylize(`[ExpectedConstraintError: ${constraint}]`, "special");
    }
    const newOptions = { ...options, depth: options.depth === null ? null : options.depth - 1 };
    const padding = `
  ${options.stylize("|", "undefined")} `;
    const given = inspect2(this.given, newOptions).replace(/\n/g, padding);
    const header = `${options.stylize("ExpectedConstraintError", "special")} > ${constraint}`;
    const message = options.stylize(this.message, "regexp");
    const expectedBlock = `
  ${options.stylize("Expected: ", "string")}${options.stylize(this.expected, "boolean")}`;
    const givenBlock = `
  ${options.stylize("Received:", "regexp")}${padding}${given}`;
    return `${header}
  ${message}
${expectedBlock}
${givenBlock}`;
  }
};
__name(_ExpectedConstraintError, "ExpectedConstraintError");
var ExpectedConstraintError = _ExpectedConstraintError;

// src/constraints/ObjectConstrains.ts
function whenConstraint(key, options, validator) {
  return {
    run(input, parent) {
      if (!parent) {
        return Result.err(new ExpectedConstraintError("s.object(T.when)", "Validator has no parent", parent, "Validator to have a parent"));
      }
      const isKeyArray = Array.isArray(key);
      const value = isKeyArray ? key.map((k2) => get__default.default(parent, k2)) : get__default.default(parent, key);
      const predicate = resolveBooleanIs(options, value, isKeyArray) ? options.then : options.otherwise;
      if (predicate) {
        return predicate(validator).run(input);
      }
      return Result.ok(input);
    }
  };
}
__name(whenConstraint, "whenConstraint");
function resolveBooleanIs(options, value, isKeyArray) {
  if (options.is === void 0) {
    return isKeyArray ? !value.some((val) => !val) : Boolean(value);
  }
  if (typeof options.is === "function") {
    return options.is(value);
  }
  return value === options.is;
}
__name(resolveBooleanIs, "resolveBooleanIs");

// src/validators/BaseValidator.ts
var _BaseValidator = class _BaseValidator {
  constructor(constraints = []) {
    this.constraints = [];
    this.isValidationEnabled = null;
    this.constraints = constraints;
  }
  setParent(parent) {
    this.parent = parent;
    return this;
  }
  get optional() {
    return new UnionValidator([new LiteralValidator(void 0), this.clone()]);
  }
  get nullable() {
    return new UnionValidator([new LiteralValidator(null), this.clone()]);
  }
  get nullish() {
    return new UnionValidator([new NullishValidator(), this.clone()]);
  }
  get array() {
    return new ArrayValidator(this.clone());
  }
  get set() {
    return new SetValidator(this.clone());
  }
  or(...predicates) {
    return new UnionValidator([this.clone(), ...predicates]);
  }
  transform(cb) {
    return this.addConstraint({ run: (input) => Result.ok(cb(input)) });
  }
  reshape(cb) {
    return this.addConstraint({ run: cb });
  }
  default(value) {
    return new DefaultValidator(this.clone(), value);
  }
  when(key, options) {
    return this.addConstraint(whenConstraint(key, options, this));
  }
  describe(description) {
    const clone = this.clone();
    clone.description = description;
    return clone;
  }
  run(value) {
    let result = this.handle(value);
    if (result.isErr())
      return result;
    for (const constraint of this.constraints) {
      result = constraint.run(result.value, this.parent);
      if (result.isErr())
        break;
    }
    return result;
  }
  parse(value) {
    if (!this.shouldRunConstraints) {
      return this.handle(value).unwrap();
    }
    return this.constraints.reduce((v2, constraint) => constraint.run(v2).unwrap(), this.handle(value).unwrap());
  }
  is(value) {
    return this.run(value).isOk();
  }
  /**
   * Sets if the validator should also run constraints or just do basic checks.
   * @param isValidationEnabled Whether this validator should be enabled or disabled. You can pass boolean or a function returning boolean which will be called just before parsing.
   * Set to `null` to go off of the global configuration.
   */
  setValidationEnabled(isValidationEnabled) {
    const clone = this.clone();
    clone.isValidationEnabled = isValidationEnabled;
    return clone;
  }
  getValidationEnabled() {
    return getValue(this.isValidationEnabled);
  }
  get shouldRunConstraints() {
    return getValue(this.isValidationEnabled) ?? getGlobalValidationEnabled();
  }
  clone() {
    const clone = Reflect.construct(this.constructor, [this.constraints]);
    clone.isValidationEnabled = this.isValidationEnabled;
    return clone;
  }
  addConstraint(constraint) {
    const clone = this.clone();
    clone.constraints = clone.constraints.concat(constraint);
    return clone;
  }
};
__name(_BaseValidator, "BaseValidator");
var BaseValidator = _BaseValidator;
function isUnique(input) {
  if (input.length < 2)
    return true;
  const uniqueArray2 = uniqWith__default.default(input, fastDeepEqual__default.default);
  return uniqueArray2.length === input.length;
}
__name(isUnique, "isUnique");

// src/constraints/util/operators.ts
function lessThan(a3, b2) {
  return a3 < b2;
}
__name(lessThan, "lessThan");
function lessThanOrEqual(a3, b2) {
  return a3 <= b2;
}
__name(lessThanOrEqual, "lessThanOrEqual");
function greaterThan(a3, b2) {
  return a3 > b2;
}
__name(greaterThan, "greaterThan");
function greaterThanOrEqual(a3, b2) {
  return a3 >= b2;
}
__name(greaterThanOrEqual, "greaterThanOrEqual");
function equal(a3, b2) {
  return a3 === b2;
}
__name(equal, "equal");
function notEqual(a3, b2) {
  return a3 !== b2;
}
__name(notEqual, "notEqual");

// src/constraints/ArrayConstraints.ts
function arrayLengthComparator(comparator, name, expected, length) {
  return {
    run(input) {
      return comparator(input.length, length) ? Result.ok(input) : Result.err(new ExpectedConstraintError(name, "Invalid Array length", input, expected));
    }
  };
}
__name(arrayLengthComparator, "arrayLengthComparator");
function arrayLengthLessThan(value) {
  const expected = `expected.length < ${value}`;
  return arrayLengthComparator(lessThan, "s.array(T).lengthLessThan", expected, value);
}
__name(arrayLengthLessThan, "arrayLengthLessThan");
function arrayLengthLessThanOrEqual(value) {
  const expected = `expected.length <= ${value}`;
  return arrayLengthComparator(lessThanOrEqual, "s.array(T).lengthLessThanOrEqual", expected, value);
}
__name(arrayLengthLessThanOrEqual, "arrayLengthLessThanOrEqual");
function arrayLengthGreaterThan(value) {
  const expected = `expected.length > ${value}`;
  return arrayLengthComparator(greaterThan, "s.array(T).lengthGreaterThan", expected, value);
}
__name(arrayLengthGreaterThan, "arrayLengthGreaterThan");
function arrayLengthGreaterThanOrEqual(value) {
  const expected = `expected.length >= ${value}`;
  return arrayLengthComparator(greaterThanOrEqual, "s.array(T).lengthGreaterThanOrEqual", expected, value);
}
__name(arrayLengthGreaterThanOrEqual, "arrayLengthGreaterThanOrEqual");
function arrayLengthEqual(value) {
  const expected = `expected.length === ${value}`;
  return arrayLengthComparator(equal, "s.array(T).lengthEqual", expected, value);
}
__name(arrayLengthEqual, "arrayLengthEqual");
function arrayLengthNotEqual(value) {
  const expected = `expected.length !== ${value}`;
  return arrayLengthComparator(notEqual, "s.array(T).lengthNotEqual", expected, value);
}
__name(arrayLengthNotEqual, "arrayLengthNotEqual");
function arrayLengthRange(start, endBefore) {
  const expected = `expected.length >= ${start} && expected.length < ${endBefore}`;
  return {
    run(input) {
      return input.length >= start && input.length < endBefore ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.array(T).lengthRange", "Invalid Array length", input, expected));
    }
  };
}
__name(arrayLengthRange, "arrayLengthRange");
function arrayLengthRangeInclusive(start, end) {
  const expected = `expected.length >= ${start} && expected.length <= ${end}`;
  return {
    run(input) {
      return input.length >= start && input.length <= end ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.array(T).lengthRangeInclusive", "Invalid Array length", input, expected));
    }
  };
}
__name(arrayLengthRangeInclusive, "arrayLengthRangeInclusive");
function arrayLengthRangeExclusive(startAfter, endBefore) {
  const expected = `expected.length > ${startAfter} && expected.length < ${endBefore}`;
  return {
    run(input) {
      return input.length > startAfter && input.length < endBefore ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.array(T).lengthRangeExclusive", "Invalid Array length", input, expected));
    }
  };
}
__name(arrayLengthRangeExclusive, "arrayLengthRangeExclusive");
var uniqueArray = {
  run(input) {
    return isUnique(input) ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.array(T).unique", "Array values are not unique", input, "Expected all values to be unique"));
  }
};

// src/lib/errors/CombinedPropertyError.ts
var _CombinedPropertyError = class _CombinedPropertyError extends BaseError {
  constructor(errors) {
    super("Received one or more errors");
    this.errors = errors;
  }
  [customInspectSymbolStackLess](depth, options) {
    if (depth < 0) {
      return options.stylize("[CombinedPropertyError]", "special");
    }
    const newOptions = { ...options, depth: options.depth === null ? null : options.depth - 1, compact: true };
    const padding = `
  ${options.stylize("|", "undefined")} `;
    const header = `${options.stylize("CombinedPropertyError", "special")} (${options.stylize(this.errors.length.toString(), "number")})`;
    const message = options.stylize(this.message, "regexp");
    const errors = this.errors.map(([key, error]) => {
      const property = _CombinedPropertyError.formatProperty(key, options);
      const body = error[customInspectSymbolStackLess](depth - 1, newOptions).replace(/\n/g, padding);
      return `  input${property}${padding}${body}`;
    }).join("\n\n");
    return `${header}
  ${message}

${errors}`;
  }
  static formatProperty(key, options) {
    if (typeof key === "string")
      return options.stylize(`.${key}`, "symbol");
    if (typeof key === "number")
      return `[${options.stylize(key.toString(), "number")}]`;
    return `[${options.stylize("Symbol", "symbol")}(${key.description})]`;
  }
};
__name(_CombinedPropertyError, "CombinedPropertyError");
var CombinedPropertyError = _CombinedPropertyError;

// src/lib/errors/ValidationError.ts
var _ValidationError = class _ValidationError extends BaseError {
  constructor(validator, message, given) {
    super(message);
    this.validator = validator;
    this.given = given;
  }
  toJSON() {
    return {
      name: this.name,
      validator: this.validator,
      given: this.given
    };
  }
  [customInspectSymbolStackLess](depth, options) {
    const validator = options.stylize(this.validator, "string");
    if (depth < 0) {
      return options.stylize(`[ValidationError: ${validator}]`, "special");
    }
    const newOptions = { ...options, depth: options.depth === null ? null : options.depth - 1, compact: true };
    const padding = `
  ${options.stylize("|", "undefined")} `;
    const given = inspect2(this.given, newOptions).replace(/\n/g, padding);
    const header = `${options.stylize("ValidationError", "special")} > ${validator}`;
    const message = options.stylize(this.message, "regexp");
    const givenBlock = `
  ${options.stylize("Received:", "regexp")}${padding}${given}`;
    return `${header}
  ${message}
${givenBlock}`;
  }
};
__name(_ValidationError, "ValidationError");
var ValidationError = _ValidationError;

// src/validators/ArrayValidator.ts
var _ArrayValidator = class _ArrayValidator extends BaseValidator {
  constructor(validator, constraints = []) {
    super(constraints);
    this.validator = validator;
  }
  lengthLessThan(length) {
    return this.addConstraint(arrayLengthLessThan(length));
  }
  lengthLessThanOrEqual(length) {
    return this.addConstraint(arrayLengthLessThanOrEqual(length));
  }
  lengthGreaterThan(length) {
    return this.addConstraint(arrayLengthGreaterThan(length));
  }
  lengthGreaterThanOrEqual(length) {
    return this.addConstraint(arrayLengthGreaterThanOrEqual(length));
  }
  lengthEqual(length) {
    return this.addConstraint(arrayLengthEqual(length));
  }
  lengthNotEqual(length) {
    return this.addConstraint(arrayLengthNotEqual(length));
  }
  lengthRange(start, endBefore) {
    return this.addConstraint(arrayLengthRange(start, endBefore));
  }
  lengthRangeInclusive(startAt, endAt) {
    return this.addConstraint(arrayLengthRangeInclusive(startAt, endAt));
  }
  lengthRangeExclusive(startAfter, endBefore) {
    return this.addConstraint(arrayLengthRangeExclusive(startAfter, endBefore));
  }
  get unique() {
    return this.addConstraint(uniqueArray);
  }
  clone() {
    return Reflect.construct(this.constructor, [this.validator, this.constraints]);
  }
  handle(values) {
    if (!Array.isArray(values)) {
      return Result.err(new ValidationError("s.array(T)", "Expected an array", values));
    }
    if (!this.shouldRunConstraints) {
      return Result.ok(values);
    }
    const errors = [];
    const transformed = [];
    for (let i3 = 0; i3 < values.length; i3++) {
      const result = this.validator.run(values[i3]);
      if (result.isOk())
        transformed.push(result.value);
      else
        errors.push([i3, result.error]);
    }
    return errors.length === 0 ? Result.ok(transformed) : Result.err(new CombinedPropertyError(errors));
  }
};
__name(_ArrayValidator, "ArrayValidator");
var ArrayValidator = _ArrayValidator;

// src/constraints/BigIntConstraints.ts
function bigintComparator(comparator, name, expected, number) {
  return {
    run(input) {
      return comparator(input, number) ? Result.ok(input) : Result.err(new ExpectedConstraintError(name, "Invalid bigint value", input, expected));
    }
  };
}
__name(bigintComparator, "bigintComparator");
function bigintLessThan(value) {
  const expected = `expected < ${value}n`;
  return bigintComparator(lessThan, "s.bigint.lessThan", expected, value);
}
__name(bigintLessThan, "bigintLessThan");
function bigintLessThanOrEqual(value) {
  const expected = `expected <= ${value}n`;
  return bigintComparator(lessThanOrEqual, "s.bigint.lessThanOrEqual", expected, value);
}
__name(bigintLessThanOrEqual, "bigintLessThanOrEqual");
function bigintGreaterThan(value) {
  const expected = `expected > ${value}n`;
  return bigintComparator(greaterThan, "s.bigint.greaterThan", expected, value);
}
__name(bigintGreaterThan, "bigintGreaterThan");
function bigintGreaterThanOrEqual(value) {
  const expected = `expected >= ${value}n`;
  return bigintComparator(greaterThanOrEqual, "s.bigint.greaterThanOrEqual", expected, value);
}
__name(bigintGreaterThanOrEqual, "bigintGreaterThanOrEqual");
function bigintEqual(value) {
  const expected = `expected === ${value}n`;
  return bigintComparator(equal, "s.bigint.equal", expected, value);
}
__name(bigintEqual, "bigintEqual");
function bigintNotEqual(value) {
  const expected = `expected !== ${value}n`;
  return bigintComparator(notEqual, "s.bigint.notEqual", expected, value);
}
__name(bigintNotEqual, "bigintNotEqual");
function bigintDivisibleBy(divider) {
  const expected = `expected % ${divider}n === 0n`;
  return {
    run(input) {
      return input % divider === 0n ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.bigint.divisibleBy", "BigInt is not divisible", input, expected));
    }
  };
}
__name(bigintDivisibleBy, "bigintDivisibleBy");

// src/validators/BigIntValidator.ts
var _BigIntValidator = class _BigIntValidator extends BaseValidator {
  lessThan(number) {
    return this.addConstraint(bigintLessThan(number));
  }
  lessThanOrEqual(number) {
    return this.addConstraint(bigintLessThanOrEqual(number));
  }
  greaterThan(number) {
    return this.addConstraint(bigintGreaterThan(number));
  }
  greaterThanOrEqual(number) {
    return this.addConstraint(bigintGreaterThanOrEqual(number));
  }
  equal(number) {
    return this.addConstraint(bigintEqual(number));
  }
  notEqual(number) {
    return this.addConstraint(bigintNotEqual(number));
  }
  get positive() {
    return this.greaterThanOrEqual(0n);
  }
  get negative() {
    return this.lessThan(0n);
  }
  divisibleBy(number) {
    return this.addConstraint(bigintDivisibleBy(number));
  }
  get abs() {
    return this.transform((value) => value < 0 ? -value : value);
  }
  intN(bits) {
    return this.transform((value) => BigInt.asIntN(bits, value));
  }
  uintN(bits) {
    return this.transform((value) => BigInt.asUintN(bits, value));
  }
  handle(value) {
    return typeof value === "bigint" ? Result.ok(value) : Result.err(new ValidationError("s.bigint", "Expected a bigint primitive", value));
  }
};
__name(_BigIntValidator, "BigIntValidator");
var BigIntValidator = _BigIntValidator;

// src/constraints/BooleanConstraints.ts
var booleanTrue = {
  run(input) {
    return input ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.boolean.true", "Invalid boolean value", input, "true"));
  }
};
var booleanFalse = {
  run(input) {
    return input ? Result.err(new ExpectedConstraintError("s.boolean.false", "Invalid boolean value", input, "false")) : Result.ok(input);
  }
};

// src/validators/BooleanValidator.ts
var _BooleanValidator = class _BooleanValidator extends BaseValidator {
  get true() {
    return this.addConstraint(booleanTrue);
  }
  get false() {
    return this.addConstraint(booleanFalse);
  }
  equal(value) {
    return value ? this.true : this.false;
  }
  notEqual(value) {
    return value ? this.false : this.true;
  }
  handle(value) {
    return typeof value === "boolean" ? Result.ok(value) : Result.err(new ValidationError("s.boolean", "Expected a boolean primitive", value));
  }
};
__name(_BooleanValidator, "BooleanValidator");
var BooleanValidator = _BooleanValidator;

// src/constraints/DateConstraints.ts
function dateComparator(comparator, name, expected, number) {
  return {
    run(input) {
      return comparator(input.getTime(), number) ? Result.ok(input) : Result.err(new ExpectedConstraintError(name, "Invalid Date value", input, expected));
    }
  };
}
__name(dateComparator, "dateComparator");
function dateLessThan(value) {
  const expected = `expected < ${value.toISOString()}`;
  return dateComparator(lessThan, "s.date.lessThan", expected, value.getTime());
}
__name(dateLessThan, "dateLessThan");
function dateLessThanOrEqual(value) {
  const expected = `expected <= ${value.toISOString()}`;
  return dateComparator(lessThanOrEqual, "s.date.lessThanOrEqual", expected, value.getTime());
}
__name(dateLessThanOrEqual, "dateLessThanOrEqual");
function dateGreaterThan(value) {
  const expected = `expected > ${value.toISOString()}`;
  return dateComparator(greaterThan, "s.date.greaterThan", expected, value.getTime());
}
__name(dateGreaterThan, "dateGreaterThan");
function dateGreaterThanOrEqual(value) {
  const expected = `expected >= ${value.toISOString()}`;
  return dateComparator(greaterThanOrEqual, "s.date.greaterThanOrEqual", expected, value.getTime());
}
__name(dateGreaterThanOrEqual, "dateGreaterThanOrEqual");
function dateEqual(value) {
  const expected = `expected === ${value.toISOString()}`;
  return dateComparator(equal, "s.date.equal", expected, value.getTime());
}
__name(dateEqual, "dateEqual");
function dateNotEqual(value) {
  const expected = `expected !== ${value.toISOString()}`;
  return dateComparator(notEqual, "s.date.notEqual", expected, value.getTime());
}
__name(dateNotEqual, "dateNotEqual");
var dateInvalid = {
  run(input) {
    return Number.isNaN(input.getTime()) ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.date.invalid", "Invalid Date value", input, "expected === NaN"));
  }
};
var dateValid = {
  run(input) {
    return Number.isNaN(input.getTime()) ? Result.err(new ExpectedConstraintError("s.date.valid", "Invalid Date value", input, "expected !== NaN")) : Result.ok(input);
  }
};

// src/validators/DateValidator.ts
var _DateValidator = class _DateValidator extends BaseValidator {
  lessThan(date) {
    return this.addConstraint(dateLessThan(new Date(date)));
  }
  lessThanOrEqual(date) {
    return this.addConstraint(dateLessThanOrEqual(new Date(date)));
  }
  greaterThan(date) {
    return this.addConstraint(dateGreaterThan(new Date(date)));
  }
  greaterThanOrEqual(date) {
    return this.addConstraint(dateGreaterThanOrEqual(new Date(date)));
  }
  equal(date) {
    const resolved = new Date(date);
    return Number.isNaN(resolved.getTime()) ? this.invalid : this.addConstraint(dateEqual(resolved));
  }
  notEqual(date) {
    const resolved = new Date(date);
    return Number.isNaN(resolved.getTime()) ? this.valid : this.addConstraint(dateNotEqual(resolved));
  }
  get valid() {
    return this.addConstraint(dateValid);
  }
  get invalid() {
    return this.addConstraint(dateInvalid);
  }
  handle(value) {
    return value instanceof Date ? Result.ok(value) : Result.err(new ValidationError("s.date", "Expected a Date", value));
  }
};
__name(_DateValidator, "DateValidator");
var DateValidator = _DateValidator;

// src/lib/errors/ExpectedValidationError.ts
var _ExpectedValidationError = class _ExpectedValidationError extends ValidationError {
  constructor(validator, message, given, expected) {
    super(validator, message, given);
    this.expected = expected;
  }
  toJSON() {
    return {
      name: this.name,
      validator: this.validator,
      given: this.given,
      expected: this.expected
    };
  }
  [customInspectSymbolStackLess](depth, options) {
    const validator = options.stylize(this.validator, "string");
    if (depth < 0) {
      return options.stylize(`[ExpectedValidationError: ${validator}]`, "special");
    }
    const newOptions = { ...options, depth: options.depth === null ? null : options.depth - 1 };
    const padding = `
  ${options.stylize("|", "undefined")} `;
    const expected = inspect2(this.expected, newOptions).replace(/\n/g, padding);
    const given = inspect2(this.given, newOptions).replace(/\n/g, padding);
    const header = `${options.stylize("ExpectedValidationError", "special")} > ${validator}`;
    const message = options.stylize(this.message, "regexp");
    const expectedBlock = `
  ${options.stylize("Expected:", "string")}${padding}${expected}`;
    const givenBlock = `
  ${options.stylize("Received:", "regexp")}${padding}${given}`;
    return `${header}
  ${message}
${expectedBlock}
${givenBlock}`;
  }
};
__name(_ExpectedValidationError, "ExpectedValidationError");
var ExpectedValidationError = _ExpectedValidationError;

// src/validators/InstanceValidator.ts
var _InstanceValidator = class _InstanceValidator extends BaseValidator {
  constructor(expected, constraints = []) {
    super(constraints);
    this.expected = expected;
  }
  handle(value) {
    return value instanceof this.expected ? Result.ok(value) : Result.err(new ExpectedValidationError("s.instance(V)", "Expected", value, this.expected));
  }
  clone() {
    return Reflect.construct(this.constructor, [this.expected, this.constraints]);
  }
};
__name(_InstanceValidator, "InstanceValidator");
var InstanceValidator = _InstanceValidator;

// src/validators/LiteralValidator.ts
var _LiteralValidator = class _LiteralValidator extends BaseValidator {
  constructor(literal, constraints = []) {
    super(constraints);
    this.expected = literal;
  }
  handle(value) {
    return Object.is(value, this.expected) ? Result.ok(value) : Result.err(new ExpectedValidationError("s.literal(V)", "Expected values to be equals", value, this.expected));
  }
  clone() {
    return Reflect.construct(this.constructor, [this.expected, this.constraints]);
  }
};
__name(_LiteralValidator, "LiteralValidator");
var LiteralValidator = _LiteralValidator;

// src/validators/NeverValidator.ts
var _NeverValidator = class _NeverValidator extends BaseValidator {
  handle(value) {
    return Result.err(new ValidationError("s.never", "Expected a value to not be passed", value));
  }
};
__name(_NeverValidator, "NeverValidator");
var NeverValidator = _NeverValidator;

// src/validators/NullishValidator.ts
var _NullishValidator = class _NullishValidator extends BaseValidator {
  handle(value) {
    return value === void 0 || value === null ? Result.ok(value) : Result.err(new ValidationError("s.nullish", "Expected undefined or null", value));
  }
};
__name(_NullishValidator, "NullishValidator");
var NullishValidator = _NullishValidator;

// src/constraints/NumberConstraints.ts
function numberComparator(comparator, name, expected, number) {
  return {
    run(input) {
      return comparator(input, number) ? Result.ok(input) : Result.err(new ExpectedConstraintError(name, "Invalid number value", input, expected));
    }
  };
}
__name(numberComparator, "numberComparator");
function numberLessThan(value) {
  const expected = `expected < ${value}`;
  return numberComparator(lessThan, "s.number.lessThan", expected, value);
}
__name(numberLessThan, "numberLessThan");
function numberLessThanOrEqual(value) {
  const expected = `expected <= ${value}`;
  return numberComparator(lessThanOrEqual, "s.number.lessThanOrEqual", expected, value);
}
__name(numberLessThanOrEqual, "numberLessThanOrEqual");
function numberGreaterThan(value) {
  const expected = `expected > ${value}`;
  return numberComparator(greaterThan, "s.number.greaterThan", expected, value);
}
__name(numberGreaterThan, "numberGreaterThan");
function numberGreaterThanOrEqual(value) {
  const expected = `expected >= ${value}`;
  return numberComparator(greaterThanOrEqual, "s.number.greaterThanOrEqual", expected, value);
}
__name(numberGreaterThanOrEqual, "numberGreaterThanOrEqual");
function numberEqual(value) {
  const expected = `expected === ${value}`;
  return numberComparator(equal, "s.number.equal", expected, value);
}
__name(numberEqual, "numberEqual");
function numberNotEqual(value) {
  const expected = `expected !== ${value}`;
  return numberComparator(notEqual, "s.number.notEqual", expected, value);
}
__name(numberNotEqual, "numberNotEqual");
var numberInt = {
  run(input) {
    return Number.isInteger(input) ? Result.ok(input) : Result.err(
      new ExpectedConstraintError("s.number.int", "Given value is not an integer", input, "Number.isInteger(expected) to be true")
    );
  }
};
var numberSafeInt = {
  run(input) {
    return Number.isSafeInteger(input) ? Result.ok(input) : Result.err(
      new ExpectedConstraintError(
        "s.number.safeInt",
        "Given value is not a safe integer",
        input,
        "Number.isSafeInteger(expected) to be true"
      )
    );
  }
};
var numberFinite = {
  run(input) {
    return Number.isFinite(input) ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.number.finite", "Given value is not finite", input, "Number.isFinite(expected) to be true"));
  }
};
var numberNaN = {
  run(input) {
    return Number.isNaN(input) ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.number.equal(NaN)", "Invalid number value", input, "expected === NaN"));
  }
};
var numberNotNaN = {
  run(input) {
    return Number.isNaN(input) ? Result.err(new ExpectedConstraintError("s.number.notEqual(NaN)", "Invalid number value", input, "expected !== NaN")) : Result.ok(input);
  }
};
function numberDivisibleBy(divider) {
  const expected = `expected % ${divider} === 0`;
  return {
    run(input) {
      return input % divider === 0 ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.number.divisibleBy", "Number is not divisible", input, expected));
    }
  };
}
__name(numberDivisibleBy, "numberDivisibleBy");

// src/validators/NumberValidator.ts
var _NumberValidator = class _NumberValidator extends BaseValidator {
  lessThan(number) {
    return this.addConstraint(numberLessThan(number));
  }
  lessThanOrEqual(number) {
    return this.addConstraint(numberLessThanOrEqual(number));
  }
  greaterThan(number) {
    return this.addConstraint(numberGreaterThan(number));
  }
  greaterThanOrEqual(number) {
    return this.addConstraint(numberGreaterThanOrEqual(number));
  }
  equal(number) {
    return Number.isNaN(number) ? this.addConstraint(numberNaN) : this.addConstraint(numberEqual(number));
  }
  notEqual(number) {
    return Number.isNaN(number) ? this.addConstraint(numberNotNaN) : this.addConstraint(numberNotEqual(number));
  }
  get int() {
    return this.addConstraint(numberInt);
  }
  get safeInt() {
    return this.addConstraint(numberSafeInt);
  }
  get finite() {
    return this.addConstraint(numberFinite);
  }
  get positive() {
    return this.greaterThanOrEqual(0);
  }
  get negative() {
    return this.lessThan(0);
  }
  divisibleBy(divider) {
    return this.addConstraint(numberDivisibleBy(divider));
  }
  get abs() {
    return this.transform(Math.abs);
  }
  get sign() {
    return this.transform(Math.sign);
  }
  get trunc() {
    return this.transform(Math.trunc);
  }
  get floor() {
    return this.transform(Math.floor);
  }
  get fround() {
    return this.transform(Math.fround);
  }
  get round() {
    return this.transform(Math.round);
  }
  get ceil() {
    return this.transform(Math.ceil);
  }
  handle(value) {
    return typeof value === "number" ? Result.ok(value) : Result.err(new ValidationError("s.number", "Expected a number primitive", value));
  }
};
__name(_NumberValidator, "NumberValidator");
var NumberValidator = _NumberValidator;

// src/lib/errors/MissingPropertyError.ts
var _MissingPropertyError = class _MissingPropertyError extends BaseError {
  constructor(property) {
    super("A required property is missing");
    this.property = property;
  }
  toJSON() {
    return {
      name: this.name,
      property: this.property
    };
  }
  [customInspectSymbolStackLess](depth, options) {
    const property = options.stylize(this.property.toString(), "string");
    if (depth < 0) {
      return options.stylize(`[MissingPropertyError: ${property}]`, "special");
    }
    const header = `${options.stylize("MissingPropertyError", "special")} > ${property}`;
    const message = options.stylize(this.message, "regexp");
    return `${header}
  ${message}`;
  }
};
__name(_MissingPropertyError, "MissingPropertyError");
var MissingPropertyError = _MissingPropertyError;

// src/lib/errors/UnknownPropertyError.ts
var _UnknownPropertyError = class _UnknownPropertyError extends BaseError {
  constructor(property, value) {
    super("Received unexpected property");
    this.property = property;
    this.value = value;
  }
  toJSON() {
    return {
      name: this.name,
      property: this.property,
      value: this.value
    };
  }
  [customInspectSymbolStackLess](depth, options) {
    const property = options.stylize(this.property.toString(), "string");
    if (depth < 0) {
      return options.stylize(`[UnknownPropertyError: ${property}]`, "special");
    }
    const newOptions = { ...options, depth: options.depth === null ? null : options.depth - 1, compact: true };
    const padding = `
  ${options.stylize("|", "undefined")} `;
    const given = inspect2(this.value, newOptions).replace(/\n/g, padding);
    const header = `${options.stylize("UnknownPropertyError", "special")} > ${property}`;
    const message = options.stylize(this.message, "regexp");
    const givenBlock = `
  ${options.stylize("Received:", "regexp")}${padding}${given}`;
    return `${header}
  ${message}
${givenBlock}`;
  }
};
__name(_UnknownPropertyError, "UnknownPropertyError");
var UnknownPropertyError = _UnknownPropertyError;

// src/validators/DefaultValidator.ts
var _DefaultValidator = class _DefaultValidator extends BaseValidator {
  constructor(validator, value, constraints = []) {
    super(constraints);
    this.validator = validator;
    this.defaultValue = value;
  }
  default(value) {
    const clone = this.clone();
    clone.defaultValue = value;
    return clone;
  }
  handle(value) {
    return typeof value === "undefined" ? Result.ok(getValue(this.defaultValue)) : this.validator["handle"](value);
  }
  clone() {
    return Reflect.construct(this.constructor, [this.validator, this.defaultValue, this.constraints]);
  }
};
__name(_DefaultValidator, "DefaultValidator");
var DefaultValidator = _DefaultValidator;

// src/lib/errors/CombinedError.ts
var _CombinedError = class _CombinedError extends BaseError {
  constructor(errors) {
    super("Received one or more errors");
    this.errors = errors;
  }
  [customInspectSymbolStackLess](depth, options) {
    if (depth < 0) {
      return options.stylize("[CombinedError]", "special");
    }
    const newOptions = { ...options, depth: options.depth === null ? null : options.depth - 1, compact: true };
    const padding = `
  ${options.stylize("|", "undefined")} `;
    const header = `${options.stylize("CombinedError", "special")} (${options.stylize(this.errors.length.toString(), "number")})`;
    const message = options.stylize(this.message, "regexp");
    const errors = this.errors.map((error, i3) => {
      const index = options.stylize((i3 + 1).toString(), "number");
      const body = error[customInspectSymbolStackLess](depth - 1, newOptions).replace(/\n/g, padding);
      return `  ${index} ${body}`;
    }).join("\n\n");
    return `${header}
  ${message}

${errors}`;
  }
};
__name(_CombinedError, "CombinedError");
var CombinedError = _CombinedError;

// src/validators/UnionValidator.ts
var _UnionValidator = class _UnionValidator extends BaseValidator {
  constructor(validators, constraints = []) {
    super(constraints);
    this.validators = validators;
  }
  get optional() {
    if (this.validators.length === 0)
      return new _UnionValidator([new LiteralValidator(void 0)], this.constraints);
    const [validator] = this.validators;
    if (validator instanceof LiteralValidator) {
      if (validator.expected === void 0)
        return this.clone();
      if (validator.expected === null) {
        return new _UnionValidator(
          [new NullishValidator(), ...this.validators.slice(1)],
          this.constraints
        );
      }
    } else if (validator instanceof NullishValidator) {
      return this.clone();
    }
    return new _UnionValidator([new LiteralValidator(void 0), ...this.validators]);
  }
  get required() {
    if (this.validators.length === 0)
      return this.clone();
    const [validator] = this.validators;
    if (validator instanceof LiteralValidator) {
      if (validator.expected === void 0)
        return new _UnionValidator(this.validators.slice(1), this.constraints);
    } else if (validator instanceof NullishValidator) {
      return new _UnionValidator([new LiteralValidator(null), ...this.validators.slice(1)], this.constraints);
    }
    return this.clone();
  }
  get nullable() {
    if (this.validators.length === 0)
      return new _UnionValidator([new LiteralValidator(null)], this.constraints);
    const [validator] = this.validators;
    if (validator instanceof LiteralValidator) {
      if (validator.expected === null)
        return this.clone();
      if (validator.expected === void 0) {
        return new _UnionValidator(
          [new NullishValidator(), ...this.validators.slice(1)],
          this.constraints
        );
      }
    } else if (validator instanceof NullishValidator) {
      return this.clone();
    }
    return new _UnionValidator([new LiteralValidator(null), ...this.validators]);
  }
  get nullish() {
    if (this.validators.length === 0)
      return new _UnionValidator([new NullishValidator()], this.constraints);
    const [validator] = this.validators;
    if (validator instanceof LiteralValidator) {
      if (validator.expected === null || validator.expected === void 0) {
        return new _UnionValidator([new NullishValidator(), ...this.validators.slice(1)], this.constraints);
      }
    } else if (validator instanceof NullishValidator) {
      return this.clone();
    }
    return new _UnionValidator([new NullishValidator(), ...this.validators]);
  }
  or(...predicates) {
    return new _UnionValidator([...this.validators, ...predicates]);
  }
  clone() {
    return Reflect.construct(this.constructor, [this.validators, this.constraints]);
  }
  handle(value) {
    const errors = [];
    for (const validator of this.validators) {
      const result = validator.run(value);
      if (result.isOk())
        return result;
      errors.push(result.error);
    }
    return Result.err(new CombinedError(errors));
  }
};
__name(_UnionValidator, "UnionValidator");
var UnionValidator = _UnionValidator;

// src/validators/ObjectValidator.ts
var _ObjectValidator = class _ObjectValidator extends BaseValidator {
  constructor(shape, strategy = 0 /* Ignore */, constraints = []) {
    super(constraints);
    this.keys = [];
    this.requiredKeys = /* @__PURE__ */ new Map();
    this.possiblyUndefinedKeys = /* @__PURE__ */ new Map();
    this.possiblyUndefinedKeysWithDefaults = /* @__PURE__ */ new Map();
    this.shape = shape;
    this.strategy = strategy;
    switch (this.strategy) {
      case 0 /* Ignore */:
        this.handleStrategy = (value) => this.handleIgnoreStrategy(value);
        break;
      case 1 /* Strict */: {
        this.handleStrategy = (value) => this.handleStrictStrategy(value);
        break;
      }
      case 2 /* Passthrough */:
        this.handleStrategy = (value) => this.handlePassthroughStrategy(value);
        break;
    }
    const shapeEntries = Object.entries(shape);
    this.keys = shapeEntries.map(([key]) => key);
    for (const [key, validator] of shapeEntries) {
      if (validator instanceof UnionValidator) {
        const [possiblyLiteralOrNullishPredicate] = validator["validators"];
        if (possiblyLiteralOrNullishPredicate instanceof NullishValidator) {
          this.possiblyUndefinedKeys.set(key, validator);
        } else if (possiblyLiteralOrNullishPredicate instanceof LiteralValidator) {
          if (possiblyLiteralOrNullishPredicate.expected === void 0) {
            this.possiblyUndefinedKeys.set(key, validator);
          } else {
            this.requiredKeys.set(key, validator);
          }
        } else if (validator instanceof DefaultValidator) {
          this.possiblyUndefinedKeysWithDefaults.set(key, validator);
        } else {
          this.requiredKeys.set(key, validator);
        }
      } else if (validator instanceof NullishValidator) {
        this.possiblyUndefinedKeys.set(key, validator);
      } else if (validator instanceof LiteralValidator) {
        if (validator.expected === void 0) {
          this.possiblyUndefinedKeys.set(key, validator);
        } else {
          this.requiredKeys.set(key, validator);
        }
      } else if (validator instanceof DefaultValidator) {
        this.possiblyUndefinedKeysWithDefaults.set(key, validator);
      } else {
        this.requiredKeys.set(key, validator);
      }
    }
  }
  get strict() {
    return Reflect.construct(this.constructor, [this.shape, 1 /* Strict */, this.constraints]);
  }
  get ignore() {
    return Reflect.construct(this.constructor, [this.shape, 0 /* Ignore */, this.constraints]);
  }
  get passthrough() {
    return Reflect.construct(this.constructor, [this.shape, 2 /* Passthrough */, this.constraints]);
  }
  get partial() {
    const shape = Object.fromEntries(this.keys.map((key) => [key, this.shape[key].optional]));
    return Reflect.construct(this.constructor, [shape, this.strategy, this.constraints]);
  }
  get required() {
    const shape = Object.fromEntries(
      this.keys.map((key) => {
        let validator = this.shape[key];
        if (validator instanceof UnionValidator)
          validator = validator.required;
        return [key, validator];
      })
    );
    return Reflect.construct(this.constructor, [shape, this.strategy, this.constraints]);
  }
  extend(schema) {
    const shape = { ...this.shape, ...schema instanceof _ObjectValidator ? schema.shape : schema };
    return Reflect.construct(this.constructor, [shape, this.strategy, this.constraints]);
  }
  pick(keys) {
    const shape = Object.fromEntries(
      keys.filter((key) => this.keys.includes(key)).map((key) => [key, this.shape[key]])
    );
    return Reflect.construct(this.constructor, [shape, this.strategy, this.constraints]);
  }
  omit(keys) {
    const shape = Object.fromEntries(
      this.keys.filter((key) => !keys.includes(key)).map((key) => [key, this.shape[key]])
    );
    return Reflect.construct(this.constructor, [shape, this.strategy, this.constraints]);
  }
  handle(value) {
    const typeOfValue = typeof value;
    if (typeOfValue !== "object") {
      return Result.err(new ValidationError("s.object(T)", `Expected the value to be an object, but received ${typeOfValue} instead`, value));
    }
    if (value === null) {
      return Result.err(new ValidationError("s.object(T)", "Expected the value to not be null", value));
    }
    if (Array.isArray(value)) {
      return Result.err(new ValidationError("s.object(T)", "Expected the value to not be an array", value));
    }
    if (!this.shouldRunConstraints) {
      return Result.ok(value);
    }
    for (const predicate of Object.values(this.shape)) {
      predicate.setParent(this.parent ?? value);
    }
    return this.handleStrategy(value);
  }
  clone() {
    return Reflect.construct(this.constructor, [this.shape, this.strategy, this.constraints]);
  }
  handleIgnoreStrategy(value) {
    const errors = [];
    const finalObject = {};
    const inputEntries = new Map(Object.entries(value));
    const runPredicate = /* @__PURE__ */ __name((key, predicate) => {
      const result = predicate.run(value[key]);
      if (result.isOk()) {
        finalObject[key] = result.value;
      } else {
        const error = result.error;
        errors.push([key, error]);
      }
    }, "runPredicate");
    for (const [key, predicate] of this.requiredKeys) {
      if (inputEntries.delete(key)) {
        runPredicate(key, predicate);
      } else {
        errors.push([key, new MissingPropertyError(key)]);
      }
    }
    for (const [key, validator] of this.possiblyUndefinedKeysWithDefaults) {
      inputEntries.delete(key);
      runPredicate(key, validator);
    }
    if (inputEntries.size === 0) {
      return errors.length === 0 ? Result.ok(finalObject) : Result.err(new CombinedPropertyError(errors));
    }
    const checkInputEntriesInsteadOfSchemaKeys = this.possiblyUndefinedKeys.size > inputEntries.size;
    if (checkInputEntriesInsteadOfSchemaKeys) {
      for (const [key] of inputEntries) {
        const predicate = this.possiblyUndefinedKeys.get(key);
        if (predicate) {
          runPredicate(key, predicate);
        }
      }
    } else {
      for (const [key, predicate] of this.possiblyUndefinedKeys) {
        if (inputEntries.delete(key)) {
          runPredicate(key, predicate);
        }
      }
    }
    return errors.length === 0 ? Result.ok(finalObject) : Result.err(new CombinedPropertyError(errors));
  }
  handleStrictStrategy(value) {
    const errors = [];
    const finalResult = {};
    const inputEntries = new Map(Object.entries(value));
    const runPredicate = /* @__PURE__ */ __name((key, predicate) => {
      const result = predicate.run(value[key]);
      if (result.isOk()) {
        finalResult[key] = result.value;
      } else {
        const error = result.error;
        errors.push([key, error]);
      }
    }, "runPredicate");
    for (const [key, predicate] of this.requiredKeys) {
      if (inputEntries.delete(key)) {
        runPredicate(key, predicate);
      } else {
        errors.push([key, new MissingPropertyError(key)]);
      }
    }
    for (const [key, validator] of this.possiblyUndefinedKeysWithDefaults) {
      inputEntries.delete(key);
      runPredicate(key, validator);
    }
    for (const [key, predicate] of this.possiblyUndefinedKeys) {
      if (inputEntries.size === 0) {
        break;
      }
      if (inputEntries.delete(key)) {
        runPredicate(key, predicate);
      }
    }
    if (inputEntries.size !== 0) {
      for (const [key, value2] of inputEntries.entries()) {
        errors.push([key, new UnknownPropertyError(key, value2)]);
      }
    }
    return errors.length === 0 ? Result.ok(finalResult) : Result.err(new CombinedPropertyError(errors));
  }
  handlePassthroughStrategy(value) {
    const result = this.handleIgnoreStrategy(value);
    return result.isErr() ? result : Result.ok({ ...value, ...result.value });
  }
};
__name(_ObjectValidator, "ObjectValidator");
var ObjectValidator = _ObjectValidator;

// src/validators/PassthroughValidator.ts
var _PassthroughValidator = class _PassthroughValidator extends BaseValidator {
  handle(value) {
    return Result.ok(value);
  }
};
__name(_PassthroughValidator, "PassthroughValidator");
var PassthroughValidator = _PassthroughValidator;

// src/validators/RecordValidator.ts
var _RecordValidator = class _RecordValidator extends BaseValidator {
  constructor(validator, constraints = []) {
    super(constraints);
    this.validator = validator;
  }
  clone() {
    return Reflect.construct(this.constructor, [this.validator, this.constraints]);
  }
  handle(value) {
    if (typeof value !== "object") {
      return Result.err(new ValidationError("s.record(T)", "Expected an object", value));
    }
    if (value === null) {
      return Result.err(new ValidationError("s.record(T)", "Expected the value to not be null", value));
    }
    if (Array.isArray(value)) {
      return Result.err(new ValidationError("s.record(T)", "Expected the value to not be an array", value));
    }
    if (!this.shouldRunConstraints) {
      return Result.ok(value);
    }
    const errors = [];
    const transformed = {};
    for (const [key, val] of Object.entries(value)) {
      const result = this.validator.run(val);
      if (result.isOk())
        transformed[key] = result.value;
      else
        errors.push([key, result.error]);
    }
    return errors.length === 0 ? Result.ok(transformed) : Result.err(new CombinedPropertyError(errors));
  }
};
__name(_RecordValidator, "RecordValidator");
var RecordValidator = _RecordValidator;

// src/validators/SetValidator.ts
var _SetValidator = class _SetValidator extends BaseValidator {
  constructor(validator, constraints = []) {
    super(constraints);
    this.validator = validator;
  }
  clone() {
    return Reflect.construct(this.constructor, [this.validator, this.constraints]);
  }
  handle(values) {
    if (!(values instanceof Set)) {
      return Result.err(new ValidationError("s.set(T)", "Expected a set", values));
    }
    if (!this.shouldRunConstraints) {
      return Result.ok(values);
    }
    const errors = [];
    const transformed = /* @__PURE__ */ new Set();
    for (const value of values) {
      const result = this.validator.run(value);
      if (result.isOk())
        transformed.add(result.value);
      else
        errors.push(result.error);
    }
    return errors.length === 0 ? Result.ok(transformed) : Result.err(new CombinedError(errors));
  }
};
__name(_SetValidator, "SetValidator");
var SetValidator = _SetValidator;

// src/constraints/util/emailValidator.ts
var accountRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]$/i;
function validateEmail(email) {
  if (!email)
    return false;
  const atIndex = email.indexOf("@");
  if (atIndex === -1)
    return false;
  if (atIndex > 64)
    return false;
  const domainIndex = atIndex + 1;
  if (email.includes("@", domainIndex))
    return false;
  if (email.length - domainIndex > 255)
    return false;
  let dotIndex = email.indexOf(".", domainIndex);
  if (dotIndex === -1)
    return false;
  let lastDotIndex = domainIndex;
  do {
    if (dotIndex - lastDotIndex > 63)
      return false;
    lastDotIndex = dotIndex + 1;
  } while ((dotIndex = email.indexOf(".", lastDotIndex)) !== -1);
  if (email.length - lastDotIndex > 63)
    return false;
  return accountRegex.test(email.slice(0, atIndex)) && validateEmailDomain(email.slice(domainIndex));
}
__name(validateEmail, "validateEmail");
function validateEmailDomain(domain) {
  try {
    return new URL(`http://${domain}`).hostname === domain;
  } catch {
    return false;
  }
}
__name(validateEmailDomain, "validateEmailDomain");

// src/constraints/util/net.ts
var v4Seg = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
var v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
var IPv4Reg = new RegExp(`^${v4Str}$`);
var v6Seg = "(?:[0-9a-fA-F]{1,4})";
var IPv6Reg = new RegExp(
  `^((?:${v6Seg}:){7}(?:${v6Seg}|:)|(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:)))(%[0-9a-zA-Z-.:]{1,})?$`
);
function isIPv4(s4) {
  return IPv4Reg.test(s4);
}
__name(isIPv4, "isIPv4");
function isIPv6(s4) {
  return IPv6Reg.test(s4);
}
__name(isIPv6, "isIPv6");
function isIP(s4) {
  if (isIPv4(s4))
    return 4;
  if (isIPv6(s4))
    return 6;
  return 0;
}
__name(isIP, "isIP");

// src/constraints/util/phoneValidator.ts
var phoneNumberRegex = /^((?:\+|0{0,2})\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
function validatePhoneNumber(input) {
  return phoneNumberRegex.test(input);
}
__name(validatePhoneNumber, "validatePhoneNumber");

// src/lib/errors/MultiplePossibilitiesConstraintError.ts
var _MultiplePossibilitiesConstraintError = class _MultiplePossibilitiesConstraintError extends BaseConstraintError {
  constructor(constraint, message, given, expected) {
    super(constraint, message, given);
    this.expected = expected;
  }
  toJSON() {
    return {
      name: this.name,
      constraint: this.constraint,
      given: this.given,
      expected: this.expected
    };
  }
  [customInspectSymbolStackLess](depth, options) {
    const constraint = options.stylize(this.constraint, "string");
    if (depth < 0) {
      return options.stylize(`[MultiplePossibilitiesConstraintError: ${constraint}]`, "special");
    }
    const newOptions = { ...options, depth: options.depth === null ? null : options.depth - 1 };
    const verticalLine = options.stylize("|", "undefined");
    const padding = `
  ${verticalLine} `;
    const given = inspect2(this.given, newOptions).replace(/\n/g, padding);
    const header = `${options.stylize("MultiplePossibilitiesConstraintError", "special")} > ${constraint}`;
    const message = options.stylize(this.message, "regexp");
    const expectedPadding = `
  ${verticalLine} - `;
    const expectedBlock = `
  ${options.stylize("Expected any of the following:", "string")}${expectedPadding}${this.expected.map((possible) => options.stylize(possible, "boolean")).join(expectedPadding)}`;
    const givenBlock = `
  ${options.stylize("Received:", "regexp")}${padding}${given}`;
    return `${header}
  ${message}
${expectedBlock}
${givenBlock}`;
  }
};
__name(_MultiplePossibilitiesConstraintError, "MultiplePossibilitiesConstraintError");
var MultiplePossibilitiesConstraintError = _MultiplePossibilitiesConstraintError;

// src/constraints/util/common/combinedResultFn.ts
function combinedErrorFn(...fns) {
  switch (fns.length) {
    case 0:
      return () => null;
    case 1:
      return fns[0];
    case 2: {
      const [fn0, fn1] = fns;
      return (...params) => fn0(...params) || fn1(...params);
    }
    default: {
      return (...params) => {
        for (const fn of fns) {
          const result = fn(...params);
          if (result)
            return result;
        }
        return null;
      };
    }
  }
}
__name(combinedErrorFn, "combinedErrorFn");

// src/constraints/util/urlValidators.ts
function createUrlValidators(options) {
  const fns = [];
  if (options?.allowedProtocols?.length)
    fns.push(allowedProtocolsFn(options.allowedProtocols));
  if (options?.allowedDomains?.length)
    fns.push(allowedDomainsFn(options.allowedDomains));
  return combinedErrorFn(...fns);
}
__name(createUrlValidators, "createUrlValidators");
function allowedProtocolsFn(allowedProtocols) {
  return (input, url) => allowedProtocols.includes(url.protocol) ? null : new MultiplePossibilitiesConstraintError("s.string.url", "Invalid URL protocol", input, allowedProtocols);
}
__name(allowedProtocolsFn, "allowedProtocolsFn");
function allowedDomainsFn(allowedDomains) {
  return (input, url) => allowedDomains.includes(url.hostname) ? null : new MultiplePossibilitiesConstraintError("s.string.url", "Invalid URL domain", input, allowedDomains);
}
__name(allowedDomainsFn, "allowedDomainsFn");

// src/constraints/StringConstraints.ts
function stringLengthComparator(comparator, name, expected, length) {
  return {
    run(input) {
      return comparator(input.length, length) ? Result.ok(input) : Result.err(new ExpectedConstraintError(name, "Invalid string length", input, expected));
    }
  };
}
__name(stringLengthComparator, "stringLengthComparator");
function stringLengthLessThan(length) {
  const expected = `expected.length < ${length}`;
  return stringLengthComparator(lessThan, "s.string.lengthLessThan", expected, length);
}
__name(stringLengthLessThan, "stringLengthLessThan");
function stringLengthLessThanOrEqual(length) {
  const expected = `expected.length <= ${length}`;
  return stringLengthComparator(lessThanOrEqual, "s.string.lengthLessThanOrEqual", expected, length);
}
__name(stringLengthLessThanOrEqual, "stringLengthLessThanOrEqual");
function stringLengthGreaterThan(length) {
  const expected = `expected.length > ${length}`;
  return stringLengthComparator(greaterThan, "s.string.lengthGreaterThan", expected, length);
}
__name(stringLengthGreaterThan, "stringLengthGreaterThan");
function stringLengthGreaterThanOrEqual(length) {
  const expected = `expected.length >= ${length}`;
  return stringLengthComparator(greaterThanOrEqual, "s.string.lengthGreaterThanOrEqual", expected, length);
}
__name(stringLengthGreaterThanOrEqual, "stringLengthGreaterThanOrEqual");
function stringLengthEqual(length) {
  const expected = `expected.length === ${length}`;
  return stringLengthComparator(equal, "s.string.lengthEqual", expected, length);
}
__name(stringLengthEqual, "stringLengthEqual");
function stringLengthNotEqual(length) {
  const expected = `expected.length !== ${length}`;
  return stringLengthComparator(notEqual, "s.string.lengthNotEqual", expected, length);
}
__name(stringLengthNotEqual, "stringLengthNotEqual");
function stringEmail() {
  return {
    run(input) {
      return validateEmail(input) ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.string.email", "Invalid email address", input, "expected to be an email address"));
    }
  };
}
__name(stringEmail, "stringEmail");
function stringRegexValidator(type, expected, regex) {
  return {
    run(input) {
      return regex.test(input) ? Result.ok(input) : Result.err(new ExpectedConstraintError(type, "Invalid string format", input, expected));
    }
  };
}
__name(stringRegexValidator, "stringRegexValidator");
function stringUrl(options) {
  const validatorFn = createUrlValidators(options);
  return {
    run(input) {
      let url;
      try {
        url = new URL(input);
      } catch {
        return Result.err(new ExpectedConstraintError("s.string.url", "Invalid URL", input, "expected to match a URL"));
      }
      const validatorFnResult = validatorFn(input, url);
      if (validatorFnResult === null)
        return Result.ok(input);
      return Result.err(validatorFnResult);
    }
  };
}
__name(stringUrl, "stringUrl");
function stringIp(version) {
  const ipVersion = version ? `v${version}` : "";
  const validatorFn = version === 4 ? isIPv4 : version === 6 ? isIPv6 : isIP;
  const name = `s.string.ip${ipVersion}`;
  const message = `Invalid IP${ipVersion} address`;
  const expected = `expected to be an IP${ipVersion} address`;
  return {
    run(input) {
      return validatorFn(input) ? Result.ok(input) : Result.err(new ExpectedConstraintError(name, message, input, expected));
    }
  };
}
__name(stringIp, "stringIp");
function stringRegex(regex) {
  return stringRegexValidator("s.string.regex", `expected ${regex}.test(expected) to be true`, regex);
}
__name(stringRegex, "stringRegex");
function stringUuid({ version = 4, nullable = false } = {}) {
  version ?? (version = "1-5");
  const regex = new RegExp(
    `^(?:[0-9A-F]{8}-[0-9A-F]{4}-[${version}][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}${nullable ? "|00000000-0000-0000-0000-000000000000" : ""})$`,
    "i"
  );
  const expected = `expected to match UUID${typeof version === "number" ? `v${version}` : ` in range of ${version}`}`;
  return stringRegexValidator("s.string.uuid", expected, regex);
}
__name(stringUuid, "stringUuid");
function stringDate() {
  return {
    run(input) {
      const time = Date.parse(input);
      return Number.isNaN(time) ? Result.err(
        new ExpectedConstraintError(
          "s.string.date",
          "Invalid date string",
          input,
          "expected to be a valid date string (in the ISO 8601 or ECMA-262 format)"
        )
      ) : Result.ok(input);
    }
  };
}
__name(stringDate, "stringDate");
function stringPhone() {
  return {
    run(input) {
      return validatePhoneNumber(input) ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.string.phone", "Invalid phone number", input, "expected to be a phone number"));
    }
  };
}
__name(stringPhone, "stringPhone");

// src/validators/StringValidator.ts
var _StringValidator = class _StringValidator extends BaseValidator {
  lengthLessThan(length) {
    return this.addConstraint(stringLengthLessThan(length));
  }
  lengthLessThanOrEqual(length) {
    return this.addConstraint(stringLengthLessThanOrEqual(length));
  }
  lengthGreaterThan(length) {
    return this.addConstraint(stringLengthGreaterThan(length));
  }
  lengthGreaterThanOrEqual(length) {
    return this.addConstraint(stringLengthGreaterThanOrEqual(length));
  }
  lengthEqual(length) {
    return this.addConstraint(stringLengthEqual(length));
  }
  lengthNotEqual(length) {
    return this.addConstraint(stringLengthNotEqual(length));
  }
  get email() {
    return this.addConstraint(stringEmail());
  }
  url(options) {
    return this.addConstraint(stringUrl(options));
  }
  uuid(options) {
    return this.addConstraint(stringUuid(options));
  }
  regex(regex) {
    return this.addConstraint(stringRegex(regex));
  }
  get date() {
    return this.addConstraint(stringDate());
  }
  get ipv4() {
    return this.ip(4);
  }
  get ipv6() {
    return this.ip(6);
  }
  ip(version) {
    return this.addConstraint(stringIp(version));
  }
  phone() {
    return this.addConstraint(stringPhone());
  }
  handle(value) {
    return typeof value === "string" ? Result.ok(value) : Result.err(new ValidationError("s.string", "Expected a string primitive", value));
  }
};
__name(_StringValidator, "StringValidator");
var StringValidator = _StringValidator;

// src/validators/TupleValidator.ts
var _TupleValidator = class _TupleValidator extends BaseValidator {
  constructor(validators, constraints = []) {
    super(constraints);
    this.validators = [];
    this.validators = validators;
  }
  clone() {
    return Reflect.construct(this.constructor, [this.validators, this.constraints]);
  }
  handle(values) {
    if (!Array.isArray(values)) {
      return Result.err(new ValidationError("s.tuple(T)", "Expected an array", values));
    }
    if (values.length !== this.validators.length) {
      return Result.err(new ValidationError("s.tuple(T)", `Expected an array of length ${this.validators.length}`, values));
    }
    if (!this.shouldRunConstraints) {
      return Result.ok(values);
    }
    const errors = [];
    const transformed = [];
    for (let i3 = 0; i3 < values.length; i3++) {
      const result = this.validators[i3].run(values[i3]);
      if (result.isOk())
        transformed.push(result.value);
      else
        errors.push([i3, result.error]);
    }
    return errors.length === 0 ? Result.ok(transformed) : Result.err(new CombinedPropertyError(errors));
  }
};
__name(_TupleValidator, "TupleValidator");
var TupleValidator = _TupleValidator;

// src/validators/MapValidator.ts
var _MapValidator = class _MapValidator extends BaseValidator {
  constructor(keyValidator, valueValidator, constraints = []) {
    super(constraints);
    this.keyValidator = keyValidator;
    this.valueValidator = valueValidator;
  }
  clone() {
    return Reflect.construct(this.constructor, [this.keyValidator, this.valueValidator, this.constraints]);
  }
  handle(value) {
    if (!(value instanceof Map)) {
      return Result.err(new ValidationError("s.map(K, V)", "Expected a map", value));
    }
    if (!this.shouldRunConstraints) {
      return Result.ok(value);
    }
    const errors = [];
    const transformed = /* @__PURE__ */ new Map();
    for (const [key, val] of value.entries()) {
      const keyResult = this.keyValidator.run(key);
      const valueResult = this.valueValidator.run(val);
      const { length } = errors;
      if (keyResult.isErr())
        errors.push([key, keyResult.error]);
      if (valueResult.isErr())
        errors.push([key, valueResult.error]);
      if (errors.length === length)
        transformed.set(keyResult.value, valueResult.value);
    }
    return errors.length === 0 ? Result.ok(transformed) : Result.err(new CombinedPropertyError(errors));
  }
};
__name(_MapValidator, "MapValidator");
var MapValidator = _MapValidator;

// src/validators/LazyValidator.ts
var _LazyValidator = class _LazyValidator extends BaseValidator {
  constructor(validator, constraints = []) {
    super(constraints);
    this.validator = validator;
  }
  clone() {
    return Reflect.construct(this.constructor, [this.validator, this.constraints]);
  }
  handle(values) {
    return this.validator(values).run(values);
  }
};
__name(_LazyValidator, "LazyValidator");
var LazyValidator = _LazyValidator;

// src/lib/errors/UnknownEnumValueError.ts
var _UnknownEnumValueError = class _UnknownEnumValueError extends BaseError {
  constructor(value, keys, enumMappings) {
    super("Expected the value to be one of the following enum values:");
    this.value = value;
    this.enumKeys = keys;
    this.enumMappings = enumMappings;
  }
  toJSON() {
    return {
      name: this.name,
      value: this.value,
      enumKeys: this.enumKeys,
      enumMappings: [...this.enumMappings.entries()]
    };
  }
  [customInspectSymbolStackLess](depth, options) {
    const value = options.stylize(this.value.toString(), "string");
    if (depth < 0) {
      return options.stylize(`[UnknownEnumValueError: ${value}]`, "special");
    }
    const padding = `
  ${options.stylize("|", "undefined")} `;
    const pairs = this.enumKeys.map((key) => {
      const enumValue = this.enumMappings.get(key);
      return `${options.stylize(key, "string")} or ${options.stylize(
        enumValue.toString(),
        typeof enumValue === "number" ? "number" : "string"
      )}`;
    }).join(padding);
    const header = `${options.stylize("UnknownEnumValueError", "special")} > ${value}`;
    const message = options.stylize(this.message, "regexp");
    const pairsBlock = `${padding}${pairs}`;
    return `${header}
  ${message}
${pairsBlock}`;
  }
};
__name(_UnknownEnumValueError, "UnknownEnumValueError");
var UnknownEnumValueError = _UnknownEnumValueError;

// src/validators/NativeEnumValidator.ts
var _NativeEnumValidator = class _NativeEnumValidator extends BaseValidator {
  constructor(enumShape) {
    super();
    this.hasNumericElements = false;
    this.enumMapping = /* @__PURE__ */ new Map();
    this.enumShape = enumShape;
    this.enumKeys = Object.keys(enumShape).filter((key) => {
      return typeof enumShape[enumShape[key]] !== "number";
    });
    for (const key of this.enumKeys) {
      const enumValue = enumShape[key];
      this.enumMapping.set(key, enumValue);
      this.enumMapping.set(enumValue, enumValue);
      if (typeof enumValue === "number") {
        this.hasNumericElements = true;
        this.enumMapping.set(`${enumValue}`, enumValue);
      }
    }
  }
  handle(value) {
    const typeOfValue = typeof value;
    if (typeOfValue === "number") {
      if (!this.hasNumericElements) {
        return Result.err(new ValidationError("s.nativeEnum(T)", "Expected the value to be a string", value));
      }
    } else if (typeOfValue !== "string") {
      return Result.err(new ValidationError("s.nativeEnum(T)", "Expected the value to be a string or number", value));
    }
    const casted = value;
    const possibleEnumValue = this.enumMapping.get(casted);
    return typeof possibleEnumValue === "undefined" ? Result.err(new UnknownEnumValueError(casted, this.enumKeys, this.enumMapping)) : Result.ok(possibleEnumValue);
  }
  clone() {
    return Reflect.construct(this.constructor, [this.enumShape]);
  }
};
__name(_NativeEnumValidator, "NativeEnumValidator");
var NativeEnumValidator = _NativeEnumValidator;

// src/constraints/TypedArrayLengthConstraints.ts
function typedArrayByteLengthComparator(comparator, name, expected, length) {
  return {
    run(input) {
      return comparator(input.byteLength, length) ? Result.ok(input) : Result.err(new ExpectedConstraintError(name, "Invalid Typed Array byte length", input, expected));
    }
  };
}
__name(typedArrayByteLengthComparator, "typedArrayByteLengthComparator");
function typedArrayByteLengthLessThan(value) {
  const expected = `expected.byteLength < ${value}`;
  return typedArrayByteLengthComparator(lessThan, "s.typedArray(T).byteLengthLessThan", expected, value);
}
__name(typedArrayByteLengthLessThan, "typedArrayByteLengthLessThan");
function typedArrayByteLengthLessThanOrEqual(value) {
  const expected = `expected.byteLength <= ${value}`;
  return typedArrayByteLengthComparator(lessThanOrEqual, "s.typedArray(T).byteLengthLessThanOrEqual", expected, value);
}
__name(typedArrayByteLengthLessThanOrEqual, "typedArrayByteLengthLessThanOrEqual");
function typedArrayByteLengthGreaterThan(value) {
  const expected = `expected.byteLength > ${value}`;
  return typedArrayByteLengthComparator(greaterThan, "s.typedArray(T).byteLengthGreaterThan", expected, value);
}
__name(typedArrayByteLengthGreaterThan, "typedArrayByteLengthGreaterThan");
function typedArrayByteLengthGreaterThanOrEqual(value) {
  const expected = `expected.byteLength >= ${value}`;
  return typedArrayByteLengthComparator(greaterThanOrEqual, "s.typedArray(T).byteLengthGreaterThanOrEqual", expected, value);
}
__name(typedArrayByteLengthGreaterThanOrEqual, "typedArrayByteLengthGreaterThanOrEqual");
function typedArrayByteLengthEqual(value) {
  const expected = `expected.byteLength === ${value}`;
  return typedArrayByteLengthComparator(equal, "s.typedArray(T).byteLengthEqual", expected, value);
}
__name(typedArrayByteLengthEqual, "typedArrayByteLengthEqual");
function typedArrayByteLengthNotEqual(value) {
  const expected = `expected.byteLength !== ${value}`;
  return typedArrayByteLengthComparator(notEqual, "s.typedArray(T).byteLengthNotEqual", expected, value);
}
__name(typedArrayByteLengthNotEqual, "typedArrayByteLengthNotEqual");
function typedArrayByteLengthRange(start, endBefore) {
  const expected = `expected.byteLength >= ${start} && expected.byteLength < ${endBefore}`;
  return {
    run(input) {
      return input.byteLength >= start && input.byteLength < endBefore ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.typedArray(T).byteLengthRange", "Invalid Typed Array byte length", input, expected));
    }
  };
}
__name(typedArrayByteLengthRange, "typedArrayByteLengthRange");
function typedArrayByteLengthRangeInclusive(start, end) {
  const expected = `expected.byteLength >= ${start} && expected.byteLength <= ${end}`;
  return {
    run(input) {
      return input.byteLength >= start && input.byteLength <= end ? Result.ok(input) : Result.err(
        new ExpectedConstraintError("s.typedArray(T).byteLengthRangeInclusive", "Invalid Typed Array byte length", input, expected)
      );
    }
  };
}
__name(typedArrayByteLengthRangeInclusive, "typedArrayByteLengthRangeInclusive");
function typedArrayByteLengthRangeExclusive(startAfter, endBefore) {
  const expected = `expected.byteLength > ${startAfter} && expected.byteLength < ${endBefore}`;
  return {
    run(input) {
      return input.byteLength > startAfter && input.byteLength < endBefore ? Result.ok(input) : Result.err(
        new ExpectedConstraintError("s.typedArray(T).byteLengthRangeExclusive", "Invalid Typed Array byte length", input, expected)
      );
    }
  };
}
__name(typedArrayByteLengthRangeExclusive, "typedArrayByteLengthRangeExclusive");
function typedArrayLengthComparator(comparator, name, expected, length) {
  return {
    run(input) {
      return comparator(input.length, length) ? Result.ok(input) : Result.err(new ExpectedConstraintError(name, "Invalid Typed Array length", input, expected));
    }
  };
}
__name(typedArrayLengthComparator, "typedArrayLengthComparator");
function typedArrayLengthLessThan(value) {
  const expected = `expected.length < ${value}`;
  return typedArrayLengthComparator(lessThan, "s.typedArray(T).lengthLessThan", expected, value);
}
__name(typedArrayLengthLessThan, "typedArrayLengthLessThan");
function typedArrayLengthLessThanOrEqual(value) {
  const expected = `expected.length <= ${value}`;
  return typedArrayLengthComparator(lessThanOrEqual, "s.typedArray(T).lengthLessThanOrEqual", expected, value);
}
__name(typedArrayLengthLessThanOrEqual, "typedArrayLengthLessThanOrEqual");
function typedArrayLengthGreaterThan(value) {
  const expected = `expected.length > ${value}`;
  return typedArrayLengthComparator(greaterThan, "s.typedArray(T).lengthGreaterThan", expected, value);
}
__name(typedArrayLengthGreaterThan, "typedArrayLengthGreaterThan");
function typedArrayLengthGreaterThanOrEqual(value) {
  const expected = `expected.length >= ${value}`;
  return typedArrayLengthComparator(greaterThanOrEqual, "s.typedArray(T).lengthGreaterThanOrEqual", expected, value);
}
__name(typedArrayLengthGreaterThanOrEqual, "typedArrayLengthGreaterThanOrEqual");
function typedArrayLengthEqual(value) {
  const expected = `expected.length === ${value}`;
  return typedArrayLengthComparator(equal, "s.typedArray(T).lengthEqual", expected, value);
}
__name(typedArrayLengthEqual, "typedArrayLengthEqual");
function typedArrayLengthNotEqual(value) {
  const expected = `expected.length !== ${value}`;
  return typedArrayLengthComparator(notEqual, "s.typedArray(T).lengthNotEqual", expected, value);
}
__name(typedArrayLengthNotEqual, "typedArrayLengthNotEqual");
function typedArrayLengthRange(start, endBefore) {
  const expected = `expected.length >= ${start} && expected.length < ${endBefore}`;
  return {
    run(input) {
      return input.length >= start && input.length < endBefore ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.typedArray(T).lengthRange", "Invalid Typed Array length", input, expected));
    }
  };
}
__name(typedArrayLengthRange, "typedArrayLengthRange");
function typedArrayLengthRangeInclusive(start, end) {
  const expected = `expected.length >= ${start} && expected.length <= ${end}`;
  return {
    run(input) {
      return input.length >= start && input.length <= end ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.typedArray(T).lengthRangeInclusive", "Invalid Typed Array length", input, expected));
    }
  };
}
__name(typedArrayLengthRangeInclusive, "typedArrayLengthRangeInclusive");
function typedArrayLengthRangeExclusive(startAfter, endBefore) {
  const expected = `expected.length > ${startAfter} && expected.length < ${endBefore}`;
  return {
    run(input) {
      return input.length > startAfter && input.length < endBefore ? Result.ok(input) : Result.err(new ExpectedConstraintError("s.typedArray(T).lengthRangeExclusive", "Invalid Typed Array length", input, expected));
    }
  };
}
__name(typedArrayLengthRangeExclusive, "typedArrayLengthRangeExclusive");

// src/constraints/util/common/vowels.ts
var vowels = ["a", "e", "i", "o", "u"];
var aOrAn = /* @__PURE__ */ __name((word) => {
  return `${vowels.includes(word[0].toLowerCase()) ? "an" : "a"} ${word}`;
}, "aOrAn");

// src/constraints/util/typedArray.ts
var TypedArrays = {
  Int8Array: (x2) => x2 instanceof Int8Array,
  Uint8Array: (x2) => x2 instanceof Uint8Array,
  Uint8ClampedArray: (x2) => x2 instanceof Uint8ClampedArray,
  Int16Array: (x2) => x2 instanceof Int16Array,
  Uint16Array: (x2) => x2 instanceof Uint16Array,
  Int32Array: (x2) => x2 instanceof Int32Array,
  Uint32Array: (x2) => x2 instanceof Uint32Array,
  Float32Array: (x2) => x2 instanceof Float32Array,
  Float64Array: (x2) => x2 instanceof Float64Array,
  BigInt64Array: (x2) => x2 instanceof BigInt64Array,
  BigUint64Array: (x2) => x2 instanceof BigUint64Array,
  TypedArray: (x2) => ArrayBuffer.isView(x2) && !(x2 instanceof DataView)
};

// src/validators/TypedArrayValidator.ts
var _TypedArrayValidator = class _TypedArrayValidator extends BaseValidator {
  constructor(type, constraints = []) {
    super(constraints);
    this.type = type;
  }
  byteLengthLessThan(length) {
    return this.addConstraint(typedArrayByteLengthLessThan(length));
  }
  byteLengthLessThanOrEqual(length) {
    return this.addConstraint(typedArrayByteLengthLessThanOrEqual(length));
  }
  byteLengthGreaterThan(length) {
    return this.addConstraint(typedArrayByteLengthGreaterThan(length));
  }
  byteLengthGreaterThanOrEqual(length) {
    return this.addConstraint(typedArrayByteLengthGreaterThanOrEqual(length));
  }
  byteLengthEqual(length) {
    return this.addConstraint(typedArrayByteLengthEqual(length));
  }
  byteLengthNotEqual(length) {
    return this.addConstraint(typedArrayByteLengthNotEqual(length));
  }
  byteLengthRange(start, endBefore) {
    return this.addConstraint(typedArrayByteLengthRange(start, endBefore));
  }
  byteLengthRangeInclusive(startAt, endAt) {
    return this.addConstraint(typedArrayByteLengthRangeInclusive(startAt, endAt));
  }
  byteLengthRangeExclusive(startAfter, endBefore) {
    return this.addConstraint(typedArrayByteLengthRangeExclusive(startAfter, endBefore));
  }
  lengthLessThan(length) {
    return this.addConstraint(typedArrayLengthLessThan(length));
  }
  lengthLessThanOrEqual(length) {
    return this.addConstraint(typedArrayLengthLessThanOrEqual(length));
  }
  lengthGreaterThan(length) {
    return this.addConstraint(typedArrayLengthGreaterThan(length));
  }
  lengthGreaterThanOrEqual(length) {
    return this.addConstraint(typedArrayLengthGreaterThanOrEqual(length));
  }
  lengthEqual(length) {
    return this.addConstraint(typedArrayLengthEqual(length));
  }
  lengthNotEqual(length) {
    return this.addConstraint(typedArrayLengthNotEqual(length));
  }
  lengthRange(start, endBefore) {
    return this.addConstraint(typedArrayLengthRange(start, endBefore));
  }
  lengthRangeInclusive(startAt, endAt) {
    return this.addConstraint(typedArrayLengthRangeInclusive(startAt, endAt));
  }
  lengthRangeExclusive(startAfter, endBefore) {
    return this.addConstraint(typedArrayLengthRangeExclusive(startAfter, endBefore));
  }
  clone() {
    return Reflect.construct(this.constructor, [this.type, this.constraints]);
  }
  handle(value) {
    return TypedArrays[this.type](value) ? Result.ok(value) : Result.err(new ValidationError("s.typedArray", `Expected ${aOrAn(this.type)}`, value));
  }
};
__name(_TypedArrayValidator, "TypedArrayValidator");
var TypedArrayValidator = _TypedArrayValidator;

// src/lib/Shapes.ts
var _Shapes = class _Shapes {
  get string() {
    return new StringValidator();
  }
  get number() {
    return new NumberValidator();
  }
  get bigint() {
    return new BigIntValidator();
  }
  get boolean() {
    return new BooleanValidator();
  }
  get date() {
    return new DateValidator();
  }
  object(shape) {
    return new ObjectValidator(shape);
  }
  get undefined() {
    return this.literal(void 0);
  }
  get null() {
    return this.literal(null);
  }
  get nullish() {
    return new NullishValidator();
  }
  get any() {
    return new PassthroughValidator();
  }
  get unknown() {
    return new PassthroughValidator();
  }
  get never() {
    return new NeverValidator();
  }
  enum(...values) {
    return this.union(...values.map((value) => this.literal(value)));
  }
  nativeEnum(enumShape) {
    return new NativeEnumValidator(enumShape);
  }
  literal(value) {
    if (value instanceof Date)
      return this.date.equal(value);
    return new LiteralValidator(value);
  }
  instance(expected) {
    return new InstanceValidator(expected);
  }
  union(...validators) {
    return new UnionValidator(validators);
  }
  array(validator) {
    return new ArrayValidator(validator);
  }
  typedArray(type = "TypedArray") {
    return new TypedArrayValidator(type);
  }
  get int8Array() {
    return this.typedArray("Int8Array");
  }
  get uint8Array() {
    return this.typedArray("Uint8Array");
  }
  get uint8ClampedArray() {
    return this.typedArray("Uint8ClampedArray");
  }
  get int16Array() {
    return this.typedArray("Int16Array");
  }
  get uint16Array() {
    return this.typedArray("Uint16Array");
  }
  get int32Array() {
    return this.typedArray("Int32Array");
  }
  get uint32Array() {
    return this.typedArray("Uint32Array");
  }
  get float32Array() {
    return this.typedArray("Float32Array");
  }
  get float64Array() {
    return this.typedArray("Float64Array");
  }
  get bigInt64Array() {
    return this.typedArray("BigInt64Array");
  }
  get bigUint64Array() {
    return this.typedArray("BigUint64Array");
  }
  tuple(validators) {
    return new TupleValidator(validators);
  }
  set(validator) {
    return new SetValidator(validator);
  }
  record(validator) {
    return new RecordValidator(validator);
  }
  map(keyValidator, valueValidator) {
    return new MapValidator(keyValidator, valueValidator);
  }
  lazy(validator) {
    return new LazyValidator(validator);
  }
};
__name(_Shapes, "Shapes");
var Shapes = _Shapes;

// src/index.ts
var s3 = new Shapes();
/**
 * @license MIT
 * @copyright 2020 Colin McDonnell
 * @see https://github.com/colinhacks/zod/blob/master/LICENSE
 */

exports.BaseError = BaseError;
exports.CombinedError = CombinedError;
exports.CombinedPropertyError = CombinedPropertyError;
exports.ExpectedConstraintError = ExpectedConstraintError;
exports.ExpectedValidationError = ExpectedValidationError;
exports.MissingPropertyError = MissingPropertyError;
exports.MultiplePossibilitiesConstraintError = MultiplePossibilitiesConstraintError;
exports.Result = Result;
exports.UnknownEnumValueError = UnknownEnumValueError;
exports.UnknownPropertyError = UnknownPropertyError;
exports.ValidationError = ValidationError;
exports.customInspectSymbol = customInspectSymbol;
exports.customInspectSymbolStackLess = customInspectSymbolStackLess;
exports.getGlobalValidationEnabled = getGlobalValidationEnabled;
exports.s = s3;
exports.setGlobalValidationEnabled = setGlobalValidationEnabled;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map