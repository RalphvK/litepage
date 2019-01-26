/*
 * anime.js v3.0.0
 * (c) 2019 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

!function (n, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : n.anime = e() }(this, function () { "use strict"; var n = { update: null, begin: null, loopBegin: null, changeBegin: null, change: null, changeComplete: null, loopComplete: null, complete: null, loop: 1, direction: "normal", autoplay: !0, timelineOffset: 0 }, e = { duration: 1e3, delay: 0, endDelay: 0, easing: "easeOutElastic(1, .5)", round: 0 }, r = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective"], t = { CSS: {}, springs: {} }; function a(n, e, r) { return Math.min(Math.max(n, e), r) } function i(n, e) { return n.indexOf(e) > -1 } function o(n, e) { return n.apply(null, e) } var u = { arr: function (n) { return Array.isArray(n) }, obj: function (n) { return i(Object.prototype.toString.call(n), "Object") }, pth: function (n) { return u.obj(n) && n.hasOwnProperty("totalLength") }, svg: function (n) { return n instanceof SVGElement }, inp: function (n) { return n instanceof HTMLInputElement }, dom: function (n) { return n.nodeType || u.svg(n) }, str: function (n) { return "string" == typeof n }, fnc: function (n) { return "function" == typeof n }, und: function (n) { return void 0 === n }, hex: function (n) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n) }, rgb: function (n) { return /^rgb/.test(n) }, hsl: function (n) { return /^hsl/.test(n) }, col: function (n) { return u.hex(n) || u.rgb(n) || u.hsl(n) }, key: function (r) { return !n.hasOwnProperty(r) && !e.hasOwnProperty(r) && "targets" !== r && "keyframes" !== r } }; function s(n) { var e = /\(([^)]+)\)/.exec(n); return e ? e[1].split(",").map(function (n) { return parseFloat(n) }) : [] } function c(n, e) { var r = s(n), i = a(u.und(r[0]) ? 1 : r[0], .1, 100), o = a(u.und(r[1]) ? 100 : r[1], .1, 100), c = a(u.und(r[2]) ? 10 : r[2], .1, 100), f = a(u.und(r[3]) ? 0 : r[3], .1, 100), l = Math.sqrt(o / i), d = c / (2 * Math.sqrt(o * i)), p = d < 1 ? l * Math.sqrt(1 - d * d) : 0, v = 1, h = d < 1 ? (d * l - f) / p : -f + l; function g(n) { var r = e ? e * n / 1e3 : n; return r = d < 1 ? Math.exp(-r * d * l) * (v * Math.cos(p * r) + h * Math.sin(p * r)) : (v + h * r) * Math.exp(-r * l), 0 === n || 1 === n ? n : 1 - r } return e ? g : function () { var e = t.springs[n]; if (e) return e; for (var r = 0, a = 0; ;)if (1 === g(r += 1 / 6)) { if (++a >= 16) break } else a = 0; var i = r * (1 / 6) * 1e3; return t.springs[n] = i, i } } function f(n, e) { void 0 === n && (n = 1), void 0 === e && (e = .5); var r = a(n, 1, 10), t = a(e, .1, 2); return function (n) { return 0 === n || 1 === n ? n : -r * Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1 - t / (2 * Math.PI) * Math.asin(1 / r)) * (2 * Math.PI) / t) } } function l(n) { return void 0 === n && (n = 10), function (e) { return Math.round(e * n) * (1 / n) } } var d = function () { var n = 11, e = 1 / (n - 1); function r(n, e) { return 1 - 3 * e + 3 * n } function t(n, e) { return 3 * e - 6 * n } function a(n) { return 3 * n } function i(n, e, i) { return ((r(e, i) * n + t(e, i)) * n + a(e)) * n } function o(n, e, i) { return 3 * r(e, i) * n * n + 2 * t(e, i) * n + a(e) } return function (r, t, a, u) { if (0 <= r && r <= 1 && 0 <= a && a <= 1) { var s = new Float32Array(n); if (r !== t || a !== u) for (var c = 0; c < n; ++c)s[c] = i(c * e, r, a); return function (n) { return r === t && a === u ? n : 0 === n || 1 === n ? n : i(f(n), t, u) } } function f(t) { for (var u = 0, c = 1, f = n - 1; c !== f && s[c] <= t; ++c)u += e; var l = u + (t - s[--c]) / (s[c + 1] - s[c]) * e, d = o(l, r, a); return d >= .001 ? function (n, e, r, t) { for (var a = 0; a < 4; ++a) { var u = o(e, r, t); if (0 === u) return e; e -= (i(e, r, t) - n) / u } return e }(t, l, r, a) : 0 === d ? l : function (n, e, r, t, a) { for (var o, u, s = 0; (o = i(u = e + (r - e) / 2, t, a) - n) > 0 ? r = u : e = u, Math.abs(o) > 1e-7 && ++s < 10;); return u }(t, u, u + e, r, a) } } }(), p = function () { var n = ["Quad", "Cubic", "Quart", "Quint", "Sine", "Expo", "Circ", "Back", "Elastic"], e = { In: [[.55, .085, .68, .53], [.55, .055, .675, .19], [.895, .03, .685, .22], [.755, .05, .855, .06], [.47, 0, .745, .715], [.95, .05, .795, .035], [.6, .04, .98, .335], [.6, -.28, .735, .045], f], Out: [[.25, .46, .45, .94], [.215, .61, .355, 1], [.165, .84, .44, 1], [.23, 1, .32, 1], [.39, .575, .565, 1], [.19, 1, .22, 1], [.075, .82, .165, 1], [.175, .885, .32, 1.275], function (n, e) { return function (r) { return 1 - f(n, e)(1 - r) } }], InOut: [[.455, .03, .515, .955], [.645, .045, .355, 1], [.77, 0, .175, 1], [.86, 0, .07, 1], [.445, .05, .55, .95], [1, 0, 0, 1], [.785, .135, .15, .86], [.68, -.55, .265, 1.55], function (n, e) { return function (r) { return r < .5 ? f(n, e)(2 * r) / 2 : 1 - f(n, e)(-2 * r + 2) / 2 } }] }, r = { linear: [.25, .25, .75, .75] }, t = function (t) { e[t].forEach(function (e, a) { r["ease" + t + n[a]] = e }) }; for (var a in e) t(a); return r }(); function v(n, e) { if (u.fnc(n)) return n; var r = n.split("(")[0], t = p[r], a = s(n); switch (r) { case "spring": return c(n, e); case "cubicBezier": return o(d, a); case "steps": return o(l, a); default: return u.fnc(t) ? o(t, a) : o(d, t) } } function h(n) { try { return document.querySelectorAll(n) } catch (n) { return } } function g(n, e) { for (var r = n.length, t = arguments.length >= 2 ? arguments[1] : void 0, a = [], i = 0; i < r; i++)if (i in n) { var o = n[i]; e.call(t, o, i, n) && a.push(o) } return a } function m(n) { return n.reduce(function (n, e) { return n.concat(u.arr(e) ? m(e) : e) }, []) } function y(n) { return u.arr(n) ? n : (u.str(n) && (n = h(n) || n), n instanceof NodeList || n instanceof HTMLCollection ? [].slice.call(n) : [n]) } function b(n, e) { return n.some(function (n) { return n === e }) } function x(n) { var e = {}; for (var r in n) e[r] = n[r]; return e } function M(n, e) { var r = x(n); for (var t in n) r[t] = e.hasOwnProperty(t) ? e[t] : n[t]; return r } function w(n, e) { var r = x(n); for (var t in e) r[t] = u.und(n[t]) ? e[t] : n[t]; return r } function k(n) { return u.rgb(n) ? (r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e = n)) ? "rgba(" + r[1] + ",1)" : e : u.hex(n) ? (t = n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (n, e, r, t) { return e + e + r + r + t + t }), a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t), "rgba(" + parseInt(a[1], 16) + "," + parseInt(a[2], 16) + "," + parseInt(a[3], 16) + ",1)") : u.hsl(n) ? function (n) { var e, r, t, a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n), i = parseInt(a[1], 10) / 360, o = parseInt(a[2], 10) / 100, u = parseInt(a[3], 10) / 100, s = a[4] || 1; function c(n, e, r) { return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + 6 * (e - n) * r : r < .5 ? e : r < 2 / 3 ? n + (e - n) * (2 / 3 - r) * 6 : n } if (0 == o) e = r = t = u; else { var f = u < .5 ? u * (1 + o) : u + o - u * o, l = 2 * u - f; e = c(l, f, i + 1 / 3), r = c(l, f, i), t = c(l, f, i - 1 / 3) } return "rgba(" + 255 * e + "," + 255 * r + "," + 255 * t + "," + s + ")" }(n) : void 0; var e, r, t, a } function C(n) { var e = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n); if (e) return e[2] } function O(n, e) { return u.fnc(n) ? n(e.target, e.id, e.total) : n } function P(n, e) { return n.getAttribute(e) } function I(n, e, r) { if (b([r, "deg", "rad", "turn"], C(e))) return e; var a = t.CSS[e + r]; if (!u.und(a)) return a; var i = document.createElement(n.tagName), o = n.parentNode && n.parentNode !== document ? n.parentNode : document.body; o.appendChild(i), i.style.position = "absolute", i.style.width = 100 + r; var s = 100 / i.offsetWidth; o.removeChild(i); var c = s * parseFloat(e); return t.CSS[e + r] = c, c } function B(n, e, r) { if (e in n.style) { var t = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), a = n.style[e] || getComputedStyle(n).getPropertyValue(t) || "0"; return r ? I(n, a, r) : a } } function D(n, e) { return u.dom(n) && !u.inp(n) && (P(n, e) || u.svg(n) && n[e]) ? "attribute" : u.dom(n) && b(r, e) ? "transform" : u.dom(n) && "transform" !== e && B(n, e) ? "css" : null != n[e] ? "object" : void 0 } function T(n) { if (u.dom(n)) { for (var e, r = n.style.transform || "", t = /(\w+)\(([^)]*)\)/g, a = new Map; e = t.exec(r);)a.set(e[1], e[2]); return a } } function F(n, e, r, t) { var a, o = i(e, "scale") ? 1 : 0 + (i(a = e, "translate") || "perspective" === a ? "px" : i(a, "rotate") || i(a, "skew") ? "deg" : void 0), u = T(n).get(e) || o; return r && (r.transforms.list.set(e, u), r.transforms.last = e), t ? I(n, u, t) : u } function N(n, e, r, t) { switch (D(n, e)) { case "transform": return F(n, e, t, r); case "css": return B(n, e, r); case "attribute": return P(n, e); default: return n[e] || 0 } } function A(n, e) { var r = /^(\*=|\+=|-=)/.exec(n); if (!r) return n; var t = C(n) || 0, a = parseFloat(e), i = parseFloat(n.replace(r[0], "")); switch (r[0][0]) { case "+": return a + i + t; case "-": return a - i + t; case "*": return a * i + t } } function E(n, e) { if (u.col(n)) return k(n); var r = C(n), t = r ? n.substr(0, n.length - r.length) : n; return e && !/\s/g.test(n) ? t + e : t } function L(n, e) { return Math.sqrt(Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2)) } function S(n) { for (var e, r = n.points, t = 0, a = 0; a < r.numberOfItems; a++) { var i = r.getItem(a); a > 0 && (t += L(e, i)), e = i } return t } function j(n) { if (n.getTotalLength) return n.getTotalLength(); switch (n.tagName.toLowerCase()) { case "circle": return i = n, 2 * Math.PI * P(i, "r"); case "rect": return 2 * P(a = n, "width") + 2 * P(a, "height"); case "line": return L({ x: P(t = n, "x1"), y: P(t, "y1") }, { x: P(t, "x2"), y: P(t, "y2") }); case "polyline": return S(n); case "polygon": return r = (e = n).points, S(e) + L(r.getItem(r.numberOfItems - 1), r.getItem(0)) }var e, r, t, a, i } function q(n, e) { var r = e || {}, t = r.el || function (n) { for (var e = n.parentNode; u.svg(e) && (e = e.parentNode, u.svg(e.parentNode));); return e }(n), a = t.getBoundingClientRect(), i = P(t, "viewBox"), o = a.width, s = a.height, c = r.viewBox || (i ? i.split(" ") : [0, 0, o, s]); return { el: t, viewBox: c, x: c[0] / 1, y: c[1] / 1, w: o / c[2], h: s / c[3] } } function $(n, e) { function r(r) { void 0 === r && (r = 0); var t = e + r >= 1 ? e + r : 0; return n.el.getPointAtLength(t) } var t = q(n.el, n.svg), a = r(), i = r(-1), o = r(1); switch (n.property) { case "x": return (a.x - t.x) * t.w; case "y": return (a.y - t.y) * t.h; case "angle": return 180 * Math.atan2(o.y - i.y, o.x - i.x) / Math.PI } } function X(n, e) { var r = /-?\d*\.?\d+/g, t = E(u.pth(n) ? n.totalLength : n, e) + ""; return { original: t, numbers: t.match(r) ? t.match(r).map(Number) : [0], strings: u.str(n) || e ? t.split(r) : [] } } function Y(n) { return g(n ? m(u.arr(n) ? n.map(y) : y(n)) : [], function (n, e, r) { return r.indexOf(n) === e }) } function Z(n) { var e = Y(n); return e.map(function (n, r) { return { target: n, id: r, total: e.length, transforms: { list: T(n) } } }) } function Q(n, e) { var r = x(e); if (/^spring/.test(r.easing) && (r.duration = c(r.easing)), u.arr(n)) { var t = n.length; 2 === t && !u.obj(n[0]) ? n = { value: n } : u.fnc(e.duration) || (r.duration = e.duration / t) } var a = u.arr(n) ? n : [n]; return a.map(function (n, r) { var t = u.obj(n) && !u.pth(n) ? n : { value: n }; return u.und(t.delay) && (t.delay = r ? 0 : e.delay), u.und(t.endDelay) && (t.endDelay = r === a.length - 1 ? e.endDelay : 0), t }).map(function (n) { return w(n, r) }) } function V(n, e) { var r = [], t = e.keyframes; for (var a in t && (e = w(function (n) { for (var e = g(m(n.map(function (n) { return Object.keys(n) })), function (n) { return u.key(n) }).reduce(function (n, e) { return n.indexOf(e) < 0 && n.push(e), n }, []), r = {}, t = function (t) { var a = e[t]; r[a] = n.map(function (n) { var e = {}; for (var r in n) u.key(r) ? r == a && (e.value = n[r]) : e[r] = n[r]; return e }) }, a = 0; a < e.length; a++)t(a); return r }(t), e)), e) u.key(a) && r.push({ name: a, tweens: Q(e[a], n) }); return r } function z(n, e) { var r; return n.tweens.map(function (t) { var a = function (n, e) { var r = {}; for (var t in n) { var a = O(n[t], e); u.arr(a) && 1 === (a = a.map(function (n) { return O(n, e) })).length && (a = a[0]), r[t] = a } return r.duration = parseFloat(r.duration), r.delay = parseFloat(r.delay), r }(t, e), i = a.value, o = u.arr(i) ? i[1] : i, s = C(o), c = N(e.target, n.name, s, e), f = r ? r.to.original : c, l = u.arr(i) ? i[0] : f, d = C(l) || C(c), p = s || d; return u.und(o) && (o = f), a.from = X(l, p), a.to = X(A(o, l), p), a.start = r ? r.end : 0, a.end = a.start + a.delay + a.duration + a.endDelay, a.easing = v(a.easing, a.duration), a.isPath = u.pth(i), a.isColor = u.col(a.from.original), a.isColor && (a.round = 1), r = a, a }) } var H = { css: function (n, e, r) { return n.style[e] = r }, attribute: function (n, e, r) { return n.setAttribute(e, r) }, object: function (n, e, r) { return n[e] = r }, transform: function (n, e, r, t, a) { if (t.list.set(e, r), e === t.last || a) { var i = ""; t.list.forEach(function (n, e) { i += e + "(" + n + ") " }), n.style.transform = i } } }; function G(n, e) { Z(n).forEach(function (n) { for (var r in e) { var t = O(e[r], n), a = n.target, i = C(t), o = N(a, r, i, n), u = A(E(t, i || C(o)), o), s = D(a, r); H[s](a, r, u, n.transforms, !0) } }) } function R(n, e) { return g(m(n.map(function (n) { return e.map(function (e) { return function (n, e) { var r = D(n.target, e.name); if (r) { var t = z(e, n), a = t[t.length - 1]; return { type: r, property: e.name, animatable: n, tweens: t, duration: a.end, delay: t[0].delay, endDelay: a.endDelay } } }(n, e) }) })), function (n) { return !u.und(n) }) } function W(n, e) { var r = n.length, t = function (n) { return n.timelineOffset ? n.timelineOffset : 0 }, a = {}; return a.duration = r ? Math.max.apply(Math, n.map(function (n) { return t(n) + n.duration })) : e.duration, a.delay = r ? Math.min.apply(Math, n.map(function (n) { return t(n) + n.delay })) : e.delay, a.endDelay = r ? a.duration - Math.max.apply(Math, n.map(function (n) { return t(n) + n.duration - n.endDelay })) : e.endDelay, a } var J = 0; var K, U = [], _ = [], nn = function () { function n() { K = requestAnimationFrame(e) } function e(e) { var r = U.length; if (r) { for (var t = 0; t < r;) { var a = U[t]; if (a.paused) { var i = U.indexOf(a); i > -1 && (U.splice(i, 1), r = U.length) } else a.tick(e); t++ } n() } else K = cancelAnimationFrame(K) } return n }(); function en(r) { void 0 === r && (r = {}); var t, i = 0, o = 0, u = 0, s = 0, c = null; function f() { return window.Promise && new Promise(function (n) { return c = n }) } var l, d, p, v, h, m, y, b, x = f(), k = (d = M(n, l = r), p = M(e, l), v = V(p, l), h = Z(l.targets), m = R(h, v), y = W(m, p), b = J, J++ , w(d, { id: b, children: [], animatables: h, animations: m, duration: y.duration, delay: y.delay, endDelay: y.endDelay })); function C() { k.reversed = !k.reversed, t.forEach(function (n) { return n.reversed = k.reversed }) } function O(n) { return k.reversed ? k.duration - n : n } function P() { i = 0, o = O(k.currentTime) * (1 / en.speed) } function I(n, e) { e && e.seek(n - e.timelineOffset) } function B(n) { for (var e = 0, r = k.animations, t = r.length; e < t;) { var i = r[e], o = i.animatable, u = i.tweens, s = u.length - 1, c = u[s]; s && (c = g(u, function (e) { return n < e.end })[0] || c); for (var f = a(n - c.start - c.delay, 0, c.duration) / c.duration, l = isNaN(f) ? 1 : c.easing(f), d = c.to.strings, p = c.round, v = [], h = c.to.numbers.length, m = void 0, y = 0; y < h; y++) { var b = void 0, x = c.to.numbers[y], M = c.from.numbers[y] || 0; b = c.isPath ? $(c.value, l * x) : M + l * (x - M), p && (c.isColor && y > 2 || (b = Math.round(b * p) / p)), v.push(b) } var w = d.length; if (w) { m = d[0]; for (var C = 0; C < w; C++) { d[C]; var O = d[C + 1], P = v[C]; isNaN(P) || (m += O ? P + O : P + " ") } } else m = v[0]; H[i.type](o.target, i.property, m, o.transforms), i.currentValue = m, e++ } } function D(n) { k[n] && !k.passThrough && k[n](k) } function T(n) { var e = k.duration, r = k.delay, l = e - k.endDelay, d = O(n); k.progress = a(d / e * 100, 0, 100), k.reversePlayback = d < k.currentTime, t && function (n) { if (k.reversePlayback) for (var e = s; e--;)I(n, t[e]); else for (var r = 0; r < s; r++)I(n, t[r]) }(d), !k.began && k.currentTime > 0 && (k.began = !0, D("begin"), D("loopBegin")), d <= r && 0 !== k.currentTime && B(0), (d >= l && k.currentTime !== e || !e) && B(e), d > r && d < l ? (k.changeBegan || (k.changeBegan = !0, k.changeCompleted = !1, D("changeBegin")), D("change"), B(d)) : k.changeBegan && (k.changeCompleted = !0, k.changeBegan = !1, D("changeComplete")), k.currentTime = a(d, 0, e), k.began && D("update"), n >= e && (o = 0, k.remaining && !0 !== k.remaining && k.remaining-- , k.remaining ? (i = u, D("loopComplete"), D("loopBegin"), "alternate" === k.direction && C()) : (k.paused = !0, k.completed || (k.completed = !0, D("loopComplete"), D("complete"), "Promise" in window && (c(), x = f())))) } return k.reset = function () { var n = k.direction; k.passThrough = !1, k.currentTime = 0, k.progress = 0, k.paused = !0, k.began = !1, k.changeBegan = !1, k.completed = !1, k.changeCompleted = !1, k.reversePlayback = !1, k.reversed = "reverse" === n, k.remaining = k.loop, t = k.children; for (var e = s = t.length; e--;)k.children[e].reset(); (k.reversed && !0 !== k.loop || "alternate" === n && 1 === k.loop) && k.remaining++ , B(0) }, k.set = function (n, e) { return G(n, e), k }, k.tick = function (n) { u = n, i || (i = u), T((u + (o - i)) * en.speed) }, k.seek = function (n) { T(O(n)) }, k.pause = function () { k.paused = !0, P() }, k.play = function () { k.paused && (k.paused = !1, U.push(k), P(), K || nn()) }, k.reverse = function () { C(), P() }, k.restart = function () { k.reset(), k.play() }, k.finished = x, k.reset(), k.autoplay && k.play(), k } function rn(n, e) { for (var r = e.length; r--;)b(n, e[r].animatable.target) && e.splice(r, 1) } return document.addEventListener("visibilitychange", function () { document.hidden ? (U.forEach(function (n) { return n.pause() }), _ = U.slice(0), U = []) : _.forEach(function (n) { return n.play() }) }), en.version = "3.0.0", en.speed = 1, en.running = U, en.remove = function (n) { for (var e = Y(n), r = U.length; r--;) { var t = U[r], a = t.animations, i = t.children; rn(e, a); for (var o = i.length; o--;) { var u = i[o], s = u.animations; rn(e, s), s.length || u.children.length || i.splice(o, 1) } a.length || i.length || t.pause() } }, en.get = N, en.set = G, en.convertPx = I, en.path = function (n, e) { var r = u.str(n) ? h(n)[0] : n, t = e || 100; return function (n) { return { property: n, el: r, svg: q(r), totalLength: j(r) * (t / 100) } } }, en.setDashoffset = function (n) { var e = j(n); return n.setAttribute("stroke-dasharray", e), e }, en.stagger = function (n, e) { void 0 === e && (e = {}); var r = e.direction || "normal", t = e.easing ? v(e.easing) : null, a = e.grid, i = e.axis, o = e.from || 0, s = "first" === o, c = "center" === o, f = "last" === o, l = u.arr(n), d = l ? parseFloat(n[0]) : parseFloat(n), p = l ? parseFloat(n[1]) : 0, h = C(l ? n[1] : n) || 0, g = e.start || 0 + (l ? d : 0), m = [], y = 0; return function (n, e, u) { if (s && (o = 0), c && (o = (u - 1) / 2), f && (o = u - 1), !m.length) { for (var v = 0; v < u; v++) { if (a) { var b = c ? (a[0] - 1) / 2 : o % a[0], x = c ? (a[1] - 1) / 2 : Math.floor(o / a[0]), M = b - v % a[0], w = x - Math.floor(v / a[0]), k = Math.sqrt(M * M + w * w); "x" === i && (k = -M), "y" === i && (k = -w), m.push(k) } else m.push(Math.abs(o - v)); y = Math.max.apply(Math, m) } t && (m = m.map(function (n) { return t(n / y) * y })), "reverse" === r && (m = m.map(function (n) { return i ? n < 0 ? -1 * n : -n : Math.abs(y - n) })) } return g + (l ? (p - d) / y : d) * (Math.round(100 * m[e]) / 100) + h } }, en.timeline = function (n) { void 0 === n && (n = {}); var r = en(n); return r.duration = 0, r.add = function (t, a) { var i = U.indexOf(r), o = r.children; function s(n) { n.passThrough = !0 } i > -1 && U.splice(i, 1); for (var c = 0; c < o.length; c++)s(o[c]); var f = w(t, M(e, n)); f.targets = f.targets || n.targets; var l = r.duration; f.autoplay = !1, f.direction = r.direction, f.timelineOffset = u.und(a) ? l : A(a, l), s(r), r.seek(f.timelineOffset); var d = en(f); s(d), o.push(d); var p = W(o, n); return r.delay = p.delay, r.endDelay = p.endDelay, r.duration = p.duration, r.seek(0), r.reset(), r.autoplay && r.play(), r }, r }, en.easing = v, en.penner = p, en.random = function (n, e) { return Math.floor(Math.random() * (e - n + 1)) + n }, en });
// hamburger
function toggleMenu() {
    $('#main-nav ul.menu').toggleClass('is-active');
    $('#main-nav .hamburger').toggleClass('is-active');
}
$.fn.materializeInputs = function(selectors) {

    // default param with backwards compatibility
    if (typeof(selectors)==='undefined') selectors = "input, textarea";

    // attribute function
    function setInputValueAttr(element) {
        element.setAttribute('value', element.value);
    }

    // set value attribute at load
    this.find(selectors).each(function () {
        setInputValueAttr(this);
    });

    // on keyup
    this.on("keyup", selectors, function() {
        setInputValueAttr(this);
    });
};
// strikethrough hero
function strikethroughJumbo(element, options) {

    // parsing options
    var defaults = {
        strikeDelay: 100,
        duration: 1000,
        maxHeight: '50px'
    };
    var config = Object.assign(defaults, options);

    function animDuration() {
        return (config.duration - config.strikeDelay) / 2;
    }

    var tl = anime.timeline({
        loop: false
    });

    // reveal
    tl.add({
        targets: element.querySelectorAll('.strikethrough'),
        maxHeight: [
            { value: 0, duration: 0 },
            { value: config.maxHeight, duration: animDuration() }
        ],
        delay: anime.stagger(animDuration()),
        easing: 'cubicBezier(.6, 0, .1, 1)'
    }, 0);

    // strikethrough
    tl.add({
        targets: element.querySelectorAll('.strikethrough s'),
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: animDuration() }
        ],
        delay: anime.stagger(animDuration()),
        easing: 'cubicBezier(.6, 0, .1, 1)'
    }, config.strikeDelay);

    // title
    tl.add({
        targets: element.querySelectorAll('.title h2'),
        clipPath: [
            { value: 'inset(0 100% 0 0)', duration: 0, delay: 500 },
            { value: 'inset(0 50% 0 0)', duration: 0, delay: 500 },
            { value: 'inset(0 0% 0 0)', duration: 0 },
        ],
        easing: 'linear'
    }, config.strikeDelay);

};

// jQuery alias
$.fn.strikethroughJumbo = function (options) {
    strikethroughJumbo(this[0], options);
}
var typeWriter = {

    // separate chars
    separateChars(str) {
        var output = '';
        for (var i = 0; i < str.length; i++) {
            output += '<span class="typechar">' + str.charAt(i) + '</span>';
        }
        return output;
    },

    css(element, options) {
        // get text
        var text = element.textContent;

        // update html 
        element.innerHTML = this.separateChars(text);

        // get all letters as DOM nodes
        var animeLetters = element.querySelectorAll('.typechar');

        // animate letters using anime.js
        anime({
            targets: animeLetters,
            opacity: [
                { value: 0, duration: 0 },
                { value: 1, duration: 0 },
            ],
            delay: anime.stagger(options.delay, { start: options.beginDelay }),
        });
    },

    html(element, options) {
        // get text
        var text = element.textContent;

        // remove text, add wrapper, add cursor
        element.innerHTML = '<span class="typeWriterText"></span>';
        typewriterTextEl = element.querySelector('.typeWriterText');
        function addCursor() {
            if (options.cursor) {
                element.insertAdjacentHTML('beforeend', '<span class="blinking-cursor"></span>');
            }
        }
        if (options.beginCursor) {
            addCursor();
        }

        // beginDelay
        setTimeout(function () {
            // add cursor if beginCursor option is set to false
            if (!options.beginCursor) {
                addCursor();
            }
            // loop through
            var i = 0;
            var tid = setInterval(function () {
                if (i < text.length) {
                    typewriterTextEl.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(tid);
                }
            }, options.delay);
        }, options.beginDelay);
    }
}

// jQuery plugin
$.fn.typeWriter = function (options) {

    // parsing options
    var defaults = {
        delay: 50,
        beginDelay: 0,
        method: 'css',
        cursor: true, // only available with html method
        beginCursor: true // show cursor during beginDelay
    };
    var options = Object.assign(defaults, options);

    // opacity variant
    if (options.method == 'css') {
        typeWriter.css(this[0], options);
    } else if (options.method == 'html') {
        typeWriter.html(this[0], options);
    }

}
function bloatAnimation(selector = "#bloat-animation") {

    var config = {
        loadingTime: 10000,
        loopDelay: 2000,
        spinner: {
            loopDuration: 1000,
            outDelay: 1000
        },
        modal: {
            fade: {
                time: 700,
                easing: 'cubicBezier(.5, .05, .1, .3)'
            },
            pop: {
                time: 1000,
                delay: 100,
                easing: 'spring(1, 80, 10, 0)'
            }
        },
        button: {
            time: 200,
            scale: 1.15
        }
    };

    var mouseKeyframes = {
        x: [
            { value: 0, duration: 500 },
            { value: -40, duration: 500 },
            { value: -40, duration: 1700 },
            { value: -150, duration: 500 },
            { value: -149, duration: 800 },
            { value: -270, duration: 600 },
            { value: -271, duration: 400 },
            { value: -300, duration: 1200 },
            { value: -150, duration: 600 },
            { value: -155, duration: 500 },
            { value: -155, duration: 1300 },
            { value: -200, duration: 1100 },
            { value: -80, duration: 800 },
            { value: -55, duration: 400 },
            { value: -55, duration: 300 },
            { value: -20, duration: 500 },
            { value: 0, duration: 1000 },
            { value: -10, duration: 600 },
            { value: -10, duration: 600 },
            { value: -50, duration: 1200 },
            { value: -150, duration: 800 },
            { value: -137, duration: 1300 },
            { value: -100, duration: 1300 },
            { value: -100, duration: 1300 },
            { value: -78, duration: 200 },
            { value: -480, duration: 1000 },
            { value: -490, duration: 100 },
            { value: -500, duration: 200 },
            { value: -495, duration: 200 },
            { value: -495, duration: 400 },
            { value: 0, duration: 800 }
        ],
        y: [
            { value: 0, duration: 500 },
            { value: -20, duration: 500 },
            { value: -20, duration: 1700 },
            { value: -50, duration: 500 },
            { value: 0, duration: 800 },
            { value: -90, duration: 600 },
            { value: -85, duration: 400 },
            { value: -20, duration: 1200 },
            { value: -50, duration: 600 },
            { value: -50, duration: 500 },
            { value: -50, duration: 1300 },
            { value: -20, duration: 1100 },
            { value: -230, duration: 800 },
            { value: -220, duration: 400 },
            { value: -220, duration: 300 },
            { value: -30, duration: 500 },
            { value: 0, duration: 1000 },
            { value: 60, duration: 600 },
            { value: 60, duration: 600 },
            { value: 0, duration: 1200 },
            { value: -40, duration: 800 },
            { value: -37, duration: 1300 },
            { value: 55, duration: 1300 },
            { value: 55, duration: 1300 },
            { value: 43, duration: 200 },
            { value: -300, duration: 1000 },
            { value: -280, duration: 100 },
            { value: -280, duration: 200 },
            { value: -280, duration: 200 },
            { value: -280, duration: 400 },
            { value: 0, duration: 800 }
        ]
    };

    var tl = anime.timeline({
        loop: true
    });

    // loading bar
    tl.add({
        targets: [
            selector+' #Loading_Bar'
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 0.43, duration: config.loadingTime * 0.13 },
            { value: 0.75, duration: config.loadingTime * 0.39 },
            { value: 0.91, duration: config.loadingTime * 0.33 },
            { value: 0.94, duration: config.loadingTime * 0.03 },
            { value: 1, duration: config.loadingTime * 0.12 }
        ],
        easing: 'easeInOutQuart'
    }, 0);
    // spinner
    tl.add({
        targets: [
            selector+' #Spinner'
        ],
        rotate: 360 * ((config.loadingTime + config.spinner.outDelay) / config.spinner.loopDuration),
        duration: config.loadingTime + config.spinner.outDelay,
        easing: 'linear'
    }, 0);
    // loading done
    tl.add({
        targets: [
            selector+' #Loading_Bar'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 500 }
        ],
        easing: 'easeInOutQuart',
        delay: 200,
    }, config.loadingTime);
    tl.add({
        targets: [
            selector+' #Spinner'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 2000 }
        ],
        easing: 'easeInOutQuart',
        delay: config.spinnerOutDelay,
    }, config.loadingTime);

    // mouse
    tl.add({
        targets: [
            selector+' #Cursor'
        ],
        translateX: mouseKeyframes.x,
        translateY: mouseKeyframes.y,
        easing: 'easeInOutQuart',
    }, 0);

    // cookie modal
    tl.add({
        targets: [
            selector+' #Cookies'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 3000);
    tl.add({
        targets: [
            selector+' #Cookie_Modal'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 3000 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #checkmark'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: 300 }
        ],
        easing: config.modal.pop.easing
    }, 4800);
    tl.add({
        targets: [
            selector+' #cookiebutton'
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: config.button.scale, duration: config.button.time },
            { value: 1, duration: config.button.time }
        ],
        easing: config.modal.pop.easing
    }, 6800);
    tl.add({
        targets: [
            selector+' #Cookies'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 7200);

    // newsletter modal
    tl.add({
        targets: [
            selector+' #Newsletter'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 8000);
    tl.add({
        targets: [
            selector+' #Newsletter_Modal'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 8000 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #Newsletter'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 11100);

    // privacy modal
    tl.add({
        targets: [
            selector+' #Privacy'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 11700);
    tl.add({
        targets: [
            selector+' #Privacy_Notice'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 11700 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #privacybutton'
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: config.button.scale, duration: config.button.time },
            { value: 1, duration: config.button.time }
        ],
        easing: config.modal.pop.easing
    }, 13400);
    tl.add({
        targets: [
            selector+' #Privacy'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 13800);

    // adblock modal
    tl.add({
        targets: [
            selector+' #Adblocker'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 14100);
    tl.add({
        targets: [
            selector+' #Adblocker_Modal'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 14100 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #adblockbutton'
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: config.button.scale, duration: config.button.time },
            { value: 1, duration: config.button.time }
        ],
        easing: config.modal.pop.easing
    }, 15800);
    tl.add({
        targets: [
            selector+' #Adblocker'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 16300);

    // push notifications modal
    tl.add({
        targets: [
            selector+' #Notifications'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 16800);
    tl.add({
        targets: [
            selector+' #Notifications_Modal'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 16800 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #adbbutton'
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: config.button.scale, duration: config.button.time },
            { value: 1, duration: config.button.time }
        ],
        easing: config.modal.pop.easing
    }, 18600);
    tl.add({
        targets: [
            selector+' #Notifications'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 19000);

    // app banner
    tl.add({
        targets: [
            selector+' #App_Banner'
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 400 }
        ],
        easing: config.modal.pop.easing
    }, 16500);
    tl.add({
        targets: [
            selector+' #App_Banner'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 200 }
        ],
        easing: 'linear',
        endDelay: config.loopDelay
    }, 22000);

    // actual content
    tl.add({
        targets: [
            selector+' #Actual_Content'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1500 }
        ],
        easing: 'linear'
    }, config.loadingTime - 2000);

}
function brandingAnimation(selector = "#branding-animation") {
    var tl = anime.timeline({
        loop: false
    });

    // logo drawing
    tl.add({
        targets: selector+' #line-logo *',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 3000,
        delay: function (el, i) { return i * 250 }
    });

    // color strips
    tl.add({
        targets: [
            selector+' #strip-blue',
            selector+' #strip-green',
            selector+' #strip-purple',
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 2000 }
        ],
        rotate: anime.stagger([0, -30]),
        duration: 2000
    }, '-=500');

    // business card
    tl.add({
        targets: [
            selector+' #business-card',
            selector+' #business-card-back'
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 500 }
        ],
        delay: anime.stagger(250)
    }, '-=1500');

    // mobile device
    tl.add({
        targets: [
            '#branding-animation #mobile'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    }, '-=1000');
    // mobile hero
    tl.add({
        targets: [
            '#branding-animation #mobile #hero *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 500 }
        ],
        delay: anime.stagger(100)
    }, '-=1000');
    // mobile content bg
    tl.add({
        targets: '#branding-animation #mobile #pagebg',
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 500 }
        ],
        easing: 'easeInOutSine'
    }, '-=1000');
    // mobile content
    tl.add({
        targets: [
            selector+' #mobile #p1 *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 400 }
        ],
        delay: anime.stagger(50)
    }, '-=1000');

    // booklet
    tl.add({
        targets: [
            selector+' #page-left',
            selector+' #page-right'
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ],
        delay: anime.stagger(250),
        endDelay: 2000
    }, '-=1000');
}
function designAnimation(selector = "#design-animation") {
    var tl = anime.timeline({
        loop: false
    });

    // mobile hero
    tl.add({
        targets: [
            selector+' #mobile #hero *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ],
        delay: anime.stagger(100)
    });

    // mobile content bg
    tl.add({
        targets: selector+' #mobile #pagebg',
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    });

    // mobile content
    tl.add({
        targets: [
            selector+' #mobile #p1 *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 400 }
        ],
        delay: anime.stagger(50)
    }, '-=500');

    // device fade
    tl.add({
        targets: [
            selector+' #mobile #device'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 1500 }
        ]
    });

    //desktop hero
    tl.add({
        targets: [
            selector+' #Desktop #navbar',
            selector+' #Desktop #navbar *',
            selector+' #Desktop #hero-2 #h1-2 *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ],
        delay: anime.stagger(100)
    }, '-=750');

    tl.add({
        targets: [
            selector+' #Desktop #hero-2 #hero-bg-2'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ],
        delay: anime.stagger(100)
    }, '-=2000');

    // body
    tl.add({
        targets: [
            selector+' #Desktop #bodybg'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ]
    }, '-=1500');
    tl.add({
        targets: [
            selector+' #Desktop #p1-2',
            selector+' #Desktop #p2',
            selector+' #Desktop #sidebar'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ],
        delay: anime.stagger(100)
    }, '-=1000');

    // monitor
    tl.add({
        targets: [
            selector+' #monitor'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    }, '-=2000');

    // end
    tl.add({
        targets: [
            selector+' #mobile #device'
        ],
        opacity: 1,
        duration: 0
    }, '-=500');

    // scale both
    tl.add({
        targets: [
            selector+' #mobile'
        ],
        translateX: [
            { value: 0, duration: 0 },
            { value: -100, duration: 1000 }
        ],
        duration: 1000
    }, '-=1000');
    tl.add({
        targets: [
            selector+' #desktop-monitor'
        ],
        translateX: [
            { value: 0, duration: 0 },
            { value: -50, duration: 1000 }
        ],
        duration: 1000
    });
    tl.add({
        targets: [
            selector+' #mobile',
            selector+' #desktop-monitor'
        ],
        scale: 0.7,
        duration: 1000
    }, '-=900');
}
function webdevAnimation(selector = "#webdev-animation") {
    var code = {
        targets: selector+' #Code *',
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 200 }
        ],
        easing: 'linear',
        delay: anime.stagger(70) // increase delay by 100ms for each elements.
    };

    var tl = anime.timeline({
        loop: true
    });

    // code
    tl.add(code);

    // window change
    tl.add({
        targets: selector+' #in-browser',
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    });

    // hero
    tl.add({
        targets: [
            selector+' #in-browser #hero',
            selector+' #in-browser #Logo',
            selector+' #in-browser #menu',
            selector+' #in-browser #h1'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ],
        delay: anime.stagger(300)
    });

    // body
    tl.add({
        targets: [
            selector+' #in-browser #body_text *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 200 }
        ],
        easing: 'linear',
        delay: anime.stagger(50) // increase delay by 100ms for each elements.
    });

    // image
    tl.add({
        targets: selector+' #in-browser #image',
        opacity: [
            { value: 1, duration: 0 }
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    });
}