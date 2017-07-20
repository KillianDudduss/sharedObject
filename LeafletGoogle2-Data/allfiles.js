/*
 Leaflet 1.0.3, a JS library for interactive maps. http://leafletjs.com
 (c) 2010-2016 Vladimir Agafonkin, (c) 2010-2011 CloudMade
*/
! function(t, e, i) {
    function n() {
        var e = t.L;
        o.noConflict = function() {
            return t.L = e, this
        }, t.L = o
    }
    var o = {
        version: "1.0.3"
    };
    "object" == typeof module && "object" == typeof module.exports ? module.exports = o : "function" == typeof define && define.amd && define(o), "undefined" != typeof t && n(), o.Util = {
            extend: function(t) {
                var e, i, n, o;
                for (i = 1, n = arguments.length; i < n; i++) {
                    o = arguments[i];
                    for (e in o) t[e] = o[e]
                }
                return t
            },
            create: Object.create || function() {
                function t() {}
                return function(e) {
                    return t.prototype = e, new t
                }
            }(),
            bind: function(t, e) {
                var i = Array.prototype.slice;
                if (t.bind) return t.bind.apply(t, i.call(arguments, 1));
                var n = i.call(arguments, 2);
                return function() {
                    return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments)
                }
            },
            stamp: function(t) {
                return t._leaflet_id = t._leaflet_id || ++o.Util.lastId, t._leaflet_id
            },
            lastId: 0,
            throttle: function(t, e, i) {
                var n, o, s, r;
                return r = function() {
                    n = !1, o && (s.apply(i, o), o = !1)
                }, s = function() {
                    n ? o = arguments : (t.apply(i, arguments), setTimeout(r, e), n = !0)
                }
            },
            wrapNum: function(t, e, i) {
                var n = e[1],
                    o = e[0],
                    s = n - o;
                return t === n && i ? t : ((t - o) % s + s) % s + o
            },
            falseFn: function() {
                return !1
            },
            formatNum: function(t, e) {
                var i = Math.pow(10, e || 5);
                return Math.round(t * i) / i
            },
            trim: function(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
            },
            splitWords: function(t) {
                return o.Util.trim(t).split(/\s+/)
            },
            setOptions: function(t, e) {
                t.hasOwnProperty("options") || (t.options = t.options ? o.Util.create(t.options) : {});
                for (var i in e) t.options[i] = e[i];
                return t.options
            },
            getParamString: function(t, e, i) {
                var n = [];
                for (var o in t) n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
                return (e && e.indexOf("?") !== -1 ? "&" : "?") + n.join("&")
            },
            template: function(t, e) {
                return t.replace(o.Util.templateRe, function(t, n) {
                    var o = e[n];
                    if (o === i) throw new Error("No value provided for variable " + t);
                    return "function" == typeof o && (o = o(e)), o
                })
            },
            templateRe: /\{ *([\w_\-]+) *\}/g,
            isArray: Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            indexOf: function(t, e) {
                for (var i = 0; i < t.length; i++)
                    if (t[i] === e) return i;
                return -1
            },
            emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        },
        function() {
            function e(e) {
                return t["webkit" + e] || t["moz" + e] || t["ms" + e]
            }

            function i(e) {
                var i = +new Date,
                    o = Math.max(0, 16 - (i - n));
                return n = i + o, t.setTimeout(e, o)
            }
            var n = 0,
                s = t.requestAnimationFrame || e("RequestAnimationFrame") || i,
                r = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") || function(e) {
                    t.clearTimeout(e)
                };
            o.Util.requestAnimFrame = function(e, n, r) {
                return r && s === i ? void e.call(n) : s.call(t, o.bind(e, n))
            }, o.Util.cancelAnimFrame = function(e) {
                e && r.call(t, e)
            }
        }(), o.extend = o.Util.extend, o.bind = o.Util.bind, o.stamp = o.Util.stamp, o.setOptions = o.Util.setOptions, o.Class = function() {}, o.Class.extend = function(t) {
            var e = function() {
                    this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
                },
                i = e.__super__ = this.prototype,
                n = o.Util.create(i);
            n.constructor = e, e.prototype = n;
            for (var s in this) this.hasOwnProperty(s) && "prototype" !== s && (e[s] = this[s]);
            return t.statics && (o.extend(e, t.statics), delete t.statics), t.includes && (o.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes), n.options && (t.options = o.Util.extend(o.Util.create(n.options), t.options)), o.extend(n, t), n._initHooks = [], n.callInitHooks = function() {
                if (!this._initHooksCalled) {
                    i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
                    for (var t = 0, e = n._initHooks.length; t < e; t++) n._initHooks[t].call(this)
                }
            }, e
        }, o.Class.include = function(t) {
            return o.extend(this.prototype, t), this
        }, o.Class.mergeOptions = function(t) {
            return o.extend(this.prototype.options, t), this
        }, o.Class.addInitHook = function(t) {
            var e = Array.prototype.slice.call(arguments, 1),
                i = "function" == typeof t ? t : function() {
                    this[t].apply(this, e)
                };
            return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this
        }, o.Evented = o.Class.extend({
            on: function(t, e, i) {
                if ("object" == typeof t)
                    for (var n in t) this._on(n, t[n], e);
                else {
                    t = o.Util.splitWords(t);
                    for (var s = 0, r = t.length; s < r; s++) this._on(t[s], e, i)
                }
                return this
            },
            off: function(t, e, i) {
                if (t)
                    if ("object" == typeof t)
                        for (var n in t) this._off(n, t[n], e);
                    else {
                        t = o.Util.splitWords(t);
                        for (var s = 0, r = t.length; s < r; s++) this._off(t[s], e, i)
                    }
                else delete this._events;
                return this
            },
            _on: function(t, e, n) {
                this._events = this._events || {};
                var o = this._events[t];
                o || (o = [], this._events[t] = o), n === this && (n = i);
                for (var s = {
                        fn: e,
                        ctx: n
                    }, r = o, a = 0, h = r.length; a < h; a++)
                    if (r[a].fn === e && r[a].ctx === n) return;
                r.push(s)
            },
            _off: function(t, e, n) {
                var s, r, a;
                if (this._events && (s = this._events[t])) {
                    if (!e) {
                        for (r = 0, a = s.length; r < a; r++) s[r].fn = o.Util.falseFn;
                        return void delete this._events[t]
                    }
                    if (n === this && (n = i), s)
                        for (r = 0, a = s.length; r < a; r++) {
                            var h = s[r];
                            if (h.ctx === n && h.fn === e) return h.fn = o.Util.falseFn, this._firingCount && (this._events[t] = s = s.slice()), void s.splice(r, 1)
                        }
                }
            },
            fire: function(t, e, i) {
                if (!this.listens(t, i)) return this;
                var n = o.Util.extend({}, e, {
                    type: t,
                    target: this
                });
                if (this._events) {
                    var s = this._events[t];
                    if (s) {
                        this._firingCount = this._firingCount + 1 || 1;
                        for (var r = 0, a = s.length; r < a; r++) {
                            var h = s[r];
                            h.fn.call(h.ctx || this, n)
                        }
                        this._firingCount--
                    }
                }
                return i && this._propagateEvent(n), this
            },
            listens: function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) return !0;
                if (e)
                    for (var n in this._eventParents)
                        if (this._eventParents[n].listens(t, e)) return !0;
                return !1
            },
            once: function(t, e, i) {
                if ("object" == typeof t) {
                    for (var n in t) this.once(n, t[n], e);
                    return this
                }
                var s = o.bind(function() {
                    this.off(t, e, i).off(t, s, i)
                }, this);
                return this.on(t, e, i).on(t, s, i)
            },
            addEventParent: function(t) {
                return this._eventParents = this._eventParents || {}, this._eventParents[o.stamp(t)] = t, this
            },
            removeEventParent: function(t) {
                return this._eventParents && delete this._eventParents[o.stamp(t)], this
            },
            _propagateEvent: function(t) {
                for (var e in this._eventParents) this._eventParents[e].fire(t.type, o.extend({
                    layer: t.target
                }, t), !0)
            }
        });
    var s = o.Evented.prototype;
    s.addEventListener = s.on, s.removeEventListener = s.clearAllEventListeners = s.off, s.addOneTimeEventListener = s.once, s.fireEvent = s.fire, s.hasEventListeners = s.listens, o.Mixin = {
            Events: s
        },
        function() {
            var i = navigator.userAgent.toLowerCase(),
                n = e.documentElement,
                s = "ActiveXObject" in t,
                r = i.indexOf("webkit") !== -1,
                a = i.indexOf("phantom") !== -1,
                h = i.search("android [23]") !== -1,
                l = i.indexOf("chrome") !== -1,
                u = i.indexOf("gecko") !== -1 && !r && !t.opera && !s,
                c = 0 === navigator.platform.indexOf("Win"),
                d = "undefined" != typeof orientation || i.indexOf("mobile") !== -1,
                _ = !t.PointerEvent && t.MSPointerEvent,
                m = t.PointerEvent || _,
                p = s && "transition" in n.style,
                f = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !h,
                g = "MozPerspective" in n.style,
                v = "OTransition" in n.style,
                y = !t.L_NO_TOUCH && (m || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch);
            o.Browser = {
                ie: s,
                ielt9: s && !e.addEventListener,
                edge: "msLaunchUri" in navigator && !("documentMode" in e),
                webkit: r,
                gecko: u,
                android: i.indexOf("android") !== -1,
                android23: h,
                chrome: l,
                safari: !l && i.indexOf("safari") !== -1,
                win: c,
                ie3d: p,
                webkit3d: f,
                gecko3d: g,
                opera12: v,
                any3d: !t.L_DISABLE_3D && (p || f || g) && !v && !a,
                mobile: d,
                mobileWebkit: d && r,
                mobileWebkit3d: d && f,
                mobileOpera: d && t.opera,
                mobileGecko: d && u,
                touch: !!y,
                msPointer: !!_,
                pointer: !!m,
                retina: (t.devicePixelRatio || t.screen.deviceXDPI / t.screen.logicalXDPI) > 1
            }
        }(), o.Point = function(t, e, i) {
            this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
        }, o.Point.prototype = {
            clone: function() {
                return new o.Point(this.x, this.y)
            },
            add: function(t) {
                return this.clone()._add(o.point(t))
            },
            _add: function(t) {
                return this.x += t.x, this.y += t.y, this
            },
            subtract: function(t) {
                return this.clone()._subtract(o.point(t))
            },
            _subtract: function(t) {
                return this.x -= t.x, this.y -= t.y, this
            },
            divideBy: function(t) {
                return this.clone()._divideBy(t)
            },
            _divideBy: function(t) {
                return this.x /= t, this.y /= t, this
            },
            multiplyBy: function(t) {
                return this.clone()._multiplyBy(t)
            },
            _multiplyBy: function(t) {
                return this.x *= t, this.y *= t, this
            },
            scaleBy: function(t) {
                return new o.Point(this.x * t.x, this.y * t.y)
            },
            unscaleBy: function(t) {
                return new o.Point(this.x / t.x, this.y / t.y)
            },
            round: function() {
                return this.clone()._round()
            },
            _round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this
            },
            floor: function() {
                return this.clone()._floor()
            },
            _floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
            },
            ceil: function() {
                return this.clone()._ceil()
            },
            _ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
            },
            distanceTo: function(t) {
                t = o.point(t);
                var e = t.x - this.x,
                    i = t.y - this.y;
                return Math.sqrt(e * e + i * i)
            },
            equals: function(t) {
                return t = o.point(t), t.x === this.x && t.y === this.y
            },
            contains: function(t) {
                return t = o.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
            },
            toString: function() {
                return "Point(" + o.Util.formatNum(this.x) + ", " + o.Util.formatNum(this.y) + ")"
            }
        }, o.point = function(t, e, n) {
            return t instanceof o.Point ? t : o.Util.isArray(t) ? new o.Point(t[0], t[1]) : t === i || null === t ? t : "object" == typeof t && "x" in t && "y" in t ? new o.Point(t.x, t.y) : new o.Point(t, e, n)
        }, o.Bounds = function(t, e) {
            if (t)
                for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++) this.extend(i[n])
        }, o.Bounds.prototype = {
            extend: function(t) {
                return t = o.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
            },
            getCenter: function(t) {
                return new o.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
            },
            getBottomLeft: function() {
                return new o.Point(this.min.x, this.max.y)
            },
            getTopRight: function() {
                return new o.Point(this.max.x, this.min.y)
            },
            getSize: function() {
                return this.max.subtract(this.min)
            },
            contains: function(t) {
                var e, i;
                return t = "number" == typeof t[0] || t instanceof o.Point ? o.point(t) : o.bounds(t), t instanceof o.Bounds ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
            },
            intersects: function(t) {
                t = o.bounds(t);
                var e = this.min,
                    i = this.max,
                    n = t.min,
                    s = t.max,
                    r = s.x >= e.x && n.x <= i.x,
                    a = s.y >= e.y && n.y <= i.y;
                return r && a
            },
            overlaps: function(t) {
                t = o.bounds(t);
                var e = this.min,
                    i = this.max,
                    n = t.min,
                    s = t.max,
                    r = s.x > e.x && n.x < i.x,
                    a = s.y > e.y && n.y < i.y;
                return r && a
            },
            isValid: function() {
                return !(!this.min || !this.max)
            }
        }, o.bounds = function(t, e) {
            return !t || t instanceof o.Bounds ? t : new o.Bounds(t, e)
        }, o.Transformation = function(t, e, i, n) {
            this._a = t, this._b = e, this._c = i, this._d = n
        }, o.Transformation.prototype = {
            transform: function(t, e) {
                return this._transform(t.clone(), e)
            },
            _transform: function(t, e) {
                return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
            },
            untransform: function(t, e) {
                return e = e || 1, new o.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
            }
        }, o.DomUtil = {
            get: function(t) {
                return "string" == typeof t ? e.getElementById(t) : t
            },
            getStyle: function(t, i) {
                var n = t.style[i] || t.currentStyle && t.currentStyle[i];
                if ((!n || "auto" === n) && e.defaultView) {
                    var o = e.defaultView.getComputedStyle(t, null);
                    n = o ? o[i] : null
                }
                return "auto" === n ? null : n
            },
            create: function(t, i, n) {
                var o = e.createElement(t);
                return o.className = i || "", n && n.appendChild(o), o
            },
            remove: function(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            },
            empty: function(t) {
                for (; t.firstChild;) t.removeChild(t.firstChild)
            },
            toFront: function(t) {
                t.parentNode.appendChild(t)
            },
            toBack: function(t) {
                var e = t.parentNode;
                e.insertBefore(t, e.firstChild)
            },
            hasClass: function(t, e) {
                if (t.classList !== i) return t.classList.contains(e);
                var n = o.DomUtil.getClass(t);
                return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n)
            },
            addClass: function(t, e) {
                if (t.classList !== i)
                    for (var n = o.Util.splitWords(e), s = 0, r = n.length; s < r; s++) t.classList.add(n[s]);
                else if (!o.DomUtil.hasClass(t, e)) {
                    var a = o.DomUtil.getClass(t);
                    o.DomUtil.setClass(t, (a ? a + " " : "") + e)
                }
            },
            removeClass: function(t, e) {
                t.classList !== i ? t.classList.remove(e) : o.DomUtil.setClass(t, o.Util.trim((" " + o.DomUtil.getClass(t) + " ").replace(" " + e + " ", " ")))
            },
            setClass: function(t, e) {
                t.className.baseVal === i ? t.className = e : t.className.baseVal = e
            },
            getClass: function(t) {
                return t.className.baseVal === i ? t.className : t.className.baseVal
            },
            setOpacity: function(t, e) {
                "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && o.DomUtil._setOpacityIE(t, e)
            },
            _setOpacityIE: function(t, e) {
                var i = !1,
                    n = "DXImageTransform.Microsoft.Alpha";
                try {
                    i = t.filters.item(n)
                } catch (t) {
                    if (1 === e) return
                }
                e = Math.round(100 * e), i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
            },
            testProp: function(t) {
                for (var i = e.documentElement.style, n = 0; n < t.length; n++)
                    if (t[n] in i) return t[n];
                return !1
            },
            setTransform: function(t, e, i) {
                var n = e || new o.Point(0, 0);
                t.style[o.DomUtil.TRANSFORM] = (o.Browser.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "")
            },
            setPosition: function(t, e) {
                t._leaflet_pos = e, o.Browser.any3d ? o.DomUtil.setTransform(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
            },
            getPosition: function(t) {
                return t._leaflet_pos || new o.Point(0, 0)
            }
        },
        function() {
            o.DomUtil.TRANSFORM = o.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
            var i = o.DomUtil.TRANSITION = o.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
            if (o.DomUtil.TRANSITION_END = "webkitTransition" === i || "OTransition" === i ? i + "End" : "transitionend", "onselectstart" in e) o.DomUtil.disableTextSelection = function() {
                o.DomEvent.on(t, "selectstart", o.DomEvent.preventDefault)
            }, o.DomUtil.enableTextSelection = function() {
                o.DomEvent.off(t, "selectstart", o.DomEvent.preventDefault)
            };
            else {
                var n = o.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
                o.DomUtil.disableTextSelection = function() {
                    if (n) {
                        var t = e.documentElement.style;
                        this._userSelect = t[n], t[n] = "none"
                    }
                }, o.DomUtil.enableTextSelection = function() {
                    n && (e.documentElement.style[n] = this._userSelect, delete this._userSelect)
                }
            }
            o.DomUtil.disableImageDrag = function() {
                o.DomEvent.on(t, "dragstart", o.DomEvent.preventDefault)
            }, o.DomUtil.enableImageDrag = function() {
                o.DomEvent.off(t, "dragstart", o.DomEvent.preventDefault)
            }, o.DomUtil.preventOutline = function(e) {
                for (; e.tabIndex === -1;) e = e.parentNode;
                e && e.style && (o.DomUtil.restoreOutline(), this._outlineElement = e, this._outlineStyle = e.style.outline, e.style.outline = "none", o.DomEvent.on(t, "keydown", o.DomUtil.restoreOutline, this))
            }, o.DomUtil.restoreOutline = function() {
                this._outlineElement && (this._outlineElement.style.outline = this._outlineStyle, delete this._outlineElement, delete this._outlineStyle, o.DomEvent.off(t, "keydown", o.DomUtil.restoreOutline, this))
            }
        }(), o.LatLng = function(t, e, n) {
            if (isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
            this.lat = +t, this.lng = +e, n !== i && (this.alt = +n)
        }, o.LatLng.prototype = {
            equals: function(t, e) {
                if (!t) return !1;
                t = o.latLng(t);
                var n = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
                return n <= (e === i ? 1e-9 : e)
            },
            toString: function(t) {
                return "LatLng(" + o.Util.formatNum(this.lat, t) + ", " + o.Util.formatNum(this.lng, t) + ")"
            },
            distanceTo: function(t) {
                return o.CRS.Earth.distance(this, o.latLng(t))
            },
            wrap: function() {
                return o.CRS.Earth.wrapLatLng(this)
            },
            toBounds: function(t) {
                var e = 180 * t / 40075017,
                    i = e / Math.cos(Math.PI / 180 * this.lat);
                return o.latLngBounds([this.lat - e, this.lng - i], [this.lat + e, this.lng + i])
            },
            clone: function() {
                return new o.LatLng(this.lat, this.lng, this.alt)
            }
        }, o.latLng = function(t, e, n) {
            return t instanceof o.LatLng ? t : o.Util.isArray(t) && "object" != typeof t[0] ? 3 === t.length ? new o.LatLng(t[0], t[1], t[2]) : 2 === t.length ? new o.LatLng(t[0], t[1]) : null : t === i || null === t ? t : "object" == typeof t && "lat" in t ? new o.LatLng(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === i ? null : new o.LatLng(t, e, n)
        }, o.LatLngBounds = function(t, e) {
            if (t)
                for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++) this.extend(i[n])
        }, o.LatLngBounds.prototype = {
            extend: function(t) {
                var e, i, n = this._southWest,
                    s = this._northEast;
                if (t instanceof o.LatLng) e = t, i = t;
                else {
                    if (!(t instanceof o.LatLngBounds)) return t ? this.extend(o.latLng(t) || o.latLngBounds(t)) : this;
                    if (e = t._southWest, i = t._northEast, !e || !i) return this
                }
                return n || s ? (n.lat = Math.min(e.lat, n.lat), n.lng = Math.min(e.lng, n.lng), s.lat = Math.max(i.lat, s.lat), s.lng = Math.max(i.lng, s.lng)) : (this._southWest = new o.LatLng(e.lat, e.lng), this._northEast = new o.LatLng(i.lat, i.lng)), this
            },
            pad: function(t) {
                var e = this._southWest,
                    i = this._northEast,
                    n = Math.abs(e.lat - i.lat) * t,
                    s = Math.abs(e.lng - i.lng) * t;
                return new o.LatLngBounds(new o.LatLng(e.lat - n, e.lng - s), new o.LatLng(i.lat + n, i.lng + s))
            },
            getCenter: function() {
                return new o.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
            },
            getSouthWest: function() {
                return this._southWest
            },
            getNorthEast: function() {
                return this._northEast
            },
            getNorthWest: function() {
                return new o.LatLng(this.getNorth(), this.getWest())
            },
            getSouthEast: function() {
                return new o.LatLng(this.getSouth(), this.getEast())
            },
            getWest: function() {
                return this._southWest.lng
            },
            getSouth: function() {
                return this._southWest.lat
            },
            getEast: function() {
                return this._northEast.lng
            },
            getNorth: function() {
                return this._northEast.lat
            },
            contains: function(t) {
                t = "number" == typeof t[0] || t instanceof o.LatLng || "lat" in t ? o.latLng(t) : o.latLngBounds(t);
                var e, i, n = this._southWest,
                    s = this._northEast;
                return t instanceof o.LatLngBounds ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t, e.lat >= n.lat && i.lat <= s.lat && e.lng >= n.lng && i.lng <= s.lng
            },
            intersects: function(t) {
                t = o.latLngBounds(t);
                var e = this._southWest,
                    i = this._northEast,
                    n = t.getSouthWest(),
                    s = t.getNorthEast(),
                    r = s.lat >= e.lat && n.lat <= i.lat,
                    a = s.lng >= e.lng && n.lng <= i.lng;
                return r && a
            },
            overlaps: function(t) {
                t = o.latLngBounds(t);
                var e = this._southWest,
                    i = this._northEast,
                    n = t.getSouthWest(),
                    s = t.getNorthEast(),
                    r = s.lat > e.lat && n.lat < i.lat,
                    a = s.lng > e.lng && n.lng < i.lng;
                return r && a
            },
            toBBoxString: function() {
                return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
            },
            equals: function(t) {
                return !!t && (t = o.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast()))
            },
            isValid: function() {
                return !(!this._southWest || !this._northEast)
            }
        }, o.latLngBounds = function(t, e) {
            return t instanceof o.LatLngBounds ? t : new o.LatLngBounds(t, e)
        }, o.Projection = {}, o.Projection.LonLat = {
            project: function(t) {
                return new o.Point(t.lng, t.lat)
            },
            unproject: function(t) {
                return new o.LatLng(t.y, t.x)
            },
            bounds: o.bounds([-180, -90], [180, 90])
        }, o.Projection.SphericalMercator = {
            R: 6378137,
            MAX_LATITUDE: 85.0511287798,
            project: function(t) {
                var e = Math.PI / 180,
                    i = this.MAX_LATITUDE,
                    n = Math.max(Math.min(i, t.lat), -i),
                    s = Math.sin(n * e);
                return new o.Point(this.R * t.lng * e, this.R * Math.log((1 + s) / (1 - s)) / 2)
            },
            unproject: function(t) {
                var e = 180 / Math.PI;
                return new o.LatLng((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e, t.x * e / this.R)
            },
            bounds: function() {
                var t = 6378137 * Math.PI;
                return o.bounds([-t, -t], [t, t])
            }()
        }, o.CRS = {
            latLngToPoint: function(t, e) {
                var i = this.projection.project(t),
                    n = this.scale(e);
                return this.transformation._transform(i, n)
            },
            pointToLatLng: function(t, e) {
                var i = this.scale(e),
                    n = this.transformation.untransform(t, i);
                return this.projection.unproject(n)
            },
            project: function(t) {
                return this.projection.project(t)
            },
            unproject: function(t) {
                return this.projection.unproject(t)
            },
            scale: function(t) {
                return 256 * Math.pow(2, t)
            },
            zoom: function(t) {
                return Math.log(t / 256) / Math.LN2
            },
            getProjectedBounds: function(t) {
                if (this.infinite) return null;
                var e = this.projection.bounds,
                    i = this.scale(t),
                    n = this.transformation.transform(e.min, i),
                    s = this.transformation.transform(e.max, i);
                return o.bounds(n, s)
            },
            infinite: !1,
            wrapLatLng: function(t) {
                var e = this.wrapLng ? o.Util.wrapNum(t.lng, this.wrapLng, !0) : t.lng,
                    i = this.wrapLat ? o.Util.wrapNum(t.lat, this.wrapLat, !0) : t.lat,
                    n = t.alt;
                return o.latLng(i, e, n)
            },
            wrapLatLngBounds: function(t) {
                var e = t.getCenter(),
                    i = this.wrapLatLng(e),
                    n = e.lat - i.lat,
                    s = e.lng - i.lng;
                if (0 === n && 0 === s) return t;
                var r = t.getSouthWest(),
                    a = t.getNorthEast(),
                    h = o.latLng({
                        lat: r.lat - n,
                        lng: r.lng - s
                    }),
                    l = o.latLng({
                        lat: a.lat - n,
                        lng: a.lng - s
                    });
                return new o.LatLngBounds(h, l)
            }
        }, o.CRS.Simple = o.extend({}, o.CRS, {
            projection: o.Projection.LonLat,
            transformation: new o.Transformation(1, 0, -1, 0),
            scale: function(t) {
                return Math.pow(2, t)
            },
            zoom: function(t) {
                return Math.log(t) / Math.LN2
            },
            distance: function(t, e) {
                var i = e.lng - t.lng,
                    n = e.lat - t.lat;
                return Math.sqrt(i * i + n * n)
            },
            infinite: !0
        }), o.CRS.Earth = o.extend({}, o.CRS, {
            wrapLng: [-180, 180],
            R: 6371e3,
            distance: function(t, e) {
                var i = Math.PI / 180,
                    n = t.lat * i,
                    o = e.lat * i,
                    s = Math.sin(n) * Math.sin(o) + Math.cos(n) * Math.cos(o) * Math.cos((e.lng - t.lng) * i);
                return this.R * Math.acos(Math.min(s, 1))
            }
        }), o.CRS.EPSG3857 = o.extend({}, o.CRS.Earth, {
            code: "EPSG:3857",
            projection: o.Projection.SphericalMercator,
            transformation: function() {
                var t = .5 / (Math.PI * o.Projection.SphericalMercator.R);
                return new o.Transformation(t, .5, -t, .5)
            }()
        }), o.CRS.EPSG900913 = o.extend({}, o.CRS.EPSG3857, {
            code: "EPSG:900913"
        }), o.CRS.EPSG4326 = o.extend({}, o.CRS.Earth, {
            code: "EPSG:4326",
            projection: o.Projection.LonLat,
            transformation: new o.Transformation(1 / 180, 1, -1 / 180, .5)
        }), o.Map = o.Evented.extend({
            options: {
                crs: o.CRS.EPSG3857,
                center: i,
                zoom: i,
                minZoom: i,
                maxZoom: i,
                layers: [],
                maxBounds: i,
                renderer: i,
                zoomAnimation: !0,
                zoomAnimationThreshold: 4,
                fadeAnimation: !0,
                markerZoomAnimation: !0,
                transform3DLimit: 8388608,
                zoomSnap: 1,
                zoomDelta: 1,
                trackResize: !0
            },
            initialize: function(t, e) {
                e = o.setOptions(this, e), this._initContainer(t), this._initLayout(), this._onResize = o.bind(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== i && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== i && this.setView(o.latLng(e.center), e.zoom, {
                    reset: !0
                }), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this.callInitHooks(), this._zoomAnimated = o.DomUtil.TRANSITION && o.Browser.any3d && !o.Browser.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), o.DomEvent.on(this._proxy, o.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)), this._addLayers(this.options.layers)
            },
            setView: function(t, e, n) {
                if (e = e === i ? this._zoom : this._limitZoom(e), t = this._limitCenter(o.latLng(t), e, this.options.maxBounds), n = n || {}, this._stop(), this._loaded && !n.reset && n !== !0) {
                    n.animate !== i && (n.zoom = o.extend({
                        animate: n.animate
                    }, n.zoom), n.pan = o.extend({
                        animate: n.animate,
                        duration: n.duration
                    }, n.pan));
                    var s = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan);
                    if (s) return clearTimeout(this._sizeTimer), this
                }
                return this._resetView(t, e), this
            },
            setZoom: function(t, e) {
                return this._loaded ? this.setView(this.getCenter(), t, {
                    zoom: e
                }) : (this._zoom = t, this)
            },
            zoomIn: function(t, e) {
                return t = t || (o.Browser.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e)
            },
            zoomOut: function(t, e) {
                return t = t || (o.Browser.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e)
            },
            setZoomAround: function(t, e, i) {
                var n = this.getZoomScale(e),
                    s = this.getSize().divideBy(2),
                    r = t instanceof o.Point ? t : this.latLngToContainerPoint(t),
                    a = r.subtract(s).multiplyBy(1 - 1 / n),
                    h = this.containerPointToLatLng(s.add(a));
                return this.setView(h, e, {
                    zoom: i
                })
            },
            _getBoundsCenterZoom: function(t, e) {
                e = e || {}, t = t.getBounds ? t.getBounds() : o.latLngBounds(t);
                var i = o.point(e.paddingTopLeft || e.padding || [0, 0]),
                    n = o.point(e.paddingBottomRight || e.padding || [0, 0]),
                    s = this.getBoundsZoom(t, !1, i.add(n));
                s = "number" == typeof e.maxZoom ? Math.min(e.maxZoom, s) : s;
                var r = n.subtract(i).divideBy(2),
                    a = this.project(t.getSouthWest(), s),
                    h = this.project(t.getNorthEast(), s),
                    l = this.unproject(a.add(h).divideBy(2).add(r), s);
                return {
                    center: l,
                    zoom: s
                }
            },
            fitBounds: function(t, e) {
                if (t = o.latLngBounds(t), !t.isValid()) throw new Error("Bounds are not valid.");
                var i = this._getBoundsCenterZoom(t, e);
                return this.setView(i.center, i.zoom, e)
            },
            fitWorld: function(t) {
                return this.fitBounds([
                    [-90, -180],
                    [90, 180]
                ], t)
            },
            panTo: function(t, e) {
                return this.setView(t, this._zoom, {
                    pan: e
                })
            },
            panBy: function(t, e) {
                if (t = o.point(t).round(), e = e || {}, !t.x && !t.y) return this.fire("moveend");
                if (e.animate !== !0 && !this.getSize().contains(t)) return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
                if (this._panAnim || (this._panAnim = new o.PosAnimation, this._panAnim.on({
                        step: this._onPanTransitionStep,
                        end: this._onPanTransitionEnd
                    }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
                    o.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                    var i = this._getMapPanePos().subtract(t).round();
                    this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
                } else this._rawPanBy(t), this.fire("move").fire("moveend");
                return this
            },
            flyTo: function(t, e, n) {
                function s(t) {
                    var e = t ? -1 : 1,
                        i = t ? v : g,
                        n = v * v - g * g + e * L * L * y * y,
                        o = 2 * i * L * y,
                        s = n / o,
                        r = Math.sqrt(s * s + 1) - s,
                        a = r < 1e-9 ? -18 : Math.log(r);
                    return a
                }

                function r(t) {
                    return (Math.exp(t) - Math.exp(-t)) / 2
                }

                function a(t) {
                    return (Math.exp(t) + Math.exp(-t)) / 2
                }

                function h(t) {
                    return r(t) / a(t)
                }

                function l(t) {
                    return g * (a(x) / a(x + P * t))
                }

                function u(t) {
                    return g * (a(x) * h(x + P * t) - r(x)) / L
                }

                function c(t) {
                    return 1 - Math.pow(1 - t, 1.5)
                }

                function d() {
                    var i = (Date.now() - w) / T,
                        n = c(i) * b;
                    i <= 1 ? (this._flyToFrame = o.Util.requestAnimFrame(d, this), this._move(this.unproject(_.add(m.subtract(_).multiplyBy(u(n) / y)), f), this.getScaleZoom(g / l(n), f), {
                        flyTo: !0
                    })) : this._move(t, e)._moveEnd(!0)
                }
                if (n = n || {}, n.animate === !1 || !o.Browser.any3d) return this.setView(t, e, n);
                this._stop();
                var _ = this.project(this.getCenter()),
                    m = this.project(t),
                    p = this.getSize(),
                    f = this._zoom;
                t = o.latLng(t), e = e === i ? f : e;
                var g = Math.max(p.x, p.y),
                    v = g * this.getZoomScale(f, e),
                    y = m.distanceTo(_) || 1,
                    P = 1.42,
                    L = P * P,
                    x = s(0),
                    w = Date.now(),
                    b = (s(1) - x) / P,
                    T = n.duration ? 1e3 * n.duration : 1e3 * b * .8;
                return this._moveStart(!0), d.call(this), this
            },
            flyToBounds: function(t, e) {
                var i = this._getBoundsCenterZoom(t, e);
                return this.flyTo(i.center, i.zoom, e)
            },
            setMaxBounds: function(t) {
                return t = o.latLngBounds(t), t.isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this.off("moveend", this._panInsideMaxBounds))
            },
            setMinZoom: function(t) {
                return this.options.minZoom = t, this._loaded && this.getZoom() < this.options.minZoom ? this.setZoom(t) : this
            },
            setMaxZoom: function(t) {
                return this.options.maxZoom = t, this._loaded && this.getZoom() > this.options.maxZoom ? this.setZoom(t) : this
            },
            panInsideBounds: function(t, e) {
                this._enforcingBounds = !0;
                var i = this.getCenter(),
                    n = this._limitCenter(i, this._zoom, o.latLngBounds(t));
                return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this
            },
            invalidateSize: function(t) {
                if (!this._loaded) return this;
                t = o.extend({
                    animate: !1,
                    pan: !0
                }, t === !0 ? {
                    animate: !0
                } : t);
                var e = this.getSize();
                this._sizeChanged = !0, this._lastCenter = null;
                var i = this.getSize(),
                    n = e.divideBy(2).round(),
                    s = i.divideBy(2).round(),
                    r = n.subtract(s);
                return r.x || r.y ? (t.animate && t.pan ? this.panBy(r) : (t.pan && this._rawPanBy(r), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(o.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                    oldSize: e,
                    newSize: i
                })) : this
            },
            stop: function() {
                return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop()
            },
            locate: function(t) {
                if (t = this._locateOptions = o.extend({
                        timeout: 1e4,
                        watch: !1
                    }, t), !("geolocation" in navigator)) return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }), this;
                var e = o.bind(this._handleGeolocationResponse, this),
                    i = o.bind(this._handleGeolocationError, this);
                return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this
            },
            stopLocate: function() {
                return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
            },
            _handleGeolocationError: function(t) {
                var e = t.code,
                    i = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
                this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                    code: e,
                    message: "Geolocation error: " + i + "."
                })
            },
            _handleGeolocationResponse: function(t) {
                var e = t.coords.latitude,
                    i = t.coords.longitude,
                    n = new o.LatLng(e, i),
                    s = n.toBounds(t.coords.accuracy),
                    r = this._locateOptions;
                if (r.setView) {
                    var a = this.getBoundsZoom(s);
                    this.setView(n, r.maxZoom ? Math.min(a, r.maxZoom) : a)
                }
                var h = {
                    latlng: n,
                    bounds: s,
                    timestamp: t.timestamp
                };
                for (var l in t.coords) "number" == typeof t.coords[l] && (h[l] = t.coords[l]);
                this.fire("locationfound", h)
            },
            addHandler: function(t, e) {
                if (!e) return this;
                var i = this[t] = new e(this);
                return this._handlers.push(i), this.options[t] && i.enable(), this
            },
            remove: function() {
                if (this._initEvents(!0), this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");
                try {
                    delete this._container._leaflet_id, delete this._containerId
                } catch (t) {
                    this._container._leaflet_id = i, this._containerId = i
                }
                o.DomUtil.remove(this._mapPane), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this._loaded && this.fire("unload");
                for (var t in this._layers) this._layers[t].remove();
                return this
            },
            createPane: function(t, e) {
                var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""),
                    n = o.DomUtil.create("div", i, e || this._mapPane);
                return t && (this._panes[t] = n), n
            },
            getCenter: function() {
                return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
            },
            getZoom: function() {
                return this._zoom
            },
            getBounds: function() {
                var t = this.getPixelBounds(),
                    e = this.unproject(t.getBottomLeft()),
                    i = this.unproject(t.getTopRight());
                return new o.LatLngBounds(e, i)
            },
            getMinZoom: function() {
                return this.options.minZoom === i ? this._layersMinZoom || 0 : this.options.minZoom
            },
            getMaxZoom: function() {
                return this.options.maxZoom === i ? this._layersMaxZoom === i ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
            },
            getBoundsZoom: function(t, e, i) {
                t = o.latLngBounds(t), i = o.point(i || [0, 0]);
                var n = this.getZoom() || 0,
                    s = this.getMinZoom(),
                    r = this.getMaxZoom(),
                    a = t.getNorthWest(),
                    h = t.getSouthEast(),
                    l = this.getSize().subtract(i),
                    u = o.bounds(this.project(h, n), this.project(a, n)).getSize(),
                    c = o.Browser.any3d ? this.options.zoomSnap : 1,
                    d = Math.min(l.x / u.x, l.y / u.y);
                return n = this.getScaleZoom(d, n), c && (n = Math.round(n / (c / 100)) * (c / 100), n = e ? Math.ceil(n / c) * c : Math.floor(n / c) * c), Math.max(s, Math.min(r, n))
            },
            getSize: function() {
                return this._size && !this._sizeChanged || (this._size = new o.Point(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone()
            },
            getPixelBounds: function(t, e) {
                var i = this._getTopLeftPoint(t, e);
                return new o.Bounds(i, i.add(this.getSize()))
            },
            getPixelOrigin: function() {
                return this._checkIfLoaded(), this._pixelOrigin
            },
            getPixelWorldBounds: function(t) {
                return this.options.crs.getProjectedBounds(t === i ? this.getZoom() : t)
            },
            getPane: function(t) {
                return "string" == typeof t ? this._panes[t] : t
            },
            getPanes: function() {
                return this._panes
            },
            getContainer: function() {
                return this._container
            },
            getZoomScale: function(t, e) {
                var n = this.options.crs;
                return e = e === i ? this._zoom : e, n.scale(t) / n.scale(e)
            },
            getScaleZoom: function(t, e) {
                var n = this.options.crs;
                e = e === i ? this._zoom : e;
                var o = n.zoom(t * n.scale(e));
                return isNaN(o) ? 1 / 0 : o
            },
            project: function(t, e) {
                return e = e === i ? this._zoom : e, this.options.crs.latLngToPoint(o.latLng(t), e)
            },
            unproject: function(t, e) {
                return e = e === i ? this._zoom : e, this.options.crs.pointToLatLng(o.point(t), e)
            },
            layerPointToLatLng: function(t) {
                var e = o.point(t).add(this.getPixelOrigin());
                return this.unproject(e)
            },
            latLngToLayerPoint: function(t) {
                var e = this.project(o.latLng(t))._round();
                return e._subtract(this.getPixelOrigin())
            },
            wrapLatLng: function(t) {
                return this.options.crs.wrapLatLng(o.latLng(t))
            },
            wrapLatLngBounds: function(t) {
                return this.options.crs.wrapLatLngBounds(o.latLngBounds(t))
            },
            distance: function(t, e) {
                return this.options.crs.distance(o.latLng(t), o.latLng(e))
            },
            containerPointToLayerPoint: function(t) {
                return o.point(t).subtract(this._getMapPanePos())
            },
            layerPointToContainerPoint: function(t) {
                return o.point(t).add(this._getMapPanePos())
            },
            containerPointToLatLng: function(t) {
                var e = this.containerPointToLayerPoint(o.point(t));
                return this.layerPointToLatLng(e)
            },
            latLngToContainerPoint: function(t) {
                return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))
            },
            mouseEventToContainerPoint: function(t) {
                return o.DomEvent.getMousePosition(t, this._container)
            },
            mouseEventToLayerPoint: function(t) {
                return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
            },
            mouseEventToLatLng: function(t) {
                return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
            },
            _initContainer: function(t) {
                var e = this._container = o.DomUtil.get(t);
                if (!e) throw new Error("Map container not found.");
                if (e._leaflet_id) throw new Error("Map container is already initialized.");
                o.DomEvent.addListener(e, "scroll", this._onScroll, this), this._containerId = o.Util.stamp(e)
            },
            _initLayout: function() {
                var t = this._container;
                this._fadeAnimated = this.options.fadeAnimation && o.Browser.any3d, o.DomUtil.addClass(t, "leaflet-container" + (o.Browser.touch ? " leaflet-touch" : "") + (o.Browser.retina ? " leaflet-retina" : "") + (o.Browser.ielt9 ? " leaflet-oldie" : "") + (o.Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
                var e = o.DomUtil.getStyle(t, "position");
                "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
            },
            _initPanes: function() {
                var t = this._panes = {};
                this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0)), this.createPane("tilePane"), this.createPane("shadowPane"), this.createPane("overlayPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (o.DomUtil.addClass(t.markerPane, "leaflet-zoom-hide"), o.DomUtil.addClass(t.shadowPane, "leaflet-zoom-hide"))
            },
            _resetView: function(t, e) {
                o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0));
                var i = !this._loaded;
                this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
                var n = this._zoom !== e;
                this._moveStart(n)._move(t, e)._moveEnd(n), this.fire("viewreset"), i && this.fire("load")
            },
            _moveStart: function(t) {
                return t && this.fire("zoomstart"), this.fire("movestart")
            },
            _move: function(t, e, n) {
                e === i && (e = this._zoom);
                var o = this._zoom !== e;
                return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), (o || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)
            },
            _moveEnd: function(t) {
                return t && this.fire("zoomend"), this.fire("moveend")
            },
            _stop: function() {
                return o.Util.cancelAnimFrame(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
            },
            _rawPanBy: function(t) {
                o.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
            },
            _getZoomSpan: function() {
                return this.getMaxZoom() - this.getMinZoom()
            },
            _panInsideMaxBounds: function() {
                this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
            },
            _checkIfLoaded: function() {
                if (!this._loaded) throw new Error("Set map center and zoom first.")
            },
            _initEvents: function(e) {
                if (o.DomEvent) {
                    this._targets = {}, this._targets[o.stamp(this._container)] = this;
                    var i = e ? "off" : "on";
                    o.DomEvent[i](this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this), this.options.trackResize && o.DomEvent[i](t, "resize", this._onResize, this), o.Browser.any3d && this.options.transform3DLimit && this[i]("moveend", this._onMoveEnd)
                }
            },
            _onResize: function() {
                o.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = o.Util.requestAnimFrame(function() {
                    this.invalidateSize({
                        debounceMoveend: !0
                    })
                }, this)
            },
            _onScroll: function() {
                this._container.scrollTop = 0, this._container.scrollLeft = 0
            },
            _onMoveEnd: function() {
                var t = this._getMapPanePos();
                Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
            },
            _findEventTargets: function(t, e) {
                for (var i, n = [], s = "mouseout" === e || "mouseover" === e, r = t.target || t.srcElement, a = !1; r;) {
                    if (i = this._targets[o.stamp(r)], i && ("click" === e || "preclick" === e) && !t._simulated && this._draggableMoved(i)) {
                        a = !0;
                        break
                    }
                    if (i && i.listens(e, !0)) {
                        if (s && !o.DomEvent._isExternalTarget(r, t)) break;
                        if (n.push(i), s) break
                    }
                    if (r === this._container) break;
                    r = r.parentNode
                }
                return n.length || a || s || !o.DomEvent._isExternalTarget(r, t) || (n = [this]), n
            },
            _handleDOMEvent: function(t) {
                if (this._loaded && !o.DomEvent._skipped(t)) {
                    var e = "keypress" === t.type && 13 === t.keyCode ? "click" : t.type;
                    "mousedown" === e && o.DomUtil.preventOutline(t.target || t.srcElement), this._fireDOMEvent(t, e)
                }
            },
            _fireDOMEvent: function(t, e, i) {
                if ("click" === t.type) {
                    var n = o.Util.extend({}, t);
                    n.type = "preclick", this._fireDOMEvent(n, n.type, i)
                }
                if (!t._stopped && (i = (i || []).concat(this._findEventTargets(t, e)), i.length)) {
                    var s = i[0];
                    "contextmenu" === e && s.listens(e, !0) && o.DomEvent.preventDefault(t);
                    var r = {
                        originalEvent: t
                    };
                    if ("keypress" !== t.type) {
                        var a = s instanceof o.Marker;
                        r.containerPoint = a ? this.latLngToContainerPoint(s.getLatLng()) : this.mouseEventToContainerPoint(t), r.layerPoint = this.containerPointToLayerPoint(r.containerPoint), r.latlng = a ? s.getLatLng() : this.layerPointToLatLng(r.layerPoint)
                    }
                    for (var h = 0; h < i.length; h++)
                        if (i[h].fire(e, r, !0), r.originalEvent._stopped || i[h].options.nonBubblingEvents && o.Util.indexOf(i[h].options.nonBubblingEvents, e) !== -1) return
                }
            },
            _draggableMoved: function(t) {
                return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved()
            },
            _clearHandlers: function() {
                for (var t = 0, e = this._handlers.length; t < e; t++) this._handlers[t].disable()
            },
            whenReady: function(t, e) {
                return this._loaded ? t.call(e || this, {
                    target: this
                }) : this.on("load", t, e), this
            },
            _getMapPanePos: function() {
                return o.DomUtil.getPosition(this._mapPane) || new o.Point(0, 0)
            },
            _moved: function() {
                var t = this._getMapPanePos();
                return t && !t.equals([0, 0])
            },
            _getTopLeftPoint: function(t, e) {
                var n = t && e !== i ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin();
                return n.subtract(this._getMapPanePos())
            },
            _getNewPixelOrigin: function(t, e) {
                var i = this.getSize()._divideBy(2);
                return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round()
            },
            _latLngToNewLayerPoint: function(t, e, i) {
                var n = this._getNewPixelOrigin(i, e);
                return this.project(t, e)._subtract(n)
            },
            _latLngBoundsToNewLayerBounds: function(t, e, i) {
                var n = this._getNewPixelOrigin(i, e);
                return o.bounds([this.project(t.getSouthWest(), e)._subtract(n), this.project(t.getNorthWest(), e)._subtract(n), this.project(t.getSouthEast(), e)._subtract(n), this.project(t.getNorthEast(), e)._subtract(n)])
            },
            _getCenterLayerPoint: function() {
                return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
            },
            _getCenterOffset: function(t) {
                return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
            },
            _limitCenter: function(t, e, i) {
                if (!i) return t;
                var n = this.project(t, e),
                    s = this.getSize().divideBy(2),
                    r = new o.Bounds(n.subtract(s), n.add(s)),
                    a = this._getBoundsOffset(r, i, e);
                return a.round().equals([0, 0]) ? t : this.unproject(n.add(a), e)
            },
            _limitOffset: function(t, e) {
                if (!e) return t;
                var i = this.getPixelBounds(),
                    n = new o.Bounds(i.min.add(t), i.max.add(t));
                return t.add(this._getBoundsOffset(n, e))
            },
            _getBoundsOffset: function(t, e, i) {
                var n = o.bounds(this.project(e.getNorthEast(), i), this.project(e.getSouthWest(), i)),
                    s = n.min.subtract(t.min),
                    r = n.max.subtract(t.max),
                    a = this._rebound(s.x, -r.x),
                    h = this._rebound(s.y, -r.y);
                return new o.Point(a, h)
            },
            _rebound: function(t, e) {
                return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
            },
            _limitZoom: function(t) {
                var e = this.getMinZoom(),
                    i = this.getMaxZoom(),
                    n = o.Browser.any3d ? this.options.zoomSnap : 1;
                return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t))
            },
            _onPanTransitionStep: function() {
                this.fire("move")
            },
            _onPanTransitionEnd: function() {
                o.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
            },
            _tryAnimatedPan: function(t, e) {
                var i = this._getCenterOffset(t)._floor();
                return !((e && e.animate) !== !0 && !this.getSize().contains(i)) && (this.panBy(i, e), !0)
            },
            _createAnimProxy: function() {
                var t = this._proxy = o.DomUtil.create("div", "leaflet-proxy leaflet-zoom-animated");
                this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
                    var i = o.DomUtil.TRANSFORM,
                        n = t.style[i];
                    o.DomUtil.setTransform(t, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === t.style[i] && this._animatingZoom && this._onZoomTransitionEnd()
                }, this), this.on("load moveend", function() {
                    var e = this.getCenter(),
                        i = this.getZoom();
                    o.DomUtil.setTransform(t, this.project(e, i), this.getZoomScale(i, 1))
                }, this)
            },
            _catchTransitionEnd: function(t) {
                this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
            },
            _nothingToAnimate: function() {
                return !this._container.getElementsByClassName("leaflet-zoom-animated").length
            },
            _tryAnimatedZoom: function(t, e, i) {
                if (this._animatingZoom) return !0;
                if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold) return !1;
                var n = this.getZoomScale(e),
                    s = this._getCenterOffset(t)._divideBy(1 - 1 / n);
                return !(i.animate !== !0 && !this.getSize().contains(s)) && (o.Util.requestAnimFrame(function() {
                    this._moveStart(!0)._animateZoom(t, e, !0)
                }, this), !0)
            },
            _animateZoom: function(t, e, i, n) {
                i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, o.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
                    center: t,
                    zoom: e,
                    noUpdate: n
                }), setTimeout(o.bind(this._onZoomTransitionEnd, this), 250)
            },
            _onZoomTransitionEnd: function() {
                this._animatingZoom && (o.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom), o.Util.requestAnimFrame(function() {
                    this._moveEnd(!0)
                }, this))
            }
        }), o.map = function(t, e) {
            return new o.Map(t, e)
        }, o.Layer = o.Evented.extend({
            options: {
                pane: "overlayPane",
                nonBubblingEvents: [],
                attribution: null
            },
            addTo: function(t) {
                return t.addLayer(this), this
            },
            remove: function() {
                return this.removeFrom(this._map || this._mapToAdd)
            },
            removeFrom: function(t) {
                return t && t.removeLayer(this), this
            },
            getPane: function(t) {
                return this._map.getPane(t ? this.options[t] || t : this.options.pane)
            },
            addInteractiveTarget: function(t) {
                return this._map._targets[o.stamp(t)] = this, this
            },
            removeInteractiveTarget: function(t) {
                return delete this._map._targets[o.stamp(t)], this
            },
            getAttribution: function() {
                return this.options.attribution
            },
            _layerAdd: function(t) {
                var e = t.target;
                if (e.hasLayer(this)) {
                    if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
                        var i = this.getEvents();
                        e.on(i, this), this.once("remove", function() {
                            e.off(i, this)
                        }, this)
                    }
                    this.onAdd(e), this.getAttribution && e.attributionControl && e.attributionControl.addAttribution(this.getAttribution()), this.fire("add"), e.fire("layeradd", {
                        layer: this
                    })
                }
            }
        }), o.Map.include({
            addLayer: function(t) {
                var e = o.stamp(t);
                return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this)
            },
            removeLayer: function(t) {
                var e = o.stamp(t);
                return this._layers[e] ? (this._loaded && t.onRemove(this), t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()), delete this._layers[e], this._loaded && (this.fire("layerremove", {
                    layer: t
                }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this
            },
            hasLayer: function(t) {
                return !!t && o.stamp(t) in this._layers
            },
            eachLayer: function(t, e) {
                for (var i in this._layers) t.call(e, this._layers[i]);
                return this
            },
            _addLayers: function(t) {
                t = t ? o.Util.isArray(t) ? t : [t] : [];
                for (var e = 0, i = t.length; e < i; e++) this.addLayer(t[e])
            },
            _addZoomLimit: function(t) {
                !isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[o.stamp(t)] = t, this._updateZoomLevels())
            },
            _removeZoomLimit: function(t) {
                var e = o.stamp(t);
                this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels())
            },
            _updateZoomLevels: function() {
                var t = 1 / 0,
                    e = -(1 / 0),
                    n = this._getZoomSpan();
                for (var o in this._zoomBoundLayers) {
                    var s = this._zoomBoundLayers[o].options;
                    t = s.minZoom === i ? t : Math.min(t, s.minZoom), e = s.maxZoom === i ? e : Math.max(e, s.maxZoom)
                }
                this._layersMaxZoom = e === -(1 / 0) ? i : e, this._layersMinZoom = t === 1 / 0 ? i : t, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === i && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === i && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
            }
        });
    var r = "_leaflet_events";
    o.DomEvent = {
        on: function(t, e, i, n) {
            if ("object" == typeof e)
                for (var s in e) this._on(t, s, e[s], i);
            else {
                e = o.Util.splitWords(e);
                for (var r = 0, a = e.length; r < a; r++) this._on(t, e[r], i, n)
            }
            return this
        },
        off: function(t, e, i, n) {
            if ("object" == typeof e)
                for (var s in e) this._off(t, s, e[s], i);
            else {
                e = o.Util.splitWords(e);
                for (var r = 0, a = e.length; r < a; r++) this._off(t, e[r], i, n)
            }
            return this
        },
        _on: function(e, i, n, s) {
            var a = i + o.stamp(n) + (s ? "_" + o.stamp(s) : "");
            if (e[r] && e[r][a]) return this;
            var h = function(i) {
                    return n.call(s || e, i || t.event)
                },
                l = h;
            return o.Browser.pointer && 0 === i.indexOf("touch") ? this.addPointerListener(e, i, h, a) : !o.Browser.touch || "dblclick" !== i || !this.addDoubleTapListener || o.Browser.pointer && o.Browser.chrome ? "addEventListener" in e ? "mousewheel" === i ? e.addEventListener("onwheel" in e ? "wheel" : "mousewheel", h, !1) : "mouseenter" === i || "mouseleave" === i ? (h = function(i) {
                i = i || t.event, o.DomEvent._isExternalTarget(e, i) && l(i)
            }, e.addEventListener("mouseenter" === i ? "mouseover" : "mouseout", h, !1)) : ("click" === i && o.Browser.android && (h = function(t) {
                return o.DomEvent._filterClick(t, l)
            }), e.addEventListener(i, h, !1)) : "attachEvent" in e && e.attachEvent("on" + i, h) : this.addDoubleTapListener(e, h, a), e[r] = e[r] || {}, e[r][a] = h, this
        },
        _off: function(t, e, i, n) {
            var s = e + o.stamp(i) + (n ? "_" + o.stamp(n) : ""),
                a = t[r] && t[r][s];
            return a ? (o.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, s) : o.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, s) : "removeEventListener" in t ? "mousewheel" === e ? t.removeEventListener("onwheel" in t ? "wheel" : "mousewheel", a, !1) : t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, a, !1) : "detachEvent" in t && t.detachEvent("on" + e, a), t[r][s] = null, this) : this
        },
        stopPropagation: function(t) {
            return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, o.DomEvent._skipped(t), this
        },
        disableScrollPropagation: function(t) {
            return o.DomEvent.on(t, "mousewheel", o.DomEvent.stopPropagation)
        },
        disableClickPropagation: function(t) {
            var e = o.DomEvent.stopPropagation;
            return o.DomEvent.on(t, o.Draggable.START.join(" "), e), o.DomEvent.on(t, {
                click: o.DomEvent._fakeStop,
                dblclick: e
            })
        },
        preventDefault: function(t) {
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
        },
        stop: function(t) {
            return o.DomEvent.preventDefault(t).stopPropagation(t)
        },
        getMousePosition: function(t, e) {
            if (!e) return new o.Point(t.clientX, t.clientY);
            var i = e.getBoundingClientRect();
            return new o.Point(t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop)
        },
        _wheelPxFactor: o.Browser.win && o.Browser.chrome ? 2 : o.Browser.gecko ? t.devicePixelRatio : 1,
        getWheelDelta: function(t) {
            return o.Browser.edge ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / o.DomEvent._wheelPxFactor : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0
        },
        _skipEvents: {},
        _fakeStop: function(t) {
            o.DomEvent._skipEvents[t.type] = !0
        },
        _skipped: function(t) {
            var e = this._skipEvents[t.type];
            return this._skipEvents[t.type] = !1, e
        },
        _isExternalTarget: function(t, e) {
            var i = e.relatedTarget;
            if (!i) return !0;
            try {
                for (; i && i !== t;) i = i.parentNode
            } catch (t) {
                return !1
            }
            return i !== t
        },
        _filterClick: function(t, e) {
            var i = t.timeStamp || t.originalEvent && t.originalEvent.timeStamp,
                n = o.DomEvent._lastClick && i - o.DomEvent._lastClick;
            return n && n > 100 && n < 500 || t.target._simulatedClick && !t._simulated ? void o.DomEvent.stop(t) : (o.DomEvent._lastClick = i, void e(t))
        }
    }, o.DomEvent.addListener = o.DomEvent.on, o.DomEvent.removeListener = o.DomEvent.off, o.PosAnimation = o.Evented.extend({
        run: function(t, e, i, n) {
            this.stop(), this._el = t, this._inProgress = !0, this._duration = i || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = o.DomUtil.getPosition(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(!0), this._complete())
        },
        _animate: function() {
            this._animId = o.Util.requestAnimFrame(this._animate, this), this._step()
        },
        _step: function(t) {
            var e = +new Date - this._startTime,
                i = 1e3 * this._duration;
            e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete())
        },
        _runFrame: function(t, e) {
            var i = this._startPos.add(this._offset.multiplyBy(t));
            e && i._round(), o.DomUtil.setPosition(this._el, i), this.fire("step")
        },
        _complete: function() {
            o.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
        },
        _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower)
        }
    }), o.Projection.Mercator = {
        R: 6378137,
        R_MINOR: 6356752.314245179,
        bounds: o.bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
        project: function(t) {
            var e = Math.PI / 180,
                i = this.R,
                n = t.lat * e,
                s = this.R_MINOR / i,
                r = Math.sqrt(1 - s * s),
                a = r * Math.sin(n),
                h = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - a) / (1 + a), r / 2);
            return n = -i * Math.log(Math.max(h, 1e-10)), new o.Point(t.lng * e * i, n)
        },
        unproject: function(t) {
            for (var e, i = 180 / Math.PI, n = this.R, s = this.R_MINOR / n, r = Math.sqrt(1 - s * s), a = Math.exp(-t.y / n), h = Math.PI / 2 - 2 * Math.atan(a), l = 0, u = .1; l < 15 && Math.abs(u) > 1e-7; l++) e = r * Math.sin(h), e = Math.pow((1 - e) / (1 + e), r / 2), u = Math.PI / 2 - 2 * Math.atan(a * e) - h, h += u;
            return new o.LatLng(h * i, t.x * i / n)
        }
    }, o.CRS.EPSG3395 = o.extend({}, o.CRS.Earth, {
        code: "EPSG:3395",
        projection: o.Projection.Mercator,
        transformation: function() {
            var t = .5 / (Math.PI * o.Projection.Mercator.R);
            return new o.Transformation(t, .5, -t, .5)
        }()
    }), o.GridLayer = o.Layer.extend({
        options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: o.Browser.mobile,
            updateWhenZooming: !0,
            updateInterval: 200,
            zIndex: 1,
            bounds: null,
            minZoom: 0,
            maxZoom: i,
            noWrap: !1,
            pane: "tilePane",
            className: "",
            keepBuffer: 2
        },
        initialize: function(t) {
            o.setOptions(this, t)
        },
        onAdd: function() {
            this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView(), this._update()
        },
        beforeAdd: function(t) {
            t._addZoomLimit(this)
        },
        onRemove: function(t) {
            this._removeAllTiles(), o.DomUtil.remove(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = null
        },
        bringToFront: function() {
            return this._map && (o.DomUtil.toFront(this._container), this._setAutoZIndex(Math.max)), this
        },
        bringToBack: function() {
            return this._map && (o.DomUtil.toBack(this._container), this._setAutoZIndex(Math.min)), this
        },
        getContainer: function() {
            return this._container
        },
        setOpacity: function(t) {
            return this.options.opacity = t, this._updateOpacity(), this
        },
        setZIndex: function(t) {
            return this.options.zIndex = t, this._updateZIndex(), this
        },
        isLoading: function() {
            return this._loading
        },
        redraw: function() {
            return this._map && (this._removeAllTiles(), this._update()), this
        },
        getEvents: function() {
            var t = {
                viewprereset: this._invalidateAll,
                viewreset: this._resetView,
                zoom: this._resetView,
                moveend: this._onMoveEnd
            };
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = o.Util.throttle(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        },
        createTile: function() {
            return e.createElement("div")
        },
        getTileSize: function() {
            var t = this.options.tileSize;
            return t instanceof o.Point ? t : new o.Point(t, t)
        },
        _updateZIndex: function() {
            this._container && this.options.zIndex !== i && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function(t) {
            for (var e, i = this.getPane().children, n = -t(-(1 / 0), 1 / 0), o = 0, s = i.length; o < s; o++) e = i[o].style.zIndex, i[o] !== this._container && e && (n = t(n, +e));
            isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex())
        },
        _updateOpacity: function() {
            if (this._map && !o.Browser.ielt9) {
                o.DomUtil.setOpacity(this._container, this.options.opacity);
                var t = +new Date,
                    e = !1,
                    i = !1;
                for (var n in this._tiles) {
                    var s = this._tiles[n];
                    if (s.current && s.loaded) {
                        var r = Math.min(1, (t - s.loaded) / 200);
                        o.DomUtil.setOpacity(s.el, r), r < 1 ? e = !0 : (s.active && (i = !0), s.active = !0)
                    }
                }
                i && !this._noPrune && this._pruneTiles(), e && (o.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = o.Util.requestAnimFrame(this._updateOpacity, this))
            }
        },
        _initContainer: function() {
            this._container || (this._container = o.DomUtil.create("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container))
        },
        _updateLevels: function() {
            var t = this._tileZoom,
                e = this.options.maxZoom;
            if (t === i) return i;
            for (var n in this._levels) this._levels[n].el.children.length || n === t ? this._levels[n].el.style.zIndex = e - Math.abs(t - n) : (o.DomUtil.remove(this._levels[n].el), this._removeTilesAtZoom(n), delete this._levels[n]);
            var s = this._levels[t],
                r = this._map;
            return s || (s = this._levels[t] = {}, s.el = o.DomUtil.create("div", "leaflet-tile-container leaflet-zoom-animated", this._container), s.el.style.zIndex = e, s.origin = r.project(r.unproject(r.getPixelOrigin()), t).round(), s.zoom = t, this._setZoomTransform(s, r.getCenter(), r.getZoom()), o.Util.falseFn(s.el.offsetWidth)), this._level = s, s
        },
        _pruneTiles: function() {
            if (this._map) {
                var t, e, i = this._map.getZoom();
                if (i > this.options.maxZoom || i < this.options.minZoom) return void this._removeAllTiles();
                for (t in this._tiles) e = this._tiles[t], e.retain = e.current;
                for (t in this._tiles)
                    if (e = this._tiles[t], e.current && !e.active) {
                        var n = e.coords;
                        this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2)
                    }
                for (t in this._tiles) this._tiles[t].retain || this._removeTile(t)
            }
        },
        _removeTilesAtZoom: function(t) {
            for (var e in this._tiles) this._tiles[e].coords.z === t && this._removeTile(e)
        },
        _removeAllTiles: function() {
            for (var t in this._tiles) this._removeTile(t)
        },
        _invalidateAll: function() {
            for (var t in this._levels) o.DomUtil.remove(this._levels[t].el), delete this._levels[t];
            this._removeAllTiles(), this._tileZoom = null
        },
        _retainParent: function(t, e, i, n) {
            var s = Math.floor(t / 2),
                r = Math.floor(e / 2),
                a = i - 1,
                h = new o.Point(+s, +r);
            h.z = +a;
            var l = this._tileCoordsToKey(h),
                u = this._tiles[l];
            return u && u.active ? (u.retain = !0, !0) : (u && u.loaded && (u.retain = !0), a > n && this._retainParent(s, r, a, n))
        },
        _retainChildren: function(t, e, i, n) {
            for (var s = 2 * t; s < 2 * t + 2; s++)
                for (var r = 2 * e; r < 2 * e + 2; r++) {
                    var a = new o.Point(s, r);
                    a.z = i + 1;
                    var h = this._tileCoordsToKey(a),
                        l = this._tiles[h];
                    l && l.active ? l.retain = !0 : (l && l.loaded && (l.retain = !0), i + 1 < n && this._retainChildren(s, r, i + 1, n))
                }
        },
        _resetView: function(t) {
            var e = t && (t.pinch || t.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), e, e)
        },
        _animateZoom: function(t) {
            this._setView(t.center, t.zoom, !0, t.noUpdate)
        },
        _setView: function(t, e, n, o) {
            var s = Math.round(e);
            (this.options.maxZoom !== i && s > this.options.maxZoom || this.options.minZoom !== i && s < this.options.minZoom) && (s = i);
            var r = this.options.updateWhenZooming && s !== this._tileZoom;
            o && !r || (this._tileZoom = s, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), s !== i && this._update(t), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(t, e)
        },
        _setZoomTransforms: function(t, e) {
            for (var i in this._levels) this._setZoomTransform(this._levels[i], t, e)
        },
        _setZoomTransform: function(t, e, i) {
            var n = this._map.getZoomScale(i, t.zoom),
                s = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
            o.Browser.any3d ? o.DomUtil.setTransform(t.el, s, n) : o.DomUtil.setPosition(t.el, s)
        },
        _resetGrid: function() {
            var t = this._map,
                e = t.options.crs,
                i = this._tileSize = this.getTileSize(),
                n = this._tileZoom,
                o = this._map.getPixelWorldBounds(this._tileZoom);
            o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = e.wrapLng && !this.options.noWrap && [Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x), Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y)], this._wrapY = e.wrapLat && !this.options.noWrap && [Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x), Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y)]
        },
        _onMoveEnd: function() {
            this._map && !this._map._animatingZoom && this._update()
        },
        _getTiledPixelBounds: function(t) {
            var e = this._map,
                i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(),
                n = e.getZoomScale(i, this._tileZoom),
                s = e.project(t, this._tileZoom).floor(),
                r = e.getSize().divideBy(2 * n);
            return new o.Bounds(s.subtract(r), s.add(r))
        },
        _update: function(t) {
            var n = this._map;
            if (n) {
                var s = n.getZoom();
                if (t === i && (t = n.getCenter()), this._tileZoom !== i) {
                    var r = this._getTiledPixelBounds(t),
                        a = this._pxBoundsToTileRange(r),
                        h = a.getCenter(),
                        l = [],
                        u = this.options.keepBuffer,
                        c = new o.Bounds(a.getBottomLeft().subtract([u, -u]), a.getTopRight().add([u, -u]));
                    for (var d in this._tiles) {
                        var _ = this._tiles[d].coords;
                        _.z === this._tileZoom && c.contains(o.point(_.x, _.y)) || (this._tiles[d].current = !1)
                    }
                    if (Math.abs(s - this._tileZoom) > 1) return void this._setView(t, s);
                    for (var m = a.min.y; m <= a.max.y; m++)
                        for (var p = a.min.x; p <= a.max.x; p++) {
                            var f = new o.Point(p, m);
                            if (f.z = this._tileZoom, this._isValidTile(f)) {
                                var g = this._tiles[this._tileCoordsToKey(f)];
                                g ? g.current = !0 : l.push(f)
                            }
                        }
                    if (l.sort(function(t, e) {
                            return t.distanceTo(h) - e.distanceTo(h)
                        }), 0 !== l.length) {
                        this._loading || (this._loading = !0, this.fire("loading"));
                        var v = e.createDocumentFragment();
                        for (p = 0; p < l.length; p++) this._addTile(l[p], v);
                        this._level.el.appendChild(v)
                    }
                }
            }
        },
        _isValidTile: function(t) {
            var e = this._map.options.crs;
            if (!e.infinite) {
                var i = this._globalTileRange;
                if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y)) return !1
            }
            if (!this.options.bounds) return !0;
            var n = this._tileCoordsToBounds(t);
            return o.latLngBounds(this.options.bounds).overlaps(n)
        },
        _keyToBounds: function(t) {
            return this._tileCoordsToBounds(this._keyToTileCoords(t))
        },
        _tileCoordsToBounds: function(t) {
            var e = this._map,
                i = this.getTileSize(),
                n = t.scaleBy(i),
                s = n.add(i),
                r = e.unproject(n, t.z),
                a = e.unproject(s, t.z),
                h = new o.LatLngBounds(r, a);
            return this.options.noWrap || e.wrapLatLngBounds(h), h
        },
        _tileCoordsToKey: function(t) {
            return t.x + ":" + t.y + ":" + t.z
        },
        _keyToTileCoords: function(t) {
            var e = t.split(":"),
                i = new o.Point(+e[0], +e[1]);
            return i.z = +e[2], i
        },
        _removeTile: function(t) {
            var e = this._tiles[t];
            e && (o.DomUtil.remove(e.el), delete this._tiles[t], this.fire("tileunload", {
                tile: e.el,
                coords: this._keyToTileCoords(t)
            }))
        },
        _initTile: function(t) {
            o.DomUtil.addClass(t, "leaflet-tile");
            var e = this.getTileSize();
            t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = o.Util.falseFn, t.onmousemove = o.Util.falseFn, o.Browser.ielt9 && this.options.opacity < 1 && o.DomUtil.setOpacity(t, this.options.opacity), o.Browser.android && !o.Browser.android23 && (t.style.WebkitBackfaceVisibility = "hidden")
        },
        _addTile: function(t, e) {
            var i = this._getTilePos(t),
                n = this._tileCoordsToKey(t),
                s = this.createTile(this._wrapCoords(t), o.bind(this._tileReady, this, t));
            this._initTile(s), this.createTile.length < 2 && o.Util.requestAnimFrame(o.bind(this._tileReady, this, t, null, s)), o.DomUtil.setPosition(s, i), this._tiles[n] = {
                el: s,
                coords: t,
                current: !0
            }, e.appendChild(s), this.fire("tileloadstart", {
                tile: s,
                coords: t
            })
        },
        _tileReady: function(t, e, i) {
            if (this._map) {
                e && this.fire("tileerror", {
                    error: e,
                    tile: i,
                    coords: t
                });
                var n = this._tileCoordsToKey(t);
                i = this._tiles[n], i && (i.loaded = +new Date, this._map._fadeAnimated ? (o.DomUtil.setOpacity(i.el, 0), o.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = o.Util.requestAnimFrame(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (o.DomUtil.addClass(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
                    tile: i.el,
                    coords: t
                })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), o.Browser.ielt9 || !this._map._fadeAnimated ? o.Util.requestAnimFrame(this._pruneTiles, this) : setTimeout(o.bind(this._pruneTiles, this), 250)))
            }
        },
        _getTilePos: function(t) {
            return t.scaleBy(this.getTileSize()).subtract(this._level.origin)
        },
        _wrapCoords: function(t) {
            var e = new o.Point(this._wrapX ? o.Util.wrapNum(t.x, this._wrapX) : t.x, this._wrapY ? o.Util.wrapNum(t.y, this._wrapY) : t.y);
            return e.z = t.z, e
        },
        _pxBoundsToTileRange: function(t) {
            var e = this.getTileSize();
            return new o.Bounds(t.min.unscaleBy(e).floor(), t.max.unscaleBy(e).ceil().subtract([1, 1]))
        },
        _noTilesToLoad: function() {
            for (var t in this._tiles)
                if (!this._tiles[t].loaded) return !1;
            return !0
        }
    }), o.gridLayer = function(t) {
        return new o.GridLayer(t)
    }, o.TileLayer = o.GridLayer.extend({
        options: {
            minZoom: 0,
            maxZoom: 18,
            maxNativeZoom: null,
            minNativeZoom: null,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            tms: !1,
            zoomReverse: !1,
            detectRetina: !1,
            crossOrigin: !1
        },
        initialize: function(t, e) {
            this._url = t, e = o.setOptions(this, e), e.detectRetina && o.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom++) : (e.zoomOffset++, e.maxZoom--), e.minZoom = Math.max(0, e.minZoom)), "string" == typeof e.subdomains && (e.subdomains = e.subdomains.split("")), o.Browser.android || this.on("tileunload", this._onTileRemove)
        },
        setUrl: function(t, e) {
            return this._url = t, e || this.redraw(), this
        },
        createTile: function(t, i) {
            var n = e.createElement("img");
            return o.DomEvent.on(n, "load", o.bind(this._tileOnLoad, this, i, n)), o.DomEvent.on(n, "error", o.bind(this._tileOnError, this, i, n)), this.options.crossOrigin && (n.crossOrigin = ""), n.alt = "", n.setAttribute("role", "presentation"), n.src = this.getTileUrl(t), n
        },
        getTileUrl: function(t) {
            var e = {
                r: o.Browser.retina ? "@2x" : "",
                s: this._getSubdomain(t),
                x: t.x,
                y: t.y,
                z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
                var i = this._globalTileRange.max.y - t.y;
                this.options.tms && (e.y = i), e["-y"] = i
            }
            return o.Util.template(this._url, o.extend(e, this.options))
        },
        _tileOnLoad: function(t, e) {
            o.Browser.ielt9 ? setTimeout(o.bind(t, this, null, e), 0) : t(null, e)
        },
        _tileOnError: function(t, e, i) {
            var n = this.options.errorTileUrl;
            n && e.src !== n && (e.src = n), t(i, e)
        },
        getTileSize: function() {
            var t = this._map,
                e = o.GridLayer.prototype.getTileSize.call(this),
                i = this._tileZoom + this.options.zoomOffset,
                n = this.options.minNativeZoom,
                s = this.options.maxNativeZoom;
            return null !== n && i < n ? e.divideBy(t.getZoomScale(n, i)).round() : null !== s && i > s ? e.divideBy(t.getZoomScale(s, i)).round() : e
        },
        _onTileRemove: function(t) {
            t.tile.onload = null
        },
        _getZoomForUrl: function() {
            var t = this._tileZoom,
                e = this.options.maxZoom,
                i = this.options.zoomReverse,
                n = this.options.zoomOffset,
                o = this.options.minNativeZoom,
                s = this.options.maxNativeZoom;
            return i && (t = e - t), t += n, null !== o && t < o ? o : null !== s && t > s ? s : t
        },
        _getSubdomain: function(t) {
            var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
            return this.options.subdomains[e]
        },
        _abortLoading: function() {
            var t, e;
            for (t in this._tiles) this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = o.Util.falseFn, e.onerror = o.Util.falseFn, e.complete || (e.src = o.Util.emptyImageUrl, o.DomUtil.remove(e)))
        }
    }), o.tileLayer = function(t, e) {
        return new o.TileLayer(t, e)
    }, o.TileLayer.WMS = o.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1,
            version: "1.1.1"
        },
        options: {
            crs: null,
            uppercase: !1
        },
        initialize: function(t, e) {
            this._url = t;
            var i = o.extend({}, this.defaultWmsParams);
            for (var n in e) n in this.options || (i[n] = e[n]);
            e = o.setOptions(this, e), i.width = i.height = e.tileSize * (e.detectRetina && o.Browser.retina ? 2 : 1), this.wmsParams = i
        },
        onAdd: function(t) {
            this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
            var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[e] = this._crs.code, o.TileLayer.prototype.onAdd.call(this, t)
        },
        getTileUrl: function(t) {
            var e = this._tileCoordsToBounds(t),
                i = this._crs.project(e.getNorthWest()),
                n = this._crs.project(e.getSouthEast()),
                s = (this._wmsVersion >= 1.3 && this._crs === o.CRS.EPSG4326 ? [n.y, i.x, i.y, n.x] : [i.x, n.y, n.x, i.y]).join(","),
                r = o.TileLayer.prototype.getTileUrl.call(this, t);
            return r + o.Util.getParamString(this.wmsParams, r, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + s
        },
        setParams: function(t, e) {
            return o.extend(this.wmsParams, t), e || this.redraw(), this
        }
    }), o.tileLayer.wms = function(t, e) {
        return new o.TileLayer.WMS(t, e)
    }, o.ImageOverlay = o.Layer.extend({
        options: {
            opacity: 1,
            alt: "",
            interactive: !1,
            crossOrigin: !1
        },
        initialize: function(t, e, i) {
            this._url = t, this._bounds = o.latLngBounds(e), o.setOptions(this, i)
        },
        onAdd: function() {
            this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (o.DomUtil.addClass(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset()
        },
        onRemove: function() {
            o.DomUtil.remove(this._image), this.options.interactive && this.removeInteractiveTarget(this._image)
        },
        setOpacity: function(t) {
            return this.options.opacity = t, this._image && this._updateOpacity(), this
        },
        setStyle: function(t) {
            return t.opacity && this.setOpacity(t.opacity), this
        },
        bringToFront: function() {
            return this._map && o.DomUtil.toFront(this._image), this
        },
        bringToBack: function() {
            return this._map && o.DomUtil.toBack(this._image), this
        },
        setUrl: function(t) {
            return this._url = t, this._image && (this._image.src = t), this
        },
        setBounds: function(t) {
            return this._bounds = t, this._map && this._reset(), this
        },
        getEvents: function() {
            var t = {
                zoom: this._reset,
                viewreset: this._reset
            };
            return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        },
        getBounds: function() {
            return this._bounds
        },
        getElement: function() {
            return this._image
        },
        _initImage: function() {
            var t = this._image = o.DomUtil.create("img", "leaflet-image-layer " + (this._zoomAnimated ? "leaflet-zoom-animated" : ""));
            t.onselectstart = o.Util.falseFn, t.onmousemove = o.Util.falseFn, t.onload = o.bind(this.fire, this, "load"), this.options.crossOrigin && (t.crossOrigin = ""), t.src = this._url, t.alt = this.options.alt
        },
        _animateZoom: function(t) {
            var e = this._map.getZoomScale(t.zoom),
                i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
            o.DomUtil.setTransform(this._image, i, e)
        },
        _reset: function() {
            var t = this._image,
                e = new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
                i = e.getSize();
            o.DomUtil.setPosition(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px"
        },
        _updateOpacity: function() {
            o.DomUtil.setOpacity(this._image, this.options.opacity)
        }
    }), o.imageOverlay = function(t, e, i) {
        return new o.ImageOverlay(t, e, i)
    }, o.Icon = o.Class.extend({
        initialize: function(t) {
            o.setOptions(this, t)
        },
        createIcon: function(t) {
            return this._createIcon("icon", t)
        },
        createShadow: function(t) {
            return this._createIcon("shadow", t)
        },
        _createIcon: function(t, e) {
            var i = this._getIconUrl(t);
            if (!i) {
                if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            var n = this._createImg(i, e && "IMG" === e.tagName ? e : null);
            return this._setIconStyles(n, t), n
        },
        _setIconStyles: function(t, e) {
            var i = this.options,
                n = i[e + "Size"];
            "number" == typeof n && (n = [n, n]);
            var s = o.point(n),
                r = o.point("shadow" === e && i.shadowAnchor || i.iconAnchor || s && s.divideBy(2, !0));
            t.className = "leaflet-marker-" + e + " " + (i.className || ""), r && (t.style.marginLeft = -r.x + "px", t.style.marginTop = -r.y + "px"), s && (t.style.width = s.x + "px", t.style.height = s.y + "px")
        },
        _createImg: function(t, i) {
            return i = i || e.createElement("img"), i.src = t, i
        },
        _getIconUrl: function(t) {
            return o.Browser.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"]
        }
    }), o.icon = function(t) {
        return new o.Icon(t)
    }, o.Icon.Default = o.Icon.extend({
        options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        },
        _getIconUrl: function(t) {
            return o.Icon.Default.imagePath || (o.Icon.Default.imagePath = this._detectIconPath()), (this.options.imagePath || o.Icon.Default.imagePath) + o.Icon.prototype._getIconUrl.call(this, t)
        },
        _detectIconPath: function() {
            var t = o.DomUtil.create("div", "leaflet-default-icon-path", e.body),
                i = o.DomUtil.getStyle(t, "background-image") || o.DomUtil.getStyle(t, "backgroundImage");
            return e.body.removeChild(t), 0 === i.indexOf("url") ? i.replace(/^url\([\"\']?/, "").replace(/marker-icon\.png[\"\']?\)$/, "") : ""
        }
    }), o.Marker = o.Layer.extend({
        options: {
            icon: new o.Icon.Default,
            interactive: !0,
            draggable: !1,
            keyboard: !0,
            title: "",
            alt: "",
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250,
            pane: "markerPane",
            nonBubblingEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"]
        },
        initialize: function(t, e) {
            o.setOptions(this, e), this._latlng = o.latLng(t)
        },
        onAdd: function(t) {
            this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update()
        },
        onRemove: function(t) {
            this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow()
        },
        getEvents: function() {
            return {
                zoom: this.update,
                viewreset: this.update
            }
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(t) {
            var e = this._latlng;
            return this._latlng = o.latLng(t), this.update(), this.fire("move", {
                oldLatLng: e,
                latlng: this._latlng
            })
        },
        setZIndexOffset: function(t) {
            return this.options.zIndexOffset = t, this.update()
        },
        setIcon: function(t) {
            return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this
        },
        getElement: function() {
            return this._icon
        },
        update: function() {
            if (this._icon) {
                var t = this._map.latLngToLayerPoint(this._latlng).round();
                this._setPos(t)
            }
            return this
        },
        _initIcon: function() {
            var t = this.options,
                e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"),
                i = t.icon.createIcon(this._icon),
                n = !1;
            i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), t.alt && (i.alt = t.alt)), o.DomUtil.addClass(i, e), t.keyboard && (i.tabIndex = "0"), this._icon = i, t.riseOnHover && this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            var s = t.icon.createShadow(this._shadow),
                r = !1;
            s !== this._shadow && (this._removeShadow(), r = !0), s && (o.DomUtil.addClass(s, e), s.alt = ""), this._shadow = s, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), s && r && this.getPane("shadowPane").appendChild(this._shadow)
        },
        _removeIcon: function() {
            this.options.riseOnHover && this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            }), o.DomUtil.remove(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null
        },
        _removeShadow: function() {
            this._shadow && o.DomUtil.remove(this._shadow), this._shadow = null
        },
        _setPos: function(t) {
            o.DomUtil.setPosition(this._icon, t), this._shadow && o.DomUtil.setPosition(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
        },
        _updateZIndex: function(t) {
            this._icon.style.zIndex = this._zIndex + t
        },
        _animateZoom: function(t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
            this._setPos(e)
        },
        _initInteraction: function() {
            if (this.options.interactive && (o.DomUtil.addClass(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), o.Handler.MarkerDrag)) {
                var t = this.options.draggable;
                this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new o.Handler.MarkerDrag(this), t && this.dragging.enable()
            }
        },
        setOpacity: function(t) {
            return this.options.opacity = t, this._map && this._updateOpacity(), this
        },
        _updateOpacity: function() {
            var t = this.options.opacity;
            o.DomUtil.setOpacity(this._icon, t), this._shadow && o.DomUtil.setOpacity(this._shadow, t)
        },
        _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
        },
        _resetZIndex: function() {
            this._updateZIndex(0)
        },
        _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor || [0, 0]
        },
        _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor || [0, 0]
        }
    }), o.marker = function(t, e) {
        return new o.Marker(t, e)
    }, o.DivIcon = o.Icon.extend({
        options: {
            iconSize: [12, 12],
            html: !1,
            bgPos: null,
            className: "leaflet-div-icon"
        },
        createIcon: function(t) {
            var i = t && "DIV" === t.tagName ? t : e.createElement("div"),
                n = this.options;
            if (i.innerHTML = n.html !== !1 ? n.html : "", n.bgPos) {
                var s = o.point(n.bgPos);
                i.style.backgroundPosition = -s.x + "px " + -s.y + "px"
            }
            return this._setIconStyles(i, "icon"), i
        },
        createShadow: function() {
            return null
        }
    }), o.divIcon = function(t) {
        return new o.DivIcon(t)
    }, o.DivOverlay = o.Layer.extend({
        options: {
            offset: [0, 7],
            className: "",
            pane: "popupPane"
        },
        initialize: function(t, e) {
            o.setOptions(this, t), this._source = e
        },
        onAdd: function(t) {
            this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && o.DomUtil.setOpacity(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && o.DomUtil.setOpacity(this._container, 1), this.bringToFront()
        },
        onRemove: function(t) {
            t._fadeAnimated ? (o.DomUtil.setOpacity(this._container, 0), this._removeTimeout = setTimeout(o.bind(o.DomUtil.remove, o.DomUtil, this._container), 200)) : o.DomUtil.remove(this._container)
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(t) {
            return this._latlng = o.latLng(t), this._map && (this._updatePosition(), this._adjustPan()), this
        },
        getContent: function() {
            return this._content
        },
        setContent: function(t) {
            return this._content = t, this.update(), this
        },
        getElement: function() {
            return this._container
        },
        update: function() {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
        },
        getEvents: function() {
            var t = {
                zoom: this._updatePosition,
                viewreset: this._updatePosition
            };
            return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        },
        isOpen: function() {
            return !!this._map && this._map.hasLayer(this)
        },
        bringToFront: function() {
            return this._map && o.DomUtil.toFront(this._container), this
        },
        bringToBack: function() {
            return this._map && o.DomUtil.toBack(this._container), this
        },
        _updateContent: function() {
            if (this._content) {
                var t = this._contentNode,
                    e = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                if ("string" == typeof e) t.innerHTML = e;
                else {
                    for (; t.hasChildNodes();) t.removeChild(t.firstChild);
                    t.appendChild(e)
                }
                this.fire("contentupdate")
            }
        },
        _updatePosition: function() {
            if (this._map) {
                var t = this._map.latLngToLayerPoint(this._latlng),
                    e = o.point(this.options.offset),
                    i = this._getAnchor();
                this._zoomAnimated ? o.DomUtil.setPosition(this._container, t.add(i)) : e = e.add(t).add(i);
                var n = this._containerBottom = -e.y,
                    s = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
                this._container.style.bottom = n + "px", this._container.style.left = s + "px"
            }
        },
        _getAnchor: function() {
            return [0, 0]
        }
    }), o.Popup = o.DivOverlay.extend({
        options: {
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: !0,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: !1,
            closeButton: !0,
            autoClose: !0,
            className: ""
        },
        openOn: function(t) {
            return t.openPopup(this), this
        },
        onAdd: function(t) {
            o.DivOverlay.prototype.onAdd.call(this, t), t.fire("popupopen", {
                popup: this
            }), this._source && (this._source.fire("popupopen", {
                popup: this
            }, !0), this._source instanceof o.Path || this._source.on("preclick", o.DomEvent.stopPropagation))
        },
        onRemove: function(t) {
            o.DivOverlay.prototype.onRemove.call(this, t), t.fire("popupclose", {
                popup: this
            }), this._source && (this._source.fire("popupclose", {
                popup: this
            }, !0), this._source instanceof o.Path || this._source.off("preclick", o.DomEvent.stopPropagation))
        },
        getEvents: function() {
            var t = o.DivOverlay.prototype.getEvents.call(this);
            return ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
        },
        _close: function() {
            this._map && this._map.closePopup(this)
        },
        _initLayout: function() {
            var t = "leaflet-popup",
                e = this._container = o.DomUtil.create("div", t + " " + (this.options.className || "") + " leaflet-zoom-animated");
            if (this.options.closeButton) {
                var i = this._closeButton = o.DomUtil.create("a", t + "-close-button", e);
                i.href = "#close", i.innerHTML = "&#215;", o.DomEvent.on(i, "click", this._onCloseButtonClick, this)
            }
            var n = this._wrapper = o.DomUtil.create("div", t + "-content-wrapper", e);
            this._contentNode = o.DomUtil.create("div", t + "-content", n), o.DomEvent.disableClickPropagation(n).disableScrollPropagation(this._contentNode).on(n, "contextmenu", o.DomEvent.stopPropagation), this._tipContainer = o.DomUtil.create("div", t + "-tip-container", e), this._tip = o.DomUtil.create("div", t + "-tip", this._tipContainer)
        },
        _updateLayout: function() {
            var t = this._contentNode,
                e = t.style;
            e.width = "", e.whiteSpace = "nowrap";
            var i = t.offsetWidth;
            i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
            var n = t.offsetHeight,
                s = this.options.maxHeight,
                r = "leaflet-popup-scrolled";
            s && n > s ? (e.height = s + "px", o.DomUtil.addClass(t, r)) : o.DomUtil.removeClass(t, r), this._containerWidth = this._container.offsetWidth
        },
        _animateZoom: function(t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center),
                i = this._getAnchor();
            o.DomUtil.setPosition(this._container, e.add(i))
        },
        _adjustPan: function() {
            if (!(!this.options.autoPan || this._map._panAnim && this._map._panAnim._inProgress)) {
                var t = this._map,
                    e = parseInt(o.DomUtil.getStyle(this._container, "marginBottom"), 10) || 0,
                    i = this._container.offsetHeight + e,
                    n = this._containerWidth,
                    s = new o.Point(this._containerLeft, -i - this._containerBottom);
                s._add(o.DomUtil.getPosition(this._container));
                var r = t.layerPointToContainerPoint(s),
                    a = o.point(this.options.autoPanPadding),
                    h = o.point(this.options.autoPanPaddingTopLeft || a),
                    l = o.point(this.options.autoPanPaddingBottomRight || a),
                    u = t.getSize(),
                    c = 0,
                    d = 0;
                r.x + n + l.x > u.x && (c = r.x + n - u.x + l.x), r.x - c - h.x < 0 && (c = r.x - h.x), r.y + i + l.y > u.y && (d = r.y + i - u.y + l.y), r.y - d - h.y < 0 && (d = r.y - h.y), (c || d) && t.fire("autopanstart").panBy([c, d])
            }
        },
        _onCloseButtonClick: function(t) {
            this._close(), o.DomEvent.stop(t)
        },
        _getAnchor: function() {
            return o.point(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
        }
    }), o.popup = function(t, e) {
        return new o.Popup(t, e)
    }, o.Map.mergeOptions({
        closePopupOnClick: !0
    }), o.Map.include({
        openPopup: function(t, e, i) {
            return t instanceof o.Popup || (t = new o.Popup(i).setContent(t)), e && t.setLatLng(e), this.hasLayer(t) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(), this._popup = t, this.addLayer(t))
        },
        closePopup: function(t) {
            return t && t !== this._popup || (t = this._popup, this._popup = null), t && this.removeLayer(t), this
        }
    }), o.Layer.include({
        bindPopup: function(t, e) {
            return t instanceof o.Popup ? (o.setOptions(t, e), this._popup = t, t._source = this) : (this._popup && !e || (this._popup = new o.Popup(e, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !0), this
        },
        unbindPopup: function() {
            return this._popup && (this.off({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !1, this._popup = null), this
        },
        openPopup: function(t, e) {
            if (t instanceof o.Layer || (e = t, t = this), t instanceof o.FeatureGroup)
                for (var i in this._layers) {
                    t = this._layers[i];
                    break
                }
            return e || (e = t.getCenter ? t.getCenter() : t.getLatLng()), this._popup && this._map && (this._popup._source = t, this._popup.update(), this._map.openPopup(this._popup, e)), this
        },
        closePopup: function() {
            return this._popup && this._popup._close(), this
        },
        togglePopup: function(t) {
            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(t)), this
        },
        isPopupOpen: function() {
            return !!this._popup && this._popup.isOpen()
        },
        setPopupContent: function(t) {
            return this._popup && this._popup.setContent(t), this
        },
        getPopup: function() {
            return this._popup
        },
        _openPopup: function(t) {
            var e = t.layer || t.target;
            if (this._popup && this._map) return o.DomEvent.stop(t), e instanceof o.Path ? void this.openPopup(t.layer || t.target, t.latlng) : void(this._map.hasLayer(this._popup) && this._popup._source === e ? this.closePopup() : this.openPopup(e, t.latlng))
        },
        _movePopup: function(t) {
            this._popup.setLatLng(t.latlng)
        }
    }), o.Tooltip = o.DivOverlay.extend({
        options: {
            pane: "tooltipPane",
            offset: [0, 0],
            direction: "auto",
            permanent: !1,
            sticky: !1,
            interactive: !1,
            opacity: .9
        },
        onAdd: function(t) {
            o.DivOverlay.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", {
                tooltip: this
            }), this._source && this._source.fire("tooltipopen", {
                tooltip: this
            }, !0)
        },
        onRemove: function(t) {
            o.DivOverlay.prototype.onRemove.call(this, t), t.fire("tooltipclose", {
                tooltip: this
            }), this._source && this._source.fire("tooltipclose", {
                tooltip: this
            }, !0)
        },
        getEvents: function() {
            var t = o.DivOverlay.prototype.getEvents.call(this);
            return o.Browser.touch && !this.options.permanent && (t.preclick = this._close), t
        },
        _close: function() {
            this._map && this._map.closeTooltip(this)
        },
        _initLayout: function() {
            var t = "leaflet-tooltip",
                e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = o.DomUtil.create("div", e)
        },
        _updateLayout: function() {},
        _adjustPan: function() {},
        _setPosition: function(t) {
            var e = this._map,
                i = this._container,
                n = e.latLngToContainerPoint(e.getCenter()),
                s = e.layerPointToContainerPoint(t),
                r = this.options.direction,
                a = i.offsetWidth,
                h = i.offsetHeight,
                l = o.point(this.options.offset),
                u = this._getAnchor();
            "top" === r ? t = t.add(o.point(-a / 2 + l.x, -h + l.y + u.y, !0)) : "bottom" === r ? t = t.subtract(o.point(a / 2 - l.x, -l.y, !0)) : "center" === r ? t = t.subtract(o.point(a / 2 + l.x, h / 2 - u.y + l.y, !0)) : "right" === r || "auto" === r && s.x < n.x ? (r = "right", t = t.add(o.point(l.x + u.x, u.y - h / 2 + l.y, !0))) : (r = "left", t = t.subtract(o.point(a + u.x - l.x, h / 2 - u.y - l.y, !0))), o.DomUtil.removeClass(i, "leaflet-tooltip-right"), o.DomUtil.removeClass(i, "leaflet-tooltip-left"), o.DomUtil.removeClass(i, "leaflet-tooltip-top"), o.DomUtil.removeClass(i, "leaflet-tooltip-bottom"), o.DomUtil.addClass(i, "leaflet-tooltip-" + r), o.DomUtil.setPosition(i, t)
        },
        _updatePosition: function() {
            var t = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(t)
        },
        setOpacity: function(t) {
            this.options.opacity = t, this._container && o.DomUtil.setOpacity(this._container, t)
        },
        _animateZoom: function(t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
            this._setPosition(e)
        },
        _getAnchor: function() {
            return o.point(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
        }
    }), o.tooltip = function(t, e) {
        return new o.Tooltip(t, e)
    }, o.Map.include({
        openTooltip: function(t, e, i) {
            return t instanceof o.Tooltip || (t = new o.Tooltip(i).setContent(t)), e && t.setLatLng(e), this.hasLayer(t) ? this : this.addLayer(t)
        },
        closeTooltip: function(t) {
            return t && this.removeLayer(t), this
        }
    }), o.Layer.include({
        bindTooltip: function(t, e) {
            return t instanceof o.Tooltip ? (o.setOptions(t, e), this._tooltip = t, t._source = this) : (this._tooltip && !e || (this._tooltip = o.tooltip(e, this)), this._tooltip.setContent(t)), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this
        },
        unbindTooltip: function() {
            return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this
        },
        _initTooltipInteractions: function(t) {
            if (t || !this._tooltipHandlersAdded) {
                var e = t ? "off" : "on",
                    i = {
                        remove: this.closeTooltip,
                        move: this._moveTooltip
                    };
                this._tooltip.options.permanent ? i.add = this._openTooltip : (i.mouseover = this._openTooltip, i.mouseout = this.closeTooltip, this._tooltip.options.sticky && (i.mousemove = this._moveTooltip), o.Browser.touch && (i.click = this._openTooltip)), this[e](i), this._tooltipHandlersAdded = !t
            }
        },
        openTooltip: function(t, e) {
            if (t instanceof o.Layer || (e = t, t = this), t instanceof o.FeatureGroup)
                for (var i in this._layers) {
                    t = this._layers[i];
                    break
                }
            return e || (e = t.getCenter ? t.getCenter() : t.getLatLng()), this._tooltip && this._map && (this._tooltip._source = t, this._tooltip.update(), this._map.openTooltip(this._tooltip, e), this._tooltip.options.interactive && this._tooltip._container && (o.DomUtil.addClass(this._tooltip._container, "leaflet-clickable"), this.addInteractiveTarget(this._tooltip._container))), this
        },
        closeTooltip: function() {
            return this._tooltip && (this._tooltip._close(), this._tooltip.options.interactive && this._tooltip._container && (o.DomUtil.removeClass(this._tooltip._container, "leaflet-clickable"), this.removeInteractiveTarget(this._tooltip._container))), this
        },
        toggleTooltip: function(t) {
            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(t)), this
        },
        isTooltipOpen: function() {
            return this._tooltip.isOpen()
        },
        setTooltipContent: function(t) {
            return this._tooltip && this._tooltip.setContent(t), this
        },
        getTooltip: function() {
            return this._tooltip
        },
        _openTooltip: function(t) {
            var e = t.layer || t.target;
            this._tooltip && this._map && this.openTooltip(e, this._tooltip.options.sticky ? t.latlng : i)
        },
        _moveTooltip: function(t) {
            var e, i, n = t.latlng;
            this._tooltip.options.sticky && t.originalEvent && (e = this._map.mouseEventToContainerPoint(t.originalEvent), i = this._map.containerPointToLayerPoint(e), n = this._map.layerPointToLatLng(i)), this._tooltip.setLatLng(n)
        }
    }), o.LayerGroup = o.Layer.extend({
        initialize: function(t) {
            this._layers = {};
            var e, i;
            if (t)
                for (e = 0, i = t.length; e < i; e++) this.addLayer(t[e])
        },
        addLayer: function(t) {
            var e = this.getLayerId(t);
            return this._layers[e] = t, this._map && this._map.addLayer(t), this
        },
        removeLayer: function(t) {
            var e = t in this._layers ? t : this.getLayerId(t);
            return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this
        },
        hasLayer: function(t) {
            return !!t && (t in this._layers || this.getLayerId(t) in this._layers)
        },
        clearLayers: function() {
            for (var t in this._layers) this.removeLayer(this._layers[t]);
            return this
        },
        invoke: function(t) {
            var e, i, n = Array.prototype.slice.call(arguments, 1);
            for (e in this._layers) i = this._layers[e], i[t] && i[t].apply(i, n);
            return this
        },
        onAdd: function(t) {
            for (var e in this._layers) t.addLayer(this._layers[e])
        },
        onRemove: function(t) {
            for (var e in this._layers) t.removeLayer(this._layers[e])
        },
        eachLayer: function(t, e) {
            for (var i in this._layers) t.call(e, this._layers[i]);
            return this
        },
        getLayer: function(t) {
            return this._layers[t]
        },
        getLayers: function() {
            var t = [];
            for (var e in this._layers) t.push(this._layers[e]);
            return t
        },
        setZIndex: function(t) {
            return this.invoke("setZIndex", t)
        },
        getLayerId: function(t) {
            return o.stamp(t)
        }
    }), o.layerGroup = function(t) {
        return new o.LayerGroup(t)
    }, o.FeatureGroup = o.LayerGroup.extend({
        addLayer: function(t) {
            return this.hasLayer(t) ? this : (t.addEventParent(this), o.LayerGroup.prototype.addLayer.call(this, t), this.fire("layeradd", {
                layer: t
            }))
        },
        removeLayer: function(t) {
            return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), o.LayerGroup.prototype.removeLayer.call(this, t), this.fire("layerremove", {
                layer: t
            })) : this
        },
        setStyle: function(t) {
            return this.invoke("setStyle", t)
        },
        bringToFront: function() {
            return this.invoke("bringToFront")
        },
        bringToBack: function() {
            return this.invoke("bringToBack")
        },
        getBounds: function() {
            var t = new o.LatLngBounds;
            for (var e in this._layers) {
                var i = this._layers[e];
                t.extend(i.getBounds ? i.getBounds() : i.getLatLng())
            }
            return t
        }
    }), o.featureGroup = function(t) {
        return new o.FeatureGroup(t)
    }, o.Renderer = o.Layer.extend({
        options: {
            padding: .1
        },
        initialize: function(t) {
            o.setOptions(this, t), o.stamp(this), this._layers = this._layers || {}
        },
        onAdd: function() {
            this._container || (this._initContainer(), this._zoomAnimated && o.DomUtil.addClass(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this)
        },
        onRemove: function() {
            o.DomUtil.remove(this._container), this.off("update", this._updatePaths, this)
        },
        getEvents: function() {
            var t = {
                viewreset: this._reset,
                zoom: this._onZoom,
                moveend: this._update,
                zoomend: this._onZoomEnd
            };
            return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t
        },
        _onAnimZoom: function(t) {
            this._updateTransform(t.center, t.zoom)
        },
        _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom())
        },
        _updateTransform: function(t, e) {
            var i = this._map.getZoomScale(e, this._zoom),
                n = o.DomUtil.getPosition(this._container),
                s = this._map.getSize().multiplyBy(.5 + this.options.padding),
                r = this._map.project(this._center, e),
                a = this._map.project(t, e),
                h = a.subtract(r),
                l = s.multiplyBy(-i).add(n).add(s).subtract(h);
            o.Browser.any3d ? o.DomUtil.setTransform(this._container, l, i) : o.DomUtil.setPosition(this._container, l)
        },
        _reset: function() {
            this._update(), this._updateTransform(this._center, this._zoom);
            for (var t in this._layers) this._layers[t]._reset()
        },
        _onZoomEnd: function() {
            for (var t in this._layers) this._layers[t]._project()
        },
        _updatePaths: function() {
            for (var t in this._layers) this._layers[t]._update()
        },
        _update: function() {
            var t = this.options.padding,
                e = this._map.getSize(),
                i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
            this._bounds = new o.Bounds(i, i.add(e.multiplyBy(1 + 2 * t)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom()
        }
    }), o.Map.include({
        getRenderer: function(t) {
            var e = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
            return e || (e = this._renderer = this.options.preferCanvas && o.canvas() || o.svg()), this.hasLayer(e) || this.addLayer(e), e
        },
        _getPaneRenderer: function(t) {
            if ("overlayPane" === t || t === i) return !1;
            var e = this._paneRenderers[t];
            return e === i && (e = o.SVG && o.svg({
                pane: t
            }) || o.Canvas && o.canvas({
                pane: t
            }), this._paneRenderers[t] = e), e
        }
    }), o.Path = o.Layer.extend({
        options: {
            stroke: !0,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            fillRule: "evenodd",
            interactive: !0
        },
        beforeAdd: function(t) {
            this._renderer = t.getRenderer(this)
        },
        onAdd: function() {
            this._renderer._initPath(this), this._reset(), this._renderer._addPath(this)
        },
        onRemove: function() {
            this._renderer._removePath(this)
        },
        redraw: function() {
            return this._map && this._renderer._updatePath(this), this
        },
        setStyle: function(t) {
            return o.setOptions(this, t), this._renderer && this._renderer._updateStyle(this), this
        },
        bringToFront: function() {
            return this._renderer && this._renderer._bringToFront(this), this
        },
        bringToBack: function() {
            return this._renderer && this._renderer._bringToBack(this), this
        },
        getElement: function() {
            return this._path
        },
        _reset: function() {
            this._project(), this._update()
        },
        _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + (o.Browser.touch ? 10 : 0)
        }
    }), o.LineUtil = {
        simplify: function(t, e) {
            if (!e || !t.length) return t.slice();
            var i = e * e;
            return t = this._reducePoints(t, i), t = this._simplifyDP(t, i)
        },
        pointToSegmentDistance: function(t, e, i) {
            return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0))
        },
        closestPointOnSegment: function(t, e, i) {
            return this._sqClosestPointOnSegment(t, e, i)
        },
        _simplifyDP: function(t, e) {
            var n = t.length,
                o = typeof Uint8Array != i + "" ? Uint8Array : Array,
                s = new o(n);
            s[0] = s[n - 1] = 1, this._simplifyDPStep(t, s, e, 0, n - 1);
            var r, a = [];
            for (r = 0; r < n; r++) s[r] && a.push(t[r]);
            return a
        },
        _simplifyDPStep: function(t, e, i, n, o) {
            var s, r, a, h = 0;
            for (r = n + 1; r <= o - 1; r++) a = this._sqClosestPointOnSegment(t[r], t[n], t[o], !0), a > h && (s = r, h = a);
            h > i && (e[s] = 1, this._simplifyDPStep(t, e, i, n, s), this._simplifyDPStep(t, e, i, s, o))
        },
        _reducePoints: function(t, e) {
            for (var i = [t[0]], n = 1, o = 0, s = t.length; n < s; n++) this._sqDist(t[n], t[o]) > e && (i.push(t[n]), o = n);
            return o < s - 1 && i.push(t[s - 1]), i
        },
        clipSegment: function(t, e, i, n, o) {
            var s, r, a, h = n ? this._lastCode : this._getBitCode(t, i),
                l = this._getBitCode(e, i);
            for (this._lastCode = l;;) {
                if (!(h | l)) return [t, e];
                if (h & l) return !1;
                s = h || l, r = this._getEdgeIntersection(t, e, s, i, o), a = this._getBitCode(r, i), s === h ? (t = r, h = a) : (e = r, l = a)
            }
        },
        _getEdgeIntersection: function(t, e, i, n, s) {
            var r, a, h = e.x - t.x,
                l = e.y - t.y,
                u = n.min,
                c = n.max;
            return 8 & i ? (r = t.x + h * (c.y - t.y) / l, a = c.y) : 4 & i ? (r = t.x + h * (u.y - t.y) / l, a = u.y) : 2 & i ? (r = c.x, a = t.y + l * (c.x - t.x) / h) : 1 & i && (r = u.x, a = t.y + l * (u.x - t.x) / h), new o.Point(r, a, s)
        },
        _getBitCode: function(t, e) {
            var i = 0;
            return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i
        },
        _sqDist: function(t, e) {
            var i = e.x - t.x,
                n = e.y - t.y;
            return i * i + n * n
        },
        _sqClosestPointOnSegment: function(t, e, i, n) {
            var s, r = e.x,
                a = e.y,
                h = i.x - r,
                l = i.y - a,
                u = h * h + l * l;
            return u > 0 && (s = ((t.x - r) * h + (t.y - a) * l) / u, s > 1 ? (r = i.x, a = i.y) : s > 0 && (r += h * s, a += l * s)), h = t.x - r, l = t.y - a, n ? h * h + l * l : new o.Point(r, a)
        }
    }, o.Polyline = o.Path.extend({
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        initialize: function(t, e) {
            o.setOptions(this, e), this._setLatLngs(t)
        },
        getLatLngs: function() {
            return this._latlngs
        },
        setLatLngs: function(t) {
            return this._setLatLngs(t), this.redraw()
        },
        isEmpty: function() {
            return !this._latlngs.length
        },
        closestLayerPoint: function(t) {
            for (var e, i, n = 1 / 0, s = null, r = o.LineUtil._sqClosestPointOnSegment, a = 0, h = this._parts.length; a < h; a++)
                for (var l = this._parts[a], u = 1, c = l.length; u < c; u++) {
                    e = l[u - 1], i = l[u];
                    var d = r(t, e, i, !0);
                    d < n && (n = d, s = r(t, e, i))
                }
            return s && (s.distance = Math.sqrt(n)), s
        },
        getCenter: function() {
            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
            var t, e, i, n, o, s, r, a = this._rings[0],
                h = a.length;
            if (!h) return null;
            for (t = 0, e = 0; t < h - 1; t++) e += a[t].distanceTo(a[t + 1]) / 2;
            if (0 === e) return this._map.layerPointToLatLng(a[0]);
            for (t = 0, n = 0; t < h - 1; t++)
                if (o = a[t], s = a[t + 1], i = o.distanceTo(s), n += i, n > e) return r = (n - e) / i, this._map.layerPointToLatLng([s.x - r * (s.x - o.x), s.y - r * (s.y - o.y)])
        },
        getBounds: function() {
            return this._bounds
        },
        addLatLng: function(t, e) {
            return e = e || this._defaultShape(), t = o.latLng(t), e.push(t), this._bounds.extend(t), this.redraw()
        },
        _setLatLngs: function(t) {
            this._bounds = new o.LatLngBounds, this._latlngs = this._convertLatLngs(t)
        },
        _defaultShape: function() {
            return o.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0]
        },
        _convertLatLngs: function(t) {
            for (var e = [], i = o.Polyline._flat(t), n = 0, s = t.length; n < s; n++) i ? (e[n] = o.latLng(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
            return e
        },
        _project: function() {
            var t = new o.Bounds;
            this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t);
            var e = this._clickTolerance(),
                i = new o.Point(e, e);
            this._bounds.isValid() && t.isValid() && (t.min._subtract(i), t.max._add(i), this._pxBounds = t)
        },
        _projectLatlngs: function(t, e, i) {
            var n, s, r = t[0] instanceof o.LatLng,
                a = t.length;
            if (r) {
                for (s = [], n = 0; n < a; n++) s[n] = this._map.latLngToLayerPoint(t[n]), i.extend(s[n]);
                e.push(s)
            } else
                for (n = 0; n < a; n++) this._projectLatlngs(t[n], e, i)
        },
        _clipPoints: function() {
            var t = this._renderer._bounds;
            if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) {
                if (this.options.noClip) return void(this._parts = this._rings);
                var e, i, n, s, r, a, h, l = this._parts;
                for (e = 0, n = 0, s = this._rings.length; e < s; e++)
                    for (h = this._rings[e], i = 0, r = h.length; i < r - 1; i++) a = o.LineUtil.clipSegment(h[i], h[i + 1], t, i, !0), a && (l[n] = l[n] || [], l[n].push(a[0]), a[1] === h[i + 1] && i !== r - 2 || (l[n].push(a[1]), n++))
            }
        },
        _simplifyPoints: function() {
            for (var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length; i < n; i++) t[i] = o.LineUtil.simplify(t[i], e)
        },
        _update: function() {
            this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
        },
        _updatePath: function() {
            this._renderer._updatePoly(this)
        }
    }), o.polyline = function(t, e) {
        return new o.Polyline(t, e)
    }, o.Polyline._flat = function(t) {
        return !o.Util.isArray(t[0]) || "object" != typeof t[0][0] && "undefined" != typeof t[0][0]
    }, o.PolyUtil = {}, o.PolyUtil.clipPolygon = function(t, e, i) {
        var n, s, r, a, h, l, u, c, d, _ = [1, 4, 2, 8],
            m = o.LineUtil;
        for (s = 0, u = t.length; s < u; s++) t[s]._code = m._getBitCode(t[s], e);
        for (a = 0; a < 4; a++) {
            for (c = _[a], n = [], s = 0, u = t.length, r = u - 1; s < u; r = s++) h = t[s], l = t[r], h._code & c ? l._code & c || (d = m._getEdgeIntersection(l, h, c, e, i), d._code = m._getBitCode(d, e), n.push(d)) : (l._code & c && (d = m._getEdgeIntersection(l, h, c, e, i), d._code = m._getBitCode(d, e), n.push(d)), n.push(h));
            t = n
        }
        return t
    }, o.Polygon = o.Polyline.extend({
        options: {
            fill: !0
        },
        isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length
        },
        getCenter: function() {
            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
            var t, e, i, n, o, s, r, a, h, l = this._rings[0],
                u = l.length;
            if (!u) return null;
            for (s = r = a = 0, t = 0, e = u - 1; t < u; e = t++) i = l[t], n = l[e], o = i.y * n.x - n.y * i.x, r += (i.x + n.x) * o, a += (i.y + n.y) * o, s += 3 * o;
            return h = 0 === s ? l[0] : [r / s, a / s], this._map.layerPointToLatLng(h)
        },
        _convertLatLngs: function(t) {
            var e = o.Polyline.prototype._convertLatLngs.call(this, t),
                i = e.length;
            return i >= 2 && e[0] instanceof o.LatLng && e[0].equals(e[i - 1]) && e.pop(), e
        },
        _setLatLngs: function(t) {
            o.Polyline.prototype._setLatLngs.call(this, t), o.Polyline._flat(this._latlngs) && (this._latlngs = [this._latlngs])
        },
        _defaultShape: function() {
            return o.Polyline._flat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
        },
        _clipPoints: function() {
            var t = this._renderer._bounds,
                e = this.options.weight,
                i = new o.Point(e, e);
            if (t = new o.Bounds(t.min.subtract(i), t.max.add(i)), this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) {
                if (this.options.noClip) return void(this._parts = this._rings);
                for (var n, s = 0, r = this._rings.length; s < r; s++) n = o.PolyUtil.clipPolygon(this._rings[s], t, !0), n.length && this._parts.push(n)
            }
        },
        _updatePath: function() {
            this._renderer._updatePoly(this, !0)
        }
    }), o.polygon = function(t, e) {
        return new o.Polygon(t, e)
    }, o.Rectangle = o.Polygon.extend({
        initialize: function(t, e) {
            o.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
        },
        setBounds: function(t) {
            return this.setLatLngs(this._boundsToLatLngs(t))
        },
        _boundsToLatLngs: function(t) {
            return t = o.latLngBounds(t), [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
        }
    }), o.rectangle = function(t, e) {
        return new o.Rectangle(t, e)
    }, o.CircleMarker = o.Path.extend({
        options: {
            fill: !0,
            radius: 10
        },
        initialize: function(t, e) {
            o.setOptions(this, e), this._latlng = o.latLng(t), this._radius = this.options.radius
        },
        setLatLng: function(t) {
            return this._latlng = o.latLng(t), this.redraw(), this.fire("move", {
                latlng: this._latlng
            })
        },
        getLatLng: function() {
            return this._latlng
        },
        setRadius: function(t) {
            return this.options.radius = this._radius = t, this.redraw()
        },
        getRadius: function() {
            return this._radius
        },
        setStyle: function(t) {
            var e = t && t.radius || this._radius;
            return o.Path.prototype.setStyle.call(this, t), this.setRadius(e), this
        },
        _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds()
        },
        _updateBounds: function() {
            var t = this._radius,
                e = this._radiusY || t,
                i = this._clickTolerance(),
                n = [t + i, e + i];
            this._pxBounds = new o.Bounds(this._point.subtract(n), this._point.add(n))
        },
        _update: function() {
            this._map && this._updatePath()
        },
        _updatePath: function() {
            this._renderer._updateCircle(this)
        },
        _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
        }
    }), o.circleMarker = function(t, e) {
        return new o.CircleMarker(t, e)
    }, o.Circle = o.CircleMarker.extend({
        initialize: function(t, e, i) {
            if ("number" == typeof e && (e = o.extend({}, i, {
                    radius: e
                })), o.setOptions(this, e), this._latlng = o.latLng(t), isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
            this._mRadius = this.options.radius
        },
        setRadius: function(t) {
            return this._mRadius = t, this.redraw()
        },
        getRadius: function() {
            return this._mRadius
        },
        getBounds: function() {
            var t = [this._radius, this._radiusY || this._radius];
            return new o.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)));
        },
        setStyle: o.Path.prototype.setStyle,
        _project: function() {
            var t = this._latlng.lng,
                e = this._latlng.lat,
                i = this._map,
                n = i.options.crs;
            if (n.distance === o.CRS.Earth.distance) {
                var s = Math.PI / 180,
                    r = this._mRadius / o.CRS.Earth.R / s,
                    a = i.project([e + r, t]),
                    h = i.project([e - r, t]),
                    l = a.add(h).divideBy(2),
                    u = i.unproject(l).lat,
                    c = Math.acos((Math.cos(r * s) - Math.sin(e * s) * Math.sin(u * s)) / (Math.cos(e * s) * Math.cos(u * s))) / s;
                (isNaN(c) || 0 === c) && (c = r / Math.cos(Math.PI / 180 * e)), this._point = l.subtract(i.getPixelOrigin()), this._radius = isNaN(c) ? 0 : Math.max(Math.round(l.x - i.project([u, t - c]).x), 1), this._radiusY = Math.max(Math.round(l.y - a.y), 1)
            } else {
                var d = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
                this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(d).x
            }
            this._updateBounds()
        }
    }), o.circle = function(t, e, i) {
        return new o.Circle(t, e, i)
    }, o.SVG = o.Renderer.extend({
        getEvents: function() {
            var t = o.Renderer.prototype.getEvents.call(this);
            return t.zoomstart = this._onZoomStart, t
        },
        _initContainer: function() {
            this._container = o.SVG.create("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = o.SVG.create("g"), this._container.appendChild(this._rootGroup)
        },
        _onZoomStart: function() {
            this._update()
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                o.Renderer.prototype._update.call(this);
                var t = this._bounds,
                    e = t.getSize(),
                    i = this._container;
                this._svgSize && this._svgSize.equals(e) || (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), o.DomUtil.setPosition(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update")
            }
        },
        _initPath: function(t) {
            var e = t._path = o.SVG.create("path");
            t.options.className && o.DomUtil.addClass(e, t.options.className), t.options.interactive && o.DomUtil.addClass(e, "leaflet-interactive"), this._updateStyle(t), this._layers[o.stamp(t)] = t
        },
        _addPath: function(t) {
            this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path)
        },
        _removePath: function(t) {
            o.DomUtil.remove(t._path), t.removeInteractiveTarget(t._path), delete this._layers[o.stamp(t)]
        },
        _updatePath: function(t) {
            t._project(), t._update()
        },
        _updateStyle: function(t) {
            var e = t._path,
                i = t.options;
            e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"))
        },
        _updatePoly: function(t, e) {
            this._setPath(t, o.SVG.pointsToPath(t._parts, e))
        },
        _updateCircle: function(t) {
            var e = t._point,
                i = t._radius,
                n = t._radiusY || i,
                o = "a" + i + "," + n + " 0 1,0 ",
                s = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + o + 2 * i + ",0 " + o + 2 * -i + ",0 ";
            this._setPath(t, s)
        },
        _setPath: function(t, e) {
            t._path.setAttribute("d", e)
        },
        _bringToFront: function(t) {
            o.DomUtil.toFront(t._path)
        },
        _bringToBack: function(t) {
            o.DomUtil.toBack(t._path)
        }
    }), o.extend(o.SVG, {
        create: function(t) {
            return e.createElementNS("http://www.w3.org/2000/svg", t)
        },
        pointsToPath: function(t, e) {
            var i, n, s, r, a, h, l = "";
            for (i = 0, s = t.length; i < s; i++) {
                for (a = t[i], n = 0, r = a.length; n < r; n++) h = a[n], l += (n ? "L" : "M") + h.x + " " + h.y;
                l += e ? o.Browser.svg ? "z" : "x" : ""
            }
            return l || "M0 0"
        }
    }), o.Browser.svg = !(!e.createElementNS || !o.SVG.create("svg").createSVGRect), o.svg = function(t) {
        return o.Browser.svg || o.Browser.vml ? new o.SVG(t) : null
    }, o.Browser.vml = !o.Browser.svg && function() {
        try {
            var t = e.createElement("div");
            t.innerHTML = '<v:shape adj="1"/>';
            var i = t.firstChild;
            return i.style.behavior = "url(#default#VML)", i && "object" == typeof i.adj
        } catch (t) {
            return !1
        }
    }(), o.SVG.include(o.Browser.vml ? {
        _initContainer: function() {
            this._container = o.DomUtil.create("div", "leaflet-vml-container")
        },
        _update: function() {
            this._map._animatingZoom || (o.Renderer.prototype._update.call(this), this.fire("update"))
        },
        _initPath: function(t) {
            var e = t._container = o.SVG.create("shape");
            o.DomUtil.addClass(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = o.SVG.create("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[o.stamp(t)] = t
        },
        _addPath: function(t) {
            var e = t._container;
            this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e)
        },
        _removePath: function(t) {
            var e = t._container;
            o.DomUtil.remove(e), t.removeInteractiveTarget(e), delete this._layers[o.stamp(t)]
        },
        _updateStyle: function(t) {
            var e = t._stroke,
                i = t._fill,
                n = t.options,
                s = t._container;
            s.stroked = !!n.stroke, s.filled = !!n.fill, n.stroke ? (e || (e = t._stroke = o.SVG.create("stroke")), s.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = o.Util.isArray(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (s.removeChild(e), t._stroke = null), n.fill ? (i || (i = t._fill = o.SVG.create("fill")), s.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (s.removeChild(i), t._fill = null)
        },
        _updateCircle: function(t) {
            var e = t._point.round(),
                i = Math.round(t._radius),
                n = Math.round(t._radiusY || i);
            this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0,23592600")
        },
        _setPath: function(t, e) {
            t._path.v = e
        },
        _bringToFront: function(t) {
            o.DomUtil.toFront(t._container)
        },
        _bringToBack: function(t) {
            o.DomUtil.toBack(t._container)
        }
    } : {}), o.Browser.vml && (o.SVG.create = function() {
        try {
            return e.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                function(t) {
                    return e.createElement("<lvml:" + t + ' class="lvml">')
                }
        } catch (t) {
            return function(t) {
                return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
            }
        }
    }()), o.Canvas = o.Renderer.extend({
        getEvents: function() {
            var t = o.Renderer.prototype.getEvents.call(this);
            return t.viewprereset = this._onViewPreReset, t
        },
        _onViewPreReset: function() {
            this._postponeUpdatePaths = !0
        },
        onAdd: function() {
            o.Renderer.prototype.onAdd.call(this), this._draw()
        },
        _initContainer: function() {
            var t = this._container = e.createElement("canvas");
            o.DomEvent.on(t, "mousemove", o.Util.throttle(this._onMouseMove, 32, this), this).on(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this).on(t, "mouseout", this._handleMouseOut, this), this._ctx = t.getContext("2d")
        },
        _updatePaths: function() {
            if (!this._postponeUpdatePaths) {
                var t;
                this._redrawBounds = null;
                for (var e in this._layers) t = this._layers[e], t._update();
                this._redraw()
            }
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                this._drawnLayers = {}, o.Renderer.prototype._update.call(this);
                var t = this._bounds,
                    e = this._container,
                    i = t.getSize(),
                    n = o.Browser.retina ? 2 : 1;
                o.DomUtil.setPosition(e, t.min), e.width = n * i.x, e.height = n * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", o.Browser.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update")
            }
        },
        _reset: function() {
            o.Renderer.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths())
        },
        _initPath: function(t) {
            this._updateDashArray(t), this._layers[o.stamp(t)] = t;
            var e = t._order = {
                layer: t,
                prev: this._drawLast,
                next: null
            };
            this._drawLast && (this._drawLast.next = e), this._drawLast = e, this._drawFirst = this._drawFirst || this._drawLast
        },
        _addPath: function(t) {
            this._requestRedraw(t)
        },
        _removePath: function(t) {
            var e = t._order,
                i = e.next,
                n = e.prev;
            i ? i.prev = n : this._drawLast = n, n ? n.next = i : this._drawFirst = i, delete t._order, delete this._layers[o.stamp(t)], this._requestRedraw(t)
        },
        _updatePath: function(t) {
            this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t)
        },
        _updateStyle: function(t) {
            this._updateDashArray(t), this._requestRedraw(t)
        },
        _updateDashArray: function(t) {
            if (t.options.dashArray) {
                var e, i = t.options.dashArray.split(","),
                    n = [];
                for (e = 0; e < i.length; e++) n.push(Number(i[e]));
                t.options._dashArray = n
            }
        },
        _requestRedraw: function(t) {
            this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || o.Util.requestAnimFrame(this._redraw, this))
        },
        _extendRedrawBounds: function(t) {
            var e = (t.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new o.Bounds, this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]))
        },
        _redraw: function() {
            this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null
        },
        _clear: function() {
            var t = this._redrawBounds;
            if (t) {
                var e = t.getSize();
                this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y)
            } else this._ctx.clearRect(0, 0, this._container.width, this._container.height)
        },
        _draw: function() {
            var t, e = this._redrawBounds;
            if (this._ctx.save(), e) {
                var i = e.getSize();
                this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, i.x, i.y), this._ctx.clip()
            }
            this._drawing = !0;
            for (var n = this._drawFirst; n; n = n.next) t = n.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
            this._drawing = !1, this._ctx.restore()
        },
        _updatePoly: function(t, e) {
            if (this._drawing) {
                var i, n, o, s, r = t._parts,
                    a = r.length,
                    h = this._ctx;
                if (a) {
                    for (this._drawnLayers[t._leaflet_id] = t, h.beginPath(), h.setLineDash && h.setLineDash(t.options && t.options._dashArray || []), i = 0; i < a; i++) {
                        for (n = 0, o = r[i].length; n < o; n++) s = r[i][n], h[n ? "lineTo" : "moveTo"](s.x, s.y);
                        e && h.closePath()
                    }
                    this._fillStroke(h, t)
                }
            }
        },
        _updateCircle: function(t) {
            if (this._drawing && !t._empty()) {
                var e = t._point,
                    i = this._ctx,
                    n = t._radius,
                    o = (t._radiusY || n) / n;
                this._drawnLayers[t._leaflet_id] = t, 1 !== o && (i.save(), i.scale(1, o)), i.beginPath(), i.arc(e.x, e.y / o, n, 0, 2 * Math.PI, !1), 1 !== o && i.restore(), this._fillStroke(i, t)
            }
        },
        _fillStroke: function(t, e) {
            var i = e.options;
            i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && 0 !== i.weight && (t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke())
        },
        _onClick: function(t) {
            for (var e, i, n = this._map.mouseEventToLayerPoint(t), s = this._drawFirst; s; s = s.next) e = s.layer, e.options.interactive && e._containsPoint(n) && !this._map._draggableMoved(e) && (i = e);
            i && (o.DomEvent._fakeStop(t), this._fireEvent([i], t))
        },
        _onMouseMove: function(t) {
            if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                var e = this._map.mouseEventToLayerPoint(t);
                this._handleMouseHover(t, e)
            }
        },
        _handleMouseOut: function(t) {
            var e = this._hoveredLayer;
            e && (o.DomUtil.removeClass(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null)
        },
        _handleMouseHover: function(t, e) {
            for (var i, n, s = this._drawFirst; s; s = s.next) i = s.layer, i.options.interactive && i._containsPoint(e) && (n = i);
            n !== this._hoveredLayer && (this._handleMouseOut(t), n && (o.DomUtil.addClass(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._hoveredLayer && this._fireEvent([this._hoveredLayer], t)
        },
        _fireEvent: function(t, e, i) {
            this._map._fireDOMEvent(e, i || e.type, t)
        },
        _bringToFront: function(t) {
            var e = t._order,
                i = e.next,
                n = e.prev;
            i && (i.prev = n, n ? n.next = i : i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t))
        },
        _bringToBack: function(t) {
            var e = t._order,
                i = e.next,
                n = e.prev;
            n && (n.next = i, i ? i.prev = n : n && (this._drawLast = n), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t))
        }
    }), o.Browser.canvas = function() {
        return !!e.createElement("canvas").getContext
    }(), o.canvas = function(t) {
        return o.Browser.canvas ? new o.Canvas(t) : null
    }, o.Polyline.prototype._containsPoint = function(t, e) {
        var i, n, s, r, a, h, l = this._clickTolerance();
        if (!this._pxBounds.contains(t)) return !1;
        for (i = 0, r = this._parts.length; i < r; i++)
            for (h = this._parts[i], n = 0, a = h.length, s = a - 1; n < a; s = n++)
                if ((e || 0 !== n) && o.LineUtil.pointToSegmentDistance(t, h[s], h[n]) <= l) return !0;
        return !1
    }, o.Polygon.prototype._containsPoint = function(t) {
        var e, i, n, s, r, a, h, l, u = !1;
        if (!this._pxBounds.contains(t)) return !1;
        for (s = 0, h = this._parts.length; s < h; s++)
            for (e = this._parts[s], r = 0, l = e.length, a = l - 1; r < l; a = r++) i = e[r], n = e[a], i.y > t.y != n.y > t.y && t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x && (u = !u);
        return u || o.Polyline.prototype._containsPoint.call(this, t, !0)
    }, o.CircleMarker.prototype._containsPoint = function(t) {
        return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
    }, o.GeoJSON = o.FeatureGroup.extend({
        initialize: function(t, e) {
            o.setOptions(this, e), this._layers = {}, t && this.addData(t)
        },
        addData: function(t) {
            var e, i, n, s = o.Util.isArray(t) ? t : t.features;
            if (s) {
                for (e = 0, i = s.length; e < i; e++) n = s[e], (n.geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
                return this
            }
            var r = this.options;
            if (r.filter && !r.filter(t)) return this;
            var a = o.GeoJSON.geometryToLayer(t, r);
            return a ? (a.feature = o.GeoJSON.asFeature(t), a.defaultOptions = a.options, this.resetStyle(a), r.onEachFeature && r.onEachFeature(t, a), this.addLayer(a)) : this
        },
        resetStyle: function(t) {
            return t.options = o.Util.extend({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this
        },
        setStyle: function(t) {
            return this.eachLayer(function(e) {
                this._setLayerStyle(e, t)
            }, this)
        },
        _setLayerStyle: function(t, e) {
            "function" == typeof e && (e = e(t.feature)), t.setStyle && t.setStyle(e)
        }
    }), o.extend(o.GeoJSON, {
        geometryToLayer: function(t, e) {
            var i, n, s, r, a = "Feature" === t.type ? t.geometry : t,
                h = a ? a.coordinates : null,
                l = [],
                u = e && e.pointToLayer,
                c = e && e.coordsToLatLng || this.coordsToLatLng;
            if (!h && !a) return null;
            switch (a.type) {
                case "Point":
                    return i = c(h), u ? u(t, i) : new o.Marker(i);
                case "MultiPoint":
                    for (s = 0, r = h.length; s < r; s++) i = c(h[s]), l.push(u ? u(t, i) : new o.Marker(i));
                    return new o.FeatureGroup(l);
                case "LineString":
                case "MultiLineString":
                    return n = this.coordsToLatLngs(h, "LineString" === a.type ? 0 : 1, c), new o.Polyline(n, e);
                case "Polygon":
                case "MultiPolygon":
                    return n = this.coordsToLatLngs(h, "Polygon" === a.type ? 1 : 2, c), new o.Polygon(n, e);
                case "GeometryCollection":
                    for (s = 0, r = a.geometries.length; s < r; s++) {
                        var d = this.geometryToLayer({
                            geometry: a.geometries[s],
                            type: "Feature",
                            properties: t.properties
                        }, e);
                        d && l.push(d)
                    }
                    return new o.FeatureGroup(l);
                default:
                    throw new Error("Invalid GeoJSON object.")
            }
        },
        coordsToLatLng: function(t) {
            return new o.LatLng(t[1], t[0], t[2])
        },
        coordsToLatLngs: function(t, e, i) {
            for (var n, o = [], s = 0, r = t.length; s < r; s++) n = e ? this.coordsToLatLngs(t[s], e - 1, i) : (i || this.coordsToLatLng)(t[s]), o.push(n);
            return o
        },
        latLngToCoords: function(t) {
            return t.alt !== i ? [t.lng, t.lat, t.alt] : [t.lng, t.lat]
        },
        latLngsToCoords: function(t, e, i) {
            for (var n = [], s = 0, r = t.length; s < r; s++) n.push(e ? o.GeoJSON.latLngsToCoords(t[s], e - 1, i) : o.GeoJSON.latLngToCoords(t[s]));
            return !e && i && n.push(n[0]), n
        },
        getFeature: function(t, e) {
            return t.feature ? o.extend({}, t.feature, {
                geometry: e
            }) : o.GeoJSON.asFeature(e)
        },
        asFeature: function(t) {
            return "Feature" === t.type || "FeatureCollection" === t.type ? t : {
                type: "Feature",
                properties: {},
                geometry: t
            }
        }
    });
    var a = {
        toGeoJSON: function() {
            return o.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: o.GeoJSON.latLngToCoords(this.getLatLng())
            })
        }
    };
    o.Marker.include(a), o.Circle.include(a), o.CircleMarker.include(a), o.Polyline.prototype.toGeoJSON = function() {
        var t = !o.Polyline._flat(this._latlngs),
            e = o.GeoJSON.latLngsToCoords(this._latlngs, t ? 1 : 0);
        return o.GeoJSON.getFeature(this, {
            type: (t ? "Multi" : "") + "LineString",
            coordinates: e
        })
    }, o.Polygon.prototype.toGeoJSON = function() {
        var t = !o.Polyline._flat(this._latlngs),
            e = t && !o.Polyline._flat(this._latlngs[0]),
            i = o.GeoJSON.latLngsToCoords(this._latlngs, e ? 2 : t ? 1 : 0, !0);
        return t || (i = [i]), o.GeoJSON.getFeature(this, {
            type: (e ? "Multi" : "") + "Polygon",
            coordinates: i
        })
    }, o.LayerGroup.include({
        toMultiPoint: function() {
            var t = [];
            return this.eachLayer(function(e) {
                t.push(e.toGeoJSON().geometry.coordinates)
            }), o.GeoJSON.getFeature(this, {
                type: "MultiPoint",
                coordinates: t
            })
        },
        toGeoJSON: function() {
            var t = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === t) return this.toMultiPoint();
            var e = "GeometryCollection" === t,
                i = [];
            return this.eachLayer(function(t) {
                if (t.toGeoJSON) {
                    var n = t.toGeoJSON();
                    i.push(e ? n.geometry : o.GeoJSON.asFeature(n))
                }
            }), e ? o.GeoJSON.getFeature(this, {
                geometries: i,
                type: "GeometryCollection"
            }) : {
                type: "FeatureCollection",
                features: i
            }
        }
    }), o.geoJSON = function(t, e) {
        return new o.GeoJSON(t, e)
    }, o.geoJson = o.geoJSON, o.Draggable = o.Evented.extend({
        options: {
            clickTolerance: 3
        },
        statics: {
            START: o.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
            END: {
                mousedown: "mouseup",
                touchstart: "touchend",
                pointerdown: "touchend",
                MSPointerDown: "touchend"
            },
            MOVE: {
                mousedown: "mousemove",
                touchstart: "touchmove",
                pointerdown: "touchmove",
                MSPointerDown: "touchmove"
            }
        },
        initialize: function(t, e, i) {
            this._element = t, this._dragStartTarget = e || t, this._preventOutline = i
        },
        enable: function() {
            this._enabled || (o.DomEvent.on(this._dragStartTarget, o.Draggable.START.join(" "), this._onDown, this), this._enabled = !0)
        },
        disable: function() {
            this._enabled && (o.Draggable._dragging === this && this.finishDrag(), o.DomEvent.off(this._dragStartTarget, o.Draggable.START.join(" "), this._onDown, this), this._enabled = !1, this._moved = !1)
        },
        _onDown: function(t) {
            if (!t._simulated && this._enabled && (this._moved = !1, !o.DomUtil.hasClass(this._element, "leaflet-zoom-anim") && !(o.Draggable._dragging || t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || (o.Draggable._dragging = this, this._preventOutline && o.DomUtil.preventOutline(this._element), o.DomUtil.disableImageDrag(), o.DomUtil.disableTextSelection(), this._moving)))) {
                this.fire("down");
                var i = t.touches ? t.touches[0] : t;
                this._startPoint = new o.Point(i.clientX, i.clientY), o.DomEvent.on(e, o.Draggable.MOVE[t.type], this._onMove, this).on(e, o.Draggable.END[t.type], this._onUp, this)
            }
        },
        _onMove: function(i) {
            if (!i._simulated && this._enabled) {
                if (i.touches && i.touches.length > 1) return void(this._moved = !0);
                var n = i.touches && 1 === i.touches.length ? i.touches[0] : i,
                    s = new o.Point(n.clientX, n.clientY),
                    r = s.subtract(this._startPoint);
                (r.x || r.y) && (Math.abs(r.x) + Math.abs(r.y) < this.options.clickTolerance || (o.DomEvent.preventDefault(i), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = o.DomUtil.getPosition(this._element).subtract(r), o.DomUtil.addClass(e.body, "leaflet-dragging"), this._lastTarget = i.target || i.srcElement, t.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), o.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(r), this._moving = !0, o.Util.cancelAnimFrame(this._animRequest), this._lastEvent = i, this._animRequest = o.Util.requestAnimFrame(this._updatePosition, this, !0)))
            }
        },
        _updatePosition: function() {
            var t = {
                originalEvent: this._lastEvent
            };
            this.fire("predrag", t), o.DomUtil.setPosition(this._element, this._newPos), this.fire("drag", t)
        },
        _onUp: function(t) {
            !t._simulated && this._enabled && this.finishDrag()
        },
        finishDrag: function() {
            o.DomUtil.removeClass(e.body, "leaflet-dragging"), this._lastTarget && (o.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
            for (var t in o.Draggable.MOVE) o.DomEvent.off(e, o.Draggable.MOVE[t], this._onMove, this).off(e, o.Draggable.END[t], this._onUp, this);
            o.DomUtil.enableImageDrag(), o.DomUtil.enableTextSelection(), this._moved && this._moving && (o.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
                distance: this._newPos.distanceTo(this._startPos)
            })), this._moving = !1, o.Draggable._dragging = !1
        }
    }), o.Handler = o.Class.extend({
        initialize: function(t) {
            this._map = t
        },
        enable: function() {
            return this._enabled ? this : (this._enabled = !0, this.addHooks(), this)
        },
        disable: function() {
            return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this
        },
        enabled: function() {
            return !!this._enabled
        }
    }), o.Map.mergeOptions({
        dragging: !0,
        inertia: !o.Browser.android23,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
    }), o.Map.Drag = o.Handler.extend({
        addHooks: function() {
            if (!this._draggable) {
                var t = this._map;
                this._draggable = new o.Draggable(t._mapPane, t._container), this._draggable.on({
                    down: this._onDown,
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this))
            }
            o.DomUtil.addClass(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = []
        },
        removeHooks: function() {
            o.DomUtil.removeClass(this._map._container, "leaflet-grab"), o.DomUtil.removeClass(this._map._container, "leaflet-touch-drag"), this._draggable.disable()
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        moving: function() {
            return this._draggable && this._draggable._moving
        },
        _onDown: function() {
            this._map._stop()
        },
        _onDragStart: function() {
            var t = this._map;
            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var e = o.latLngBounds(this._map.options.maxBounds);
                this._offsetLimit = o.bounds(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
            } else this._offsetLimit = null;
            t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
        },
        _onDrag: function(t) {
            if (this._map.options.inertia) {
                var e = this._lastTime = +new Date,
                    i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(i), this._times.push(e), e - this._times[0] > 50 && (this._positions.shift(), this._times.shift())
            }
            this._map.fire("move", t).fire("drag", t)
        },
        _onZoomEnd: function() {
            var t = this._map.getSize().divideBy(2),
                e = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        },
        _viscousLimit: function(t, e) {
            return t - (t - e) * this._viscosity
        },
        _onPreDragLimit: function() {
            if (this._viscosity && this._offsetLimit) {
                var t = this._draggable._newPos.subtract(this._draggable._startPos),
                    e = this._offsetLimit;
                t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)), t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)), t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)), t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)), this._draggable._newPos = this._draggable._startPos.add(t)
            }
        },
        _onPreDragWrap: function() {
            var t = this._worldWidth,
                e = Math.round(t / 2),
                i = this._initialWorldOffset,
                n = this._draggable._newPos.x,
                o = (n - e + i) % t + e - i,
                s = (n + e + i) % t - e - i,
                r = Math.abs(o + i) < Math.abs(s + i) ? o : s;
            this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = r
        },
        _onDragEnd: function(t) {
            var e = this._map,
                i = e.options,
                n = !i.inertia || this._times.length < 2;
            if (e.fire("dragend", t), n) e.fire("moveend");
            else {
                var s = this._lastPos.subtract(this._positions[0]),
                    r = (this._lastTime - this._times[0]) / 1e3,
                    a = i.easeLinearity,
                    h = s.multiplyBy(a / r),
                    l = h.distanceTo([0, 0]),
                    u = Math.min(i.inertiaMaxSpeed, l),
                    c = h.multiplyBy(u / l),
                    d = u / (i.inertiaDeceleration * a),
                    _ = c.multiplyBy(-d / 2).round();
                _.x || _.y ? (_ = e._limitOffset(_, e.options.maxBounds), o.Util.requestAnimFrame(function() {
                    e.panBy(_, {
                        duration: d,
                        easeLinearity: a,
                        noMoveStart: !0,
                        animate: !0
                    })
                })) : e.fire("moveend")
            }
        }
    }), o.Map.addInitHook("addHandler", "dragging", o.Map.Drag), o.Map.mergeOptions({
        doubleClickZoom: !0
    }), o.Map.DoubleClickZoom = o.Handler.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function(t) {
            var e = this._map,
                i = e.getZoom(),
                n = e.options.zoomDelta,
                o = t.originalEvent.shiftKey ? i - n : i + n;
            "center" === e.options.doubleClickZoom ? e.setZoom(o) : e.setZoomAround(t.containerPoint, o)
        }
    }), o.Map.addInitHook("addHandler", "doubleClickZoom", o.Map.DoubleClickZoom), o.Map.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
    }), o.Map.ScrollWheelZoom = o.Handler.extend({
        addHooks: function() {
            o.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0
        },
        removeHooks: function() {
            o.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll, this)
        },
        _onWheelScroll: function(t) {
            var e = o.DomEvent.getWheelDelta(t),
                i = this._map.options.wheelDebounceTime;
            this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
            var n = Math.max(i - (+new Date - this._startTime), 0);
            clearTimeout(this._timer), this._timer = setTimeout(o.bind(this._performZoom, this), n), o.DomEvent.stop(t)
        },
        _performZoom: function() {
            var t = this._map,
                e = t.getZoom(),
                i = this._map.options.zoomSnap || 0;
            t._stop();
            var n = this._delta / (4 * this._map.options.wheelPxPerZoomLevel),
                o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2,
                s = i ? Math.ceil(o / i) * i : o,
                r = t._limitZoom(e + (this._delta > 0 ? s : -s)) - e;
            this._delta = 0, this._startTime = null, r && ("center" === t.options.scrollWheelZoom ? t.setZoom(e + r) : t.setZoomAround(this._lastMousePos, e + r))
        }
    }), o.Map.addInitHook("addHandler", "scrollWheelZoom", o.Map.ScrollWheelZoom), o.extend(o.DomEvent, {
        _touchstart: o.Browser.msPointer ? "MSPointerDown" : o.Browser.pointer ? "pointerdown" : "touchstart",
        _touchend: o.Browser.msPointer ? "MSPointerUp" : o.Browser.pointer ? "pointerup" : "touchend",
        addDoubleTapListener: function(t, e, i) {
            function n(t) {
                var e;
                if (o.Browser.pointer) {
                    if (!o.Browser.edge || "mouse" === t.pointerType) return;
                    e = o.DomEvent._pointersCount
                } else e = t.touches.length;
                if (!(e > 1)) {
                    var i = Date.now(),
                        n = i - (r || i);
                    a = t.touches ? t.touches[0] : t, h = n > 0 && n <= l, r = i
                }
            }

            function s(t) {
                if (h && !a.cancelBubble) {
                    if (o.Browser.pointer) {
                        if (!o.Browser.edge || "mouse" === t.pointerType) return;
                        var i, n, s = {};
                        for (n in a) i = a[n], s[n] = i && i.bind ? i.bind(a) : i;
                        a = s
                    }
                    a.type = "dblclick", e(a), r = null
                }
            }
            var r, a, h = !1,
                l = 250,
                u = "_leaflet_",
                c = this._touchstart,
                d = this._touchend;
            return t[u + c + i] = n, t[u + d + i] = s, t[u + "dblclick" + i] = e, t.addEventListener(c, n, !1), t.addEventListener(d, s, !1), t.addEventListener("dblclick", e, !1), this
        },
        removeDoubleTapListener: function(t, e) {
            var i = "_leaflet_",
                n = t[i + this._touchstart + e],
                s = t[i + this._touchend + e],
                r = t[i + "dblclick" + e];
            return t.removeEventListener(this._touchstart, n, !1), t.removeEventListener(this._touchend, s, !1), o.Browser.edge || t.removeEventListener("dblclick", r, !1), this
        }
    }), o.extend(o.DomEvent, {
        POINTER_DOWN: o.Browser.msPointer ? "MSPointerDown" : "pointerdown",
        POINTER_MOVE: o.Browser.msPointer ? "MSPointerMove" : "pointermove",
        POINTER_UP: o.Browser.msPointer ? "MSPointerUp" : "pointerup",
        POINTER_CANCEL: o.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
        TAG_WHITE_LIST: ["INPUT", "SELECT", "OPTION"],
        _pointers: {},
        _pointersCount: 0,
        addPointerListener: function(t, e, i, n) {
            return "touchstart" === e ? this._addPointerStart(t, i, n) : "touchmove" === e ? this._addPointerMove(t, i, n) : "touchend" === e && this._addPointerEnd(t, i, n), this
        },
        removePointerListener: function(t, e, i) {
            var n = t["_leaflet_" + e + i];
            return "touchstart" === e ? t.removeEventListener(this.POINTER_DOWN, n, !1) : "touchmove" === e ? t.removeEventListener(this.POINTER_MOVE, n, !1) : "touchend" === e && (t.removeEventListener(this.POINTER_UP, n, !1), t.removeEventListener(this.POINTER_CANCEL, n, !1)), this
        },
        _addPointerStart: function(t, i, n) {
            var s = o.bind(function(t) {
                if ("mouse" !== t.pointerType && t.MSPOINTER_TYPE_MOUSE && t.pointerType !== t.MSPOINTER_TYPE_MOUSE) {
                    if (!(this.TAG_WHITE_LIST.indexOf(t.target.tagName) < 0)) return;
                    o.DomEvent.preventDefault(t)
                }
                this._handlePointer(t, i)
            }, this);
            if (t["_leaflet_touchstart" + n] = s, t.addEventListener(this.POINTER_DOWN, s, !1), !this._pointerDocListener) {
                var r = o.bind(this._globalPointerUp, this);
                e.documentElement.addEventListener(this.POINTER_DOWN, o.bind(this._globalPointerDown, this), !0), e.documentElement.addEventListener(this.POINTER_MOVE, o.bind(this._globalPointerMove, this), !0), e.documentElement.addEventListener(this.POINTER_UP, r, !0), e.documentElement.addEventListener(this.POINTER_CANCEL, r, !0), this._pointerDocListener = !0
            }
        },
        _globalPointerDown: function(t) {
            this._pointers[t.pointerId] = t, this._pointersCount++
        },
        _globalPointerMove: function(t) {
            this._pointers[t.pointerId] && (this._pointers[t.pointerId] = t)
        },
        _globalPointerUp: function(t) {
            delete this._pointers[t.pointerId], this._pointersCount--
        },
        _handlePointer: function(t, e) {
            t.touches = [];
            for (var i in this._pointers) t.touches.push(this._pointers[i]);
            t.changedTouches = [t], e(t)
        },
        _addPointerMove: function(t, e, i) {
            var n = o.bind(function(t) {
                (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) && this._handlePointer(t, e)
            }, this);
            t["_leaflet_touchmove" + i] = n, t.addEventListener(this.POINTER_MOVE, n, !1)
        },
        _addPointerEnd: function(t, e, i) {
            var n = o.bind(function(t) {
                this._handlePointer(t, e)
            }, this);
            t["_leaflet_touchend" + i] = n, t.addEventListener(this.POINTER_UP, n, !1), t.addEventListener(this.POINTER_CANCEL, n, !1)
        }
    }), o.Map.mergeOptions({
        touchZoom: o.Browser.touch && !o.Browser.android23,
        bounceAtZoomLimits: !0
    }), o.Map.TouchZoom = o.Handler.extend({
        addHooks: function() {
            o.DomUtil.addClass(this._map._container, "leaflet-touch-zoom"), o.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function() {
            o.DomUtil.removeClass(this._map._container, "leaflet-touch-zoom"), o.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function(t) {
            var i = this._map;
            if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
                var n = i.mouseEventToContainerPoint(t.touches[0]),
                    s = i.mouseEventToContainerPoint(t.touches[1]);
                this._centerPoint = i.getSize()._divideBy(2), this._startLatLng = i.containerPointToLatLng(this._centerPoint), "center" !== i.options.touchZoom && (this._pinchStartLatLng = i.containerPointToLatLng(n.add(s)._divideBy(2))), this._startDist = n.distanceTo(s), this._startZoom = i.getZoom(), this._moved = !1, this._zooming = !0, i._stop(), o.DomEvent.on(e, "touchmove", this._onTouchMove, this).on(e, "touchend", this._onTouchEnd, this), o.DomEvent.preventDefault(t)
            }
        },
        _onTouchMove: function(t) {
            if (t.touches && 2 === t.touches.length && this._zooming) {
                var e = this._map,
                    i = e.mouseEventToContainerPoint(t.touches[0]),
                    n = e.mouseEventToContainerPoint(t.touches[1]),
                    s = i.distanceTo(n) / this._startDist;
                if (this._zoom = e.getScaleZoom(s, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && s < 1 || this._zoom > e.getMaxZoom() && s > 1) && (this._zoom = e._limitZoom(this._zoom)), "center" === e.options.touchZoom) {
                    if (this._center = this._startLatLng, 1 === s) return
                } else {
                    var r = i._add(n)._divideBy(2)._subtract(this._centerPoint);
                    if (1 === s && 0 === r.x && 0 === r.y) return;
                    this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(r), this._zoom)
                }
                this._moved || (e._moveStart(!0), this._moved = !0), o.Util.cancelAnimFrame(this._animRequest);
                var a = o.bind(e._move, e, this._center, this._zoom, {
                    pinch: !0,
                    round: !1
                });
                this._animRequest = o.Util.requestAnimFrame(a, this, !0), o.DomEvent.preventDefault(t)
            }
        },
        _onTouchEnd: function() {
            return this._moved && this._zooming ? (this._zooming = !1, o.Util.cancelAnimFrame(this._animRequest), o.DomEvent.off(e, "touchmove", this._onTouchMove).off(e, "touchend", this._onTouchEnd), void(this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom)))) : void(this._zooming = !1)
        }
    }), o.Map.addInitHook("addHandler", "touchZoom", o.Map.TouchZoom), o.Map.mergeOptions({
        tap: !0,
        tapTolerance: 15
    }), o.Map.Tap = o.Handler.extend({
        addHooks: function() {
            o.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function() {
            o.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function(t) {
            if (t.touches) {
                if (o.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
                var i = t.touches[0],
                    n = i.target;
                this._startPos = this._newPos = new o.Point(i.clientX, i.clientY), n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.addClass(n, "leaflet-active"), this._holdTimeout = setTimeout(o.bind(function() {
                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
                }, this), 1e3), this._simulateEvent("mousedown", i), o.DomEvent.on(e, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this)
            }
        },
        _onUp: function(t) {
            if (clearTimeout(this._holdTimeout), o.DomEvent.off(e, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this), this._fireClick && t && t.changedTouches) {
                var i = t.changedTouches[0],
                    n = i.target;
                n && n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.removeClass(n, "leaflet-active"), this._simulateEvent("mouseup", i), this._isTapValid() && this._simulateEvent("click", i)
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function(t) {
            var e = t.touches[0];
            this._newPos = new o.Point(e.clientX, e.clientY),
                this._simulateEvent("mousemove", e)
        },
        _simulateEvent: function(i, n) {
            var o = e.createEvent("MouseEvents");
            o._simulated = !0, n.target._simulatedClick = !0, o.initMouseEvent(i, !0, !0, t, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(o)
        }
    }), o.Browser.touch && !o.Browser.pointer && o.Map.addInitHook("addHandler", "tap", o.Map.Tap), o.Map.mergeOptions({
        boxZoom: !0
    }), o.Map.BoxZoom = o.Handler.extend({
        initialize: function(t) {
            this._map = t, this._container = t._container, this._pane = t._panes.overlayPane
        },
        addHooks: function() {
            o.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function() {
            o.DomEvent.off(this._container, "mousedown", this._onMouseDown, this)
        },
        moved: function() {
            return this._moved
        },
        _resetState: function() {
            this._moved = !1
        },
        _onMouseDown: function(t) {
            return !(!t.shiftKey || 1 !== t.which && 1 !== t.button) && (this._resetState(), o.DomUtil.disableTextSelection(), o.DomUtil.disableImageDrag(), this._startPoint = this._map.mouseEventToContainerPoint(t), void o.DomEvent.on(e, {
                contextmenu: o.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this))
        },
        _onMouseMove: function(t) {
            this._moved || (this._moved = !0, this._box = o.DomUtil.create("div", "leaflet-zoom-box", this._container), o.DomUtil.addClass(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
            var e = new o.Bounds(this._point, this._startPoint),
                i = e.getSize();
            o.DomUtil.setPosition(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px"
        },
        _finish: function() {
            this._moved && (o.DomUtil.remove(this._box), o.DomUtil.removeClass(this._container, "leaflet-crosshair")), o.DomUtil.enableTextSelection(), o.DomUtil.enableImageDrag(), o.DomEvent.off(e, {
                contextmenu: o.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseUp: function(t) {
            if ((1 === t.which || 1 === t.button) && (this._finish(), this._moved)) {
                setTimeout(o.bind(this._resetState, this), 0);
                var e = new o.LatLngBounds(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
                this._map.fitBounds(e).fire("boxzoomend", {
                    boxZoomBounds: e
                })
            }
        },
        _onKeyDown: function(t) {
            27 === t.keyCode && this._finish()
        }
    }), o.Map.addInitHook("addHandler", "boxZoom", o.Map.BoxZoom), o.Map.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
    }), o.Map.Keyboard = o.Handler.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
        },
        initialize: function(t) {
            this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta)
        },
        addHooks: function() {
            var t = this._map._container;
            t.tabIndex <= 0 && (t.tabIndex = "0"), o.DomEvent.on(t, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.on({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        removeHooks: function() {
            this._removeHooks(), o.DomEvent.off(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.off({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var i = e.body,
                    n = e.documentElement,
                    o = i.scrollTop || n.scrollTop,
                    s = i.scrollLeft || n.scrollLeft;
                this._map._container.focus(), t.scrollTo(s, o)
            }
        },
        _onFocus: function() {
            this._focused = !0, this._map.fire("focus")
        },
        _onBlur: function() {
            this._focused = !1, this._map.fire("blur")
        },
        _setPanDelta: function(t) {
            var e, i, n = this._panKeys = {},
                o = this.keyCodes;
            for (e = 0, i = o.left.length; e < i; e++) n[o.left[e]] = [-1 * t, 0];
            for (e = 0, i = o.right.length; e < i; e++) n[o.right[e]] = [t, 0];
            for (e = 0, i = o.down.length; e < i; e++) n[o.down[e]] = [0, t];
            for (e = 0, i = o.up.length; e < i; e++) n[o.up[e]] = [0, -1 * t]
        },
        _setZoomDelta: function(t) {
            var e, i, n = this._zoomKeys = {},
                o = this.keyCodes;
            for (e = 0, i = o.zoomIn.length; e < i; e++) n[o.zoomIn[e]] = t;
            for (e = 0, i = o.zoomOut.length; e < i; e++) n[o.zoomOut[e]] = -t
        },
        _addHooks: function() {
            o.DomEvent.on(e, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function() {
            o.DomEvent.off(e, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function(t) {
            if (!(t.altKey || t.ctrlKey || t.metaKey)) {
                var e, i = t.keyCode,
                    n = this._map;
                if (i in this._panKeys) {
                    if (n._panAnim && n._panAnim._inProgress) return;
                    e = this._panKeys[i], t.shiftKey && (e = o.point(e).multiplyBy(3)), n.panBy(e), n.options.maxBounds && n.panInsideBounds(n.options.maxBounds)
                } else if (i in this._zoomKeys) n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[i]);
                else {
                    if (27 !== i) return;
                    n.closePopup()
                }
                o.DomEvent.stop(t)
            }
        }
    }), o.Map.addInitHook("addHandler", "keyboard", o.Map.Keyboard), o.Handler.MarkerDrag = o.Handler.extend({
        initialize: function(t) {
            this._marker = t
        },
        addHooks: function() {
            var t = this._marker._icon;
            this._draggable || (this._draggable = new o.Draggable(t, t, !0)), this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).enable(), o.DomUtil.addClass(t, "leaflet-marker-draggable")
        },
        removeHooks: function() {
            this._draggable.off({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).disable(), this._marker._icon && o.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup().fire("movestart").fire("dragstart")
        },
        _onDrag: function(t) {
            var e = this._marker,
                i = e._shadow,
                n = o.DomUtil.getPosition(e._icon),
                s = e._map.layerPointToLatLng(n);
            i && o.DomUtil.setPosition(i, n), e._latlng = s, t.latlng = s, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t)
        },
        _onDragEnd: function(t) {
            delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t)
        }
    }), o.Control = o.Class.extend({
        options: {
            position: "topright"
        },
        initialize: function(t) {
            o.setOptions(this, t)
        },
        getPosition: function() {
            return this.options.position
        },
        setPosition: function(t) {
            var e = this._map;
            return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this
        },
        getContainer: function() {
            return this._container
        },
        addTo: function(t) {
            this.remove(), this._map = t;
            var e = this._container = this.onAdd(t),
                i = this.getPosition(),
                n = t._controlCorners[i];
            return o.DomUtil.addClass(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this
        },
        remove: function() {
            return this._map ? (o.DomUtil.remove(this._container), this.onRemove && this.onRemove(this._map), this._map = null, this) : this
        },
        _refocusOnMap: function(t) {
            this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus()
        }
    }), o.control = function(t) {
        return new o.Control(t)
    }, o.Map.include({
        addControl: function(t) {
            return t.addTo(this), this
        },
        removeControl: function(t) {
            return t.remove(), this
        },
        _initControlPos: function() {
            function t(t, s) {
                var r = i + t + " " + i + s;
                e[t + s] = o.DomUtil.create("div", r, n)
            }
            var e = this._controlCorners = {},
                i = "leaflet-",
                n = this._controlContainer = o.DomUtil.create("div", i + "control-container", this._container);
            t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
        },
        _clearControlPos: function() {
            o.DomUtil.remove(this._controlContainer)
        }
    }), o.Control.Zoom = o.Control.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "-",
            zoomOutTitle: "Zoom out"
        },
        onAdd: function(t) {
            var e = "leaflet-control-zoom",
                i = o.DomUtil.create("div", e + " leaflet-bar"),
                n = this.options;
            return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, e + "-in", i, this._zoomIn), this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, e + "-out", i, this._zoomOut), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i
        },
        onRemove: function(t) {
            t.off("zoomend zoomlevelschange", this._updateDisabled, this)
        },
        disable: function() {
            return this._disabled = !0, this._updateDisabled(), this
        },
        enable: function() {
            return this._disabled = !1, this._updateDisabled(), this
        },
        _zoomIn: function(t) {
            !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
        },
        _zoomOut: function(t) {
            !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
        },
        _createButton: function(t, e, i, n, s) {
            var r = o.DomUtil.create("a", i, n);
            return r.innerHTML = t, r.href = "#", r.title = e, r.setAttribute("role", "button"), r.setAttribute("aria-label", e), o.DomEvent.on(r, "mousedown dblclick", o.DomEvent.stopPropagation).on(r, "click", o.DomEvent.stop).on(r, "click", s, this).on(r, "click", this._refocusOnMap, this), r
        },
        _updateDisabled: function() {
            var t = this._map,
                e = "leaflet-disabled";
            o.DomUtil.removeClass(this._zoomInButton, e), o.DomUtil.removeClass(this._zoomOutButton, e), (this._disabled || t._zoom === t.getMinZoom()) && o.DomUtil.addClass(this._zoomOutButton, e), (this._disabled || t._zoom === t.getMaxZoom()) && o.DomUtil.addClass(this._zoomInButton, e)
        }
    }), o.Map.mergeOptions({
        zoomControl: !0
    }), o.Map.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new o.Control.Zoom, this.addControl(this.zoomControl))
    }), o.control.zoom = function(t) {
        return new o.Control.Zoom(t)
    }, o.Control.Attribution = o.Control.extend({
        options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
        },
        initialize: function(t) {
            o.setOptions(this, t), this._attributions = {}
        },
        onAdd: function(t) {
            t.attributionControl = this, this._container = o.DomUtil.create("div", "leaflet-control-attribution"), o.DomEvent && o.DomEvent.disableClickPropagation(this._container);
            for (var e in t._layers) t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
            return this._update(), this._container
        },
        setPrefix: function(t) {
            return this.options.prefix = t, this._update(), this
        },
        addAttribution: function(t) {
            return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this
        },
        removeAttribution: function(t) {
            return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this
        },
        _update: function() {
            if (this._map) {
                var t = [];
                for (var e in this._attributions) this._attributions[e] && t.push(e);
                var i = [];
                this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(" | ")
            }
        }
    }), o.Map.mergeOptions({
        attributionControl: !0
    }), o.Map.addInitHook(function() {
        this.options.attributionControl && (new o.Control.Attribution).addTo(this)
    }), o.control.attribution = function(t) {
        return new o.Control.Attribution(t)
    }, o.Control.Scale = o.Control.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0
        },
        onAdd: function(t) {
            var e = "leaflet-control-scale",
                i = o.DomUtil.create("div", e),
                n = this.options;
            return this._addScales(n, e + "-line", i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i
        },
        onRemove: function(t) {
            t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function(t, e, i) {
            t.metric && (this._mScale = o.DomUtil.create("div", e, i)), t.imperial && (this._iScale = o.DomUtil.create("div", e, i))
        },
        _update: function() {
            var t = this._map,
                e = t.getSize().y / 2,
                i = t.distance(t.containerPointToLatLng([0, e]), t.containerPointToLatLng([this.options.maxWidth, e]));
            this._updateScales(i)
        },
        _updateScales: function(t) {
            this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t)
        },
        _updateMetric: function(t) {
            var e = this._getRoundNum(t),
                i = e < 1e3 ? e + " m" : e / 1e3 + " km";
            this._updateScale(this._mScale, i, e / t)
        },
        _updateImperial: function(t) {
            var e, i, n, o = 3.2808399 * t;
            o > 5280 ? (e = o / 5280, i = this._getRoundNum(e), this._updateScale(this._iScale, i + " mi", i / e)) : (n = this._getRoundNum(o), this._updateScale(this._iScale, n + " ft", n / o))
        },
        _updateScale: function(t, e, i) {
            t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e
        },
        _getRoundNum: function(t) {
            var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                i = t / e;
            return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i
        }
    }), o.control.scale = function(t) {
        return new o.Control.Scale(t)
    }, o.Control.Layers = o.Control.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function(t, e, i, n) {
                return i < n ? -1 : n < i ? 1 : 0
            }
        },
        initialize: function(t, e, i) {
            o.setOptions(this, i), this._layers = [], this._lastZIndex = 0, this._handlingClick = !1;
            for (var n in t) this._addLayer(t[n], n);
            for (n in e) this._addLayer(e[n], n, !0)
        },
        onAdd: function(t) {
            return this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this), this._container
        },
        onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.off("add remove", this._onLayerChange, this)
        },
        addBaseLayer: function(t, e) {
            return this._addLayer(t, e), this._map ? this._update() : this
        },
        addOverlay: function(t, e) {
            return this._addLayer(t, e, !0), this._map ? this._update() : this
        },
        removeLayer: function(t) {
            t.off("add remove", this._onLayerChange, this);
            var e = this._getLayer(o.stamp(t));
            return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this
        },
        expand: function() {
            o.DomUtil.addClass(this._container, "leaflet-control-layers-expanded"), this._form.style.height = null;
            var t = this._map.getSize().y - (this._container.offsetTop + 50);
            return t < this._form.clientHeight ? (o.DomUtil.addClass(this._form, "leaflet-control-layers-scrollbar"), this._form.style.height = t + "px") : o.DomUtil.removeClass(this._form, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this
        },
        collapse: function() {
            return o.DomUtil.removeClass(this._container, "leaflet-control-layers-expanded"), this
        },
        _initLayout: function() {
            var t = "leaflet-control-layers",
                e = this._container = o.DomUtil.create("div", t),
                i = this.options.collapsed;
            e.setAttribute("aria-haspopup", !0), o.DomEvent.disableClickPropagation(e), o.Browser.touch || o.DomEvent.disableScrollPropagation(e);
            var n = this._form = o.DomUtil.create("form", t + "-list");
            i && (this._map.on("click", this.collapse, this), o.Browser.android || o.DomEvent.on(e, {
                mouseenter: this.expand,
                mouseleave: this.collapse
            }, this));
            var s = this._layersLink = o.DomUtil.create("a", t + "-toggle", e);
            s.href = "#", s.title = "Layers", o.Browser.touch ? o.DomEvent.on(s, "click", o.DomEvent.stop).on(s, "click", this.expand, this) : o.DomEvent.on(s, "focus", this.expand, this), o.DomEvent.on(n, "click", function() {
                setTimeout(o.bind(this._onInputClick, this), 0)
            }, this), i || this.expand(), this._baseLayersList = o.DomUtil.create("div", t + "-base", n), this._separator = o.DomUtil.create("div", t + "-separator", n), this._overlaysList = o.DomUtil.create("div", t + "-overlays", n), e.appendChild(n)
        },
        _getLayer: function(t) {
            for (var e = 0; e < this._layers.length; e++)
                if (this._layers[e] && o.stamp(this._layers[e].layer) === t) return this._layers[e]
        },
        _addLayer: function(t, e, i) {
            t.on("add remove", this._onLayerChange, this), this._layers.push({
                layer: t,
                name: e,
                overlay: i
            }), this.options.sortLayers && this._layers.sort(o.bind(function(t, e) {
                return this.options.sortFunction(t.layer, e.layer, t.name, e.name)
            }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
        },
        _update: function() {
            if (!this._container) return this;
            o.DomUtil.empty(this._baseLayersList), o.DomUtil.empty(this._overlaysList);
            var t, e, i, n, s = 0;
            for (i = 0; i < this._layers.length; i++) n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay, s += n.overlay ? 0 : 1;
            return this.options.hideSingleBase && (t = t && s > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this
        },
        _onLayerChange: function(t) {
            this._handlingClick || this._update();
            var e = this._getLayer(o.stamp(t.target)),
                i = e.overlay ? "add" === t.type ? "overlayadd" : "overlayremove" : "add" === t.type ? "baselayerchange" : null;
            i && this._map.fire(i, e)
        },
        _createRadioElement: function(t, i) {
            var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (i ? ' checked="checked"' : "") + "/>",
                o = e.createElement("div");
            return o.innerHTML = n, o.firstChild
        },
        _addItem: function(t) {
            var i, n = e.createElement("label"),
                s = this._map.hasLayer(t.layer);
            t.overlay ? (i = e.createElement("input"), i.type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = s) : i = this._createRadioElement("leaflet-base-layers", s), i.layerId = o.stamp(t.layer), o.DomEvent.on(i, "click", this._onInputClick, this);
            var r = e.createElement("span");
            r.innerHTML = " " + t.name;
            var a = e.createElement("div");
            n.appendChild(a), a.appendChild(i), a.appendChild(r);
            var h = t.overlay ? this._overlaysList : this._baseLayersList;
            return h.appendChild(n), this._checkDisabledLayers(), n
        },
        _onInputClick: function() {
            var t, e, i, n = this._form.getElementsByTagName("input"),
                o = [],
                s = [];
            this._handlingClick = !0;
            for (var r = n.length - 1; r >= 0; r--) t = n[r], e = this._getLayer(t.layerId).layer, i = this._map.hasLayer(e), t.checked && !i ? o.push(e) : !t.checked && i && s.push(e);
            for (r = 0; r < s.length; r++) this._map.removeLayer(s[r]);
            for (r = 0; r < o.length; r++) this._map.addLayer(o[r]);
            this._handlingClick = !1, this._refocusOnMap()
        },
        _checkDisabledLayers: function() {
            for (var t, e, n = this._form.getElementsByTagName("input"), o = this._map.getZoom(), s = n.length - 1; s >= 0; s--) t = n[s], e = this._getLayer(t.layerId).layer, t.disabled = e.options.minZoom !== i && o < e.options.minZoom || e.options.maxZoom !== i && o > e.options.maxZoom
        },
        _expand: function() {
            return this.expand()
        },
        _collapse: function() {
            return this.collapse()
        }
    }), o.control.layers = function(t, e, i) {
        return new o.Control.Layers(t, e, i)
    }
}(window, document);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("./util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClusterLayerStore = function () {
  function ClusterLayerStore(group) {
    _classCallCheck(this, ClusterLayerStore);

    this._layers = {};
    this._group = group;
  }

  _createClass(ClusterLayerStore, [{
    key: "add",
    value: function add(layer, id) {
      if (typeof id !== "undefined" && id !== null) {
        if (this._layers[id]) {
          this._group.removeLayer(this._layers[id]);
        }
        this._layers[id] = layer;
      }
      this._group.addLayer(layer);
    }
  }, {
    key: "remove",
    value: function remove(id) {
      if (typeof id === "undefined" || id === null) {
        return;
      }

      id = (0, _util.asArray)(id);
      for (var i = 0; i < id.length; i++) {
        if (this._layers[id[i]]) {
          this._group.removeLayer(this._layers[id[i]]);
          delete this._layers[id[i]];
        }
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this._layers = {};
      this._group.clearLayers();
    }
  }]);

  return ClusterLayerStore;
}();

exports.default = ClusterLayerStore;


},{"./util":15}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControlStore = function () {
  function ControlStore(map) {
    _classCallCheck(this, ControlStore);

    this._controlsNoId = [];
    this._controlsById = {};
    this._map = map;
  }

  _createClass(ControlStore, [{
    key: "add",
    value: function add(control, id, html) {
      if (typeof id !== "undefined" && id !== null) {
        if (this._controlsById[id]) {
          this._map.removeControl(this._controlsById[id]);
        }
        this._controlsById[id] = control;
      } else {
        this._controlsNoId.push(control);
      }
      this._map.addControl(control);
    }
  }, {
    key: "remove",
    value: function remove(id) {
      if (this._controlsById[id]) {
        var control = this._controlsById[id];
        this._map.removeControl(control);
        delete this._controlsById[id];
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      for (var i = 0; i < this._controlsNoId.length; i++) {
        var control = this._controlsNoId[i];
        this._map.removeControl(control);
      }
      this._controlsNoId = [];

      for (var key in this._controlsById) {
        var _control = this._controlsById[key];
        this._map.removeControl(_control);
      }
      this._controlsById = {};
    }
  }]);

  return ControlStore;
}();

exports.default = ControlStore;


},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCRS = getCRS;

var _leaflet = require("./global/leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

var _proj4leaflet = require("./global/proj4leaflet");

var _proj4leaflet2 = _interopRequireDefault(_proj4leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper function to instanciate a ICRS instance.
function getCRS(crsOptions) {
  var crs = _leaflet2.default.CRS.EPSG3857; // Default Spherical Mercator

  switch (crsOptions.crsClass) {
    case "L.CRS.EPSG3857":
      crs = _leaflet2.default.CRS.EPSG3857;
      break;
    case "L.CRS.EPSG4326":
      crs = _leaflet2.default.CRS.EPSG4326;
      break;
    case "L.CRS.EPSG3395":
      crs = _leaflet2.default.CRS.EPSG3395;
      break;
    case "L.CRS.Simple":
      crs = _leaflet2.default.CRS.Simple;
      break;
    case "L.Proj.CRS":
      if (crsOptions.options && crsOptions.options.bounds) {
        crsOptions.options.bounds = _leaflet2.default.bounds(crsOptions.options.bounds);
      }
      if (crsOptions.options && crsOptions.options.transformation) {
        crsOptions.options.transformation = _leaflet2.default.Transformation(crsOptions.options.transformation[0], crsOptions.options.transformation[1], crsOptions.options.transformation[2], crsOptions.options.transformation[3]);
      }
      crs = new _proj4leaflet2.default.CRS(crsOptions.code, crsOptions.proj4def, crsOptions.options);
      break;
    case "L.Proj.CRS.TMS":
      if (crsOptions.options && crsOptions.options.bounds) {
        crsOptions.options.bounds = _leaflet2.default.bounds(crsOptions.options.bounds);
      }
      if (crsOptions.options && crsOptions.options.transformation) {
        crsOptions.options.transformation = _leaflet2.default.Transformation(crsOptions.options.transformation[0], crsOptions.options.transformation[1], crsOptions.options.transformation[2], crsOptions.options.transformation[3]);
      }
      crs = new _proj4leaflet2.default.CRS.TMS(crsOptions.code, crsOptions.proj4def, crsOptions.projectedBounds, crsOptions.options);
      break;
  }
  return crs;
}


},{"./global/leaflet":8,"./global/proj4leaflet":9}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("./util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataFrame = function () {
  function DataFrame() {
    _classCallCheck(this, DataFrame);

    this.columns = [];
    this.colnames = [];
    this.colstrict = [];

    this.effectiveLength = 0;
    this.colindices = {};
  }

  _createClass(DataFrame, [{
    key: "_updateCachedProperties",
    value: function _updateCachedProperties() {
      var _this = this;

      this.effectiveLength = 0;
      this.colindices = {};

      this.columns.forEach(function (column, i) {
        _this.effectiveLength = Math.max(_this.effectiveLength, column.length);
        _this.colindices[_this.colnames[i]] = i;
      });
    }
  }, {
    key: "_colIndex",
    value: function _colIndex(colname) {
      var index = this.colindices[colname];
      if (typeof index === "undefined") return -1;
      return index;
    }
  }, {
    key: "col",
    value: function col(name, values, strict) {
      if (typeof name !== "string") throw new Error("Invalid column name \"" + name + "\"");

      var index = this._colIndex(name);

      if (arguments.length === 1) {
        if (index < 0) return null;else return (0, _util.recycle)(this.columns[index], this.effectiveLength);
      }

      if (index < 0) {
        index = this.colnames.length;
        this.colnames.push(name);
      }
      this.columns[index] = (0, _util.asArray)(values);
      this.colstrict[index] = !!strict;

      // TODO: Validate strictness (ensure lengths match up with other stricts)

      this._updateCachedProperties();

      return this;
    }
  }, {
    key: "cbind",
    value: function cbind(obj, strict) {
      var _this2 = this;

      Object.keys(obj).forEach(function (name) {
        var coldata = obj[name];
        _this2.col(name, coldata);
      });
      return this;
    }
  }, {
    key: "get",
    value: function get(row, col, missingOK) {
      var _this3 = this;

      if (row > this.effectiveLength) throw new Error("Row argument was out of bounds: " + row + " > " + this.effectiveLength);

      var colIndex = -1;
      if (typeof col === "undefined") {
        var _ret = function () {
          var rowData = {};
          _this3.colnames.forEach(function (name, i) {
            rowData[name] = _this3.columns[i][row % _this3.columns[i].length];
          });
          return {
            v: rowData
          };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      } else if (typeof col === "string") {
        colIndex = this._colIndex(col);
      } else if (typeof col === "number") {
        colIndex = col;
      }
      if (colIndex < 0 || colIndex > this.columns.length) {
        if (missingOK) return void 0;else throw new Error("Unknown column index: " + col);
      }

      return this.columns[colIndex][row % this.columns[colIndex].length];
    }
  }, {
    key: "nrow",
    value: function nrow() {
      return this.effectiveLength;
    }
  }]);

  return DataFrame;
}();

exports.default = DataFrame;


},{"./util":15}],5:[function(require,module,exports){
"use strict";

var _leaflet = require("./global/leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In RMarkdown's self-contained mode, we don't have a way to carry around the
// images that Leaflet needs but doesn't load into the page. Instead, we'll set
// data URIs for the default marker, and let any others be loaded via CDN.
if (typeof _leaflet2.default.Icon.Default.imagePath === "undefined") {
  _leaflet2.default.Icon.Default.imagePath = "//cdn.leafletjs.com/leaflet/v1.0.3/images/";
  // don't know how to make this dataURI work since
  //  will be appended to Defaul.imagePath above
  /*
  if (L.Browser.retina) {
    L.Icon.Default.prototype.options.iconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAYAAAAWy4frAAAPiElEQVR42t1bCVCU5xkmbabtZJJOO+l0mhgT0yQe0WXZgz2570NB8I6J6UzaTBoORRFEruVGDhWUPRAQRFFREDnVxCtEBRb24DBNE3Waaatpkmluo4m+fd9v999olGVBDu3OPLj+//s+7/W93/f9//6/EwA4/T9g3AlFOUeeUGR2uMqzOyJk2R2x0qyOAmnmkS3SrCPrZJlHlsqzjypcs49OX1Jf//P7KhD885A0u10my2ovQscvybI6wEF8ivI7pFntAV6qkw9PWSBK1bEnZRltm2WZ7R8h4FbI0VG33GPgXXgCAra+A4EIn8KT4JH/FigoiJ/IIz6TZbVVKLLan5u0QESqlkckWW3p0sy2bxDAgZwO13TDytoB+NPe9+zild2DEFGuB7/NpzDodriF55o0o7XIRXXoNxMaiCSj9VU09C8EENxyj0C4thterh2EV+veuwOr6s7Dy3ssoO93k3llzxBE6PTgkXcMOF7EJ9KMtqjR9JFDQnNV9b+QqlqqEECQZ7TBgu1nYdXuIXgVneSwYtcgRFb1Q1iFGULLzRCsM90GOrZghxkiKvthec0grLpFlxCu6cKh1w6cHUSbctPhx8YlEElu4+NSVfNpBBACtpyGlbsGmBOElRhMBDofgk4GobOjQXC5CRZiUC/VDtn4qLrBJZ3A2cNg+nE4P31PgSDBbImq5UNJejMQFqi7cCicZ3iZBTAAQVoTBI4DKKCVGBDHH6nrBRlWxWr7sljVIhlTIDLVoRkS1eH/SNIPgzyzFRZV9NnG++LqQcyoGQLQgfFEIFYpcueAzc6SSiMOtTYgH9CXr+WpTbxRBeKlqn9UktZkRoACZ5PlO81YgfMM4RX9EKAxTSjCdvTjELPYW17dD8rsdiBfEBclSY2POxQIHnlIknroEAJk6U2wpMLISF/aNQShWAV/tWlSEIK2VqBNsr200gRyGmLokyS18cTdFtA7AnFNbcxAACGMrQtDLAjqBT+1cVJBNsk2+bBQ1wOcX5K0xs12A8GyzXRNafgeAYFb3mEkrBI4I/mWGUeNQI1lyp2PoO9j4aDKcH4Ebe0E8g3xgyylcc6wgbimNjSSoFtWK1sTqLRh2BM+SOgIfDGLJL8IG3ZZjUX/ViyvGYLFOwdZn/ljYI7yzsee4TjcsV/IR3FqQ+tdAxEnNSjFyQeBEK7pgRVodEnVIPhsNzqEYK0ZluFsRnq3YjH22KJyA6z4yTmSpZ5zlH8RTvWkt1CrB85PYUqjzx2BuG6sPyfeeAA8sjtwphhiCFSbwXub0S7ISPiOAZvO4h048xSfBM+cDpDieCZOggSz6JHdBv5FJ3CN6LPJR1QMgO9204h2aALgdDxzjlp4kw8YaHKyBSJJPigWb6wHQiRmbxkKL0QDXkhgD94YxGKsGskTQkvfxVnlIHBcBNfkegziwB3HAnHDuGynRXcp/utXZhrRHiWM5CPLjbdwHVDYAhFt3J8rTtoPbpktSDrE4INZ8iw12kUYEpPs4kozeOW0A3EQIovbYcfxITj798vwxbfX4Or1H8B46ROo7fwbvKY9bpNzy2hmiSOOyMrBEe2RT5x/7tjHxCFK2l/4YyBJ+95HQABmibKzEJvRs9RgF4FqE5MleGS3AumLN+6D4lYjfIeOD/e5eROg7sz7oEg7wHRk6Y3Yi/2MJwT7bCS75BvJBuGsSvqID1ggaHyeaAMeQERgyajBg3BG8SgxDAsvJFxUOcBkg7d0Ml3XjfuhCyvg6Ofix1+Al6qB6fpueotxsckFh5A92+QbydHw4vymGJxEG+rWiRL3goJWcSwvwbPECO5bDcMiRGNmchS4a1I9kP62DhOM9tPad4npEhaUdTPOsPJ+u7bJN85PpaqJ6YoT6xKcRIl1pQjwxIukxXhyIY57N1Swh7DyASbrm38MSHdRUStc+/4GjOUTV32acbhlNjNO6pWR7FPTk6xX3lGmK0ys0zrhn0Zhwh7wK3ibnVyg6we3LQa7WFQxyGSpiqRbe/o8jPXTe+EK4xDjECHOxdYRYc8++UhyfgXHma5w/Z5mJ+H63T3ChN3Y6O/guMcxj8NGicLDgYyQ3CKcnsUbMBuoa7j48ZgD+erqdczqbsYTpulj3LSu2POBfCQ58pn0EH1OwoTafwvX1+JV2VmIxEwHlJlBsdkwLHy2mZjcgjI9kJ4Ynbh6/Xu4l09YfhPjCsSJg7hpIbbng/92M5Mjn0kPcdlJGF/7JQJCSrsgAseeHzoqL+4bFnSe5EJKzgHpeaTsg3v9rCrtYFz+hScZdzAGYs8HX84H9Jn0KAYnQfyuIQT4Y5mo0akiMhQeDh44tEguXGcE0iP845MvxxzEjRs3QZ5Ux3hCtnUxbqq6PR/8cRdAcuSz1YfzGEhNm2BdDfjkvw0LcTYKokCK+oaFAolIjiDFBYl02/oujDmQC1c+ZxzC+BoIp2t35HXHPrDnA/lIcuQz6SKOOAnWVqsRbHscjidDNf0gRWF7CNX2M1l3VTOQbmpd55gDqT01xDhkmBTiJMhGsB+isdrPbGe6wrU15RjIzkQEyHB3GqYbYCAiSeHwCMBmI7mAYiwt6grX7QT9h5dHHcQ/P/sKlEm7GYd37lHGGaLut2tbirD5iT6TriCuKsVJsLrCwyWuih2Yj/unMC2VFlfsgr5hodxsZHIEZVoTkP787APw7TXHZy/ac/25rJ3pSpP24tRrZnyeW012bbtZbS9AefKZ+b6mMtjJS6V6GP/zOR3wK+pkQn7bzHbJCCRDsqFlBpz+djHCV7a2wMUr/x0xiM++ugprq45bnFhbhdNoF+MKLOt32C75SvqIb7xUO3/Fdr/8uMqDLmsqwU3VipH2QzA2k3hTr11ICnqZHMn7F+HCFIfZQQ5JfDVUvW1mzv708/V316FV/wF4Je9hsgSv3GOMYz71Jg6bkezS0CN5N1WLhSOussW2jResrnzNZXUFm5PnW0nl2CciVLQHebHBJh9U0g1S3GYQD4eQjH2QWH0C0utw15DXAEIybD0nxoUsYPMZmz4N59HYE+K0SzyC2Mo3bIHw4zTT+Kt33ESAX/FZCMWovUtMIMzvHRFKJA9G+VAGvJ7IPsKGC3HdDYI4qnwzhJQZmQ5l2AODcMSWb6mJ6fgWn+H4bsxbWzX9tmt2l9Xl7fzYcpwJGhl5MI5XESoL8kaGKB9XWww8xOoYIXBrD3hvOgnK9BbEYdypHsctSBcGYLbJ+FMvbupz2AanJ01uAPLVJab88B03H1xidKH8WB0TCCq1KNEM4YgRDm7FRlys+m8L6G6gJLmPkpuqxhJU0st8JF8FMeV+dwTipFL9zDlGewmB1wYdzJh/qRlccntHDcqevBCv6NBZ3xIz+CGP5xYTKIoMIMZzo+UTIAK3WRKgULUB+egcrTs/7A06XpQ20Tlai+O4mm0DKLuSAgPwkWgqIcOkkC+BOBRdVlcC+ciL0kUNG4jodd3vnKM13yHAK/8UBG6nTBrBOUc/pfDBRZJ88cg9DuQbL1rzxdw3yx61exPbOUazi4Rd8VqYMhBIwyunF5yz9VMCUV6vxQ+ECJcH8s05SlMy4t145xi1jAkjfIu7GIESxzYPSacC1Gfkg3fhGbD6ddMlVvuCQz/0oHAfKclSmiAAK0JN75zdC/Oy9JMKanKyTxBvOGAJJEbd4fAvVrxo9UukxMfZwbu4hwWiKDLCXCSfTNAUTba9Cs5x1SD4OBwIm4qjNQOkKE1uBH+aQkssVZmbqZ8UCLAvyS5BnLDf2hvaE6P+MZQfpYngsuBd2A1+W7EqBUZ4MUM/KXAvMjGbHvm23gCXaI1yTD9Po7KezWBJB8EXp0ACD0s+J6NnQkGzJGdPlFDHBdI+5t/Z+dGaQC4bHpvOgg+uznJcIGereiYUykIjs+WW22mrBi9WLbqnJx9wlugkIlHifvBGcgLNKLPQ4ESA+pCzI4jfwy2Ajff8CAduWzy4rLjnnWEGqFdmpfdMCKgaZEOZc5qrxg3nWM28cXmohhetPcqqsn4veG02MczDmWVmWs+4wjmr18YvWFfLBVI3bk8HubxZ5spVRZHTyQzJsSovoPHxhAKrQdyKrFNcED/wo8pnjuvzWrgHayJyIY5bz2ITw1ycJp9P7R4X8LDCHK/L2l0sEH60tmrcHzzjRet4tM9hVck+xQzKNxnGLRDqO+KUZZ7gqnHdZY1mxoQ8QUfjlYwI1taCBy5YBKrKcynd9wTqNwufEfhrqq17Ko16wh4FpPFK45ZtKDNOgnshZjDfAH9M7r4nyPONjEua/hZXjav8NzTTJvThTF6UppJtF+JqwA2NE15U6eFZdGgsmJvRyziUeBXIX7PT2huazRP+lKkgavszeM18jW0oVcfBrYCqYoRnN3aPGlw1iMM17ai1Gtqvnd/Q/H5SnvvF7f12ljkcz0psUmWBpSoz0LnRgKpBugq6L8CuxSkQde6kPcAsWqN7Ao1+yzaUacdAsckI0jwDPJPU5TBmbOxi/UW64pQOrjc+5/1V/dtJfRIbrw0KWFVWV+Hw6GNDZE6aHp7e0OUQ5qTrmY48rw/4sRWW3ojSpk36I+Wzo7Y/7hyl+ZJtXVI7WJ+45hrgacz29A32QTISrCDpiJLbuWp8Oiuh8jGYiof8eTHqDEtVKkCGmZVZqzI9scsuSIZkZXTfKnYHt8NNmLK3FaQxpb9GJz5jVcHMclWhrD+VeHfQsJLkWqohTGrlqnFZ9LrukSl97YIXpU5kVcHMSvDKTppnhNmY8WkJXXcFnSMZSY6e3cO1ruKxU/7+CGUSnbnCti4bWjHbOAvlGOApdPrJ9beDjtE5khFsaOaq8dHzMaW/vC/e6KGMWm4flYMku4cNnVmpPej8udtA1aBzrll47RGjs/aG+vX75tUkyihl1lKVZnDFrIuy+2AaOv9EvAX0nY7ROZeEJq4aF+g3zPvqHStejOYvlvGuA1FmNxtCM1P18AcMgjALv9MxYWaX9WcBktWuuu9eFqPM4mbvAzbEEg5h9tHpLIOtP+g7HeMnNHLVeG/JkvF7YWxc33jDqqy0ZhoEKovzM1P0DPSdjtFvG5ZVXLP0vn19z3KrVTvIHF3fYHHeCvruHN/AbdNN3PO69+17iLgzjrRux8El/SwIMg0M9P3HG9HqsPv+hUrrJXEvczj+AAbRx+AcX88F0v1AvBnKAnlTG8Rln5/6LuLHW5/zorT+D0wg1qq8y5xfu88CSyCnH5h3dW/ZGXve8uOMZRWP0no8cIFY7+YfswURrT36QL09ffsMppHYegW/P7CBWHvlMOGBe5/9jtdjY7R8wkTb+R9meZA6n2oJWAAAAABJRU5ErkJggg==";
  } else {
    L.Icon.Default.prototype.options.iconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAGmklEQVRYw7VXeUyTZxjvNnfELFuyIzOabermMZEeQC/OclkO49CpOHXOLJl/CAURuYbQi3KLgEhbrhZ1aDwmaoGqKII6odATmH/scDFbdC7LvFqOCc+e95s2VG50X/LLm/f4/Z7neY/ne18aANCmAr5E/xZf1uDOkTcGcWR6hl9247tT5U7Y6SNvWsKT63P58qbfeLJG8M5qcgTknrvvrdDbsT7Ml+tv82X6vVxJE33aRmgSyYtcWVMqX97Yv2JvW39UhRE2HuyBL+t+gK1116ly06EeWFNlAmHxlQE0OMiV6mQCScusKRlhS3QLeVJdl1+23h5dY4FNB3thrbYboqptEFlphTC1hSpJnbRvxP4NWgsE5Jyz86QNNi/5qSUTGuFk1gu54tN9wuK2wc3o+Wc13RCmsoBwEqzGcZsxsvCSy/9wJKf7UWf1mEY8JWfewc67UUoDbDjQC+FqK4QqLVMGGR9d2wurKzqBk3nqIT/9zLxRRjgZ9bqQgub+DdoeCC03Q8j+0QhFhBHR/eP3U/zCln7Uu+hihJ1+bBNffLIvmkyP0gpBZWYXhKussK6mBz5HT6M1Nqpcp+mBCPXosYQfrekGvrjewd59/GvKCE7TbK/04/ZV5QZYVWmDwH1mF3xa2Q3ra3DBC5vBT1oP7PTj4C0+CcL8c7C2CtejqhuCnuIQHaKHzvcRfZpnylFfXsYJx3pNLwhKzRAwAhEqG0SpusBHfAKkxw3w4627MPhoCH798z7s0ZnBJ/MEJbZSbXPhER2ih7p2ok/zSj2cEJDd4CAe+5WYnBCgR2uruyEw6zRoW6/DWJ/OeAP8pd/BGtzOZKpG8oke0SX6GMmRk6GFlyAc59K32OTEinILRJRchah8HQwND8N435Z9Z0FY1EqtxUg+0SO6RJ/mmXz4VuS+DpxXC3gXmZwIL7dBSH4zKE50wESf8qwVgrP1EIlTO5JP9Igu0aexdh28F1lmAEGJGfh7jE6ElyM5Rw/FDcYJjWhbeiBYoYNIpc2FT/SILivp0F1ipDWk4BIEo2VuodEJUifhbiltnNBIXPUFCMpthtAyqws/BPlEF/VbaIxErdxPphsU7rcCp8DohC+GvBIPJS/tW2jtvTmmAeuNO8BNOYQeG8G/2OzCJ3q+soYB5i6NhMaKr17FSal7GIHheuV3uSCY8qYVuEm1cOzqdWr7ku/R0BDoTT+DT+ohCM6/CCvKLKO4RI+dXPeAuaMqksaKrZ7L3FE5FIFbkIceeOZ2OcHO6wIhTkNo0ffgjRGxEqogXHYUPHfWAC/lADpwGcLRY3aeK4/oRGCKYcZXPVoeX/kelVYY8dUGf8V5EBRbgJXT5QIPhP9ePJi428JKOiEYhYXFBqou2Guh+p/mEB1/RfMw6rY7cxcjTrneI1FrDyuzUSRm9miwEJx8E/gUmqlyvHGkneiwErR21F3tNOK5Tf0yXaT+O7DgCvALTUBXdM4YhC/IawPU+2PduqMvuaR6eoxSwUk75ggqsYJ7VicsnwGIkZBSXKOUww73WGXyqP+J2/b9c+gi1YAg/xpwck3gJuucNrh5JvDPvQr0WFXf0piyt8f8/WI0hV4pRxxkQZdJDfDJNOAmM0Ag8jyT6hz0WGXWuP94Yh2jcfjmXAGvHCMslRimDHYuHuDsy2QtHuIavznhbYURq5R57KpzBBRZKPJi8eQg48h4j8SDdowifdIrEVdU+gbO6QNvRRt4ZBthUaZhUnjlYObNagV3keoeru3rU7rcuceqU1mJBxy+BWZYlNEBH+0eH4vRiB+OYybU2hnblYlTvkHinM4m54YnxSyaZYSF6R3jwgP7udKLGIX6r/lbNa9N6y5MFynjWDtrHd75ZvTYAPO/6RgF0k76mQla3FGq7dO+cH8sKn0Vo7nDllwAhqwLPkxrHwWmHJOo+AKJ4rab5OgrM7rVu8eWb2Pu0Dh4eDgXoOfvp7Y7QeqknRmvcTBEyq9m/HQQSCSz6LHq3z0yzsNySRfMS253wl2KyRDbcZPcfJKjZmSEOjcxyi+Y8dUOtsIEH6R2wNykdqrkYJ0RV92H0W58pkfQk7cKevsLK10Py8SdMGfXNXATY+pPbyJR/ET6n9nIfztNtZYRV9XniQu9IA2vOVgy4ir7GCLVmmd+zjkH0eAF9Po6K61pmCXHxU5rHMYd1ftc3owjwRSVRzLjKvqZEty6cRUD7jGqiOdu5HG6MdHjNcNYGqfDm5YRzLBBCCDl/2bk8a8gdbqcfwECu62Fg/HrggAAAABJRU5ErkJggg==";
  }
  */
}


},{"./global/leaflet":8}],6:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = global.HTMLWidgets;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = global.jQuery;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = global.L;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = global.L.Proj;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = global.Shiny;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
"use strict";

var _jquery = require("./global/jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _leaflet = require("./global/leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

var _shiny = require("./global/shiny");

var _shiny2 = _interopRequireDefault(_shiny);

var _htmlwidgets = require("./global/htmlwidgets");

var _htmlwidgets2 = _interopRequireDefault(_htmlwidgets);

var _util = require("./util");

var _crs_utils = require("./crs_utils");

var _controlStore = require("./control-store");

var _controlStore2 = _interopRequireDefault(_controlStore);

var _layerManager = require("./layer-manager");

var _layerManager2 = _interopRequireDefault(_layerManager);

var _methods = require("./methods");

var _methods2 = _interopRequireDefault(_methods);

require("./fixup-default-icon");

var _dataframe = require("./dataframe");

var _dataframe2 = _interopRequireDefault(_dataframe);

var _clusterLayerStore = require("./cluster-layer-store");

var _clusterLayerStore2 = _interopRequireDefault(_clusterLayerStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.LeafletWidget = {};
window.LeafletWidget.utils = {};
var methods = window.LeafletWidget.methods = _jquery2.default.extend({}, _methods2.default);
window.LeafletWidget.DataFrame = _dataframe2.default;
window.LeafletWidget.ClusterLayerStore = _clusterLayerStore2.default;
window.LeafletWidget.utils.getCRS = _crs_utils.getCRS;

// Send updated bounds back to app. Takes a leaflet event object as input.
function updateBounds(map) {
  var id = map.getContainer().id;
  var bounds = map.getBounds();

  _shiny2.default.onInputChange(id + "_bounds", {
    north: bounds.getNorthEast().lat,
    east: bounds.getNorthEast().lng,
    south: bounds.getSouthWest().lat,
    west: bounds.getSouthWest().lng
  });
  _shiny2.default.onInputChange(id + "_center", {
    lng: map.getCenter().lng,
    lat: map.getCenter().lat
  });
  _shiny2.default.onInputChange(id + "_zoom", map.getZoom());
}

function preventUnintendedZoomOnScroll(map) {
  // Prevent unwanted scroll capturing. Similar in purpose to
  // https://github.com/CliffCloud/Leaflet.Sleep but with a
  // different set of heuristics.

  // The basic idea is that when a mousewheel/DOMMouseScroll
  // event is seen, we disable scroll wheel zooming until the
  // user moves their mouse cursor or clicks on the map. This
  // is slightly trickier than just listening for mousemove,
  // because mousemove is fired when the page is scrolled,
  // even if the user did not physically move the mouse. We
  // handle this by examining the mousemove event's screenX
  // and screenY properties; if they change, we know it's a
  // "true" move.

  // lastScreen can never be null, but its x and y can.
  var lastScreen = { x: null, y: null };
  (0, _jquery2.default)(document).on("mousewheel DOMMouseScroll", "*", function (e) {
    // Disable zooming (until the mouse moves or click)
    map.scrollWheelZoom.disable();
    // Any mousemove events at this screen position will be ignored.
    lastScreen = { x: e.originalEvent.screenX, y: e.originalEvent.screenY };
  });
  (0, _jquery2.default)(document).on("mousemove", "*", function (e) {
    // Did the mouse really move?
    if (lastScreen.x !== null && e.screenX !== lastScreen.x || e.screenY !== lastScreen.y) {
      // It really moved. Enable zooming.
      map.scrollWheelZoom.enable();
      lastScreen = { x: null, y: null };
    }
  });
  (0, _jquery2.default)(document).on("mousedown", ".leaflet", function (e) {
    // Clicking always enables zooming.
    map.scrollWheelZoom.enable();
    lastScreen = { x: null, y: null };
  });
}

_htmlwidgets2.default.widget({

  name: "leaflet",
  type: "output",
  factory: function factory(el, width, height) {

    var map = null;

    return {

      // we need to store our map in our returned object.
      getMap: function getMap() {
        return map;
      },

      renderValue: function renderValue(data) {

        // Create an appropriate CRS Object if specified

        if (data && data.options && data.options.crs) {
          data.options.crs = (0, _crs_utils.getCRS)(data.options.crs);
        }

        // As per https://github.com/rstudio/leaflet/pull/294#discussion_r79584810
        if (map) {
          map.remove();
          map = function () {
            return;
          }(); // undefine map
        }

        if (data.options.mapFactory && typeof data.options.mapFactory === "function") {
          map = data.options.mapFactory(el, data.options);
        } else {
          map = _leaflet2.default.map(el, data.options);
        }

        preventUnintendedZoomOnScroll(map);

        // Store some state in the map object
        map.leafletr = {
          // Has the map ever rendered successfully?
          hasRendered: false,
          // Data to be rendered when resize is called with area != 0
          pendingRenderData: null
        };

        // Check if the map is rendered statically (no output binding)
        if (_htmlwidgets2.default.shinyMode && /\bshiny-bound-output\b/.test(el.className)) {
          (function () {

            map.id = el.id;

            // Store the map on the element so we can find it later by ID
            (0, _jquery2.default)(el).data("leaflet-map", map);

            // When the map is clicked, send the coordinates back to the app
            map.on("click", function (e) {
              _shiny2.default.onInputChange(map.id + "_click", {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                ".nonce": Math.random() // Force reactivity if lat/lng hasn't changed
              });
            });

            var groupTimerId = null;

            map.on("moveend", function (e) {
              updateBounds(e.target);
            }).on("layeradd layerremove", function (e) {
              // If the layer that's coming or going is a group we created, tell
              // the server.
              if (map.layerManager.getGroupNameFromLayerGroup(e.layer)) {
                // But to avoid chattiness, coalesce events
                if (groupTimerId) {
                  clearTimeout(groupTimerId);
                  groupTimerId = null;
                }
                groupTimerId = setTimeout(function () {
                  groupTimerId = null;
                  _shiny2.default.onInputChange(map.id + "_groups", map.layerManager.getVisibleGroups());
                }, 100);
              }
            });
          })();
        }
        this.doRenderValue(data, map);
      },
      doRenderValue: function doRenderValue(data, map) {
        // Leaflet does not behave well when you set up a bunch of layers when
        // the map is not visible (width/height == 0). Popups get misaligned
        // relative to their owning markers, and the fitBounds calculations
        // are off. Therefore we wait until the map is actually showing to
        // render the value (we rely on the resize() callback being invoked
        // at the appropriate time).
        //
        // There may be an issue with leafletProxy() calls being made while
        // the map is not being viewed--not sure what the right solution is
        // there.
        if (el.offsetWidth === 0 || el.offsetHeight === 0) {
          map.leafletr.pendingRenderData = data;
          return;
        }
        map.leafletr.pendingRenderData = null;

        // Merge data options into defaults
        var options = _jquery2.default.extend({ zoomToLimits: "always" }, data.options);

        if (!map.layerManager) {
          map.controls = new _controlStore2.default(map);
          map.layerManager = new _layerManager2.default(map);
        } else {
          map.controls.clear();
          map.layerManager.clear();
        }

        var explicitView = false;
        if (data.setView) {
          explicitView = true;
          map.setView.apply(map, data.setView);
        }
        if (data.fitBounds) {
          explicitView = true;
          methods.fitBounds.apply(map, data.fitBounds);
        }
        if (data.options.center) {
          explicitView = true;
        }

        // Returns true if the zoomToLimits option says that the map should be
        // zoomed to map elements.
        function needsZoom() {
          return options.zoomToLimits === "always" || options.zoomToLimits === "first" && !map.leafletr.hasRendered;
        }

        if (!explicitView && needsZoom() && !map.getZoom()) {
          if (data.limits && !_jquery2.default.isEmptyObject(data.limits)) {
            // Use the natural limits of what's being drawn on the map
            // If the size of the bounding box is 0, leaflet gets all weird
            var pad = 0.006;
            if (data.limits.lat[0] === data.limits.lat[1]) {
              data.limits.lat[0] = data.limits.lat[0] - pad;
              data.limits.lat[1] = data.limits.lat[1] + pad;
            }
            if (data.limits.lng[0] === data.limits.lng[1]) {
              data.limits.lng[0] = data.limits.lng[0] - pad;
              data.limits.lng[1] = data.limits.lng[1] + pad;
            }
            map.fitBounds([[data.limits.lat[0], data.limits.lng[0]], [data.limits.lat[1], data.limits.lng[1]]]);
          } else {
            map.fitWorld();
          }
        }

        for (var i = 0; data.calls && i < data.calls.length; i++) {
          var call = data.calls[i];
          if (methods[call.method]) methods[call.method].apply(map, call.args);else (0, _util.log)("Unknown method " + call.method);
        }

        map.leafletr.hasRendered = true;

        if (_htmlwidgets2.default.shinyMode) {
          setTimeout(function () {
            updateBounds(map);
          }, 1);
        }
      },
      resize: function resize(width, height) {
        if (map) {
          map.invalidateSize();
          if (map.leafletr.pendingRenderData) {
            this.doRenderValue(map.leafletr.pendingRenderData, map);
          }
        }
      }
    };
  }
});

if (_htmlwidgets2.default.shinyMode) {
  _shiny2.default.addCustomMessageHandler("leaflet-calls", function (data) {
    var id = data.id;
    var el = document.getElementById(id);
    var map = el ? (0, _jquery2.default)(el).data("leaflet-map") : null;
    if (!map) {
      (0, _util.log)("Couldn't find map with id " + id);
      return;
    }

    for (var i = 0; i < data.calls.length; i++) {
      var call = data.calls[i];
      if (call.dependencies) {
        _shiny2.default.renderDependencies(call.dependencies);
      }
      if (methods[call.method]) methods[call.method].apply(map, call.args);else (0, _util.log)("Unknown method " + call.method);
    }
  });
}


},{"./cluster-layer-store":1,"./control-store":2,"./crs_utils":3,"./dataframe":4,"./fixup-default-icon":5,"./global/htmlwidgets":6,"./global/jquery":7,"./global/leaflet":8,"./global/shiny":10,"./layer-manager":12,"./methods":13,"./util":15}],12:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require("./global/jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _leaflet = require("./global/leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayerManager = function () {
  function LayerManager(map) {
    _classCallCheck(this, LayerManager);

    this._map = map;

    // BEGIN layer indices

    // {<groupname>: {<stamp>: layer}}
    this._byGroup = {};
    // {<categoryName>: {<stamp>: layer}}
    this._byCategory = {};
    // {<categoryName_layerId>: layer}
    this._byLayerId = {};
    // {<stamp>: {
    //             "group": <groupname>,
    //             "layerId": <layerId>,
    //             "category": <category>,
    //             "container": <container>
    //           }
    // }
    this._byStamp = {};
    // {<crosstalkGroupName>: {<key>: [<stamp>, <stamp>, ...], ...}}
    this._byCrosstalkGroup = {};

    // END layer indices

    // {<categoryName>: L.layerGroup}
    this._categoryContainers = {};
    // {<groupName>: L.layerGroup}
    this._groupContainers = {};
  }

  _createClass(LayerManager, [{
    key: "addLayer",
    value: function addLayer(layer, category, layerId, group, ctGroup, ctKey) {
      var _this = this;

      // Was a group provided?
      var hasId = typeof layerId === "string";
      var grouped = typeof group === "string";

      var stamp = _leaflet2.default.Util.stamp(layer);

      // This will be the default layer group to add the layer to.
      // We may overwrite this let before using it (i.e. if a group is assigned).
      // This one liner creates the _categoryContainers[category] entry if it
      // doesn't already exist.
      var container = this._categoryContainers[category] = this._categoryContainers[category] || _leaflet2.default.layerGroup().addTo(this._map);

      var oldLayer = null;
      if (hasId) {
        // First, remove any layer with the same category and layerId
        var prefixedLayerId = this._layerIdKey(category, layerId);
        oldLayer = this._byLayerId[prefixedLayerId];
        if (oldLayer) {
          this._removeLayer(oldLayer);
        }

        // Update layerId index
        this._byLayerId[prefixedLayerId] = layer;
      }

      // Update group index
      if (grouped) {
        this._byGroup[group] = this._byGroup[group] || {};
        this._byGroup[group][stamp] = layer;

        // Since a group is assigned, don't add the layer to the category's layer
        // group; instead, use the group's layer group.
        // This one liner creates the _groupContainers[group] entry if it doesn't
        // already exist.
        container = this.getLayerGroup(group, true);
      }

      // Update category index
      this._byCategory[category] = this._byCategory[category] || {};
      this._byCategory[category][stamp] = layer;

      // Update stamp index
      var layerInfo = this._byStamp[stamp] = {
        layer: layer,
        group: group,
        ctGroup: ctGroup,
        ctKey: ctKey,
        layerId: layerId,
        category: category,
        container: container,
        hidden: false
      };

      // Update crosstalk group index
      if (ctGroup) {
        (function () {
          if (layer.setStyle) {
            // Need to save this info so we know what to set opacity to later
            layer.options.origOpacity = typeof layer.options.opacity !== "undefined" ? layer.options.opacity : 0.5;
            layer.options.origFillOpacity = typeof layer.options.fillOpacity !== "undefined" ? layer.options.fillOpacity : 0.2;
          }

          var ctg = _this._byCrosstalkGroup[ctGroup];
          if (!ctg) {
            (function () {
              ctg = _this._byCrosstalkGroup[ctGroup] = {};
              var crosstalk = global.crosstalk;

              var handleFilter = function handleFilter(e) {
                if (!e.value) {
                  var groupKeys = Object.keys(ctg);
                  for (var i = 0; i < groupKeys.length; i++) {
                    var key = groupKeys[i];
                    var _layerInfo = _this._byStamp[ctg[key]];
                    _this._setVisibility(_layerInfo, true);
                  }
                } else {
                  var selectedKeys = {};
                  for (var _i = 0; _i < e.value.length; _i++) {
                    selectedKeys[e.value[_i]] = true;
                  }
                  var _groupKeys = Object.keys(ctg);
                  for (var _i2 = 0; _i2 < _groupKeys.length; _i2++) {
                    var _key = _groupKeys[_i2];
                    var _layerInfo2 = _this._byStamp[ctg[_key]];
                    _this._setVisibility(_layerInfo2, selectedKeys[_groupKeys[_i2]]);
                  }
                }
              };
              var filterHandle = new crosstalk.FilterHandle(ctGroup);
              filterHandle.on("change", handleFilter);

              var handleSelection = function handleSelection(e) {
                if (!e.value || !e.value.length) {
                  var groupKeys = Object.keys(ctg);
                  for (var i = 0; i < groupKeys.length; i++) {
                    var key = groupKeys[i];
                    var _layerInfo3 = _this._byStamp[ctg[key]];
                    _this._setOpacity(_layerInfo3, 1.0);
                  }
                } else {
                  var selectedKeys = {};
                  for (var _i3 = 0; _i3 < e.value.length; _i3++) {
                    selectedKeys[e.value[_i3]] = true;
                  }
                  var _groupKeys2 = Object.keys(ctg);
                  for (var _i4 = 0; _i4 < _groupKeys2.length; _i4++) {
                    var _key2 = _groupKeys2[_i4];
                    var _layerInfo4 = _this._byStamp[ctg[_key2]];
                    _this._setOpacity(_layerInfo4, selectedKeys[_groupKeys2[_i4]] ? 1.0 : 0.2);
                  }
                }
              };
              var selHandle = new crosstalk.SelectionHandle(ctGroup);
              selHandle.on("change", handleSelection);

              setTimeout(function () {
                handleFilter({ value: filterHandle.filteredKeys });
                handleSelection({ value: selHandle.value });
              }, 100);
            })();
          }

          if (!ctg[ctKey]) ctg[ctKey] = [];
          ctg[ctKey].push(stamp);
        })();
      }

      // Add to container
      if (!layerInfo.hidden) container.addLayer(layer);

      return oldLayer;
    }
  }, {
    key: "brush",
    value: function brush(bounds, extraInfo) {
      var _this2 = this;

      /* eslint-disable no-console */

      // For each Crosstalk group...
      Object.keys(this._byCrosstalkGroup).forEach(function (ctGroupName) {
        var ctg = _this2._byCrosstalkGroup[ctGroupName];
        var selection = [];
        // ...iterate over each Crosstalk key (each of which may have multiple
        // layers)...
        Object.keys(ctg).forEach(function (ctKey) {
          // ...and for each layer...
          ctg[ctKey].forEach(function (stamp) {
            var layerInfo = _this2._byStamp[stamp];
            // ...if it's something with a point...
            if (layerInfo.layer.getLatLng) {
              // ... and it's inside the selection bounds...
              // TODO: Use pixel containment, not lat/lng containment
              if (bounds.contains(layerInfo.layer.getLatLng())) {
                // ...add the key to the selection.
                selection.push(ctKey);
              }
            }
          });
        });
        new global.crosstalk.SelectionHandle(ctGroupName).set(selection, extraInfo);
      });
    }
  }, {
    key: "unbrush",
    value: function unbrush(extraInfo) {
      Object.keys(this._byCrosstalkGroup).forEach(function (ctGroupName) {
        new global.crosstalk.SelectionHandle(ctGroupName).clear(extraInfo);
      });
    }
  }, {
    key: "_setVisibility",
    value: function _setVisibility(layerInfo, visible) {
      if (layerInfo.hidden ^ visible) {
        return;
      } else if (visible) {
        layerInfo.container.addLayer(layerInfo.layer);
        layerInfo.hidden = false;
      } else {
        layerInfo.container.removeLayer(layerInfo.layer);
        layerInfo.hidden = true;
      }
    }
  }, {
    key: "_setOpacity",
    value: function _setOpacity(layerInfo, opacity) {
      if (layerInfo.layer.setOpacity) {
        layerInfo.layer.setOpacity(opacity);
      } else if (layerInfo.layer.setStyle) {
        layerInfo.layer.setStyle({
          opacity: opacity * layerInfo.layer.options.origOpacity,
          fillOpacity: opacity * layerInfo.layer.options.origFillOpacity
        });
      }
    }
  }, {
    key: "getLayer",
    value: function getLayer(category, layerId) {
      return this._byLayerId[this._layerIdKey(category, layerId)];
    }
  }, {
    key: "removeLayer",
    value: function removeLayer(category, layerIds) {
      var _this3 = this;

      // Find layer info
      _jquery2.default.each((0, _util.asArray)(layerIds), function (i, layerId) {
        var layer = _this3._byLayerId[_this3._layerIdKey(category, layerId)];
        if (layer) {
          _this3._removeLayer(layer);
        }
      });
    }
  }, {
    key: "clearLayers",
    value: function clearLayers(category) {
      var _this4 = this;

      // Find all layers in _byCategory[category]
      var catTable = this._byCategory[category];
      if (!catTable) {
        return false;
      }

      // Remove all layers. Make copy of keys to avoid mutating the collection
      // behind the iterator you're accessing.
      var stamps = [];
      _jquery2.default.each(catTable, function (k, v) {
        stamps.push(k);
      });
      _jquery2.default.each(stamps, function (i, stamp) {
        _this4._removeLayer(stamp);
      });
    }
  }, {
    key: "getLayerGroup",
    value: function getLayerGroup(group, ensureExists) {
      var g = this._groupContainers[group];
      if (ensureExists && !g) {
        this._byGroup[group] = this._byGroup[group] || {};
        g = this._groupContainers[group] = _leaflet2.default.featureGroup();
        g.groupname = group;
        g.addTo(this._map);
      }
      return g;
    }
  }, {
    key: "getGroupNameFromLayerGroup",
    value: function getGroupNameFromLayerGroup(layerGroup) {
      return layerGroup.groupname;
    }
  }, {
    key: "getVisibleGroups",
    value: function getVisibleGroups() {
      var _this5 = this;

      var result = [];
      _jquery2.default.each(this._groupContainers, function (k, v) {
        if (_this5._map.hasLayer(v)) {
          result.push(k);
        }
      });
      return result;
    }
  }, {
    key: "getAllGroupNames",
    value: function getAllGroupNames() {
      var result = [];
      _jquery2.default.each(this._groupContainers, function (k, v) {
        result.push(k);
      });
      return result;
    }
  }, {
    key: "clearGroup",
    value: function clearGroup(group) {
      var _this6 = this;

      // Find all layers in _byGroup[group]
      var groupTable = this._byGroup[group];
      if (!groupTable) {
        return false;
      }

      // Remove all layers. Make copy of keys to avoid mutating the collection
      // behind the iterator you're accessing.
      var stamps = [];
      _jquery2.default.each(groupTable, function (k, v) {
        stamps.push(k);
      });
      _jquery2.default.each(stamps, function (i, stamp) {
        _this6._removeLayer(stamp);
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      function clearLayerGroup(key, layerGroup) {
        layerGroup.clearLayers();
      }
      // Clear all indices and layerGroups
      this._byGroup = {};
      this._byCategory = {};
      this._byLayerId = {};
      this._byStamp = {};
      this._byCrosstalkGroup = {};
      _jquery2.default.each(this._categoryContainers, clearLayerGroup);
      this._categoryContainers = {};
      _jquery2.default.each(this._groupContainers, clearLayerGroup);
      this._groupContainers = {};
    }
  }, {
    key: "_removeLayer",
    value: function _removeLayer(layer) {
      var stamp = void 0;
      if (typeof layer === "string") {
        stamp = layer;
      } else {
        stamp = _leaflet2.default.Util.stamp(layer);
      }

      var layerInfo = this._byStamp[stamp];
      if (!layerInfo) {
        return false;
      }

      layerInfo.container.removeLayer(stamp);
      if (typeof layerInfo.group === "string") {
        delete this._byGroup[layerInfo.group][stamp];
      }
      if (typeof layerInfo.layerId === "string") {
        delete this._byLayerId[this._layerIdKey(layerInfo.category, layerInfo.layerId)];
      }
      delete this._byCategory[layerInfo.category][stamp];
      delete this._byStamp[stamp];
      if (layerInfo.ctGroup) {
        var ctGroup = this._byCrosstalkGroup[layerInfo.ctGroup];
        var layersForKey = ctGroup[layerInfo.ctKey];
        var idx = layersForKey ? layersForKey.indexOf(stamp) : -1;
        if (idx >= 0) {
          if (layersForKey.length === 1) {
            delete ctGroup[layerInfo.ctKey];
          } else {
            layersForKey.splice(idx, 1);
          }
        }
      }
    }
  }, {
    key: "_layerIdKey",
    value: function _layerIdKey(category, layerId) {
      return category + "\n" + layerId;
    }
  }]);

  return LayerManager;
}();

exports.default = LayerManager;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./global/jquery":7,"./global/leaflet":8,"./util":15}],13:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _jquery = require("./global/jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _leaflet = require("./global/leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

var _shiny = require("./global/shiny");

var _shiny2 = _interopRequireDefault(_shiny);

var _htmlwidgets = require("./global/htmlwidgets");

var _htmlwidgets2 = _interopRequireDefault(_htmlwidgets);

var _util = require("./util");

var _crs_utils = require("./crs_utils");

var _dataframe = require("./dataframe");

var _dataframe2 = _interopRequireDefault(_dataframe);

var _clusterLayerStore = require("./cluster-layer-store");

var _clusterLayerStore2 = _interopRequireDefault(_clusterLayerStore);

var _mipmapper = require("./mipmapper");

var _mipmapper2 = _interopRequireDefault(_mipmapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {};
exports.default = methods;


function mouseHandler(mapId, layerId, group, eventName, extraInfo) {
  return function (e) {
    if (!_htmlwidgets2.default.shinyMode) return;

    var eventInfo = _jquery2.default.extend({
      id: layerId,
      ".nonce": Math.random() // force reactivity
    }, group !== null ? { group: group } : null, e.target.getLatLng ? e.target.getLatLng() : e.latlng, extraInfo);

    _shiny2.default.onInputChange(mapId + "_" + eventName, eventInfo);
  };
}

methods.mouseHandler = mouseHandler;

methods.clearGroup = function (group) {
  var _this = this;

  _jquery2.default.each((0, _util.asArray)(group), function (i, v) {
    _this.layerManager.clearGroup(v);
  });
};

methods.setView = function (center, zoom, options) {
  this.setView(center, zoom, options);
};

methods.fitBounds = function (lat1, lng1, lat2, lng2) {
  this.fitBounds([[lat1, lng1], [lat2, lng2]]);
};

methods.setMaxBounds = function (lat1, lng1, lat2, lng2) {
  this.setMaxBounds([[lat1, lng1], [lat2, lng2]]);
};

methods.addPopups = function (lat, lng, popup, layerId, group, options) {
  var _this2 = this;

  var df = new _dataframe2.default().col("lat", lat).col("lng", lng).col("popup", popup).col("layerId", layerId).col("group", group).cbind(options);

  var _loop = function _loop(i) {
    if (_jquery2.default.isNumeric(df.get(i, "lat")) && _jquery2.default.isNumeric(df.get(i, "lng"))) {
      (function () {
        var popup = _leaflet2.default.popup(df.get(i)).setLatLng([df.get(i, "lat"), df.get(i, "lng")]).setContent(df.get(i, "popup"));
        var thisId = df.get(i, "layerId");
        var thisGroup = df.get(i, "group");
        this.layerManager.addLayer(popup, "popup", thisId, thisGroup);
      }).call(_this2);
    }
  };

  for (var i = 0; i < df.nrow(); i++) {
    _loop(i);
  }
};

methods.removePopup = function (layerId) {
  this.layerManager.removeLayer("popup", layerId);
};

methods.clearPopups = function () {
  this.layerManager.clearLayers("popup");
};

methods.addTiles = function (urlTemplate, layerId, group, options) {
  this.layerManager.addLayer(_leaflet2.default.tileLayer(urlTemplate, options), "tile", layerId, group);
};

methods.addGoogleTiles = function( layerId, group, options) {
  this.layerManager.addLayer(L.gridLayer.googleMutant({type : type}), "tile", layerId, group);
};

methods.removeTiles = function (layerId) {
  this.layerManager.removeLayer("tile", layerId);
};

methods.clearTiles = function () {
  this.layerManager.clearLayers("tile");
};

methods.addWMSTiles = function (baseUrl, layerId, group, options) {
  if (options && options.crs) {
    options.crs = (0, _crs_utils.getCRS)(options.crs);
  }
  this.layerManager.addLayer(_leaflet2.default.tileLayer.wms(baseUrl, options), "tile", layerId, group);
};

// Given:
//   {data: ["a", "b", "c"], index: [0, 1, 0, 2]}
// returns:
//   ["a", "b", "a", "c"]
function unpackStrings(iconset) {
  if (!iconset) {
    return iconset;
  }
  if (typeof iconset.index === "undefined") {
    return iconset;
  }

  iconset.data = (0, _util.asArray)(iconset.data);
  iconset.index = (0, _util.asArray)(iconset.index);

  return _jquery2.default.map(iconset.index, function (e, i) {
    return iconset.data[e];
  });
}

function addMarkers(map, df, group, clusterOptions, clusterId, markerFunc) {
  (function () {
    var _this3 = this;

    var clusterGroup = this.layerManager.getLayer("cluster", clusterId),
        cluster = clusterOptions !== null;
    if (cluster && !clusterGroup) {
      clusterGroup = _leaflet2.default.markerClusterGroup.layerSupport(clusterOptions);
      if (clusterOptions.freezeAtZoom) {
        var freezeAtZoom = clusterOptions.freezeAtZoom;
        delete clusterOptions.freezeAtZoom;
        clusterGroup.freezeAtZoom(freezeAtZoom);
      }
      clusterGroup.clusterLayerStore = new _clusterLayerStore2.default(clusterGroup);
    }
    var extraInfo = cluster ? { clusterId: clusterId } : {};

    var _loop2 = function _loop2(i) {
      if (_jquery2.default.isNumeric(df.get(i, "lat")) && _jquery2.default.isNumeric(df.get(i, "lng"))) {
        (function () {
          var marker = markerFunc(df, i);
          var thisId = df.get(i, "layerId");
          var thisGroup = cluster ? null : df.get(i, "group");
          if (cluster) {
            clusterGroup.clusterLayerStore.add(marker, thisId);
          } else {
            this.layerManager.addLayer(marker, "marker", thisId, thisGroup, df.get(i, "ctGroup", true), df.get(i, "ctKey", true));
          }
          var popup = df.get(i, "popup");
          var popupOptions = df.get(i, "popupOptions");
          if (popup !== null) {
            if (popupOptions !== null) {
              marker.bindPopup(popup, popupOptions);
            } else {
              marker.bindPopup(popup);
            }
          }
          var label = df.get(i, "label");
          var labelOptions = df.get(i, "labelOptions");
          if (label !== null) {
            if (labelOptions !== null) {
              if (labelOptions.permanent) {
                marker.bindTooltip(label, labelOptions).openTooltip();
              } else {
                marker.bindTooltip(label, labelOptions);
              }
            } else {
              marker.bindTooltip(label);
            }
          }
          marker.on("click", mouseHandler(this.id, thisId, thisGroup, "marker_click", extraInfo), this);
          marker.on("mouseover", mouseHandler(this.id, thisId, thisGroup, "marker_mouseover", extraInfo), this);
          marker.on("mouseout", mouseHandler(this.id, thisId, thisGroup, "marker_mouseout", extraInfo), this);
        }).call(_this3);
      }
    };

    for (var i = 0; i < df.nrow(); i++) {
      _loop2(i);
    }

    if (cluster) {
      this.layerManager.addLayer(clusterGroup, "cluster", clusterId, group);
    }
  }).call(map);
}

methods.addGenericMarkers = addMarkers;

methods.addMarkers = function (lat, lng, icon, layerId, group, options, popup, popupOptions, clusterOptions, clusterId, label, labelOptions, crosstalkOptions) {
  var icondf = void 0;
  var getIcon = void 0;

  if (icon) {
    // Unpack icons
    icon.iconUrl = unpackStrings(icon.iconUrl);
    icon.iconRetinaUrl = unpackStrings(icon.iconRetinaUrl);
    icon.shadowUrl = unpackStrings(icon.shadowUrl);
    icon.shadowRetinaUrl = unpackStrings(icon.shadowRetinaUrl);

    // This cbinds the icon URLs and any other icon options; they're all
    // present on the icon object.
    icondf = new _dataframe2.default().cbind(icon);

    // Constructs an icon from a specified row of the icon dataframe.
    getIcon = function getIcon(i) {
      var opts = icondf.get(i);
      if (!opts.iconUrl) {
        return new _leaflet2.default.Icon.Default();
      }

      // Composite options (like points or sizes) are passed from R with each
      // individual component as its own option. We need to combine them now
      // into their composite form.
      if (opts.iconWidth) {
        opts.iconSize = [opts.iconWidth, opts.iconHeight];
      }
      if (opts.shadowWidth) {
        opts.shadowSize = [opts.shadowWidth, opts.shadowHeight];
      }
      if (opts.iconAnchorX) {
        opts.iconAnchor = [opts.iconAnchorX, opts.iconAnchorY];
      }
      if (opts.shadowAnchorX) {
        opts.shadowAnchor = [opts.shadowAnchorX, opts.shadowAnchorY];
      }
      if (opts.popupAnchorX) {
        opts.popupAnchor = [opts.popupAnchorX, opts.popupAnchorY];
      }

      return new _leaflet2.default.Icon(opts);
    };
  }

  if (!(_jquery2.default.isEmptyObject(lat) || _jquery2.default.isEmptyObject(lng)) || _jquery2.default.isNumeric(lat) && _jquery2.default.isNumeric(lng)) {

    var df = new _dataframe2.default().col("lat", lat).col("lng", lng).col("layerId", layerId).col("group", group).col("popup", popup).col("popupOptions", popupOptions).col("label", label).col("labelOptions", labelOptions).cbind(options).cbind(crosstalkOptions || {});

    if (icon) icondf.effectiveLength = df.nrow();

    addMarkers(this, df, group, clusterOptions, clusterId, function (df, i) {
      var options = df.get(i);
      if (icon) options.icon = getIcon(i);
      return _leaflet2.default.marker([df.get(i, "lat"), df.get(i, "lng")], options);
    });
  }
};

methods.addAwesomeMarkers = function (lat, lng, icon, layerId, group, options, popup, popupOptions, clusterOptions, clusterId, label, labelOptions, crosstalkOptions) {
  var icondf = void 0;
  var getIcon = void 0;
  if (icon) {

    // This cbinds the icon URLs and any other icon options; they're all
    // present on the icon object.
    icondf = new _dataframe2.default().cbind(icon);

    // Constructs an icon from a specified row of the icon dataframe.
    getIcon = function getIcon(i) {
      var opts = icondf.get(i);
      if (!opts) {
        return new _leaflet2.default.AwesomeMarkers.icon();
      }

      if (opts.squareMarker) {
        opts.className = "awesome-marker awesome-marker-square";
      }
      return new _leaflet2.default.AwesomeMarkers.icon(opts);
    };
  }

  if (!(_jquery2.default.isEmptyObject(lat) || _jquery2.default.isEmptyObject(lng)) || _jquery2.default.isNumeric(lat) && _jquery2.default.isNumeric(lng)) {

    var df = new _dataframe2.default().col("lat", lat).col("lng", lng).col("layerId", layerId).col("group", group).col("popup", popup).col("popupOptions", popupOptions).col("label", label).col("labelOptions", labelOptions).cbind(options).cbind(crosstalkOptions || {});

    if (icon) icondf.effectiveLength = df.nrow();

    addMarkers(this, df, group, clusterOptions, clusterId, function (df, i) {
      var options = df.get(i);
      if (icon) options.icon = getIcon(i);
      return _leaflet2.default.marker([df.get(i, "lat"), df.get(i, "lng")], options);
    });
  }
};

function addLayers(map, category, df, layerFunc) {
  var _loop3 = function _loop3(i) {
    (function () {
      var _this4 = this;

      var layer = layerFunc(df, i);
      if (!_jquery2.default.isEmptyObject(layer)) {
        (function () {
          var thisId = df.get(i, "layerId");
          var thisGroup = df.get(i, "group");
          _this4.layerManager.addLayer(layer, category, thisId, thisGroup, df.get(i, "ctGroup", true), df.get(i, "ctKey", true));
          if (layer.bindPopup) {
            var popup = df.get(i, "popup");
            var popupOptions = df.get(i, "popupOptions");
            if (popup !== null) {
              if (popupOptions !== null) {
                layer.bindPopup(popup, popupOptions);
              } else {
                layer.bindPopup(popup);
              }
            }
          }
          if (layer.bindTooltip) {
            var label = df.get(i, "label");
            var labelOptions = df.get(i, "labelOptions");
            if (label !== null) {
              if (labelOptions !== null) {
                layer.bindTooltip(label, labelOptions);
              } else {
                layer.bindTooltip(label);
              }
            }
          }
          layer.on("click", mouseHandler(_this4.id, thisId, thisGroup, category + "_click"), _this4);
          layer.on("mouseover", mouseHandler(_this4.id, thisId, thisGroup, category + "_mouseover"), _this4);
          layer.on("mouseout", mouseHandler(_this4.id, thisId, thisGroup, category + "_mouseout"), _this4);
          var highlightStyle = df.get(i, "highlightOptions");

          if (!_jquery2.default.isEmptyObject(highlightStyle)) {
            (function () {

              var defaultStyle = {};
              _jquery2.default.each(highlightStyle, function (k, v) {
                if (k != "bringToFront" && k != "sendToBack") {
                  if (df.get(i, k)) {
                    defaultStyle[k] = df.get(i, k);
                  }
                }
              });

              layer.on("mouseover", function (e) {
                this.setStyle(highlightStyle);
                if (highlightStyle.bringToFront) {
                  this.bringToFront();
                }
              });
              layer.on("mouseout", function (e) {
                this.setStyle(defaultStyle);
                if (highlightStyle.sendToBack) {
                  this.bringToBack();
                }
              });
            })();
          }
        })();
      }
    }).call(map);
  };

  for (var i = 0; i < df.nrow(); i++) {
    _loop3(i);
  }
}

methods.addGenericLayers = addLayers;

methods.addCircles = function (lat, lng, radius, layerId, group, options, popup, popupOptions, label, labelOptions, highlightOptions, crosstalkOptions) {
  if (!(_jquery2.default.isEmptyObject(lat) || _jquery2.default.isEmptyObject(lng)) || _jquery2.default.isNumeric(lat) && _jquery2.default.isNumeric(lng)) {
    var df = new _dataframe2.default().col("lat", lat).col("lng", lng).col("radius", radius).col("layerId", layerId).col("group", group).col("popup", popup).col("popupOptions", popupOptions).col("label", label).col("labelOptions", labelOptions).col("highlightOptions", highlightOptions).cbind(options).cbind(crosstalkOptions || {});

    addLayers(this, "shape", df, function (df, i) {
      if (_jquery2.default.isNumeric(df.get(i, "lat")) && _jquery2.default.isNumeric(df.get(i, "lng")) && _jquery2.default.isNumeric(df.get(i, "radius"))) {
        return _leaflet2.default.circle([df.get(i, "lat"), df.get(i, "lng")], df.get(i, "radius"), df.get(i));
      } else {
        return null;
      }
    });
  }
};

methods.addCircleMarkers = function (lat, lng, radius, layerId, group, options, clusterOptions, clusterId, popup, popupOptions, label, labelOptions, crosstalkOptions) {
  if (!(_jquery2.default.isEmptyObject(lat) || _jquery2.default.isEmptyObject(lng)) || _jquery2.default.isNumeric(lat) && _jquery2.default.isNumeric(lng)) {
    var df = new _dataframe2.default().col("lat", lat).col("lng", lng).col("radius", radius).col("layerId", layerId).col("group", group).col("popup", popup).col("popupOptions", popupOptions).col("label", label).col("labelOptions", labelOptions).cbind(crosstalkOptions || {}).cbind(options);

    addMarkers(this, df, group, clusterOptions, clusterId, function (df, i) {
      return _leaflet2.default.circleMarker([df.get(i, "lat"), df.get(i, "lng")], df.get(i));
    });
  }
};

/*
 * @param lat Array of arrays of latitude coordinates for polylines
 * @param lng Array of arrays of longitude coordinates for polylines
 */
methods.addPolylines = function (polygons, layerId, group, options, popup, popupOptions, label, labelOptions, highlightOptions) {
  if (polygons.length > 0) {
    var df = new _dataframe2.default().col("shapes", polygons).col("layerId", layerId).col("group", group).col("popup", popup).col("popupOptions", popupOptions).col("label", label).col("labelOptions", labelOptions).col("highlightOptions", highlightOptions).cbind(options);

    addLayers(this, "shape", df, function (df, i) {
      var shapes = df.get(i, "shapes");
      shapes = shapes.map(function (shape) {
        return _htmlwidgets2.default.dataframeToD3(shape[0]);
      });
      if (shapes.length > 1) {
        return _leaflet2.default.multiPolyline(shapes, df.get(i));
      } else {
        return _leaflet2.default.polyline(shapes[0], df.get(i));
      }
    });
  }
};

methods.removeMarker = function (layerId) {
  this.layerManager.removeLayer("marker", layerId);
};

methods.clearMarkers = function () {
  this.layerManager.clearLayers("marker");
};

methods.removeMarkerCluster = function (layerId) {
  this.layerManager.removeLayer("cluster", layerId);
};

methods.removeMarkerFromCluster = function (layerId, clusterId) {
  var cluster = this.layerManager.getLayer("cluster", clusterId);
  if (!cluster) return;
  cluster.clusterLayerStore.remove(layerId);
};

methods.clearMarkerClusters = function () {
  this.layerManager.clearLayers("cluster");
};

methods.removeShape = function (layerId) {
  this.layerManager.removeLayer("shape", layerId);
};

methods.clearShapes = function () {
  this.layerManager.clearLayers("shape");
};

methods.addRectangles = function (lat1, lng1, lat2, lng2, layerId, group, options, popup, popupOptions, label, labelOptions, highlightOptions) {
  var df = new _dataframe2.default().col("lat1", lat1).col("lng1", lng1).col("lat2", lat2).col("lng2", lng2).col("layerId", layerId).col("group", group).col("popup", popup).col("popupOptions", popupOptions).col("label", label).col("labelOptions", labelOptions).col("highlightOptions", highlightOptions).cbind(options);

  addLayers(this, "shape", df, function (df, i) {
    if (_jquery2.default.isNumeric(df.get(i, "lat1")) && _jquery2.default.isNumeric(df.get(i, "lng1")) && _jquery2.default.isNumeric(df.get(i, "lat2")) && _jquery2.default.isNumeric(df.get(i, "lng2"))) {
      return _leaflet2.default.rectangle([[df.get(i, "lat1"), df.get(i, "lng1")], [df.get(i, "lat2"), df.get(i, "lng2")]], df.get(i));
    } else {
      return null;
    }
  });
};

/*
 * @param lat Array of arrays of latitude coordinates for polygons
 * @param lng Array of arrays of longitude coordinates for polygons
 */
methods.addPolygons = function (polygons, layerId, group, options, popup, popupOptions, label, labelOptions, highlightOptions) {
  if (polygons.length > 0) {
    var df = new _dataframe2.default().col("shapes", polygons).col("layerId", layerId).col("group", group).col("popup", popup).col("popupOptions", popupOptions).col("label", label).col("labelOptions", labelOptions).col("highlightOptions", highlightOptions).cbind(options);

    addLayers(this, "shape", df, function (df, i) {
      // This code used to use L.multiPolygon, but that caused
      // double-click on a multipolygon to fail to zoom in on the
      // map. Surprisingly, putting all the rings in a single
      // polygon seems to still work; complicated multipolygons
      // are still rendered correctly.
      var shapes = df.get(i, "shapes").map(function (polygon) {
        return polygon.map(_htmlwidgets2.default.dataframeToD3);
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
      return _leaflet2.default.polygon(shapes, df.get(i));
    });
  }
};

methods.addGeoJSON = function (data, layerId, group, style) {
  // This time, self is actually needed because the callbacks below need
  // to access both the inner and outer senses of "this"
  var self = this;
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  var globalStyle = _jquery2.default.extend({}, style, data.style || {});

  var gjlayer = _leaflet2.default.geoJson(data, {
    style: function style(feature) {
      if (feature.style || feature.properties.style) {
        return _jquery2.default.extend({}, globalStyle, feature.style, feature.properties.style);
      } else {
        return globalStyle;
      }
    },
    onEachFeature: function onEachFeature(feature, layer) {
      var extraInfo = {
        featureId: feature.id,
        properties: feature.properties
      };
      var popup = feature.properties.popup;
      if (typeof popup !== "undefined" && popup !== null) layer.bindPopup(popup);
      layer.on("click", mouseHandler(self.id, layerId, group, "geojson_click", extraInfo), this);
      layer.on("mouseover", mouseHandler(self.id, layerId, group, "geojson_mouseover", extraInfo), this);
      layer.on("mouseout", mouseHandler(self.id, layerId, group, "geojson_mouseout", extraInfo), this);
    }
  });
  this.layerManager.addLayer(gjlayer, "geojson", layerId, group);
};

methods.removeGeoJSON = function (layerId) {
  this.layerManager.removeLayer("geojson", layerId);
};

methods.clearGeoJSON = function () {
  this.layerManager.clearLayers("geojson");
};

methods.addTopoJSON = function (data, layerId, group, style) {
  // This time, self is actually needed because the callbacks below need
  // to access both the inner and outer senses of "this"
  var self = this;
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  var globalStyle = _jquery2.default.extend({}, style, data.style || {});

  var gjlayer = _leaflet2.default.geoJson(null, {
    style: function style(feature) {
      if (feature.style || feature.properties.style) {
        return _jquery2.default.extend({}, globalStyle, feature.style, feature.properties.style);
      } else {
        return globalStyle;
      }
    },
    onEachFeature: function onEachFeature(feature, layer) {
      var extraInfo = {
        featureId: feature.id,
        properties: feature.properties
      };
      var popup = feature.properties.popup;
      if (typeof popup !== "undefined" && popup !== null) layer.bindPopup(popup);
      layer.on("click", mouseHandler(self.id, layerId, group, "topojson_click", extraInfo), this);
      layer.on("mouseover", mouseHandler(self.id, layerId, group, "topojson_mouseover", extraInfo), this);
      layer.on("mouseout", mouseHandler(self.id, layerId, group, "topojson_mouseout", extraInfo), this);
    }
  });
  global.omnivore.topojson.parse(data, null, gjlayer);
  this.layerManager.addLayer(gjlayer, "topojson", layerId, group);
};

methods.removeTopoJSON = function (layerId) {
  this.layerManager.removeLayer("topojson", layerId);
};

methods.clearTopoJSON = function () {
  this.layerManager.clearLayers("topojson");
};

methods.addControl = function (html, position, layerId, classes) {
  function onAdd(map) {
    var div = _leaflet2.default.DomUtil.create("div", classes);
    if (typeof layerId !== "undefined" && layerId !== null) {
      div.setAttribute("id", layerId);
    }
    this._div = div;

    // It's possible for window.Shiny to be true but Shiny.initializeInputs to
    // not be, when a static leaflet widget is included as part of the shiny
    // UI directly (not through leafletOutput or uiOutput). In this case we
    // don't do the normal Shiny stuff as that will all happen when Shiny
    // itself loads and binds the entire doc.

    if (window.Shiny && _shiny2.default.initializeInputs) {
      _shiny2.default.renderHtml(html, this._div);
      _shiny2.default.initializeInputs(this._div);
      _shiny2.default.bindAll(this._div);
    } else {
      this._div.innerHTML = html;
    }

    return this._div;
  }
  function onRemove(map) {
    if (window.Shiny && _shiny2.default.unbindAll) {
      _shiny2.default.unbindAll(this._div);
    }
  }
  var Control = _leaflet2.default.Control.extend({
    options: { position: position },
    onAdd: onAdd,
    onRemove: onRemove
  });
  this.controls.add(new Control(), layerId, html);
};

methods.addCustomControl = function (control, layerId) {
  this.controls.add(control, layerId);
};

methods.removeControl = function (layerId) {
  this.controls.remove(layerId);
};

methods.clearControls = function () {
  this.controls.clear();
};

methods.addLegend = function (options) {
  var legend = _leaflet2.default.control({ position: options.position });
  var gradSpan = void 0;

  legend.onAdd = function (map) {
    var div = _leaflet2.default.DomUtil.create("div", options.className),
        colors = options.colors,
        labels = options.labels,
        legendHTML = "";
    if (options.type === "numeric") {
      (function () {
        // # Formatting constants.
        var singleBinHeight = 20; // The distance between tick marks, in px
        var vMargin = 8; // If 1st tick mark starts at top of gradient, how
        // many extra px are needed for the top half of the
        // 1st label? (ditto for last tick mark/label)
        var tickWidth = 4; // How wide should tick marks be, in px?
        var labelPadding = 6; // How much distance to reserve for tick mark?
        // (Must be >= tickWidth)

        // # Derived formatting parameters.

        // What's the height of a single bin, in percentage (of gradient height)?
        // It might not just be 1/(n-1), if the gradient extends past the tick
        // marks (which can be the case for pretty cut points).
        var singleBinPct = (options.extra.p_n - options.extra.p_1) / (labels.length - 1);
        // Each bin is `singleBinHeight` high. How tall is the gradient?
        var totalHeight = 1 / singleBinPct * singleBinHeight + 1;
        // How far should the first tick be shifted down, relative to the top
        // of the gradient?
        var tickOffset = singleBinHeight / singleBinPct * options.extra.p_1;

        gradSpan = (0, _jquery2.default)("<span/>").css({
          "background": "linear-gradient(" + colors + ")",
          "opacity": options.opacity,
          "height": totalHeight + "px",
          "width": "18px",
          "display": "block",
          "margin-top": vMargin + "px"
        });
        var leftDiv = (0, _jquery2.default)("<div/>").css("float", "left"),
            rightDiv = (0, _jquery2.default)("<div/>").css("float", "left");
        leftDiv.append(gradSpan);
        (0, _jquery2.default)(div).append(leftDiv).append(rightDiv).append((0, _jquery2.default)("<br clear=\"both\"/>"));

        // Have to attach the div to the body at this early point, so that the
        // svg text getComputedTextLength() actually works, below.
        document.body.appendChild(div);

        var ns = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(ns, "svg");
        rightDiv.append(svg);
        var g = document.createElementNS(ns, "g");
        (0, _jquery2.default)(g).attr("transform", "translate(0, " + vMargin + ")");
        svg.appendChild(g);

        // max label width needed to set width of svg, and right-justify text
        var maxLblWidth = 0;

        // Create tick marks and labels
        _jquery2.default.each(labels, function (i, label) {
          var y = tickOffset + i * singleBinHeight + 0.5;

          var thisLabel = document.createElementNS(ns, "text");
          (0, _jquery2.default)(thisLabel).text(labels[i]).attr("y", y).attr("dx", labelPadding).attr("dy", "0.5ex");
          g.appendChild(thisLabel);
          maxLblWidth = Math.max(maxLblWidth, thisLabel.getComputedTextLength());

          var thisTick = document.createElementNS(ns, "line");
          (0, _jquery2.default)(thisTick).attr("x1", 0).attr("x2", tickWidth).attr("y1", y).attr("y2", y).attr("stroke-width", 1);
          g.appendChild(thisTick);
        });

        // Now that we know the max label width, we can right-justify
        (0, _jquery2.default)(svg).find("text").attr("dx", labelPadding + maxLblWidth).attr("text-anchor", "end");
        // Final size for <svg>
        (0, _jquery2.default)(svg).css({
          width: maxLblWidth + labelPadding + "px",
          height: totalHeight + vMargin * 2 + "px"
        });

        if (options.na_color) {
          (0, _jquery2.default)(div).append("<div><i style=\"background:" + options.na_color + "\"></i> " + options.na_label + "</div>");
        }
      })();
    } else {
      if (options.na_color) {
        colors.push(options.na_color);
        labels.push(options.na_label);
      }
      for (var i = 0; i < colors.length; i++) {
        legendHTML += "<i style=\"background:" + colors[i] + ";opacity:" + options.opacity + "\"></i> " + labels[i] + "<br/>";
      }
      div.innerHTML = legendHTML;
    }
    if (options.title) (0, _jquery2.default)(div).prepend("<div style=\"margin-bottom:3px\"><strong>" + options.title + "</strong></div>");
    return div;
  };

  this.controls.add(legend, options.layerId);
};

methods.addLayersControl = function (baseGroups, overlayGroups, options) {
  var _this5 = this;

  // Only allow one layers control at a time
  methods.removeLayersControl.call(this);

  var firstLayer = true;
  var base = {};
  _jquery2.default.each((0, _util.asArray)(baseGroups), function (i, g) {
    var layer = _this5.layerManager.getLayerGroup(g, true);
    if (layer) {
      base[g] = layer;

      // Check if >1 base layers are visible; if so, hide all but the first one
      if (_this5.hasLayer(layer)) {
        if (firstLayer) {
          firstLayer = false;
        } else {
          _this5.removeLayer(layer);
        }
      }
    }
  });
  var overlay = {};
  _jquery2.default.each((0, _util.asArray)(overlayGroups), function (i, g) {
    var layer = _this5.layerManager.getLayerGroup(g, true);
    if (layer) {
      overlay[g] = layer;
    }
  });

  this.currentLayersControl = _leaflet2.default.control.layers(base, overlay, options);
  this.addControl(this.currentLayersControl);
};

methods.removeLayersControl = function () {
  if (this.currentLayersControl) {
    this.removeControl(this.currentLayersControl);
    this.currentLayersControl = null;
  }
};

methods.addScaleBar = function (options) {

  // Only allow one scale bar at a time
  methods.removeScaleBar.call(this);

  var scaleBar = _leaflet2.default.control.scale(options).addTo(this);
  this.currentScaleBar = scaleBar;
};

methods.removeScaleBar = function () {
  if (this.currentScaleBar) {
    this.currentScaleBar.removeFrom(this);
    this.currentScaleBar = null;
  }
};

methods.hideGroup = function (group) {
  var _this6 = this;

  _jquery2.default.each((0, _util.asArray)(group), function (i, g) {
    var layer = _this6.layerManager.getLayerGroup(g, true);
    if (layer) {
      _this6.removeLayer(layer);
    }
  });
};

methods.showGroup = function (group) {
  var _this7 = this;

  _jquery2.default.each((0, _util.asArray)(group), function (i, g) {
    var layer = _this7.layerManager.getLayerGroup(g, true);
    if (layer) {
      _this7.addLayer(layer);
    }
  });
};

function setupShowHideGroupsOnZoom(map) {
  if (map.leafletr._hasInitializedShowHideGroups) {
    return;
  }
  map.leafletr._hasInitializedShowHideGroups = true;

  function setVisibility(layer, visible) {
    if (visible !== map.hasLayer(layer)) {
      if (visible) map.addLayer(layer);else map.removeLayer(layer);
    }
  }

  function showHideGroupsOnZoom() {
    if (!map.layerManager) return;

    var zoom = map.getZoom();
    map.layerManager.getAllGroupNames().forEach(function (group) {
      var layer = map.layerManager.getLayerGroup(group, false);
      if (layer && typeof layer.zoomLevels !== "undefined") {
        setVisibility(layer, layer.zoomLevels === true || layer.zoomLevels.indexOf(zoom) >= 0);
      }
    });
  }

  map.showHideGroupsOnZoom = showHideGroupsOnZoom;
  map.on("zoomend", showHideGroupsOnZoom);
}

methods.setGroupOptions = function (group, options) {
  var _this8 = this;

  _jquery2.default.each((0, _util.asArray)(group), function (i, g) {
    var layer = _this8.layerManager.getLayerGroup(g, true);
    // This slightly tortured check is because 0 is a valid value for zoomLevels
    if (typeof options.zoomLevels !== "undefined" && options.zoomLevels !== null) {
      layer.zoomLevels = (0, _util.asArray)(options.zoomLevels);
    }
  });

  setupShowHideGroupsOnZoom(this);
  this.showHideGroupsOnZoom();
};

methods.addRasterImage = function (uri, bounds, opacity, attribution, layerId, group) {
  // uri is a data URI containing an image. We want to paint this image as a
  // layer at (top-left) bounds[0] to (bottom-right) bounds[1].

  // We can't simply use ImageOverlay, as it uses bilinear scaling which looks
  // awful as you zoom in (and sometimes shifts positions or disappears).
  // Instead, we'll use a TileLayer.Canvas to draw pieces of the image.

  // First, some helper functions.

  // degree2tile converts latitude, longitude, and zoom to x and y tile
  // numbers. The tile numbers returned can be non-integral, as there's no
  // reason to expect that the lat/lng inputs are exactly on the border of two
  // tiles.
  //
  // We'll use this to convert the bounds we got from the server, into coords
  // in tile-space at a given zoom level. Note that once we do the conversion,
  // we don't to do any more trigonometry to convert between pixel coordinates
  // and tile coordinates; the source image pixel coords, destination canvas
  // pixel coords, and tile coords all can be scaled linearly.
  function degree2tile(lat, lng, zoom) {
    // See http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
    var latRad = lat * Math.PI / 180;
    var n = Math.pow(2, zoom);
    var x = (lng + 180) / 360 * n;
    var y = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n;
    return { x: x, y: y };
  }

  // Given a range [from,to) and either one or two numbers, returns true if
  // there is any overlap between [x,x1) and the range--or if x1 is omitted,
  // then returns true if x is within [from,to).
  function overlap(from, to, x, /* optional */x1) {
    if (arguments.length == 3) x1 = x;
    return x < to && x1 >= from;
  }

  function getCanvasSmoothingProperty(ctx) {
    var candidates = ["imageSmoothingEnabled", "mozImageSmoothingEnabled", "webkitImageSmoothingEnabled", "msImageSmoothingEnabled"];
    for (var i = 0; i < candidates.length; i++) {
      if (typeof ctx[candidates[i]] !== "undefined") {
        return candidates[i];
      }
    }
    return null;
  }

  // Our general strategy is to:
  // 1. Load the data URI in an Image() object, so we can get its pixel
  //    dimensions and the underlying image data. (We could have done this
  //    by not encoding as PNG at all but just send an array of RGBA values
  //    from the server, but that would inflate the JSON too much.)
  // 2. Create a hidden canvas that we use just to extract the image data
  //    from the Image (using Context2D.getImageData()).
  // 3. Create a TileLayer.Canvas and add it to the map.

  // We want to synchronously create and attach the TileLayer.Canvas (so an
  // immediate call to clearRasters() will be respected, for example), but
  // Image loads its data asynchronously. Fortunately we can resolve this
  // by putting TileLayer.Canvas into async mode, which will let us create
  // and attach the layer but have it wait until the image is loaded before
  // it actually draws anything.

  // These are the variables that we will populate once the image is loaded.
  var imgData = null; // 1d row-major array, four [0-255] integers per pixel
  var imgDataMipMapper = null;
  var w = null; // image width in pixels
  var h = null; // image height in pixels

  // We'll use this array to store callbacks that need to be invoked once
  // imgData, w, and h have been resolved.
  var imgDataCallbacks = [];

  // Consumers of imgData, w, and h can call this to be notified when data
  // is available. Unlike most async/promise-based APIs, the callback will
  // be invoked immediately/synchronously if the data is already available.
  function getImageData(callback) {
    if (imgData != null) {
      callback(imgData, w, h, imgDataMipMapper);
    } else {
      imgDataCallbacks.push(callback);
    }
  }

  var img = new Image();
  img.onload = function () {
    // Save size
    w = img.width;
    h = img.height;

    // Create a dummy canvas to extract the image data
    var imgDataCanvas = document.createElement("canvas");
    imgDataCanvas.width = w;
    imgDataCanvas.height = h;
    imgDataCanvas.style.display = "none";
    document.body.appendChild(imgDataCanvas);

    var imgDataCtx = imgDataCanvas.getContext("2d");
    imgDataCtx.drawImage(img, 0, 0);

    // Save the image data.
    imgData = imgDataCtx.getImageData(0, 0, w, h).data;
    imgDataMipMapper = new _mipmapper2.default(img);

    // Done with the canvas, remove it from the page so it can be gc'd.
    document.body.removeChild(imgDataCanvas);

    // Alert any getImageData callers who are waiting.
    for (var i = 0; i < imgDataCallbacks.length; i++) {
      imgDataCallbacks[i](imgData, w, h, imgDataMipMapper);
    }
    imgDataCallbacks = [];
  };
  img.src = uri;

  var canvasTiles = _leaflet2.default.gridLayer({
    opacity: opacity,
    attribution: attribution,
    detectRetina: true,
    async: true
  });

  canvasTiles.createTile = function (tilePoint, done) {
    var zoom = tilePoint.z;
    var canvas = _leaflet2.default.DomUtil.create("canvas", "leaflet-tile");
    var error = void 0;

    // setup tile width and height according to the options
    var size = this.getTileSize();
    canvas.width = size.x;
    canvas.height = size.y;

    getImageData(function (imgData, w, h, mipmapper) {
      try {
        var _ret7 = function () {
          // The Context2D we'll being drawing onto. It's always 256x256.
          var ctx = canvas.getContext("2d");

          // Convert our image data's top-left and bottom-right locations into
          // x/y tile coordinates. This is essentially doing a spherical mercator
          // projection, then multiplying by 2^zoom.
          var topLeft = degree2tile(bounds[0][0], bounds[0][1], zoom);
          var bottomRight = degree2tile(bounds[1][0], bounds[1][1], zoom);
          // The size of the image in x/y tile coordinates.
          var extent = { x: bottomRight.x - topLeft.x, y: bottomRight.y - topLeft.y };

          // Short circuit if tile is totally disjoint from image.
          if (!overlap(tilePoint.x, tilePoint.x + 1, topLeft.x, bottomRight.x)) return {
              v: void 0
            };
          if (!overlap(tilePoint.y, tilePoint.y + 1, topLeft.y, bottomRight.y)) return {
              v: void 0
            };

          // The linear resolution of the tile we're drawing is always 256px per tile unit.
          // If the linear resolution (in either direction) of the image is less than 256px
          // per tile unit, then use nearest neighbor; otherwise, use the canvas's built-in
          // scaling.
          var imgRes = {
            x: w / extent.x,
            y: h / extent.y
          };

          // We can do the actual drawing in one of three ways:
          // - Call drawImage(). This is easy and fast, and results in smooth
          //   interpolation (bilinear?). This is what we want when we are
          //   reducing the image from its native size.
          // - Call drawImage() with imageSmoothingEnabled=false. This is easy
          //   and fast and gives us nearest-neighbor interpolation, which is what
          //   we want when enlarging the image. However, it's unsupported on many
          //   browsers (including QtWebkit).
          // - Do a manual nearest-neighbor interpolation. This is what we'll fall
          //   back to when enlarging, and imageSmoothingEnabled isn't supported.
          //   In theory it's slower, but still pretty fast on my machine, and the
          //   results look the same AFAICT.

          // Is imageSmoothingEnabled supported? If so, we can let canvas do
          // nearest-neighbor interpolation for us.
          var smoothingProperty = getCanvasSmoothingProperty(ctx);

          if (smoothingProperty || imgRes.x >= 256 && imgRes.y >= 256) {
            // Use built-in scaling

            // Turn off anti-aliasing if necessary
            if (smoothingProperty) {
              ctx[smoothingProperty] = imgRes.x >= 256 && imgRes.y >= 256;
            }

            // Don't necessarily draw with the full-size image; if we're
            // downscaling, use the mipmapper to get a pre-downscaled image
            // (see comments on Mipmapper class for why this matters).
            mipmapper.getBySize(extent.x * 256, extent.y * 256, function (mip) {
              // It's possible that the image will go off the edge of the canvas--
              // that's OK, the canvas should clip appropriately.
              ctx.drawImage(mip,
              // Convert abs tile coords to rel tile coords, then *256 to convert
              // to rel pixel coords
              (topLeft.x - tilePoint.x) * 256, (topLeft.y - tilePoint.y) * 256,
              // Always draw the whole thing and let canvas clip; so we can just
              // convert from size in tile coords straight to pixels
              extent.x * 256, extent.y * 256);
            });
          } else {
            // Use manual nearest-neighbor interpolation

            // Calculate the source image pixel coordinates that correspond with
            // the top-left and bottom-right of this tile. (If the source image
            // only partially overlaps the tile, we use max/min to limit the
            // sourceStart/End to only reflect the overlapping portion.)
            var sourceStart = {
              x: Math.max(0, Math.floor((tilePoint.x - topLeft.x) * imgRes.x)),
              y: Math.max(0, Math.floor((tilePoint.y - topLeft.y) * imgRes.y))
            };
            var sourceEnd = {
              x: Math.min(w, Math.ceil((tilePoint.x + 1 - topLeft.x) * imgRes.x)),
              y: Math.min(h, Math.ceil((tilePoint.y + 1 - topLeft.y) * imgRes.y))
            };

            // The size, in dest pixels, that each source pixel should occupy.
            // This might be greater or less than 1 (e.g. if x and y resolution
            // are very different).
            var pixelSize = {
              x: 256 / imgRes.x,
              y: 256 / imgRes.y
            };

            // For each pixel in the source image that overlaps the tile...
            for (var row = sourceStart.y; row < sourceEnd.y; row++) {
              for (var col = sourceStart.x; col < sourceEnd.x; col++) {
                // ...extract the pixel data...
                var i = (row * w + col) * 4;
                var r = imgData[i];
                var g = imgData[i + 1];
                var b = imgData[i + 2];
                var a = imgData[i + 3];
                ctx.fillStyle = "rgba(" + [r, g, b, a / 255].join(",") + ")";

                // ...calculate the corresponding pixel coord in the dest image
                // where it should be drawn...
                var pixelPos = {
                  x: (col / imgRes.x + topLeft.x - tilePoint.x) * 256,
                  y: (row / imgRes.y + topLeft.y - tilePoint.y) * 256
                };

                // ...and draw a rectangle there.
                ctx.fillRect(Math.round(pixelPos.x), Math.round(pixelPos.y),
                // Looks crazy, but this is necessary to prevent rounding from
                // causing overlap between this rect and its neighbors. The
                // minuend is the location of the next pixel, while the
                // subtrahend is the position of the current pixel (to turn an
                // absolute coordinate to a width/height). Yes, I had to look
                // up minuend and subtrahend.
                Math.round(pixelPos.x + pixelSize.x) - Math.round(pixelPos.x), Math.round(pixelPos.y + pixelSize.y) - Math.round(pixelPos.y));
              }
            }
          }
        }();

        if ((typeof _ret7 === "undefined" ? "undefined" : _typeof(_ret7)) === "object") return _ret7.v;
      } finally {
        done(error, canvas);
      }
    });
    return canvas;
  };

  this.layerManager.addLayer(canvasTiles, "image", layerId, group);
};

methods.removeImage = function (layerId) {
  this.layerManager.removeLayer("image", layerId);
};

methods.clearImages = function () {
  this.layerManager.clearLayers("image");
};

methods.addMeasure = function (options) {
  // if a measureControl already exists, then remove it and
  //   replace with a new one
  methods.removeMeasure.call(this);
  this.measureControl = _leaflet2.default.control.measure(options);
  this.addControl(this.measureControl);
};

methods.removeMeasure = function () {
  if (this.measureControl) {
    this.removeControl(this.measureControl);
    this.measureControl = null;
  }
};

methods.addSelect = function (ctGroup) {
  var _this9 = this;

  methods.removeSelect.call(this);

  this._selectButton = _leaflet2.default.easyButton({
    states: [{
      stateName: "select-inactive",
      icon: "ion-qr-scanner",
      title: "Make a selection",
      onClick: function onClick(btn, map) {
        btn.state("select-active");
        _this9._locationFilter = new _leaflet2.default.LocationFilter2();

        if (ctGroup) {
          (function () {
            var selectionHandle = new global.crosstalk.SelectionHandle(ctGroup);
            selectionHandle.on("change", function (e) {
              if (e.sender !== selectionHandle) {
                if (_this9._locationFilter) {
                  _this9._locationFilter.disable();
                  btn.state("select-inactive");
                }
              }
            });
            var handler = function handler(e) {
              _this9.layerManager.brush(_this9._locationFilter.getBounds(), { sender: selectionHandle });
            };
            _this9._locationFilter.on("enabled", handler);
            _this9._locationFilter.on("change", handler);
            _this9._locationFilter.on("disabled", function () {
              selectionHandle.close();
              _this9._locationFilter = null;
            });
          })();
        }

        _this9._locationFilter.addTo(map);
      }
    }, {
      stateName: "select-active",
      icon: "ion-close-round",
      title: "Dismiss selection",
      onClick: function onClick(btn, map) {
        btn.state("select-inactive");
        _this9._locationFilter.disable();
        // If explicitly dismissed, clear the crosstalk selections
        _this9.layerManager.unbrush();
      }
    }]
  });

  this._selectButton.addTo(this);
};

methods.removeSelect = function () {
  if (this._locationFilter) {
    this._locationFilter.disable();
  }

  if (this._selectButton) {
    this.removeControl(this._selectButton);
    this._selectButton = null;
  }
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./cluster-layer-store":1,"./crs_utils":3,"./dataframe":4,"./global/htmlwidgets":6,"./global/jquery":7,"./global/leaflet":8,"./global/shiny":10,"./mipmapper":14,"./util":15}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// This class simulates a mipmap, which shrinks images by powers of two. This
// stepwise reduction results in "pixel-perfect downscaling" (where every
// pixel of the original image has some contribution to the downscaled image)
// as opposed to a single-step downscaling which will discard a lot of data
// (and with sparse images at small scales can give very surprising results).

var Mipmapper = function () {
  function Mipmapper(img) {
    _classCallCheck(this, Mipmapper);

    this._layers = [img];
  }

  // The various functions on this class take a callback function BUT MAY OR MAY
  // NOT actually behave asynchronously.


  _createClass(Mipmapper, [{
    key: "getBySize",
    value: function getBySize(desiredWidth, desiredHeight, callback) {
      var _this = this;

      var i = 0;
      var lastImg = this._layers[0];
      var testNext = function testNext() {
        _this.getByIndex(i, function (img) {
          // If current image is invalid (i.e. too small to be rendered) or
          // it's smaller than what we wanted, return the last known good image.
          if (!img || img.width < desiredWidth || img.height < desiredHeight) {
            callback(lastImg);
            return;
          } else {
            lastImg = img;
            i++;
            testNext();
            return;
          }
        });
      };
      testNext();
    }
  }, {
    key: "getByIndex",
    value: function getByIndex(i, callback) {
      var _this2 = this;

      if (this._layers[i]) {
        callback(this._layers[i]);
        return;
      }

      this.getByIndex(i - 1, function (prevImg) {
        if (!prevImg) {
          // prevImg could not be calculated (too small, possibly)
          callback(null);
          return;
        }
        if (prevImg.width < 2 || prevImg.height < 2) {
          // Can't reduce this image any further
          callback(null);
          return;
        }
        // If reduce ever becomes truly asynchronous, we should stuff a promise or
        // something into this._layers[i] before calling this.reduce(), to prevent
        // redundant reduce operations from happening.
        _this2.reduce(prevImg, function (reducedImg) {
          _this2._layers[i] = reducedImg;
          callback(reducedImg);
          return;
        });
      });
    }
  }, {
    key: "reduce",
    value: function reduce(img, callback) {
      var imgDataCanvas = document.createElement("canvas");
      imgDataCanvas.width = Math.ceil(img.width / 2);
      imgDataCanvas.height = Math.ceil(img.height / 2);
      imgDataCanvas.style.display = "none";
      document.body.appendChild(imgDataCanvas);
      try {
        var imgDataCtx = imgDataCanvas.getContext("2d");
        imgDataCtx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
        callback(imgDataCanvas);
      } finally {
        document.body.removeChild(imgDataCanvas);
      }
    }
  }]);

  return Mipmapper;
}();

exports.default = Mipmapper;


},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.recycle = recycle;
exports.asArray = asArray;
function log(message) {
  /* eslint-disable no-console */
  if (console && console.log) console.log(message);
  /* eslint-enable no-console */
}

function recycle(values, length, inPlace) {
  if (length === 0 && !inPlace) return [];

  if (!(values instanceof Array)) {
    if (inPlace) {
      throw new Error("Can't do in-place recycling of a non-Array value");
    }
    values = [values];
  }
  if (typeof length === "undefined") length = values.length;

  var dest = inPlace ? values : [];
  var origLength = values.length;
  while (dest.length < length) {
    dest.push(values[dest.length % origLength]);
  }
  if (dest.length > length) {
    dest.splice(length, dest.length - length);
  }
  return dest;
}

function asArray(value) {
  if (value instanceof Array) return value;else return [value];
}


},{}]},{},[11]);

window.google=window.google||{},google.maps=google.maps||{},function(){var t=google.maps.modules={};google.maps.__gjsload__=function(n,e){t[n]=e},google.maps.Load=function(t){delete google.maps.Load,t([.009999999776482582,[null,[["https://khms0.googleapis.com/kh?v=729&hl=en-GB&","https://khms1.googleapis.com/kh?v=729&hl=en-GB&"],null,null,null,1,"729",["https://khms0.google.com/kh?v=729&hl=en-GB&","https://khms1.google.com/kh?v=729&hl=en-GB&"]],null,null,null,null,[["https://cbks0.googleapis.com/cbk?","https://cbks1.googleapis.com/cbk?"]],[["https://khms0.googleapis.com/kh?v=106&hl=en-GB&","https://khms1.googleapis.com/kh?v=106&hl=en-GB&"],null,null,null,null,"106",["https://khms0.google.com/kh?v=106&hl=en-GB&","https://khms1.google.com/kh?v=106&hl=en-GB&"]],[["https://mts0.googleapis.com/mapslt?hl=en-GB&","https://mts1.googleapis.com/mapslt?hl=en-GB&"]],null,null,null,[["https://mts0.googleapis.com/mapslt?hl=en-GB&","https://mts1.googleapis.com/mapslt?hl=en-GB&"]]],["en-GB","US",null,0,null,null,"https://maps.gstatic.com/mapfiles/","https://csi.gstatic.com","https://maps.googleapis.com","https://maps.googleapis.com",null,"https://maps.google.com","https://gg.google.com","https://maps.gstatic.com/maps-api-v3/api/images/","https://www.google.com/maps",0,"https://www.google.com"],["https://maps.googleapis.com/maps-api-v3/api/js/29/12/intl/en_gb","3.29.12"],[372436182],1,null,null,null,null,null,"",null,null,1,"https://khms.googleapis.com/mz?v=729&","AIzaSyAQvaBc5_RruTllCvOxy3i9YNFYlaDzaJ8","https://earthbuilder.googleapis.com","https://earthbuilder.googleapis.com",null,"https://mts.googleapis.com/maps/vt/icon",[["https://maps.googleapis.com/maps/vt"],["https://maps.googleapis.com/maps/vt"],null,null,null,null,null,null,null,null,null,null,["https://www.google.com/maps/vt"],"/maps/vt",385e6,385],2,500,[null,null,null,null,"https://www.google.com/maps/preview/log204","","https://static.panoramio.com.storage.googleapis.com/photos/",["https://geo0.ggpht.com/cbk","https://geo1.ggpht.com/cbk","https://geo2.ggpht.com/cbk","https://geo3.ggpht.com/cbk"],"https://maps.googleapis.com/maps/api/js/GeoPhotoService.GetMetadata","https://maps.googleapis.com/maps/api/js/GeoPhotoService.SingleImageSearch",["https://lh3.ggpht.com/","https://lh4.ggpht.com/","https://lh5.ggpht.com/","https://lh6.ggpht.com/"]],["https://www.google.com/maps/api/js/master?pb=!1m2!1u29!2s12!2sen-GB!3sUS!4s29/12/intl/en_gb","https://www.google.com/maps/api/js/widget?pb=!1m2!1u29!2s12!2sen-GB"],null,0,null,"/maps/api/js/ApplicationService.GetEntityDetails",0,null,null,[null,null,null,null,null,null,null,null,null,[0,0]],null,[],["29.12"]],n)};var n=(new Date).getTime()}(),function(t){var n,e,i,o,r,a,s,c,h,u,f,l,p,d,g,b,m,y,v,w,E,k,L,A,M,_,T,O,I,S,R,P,D,N,j,x,G,V,C,F,z,K,U,B,W,Z,q,Y,Q,X,H,$,J,tn,nn,en,on,rn,an,sn,cn,hn,un,fn,ln,pn,dn,gn,bn,mn,yn,vn,wn,En,kn,Ln,An,Mn,_n,Tn,On,In,Sn,Rn,Pn,Dn,Nn,jn,xn,Gn,Vn,Cn,Fn,zn,Kn,Un,Bn,Wn,Zn,qn,Yn,Qn,Xn,Hn,$n,Jn,te,ne,ee,ie,oe,re,ae,se,ce,he,ue,fe,le,pe,de,ge,be,me,ye,ve;t.aa="ERROR",t.ba="INVALID_REQUEST",t.ca="MAX_DIMENSIONS_EXCEEDED",t.da="MAX_ELEMENTS_EXCEEDED",t.ea="MAX_WAYPOINTS_EXCEEDED",t.ha="NOT_FOUND",t.ia="OK",t.ja="OVER_QUERY_LIMIT",t.ka="REQUEST_DENIED",t.la="UNKNOWN_ERROR",t.ma="ZERO_RESULTS",t.na=function(){return function(t){return t}},t.oa=function(){return function(){}},t.pa=function(t){return function(n){this[t]=n}},t.qa=function(t){return function(){return this[t]}},t.ra=function(t){return function(){return t}},t.ua=function(n){return function(){return t.sa[n].apply(this,arguments)}},n=function(){n=t.oa(),be.Symbol||(be.Symbol=me)},t.Ba=function(){n();var e=be.Symbol.iterator;e||(e=be.Symbol.iterator=be.Symbol("iterator")),"function"!=typeof Array.prototype[e]&&ge(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return t.Aa(this)}}),t.Ba=t.oa()},t.Aa=function(t){var n=0;return e(function(){return n<t.length?{done:!1,value:t[n++]}:{done:!0}})},e=function(n){return t.Ba(),n={next:n},n[be.Symbol.iterator]=function(){return this},n},i=function(t,n){if(n){var e=be;t=t.split(".");for(var i=0;i<t.length-1;i++){var o=t[i];o in e||(e[o]={}),e=e[o]}t=t[t.length-1],i=e[t],n=n(i),n!=i&&null!=n&&ge(e,t,{configurable:!0,writable:!0,value:n})}},t.m=function(t){return void 0!==t},t.Fa=function(t){return"string"==typeof t},t.Ga=function(t){return"number"==typeof t},t.Ha=t.oa(),t.Ia=function(t){var n=typeof t;if("object"==n){if(!t)return"null";if(t instanceof Array)return"array";if(t instanceof Object)return n;var e=Object.prototype.toString.call(t);if("[object Window]"==e)return"object";if("[object Array]"==e||"number"==typeof t.length&&void 0!==t.splice&&void 0!==t.propertyIsEnumerable&&!t.propertyIsEnumerable("splice"))return"array";if("[object Function]"==e||void 0!==t.call&&void 0!==t.propertyIsEnumerable&&!t.propertyIsEnumerable("call"))return"function"}else if("function"==n&&void 0===t.call)return"object";return n},t.Ja=function(n){return"array"==t.Ia(n)},t.Ka=function(n){var e=t.Ia(n);return"array"==e||"object"==e&&"number"==typeof n.length},t.La=function(n){return"function"==t.Ia(n)},t.Ma=function(t){var n=typeof t;return"object"==n&&null!=t||"function"==n},t.Pa=function(t){return t[ye]||(t[ye]=++ve)},o=function(t){return t.call.apply(t.bind,arguments)},r=function(t,n){if(!t)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,e),t.apply(n,i)}}return function(){return t.apply(n,arguments)}},t.p=function(){return t.p=Function.prototype.bind&&-1!=(""+Function.prototype.bind).indexOf("native code")?o:r,t.p.apply(null,arguments)},t.Sa=function(){return+new Date},t.t=function(t,n){function e(){}e.prototype=n.prototype,t.nb=n.prototype,t.prototype=new e,t.prototype.constructor=t,t.Je=function(t,e){for(var i=Array(arguments.length-2),o=2;o<arguments.length;o++)i[o-2]=arguments[o];n.prototype[e].apply(t,i)}},t.Ta=function(t){return t.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},t.Va=function(){return-1!=t.Ua.toLowerCase().indexOf("webkit")},t.Xa=function(n,e){var i=0;n=t.Ta(n+"").split("."),e=t.Ta(e+"").split(".");for(var o=Math.max(n.length,e.length),r=0;0==i&&o>r;r++){var s=n[r]||"",c=e[r]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],c=/(\d*)(\D*)(.*)/.exec(c)||["","","",""],0==s[0].length&&0==c[0].length)break;i=a(0==s[1].length?0:window.parseInt(s[1],10),0==c[1].length?0:window.parseInt(c[1],10))||a(0==s[2].length,0==c[2].length)||a(s[2],c[2]),s=s[3],c=c[3]}while(0==i)}return i},a=function(t,n){return n>t?-1:t>n?1:0},t.Ya=function(n,e,i){if(i=null==i?0:0>i?Math.max(0,n.length+i):i,t.Fa(n))return t.Fa(e)&&1==e.length?n.indexOf(e,i):-1;for(;i<n.length;i++)if(i in n&&n[i]===e)return i;return-1},t.v=function(n,e,i){for(var o=n.length,r=t.Fa(n)?n.split(""):n,a=0;o>a;a++)a in r&&e.call(i,r[a],a,n)},s=function(n,e){for(var i=n.length,o=t.Fa(n)?n.split(""):n,r=0;i>r;r++)if(r in o&&e.call(void 0,o[r],r,n))return r;return-1},t.bb=function(n,e){e=t.Ya(n,e);var i;return(i=e>=0)&&t.ab(n,e),i},t.ab=function(t,n){Array.prototype.splice.call(t,n,1)},t.cb=function(t,n,e){return 2<arguments.length?Array.prototype.slice.call(t,n,e):Array.prototype.slice.call(t,n)},t.w=function(t){return t?t.length:0},t.eb=function(n,e){t.db(e,function(t){n[t]=e[t]})},t.fb=function(t){for(var n in t)return!1;return!0},t.gb=function(t,n,e){return null!=n&&(t=Math.max(t,n)),null!=e&&(t=Math.min(t,e)),t},t.hb=function(t,n,e){return e-=n,((t-n)%e+e)%e+n},t.ib=function(t,n,e){return Math.abs(t-n)<=(e||1e-9)},t.jb=function(n,e){for(var i=[],o=t.w(n),r=0;o>r;++r)i.push(e(n[r],r));return i},t.lb=function(n,e){for(var i=t.kb(void 0,t.w(e)),o=t.kb(void 0,0);i>o;++o)n.push(e[o])},t.y=function(t){return"number"==typeof t},t.mb=function(t){return"object"==typeof t},t.kb=function(t,n){return null==t?n:t},t.nb=function(t){return"string"==typeof t},t.ob=function(t){return t===!!t},t.db=function(t,n){for(var e in t)n(e,t[e])},t.qb=function(n){return function(){var e=this,i=arguments;t.pb(function(){n.apply(e,i)})}},t.pb=function(t){return window.setTimeout(t,0)},c=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)?t[n]:void 0},t.sb=function(t){window.console&&window.console.error&&window.console.error(t)},t.tb=function(t){t.cancelBubble=!0,t.stopPropagation&&t.stopPropagation()},t.ub=function(n){n.preventDefault&&t.m(n.defaultPrevented)?n.preventDefault():n.returnValue=!1},t.vb=function(n){n=n||window.event,t.tb(n),t.ub(n)},t.wb=function(n){n.handled=!0,t.m(n.bubbles)||(n.returnValue="handled")},h=function(t,n){return t.__e3_||(t.__e3_={}),t=t.__e3_,t[n]||(t[n]={}),t[n]},u=function(n,e){var i=n.__e3_||{};if(e)n=i[e]||{};else for(e in n={},i)t.eb(n,i[e]);return n},f=function(t,n){return function(e){return n.call(t,e,this)}},l=function(n,e,i){return function(){var o=[e,n];t.lb(o,arguments),t.A.trigger.apply(this,o),i&&t.wb.apply(null,arguments)}},p=function(t,n,e,i){this.f=t,this.b=n,this.j=e,this.l=null,this.m=i,this.id=++ke,h(t,n)[this.id]=this,we&&"tagName"in t&&(Ee[this.id]=this)},d=function(t){return t.l=function(n){if(n||(n=window.event),n&&!n.target)try{n.target=n.srcElement}catch(e){}var i=t.j.apply(t.f,[n]);return n&&"click"==n.type&&(n=n.srcElement)&&"A"==n.tagName&&"javascript:void(0)"==n.href?!1:i}},t.Gb=function(n){return""+(t.Ma(n)?t.Pa(n):n)},t.D=t.oa(),g=function(n,e){var i=e+"_changed";n[i]?n[i]():n.changed(e),i=m(n,e);for(var o in i){var r=i[o];g(r.Gc,r.hb)}t.A.trigger(n,e.toLowerCase()+"_changed")},t.Kb=function(t){return Le[t]||(Le[t]=t.substr(0,1).toUpperCase()+t.substr(1))},b=function(t){return t.gm_accessors_||(t.gm_accessors_={}),t.gm_accessors_},m=function(t,n){return t.gm_bindings_||(t.gm_bindings_={}),t.gm_bindings_.hasOwnProperty(n)||(t.gm_bindings_[n]={}),t.gm_bindings_[n]},t.Mb=function(n){return-1!=t.Ua.indexOf(n)},t.Nb=function(t,n,e){for(var i in t)n.call(e,t[i],i,t)},t.Ob=function(){return t.Mb("Trident")||t.Mb("MSIE")},t.Qb=function(){return t.Mb("Safari")&&!(y()||t.Mb("Coast")||t.Mb("Opera")||t.Mb("Edge")||t.Mb("Silk")||t.Mb("Android"))},y=function(){return(t.Mb("Chrome")||t.Mb("CriOS"))&&!t.Mb("Edge")},t.Rb=function(){return t.Mb("iPhone")&&!t.Mb("iPod")&&!t.Mb("iPad")},t.Sb=function(n){return t.Sb[" "](n),n},v=function(t,n){var e=Te;return Object.prototype.hasOwnProperty.call(e,t)?e[t]:e[t]=n(t)},w=function(){var n=t.Vb.document;return n?n.documentMode:void 0},t.Yb=function(n){return v(n,function(){return 0<=t.Xa(t.Xb,n)})},E=function(t,n,e){this.l=e,this.j=t,this.m=n,this.f=0,this.b=null},t.$b=t.na(),k=function(n){t.Vb.setTimeout(function(){throw n},0)},L=function(){var n=t.bc.f;n=je(n),!t.La(t.Vb.setImmediate)||t.Vb.Window&&t.Vb.Window.prototype&&!t.Mb("Edge")&&t.Vb.Window.prototype.setImmediate==t.Vb.setImmediate?(De||(De=A()),De(n)):t.Vb.setImmediate(n)},A=function(){var n=t.Vb.MessageChannel;if(void 0===n&&"undefined"!=typeof window&&window.postMessage&&window.addEventListener&&!t.Mb("Presto")&&(n=function(){var n=window.document.createElement("IFRAME");n.style.display="none",n.src="",window.document.documentElement.appendChild(n);var e=n.contentWindow;n=e.document,n.open(),n.write(""),n.close();var i="callImmediate"+Math.random(),o="file:"==e.location.protocol?"*":e.location.protocol+"//"+e.location.host;n=t.p(function(t){"*"!=o&&t.origin!=o||t.data!=i||this.port1.onmessage()},this),e.addEventListener("message",n,!1),this.port1={},this.port2={postMessage:function(){e.postMessage(i,o)}}}),void 0!==n&&!t.Ob()){var e=new n,i={},o=i;return e.port1.onmessage=function(){if(t.m(i.next)){i=i.next;var n=i.rg;i.rg=null,n()}},function(t){o.next={rg:t},o=o.next,e.port2.postMessage(0)}}return void 0!==window.document&&"onreadystatechange"in window.document.createElement("SCRIPT")?function(t){var n=window.document.createElement("SCRIPT");n.onreadystatechange=function(){n.onreadystatechange=null,n.parentNode.removeChild(n),n=null,t(),t=null},window.document.documentElement.appendChild(n)}:function(n){t.Vb.setTimeout(n,0)}},M=function(){this.f=this.b=null},_=function(){this.next=this.b=this.Dc=null},t.bc=function(n,e){t.bc.b||t.bc.m(),t.bc.j||(t.bc.b(),t.bc.j=!0),t.bc.l.add(n,e)},t.lc=function(t){return t*Math.PI/180},t.mc=function(t){return 180*t/Math.PI},T=function(t){this.message=t,this.name="InvalidValueError",this.stack=Error().stack},t.oc=function(t,n){var e="";if(null!=n){if(!(n instanceof T))return n;e=": "+n.message}return new T(t+e)},t.qc=function(n){if(!(n instanceof T))throw n;t.sb(n.name+": "+n.message)},t.rc=function(n,e){var i=i?i+": ":"";return function(o){if(!o||!t.mb(o))throw t.oc(i+"not an Object");var r,a={};for(r in o)if(a[r]=o[r],!e&&!n[r])throw t.oc(i+"unknown property "+r);for(r in n)try{var s=n[r](a[r]);(t.m(s)||Object.prototype.hasOwnProperty.call(o,r))&&(a[r]=n[r](a[r]))}catch(c){throw t.oc(i+"in property "+r,c)}return a}},O=function(t){try{return!!t.cloneNode}catch(n){return!1}},t.tc=function(n,e,i){return i?function(i){if(i instanceof n)return i;try{return new n(i)}catch(o){throw t.oc("when calling new "+e,o)}}:function(i){if(i instanceof n)return i;throw t.oc("not an instance of "+e)}},t.uc=function(n){return function(e){for(var i in n)if(n[i]==e)return e;throw t.oc(e)}},t.vc=function(n){return function(e){if(!t.Ja(e))throw t.oc("not an Array");return t.jb(e,function(e,i){try{return n(e)}catch(o){throw t.oc("at index "+i,o)}})}},t.wc=function(n,e){return function(i){if(n(i))return i;throw t.oc(e||""+i)}},t.xc=function(n){return function(e){for(var i=[],o=0,r=n.length;r>o;++o){var a=n[o];try{(a.Nf||a)(e)}catch(s){if(!(s instanceof T))throw s;i.push(s.message);continue}return(a.then||a)(e)}throw t.oc(i.join("; and "))}},t.yc=function(t,n){return function(e){return n(t(e))}},t.zc=function(t){return function(n){return null==n?n:t(n)}},I=function(n){return function(e){if(e&&null!=e[n])return e;throw t.oc("no "+n+" property")}},t.F=function(n,e,i){if(n&&(void 0!==n.lat||void 0!==n.lng))try{Ce(n),e=n.lng,n=n.lat,i=!1}catch(o){t.qc(o)}n-=0,e-=0,i||(n=t.gb(n,-90,90),180!=e&&(e=t.hb(e,-180,180))),this.lat=function(){return n},this.lng=function(){return e}},t.Gc=function(n){return t.lc(n.lat())},t.Hc=function(n){return t.lc(n.lng())},S=function(t,n){return n=Math.pow(10,n),Math.round(t*n)/n},R=t.oa(),t.Kc=function(n){try{return n instanceof t.F?n:(n=Ce(n),new t.F(n.lat,n.lng))}catch(e){throw t.oc("not a LatLng or LatLngLiteral",e)}},t.Lc=function(n){this.b=t.Kc(n)},P=function(n){if(n instanceof R)return n;try{return new t.Lc(t.Kc(n))}catch(e){}throw t.oc("not a Geometry or LatLng or LatLngLiteral object")},t.Nc=function(n,e){return n?function(){--n||e()}:(e(),t.Ha)},t.Oc=function(t,n,e){var i=t.getElementsByTagName("head")[0];return t=t.createElement("script"),t.type="text/javascript",t.charset="UTF-8",t.src=n,e&&(t.onerror=e),i.appendChild(t),t},D=function(){for(var t="",n=0,e=arguments.length;e>n;++n){var i=arguments[n];i.length&&"/"==i[0]?t=i:(t&&"/"!=t[t.length-1]&&(t+="/"),t+=i)}return t},N=function(t){this.j=window.document,this.b={},this.f=t},j=function(){this.l={},this.f={},this.m={},this.b={},this.j=new V},x=function(n,e){n.l[e]||(n.l[e]=!0,C(n.j,function(i){for(var o=i.b[e],r=o?o.length:0,a=0;r>a;++a){var s=o[a];n.b[s]||x(n,s)}i=i.j,i.b[e]||t.Oc(i.j,D(i.f,e)+".js")}))},G=function(t,n){var e=He;this.j=t,this.b=e,t={};for(var i in e)for(var o=e[i],r=0,a=o.length;a>r;++r){var s=o[r];t[s]||(t[s]=[]),t[s].push(i)}this.l=t,this.f=n},V=function(){this.b=[]},C=function(t,n){t.f?n(t.f):t.b.push(n)},t.G=function(t,n,e){var i=j.b();t=""+t,i.b[t]?n(i.b[t]):((i.f[t]=i.f[t]||[]).push(n),e||x(i,t))},t.Xc=function(t,n){j.b().b[""+t]=n},F=function(n,e,i){var o=[],r=t.Nc(n.length,function(){e.apply(null,o)});t.v(n,function(n,e){t.G(n,function(t){o[e]=t,r()},i)})},t.Zc=function(n){n=n||{},this.j=n.id,this.b=null;try{this.b=n.geometry?P(n.geometry):null}catch(e){t.qc(e)}this.f=n.properties||{}},t.K=function(t,n){this.x=t,this.y=n},z=function(n){if(n instanceof t.K)return n;try{t.rc({x:t.$c,y:t.$c},!0)(n)}catch(e){throw t.oc("not a Point",e)}return new t.K(n.x,n.y)},t.L=function(t,n,e,i){this.width=t,this.height=n,this.f=e||"px",this.b=i||"px"},K=function(n){if(n instanceof t.L)return n;try{t.rc({height:t.$c,width:t.$c},!0)(n)}catch(e){throw t.oc("not a Size",e)}return new t.L(n.width,n.height)},U=function(t,n){-180==t&&180!=n&&(t=180),-180==n&&180!=t&&(n=180),this.b=t,this.f=n},t.dd=function(t){return t.b>t.f},t.ed=function(t,n){var e=n-t;return 0>e?n+180-(t-180):e},t.fd=function(n){return n.isEmpty()?0:t.dd(n)?360-(n.b-n.f):n.f-n.b},B=function(t,n){this.b=t,this.f=n},t.hd=function(t){return t.isEmpty()?0:t.f-t.b},t.kd=function(n,e){if(n=n&&t.Kc(n),e=e&&t.Kc(e),n){e=e||n;var i=t.gb(n.lat(),-90,90),o=t.gb(e.lat(),-90,90);this.f=new B(i,o),n=n.lng(),e=e.lng(),360>e-n?(n=t.hb(n,-180,180),e=t.hb(e,-180,180),this.b=new U(n,e)):this.b=new U(-180,180)}else this.f=new B(1,-1),this.b=new U(180,-180)},t.ld=function(n,e,i,o){return new t.kd(new t.F(n,e,!0),new t.F(i,o,!0))},t.nd=function(n){if(n instanceof t.kd)return n;try{return n=Ue(n),t.ld(n.south,n.west,n.north,n.east)}catch(e){throw t.oc("not a LatLngBounds or LatLngBoundsLiteral",e)}},t.od=function(t,n){this.f=t||0,this.j=n||0},t.pd=function(t){return function(){return this.get(t)}},t.qd=function(n,e){return e?function(i){try{this.set(n,e(i))}catch(o){t.qc(t.oc("set"+t.Kb(n),o))}}:function(t){this.set(n,t)}},t.rd=function(n,e){t.db(e,function(e,i){var o=t.pd(e);n["get"+t.Kb(e)]=o,i&&(i=t.qd(e,i),n["set"+t.Kb(e)]=i)})},t.td=function(t){this.b=t||[],W(this)},W=function(t){t.set("length",t.b.length)},t.ud=function(n){this.j=n||t.Gb,this.f={}},t.vd=function(n,e){var i=n.f,o=n.j(e);i[o]||(i[o]=e,t.A.trigger(n,"insert",e),n.b&&n.b(e))},t.yd=t.pa("b"),Z=function(t,n){this.b=t,this.f=n},q=function(t,n,e){var i=Math.pow(2,Math.round(Math.log(t)/Math.LN2))/256;this.b=Math.round(t/i)*i,t=Math.cos(n*Math.PI/180),n=Math.cos(e*Math.PI/180),e=Math.sin(e*Math.PI/180),this.m11=this.b*n,this.m12=this.b*e,this.m21=-this.b*t*e,this.m22=this.b*t*n,this.f=this.m11*this.m22-this.m12*this.m21},Y=function(t,n){return new Z((t.m22*n.ab-t.m12*n.cb)/t.f,(-t.m21*n.ab+t.m11*n.cb)/t.f)},t.Cd=function(n){this.J=this.I=window.Infinity,this.L=this.K=-window.Infinity,t.v(n||[],this.extend,this)},t.Dd=function(n,e,i,o){var r=new t.Cd;return r.I=n,r.J=e,r.K=i,r.L=o,r},t.Ed=function(n,e,i){this.heading=n,this.pitch=t.gb(e,-90,90),this.zoom=Math.max(0,i)},t.Fd=function(){this.__gm=new t.D,this.l=null},Q=function(n){this.P=[],this.b=n&&n.kd||t.Ha,this.f=n&&n.ld||t.Ha},t.Id=function(n,e,i,o){function r(){t.v(a,function(n){e.call(i||null,function(e){if(n.once){if(n.once.pg)return;n.once.pg=!0,t.bb(s.P,n),s.P.length||s.b()}n.Dc.call(n.context,e)})})}var a=n.P.slice(0),s=n;o&&o.sync?r():We(r)},X=function(t,n){return function(e){return e.Dc==t&&e.context==(n||null)}},t.Kd=function(){this.P=new Q({kd:t.p(this.kd,this),ld:t.p(this.ld,this)})},t.Ld=function(n){t.Kd.call(this),this.m=!!n},t.Nd=function(t){return new H(t,void 0)},H=function(n,e){t.Ld.call(this,e),this.b=n},$=t.oa(),J=function(n){var e=n;if(n instanceof Array)e=Array(n.length),t.Pd(e,n);else if(n instanceof Object){var i,o=e={};for(i in n)n.hasOwnProperty(i)&&(o[i]=J(n[i]))}return e},t.Pd=function(t,n){for(var e=0;e<n.length;++e)n.hasOwnProperty(e)&&(t[e]=J(n[e]))},t.Rd=function(t,n){return t[n]||(t[n]=[]),t[n]},t.Vd=function(t,n){if(null==t||null==n)return null==t==(null==n);if(t.constructor!=Array&&t.constructor!=Object)throw Error("Invalid object type passed into jsproto.areObjectsEqual()");if(t===n)return!0;if(t.constructor!=n.constructor)return!1;for(var e in t)if(!(e in n&&tn(t[e],n[e])))return!1;for(var i in n)if(!(i in t))return!1;return!0},tn=function(n,e){return n!==e&&(!0!==n&&1!==n||!0!==e&&1!==e)&&(!1!==n&&0!==n||!1!==e&&0!==e)?n instanceof Object&&e instanceof Object&&t.Vd(n,e)?!0:!1:!0},t.Wd=function(t,n,e,i){this.type=t,this.label=n,this.sk=e,this.Bc=i},nn=function(t){switch(t){case"d":case"f":case"i":case"j":case"u":case"v":case"x":case"y":case"g":case"h":case"n":case"o":case"e":return 0;case"s":case"z":case"B":return"";case"b":return!1;default:return null}},t.Yd=function(n,e,i){return new t.Wd(n,1,t.m(e)?e:nn(n),i)},t.Zd=function(n,e,i){return new t.Wd(n,2,t.m(e)?e:nn(n),i)},t.$d=function(n){return t.Yd("i",n)},t.ae=function(n){return t.Yd("v",n)},t.be=function(n){return t.Yd("b",n)},t.ce=function(n){return t.Yd("e",n)},t.M=function(n,e){return t.Yd("m",n,e)},en=t.oa(),on=function(t,n,e){for(var i=1;i<n.A.length;++i){var o=n.A[i],r=t[i+n.b];if(o&&null!=r)if(3==o.label)for(var a=0;a<r.length;++a)rn(r[a],i,o,e);else rn(r,i,o,e)}},rn=function(t,n,e,i){if("m"==e.type){var o=i.length;on(t,e.Bc,i),i.splice(o,0,n+"m"+(i.length-o))}else"b"==e.type&&(t=t?"1":"0"),t=""+n+e.type+window.encodeURIComponent(t),i.push(t)},t.N=function(t){this.data=t||[]},t.ge=function(t,n,e){return t=t.data[n],null!=t?t:e},t.O=function(n,e,i){return t.ge(n,e,i||0)},t.P=function(n,e,i){return t.ge(n,e,i||"")},t.Q=function(t,n){var e=t.data[n];return e||(e=t.data[n]=[]),e},t.he=function(n,e){return t.Rd(n.data,e)},t.ie=function(n,e,i){return t.he(n,e)[i]},t.je=function(t,n){return t.data[n]?t.data[n].length:0},an=t.oa(),t.le=t.pa("__gm"),sn=function(){this.b={},this.j={},this.f={}},cn=function(){this.b={}},hn=function(n){this.b=new cn;var e=this;t.A.addListenerOnce(n,"addfeature",function(){t.G("data",function(t){t.b(e,n,e.b)})})},t.te=function(n){this.b=[];try{this.b=Fe(n)}catch(e){t.qc(e)}},t.ve=function(n){this.b=t.ue(n)},t.we=function(n){this.b=t.ue(n)},t.ye=function(t){this.b=qe(t)},t.ze=function(n){this.b=t.ue(n)},t.Be=function(t){this.b=Ye(t)},t.De=function(t){this.b=Qe(t)},t.Ee=function(n,e,i){function o(n){if(!n)throw t.oc("not a Feature");if("Feature"!=n.type)throw t.oc('type != "Feature"');var e=n.geometry;try{e=null==e?null:r(e)}catch(o){throw t.oc('in property "geometry"',o)}var a=n.properties||{};if(!t.mb(a))throw t.oc("properties is not an Object");var s=i.idPropertyName;if(n=s?a[s]:n.id,null!=n&&!t.y(n)&&!t.nb(n))throw t.oc((s||"id")+" is not a string or number");return{id:n,geometry:e,properties:a}}function r(n){if(null==n)throw t.oc("is null");var e=(n.type+"").toLowerCase(),i=n.coordinates;try{switch(e){case"point":return new t.Lc(c(i));case"multipoint":return new t.ze(u(i));case"linestring":return s(i);case"multilinestring":return new t.ye(f(i));case"polygon":return a(i);case"multipolygon":return new t.De(p(i))}}catch(o){throw t.oc('in property "coordinates"',o)}if("geometrycollection"==e)try{return new t.te(d(n.geometries))}catch(o){throw t.oc('in property "geometries"',o)}throw t.oc("invalid type")}function a(n){return new t.Be(l(n))}function s(n){return new t.ve(u(n))}function c(n){return n=h(n),t.Kc({lat:n[1],lng:n[0]})}if(!e)return[];i=i||{};var h=t.vc(t.$c),u=t.vc(c),f=t.vc(s),l=t.vc(function(n){if(n=u(n),!n.length)throw t.oc("contains no elements");if(!n[0].V(n[n.length-1]))throw t.oc("first and last positions are not equal");return new t.we(n.slice(0,-1))}),p=t.vc(a),d=t.vc(r),g=t.vc(o);if("FeatureCollection"==e.type){e=e.features;try{return t.jb(g(e),function(t){return n.add(t)})}catch(b){throw t.oc('in property "features"',b)}}if("Feature"==e.type)return[n.add(o(e))];throw t.oc("not a Feature or FeatureCollection")},un=function(n){var e=this;n=n||{},this.setValues(n),this.b=new sn,t.A.forward(this.b,"addfeature",this),t.A.forward(this.b,"removefeature",this),t.A.forward(this.b,"setgeometry",this),t.A.forward(this.b,"setproperty",this),t.A.forward(this.b,"removeproperty",this),this.f=new hn(this.b),this.f.bindTo("map",this),this.f.bindTo("style",this),t.v(t.Fe,function(n){t.A.forward(e.f,n,e)}),this.j=!1},fn=function(n){n.j||(n.j=!0,t.G("drawing_impl",function(t){t.nl(n)}))},ln=function(n){if(!n)return null;if(t.Fa(n)){var e=window.document.createElement("div");e.style.overflow="auto",e.innerHTML=n}else 3==n.nodeType?(e=window.document.createElement("div"),e.appendChild(n)):e=n;return e},pn=function(t){var n=wi,e=j.b().j;t=e.f=new G(new N(t),n),n=0;for(var i=e.b.length;i>n;++n)e.b[n](t);e.b.length=0},dn=function(n){n=n||{},n.clickable=t.kb(n.clickable,!0),n.visible=t.kb(n.visible,!0),this.setValues(n),t.G("marker",t.Ha)},t.Me=function(t){this.__gm={set:null,Ld:null,Nb:{map:null,ce:null}},dn.call(this,t)},gn=function(n,e){this.b=n,this.f=e,n.addListener("map_changed",t.p(this.lm,this)),this.bindTo("map",n),this.bindTo("disableAutoPan",n),this.bindTo("maxWidth",n),this.bindTo("position",n),this.bindTo("zIndex",n),this.bindTo("internalAnchor",n,"anchor"),this.bindTo("internalContent",n,"content"),this.bindTo("internalPixelOffset",n,"pixelOffset")},bn=function(t,n,e,i){e?t.bindTo(n,e,i):(t.unbind(n),t.set(n,void 0))},t.Pe=function(n){function e(){r||(r=!0,t.G("infowindow",function(t){t.Rj(o)}))}window.setTimeout(function(){t.G("infowindow",t.Ha)},100),n=n||{};var i=!!n.b;delete n.b;var o=new gn(this,i),r=!1;t.A.addListenerOnce(this,"anchor_changed",e),t.A.addListenerOnce(this,"map_changed",e),this.setValues(n)},t.Re=function(n){t.Qe&&n&&t.Qe.push(n)},mn=function(t){this.setValues(t)},yn=t.oa(),vn=t.oa(),wn=t.oa(),t.We=function(){t.G("geocoder",t.Ha)},t.Xe=function(n,e,i){this.H=null,this.set("url",n),this.set("bounds",t.zc(t.nd)(e)),this.setValues(i)},En=function(n,e){t.nb(n)?(this.set("url",n),this.setValues(e)):this.setValues(n)},t.$e=function(){var n=this;t.G("layers",function(t){t.b(n)})},kn=function(n){this.setValues(n);var e=this;t.G("layers",function(t){t.f(e)})},Ln=function(){var n=this;t.G("layers",function(t){t.j(n)})},t.cf=function(){this.b=""},t.df=function(n){var e=new t.cf;return e.b=n,e},t.ff=function(){this.Ze="",this.lj=t.ef,this.b=null},t.gf=function(n,e){var i=new t.ff;return i.Ze=n,i.b=e,i},t.hf=function(t,n){n.parentNode&&n.parentNode.insertBefore(t,n.nextSibling)},t.jf=function(t){t&&t.parentNode&&t.parentNode.removeChild(t)},t.kf=t.oa(),An=function(t,n,e,i,o){this.b=!!n,this.node=null,this.f=0,this.j=!1,this.l=!e,t&&this.setPosition(t,i),this.depth=void 0!=o?o:this.f||0,this.b&&(this.depth*=-1)},Mn=function(t,n,e,i){An.call(this,t,n,e,null,i)},_n=function(t){this.data=t||[]},Tn=function(t){this.data=t||[]},On=function(t){this.data=t||[]},In=function(t){this.data=t||[]},Sn=function(t){this.data=t||[]},t.sf=function(t){this.data=t||[]},Rn=function(t){this.data=t||[]},Pn=function(t){this.data=t||[]},Dn=function(t){this.data=t||[]},t.wf=function(n){return t.P(n,0)},t.xf=function(n){return t.P(n,1)},t.yf=function(){return t.P(t.R,16)},t.zf=function(t){return new Sn(t.data[2])},Nn=function(n,e,i,o,r){var a=t.P(t.zf(t.R),7);this.b=n,this.f=o,this.j=t.m(r)?r:t.Sa();var s=a+"/csi?v=2&s=mapsapi3&v3v="+t.P(new Dn(t.R.data[36]),0)+"&action="+n;t.Nb(i,function(t,n){s+="&"+window.encodeURIComponent(n)+"="+window.encodeURIComponent(t)}),e&&(s+="&e="+e),this.l=s},t.Cf=function(n,e){var i={};i[e]=void 0,t.Bf(n,i)},t.Bf=function(n,e){var i="";t.Nb(e,function(n,e){var o=(null!=n?n:t.Sa())-this.j;i&&(i+=","),i+=e+"."+Math.round(o),null==n&&window.performance&&window.performance.mark&&window.performance.mark("mapsapi:"+this.b+":"+e)},n),e=n.l+"&rt="+i,n.f.createElement("img").src=e,(n=t.Vb.__gm_captureCSI)&&n(e)},t.Df=function(n,e){e=e||{};var i=e.Em||{},o=t.he(t.R,12).join(",");o&&(i.libraries=o),o=t.P(t.R,6);var r=new _n(t.R.data[33]),a=[];return o&&a.push(o),t.v(r.data,function(n,e){n&&t.v(n,function(t,n){null!=t&&a.push(e+1+"_"+(n+1)+"_"+t)})}),e.Gk&&(a=a.concat(e.Gk)),new Nn(n,a.join(","),i,e.document||window.document,e.startTime)},jn=function(){this.f=t.Df("apiboot2",{startTime:t.Ef}),t.Cf(this.f,"main"),this.b=!1},xn=function(){var n=ci;n.b||(n.b=!0,t.Cf(n.f,"firstmap"))},t.Rf=function(){this.b=new t.K(128,128),this.j=256/360,this.l=256/(2*Math.PI),this.f=!0},t.Sf=function(t,n,e){return(t=t.fromLatLngToPoint(n))&&(e=Math.pow(2,e),t.x*=e,t.y*=e),t},t.Tf=function(n,e){var i=n.lat()+t.mc(e);i>90&&(i=90);var o=n.lat()-t.mc(e);-90>o&&(o=-90),e=Math.sin(e);var r=Math.cos(t.lc(n.lat()));return 90==i||-90==o||1e-6>r?new t.kd(new t.F(o,-180),new t.F(i,180)):(e=t.mc(Math.asin(e/r)),new t.kd(new t.F(o,n.lng()-e),new t.F(i,n.lng()+e)))},Gn=function(n,e){t.Fd.call(this),t.Re(n),this.__gm=new t.D,this.f=null,e&&e.client&&(this.f=t.Uf[e.client]||null);var i=this.controls=[];t.db(t.Vf,function(n,e){i[e]=new t.td}),this.j=!0,this.b=n,this.m=!1,this.__gm.ea=e&&e.ea||new t.ud,this.set("standAlone",!0),this.setPov(new t.Ed(0,0,1)),e&&e.nd&&!t.y(e.nd.zoom)&&(e.nd.zoom=t.y(e.zoom)?e.zoom:1),this.setValues(e),void 0==this.getVisible()&&this.setVisible(!0),t.A.addListenerOnce(this,"pano_changed",t.qb(function(){t.G("marker",t.p(function(t){t.b(this.__gm.ea,this)},this))}))},Vn=function(){this.l=[],this.j=this.b=this.f=null},Cn=function(n,e,i){this.R=e,this.b=t.Nd(new t.yd([])),this.B=new t.ud,new t.td,this.D=new t.ud,this.F=new t.ud,this.l=new t.ud;var o=this.ea=new t.ud;o.b=function(){delete o.b,t.G("marker",t.qb(function(t){t.b(o,n)}))},this.j=new Gn(i,{visible:!1,enableCloseButton:!0,ea:o}),this.j.bindTo("reportErrorControl",n),this.j.j=!1,this.f=new Vn,this.overlayLayer=null},t.Zf=function(){this.P=new Q},t.$f=function(t,n){this.size=new Z(256,256),this.b=t,this.heading=n},t.ag=function(n){this.pi=n||0,t.A.bind(this,"forceredraw",this,this.C)},t.bg=function(t,n){t=t.style,t.width=n.width+n.f,t.height=n.height+n.b},t.cg=function(n){return new t.L(n.offsetWidth,n.offsetHeight)},Fn=function(t){this.data=t||[]},zn=function(t){this.data=t||[]},Kn=function(t){this.data=t||[]},Un=function(t){this.data=t||[]},Bn=function(t){this.data=t||[]},Wn=function(n,e,i,o,r){t.ag.call(this),this.G=e,this.F=new t.Rf,this.O=i+"/maps/api/js/StaticMapService.GetMapImage",this.b=this.f=null,this.B=o,this.j=r?new H(null,void 0):null,this.l=null,this.m=!1,this.set("div",n),this.set("loading",!0)},Zn=function(n){var e=n.get("tilt")||t.w(n.get("styles"));return n=n.get("mapTypeId"),e?null:di[n]},qn=function(t){t.parentNode&&t.parentNode.removeChild(t)},Yn=function(n,e){var i=n.b;i.onload=null,i.onerror=null;var o=n.get("size");o&&(e&&(i.parentNode||n.f.appendChild(i),n.j||t.bg(i,o),t.A.trigger(n,"staticmaploaded"),n.B.set(t.Sa())),n.set("loading",!1))},Qn=function(t,n){var e=t.b;n!=e.src?(t.j||qn(e),e.onload=function(){Yn(t,!0)},e.onerror=function(){Yn(t,!1)},e.src=n):!e.parentNode&&n&&t.f.appendChild(e)},t.pg=function(n){for(var e;e=n.firstChild;)t.og(e),n.removeChild(e)},t.og=function(n){n=new Mn(n);try{for(;;)t.A.clearInstanceListeners(n.next())}catch(e){if(e!==t.qg)throw e}},Xn=function(n,e){var i=t.Sa();ci&&xn();var o=new t.Zf,r=e||{};r.noClear||t.pg(n);var a=void 0===window.document?null:window.document.createElement("div");a&&n.appendChild&&(n.appendChild(a),a.style.width=a.style.height="100%"),t.le.call(this,new Cn(this,n,a)),t.m(r.mapTypeId)||(r.mapTypeId="roadmap"),this.setValues(r),this.W=t.rg[15]&&r.noControlsOrLogging,this.mapTypes=new an,this.features=new t.D,t.Re(a),this.notify("streetView"),n=t.cg(a);var s=null;t.R&&Hn(r.useStaticMap,n)&&(s=new Wn(a,t.tg,t.P(t.zf(t.R),9),new H(null,void 0),!1),t.A.forward(s,"staticmaploaded",this),s.set("size",n),s.bindTo("center",this),s.bindTo("zoom",this),s.bindTo("mapTypeId",this),s.bindTo("styles",this)),this.overlayMapTypes=new t.td;var c=this.controls=[];t.db(t.Vf,function(n,e){c[e]=new t.td});var h=this,u=!0;t.G("map",function(t){h.getDiv()&&a&&t.f(h,r,a,s,u,i,o)}),u=!1,this.data=new un({map:this})},Hn=function(n,e){return t.m(n)?!!n:(n=e.width,e=e.height,384e3>=n*e&&800>=n&&800>=e)},$n=function(){t.G("maxzoom",t.Ha)},Jn=function(n,e){!n||t.nb(n)||t.y(n)?(this.set("tableId",n),this.setValues(e)):this.setValues(n)},t.xg=t.oa(),te=function(n){return n=n||{},n.visible=t.kb(n.visible,!0),n},t.zg=function(t){return t&&t.radius||6378137},ne=function(n){return n instanceof t.td?bi(n):new t.td(t.ue(n))},ee=function(n){if(t.Ja(n)||n instanceof t.td)if(0==t.w(n))var e=!0;else e=n instanceof t.td?n.getAt(0):n[0],e=t.Ja(e)||e instanceof t.td;else e=!1;return e?n instanceof t.td?ie(bi)(n):new t.td(t.vc(ne)(n)):new t.td([ne(n)])},ie=function(n){return function(e){if(!(e instanceof t.td))throw t.oc("not an MVCArray");return e.forEach(function(e,i){try{n(e)}catch(o){throw t.oc("at index "+i,o)
}}),e}},t.Eg=function(n){this.setValues(te(n)),t.G("poly",t.Ha)},oe=function(n){this.set("latLngs",new t.td([new t.td])),this.setValues(te(n)),t.G("poly",t.Ha)},t.Gg=function(t){oe.call(this,t)},t.Hg=function(t){oe.call(this,t)},t.Ig=function(n){this.setValues(te(n)),t.G("poly",t.Ha)},re=function(){this.b=null},t.Og=function(){this.b=null},t.Pg=function(n){var e=this;this.tileSize=n.tileSize||new t.L(256,256),this.name=n.name,this.alt=n.alt,this.minZoom=n.minZoom,this.maxZoom=n.maxZoom,this.j=t.p(n.getTileUrl,n),this.b=new t.ud,this.f=null,this.set("opacity",n.opacity),t.G("map",function(n){var i=e.f=n.b,o=e.tileSize||new t.L(256,256);e.b.forEach(function(n){var r=n.__gmimt,a=r.Y,s=r.zoom,c=e.j(a,s);r.Qb=i({ca:a.x,ba:a.y,fa:s},o,n,c,function(){return t.A.trigger(n,"load")})})})},ae=function(t,n){null!=t.style.opacity?t.style.opacity=n:t.style.filter=n&&"alpha(opacity="+Math.round(100*n)+")"},se=function(t){return t=t.get("opacity"),"number"==typeof t?t:1},t.Sg=function(){t.Sg.Je(this,"constructor")},t.Tg=function(n,e){t.Tg.Je(this,"constructor"),this.set("styles",n),n=e||{},this.f=n.baseMapTypeId||"roadmap",this.minZoom=n.minZoom,this.maxZoom=n.maxZoom||20,this.name=n.name,this.alt=n.alt,this.projection=null,this.tileSize=new t.L(256,256)},t.Ug=function(n,e){t.wc(O,"container is not a Node")(n),this.setValues(e),t.G("controls",t.p(function(t){t.El(this,n)},this))},ce=t.pa("b"),he=function(t,n,e){for(var i=Array(n.length),o=0,r=n.length;r>o;++o)i[o]=n.charCodeAt(o);for(i.unshift(e),t=t.b,e=n=0,o=i.length;o>e;++e)n*=1729,n+=i[e],n%=t;return n},ue=function(){var n=t.O(new Rn(t.R.data[4]),0),e=new ce(131071),i=window.unescape("%26%74%6F%6B%65%6E%3D");return function(t){t=t.replace(vi,"%27");var o=t+i;return yi||(yi=/(?:https?:\/\/[^/]+)?(.*)/),t=yi.exec(t),o+he(e,t&&t[1],n)}},fe=function(){var t=new ce(2147483647);return function(n){return he(t,n,0)}},le=function(n){for(var e=n.split("."),i=window,o=window,r=0;r<e.length;r++)if(o=i,i=i[e[r]],!i)throw t.oc(n+" is not a function");return function(){i.apply(o)}},pe=function(){for(var t in Object.prototype)window.console&&window.console.error("This site adds property <"+t+"> to Object.prototype. Extending Object.prototype breaks JavaScript for..in loops, which are used heavily in Google Maps API v3.")},de=function(t){return(t="version"in t)&&window.console&&window.console.error("You have included the Google Maps API multiple times on this page. This may cause unexpected errors."),t},t.sa=[],ge="function"==typeof Object.defineProperties?Object.defineProperty:function(t,n,e){t!=Array.prototype&&t!=Object.prototype&&(t[n]=e.value)},be="undefined"!=typeof window&&window===this?this:void 0!==window.global&&null!=window.global?window.global:this,me=function(){var t=0;return function(n){return"jscomp_symbol_"+(n||"")+t++}}(),i("Array.from",function(n){return n?n:function(n,e,i){t.Ba(),e=null!=e?e:t.na();var o=[],r=n[window.Symbol.iterator];if("function"==typeof r)for(n=r.call(n);!(r=n.next()).done;)o.push(e.call(i,r.value));else{r=n.length;for(var a=0;r>a;a++)o.push(e.call(i,n[a]))}return o}}),i("Array.prototype.fill",function(t){return t?t:function(t,n,e){var i=this.length||0;for(0>n&&(n=Math.max(0,i+n)),(null==e||e>i)&&(e=i),e=+e,0>e&&(e=Math.max(0,i+e)),n=+(n||0);e>n;n++)this[n]=t;return this}}),t.Vb=this,ye="closure_uid_"+(1e9*Math.random()>>>0),ve=0;var we,Ee;t.A={},we=void 0!==window.navigator&&-1!=window.navigator.userAgent.toLowerCase().indexOf("msie"),Ee={},t.A.addListener=function(t,n,e){return new p(t,n,e,0)},t.A.hasListeners=function(n,e){return e=(n=n.__e3_)&&n[e],!!e&&!t.fb(e)},t.A.removeListener=function(t){t&&t.remove()},t.A.clearListeners=function(n,e){t.db(u(n,e),function(t,n){n&&n.remove()})},t.A.clearInstanceListeners=function(n){t.db(u(n),function(t,n){n&&n.remove()})},t.A.trigger=function(n,e){if(t.A.hasListeners(n,e)){var i,o=t.cb(arguments,2),r=u(n,e);for(i in r){var a=r[i];a&&a.j.apply(a.f,o)}}},t.A.addDomListener=function(t,n,e,i){if(t.addEventListener){var o=i?4:1;t.addEventListener(n,e,i),e=new p(t,n,e,o)}else t.attachEvent?(e=new p(t,n,e,2),t.attachEvent("on"+n,d(e))):(t["on"+n]=e,e=new p(t,n,e,3));return e},t.A.addDomListenerOnce=function(n,e,i,o){var r=t.A.addDomListener(n,e,function(){return r.remove(),i.apply(this,arguments)},o);return r},t.A.U=function(n,e,i,o){return t.A.addDomListener(n,e,f(i,o))},t.A.bind=function(n,e,i,o){return t.A.addListener(n,e,t.p(o,i))},t.A.addListenerOnce=function(n,e,i){var o=t.A.addListener(n,e,function(){return o.remove(),i.apply(this,arguments)});return o},t.A.forward=function(n,e,i){return t.A.addListener(n,e,l(e,i))},t.A.Ma=function(n,e,i,o){return t.A.addDomListener(n,e,l(e,i,!o))},t.A.bi=function(){var n,e=Ee;for(n in e)e[n].remove();Ee={},(e=t.Vb.CollectGarbage)&&e()},t.A.Sm=function(){we&&t.A.addDomListener(window,"unload",t.A.bi)};var ke=0;p.prototype.remove=function(){if(this.f){switch(this.m){case 1:this.f.removeEventListener(this.b,this.j,!1);break;case 4:this.f.removeEventListener(this.b,this.j,!0);break;case 2:this.f.detachEvent("on"+this.b,this.l);break;case 3:this.f["on"+this.b]=null}delete h(this.f,this.b)[this.id],this.l=this.j=this.f=null,delete Ee[this.id]}},t.k=t.D.prototype,t.k.get=function(n){var e=b(this);if(n+="",e=c(e,n),t.m(e)){if(e){n=e.hb,e=e.Gc;var i="get"+t.Kb(n);return e[i]?e[i]():e.get(n)}return this[n]}},t.k.set=function(n,e){var i=b(this);n+="";var o=c(i,n);o?(n=o.hb,o=o.Gc,i="set"+t.Kb(n),o[i]?o[i](e):o.set(n,e)):(this[n]=e,i[n]=null,g(this,n))},t.k.notify=function(t){var n=b(this);t+="",(n=c(n,t))?n.Gc.notify(n.hb):g(this,t)},t.k.setValues=function(n){for(var e in n){var i=n[e],o="set"+t.Kb(e);this[o]?this[o](i):this.set(e,i)}},t.k.setOptions=t.D.prototype.setValues,t.k.changed=t.oa();var Le={};t.D.prototype.bindTo=function(n,e,i,o){n+="",i=(i||n)+"",this.unbind(n);var r={Gc:this,hb:n},a={Gc:e,hb:i,ng:r};b(this)[n]=a,m(e,i)[t.Gb(r)]=r,o||g(this,n)},t.D.prototype.unbind=function(n){var e=b(this),i=e[n];i&&(i.ng&&delete m(i.Gc,i.hb)[t.Gb(i.ng)],this[n]=this.get(n),e[n]=null)},t.D.prototype.unbindAll=function(){var n,e=t.p(this.unbind,this),i=b(this);for(n in i)e(n)},t.D.prototype.addListener=function(n,e){return t.A.addListener(this,n,e)},t.dh={ROADMAP:"roadmap",SATELLITE:"satellite",HYBRID:"hybrid",TERRAIN:"terrain"},t.Vf={TOP_LEFT:1,TOP_CENTER:2,TOP:2,TOP_RIGHT:3,LEFT_CENTER:4,LEFT_TOP:5,LEFT:5,LEFT_BOTTOM:6,RIGHT_TOP:7,RIGHT:7,RIGHT_CENTER:8,RIGHT_BOTTOM:9,BOTTOM_LEFT:10,BOTTOM_CENTER:11,BOTTOM:11,BOTTOM_RIGHT:12,CENTER:13};t:{var Ae=t.Vb.navigator;if(Ae){var Me=Ae.userAgent;if(Me){t.Ua=Me;break t}}t.Ua=""}t.Sb[" "]=t.Ha;var _e,Te;t.gh=t.Mb("Opera"),t.hh=t.Ob(),t.ih=t.Mb("Edge"),t.jh=!(!t.Mb("Gecko")||t.Va()&&!t.Mb("Edge")||t.Mb("Trident")||t.Mb("MSIE")||t.Mb("Edge")),t.kh=t.Va()&&!t.Mb("Edge"),t.lh=t.Mb("Macintosh"),t.mh=t.Mb("Windows"),t.nh=t.Mb("Linux")||t.Mb("CrOS"),t.oh=t.Mb("Android"),t.ph=t.Rb(),t.qh=t.Mb("iPad"),t.rh=t.Mb("iPod");t:{var Oe="",Ie=function(){var n=t.Ua;return t.jh?/rv\:([^\);]+)(\)|;)/.exec(n):t.ih?/Edge\/([\d\.]+)/.exec(n):t.hh?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n):t.kh?/WebKit\/(\S+)/.exec(n):t.gh?/(?:Version)[ \/]?(\S+)/.exec(n):void 0}();if(Ie&&(Oe=Ie?Ie[1]:""),t.hh){var Se=w();if(null!=Se&&Se>window.parseFloat(Oe)){_e=Se+"";break t}}_e=Oe}t.Xb=_e,Te={};var Re=t.Vb.document;t.wh=Re&&t.hh?w()||("CSS1Compat"==Re.compatMode?window.parseInt(t.Xb,10):5):void 0,t.yh=t.Mb("Firefox"),t.zh=t.Rb()||t.Mb("iPod"),t.Ah=t.Mb("iPad"),t.Bh=t.Mb("Android")&&!(y()||t.Mb("Firefox")||t.Mb("Opera")||t.Mb("Silk")),t.Ch=y(),t.Dh=t.Qb()&&!(t.Rb()||t.Mb("iPad")||t.Mb("iPod"));var Pe;Pe=t.jh||t.kh&&!t.Dh||t.gh,t.Fh=Pe||"function"==typeof t.Vb.btoa,t.Gh=Pe||!t.Dh&&!t.hh&&"function"==typeof t.Vb.atob,E.prototype.get=function(){if(0<this.f){this.f--;var t=this.b;this.b=t.next,t.next=null}else t=this.j();return t};var De,Ne=function(t){return function(){return t}}(null),je=t.$b,xe=new E(function(){return new _},function(t){t.reset()},100);M.prototype.add=function(t,n){var e=xe.get();e.set(t,n),this.f?this.f.next=e:this.b=e,this.f=e},M.prototype.remove=function(){var t=null;return this.b&&(t=this.b,this.b=this.b.next,this.b||(this.f=null),t.next=null),t},_.prototype.set=function(t,n){this.Dc=t,this.b=n,this.next=null},_.prototype.reset=function(){this.next=this.b=this.Dc=null},t.bc.m=function(){if(-1!=(t.Vb.Promise+"").indexOf("[native code]")){var n=t.Vb.Promise.resolve(void 0);t.bc.b=function(){n.then(t.bc.f)}}else t.bc.b=function(){L()}},t.bc.B=function(n){t.bc.b=function(){L(),n&&n(t.bc.f)}},t.bc.j=!1,t.bc.l=new M,t.bc.f=function(){for(var n;n=t.bc.l.remove();){try{n.Dc.call(n.b)}catch(e){k(e)}var i=xe;i.m(n),i.f<i.l&&(i.f++,n.next=i.b,i.b=n)}t.bc.j=!1},t.t(T,Error);var Ge,Ve;t.$c=t.wc(t.y,"not a number"),Ge=t.yc(t.$c,function(n){if(window.isNaN(n))throw t.oc("NaN is not an accepted value");return n}),t.Kh=t.wc(t.nb,"not a string"),Ve=t.wc(t.ob,"not a boolean"),t.Mh=t.zc(t.$c),t.Nh=t.zc(t.Kh),t.Oh=t.zc(Ve);var Ce=t.rc({lat:t.$c,lng:t.$c},!0);t.F.prototype.toString=function(){return"("+this.lat()+", "+this.lng()+")"},t.F.prototype.toJSON=function(){return{lat:this.lat(),lng:this.lng()}},t.F.prototype.V=function(n){return n?t.ib(this.lat(),n.lat())&&t.ib(this.lng(),n.lng()):!1},t.F.prototype.equals=t.F.prototype.V,t.F.prototype.toUrlValue=function(n){return n=t.m(n)?n:6,S(this.lat(),n)+","+S(this.lng(),n)},t.ue=t.vc(t.Kc),t.t(t.Lc,R),t.Lc.prototype.getType=t.ra("Point"),t.Lc.prototype.forEachLatLng=function(t){t(this.b)},t.Lc.prototype.get=t.qa("b");var Fe=t.vc(P);j.f=void 0,j.b=function(){return j.f?j.f:j.f=new j},j.prototype.ib=function(n,e){var i=this,o=i.m;C(i.j,function(r){for(var a=r.b[n]||[],s=r.l[n]||[],c=o[n]=t.Nc(a.length,function(){delete o[n],e(r.f);for(var t=i.f[n],a=t?t.length:0,c=0;a>c;++c)t[c](i.b[n]);for(delete i.f[n],c=0,t=s.length;t>c;++c)a=s[c],o[a]&&o[a]()}),h=0,u=a.length;u>h;++h)i.b[a[h]]&&c()})},t.k=t.Zc.prototype,t.k.getId=t.qa("j"),t.k.getGeometry=t.qa("b"),t.k.setGeometry=function(n){var e=this.b;try{this.b=n?P(n):null}catch(i){return void t.qc(i)}t.A.trigger(this,"setgeometry",{feature:this,newGeometry:this.b,oldGeometry:e})},t.k.getProperty=function(t){return c(this.f,t)},t.k.setProperty=function(n,e){if(void 0===e)this.removeProperty(n);else{var i=this.getProperty(n);this.f[n]=e,t.A.trigger(this,"setproperty",{feature:this,name:n,newValue:e,oldValue:i})}},t.k.removeProperty=function(n){var e=this.getProperty(n);delete this.f[n],t.A.trigger(this,"removeproperty",{feature:this,name:n,oldValue:e})},t.k.forEachProperty=function(t){for(var n in this.f)t(this.getProperty(n),n)},t.k.toGeoJson=function(n){var e=this;t.G("data",function(t){t.f(e,n)})};var ze={oo:"Point",mo:"LineString",POLYGON:"Polygon"};t.Qh=new t.K(0,0),t.K.prototype.toString=function(){return"("+this.x+", "+this.y+")"},t.K.prototype.V=function(t){return t?t.x==this.x&&t.y==this.y:!1},t.K.prototype.equals=t.K.prototype.V,t.K.prototype.round=function(){this.x=Math.round(this.x),this.y=Math.round(this.y)},t.K.prototype.Pd=t.ua(0),t.Rh=new t.L(0,0),t.L.prototype.toString=function(){return"("+this.width+", "+this.height+")"},t.L.prototype.V=function(t){return t?t.width==this.width&&t.height==this.height:!1},t.L.prototype.equals=t.L.prototype.V;var Ke={CIRCLE:0,FORWARD_CLOSED_ARROW:1,FORWARD_OPEN_ARROW:2,BACKWARD_CLOSED_ARROW:3,BACKWARD_OPEN_ARROW:4};t.k=U.prototype,t.k.isEmpty=function(){return 360==this.b-this.f},t.k.intersects=function(n){var e=this.b,i=this.f;return this.isEmpty()||n.isEmpty()?!1:t.dd(this)?t.dd(n)||n.b<=this.f||n.f>=e:t.dd(n)?n.b<=i||n.f>=e:n.b<=i&&n.f>=e},t.k.contains=function(n){-180==n&&(n=180);var e=this.b,i=this.f;return t.dd(this)?!(e>n&&n>i||this.isEmpty()):n>=e&&i>=n},t.k.extend=function(n){this.contains(n)||(this.isEmpty()?this.b=this.f=n:t.ed(n,this.b)<t.ed(this.f,n)?this.b=n:this.f=n)},t.k.V=function(n){return 1e-9>=Math.abs(n.b-this.b)%360+Math.abs(t.fd(n)-t.fd(this))},t.k.Db=function(){var n=(this.b+this.f)/2;return t.dd(this)&&(n=t.hb(n+180,-180,180)),n},t.k=B.prototype,t.k.isEmpty=function(){return this.b>this.f},t.k.intersects=function(t){var n=this.b,e=this.f;return n>t.b?n<=t.f&&e>=n:t.b<=e&&t.b<=t.f},t.k.contains=function(t){return t>=this.b&&t<=this.f},t.k.extend=function(t){this.isEmpty()?this.f=this.b=t:t<this.b?this.b=t:t>this.f&&(this.f=t)},t.k.V=function(t){return this.isEmpty()?t.isEmpty():1e-9>=Math.abs(t.b-this.b)+Math.abs(this.f-t.f)},t.k.Db=function(){return(this.f+this.b)/2},t.k=t.kd.prototype,t.k.getCenter=function(){return new t.F(this.f.Db(),this.b.Db())},t.k.toString=function(){return"("+this.getSouthWest()+", "+this.getNorthEast()+")"},t.k.toJSON=function(){return{south:this.f.b,west:this.b.b,north:this.f.f,east:this.b.f}},t.k.toUrlValue=function(t){var n=this.getSouthWest(),e=this.getNorthEast();return[n.toUrlValue(t),e.toUrlValue(t)].join()},t.k.V=function(n){return n?(n=t.nd(n),this.f.V(n.f)&&this.b.V(n.b)):!1},t.kd.prototype.equals=t.kd.prototype.V,t.k=t.kd.prototype,t.k.contains=function(n){return n=t.Kc(n),this.f.contains(n.lat())&&this.b.contains(n.lng())},t.k.intersects=function(n){return n=t.nd(n),this.f.intersects(n.f)&&this.b.intersects(n.b)},t.k.extend=function(n){return n=t.Kc(n),this.f.extend(n.lat()),this.b.extend(n.lng()),this},t.k.union=function(n){return n=t.nd(n),!n||n.isEmpty()?this:(this.extend(n.getSouthWest()),this.extend(n.getNorthEast()),this)},t.k.getSouthWest=function(){return new t.F(this.f.b,this.b.b,!0)},t.k.getNorthEast=function(){return new t.F(this.f.f,this.b.f,!0)},t.k.toSpan=function(){return new t.F(t.hd(this.f),t.fd(this.b),!0)},t.k.isEmpty=function(){return this.f.isEmpty()||this.b.isEmpty()};var Ue=t.rc({south:t.$c,west:t.$c,north:t.$c,east:t.$c},!1);t.od.prototype.heading=t.qa("f"),t.od.prototype.b=t.qa("j"),t.od.prototype.toString=function(){return this.f+","+this.j},t.Th=new t.od,t.t(t.td,t.D),t.k=t.td.prototype,t.k.getAt=function(t){return this.b[t]},t.k.indexOf=function(t){for(var n=0,e=this.b.length;e>n;++n)if(t===this.b[n])return n;return-1},t.k.forEach=function(t){for(var n=0,e=this.b.length;e>n;++n)t(this.b[n],n)},t.k.setAt=function(n,e){var i=this.b[n],o=this.b.length;if(o>n)this.b[n]=e,t.A.trigger(this,"set_at",n,i),this.l&&this.l(n,i);else{for(i=o;n>i;++i)this.insertAt(i,void 0);this.insertAt(n,e)}},t.k.insertAt=function(n,e){this.b.splice(n,0,e),W(this),t.A.trigger(this,"insert_at",n),this.f&&this.f(n)},t.k.removeAt=function(n){var e=this.b[n];return this.b.splice(n,1),W(this),t.A.trigger(this,"remove_at",n,e),this.j&&this.j(n,e),e},t.k.push=function(t){return this.insertAt(this.b.length,t),this.b.length},t.k.pop=function(){return this.removeAt(this.b.length-1)},t.k.getArray=t.qa("b"),t.k.clear=function(){for(;this.get("length");)this.pop()},t.rd(t.td.prototype,{length:null}),t.ud.prototype.remove=function(n){var e=this.f,i=this.j(n);e[i]&&(delete e[i],t.A.trigger(this,"remove",n),this.onRemove&&this.onRemove(n))},t.ud.prototype.contains=function(t){return!!this.f[this.j(t)]},t.ud.prototype.forEach=function(t){var n,e=this.f;for(n in e)t.call(this,e[n])},t.yd.prototype.Xa=t.ua(1),t.yd.prototype.forEach=function(n,e){t.v(this.b,function(t,i){n.call(e,t,i)})},Z.prototype.V=function(t){return t?this.b==t.b&&this.f==t.f:!1},q.prototype.V=function(t){return t?this.m11==t.m11&&this.m12==t.m12&&this.m21==t.m21&&this.m22==t.m22:!1},t.Cd.prototype.isEmpty=function(){return!(this.I<this.K&&this.J<this.L)},t.Cd.prototype.extend=function(t){t&&(this.I=Math.min(this.I,t.x),this.K=Math.max(this.K,t.x),this.J=Math.min(this.J,t.y),this.L=Math.max(this.L,t.y))},t.Cd.prototype.getCenter=function(){return new t.K((this.I+this.K)/2,(this.J+this.L)/2)},t.Cd.prototype.V=function(t){return t?this.I==t.I&&this.J==t.J&&this.K==t.K&&this.L==t.L:!1},t.Uh=t.Dd(-window.Infinity,-window.Infinity,window.Infinity,window.Infinity),t.Vh=t.Dd(0,0,0,0);var Be=t.rc({zoom:t.zc(Ge),heading:Ge,pitch:Ge});t.t(t.Fd,t.D),Q.prototype.addListener=function(n,e,i){i=i?{pg:!1}:null;var o=!this.P.length,r=this.P,a=s(r,X(n,e));return(r=0>a?null:t.Fa(r)?r.charAt(a):r[a])?r.once=r.once&&i:this.P.push({Dc:n,context:e||null,once:i}),o&&this.f(),n},Q.prototype.addListenerOnce=function(t,n){return this.addListener(t,n,!0),t},Q.prototype.removeListener=function(n,e){if(this.P.length){var i=this.P;n=s(i,X(n,e)),n>=0&&t.ab(i,n),this.P.length||this.b()}};var We=t.bc;t.k=t.Kd.prototype,t.k.ld=t.oa(),t.k.kd=t.oa(),t.k.addListener=function(t,n){return this.P.addListener(t,n)},t.k.addListenerOnce=function(t,n){return this.P.addListenerOnce(t,n)},t.k.removeListener=function(t,n){return this.P.removeListener(t,n)},t.k.notify=function(n){t.Id(this.P,function(t){t(this.get())},this,n)},t.t(t.Ld,t.Kd),t.Ld.prototype.set=function(t){this.m&&this.get()===t||(this.Mh(t),this.notify())},t.t(H,t.Ld),H.prototype.get=t.qa("b"),H.prototype.Mh=t.pa("b"),t.t($,t.D),t.Xh=t.Yd("d",void 0),t.Yh=t.Yd("f",void 0),t.S=t.$d(),t.Zh=t.Zd("i",void 0),t.$h=new t.Wd("i",3,void 0,void 0),t.ai=new t.Wd("j",3,"",void 0),t.bi=t.Yd("u",void 0),t.ci=t.Zd("u",void 0),t.di=new t.Wd("u",3,void 0,void 0),t.ei=t.ae(),t.T=t.be(),t.U=t.ce(),t.fi=new t.Wd("e",3,void 0,void 0),t.V=t.Yd("s",void 0),t.gi=t.Zd("s",void 0),t.hi=new t.Wd("s",3,void 0,void 0),t.ii=t.Yd("B",void 0),t.ji=t.Yd("x",void 0),t.ki=t.Zd("x",void 0),t.li=new t.Wd("x",3,void 0,void 0),t.mi=new t.Wd("y",3,void 0,void 0);var Ze;t.ni=new en,Ze=/'/g,en.prototype.b=function(t,n){var e=[];return on(t,n,e),e.join("&").replace(Ze,"%27")},t.N.prototype.V=function(n){return t.Vd(this.data,n?n.data:null)},t.N.prototype.Zh=t.ua(2),t.t(an,t.D),an.prototype.set=function(n,e){if(null!=e&&!(e&&t.y(e.maxZoom)&&e.tileSize&&e.tileSize.width&&e.tileSize.height&&e.getTile&&e.getTile.apply))throw Error("Expected value implementing google.maps.MapType");return t.D.prototype.set.apply(this,arguments)},t.t(t.le,t.D),t.k=sn.prototype,t.k.contains=function(n){return this.b.hasOwnProperty(t.Gb(n))},t.k.getFeatureById=function(t){return c(this.f,t)},t.k.add=function(n){if(n=n||{},n=n instanceof t.Zc?n:new t.Zc(n),!this.contains(n)){var e=n.getId();if(e){var i=this.getFeatureById(e);i&&this.remove(i)}i=t.Gb(n),this.b[i]=n,e&&(this.f[e]=n);var o=t.A.forward(n,"setgeometry",this),r=t.A.forward(n,"setproperty",this),a=t.A.forward(n,"removeproperty",this);this.j[i]=function(){t.A.removeListener(o),t.A.removeListener(r),t.A.removeListener(a)},t.A.trigger(this,"addfeature",{feature:n})}return n},t.k.remove=function(n){var e=t.Gb(n),i=n.getId();this.b[e]&&(delete this.b[e],i&&delete this.f[i],(i=this.j[e])&&(delete this.j[e],i()),t.A.trigger(this,"removefeature",{feature:n}))},t.k.forEach=function(t){for(var n in this.b)t(this.b[n])},t.Fe="click dblclick mousedown mousemove mouseout mouseover mouseup rightclick".split(" "),cn.prototype.get=function(t){return this.b[t]},cn.prototype.set=function(n,e){var i=this.b;i[n]||(i[n]={}),t.eb(i[n],e),t.A.trigger(this,"changed",n)},cn.prototype.reset=function(n){delete this.b[n],t.A.trigger(this,"changed",n)},cn.prototype.forEach=function(n){t.db(this.b,n)},t.t(hn,t.D),hn.prototype.overrideStyle=function(n,e){this.b.set(t.Gb(n),e)},hn.prototype.revertStyle=function(n){n?this.b.reset(t.Gb(n)):this.b.forEach(t.p(this.b.reset,this.b))},t.t(t.te,R),t.k=t.te.prototype,t.k.getType=t.ra("GeometryCollection"),t.k.getLength=function(){return this.b.length},t.k.getAt=function(t){return this.b[t]},t.k.getArray=function(){return this.b.slice()},t.k.forEachLatLng=function(t){this.b.forEach(function(n){n.forEachLatLng(t)})},t.t(t.ve,R),t.k=t.ve.prototype,t.k.getType=t.ra("LineString"),t.k.getLength=function(){return this.b.length},t.k.getAt=function(t){return this.b[t]},t.k.getArray=function(){return this.b.slice()},t.k.forEachLatLng=function(t){this.b.forEach(t)};var qe=t.vc(t.tc(t.ve,"google.maps.Data.LineString",!0));t.t(t.we,R),t.k=t.we.prototype,t.k.getType=t.ra("LinearRing"),t.k.getLength=function(){return this.b.length},t.k.getAt=function(t){return this.b[t]},t.k.getArray=function(){return this.b.slice()},t.k.forEachLatLng=function(t){this.b.forEach(t)};var Ye=t.vc(t.tc(t.we,"google.maps.Data.LinearRing",!0));t.t(t.ye,R),t.k=t.ye.prototype,t.k.getType=t.ra("MultiLineString"),t.k.getLength=function(){return this.b.length},t.k.getAt=function(t){return this.b[t]},t.k.getArray=function(){return this.b.slice()},t.k.forEachLatLng=function(t){this.b.forEach(function(n){n.forEachLatLng(t)})},t.t(t.ze,R),t.k=t.ze.prototype,t.k.getType=t.ra("MultiPoint"),t.k.getLength=function(){return this.b.length},t.k.getAt=function(t){return this.b[t]},t.k.getArray=function(){return this.b.slice()},t.k.forEachLatLng=function(t){this.b.forEach(t)},t.t(t.Be,R),t.k=t.Be.prototype,t.k.getType=t.ra("Polygon"),t.k.getLength=function(){return this.b.length},t.k.getAt=function(t){return this.b[t]},t.k.getArray=function(){return this.b.slice()},t.k.forEachLatLng=function(t){this.b.forEach(function(n){n.forEachLatLng(t)})};var Qe=t.vc(t.tc(t.Be,"google.maps.Data.Polygon",!0));t.t(t.De,R),t.k=t.De.prototype,t.k.getType=t.ra("MultiPolygon"),t.k.getLength=function(){return this.b.length},t.k.getAt=function(t){return this.b[t]},t.k.getArray=function(){return this.b.slice()},t.k.forEachLatLng=function(t){this.b.forEach(function(n){n.forEachLatLng(t)})},t.pi=t.zc(t.tc(t.le,"Map")),t.t(un,t.D),t.k=un.prototype,t.k.contains=function(t){return this.b.contains(t)},t.k.getFeatureById=function(t){return this.b.getFeatureById(t)},t.k.add=function(t){return this.b.add(t)},t.k.remove=function(t){this.b.remove(t)},t.k.forEach=function(t){this.b.forEach(t)},t.k.addGeoJson=function(n,e){return t.Ee(this.b,n,e)},t.k.loadGeoJson=function(n,e,i){var o=this.b;t.G("data",function(t){t.Jk(o,n,e,i)})},t.k.toGeoJson=function(n){var e=this.b;t.G("data",function(t){t.Fk(e,n)})},t.k.overrideStyle=function(t,n){this.f.overrideStyle(t,n)},t.k.revertStyle=function(t){this.f.revertStyle(t)},t.k.controls_changed=function(){this.get("controls")&&fn(this)},t.k.drawingMode_changed=function(){this.get("drawingMode")&&fn(this)},t.rd(un.prototype,{map:t.pi,style:t.$b,controls:t.zc(t.vc(t.uc(ze))),controlPosition:t.zc(t.uc(t.Vf)),drawingMode:t.zc(t.uc(ze))}),t.qi={METRIC:0,IMPERIAL:1},t.ri={DRIVING:"DRIVING",WALKING:"WALKING",BICYCLING:"BICYCLING",TRANSIT:"TRANSIT"},t.si={BEST_GUESS:"bestguess",OPTIMISTIC:"optimistic",PESSIMISTIC:"pessimistic"},t.ti={BUS:"BUS",RAIL:"RAIL",SUBWAY:"SUBWAY",TRAIN:"TRAIN",TRAM:"TRAM"},t.ui={LESS_WALKING:"LESS_WALKING",FEWER_TRANSFERS:"FEWER_TRANSFERS"};var Xe=t.rc({routes:t.vc(t.wc(t.mb))},!0),He={main:[],common:["main"],util:["common"],adsense:["main"],controls:["util"],data:["util"],directions:["util","geometry"],distance_matrix:["util"],drawing:["main"],drawing_impl:["controls"],elevation:["util","geometry"],geocoder:["util"],geojson:["main"],imagery_viewer:["main"],geometry:["main"],infowindow:["util"],kml:["onion","util","map"],layers:["map"],map:["common"],marker:["util"],maxzoom:["util"],onion:["util","map"],overlay:["common"],panoramio:["main"],places:["main"],places_impl:["controls"],poly:["util","map","geometry"],search:["main"],search_impl:["onion"],stats:["util"],streetview:["util","geometry"],usage:["util"],visualization:["main"],visualization_impl:["onion"],weather:["main"],zombie:["main"]},$e=t.Vb.google.maps,Je=j.b(),ti=t.p(Je.ib,Je);$e.__gjsload__=ti,t.db($e.modules,ti),delete $e.modules;var ni=t.rc({source:t.Kh,webUrl:t.Nh,iosDeepLinkId:t.Nh}),ei=t.yc(t.rc({placeId:t.Nh,query:t.Nh,location:t.Kc}),function(n){if(n.placeId&&n.query)throw t.oc("cannot set both placeId and query");if(!n.placeId&&!n.query)throw t.oc("must set one of placeId or query");return n});t.t(dn,t.D),t.rd(dn.prototype,{position:t.zc(t.Kc),title:t.Nh,icon:t.zc(t.xc([t.Kh,{Nf:I("url"),then:t.rc({url:t.Kh,scaledSize:t.zc(K),size:t.zc(K),origin:t.zc(z),anchor:t.zc(z),labelOrigin:t.zc(z),path:t.wc(function(t){return null==t})},!0)},{Nf:I("path"),then:t.rc({path:t.xc([t.Kh,t.uc(Ke)]),anchor:t.zc(z),labelOrigin:t.zc(z),fillColor:t.Nh,fillOpacity:t.Mh,rotation:t.Mh,scale:t.Mh,strokeColor:t.Nh,strokeOpacity:t.Mh,strokeWeight:t.Mh,url:t.wc(function(t){return null==t})},!0)}])),label:t.zc(t.xc([t.Kh,{Nf:I("text"),then:t.rc({text:t.Kh,fontSize:t.Nh,fontWeight:t.Nh,fontFamily:t.Nh},!0)}])),shadow:t.$b,shape:t.$b,cursor:t.Nh,clickable:t.Oh,animation:t.$b,draggable:t.Oh,visible:t.Oh,flat:t.$b,zIndex:t.Mh,opacity:t.Mh,place:t.zc(ei),attribution:t.zc(ni)});var ii=t.zc(t.tc(t.Fd,"StreetViewPanorama"));t.t(t.Me,dn),t.Me.prototype.map_changed=function(){this.__gm.set&&this.__gm.set.remove(this);var n=this.get("map");this.__gm.set=n&&n.__gm.ea,this.__gm.set&&t.vd(this.__gm.set,this)},t.Me.MAX_ZINDEX=1e6,t.rd(t.Me.prototype,{map:t.xc([t.pi,ii])}),t.t(gn,t.D),t.k=gn.prototype,t.k.internalAnchor_changed=function(){var n=this.get("internalAnchor");bn(this,"attribution",n),bn(this,"place",n),bn(this,"internalAnchorMap",n,"map"),bn(this,"internalAnchorPoint",n,"anchorPoint"),n instanceof t.Me?bn(this,"internalAnchorPosition",n,"internalPosition"):bn(this,"internalAnchorPosition",n,"position")},t.k.internalAnchorPoint_changed=gn.prototype.internalPixelOffset_changed=function(){var n=this.get("internalAnchorPoint")||t.Qh,e=this.get("internalPixelOffset")||t.Rh;this.set("pixelOffset",new t.L(e.width+Math.round(n.x),e.height+Math.round(n.y)))},t.k.internalAnchorPosition_changed=function(){var t=this.get("internalAnchorPosition");t&&this.set("position",t)},t.k.internalAnchorMap_changed=function(){this.get("internalAnchor")&&this.b.set("map",this.get("internalAnchorMap"))},t.k.lm=function(){var t=this.get("internalAnchor");!this.b.get("map")&&t&&t.get("map")&&this.set("internalAnchor",null)},t.k.internalContent_changed=function(){this.set("content",ln(this.get("internalContent")))},t.k.trigger=function(n){t.A.trigger(this.b,n)},t.k.close=function(){this.b.set("map",null)},t.t(t.Pe,t.D),t.rd(t.Pe.prototype,{content:t.xc([t.Nh,t.wc(O)]),position:t.zc(t.Kc),size:t.zc(K),map:t.xc([t.pi,ii]),anchor:t.zc(t.tc(t.D,"MVCObject")),zIndex:t.Mh}),t.Pe.prototype.open=function(t,n){this.set("anchor",n),n?!this.get("map")&&t&&this.set("map",t):this.set("map",t)},t.Pe.prototype.close=function(){this.set("map",null)},t.Qe=[],t.t(mn,t.D),mn.prototype.changed=function(n){if("map"==n||"panel"==n){var e=this;t.G("directions",function(t){t.ol(e,n)})}"panel"==n&&t.Re(this.getPanel())},t.rd(mn.prototype,{directions:Xe,map:t.pi,panel:t.zc(t.wc(O)),routeIndex:t.Mh}),yn.prototype.route=function(n,e){t.G("directions",function(t){t.Kh(n,e,!0)})},vn.prototype.getDistanceMatrix=function(n,e){t.G("distance_matrix",function(t){t.b(n,e)})},wn.prototype.getElevationAlongPath=function(n,e){t.G("elevation",function(t){t.getElevationAlongPath(n,e)})},wn.prototype.getElevationForLocations=function(n,e){t.G("elevation",function(t){t.getElevationForLocations(n,e)})},t.Ki=t.tc(t.kd,"LatLngBounds"),t.We.prototype.geocode=function(n,e){t.G("geocoder",function(t){t.geocode(n,e)})},t.t(t.Xe,t.D),t.Xe.prototype.map_changed=function(){var n=this;t.G("kml",function(t){t.b(n)})},t.rd(t.Xe.prototype,{map:t.pi,url:null,bounds:null,opacity:t.Mh}),t.Mi={UNKNOWN:"UNKNOWN",OK:t.ia,INVALID_REQUEST:t.ba,DOCUMENT_NOT_FOUND:"DOCUMENT_NOT_FOUND",FETCH_ERROR:"FETCH_ERROR",INVALID_DOCUMENT:"INVALID_DOCUMENT",DOCUMENT_TOO_LARGE:"DOCUMENT_TOO_LARGE",LIMITS_EXCEEDED:"LIMITS_EXECEEDED",TIMED_OUT:"TIMED_OUT"},t.t(En,t.D),t.k=En.prototype,t.k.wd=function(){var n=this;t.G("kml",function(t){t.f(n)})},t.k.url_changed=En.prototype.wd,t.k.driveFileId_changed=En.prototype.wd,t.k.map_changed=En.prototype.wd,t.k.zIndex_changed=En.prototype.wd,t.rd(En.prototype,{map:t.pi,defaultViewport:null,metadata:null,status:null,url:t.Nh,screenOverlays:t.Oh,zIndex:t.Mh}),t.t(t.$e,t.D),t.rd(t.$e.prototype,{map:t.pi}),t.t(kn,t.D),t.rd(kn.prototype,{map:t.pi}),t.t(Ln,t.D),t.rd(Ln.prototype,{map:t.pi}),!t.jh&&!t.hh||t.hh&&9<=+t.wh||t.jh&&t.Yb("1.9.1"),t.hh&&t.Yb("9"),t.cf.prototype.df=!0,t.cf.prototype.Fb=t.ua(4),t.cf.prototype.ah=!0,t.cf.prototype.Id=t.ua(6),t.df("about:blank"),t.ff.prototype.ah=!0,t.ff.prototype.Id=t.ua(5),t.ff.prototype.df=!0,t.ff.prototype.Fb=t.ua(3),t.ef={},t.gf("<!DOCTYPE html>",0),t.gf("",0),t.gf("<br>",0),t.qg="StopIteration"in t.Vb?t.Vb.StopIteration:{message:"StopIteration",stack:""},t.kf.prototype.next=function(){throw t.qg},t.kf.prototype.Fe=function(){return this},t.t(An,t.kf),An.prototype.setPosition=function(n,e,i){(this.node=n)&&(this.f=t.Ga(e)?e:1!=this.node.nodeType?0:this.b?-1:1),t.Ga(i)&&(this.depth=i)},An.prototype.next=function(){if(this.j){if(!this.node||this.l&&0==this.depth)throw t.qg;var n=this.node,e=this.b?-1:1;if(this.f==e){var i=this.b?n.lastChild:n.firstChild;i?this.setPosition(i):this.setPosition(n,-1*e)}else(i=this.b?n.previousSibling:n.nextSibling)?this.setPosition(i):this.setPosition(n.parentNode,-1*e);this.depth+=this.f*(this.b?-1:1)}else this.j=!0;if(n=this.node,!this.node)throw t.qg;return n},An.prototype.V=function(t){return t.node==this.node&&(!this.node||t.f==this.f)},An.prototype.splice=function(){var n=this.node,e=this.b?1:-1;this.f==e&&(this.f=-1*e,this.depth+=this.f*(this.b?-1:1)),this.b=!this.b,An.prototype.next.call(this),this.b=!this.b,e=t.Ka(arguments[0])?arguments[0]:arguments;for(var i=e.length-1;i>=0;i--)t.hf(e[i],n);t.jf(n)},t.t(Mn,An),Mn.prototype.next=function(){do Mn.nb.next.call(this);while(-1==this.f);return this.node};var oi;t.t(_n,t.N);var ri;t.t(Tn,t.N);var ai;t.t(On,t.N);var si;t.t(In,t.N),t.t(Sn,t.N),t.t(t.sf,t.N),t.t(Rn,t.N),t.t(Pn,t.N),t.t(Dn,t.N),t.rg={};var ci;t.Rf.prototype.fromLatLngToPoint=function(n,e){e=e||new t.K(0,0);var i=this.b;return e.x=i.x+n.lng()*this.j,n=t.gb(Math.sin(t.lc(n.lat())),-(1-1e-15),1-1e-15),e.y=i.y+.5*Math.log((1+n)/(1-n))*-this.l,e},t.Rf.prototype.fromPointToLatLng=function(n,e){var i=this.b;return new t.F(t.mc(2*Math.atan(Math.exp((n.y-i.y)/-this.l))-Math.PI/2),(n.x-i.x)/this.j,e)},t.Uf={japan_prequake:20,japan_postquake2010:24},t.Si={NEAREST:"nearest",BEST:"best"},t.Ti={DEFAULT:"default",OUTDOOR:"outdoor"},t.t(Gn,t.Fd),Gn.prototype.visible_changed=function(){var n=this;!n.m&&n.getVisible()&&(n.m=!0,t.G("streetview",function(t){if(n.f)var e=n.f;t.Cm(n,e)}))},t.rd(Gn.prototype,{visible:t.Oh,pano:t.Nh,position:t.zc(t.Kc),pov:t.zc(Be),motionTracking:Ve,photographerPov:null,location:null,links:t.vc(t.wc(t.mb)),status:null,zoom:t.Mh,enableCloseButton:t.Oh}),Gn.prototype.registerPanoProvider=function(t,n){this.set("panoProvider",{Bh:t,options:n||{}})},t.t(Cn,$),t.Zf.prototype.addListener=function(t,n){this.P.addListener(t,n)},t.Zf.prototype.addListenerOnce=function(t,n){this.P.addListenerOnce(t,n)},t.Zf.prototype.removeListener=function(t,n){this.P.removeListener(t,n)},t.Zf.prototype.b=t.ua(7),t.Ui=new t.$f(0,0),t.t(t.ag,t.D),t.ag.prototype.N=function(){var n=this;n.D||(n.D=t.Vb.setTimeout(function(){n.D=void 0,n.aa()},n.pi))},t.ag.prototype.C=function(){this.D&&t.Vb.clearTimeout(this.D),this.D=void 0,this.aa()};var hi;t.t(Fn,t.N);var ui;t.t(zn,t.N);var fi;t.t(Kn,t.N);var li;t.t(Un,t.N);var pi;t.t(Bn,t.N),Bn.prototype.getZoom=function(){return t.O(this,2)},Bn.prototype.setZoom=function(t){this.data[2]=t},t.t(Wn,t.ag);var di={roadmap:0,satellite:2,hybrid:3,terrain:4},gi={0:1,2:2,3:2,4:2};t.k=Wn.prototype,t.k.Mg=t.pd("center"),t.k.bg=t.pd("zoom"),t.k.changed=function(){var t=this.Mg(),n=this.bg(),e=Zn(this);(t&&!t.V(this.T)||this.S!=n||this.Z!=e)&&(this.j||qn(this.b),this.N(),this.S=n,this.Z=e),this.T=t},t.k.aa=function(){var n=Zn(this);if(this.j&&this.m)this.l!=n&&qn(this.b);else{var e="",i=this.Mg(),o=this.bg(),r=this.get("size");if(r){if(i&&window.isFinite(i.lat())&&window.isFinite(i.lng())&&o>1&&null!=n&&r&&r.width&&r.height&&this.f){if(t.bg(this.f,r),i=t.Sf(this.F,i,o)){var a=new t.Cd;a.I=Math.round(i.x-r.width/2),a.K=a.I+r.width,a.J=Math.round(i.y-r.height/2),a.L=a.J+r.height}else a=null;if(i=gi[n],a){this.m=!0,this.l=n,this.j&&this.b&&(e=new q(Math.pow(2,o),0,0),this.j.set({Ua:this.b,Ba:{min:Y(e,{ab:a.I,cb:a.J}),max:Y(e,{ab:a.K,cb:a.L})},size:{width:r.width,height:r.height}})),e=new Bn;var s=new Kn(t.Q(e,0));if(s.data[0]=a.I,s.data[1]=a.J,e.data[1]=i,e.setZoom(o),o=new Un(t.Q(e,3)),o.data[0]=a.K-a.I,o.data[1]=a.L-a.J,o=new zn(t.Q(e,4)),o.data[0]=n,o.data[4]=t.wf(t.zf(t.R)),o.data[5]=t.xf(t.zf(t.R)).toLowerCase(),o.data[9]=!0,o.data[11]=!0,n=this.O+window.unescape("%3F"),!pi){if(o=pi={b:-1,A:[]},i=new Kn([]),fi||(fi={b:-1,A:[,t.S,t.S]}),i=t.M(i,fi),a=new Un([]),li||(li={b:-1,A:[]},li.A=[,t.bi,t.bi,t.ce(1)]),a=t.M(a,li),s=new zn([]),!ui){var c=[];
ui={b:-1,A:c},c[1]=t.U,c[2]=t.T,c[3]=t.T,c[5]=t.V,c[6]=t.V;var h=new Fn([]);hi||(hi={b:-1,A:[,t.fi,t.T]}),c[9]=t.M(h,hi),c[10]=t.T,c[11]=t.T,c[12]=t.T,c[13]=t.fi,c[100]=t.T}if(s=t.M(s,ui),c=new _n([]),!oi){h=oi={b:-1,A:[]};var u=new Tn([]);ri||(ri={b:-1,A:[,t.T]}),u=t.M(u,ri);var f=new In([]);si||(si={b:-1,A:[,t.T,t.T]}),f=t.M(f,si);var l=new On([]);ai||(ai={b:-1,A:[,t.T]}),h.A=[,u,,,,,,,,,f,,t.M(l,ai)]}o.A=[,i,t.U,t.bi,a,s,t.M(c,oi)]}e=t.ni.b(e.data,pi),e=this.G(n+e)}}this.b&&(t.bg(this.b,r),Qn(this,e))}}},t.k.div_changed=function(){var n=this.get("div"),e=this.f;if(n)if(e)n.appendChild(e);else{e=this.f=window.document.createElement("div"),e.style.overflow="hidden";var i=this.b=window.document.createElement("img");t.A.addDomListener(e,"contextmenu",function(n){t.ub(n),t.wb(n)}),i.ontouchstart=i.ontouchmove=i.ontouchend=i.ontouchcancel=function(n){t.vb(n),t.wb(n)},t.bg(i,t.Rh),n.appendChild(e),this.aa()}else e&&(qn(e),this.f=null)},t.t(Xn,t.le),t.k=Xn.prototype,t.k.streetView_changed=function(){var t=this.get("streetView");t?t.set("standAlone",!1):this.set("streetView",this.__gm.j)},t.k.getDiv=function(){return this.__gm.R},t.k.panBy=function(n,e){var i=this.__gm;t.G("map",function(){t.A.trigger(i,"panby",n,e)})},t.k.panTo=function(n){var e=this.__gm;n=t.Kc(n),t.G("map",function(){t.A.trigger(e,"panto",n)})},t.k.panToBounds=function(n){var e=this.__gm,i=t.nd(n);t.G("map",function(){t.A.trigger(e,"pantolatlngbounds",i)})},t.k.fitBounds=function(n,e){var i=this;n=t.nd(n),t.G("map",function(t){t.fitBounds(i,n,e)})},t.rd(Xn.prototype,{bounds:null,streetView:ii,center:t.zc(t.Kc),zoom:t.Mh,mapTypeId:t.Nh,projection:null,heading:t.Mh,tilt:t.Mh,clickableIcons:Ve}),$n.prototype.getMaxZoomAtLatLng=function(n,e){t.G("maxzoom",function(t){t.getMaxZoomAtLatLng(n,e)})},t.t(Jn,t.D),Jn.prototype.changed=function(n){if("suppressInfoWindows"!=n&&"clickable"!=n){var e=this;t.G("onion",function(t){t.b(e)})}},t.rd(Jn.prototype,{map:t.pi,tableId:t.Mh,query:t.zc(t.xc([t.Kh,t.wc(t.mb,"not an Object")]))}),t.t(t.xg,t.D),t.xg.prototype.map_changed=function(){var n=this;t.G("overlay",function(t){t.Tj(n)})},t.rd(t.xg.prototype,{panes:null,projection:null,map:t.xc([t.pi,ii])});var bi=ie(t.tc(t.F,"LatLng"));t.t(t.Eg,t.D),t.Eg.prototype.map_changed=t.Eg.prototype.visible_changed=function(){var n=this;t.G("poly",function(t){t.b(n)})},t.Eg.prototype.center_changed=function(){t.A.trigger(this,"bounds_changed")},t.Eg.prototype.radius_changed=t.Eg.prototype.center_changed,t.Eg.prototype.getBounds=function(){var n=this.get("radius"),e=this.get("center");if(e&&t.y(n)){var i=this.get("map");return i=i&&i.__gm.get("baseMapType"),t.Tf(e,n/t.zg(i))}return null},t.rd(t.Eg.prototype,{center:t.zc(t.Kc),draggable:t.Oh,editable:t.Oh,map:t.pi,radius:t.Mh,visible:t.Oh}),t.t(oe,t.D),oe.prototype.map_changed=oe.prototype.visible_changed=function(){var n=this;t.G("poly",function(t){t.f(n)})},oe.prototype.getPath=function(){return this.get("latLngs").getAt(0)},oe.prototype.setPath=function(n){try{this.get("latLngs").setAt(0,ne(n))}catch(e){t.qc(e)}},t.rd(oe.prototype,{draggable:t.Oh,editable:t.Oh,map:t.pi,visible:t.Oh}),t.t(t.Gg,oe),t.Gg.prototype.Ea=!0,t.Gg.prototype.getPaths=function(){return this.get("latLngs")},t.Gg.prototype.setPaths=function(t){this.set("latLngs",ee(t))},t.t(t.Hg,oe),t.Hg.prototype.Ea=!1,t.t(t.Ig,t.D),t.Ig.prototype.map_changed=t.Ig.prototype.visible_changed=function(){var n=this;t.G("poly",function(t){t.j(n)})},t.rd(t.Ig.prototype,{draggable:t.Oh,editable:t.Oh,bounds:t.zc(t.nd),map:t.pi,visible:t.Oh}),t.t(re,t.D),re.prototype.map_changed=function(){var n=this;t.G("streetview",function(t){t.Sj(n)})},t.rd(re.prototype,{map:t.pi}),t.Og.prototype.getPanorama=function(n,e){var i=this.b||void 0;t.G("streetview",function(o){t.G("geometry",function(t){o.Pk(n,e,t.computeHeading,t.computeOffset,i)})})},t.Og.prototype.getPanoramaByLocation=function(t,n,e){this.getPanorama({location:t,radius:n,preference:50>(n||0)?"best":"nearest"},e)},t.Og.prototype.getPanoramaById=function(t,n){this.getPanorama({pano:t},n)},t.t(t.Pg,t.D),t.k=t.Pg.prototype,t.k.getTile=function(n,e,i){if(!n||!i)return null;var o=i.createElement("div");i={Y:n,zoom:e,Qb:null},o.__gmimt=i,t.vd(this.b,o);var r=se(this);if(1!=r&&ae(o,r),this.f){r=this.tileSize||new t.L(256,256);var a=this.j(n,e);i.Qb=this.f({ca:n.x,ba:n.y,fa:e},r,o,a,function(){t.A.trigger(o,"load")})}return o},t.k.releaseTile=function(t){t&&this.b.contains(t)&&(this.b.remove(t),(t=t.__gmimt.Qb)&&t.release())},t.k.Ue=t.ua(8),t.k.opacity_changed=function(){var t=se(this);this.b.forEach(function(n){return ae(n,t)})},t.k.Sb=!0,t.rd(t.Pg.prototype,{opacity:t.Mh}),t.t(t.Sg,t.D),t.Sg.prototype.getTile=Ne,t.Sg.prototype.tileSize=new t.L(256,256),t.Sg.prototype.Sb=!0,t.t(t.Tg,t.Sg),t.t(t.Ug,t.D),t.rd(t.Ug.prototype,{attribution:t.zc(ni),place:t.zc(ei)});var mi={Animation:{BOUNCE:1,DROP:2,po:3,no:4},Circle:t.Eg,ControlPosition:t.Vf,Data:un,GroundOverlay:t.Xe,ImageMapType:t.Pg,InfoWindow:t.Pe,LatLng:t.F,LatLngBounds:t.kd,MVCArray:t.td,MVCObject:t.D,Map:Xn,MapTypeControlStyle:{DEFAULT:0,HORIZONTAL_BAR:1,DROPDOWN_MENU:2,INSET:3,INSET_LARGE:4},MapTypeId:t.dh,MapTypeRegistry:an,Marker:t.Me,MarkerImage:function(t,n,e,i,o){this.url=t,this.size=n||o,this.origin=e,this.anchor=i,this.scaledSize=o,this.labelOrigin=null},NavigationControlStyle:{DEFAULT:0,SMALL:1,ANDROID:2,ZOOM_PAN:3,qo:4,Dj:5},OverlayView:t.xg,Point:t.K,Polygon:t.Gg,Polyline:t.Hg,Rectangle:t.Ig,ScaleControlStyle:{DEFAULT:0},Size:t.L,StreetViewPreference:t.Si,StreetViewSource:t.Ti,StrokePosition:{CENTER:0,INSIDE:1,OUTSIDE:2},SymbolPath:Ke,ZoomControlStyle:{DEFAULT:0,SMALL:1,LARGE:2,Dj:3},event:t.A};t.eb(mi,{BicyclingLayer:t.$e,DirectionsRenderer:mn,DirectionsService:yn,DirectionsStatus:{OK:t.ia,UNKNOWN_ERROR:t.la,OVER_QUERY_LIMIT:t.ja,REQUEST_DENIED:t.ka,INVALID_REQUEST:t.ba,ZERO_RESULTS:t.ma,MAX_WAYPOINTS_EXCEEDED:t.ea,NOT_FOUND:t.ha},DirectionsTravelMode:t.ri,DirectionsUnitSystem:t.qi,DistanceMatrixService:vn,DistanceMatrixStatus:{OK:t.ia,INVALID_REQUEST:t.ba,OVER_QUERY_LIMIT:t.ja,REQUEST_DENIED:t.ka,UNKNOWN_ERROR:t.la,MAX_ELEMENTS_EXCEEDED:t.da,MAX_DIMENSIONS_EXCEEDED:t.ca},DistanceMatrixElementStatus:{OK:t.ia,NOT_FOUND:t.ha,ZERO_RESULTS:t.ma},ElevationService:wn,ElevationStatus:{OK:t.ia,UNKNOWN_ERROR:t.la,OVER_QUERY_LIMIT:t.ja,REQUEST_DENIED:t.ka,INVALID_REQUEST:t.ba,ko:"DATA_NOT_AVAILABLE"},FusionTablesLayer:Jn,Geocoder:t.We,GeocoderLocationType:{ROOFTOP:"ROOFTOP",RANGE_INTERPOLATED:"RANGE_INTERPOLATED",GEOMETRIC_CENTER:"GEOMETRIC_CENTER",APPROXIMATE:"APPROXIMATE"},GeocoderStatus:{OK:t.ia,UNKNOWN_ERROR:t.la,OVER_QUERY_LIMIT:t.ja,REQUEST_DENIED:t.ka,INVALID_REQUEST:t.ba,ZERO_RESULTS:t.ma,ERROR:t.aa},KmlLayer:En,KmlLayerStatus:t.Mi,MaxZoomService:$n,MaxZoomStatus:{OK:t.ia,ERROR:t.aa},SaveWidget:t.Ug,StreetViewCoverageLayer:re,StreetViewPanorama:Gn,StreetViewService:t.Og,StreetViewStatus:{OK:t.ia,UNKNOWN_ERROR:t.la,ZERO_RESULTS:t.ma},StyledMapType:t.Tg,TrafficLayer:kn,TrafficModel:t.si,TransitLayer:Ln,TransitMode:t.ti,TransitRoutePreference:t.ui,TravelMode:t.ri,UnitSystem:t.qi}),t.eb(un,{Feature:t.Zc,Geometry:R,GeometryCollection:t.te,LineString:t.ve,LinearRing:t.we,MultiLineString:t.ye,MultiPoint:t.ze,MultiPolygon:t.De,Point:t.Lc,Polygon:t.Be}),t.Xc("main",{});var yi,vi=/'/g,wi=arguments[0];window.google.maps.Load(function(n,e){var i=window.google.maps;pe();var o=de(i);for(t.R=new Pn(n),t.bj=Math.random()<t.O(t.R,0,1),t.cj=Math.round(1e15*Math.random()).toString(36),t.tg=ue(),t.Li=fe(),t.Ri=new t.td,t.Ef=e,n=0;n<t.je(t.R,8);++n)t.rg[t.ie(t.R,8,n)]=!0;n=new t.sf(t.R.data[3]),pn(t.P(n,0)),t.db(mi,function(t,n){i[t]=n}),i.version=t.P(n,1),window.setTimeout(function(){F(["util","stats"],function(n,e){n.f.b(),n.j(),o&&e.b.b({ev:"api_alreadyloaded",client:t.P(t.R,6),key:t.yf()})})},5e3),t.A.Sm(),ci=new jn,(n=t.P(t.R,11))&&F(t.he(t.R,12),le(n),!0)})}.call(this,{});

// Based on https://github.com/shramov/leaflet-plugins
// GridLayer like https://avinmathew.com/leaflet-and-google-maps/ , but using MutationObserver instead of jQuery


// ðŸ‚class GridLayer.GoogleMutant
// ðŸ‚extends GridLayer
L.GridLayer.GoogleMutant = L.GridLayer.extend({
	includes: L.Mixin.Events,

	options: {
		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,
		subdomains: 'abc',
		errorTileUrl: '',
		attribution: '',	// The mutant container will add its own attribution anyways.
		opacity: 1,
		continuousWorld: false,
		noWrap: false,
		// ðŸ‚option type: String = 'roadmap'
		// Google's map type. Valid values are 'roadmap', 'satellite' or 'terrain'. 'hybrid' is not really supported.
		type: 'roadmap',
		maxNativeZoom: 21
	},

	initialize: function (options) {
		L.GridLayer.prototype.initialize.call(this, options);

		this._ready = !!window.google && !!window.google.maps && !!window.google.maps.Map;

		this._GAPIPromise = this._ready ? Promise.resolve(window.google) : new Promise(function (resolve, reject) {
			var checkCounter = 0;
			var intervalId = null;
			intervalId = setInterval(function () {
				if (checkCounter >= 10) {
					clearInterval(intervalId);
					return reject(new Error('window.google not found after 10 attempts'));
				}
				if (!!window.google && !!window.google.maps && !!window.google.maps.Map) {
					clearInterval(intervalId);
					return resolve(window.google);
				}
				checkCounter++;
			}, 500);
		});

		// Couple data structures indexed by tile key
		this._tileCallbacks = {};	// Callbacks for promises for tiles that are expected
		this._freshTiles = {};	// Tiles from the mutant which haven't been requested yet

		this._imagesPerTile = (this.options.type === 'hybrid') ? 2 : 1;
	},

	onAdd: function (map) {
		L.GridLayer.prototype.onAdd.call(this, map);
		this._initMutantContainer();

		this._GAPIPromise.then(function () {
			this._ready = true;
			this._map = map;

			this._initMutant();

			map.on('viewreset', this._reset, this);
			map.on('move', this._update, this);
			map.on('zoomend', this._handleZoomAnim, this);
			map.on('resize', this._resize, this);

			//handle layer being added to a map for which there are no Google tiles at the given zoom
			google.maps.event.addListenerOnce(this._mutant, 'idle', function () {
				this._checkZoomLevels();
				this._mutantIsReady = true;
			}.bind(this));

			//20px instead of 1em to avoid a slight overlap with google's attribution
			map._controlCorners.bottomright.style.marginBottom = '20px';
			map._controlCorners.bottomleft.style.marginBottom = '20px';

			this._reset();
			this._update();

			if (this._subLayers) {
				//restore previously added google layers
				for (var layerName in this._subLayers) {
					this._subLayers[layerName].setMap(this._mutant);
				}
			}
		}.bind(this));
	},

	onRemove: function (map) {
		L.GridLayer.prototype.onRemove.call(this, map);
		map._container.removeChild(this._mutantContainer);
		this._mutantContainer = undefined;

		map.off('viewreset', this._reset, this);
		map.off('move', this._update, this);
		map.off('zoomend', this._handleZoomAnim, this);
		map.off('resize', this._resize, this);

		map._controlCorners.bottomright.style.marginBottom = '0em';
		map._controlCorners.bottomleft.style.marginBottom = '0em';
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		if (opacity < 1) {
			L.DomUtil.setOpacity(this._mutantContainer, opacity);
		}
	},

	setElementSize: function (e, size) {
		e.style.width = size.x + 'px';
		e.style.height = size.y + 'px';
	},


	addGoogleLayer: function (googleLayerName, options) {
		if (!this._subLayers) this._subLayers = {};
		return this._GAPIPromise.then(function () {
			var Constructor = google.maps[googleLayerName];
			var googleLayer = new Constructor(options);
			googleLayer.setMap(this._mutant);
			this._subLayers[googleLayerName] = googleLayer;
			return googleLayer;
		}.bind(this));
	},

	removeGoogleLayer: function (googleLayerName) {
		var googleLayer = this._subLayers && this._subLayers[googleLayerName];
		if (!googleLayer) return;

		googleLayer.setMap(null);
		delete this._subLayers[googleLayerName];
	},


	_initMutantContainer: function () {
		if (!this._mutantContainer) {
			this._mutantContainer = L.DomUtil.create('div', 'leaflet-google-mutant leaflet-top leaflet-left');
			this._mutantContainer.id = '_MutantContainer_' + L.Util.stamp(this._mutantContainer);
			this._mutantContainer.style.zIndex = '800'; //leaflet map pane at 400, controls at 1000
			this._mutantContainer.style.pointerEvents = 'none';

			this._map.getContainer().appendChild(this._mutantContainer);
		}

		this.setOpacity(this.options.opacity);
		this.setElementSize(this._mutantContainer, this._map.getSize());

		this._attachObserver(this._mutantContainer);
	},

	_initMutant: function () {
		if (!this._ready || !this._mutantContainer) return;
		this._mutantCenter = new google.maps.LatLng(0, 0);

		var map = new google.maps.Map(this._mutantContainer, {
			center: this._mutantCenter,
			zoom: 0,
			tilt: 0,
			mapTypeId: this.options.type,
			disableDefaultUI: true,
			keyboardShortcuts: false,
			draggable: false,
			disableDoubleClickZoom: true,
			scrollwheel: false,
			streetViewControl: false,
			styles: this.options.styles || {},
			backgroundColor: 'transparent'
		});

		this._mutant = map;

		google.maps.event.addListenerOnce(map, 'idle', function () {
			var nodes = this._mutantContainer.querySelectorAll('a');
			for (var i = 0; i < nodes.length; i++) {
				nodes[i].style.pointerEvents = 'auto';
			}
		}.bind(this));

		// ðŸ‚event spawned
		// Fired when the mutant has been created.
		this.fire('spawned', {mapObject: map});
	},

	_attachObserver: function _attachObserver (node) {
// 		console.log('Gonna observe', node);

		var observer = new MutationObserver(this._onMutations.bind(this));

		// pass in the target node, as well as the observer options
		observer.observe(node, { childList: true, subtree: true });
	},

	_onMutations: function _onMutations (mutations) {
		for (var i = 0; i < mutations.length; ++i) {
			var mutation = mutations[i];
			for (var j = 0; j < mutation.addedNodes.length; ++j) {
				var node = mutation.addedNodes[j];

				if (node instanceof HTMLImageElement) {
					this._onMutatedImage(node);
				} else if (node instanceof HTMLElement) {
					Array.prototype.forEach.call(node.querySelectorAll('img'), this._onMutatedImage.bind(this));
				}
			}
		}
	},

	// Only images which 'src' attrib match this will be considered for moving around.
	// Looks like some kind of string-based protobuf, maybe??
	// Only the roads (and terrain, and vector-based stuff) match this pattern
	_roadRegexp: /!1i(\d+)!2i(\d+)!3i(\d+)!/,

	// On the other hand, raster imagery matches this other pattern
	_satRegexp: /x=(\d+)&y=(\d+)&z=(\d+)/,

	// On small viewports, when zooming in/out, a static image is requested
	// This will not be moved around, just removed from the DOM.
	_staticRegExp: /StaticMapService\.GetMapImage/,

	_onMutatedImage: function _onMutatedImage (imgNode) {
// 		if (imgNode.src) {
// 			console.log('caught mutated image: ', imgNode.src);
// 		}

		var coords;
		var match = imgNode.src.match(this._roadRegexp);
		var sublayer = 0;

		if (match) {
			coords = {
				z: match[1],
				x: match[2],
				y: match[3]
			};
			if (this._imagesPerTile > 1) { 
				imgNode.style.zIndex = 1;
				sublayer = 1;
			}
		} else {
			match = imgNode.src.match(this._satRegexp);
			if (match) {
				coords = {
					x: match[1],
					y: match[2],
					z: match[3]
				};
			}
// 			imgNode.style.zIndex = 0;
			sublayer = 0;
		}

		if (coords) {
			var tileKey = this._tileCoordsToKey(coords);
			imgNode.style.position = 'absolute';
			imgNode.style.visibility = 'hidden';

			var key = tileKey + '/' + sublayer;
			// console.log('mutation for tile', key)
			//store img so it can also be used in subsequent tile requests
			this._freshTiles[key] = imgNode;

			if (key in this._tileCallbacks && this._tileCallbacks[key]) {
// console.log('Fullfilling callback ', key);
				//fullfill most recent tileCallback because there maybe callbacks that will never get a 
				//corresponding mutation (because map moved to quickly...)
				this._tileCallbacks[key].pop()(imgNode); 
				if (!this._tileCallbacks[key].length) { delete this._tileCallbacks[key]; }
			} else {
				if (this._tiles[tileKey]) {
					//we already have a tile in this position (mutation is probably a google layer being added)
					//replace it
					var c = this._tiles[tileKey].el;
					var oldImg = (sublayer === 0) ? c.firstChild : c.firstChild.nextSibling;
					var cloneImgNode = this._clone(imgNode);
					c.replaceChild(cloneImgNode, oldImg);
				}
			}
		} else if (imgNode.src.match(this._staticRegExp)) {
			imgNode.style.visibility = 'hidden';
		}
	},


	createTile: function (coords, done) {
		var key = this._tileCoordsToKey(coords);

		var tileContainer = L.DomUtil.create('div');
		tileContainer.dataset.pending = this._imagesPerTile;
		done = done.bind(this, null, tileContainer);

		for (var i = 0; i < this._imagesPerTile; i++) {
			var key2 = key + '/' + i;
			if (key2 in this._freshTiles) {
				var imgNode = this._freshTiles[key2];
				tileContainer.appendChild(this._clone(imgNode));
				tileContainer.dataset.pending--;
// 				console.log('Got ', key2, ' from _freshTiles');
			} else {
				this._tileCallbacks[key2] = this._tileCallbacks[key2] || [];
				this._tileCallbacks[key2].push( (function (c/*, k2*/) {
					return function (imgNode) {
						c.appendChild(this._clone(imgNode));
						c.dataset.pending--;
						if (!parseInt(c.dataset.pending)) { done(); }
// 						console.log('Sent ', k2, ' to _tileCallbacks, still ', c.dataset.pending, ' images to go');
					}.bind(this);
				}.bind(this))(tileContainer/*, key2*/) );
			}
		}

		if (!parseInt(tileContainer.dataset.pending)) {
			L.Util.requestAnimFrame(done);
		}
		return tileContainer;
	},

	_clone: function (imgNode) {
		var clonedImgNode = imgNode.cloneNode(true);
		clonedImgNode.style.visibility = 'visible';
		return clonedImgNode;
	},

	_checkZoomLevels: function () {
		//setting the zoom level on the Google map may result in a different zoom level than the one requested
		//(it won't go beyond the level for which they have data).
		var zoomLevel = this._map.getZoom();
		var gMapZoomLevel = this._mutant.getZoom();
		if (!zoomLevel || !gMapZoomLevel) return;


		if ((gMapZoomLevel !== zoomLevel) || //zoom levels are out of sync, Google doesn't have data
			(gMapZoomLevel > this.options.maxNativeZoom)) { //at current location, Google does have data (contrary to maxNativeZoom)
			//Update maxNativeZoom
			this._setMaxNativeZoom(gMapZoomLevel);
		}
	},

	_setMaxNativeZoom: function (zoomLevel) {
		if (zoomLevel != this.options.maxNativeZoom) {
			this.options.maxNativeZoom = zoomLevel;
			this._resetView();
		}
	},

	_reset: function () {
		this._initContainer();
	},

	_update: function () {
		// zoom level check needs to happen before super's implementation (tile addition/creation)
		// otherwise tiles may be missed if maxNativeZoom is not yet correctly determined
		if (this._mutant) {
			var center = this._map.getCenter();
			var _center = new google.maps.LatLng(center.lat, center.lng);

			this._mutant.setCenter(_center);
			var zoom = this._map.getZoom();
			var fractionalLevel = zoom !== Math.round(zoom);
			var mutantZoom = this._mutant.getZoom();

			//ignore fractional zoom levels
			if (!fractionalLevel && (zoom != mutantZoom)) {
				this._mutant.setZoom(zoom);
							
				if (this._mutantIsReady) this._checkZoomLevels();
				//else zoom level check will be done later by 'idle' handler
			}
		}

		L.GridLayer.prototype._update.call(this);
	},

	_resize: function () {
		var size = this._map.getSize();
		if (this._mutantContainer.style.width === size.x &&
			this._mutantContainer.style.height === size.y)
			return;
		this.setElementSize(this._mutantContainer, size);
		if (!this._mutant) return;
		google.maps.event.trigger(this._mutant, 'resize');
	},

	_handleZoomAnim: function () {
		if (!this._mutant) return;
		var center = this._map.getCenter();
		var _center = new google.maps.LatLng(center.lat, center.lng);

		this._mutant.setCenter(_center);
		this._mutant.setZoom(Math.round(this._map.getZoom()));
	},

	// Agressively prune _freshtiles when a tile with the same key is removed,
	// this prevents a problem where Leaflet keeps a loaded tile longer than
	// GMaps, so that GMaps makes two requests but Leaflet only consumes one,
	// polluting _freshTiles with stale data.
	_removeTile: function (key) {
		if (!this._mutant) return;

		//give time for animations to finish before checking it tile should be pruned
		setTimeout(this._pruneTile.bind(this, key), 1000);


		return L.GridLayer.prototype._removeTile.call(this, key);
	},

	_pruneTile: function (key) {
		var gZoom = this._mutant.getZoom();
		var tileZoom = key.split(':')[2];
		var googleBounds = this._mutant.getBounds();
		var sw = googleBounds.getSouthWest();
		var ne = googleBounds.getNorthEast();
		var gMapBounds = L.latLngBounds([[sw.lat(), sw.lng()], [ne.lat(), ne.lng()]]);

		for (var i=0; i<this._imagesPerTile; i++) {
			var key2 = key + '/' + i;
			if (key2 in this._freshTiles) { 
				var tileBounds = this._map && this._keyToBounds(key);
				var stillVisible = this._map && tileBounds.overlaps(gMapBounds) && (tileZoom == gZoom);

				if (!stillVisible) delete this._freshTiles[key2]; 
//				console.log('Prunning of ', key, (!stillVisible))
			}
		}
	}
});


// factory gridLayer.googleMutant(options)
// Returns a new `GridLayer.GoogleMutant` given its options
L.gridLayer.googleMutant = function (options) {
	return new L.GridLayer.GoogleMutant(options);
};
