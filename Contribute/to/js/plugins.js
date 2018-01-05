function hexToRgb(e) {
    var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    e = e.replace(t, function (e, t, i, o) {
        return t + t + i + i + o + o
    });
    var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return i ? {r: parseInt(i[1], 16), g: parseInt(i[2], 16), b: parseInt(i[3], 16)} : null
}
function clamp(e, t, i) {
    return Math.min(Math.max(e, t), i)
}
function isInArray(e, t) {
    return t.indexOf(e) > -1
}
!function () {
    "use strict";
    function e(t, o) {
        var n;
        if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = t, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !e.notNeeded(t)) {
            for (var s = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], r = this, a = 0, l = s.length; a < l; a++)r[s[a]] = function (e, t) {
                return function () {
                    return e.apply(t, arguments)
                }
            }(r[s[a]], r);
            i && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, i, o) {
                var n = Node.prototype.removeEventListener;
                "click" === e ? n.call(t, e, i.hijacked || i, o) : n.call(t, e, i, o)
            }, t.addEventListener = function (e, i, o) {
                var n = Node.prototype.addEventListener;
                "click" === e ? n.call(t, e, i.hijacked || (i.hijacked = function (e) {
                        e.propagationStopped || i(e)
                    }), o) : n.call(t, e, i, o)
            }), "function" == typeof t.onclick && (n = t.onclick, t.addEventListener("click", function (e) {
                n(e)
            }, !1), t.onclick = null)
        }
    }

    var t = navigator.userAgent.indexOf("Windows Phone") >= 0, i = navigator.userAgent.indexOf("Android") > 0 && !t,
        o = /iP(ad|hone|od)/.test(navigator.userAgent) && !t, n = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        s = o && /OS [6-7]_\d/.test(navigator.userAgent), r = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case"button":
            case"select":
            case"textarea":
                if (e.disabled)return !0;
                break;
            case"input":
                if (o && "file" === e.type || e.disabled)return !0;
                break;
            case"label":
            case"iframe":
            case"video":
                return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, e.prototype.needsFocus = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case"textarea":
                return !0;
            case"select":
                return !i;
            case"input":
                switch (e.type) {
                    case"button":
                    case"checkbox":
                    case"file":
                    case"image":
                    case"radio":
                    case"submit":
                        return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    }, e.prototype.sendClick = function (e, t) {
        var i, o;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), o = t.changedTouches[0], (i = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(e), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, e.dispatchEvent(i)
    }, e.prototype.determineEventType = function (e) {
        return i && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
    }, e.prototype.focus = function (e) {
        var t;
        o && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, e.prototype.updateScrollParent = function (e) {
        var t, i;
        if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
            i = e;
            do {
                if (i.scrollHeight > i.offsetHeight) {
                    t = i, e.fastClickScrollParent = i;
                    break
                }
                i = i.parentElement
            } while (i)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, e.prototype.getTargetElementFromEventTarget = function (e) {
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, e.prototype.onTouchStart = function (e) {
        var t, i, s;
        if (e.targetTouches.length > 1)return !0;
        if (t = this.getTargetElementFromEventTarget(e.target), i = e.targetTouches[0], o) {
            if ((s = window.getSelection()).rangeCount && !s.isCollapsed)return !0;
            if (!n) {
                if (i.identifier && i.identifier === this.lastTouchIdentifier)return e.preventDefault(), !1;
                this.lastTouchIdentifier = i.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = i.pageX, this.touchStartY = i.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, e.prototype.touchHasMoved = function (e) {
        var t = e.changedTouches[0], i = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i
    }, e.prototype.onTouchMove = function (e) {
        return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0)
    }, e.prototype.findControl = function (e) {
        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, e.prototype.onTouchEnd = function (e) {
        var t, r, a, l, c, d = this.targetElement;
        if (!this.trackingClick)return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0, !0;
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout)return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, r = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, s && (c = e.changedTouches[0], (d = document.elementFromPoint(c.pageX - window.pageXOffset, c.pageY - window.pageYOffset) || d).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (a = d.tagName.toLowerCase())) {
            if (t = this.findControl(d)) {
                if (this.focus(d), i)return !1;
                d = t
            }
        } else if (this.needsFocus(d))return e.timeStamp - r > 100 || o && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(d), this.sendClick(d, e), o && "select" === a || (this.targetElement = null, e.preventDefault()), !1);
        return !(!o || n || !(l = d.fastClickScrollParent) || l.fastClickLastScrollTop === l.scrollTop) || (this.needsClick(d) || (e.preventDefault(), this.sendClick(d, e)), !1)
    }, e.prototype.onTouchCancel = function () {
        this.trackingClick = !1, this.targetElement = null
    }, e.prototype.onMouse = function (e) {
        return !this.targetElement || (!!e.forwardedTouchEvent || (!e.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1))))
    }, e.prototype.onClick = function (e) {
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail || ((t = this.onMouse(e)) || (this.targetElement = null), t)
    }, e.prototype.destroy = function () {
        var e = this.layer;
        i && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, e.notNeeded = function (e) {
        var t, o, n;
        if (void 0 === window.ontouchstart)return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!i)return !0;
            if (t = document.querySelector("meta[name=viewport]")) {
                if (-1 !== t.content.indexOf("user-scalable=no"))return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth)return !0
            }
        }
        if (r && (n = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] >= 10 && n[2] >= 3 && (t = document.querySelector("meta[name=viewport]"))) {
            if (-1 !== t.content.indexOf("user-scalable=no"))return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth)return !0
        }
        return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction || (!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (t = document.querySelector("meta[name=viewport]")) && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || "none" === e.style.touchAction || "manipulation" === e.style.touchAction)
    }, e.attach = function (t, i) {
        return new e(t, i)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return e
    }) : "undefined" != typeof module && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
}(), function (e) {
    var t, i, o = e.event;
    t = o.special.debouncedresize = {
        setup: function () {
            e(this).on("resize", t.handler)
        }, teardown: function () {
            e(this).off("resize", t.handler)
        }, handler: function (e, n) {
            var s = this, r = arguments, a = function () {
                e.type = "debouncedresize", o.dispatch.apply(s, r)
            };
            i && clearTimeout(i), n ? a() : i = setTimeout(a, t.threshold)
        }, threshold: 150
    }
}(jQuery), function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).enquire = e()
    }
}(function () {
    return function e(t, i, o) {
        function n(r, a) {
            if (!i[r]) {
                if (!t[r]) {
                    var l = "function" == typeof require && require;
                    if (!a && l)return l(r, !0);
                    if (s)return s(r, !0);
                    var c = new Error("Cannot find module '" + r + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var d = i[r] = {exports: {}};
                t[r][0].call(d.exports, function (e) {
                    var i = t[r][1][e];
                    return n(i || e)
                }, d, d.exports, e, t, i, o)
            }
            return i[r].exports
        }

        for (var s = "function" == typeof require && require, r = 0; r < o.length; r++)n(o[r]);
        return n
    }({
        1: [function (e, t, i) {
            function o(e, t) {
                this.query = e, this.isUnconditional = t, this.handlers = [], this.mql = window.matchMedia(e);
                var i = this;
                this.listener = function (e) {
                    i.mql = e.currentTarget || e, i.assess()
                }, this.mql.addListener(this.listener)
            }

            var n = e(3), s = e(4).each;
            o.prototype = {
                constuctor: o, addHandler: function (e) {
                    var t = new n(e);
                    this.handlers.push(t), this.matches() && t.on()
                }, removeHandler: function (e) {
                    var t = this.handlers;
                    s(t, function (i, o) {
                        if (i.equals(e))return i.destroy(), !t.splice(o, 1)
                    })
                }, matches: function () {
                    return this.mql.matches || this.isUnconditional
                }, clear: function () {
                    s(this.handlers, function (e) {
                        e.destroy()
                    }), this.mql.removeListener(this.listener), this.handlers.length = 0
                }, assess: function () {
                    var e = this.matches() ? "on" : "off";
                    s(this.handlers, function (t) {
                        t[e]()
                    })
                }
            }, t.exports = o
        }, {3: 3, 4: 4}], 2: [function (e, t, i) {
            function o() {
                if (!window.matchMedia)throw new Error("matchMedia not present, legacy browsers require a polyfill");
                this.queries = {}, this.browserIsIncapable = !window.matchMedia("only all").matches
            }

            var n = e(1), s = e(4), r = s.each, a = s.isFunction, l = s.isArray;
            o.prototype = {
                constructor: o, register: function (e, t, i) {
                    var o = this.queries, s = i && this.browserIsIncapable;
                    return o[e] || (o[e] = new n(e, s)), a(t) && (t = {match: t}), l(t) || (t = [t]), r(t, function (t) {
                        a(t) && (t = {match: t}), o[e].addHandler(t)
                    }), this
                }, unregister: function (e, t) {
                    var i = this.queries[e];
                    return i && (t ? i.removeHandler(t) : (i.clear(), delete this.queries[e])), this
                }
            }, t.exports = o
        }, {1: 1, 4: 4}], 3: [function (e, t, i) {
            function o(e) {
                this.options = e, !e.deferSetup && this.setup()
            }

            o.prototype = {
                constructor: o, setup: function () {
                    this.options.setup && this.options.setup(), this.initialised = !0
                }, on: function () {
                    !this.initialised && this.setup(), this.options.match && this.options.match()
                }, off: function () {
                    this.options.unmatch && this.options.unmatch()
                }, destroy: function () {
                    this.options.destroy ? this.options.destroy() : this.off()
                }, equals: function (e) {
                    return this.options === e || this.options.match === e
                }
            }, t.exports = o
        }, {}], 4: [function (e, t, i) {
            t.exports = {
                isFunction: function (e) {
                    return "function" == typeof e
                }, isArray: function (e) {
                    return "[object Array]" === Object.prototype.toString.apply(e)
                }, each: function (e, t) {
                    var i = 0, o = e.length;
                    for (i; i < o && !1 !== t(e[i], i); i++);
                }
            }
        }, {}], 5: [function (e, t, i) {
            var o = e(2);
            t.exports = new o
        }, {2: 2}]
    }, {}, [5])(5)
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function (e) {
    var t = -1, i = -1, o = function (e) {
        return parseFloat(e) || 0
    }, n = function (t) {
        var i = null, n = [];
        return e(t).each(function () {
            var t = e(this), s = t.offset().top - o(t.css("margin-top")), r = n.length > 0 ? n[n.length - 1] : null;
            null === r ? n.push(t) : Math.floor(Math.abs(i - s)) <= 1 ? n[n.length - 1] = r.add(t) : n.push(t), i = s
        }), n
    }, s = function (t) {
        var i = {byRow: !0, property: "height", target: null, remove: !1};
        return "object" == typeof t ? e.extend(i, t) : ("boolean" == typeof t ? i.byRow = t : "remove" === t && (i.remove = !0), i)
    }, r = e.fn.matchHeight = function (t) {
        var i = s(t);
        if (i.remove) {
            var o = this;
            return this.css(i.property, ""), e.each(r._groups, function (e, t) {
                t.elements = t.elements.not(o)
            }), this
        }
        return this.length <= 1 && !i.target ? this : (r._groups.push({
            elements: this,
            options: i
        }), r._apply(this, i), this)
    };
    r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._rows = n, r._parse = o, r._parseOptions = s, r._apply = function (t, i) {
        var a = s(i), l = e(t), c = [l], d = e(window).scrollTop(), p = e("html").outerHeight(!0),
            u = l.parents().filter(":hidden");
        return u.each(function () {
            var t = e(this);
            t.data("style-cache", t.attr("style"))
        }), u.css("display", "block"), a.byRow && !a.target && (l.each(function () {
            var t = e(this), i = t.css("display");
            "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block"), t.data("style-cache", t.attr("style")), t.css({
                display: i,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            })
        }), c = n(l), l.each(function () {
            var t = e(this);
            t.attr("style", t.data("style-cache") || "")
        })), e.each(c, function (t, i) {
            var n = e(i), s = 0;
            if (a.target) s = a.target.outerHeight(!1); else {
                if (a.byRow && n.length <= 1)return void n.css(a.property, "");
                n.each(function () {
                    var t = e(this), i = t.attr("style"), o = t.css("display");
                    "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block");
                    var n = {display: o};
                    n[a.property] = "", t.css(n), t.outerHeight(!1) > s && (s = t.outerHeight(!1)), i ? t.attr("style", i) : t.css("display", "")
                })
            }
            n.each(function () {
                var t = e(this), i = 0;
                a.target && t.is(a.target) || ("border-box" !== t.css("box-sizing") && (i += o(t.css("border-top-width")) + o(t.css("border-bottom-width")), i += o(t.css("padding-top")) + o(t.css("padding-bottom"))), t.css(a.property, s - i + "px"))
            })
        }), u.each(function () {
            var t = e(this);
            t.attr("style", t.data("style-cache") || null)
        }), r._maintainScroll && e(window).scrollTop(d / p * e("html").outerHeight(!0)), this
    }, r._applyDataApi = function () {
        var t = {};
        e("[data-match-height], [data-mh]").each(function () {
            var i = e(this), o = i.attr("data-mh") || i.attr("data-match-height");
            t[o] = o in t ? t[o].add(i) : i
        }), e.each(t, function () {
            this.matchHeight(!0)
        })
    };
    var a = function (t) {
        r._beforeUpdate && r._beforeUpdate(t, r._groups), e.each(r._groups, function () {
            r._apply(this.elements, this.options)
        }), r._afterUpdate && r._afterUpdate(t, r._groups)
    };
    r._update = function (o, n) {
        if (n && "resize" === n.type) {
            var s = e(window).width();
            if (s === t)return;
            t = s
        }
        o ? -1 === i && (i = setTimeout(function () {
                a(n), i = -1
            }, r._throttle)) : a(n)
    }, e(r._applyDataApi);
    var l = e.fn.on ? "on" : "bind";
    e(window)[l]("load", function (e) {
        r._update(!1, e)
    }), e(window)[l]("resize orientationchange", function (e) {
        r._update(!0, e)
    })
}), function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, o = i[e] = i[e] || [];
            return -1 == o.indexOf(t) && o.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[e] = i[e] || {})[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var o = i.indexOf(t);
            return -1 != o && i.splice(o, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var o = 0, n = i[o];
            t = t || [];
            for (var s = this._onceEvents && this._onceEvents[e]; n;) {
                var r = s && s[n];
                r && (this.off(e, n), delete s[n]), n.apply(this, t), n = i[o += r ? 0 : 1]
            }
            return this
        }
    }, t.allOff = t.removeAllListeners = function () {
        delete this._events, delete this._onceEvents
    }, e
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
        for (var i in t)e[i] = t[i];
        return e
    }

    function o(e) {
        var t = [];
        if (Array.isArray(e)) t = e; else if ("number" == typeof e.length)for (var i = 0; i < e.length; i++)t.push(e[i]); else t.push(e);
        return t
    }

    function n(e, t, s) {
        if (!(this instanceof n))return new n(e, t, s);
        "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? s = t : i(this.options, t), s && this.on("always", s), this.getImages(), a && (this.jqDeferred = new a.Deferred), setTimeout(function () {
            this.check()
        }.bind(this))
    }

    function s(e) {
        this.img = e
    }

    function r(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }

    var a = e.jQuery, l = e.console;
    n.prototype = Object.create(t.prototype), n.prototype.options = {}, n.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, n.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && c[t]) {
            for (var i = e.querySelectorAll("img"), o = 0; o < i.length; o++) {
                var n = i[o];
                this.addImage(n)
            }
            if ("string" == typeof this.options.background) {
                var s = e.querySelectorAll(this.options.background);
                for (o = 0; o < s.length; o++) {
                    var r = s[o];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    };
    var c = {1: !0, 9: !0, 11: !0};
    return n.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)for (var i = /url\((['"])?(.*?)\1\)/gi, o = i.exec(t.backgroundImage); null !== o;) {
            var n = o && o[2];
            n && this.addBackground(n, e), o = i.exec(t.backgroundImage)
        }
    }, n.prototype.addImage = function (e) {
        var t = new s(e);
        this.images.push(t)
    }, n.prototype.addBackground = function (e, t) {
        var i = new r(e, t);
        this.images.push(i)
    }, n.prototype.check = function () {
        function e(e, i, o) {
            setTimeout(function () {
                t.progress(e, i, o)
            })
        }

        var t = this;
        this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function (t) {
            t.once("progress", e), t.check()
        }) : this.complete()
    }, n.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, e, t)
    }, n.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, s.prototype = Object.create(t.prototype), s.prototype.check = function () {
        this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src)
    }, s.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, s.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, s.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, s.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, s.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, s.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype = Object.create(s.prototype), r.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, r.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, n.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery) && ((a = t).fn.imagesLoaded = function (e, t) {
            return new n(this, e, t).jqDeferred.promise(a(this))
        })
    }, n.makeJQueryPlugin(), n
}), function (e) {
    var t = !1;
    if ("function" == typeof define && define.amd && (define(e), t = !0), "object" == typeof exports && (module.exports = e(), t = !0), !t) {
        var i = window.Cookies, o = window.Cookies = e();
        o.noConflict = function () {
            return window.Cookies = i, o
        }
    }
}(function () {
    function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var i = arguments[e];
            for (var o in i)t[o] = i[o]
        }
        return t
    }

    function t(i) {
        function o(t, n, s) {
            var r;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if ("number" == typeof(s = e({path: "/"}, o.defaults, s)).expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * s.expires), s.expires = a
                    }
                    s.expires = s.expires ? s.expires.toUTCString() : "";
                    try {
                        r = JSON.stringify(n), /^[\{\[]/.test(r) && (n = r)
                    } catch (e) {
                    }
                    n = i.write ? i.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var l = "";
                    for (var c in s)s[c] && (l += "; " + c, !0 !== s[c] && (l += "=" + s[c]));
                    return document.cookie = t + "=" + n + l
                }
                t || (r = {});
                for (var d = document.cookie ? document.cookie.split("; ") : [], p = /(%[0-9A-Z]{2})+/g, u = 0; u < d.length; u++) {
                    var f = d[u].split("="), h = f.slice(1).join("=");
                    '"' === h.charAt(0) && (h = h.slice(1, -1));
                    try {
                        var m = f[0].replace(p, decodeURIComponent);
                        if (h = i.read ? i.read(h, m) : i(h, m) || h.replace(p, decodeURIComponent), this.json)try {
                            h = JSON.parse(h)
                        } catch (e) {
                        }
                        if (t === m) {
                            r = h;
                            break
                        }
                        t || (r[m] = h)
                    } catch (e) {
                    }
                }
                return r
            }
        }

        return o.set = o, o.get = function (e) {
            return o.call(o, e)
        }, o.getJSON = function () {
            return o.apply({json: !0}, [].slice.call(arguments))
        }, o.defaults = {}, o.remove = function (t, i) {
            o(t, "", e(i, {expires: -1}))
        }, o.withConverter = t, o
    }

    return t(function () {
    })
}), function (e, t) {
    "function" == typeof define && define.amd ? define([], function () {
        return e.svg4everybody = t()
    }) : "object" == typeof module && module.exports ? module.exports = t() : e.svg4everybody = t()
}(this, function () {
    function e(e, t, i) {
        if (i) {
            var o = document.createDocumentFragment(), n = !t.hasAttribute("viewBox") && i.getAttribute("viewBox");
            n && t.setAttribute("viewBox", n);
            for (var s = i.cloneNode(!0); s.childNodes.length;)o.appendChild(s.firstChild);
            e.appendChild(o)
        }
    }

    function t(t) {
        t.onreadystatechange = function () {
            if (4 === t.readyState) {
                var i = t._cachedDocument;
                i || (i = t._cachedDocument = document.implementation.createHTMLDocument(""), i.body.innerHTML = t.responseText, t._cachedTarget = {}), t._embeds.splice(0).map(function (o) {
                    var n = t._cachedTarget[o.id];
                    n || (n = t._cachedTarget[o.id] = i.getElementById(o.id)), e(o.parent, o.svg, n)
                })
            }
        }, t.onreadystatechange()
    }

    function i(e) {
        for (var t = e; "svg" !== t.nodeName.toLowerCase() && (t = t.parentNode););
        return t
    }

    return function (o) {
        function n() {
            for (var o = 0; o < h.length;) {
                var a = h[o], l = a.parentNode, c = i(l), d = a.getAttribute("xlink:href") || a.getAttribute("href");
                if (!d && r.attributeName && (d = a.getAttribute(r.attributeName)), c && d) {
                    if (s)if (!r.validate || r.validate(d, c, a)) {
                        l.removeChild(a);
                        var p = d.split("#"), v = p.shift(), g = p.join("#");
                        if (v.length) {
                            var y = u[v];
                            y || ((y = u[v] = new XMLHttpRequest).open("GET", v), y.send(), y._embeds = []), y._embeds.push({
                                parent: l,
                                svg: c,
                                id: g
                            }), t(y)
                        } else e(l, c, document.getElementById(g))
                    } else++o, ++m
                } else++o
            }
            (!h.length || h.length - m > 0) && f(n, 67)
        }

        var s, r = Object(o), a = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, l = /\bAppleWebKit\/(\d+)\b/,
            c = /\bEdge\/12\.(\d+)\b/, d = /\bEdge\/.(\d+)\b/, p = window.top !== window.self;
        s = "polyfill" in r ? r.polyfill : a.test(navigator.userAgent) || (navigator.userAgent.match(c) || [])[1] < 10547 || (navigator.userAgent.match(l) || [])[1] < 537 || d.test(navigator.userAgent) && p;
        var u = {}, f = window.requestAnimationFrame || setTimeout, h = document.getElementsByTagName("use"), m = 0;
        s && n()
    }
}), function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (e) {
    var t, i, o, n, s, r, a = function () {
    }, l = !!window.jQuery, c = e(window), d = function (e, i) {
        t.ev.on("mfp" + e + ".mfp", i)
    }, p = function (t, i, o, n) {
        var s = document.createElement("div");
        return s.className = "mfp-" + t, o && (s.innerHTML = o), n ? i && i.appendChild(s) : (s = e(s), i && s.appendTo(i)), s
    }, u = function (i, o) {
        t.ev.triggerHandler("mfp" + i, o), t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(o) ? o : [o]))
    }, f = function (i) {
        return i === r && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), r = i), t.currTemplate.closeBtn
    }, h = function () {
        e.magnificPopup.instance || ((t = new a).init(), e.magnificPopup.instance = t)
    }, m = function () {
        var e = document.createElement("p").style, t = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== e.transition)return !0;
        for (; t.length;)if (t.pop() + "Transition" in e)return !0;
        return !1
    };
    a.prototype = {
        constructor: a, init: function () {
            var i = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(i), t.isIOS = /iphone|ipad|ipod/gi.test(i), t.supportsTransition = m(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = e(document), t.popupsCache = {}
        }, open: function (i) {
            var n;
            if (!1 === i.isObj) {
                t.items = i.items.toArray(), t.index = 0;
                var r, a = i.items;
                for (n = 0; n < a.length; n++)if ((r = a[n]).parsed && (r = r.el[0]), r === i.el[0]) {
                    t.index = n;
                    break
                }
            } else t.items = e.isArray(i.items) ? i.items : [i.items], t.index = i.index || 0;
            {
                if (!t.isOpen) {
                    t.types = [], s = "", i.mainEl && i.mainEl.length ? t.ev = i.mainEl.eq(0) : t.ev = o, i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, i), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = p("bg").on("click.mfp", function () {
                        t.close()
                    }), t.wrap = p("wrap").attr("tabindex", -1).on("click.mfp", function (e) {
                        t._checkIfClose(e.target) && t.close()
                    }), t.container = p("container", t.wrap)), t.contentContainer = p("content"), t.st.preloader && (t.preloader = p("preloader", t.container, t.st.tLoading));
                    var l = e.magnificPopup.modules;
                    for (n = 0; n < l.length; n++) {
                        var h = l[n];
                        h = h.charAt(0).toUpperCase() + h.slice(1), t["init" + h].call(t)
                    }
                    u("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (d("MarkupParse", function (e, t, i, o) {
                        i.close_replaceWith = f(o.type)
                    }), s += " mfp-close-btn-in") : t.wrap.append(f())), t.st.alignTop && (s += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                        overflow: t.st.overflowY,
                        overflowX: "hidden",
                        overflowY: t.st.overflowY
                    }) : t.wrap.css({
                        top: c.scrollTop(),
                        position: "absolute"
                    }), (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                        height: o.height(),
                        position: "absolute"
                    }), t.st.enableEscapeKey && o.on("keyup.mfp", function (e) {
                        27 === e.keyCode && t.close()
                    }), c.on("resize.mfp", function () {
                        t.updateSize()
                    }), t.st.closeOnContentClick || (s += " mfp-auto-cursor"), s && t.wrap.addClass(s);
                    var m = t.wH = c.height(), v = {};
                    if (t.fixedContentPos && t._hasScrollBar(m)) {
                        var g = t._getScrollbarSize();
                        g && (v.marginRight = g)
                    }
                    t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : v.overflow = "hidden");
                    var y = t.st.mainClass;
                    return t.isIE7 && (y += " mfp-ie7"), y && t._addClassToMFP(y), t.updateItemHTML(), u("BuildControls"), e("html").css(v), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function () {
                        t.content ? (t._addClassToMFP("mfp-ready"), t._setFocus()) : t.bgOverlay.addClass("mfp-ready"), o.on("focusin.mfp", t._onFocusIn)
                    }, 16), t.isOpen = !0, t.updateSize(m), u("Open"), i
                }
                t.updateItemHTML()
            }
        }, close: function () {
            t.isOpen && (u("BeforeClose"), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP("mfp-removing"), setTimeout(function () {
                t._close()
            }, t.st.removalDelay)) : t._close())
        }, _close: function () {
            u("Close");
            var i = "mfp-removing mfp-ready ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos) {
                var n = {marginRight: ""};
                t.isIE7 ? e("body, html").css("overflow", "") : n.overflow = "", e("html").css(n)
            }
            o.off("keyup.mfp focusin.mfp"), t.ev.off(".mfp"), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, u("AfterClose")
        }, updateSize: function (e) {
            if (t.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth, o = window.innerHeight * i;
                t.wrap.css("height", o), t.wH = o
            } else t.wH = e || c.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), u("Resize")
        }, updateItemHTML: function () {
            var i = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
            var o = i.type;
            if (u("BeforeChange", [t.currItem ? t.currItem.type : "", o]), t.currItem = i, !t.currTemplate[o]) {
                var s = !!t.st[o] && t.st[o].markup;
                u("FirstMarkupParse", s), t.currTemplate[o] = !s || e(s)
            }
            n && n !== i.type && t.container.removeClass("mfp-" + n + "-holder");
            var r = t["get" + o.charAt(0).toUpperCase() + o.slice(1)](i, t.currTemplate[o]);
            t.appendContent(r, o), i.preloaded = !0, u("Change", i), n = i.type, t.container.prepend(t.contentContainer), u("AfterChange")
        }, appendContent: function (e, i) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[i] ? t.content.find(".mfp-close").length || t.content.append(f()) : t.content = e : t.content = "", u("BeforeAppend"), t.container.addClass("mfp-" + i + "-holder"), t.contentContainer.append(t.content)
        }, parseEl: function (i) {
            var o, n = t.items[i];
            if (n.tagName ? n = {el: e(n)} : (o = n.type, n = {data: n, src: n.src}), n.el) {
                for (var s = t.types, r = 0; r < s.length; r++)if (n.el.hasClass("mfp-" + s[r])) {
                    o = s[r];
                    break
                }
                n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
            }
            return n.type = o || t.st.type || "inline", n.index = i, n.parsed = !0, t.items[i] = n, u("ElementParse", n), t.items[i]
        }, addGroup: function (e, i) {
            var o = function (o) {
                o.mfpEl = this, t._openClick(o, e, i)
            };
            i || (i = {});
            var n = "click.magnificPopup";
            i.mainEl = e, i.items ? (i.isObj = !0, e.off(n).on(n, o)) : (i.isObj = !1, i.delegate ? e.off(n).on(n, i.delegate, o) : (i.items = e, e.off(n).on(n, o)))
        }, _openClick: function (i, o, n) {
            if ((void 0 !== n.midClick ? n.midClick : e.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var s = void 0 !== n.disableOn ? n.disableOn : e.magnificPopup.defaults.disableOn;
                if (s)if (e.isFunction(s)) {
                    if (!s.call(t))return !0
                } else if (c.width() < s)return !0;
                i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), n.el = e(i.mfpEl), n.delegate && (n.items = o.find(n.delegate)), t.open(n)
            }
        }, updateStatus: function (e, o) {
            if (t.preloader) {
                i !== e && t.container.removeClass("mfp-s-" + i), o || "loading" !== e || (o = t.st.tLoading);
                var n = {status: e, text: o};
                u("UpdateStatus", n), e = n.status, o = n.text, t.preloader.html(o), t.preloader.find("a").on("click", function (e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), i = e
            }
        }, _checkIfClose: function (i) {
            if (!e(i).hasClass("mfp-prevent-close")) {
                var o = t.st.closeOnContentClick, n = t.st.closeOnBgClick;
                if (o && n)return !0;
                if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0])return !0;
                if (i === t.content[0] || e.contains(t.content[0], i)) {
                    if (o)return !0
                } else if (n && e.contains(document, i))return !0;
                return !1
            }
        }, _addClassToMFP: function (e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        }, _removeClassFromMFP: function (e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        }, _hasScrollBar: function (e) {
            return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || c.height())
        }, _setFocus: function () {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        }, _onFocusIn: function (i) {
            if (i.target !== t.wrap[0] && !e.contains(t.wrap[0], i.target))return t._setFocus(), !1
        }, _parseMarkup: function (t, i, o) {
            var n;
            o.data && (i = e.extend(o.data, i)), u("MarkupParse", [t, i, o]), e.each(i, function (i, o) {
                if (void 0 === o || !1 === o)return !0;
                if ((n = i.split("_")).length > 1) {
                    var s = t.find(".mfp-" + n[0]);
                    if (s.length > 0) {
                        var r = n[1];
                        "replaceWith" === r ? s[0] !== o[0] && s.replaceWith(o) : "img" === r ? s.is("img") ? s.attr("src", o) : s.replaceWith(e("<img>").attr("src", o).attr("class", s.attr("class"))) : s.attr(n[1], o)
                    }
                } else t.find(".mfp-" + i).html(o)
            })
        }, _getScrollbarSize: function () {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: a.prototype,
        modules: [],
        open: function (t, i) {
            return h(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
        },
        close: function () {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function (t, i) {
            i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, e.fn.magnificPopup = function (i) {
        h();
        var o = e(this);
        if ("string" == typeof i)if ("open" === i) {
            var n, s = l ? o.data("magnificPopup") : o[0].magnificPopup, r = parseInt(arguments[1], 10) || 0;
            s.items ? n = s.items[r] : (n = o, s.delegate && (n = n.find(s.delegate)), n = n.eq(r)), t._openClick({mfpEl: n}, o, s)
        } else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1)); else i = e.extend(!0, {}, i), l ? o.data("magnificPopup", i) : o[0].magnificPopup = i, t.addGroup(o, i);
        return o
    };
    var v, g, y, b = function () {
        y && (g.after(y.addClass(v)).detach(), y = null)
    };
    e.magnificPopup.registerModule("inline", {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        }, proto: {
            initInline: function () {
                t.types.push("inline"), d("Close.inline", function () {
                    b()
                })
            }, getInline: function (i, o) {
                if (b(), i.src) {
                    var n = t.st.inline, s = e(i.src);
                    if (s.length) {
                        var r = s[0].parentNode;
                        r && r.tagName && (g || (v = n.hiddenClass, g = p(v), v = "mfp-" + v), y = s.after(g).detach().removeClass(v)), t.updateStatus("ready")
                    } else t.updateStatus("error", n.tNotFound), s = e("<div>");
                    return i.inlineElement = s, s
                }
                return t.updateStatus("ready"), t._parseMarkup(o, {}, i), o
            }
        }
    });
    var w, k = function () {
        w && e(document.body).removeClass(w)
    }, x = function () {
        k(), t.req && t.req.abort()
    };
    e.magnificPopup.registerModule("ajax", {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                t.types.push("ajax"), w = t.st.ajax.cursor, d("Close.ajax", x), d("BeforeChange.ajax", x)
            }, getAjax: function (i) {
                w && e(document.body).addClass(w), t.updateStatus("loading");
                var o = e.extend({
                    url: i.src, success: function (o, n, s) {
                        var r = {data: o, xhr: s};
                        u("ParseAjax", r), t.appendContent(e(r.data), "ajax"), i.finished = !0, k(), t._setFocus(), setTimeout(function () {
                            t.wrap.addClass("mfp-ready")
                        }, 16), t.updateStatus("ready"), u("AjaxContentAdded")
                    }, error: function () {
                        k(), i.finished = i.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(o), ""
            }
        }
    });
    var S, T = function (i) {
        if (i.data && void 0 !== i.data.title)return i.data.title;
        var o = t.st.image.titleSrc;
        if (o) {
            if (e.isFunction(o))return o.call(t, i);
            if (i.el)return i.el.attr(o) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var i = t.st.image, o = ".image";
                t.types.push("image"), d("Open" + o, function () {
                    "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
                }), d("Close" + o, function () {
                    i.cursor && e(document.body).removeClass(i.cursor), c.off("resize.mfp")
                }), d("Resize" + o, t.resizeImage), t.isLowIE && d("AfterChange", t.resizeImage)
            }, resizeImage: function () {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var i = 0;
                    t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - i)
                }
            }, _onImageHasSize: function (e) {
                e.img && (e.hasSize = !0, S && clearInterval(S), e.isCheckingImgSize = !1, u("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            }, findImageSize: function (e) {
                var i = 0, o = e.img[0], n = function (s) {
                    S && clearInterval(S), S = setInterval(function () {
                        o.naturalWidth > 0 ? t._onImageHasSize(e) : (i > 200 && clearInterval(S), 3 === ++i ? n(10) : 40 === i ? n(50) : 100 === i && n(500))
                    }, s)
                };
                n(1)
            }, getImage: function (i, o) {
                var n = 0, s = function () {
                    i && (i.img[0].complete ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, u("ImageLoadComplete")) : ++n < 200 ? setTimeout(s, 100) : r())
                }, r = function () {
                    i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                }, a = t.st.image, l = o.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = e(c).on("load.mfploader", s).on("error.mfploader", r), c.src = i.src, l.is("img") && (i.img = i.img.clone()), (c = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
                }
                return t._parseMarkup(o, {
                    title: T(i),
                    img_replaceWith: i.img
                }, i), t.resizeImage(), i.hasSize ? (S && clearInterval(S), i.loadError ? (o.addClass("mfp-loading"), t.updateStatus("error", a.tError.replace("%url%", i.src))) : (o.removeClass("mfp-loading"), t.updateStatus("ready")), o) : (t.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, o.addClass("mfp-loading"), t.findImageSize(i)), o)
            }
        }
    });
    var C, _ = function () {
        return void 0 === C && (C = void 0 !== document.createElement("p").style.MozTransform), C
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (e) {
                return e.is("img") ? e : e.find("img")
            }
        }, proto: {
            initZoom: function () {
                var e, i = t.st.zoom, o = ".zoom";
                if (i.enabled && t.supportsTransition) {
                    var n, s, r = i.duration, a = function (e) {
                        var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            o = "all " + i.duration / 1e3 + "s " + i.easing, n = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            }, s = "transition";
                        return n["-webkit-" + s] = n["-moz-" + s] = n["-o-" + s] = n[s] = o, t.css(n), t
                    }, l = function () {
                        t.content.css("visibility", "visible")
                    };
                    d("BuildControls" + o, function () {
                        if (t._allowZoom()) {
                            if (clearTimeout(n), t.content.css("visibility", "hidden"), !(e = t._getItemToZoom()))return void l();
                            (s = a(e)).css(t._getOffset()), t.wrap.append(s), n = setTimeout(function () {
                                s.css(t._getOffset(!0)), n = setTimeout(function () {
                                    l(), setTimeout(function () {
                                        s.remove(), e = s = null, u("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }), d("BeforeClose" + o, function () {
                        if (t._allowZoom()) {
                            if (clearTimeout(n), t.st.removalDelay = r, !e) {
                                if (!(e = t._getItemToZoom()))return;
                                s = a(e)
                            }
                            s.css(t._getOffset(!0)), t.wrap.append(s), t.content.css("visibility", "hidden"), setTimeout(function () {
                                s.css(t._getOffset())
                            }, 16)
                        }
                    }), d("Close" + o, function () {
                        t._allowZoom() && (l(), s && s.remove(), e = null)
                    })
                }
            }, _allowZoom: function () {
                return "image" === t.currItem.type
            }, _getItemToZoom: function () {
                return !!t.currItem.hasSize && t.currItem.img
            }, _getOffset: function (i) {
                var o, n = (o = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
                    s = parseInt(o.css("padding-top"), 10), r = parseInt(o.css("padding-bottom"), 10);
                n.top -= e(window).scrollTop() - s;
                var a = {width: o.width(), height: (l ? o.innerHeight() : o[0].offsetHeight) - r - s};
                return _() ? a["-moz-transform"] = a.transform = "translate(" + n.left + "px," + n.top + "px)" : (a.left = n.left, a.top = n.top), a
            }
        }
    });
    var E = function (e) {
        if (t.currTemplate.iframe) {
            var i = t.currTemplate.iframe.find("iframe");
            i.length && (e || (i[0].src = "//about:blank"), t.isIE8 && i.css("display", e ? "block" : "none"))
        }
    };
    e.magnificPopup.registerModule("iframe", {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                t.types.push("iframe"), d("BeforeChange", function (e, t, i) {
                    t !== i && ("iframe" === t ? E() : "iframe" === i && E(!0))
                }), d("Close.iframe", function () {
                    E()
                })
            }, getIframe: function (i, o) {
                var n = i.src, s = t.st.iframe;
                e.each(s.patterns, function () {
                    if (n.indexOf(this.index) > -1)return this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1
                });
                var r = {};
                return s.srcAction && (r[s.srcAction] = n), t._parseMarkup(o, r, i), t.updateStatus("ready"), o
            }
        }
    });
    var A = function (e) {
        var i = t.items.length;
        return e > i - 1 ? e - i : e < 0 ? i + e : e
    }, $ = function (e, t, i) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
    };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var i = t.st.gallery, n = ".mfp-gallery";
                if (t.direction = !0, !i || !i.enabled)return !1;
                s += " mfp-gallery", d("Open" + n, function () {
                    i.navigateByImgClick && t.wrap.on("click" + n, ".mfp-img", function () {
                        if (t.items.length > 1)return t.next(), !1
                    }), o.on("keydown" + n, function (e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), d("UpdateStatus" + n, function (e, i) {
                    i.text && (i.text = $(i.text, t.currItem.index, t.items.length))
                }), d("MarkupParse" + n, function (e, o, n, s) {
                    var r = t.items.length;
                    n.counter = r > 1 ? $(i.tCounter, s.index, r) : ""
                }), d("BuildControls" + n, function () {
                    if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                        var o = i.arrowMarkup,
                            n = t.arrowLeft = e(o.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass("mfp-prevent-close"),
                            s = t.arrowRight = e(o.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass("mfp-prevent-close");
                        n.click(function () {
                            t.prev()
                        }), s.click(function () {
                            t.next()
                        }), t.container.append(n.add(s))
                    }
                }), d("Change" + n, function () {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function () {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), d("Close" + n, function () {
                    o.off(n), t.wrap.off("click" + n), t.arrowRight = t.arrowLeft = null
                })
            }, next: function () {
                t.direction = !0, t.index = A(t.index + 1), t.updateItemHTML()
            }, prev: function () {
                t.direction = !1, t.index = A(t.index - 1), t.updateItemHTML()
            }, goTo: function (e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            }, preloadNearbyImages: function () {
                var e, i = t.st.gallery.preload, o = Math.min(i[0], t.items.length), n = Math.min(i[1], t.items.length);
                for (e = 1; e <= (t.direction ? n : o); e++)t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? o : n); e++)t._preloadItem(t.index - e)
            }, _preloadItem: function (i) {
                if (i = A(i), !t.items[i].preloaded) {
                    var o = t.items[i];
                    o.parsed || (o = t.parseEl(i)), u("LazyLoad", o), "image" === o.type && (o.img = e('<img class="mfp-img" />').on("load.mfploader", function () {
                        o.hasSize = !0
                    }).on("error.mfploader", function () {
                        o.hasSize = !0, o.loadError = !0, u("LazyLoadError", o)
                    }).attr("src", o.src)), o.preloaded = !0
                }
            }
        }
    });
    e.magnificPopup.registerModule("retina", {
        options: {
            replaceSrc: function (e) {
                return e.src.replace(/\.\w+$/, function (e) {
                    return "@2x" + e
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina, i = e.ratio;
                    (i = isNaN(i) ? i() : i) > 1 && (d("ImageHasSize.retina", function (e, t) {
                        t.img.css({"max-width": t.img[0].naturalWidth / i, width: "100%"})
                    }), d("ElementParse.retina", function (t, o) {
                        o.src = e.replaceSrc(o, i)
                    }))
                }
            }
        }
    }), h()
});
var objectFitImages = function () {
    "use strict";
    function e(e, t) {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + e + "' height='" + t + "'%3E%3C/svg%3E"
    }

    function t(e) {
        if (e.srcset && !h && window.picturefill) {
            var t = window.picturefill._;
            e[t.ns] && e[t.ns].evaled || t.fillImg(e, {reselect: !0}), e[t.ns].curSrc || (e[t.ns].supported = !1, t.fillImg(e, {reselect: !0})), e.currentSrc = e[t.ns].curSrc || e.src
        }
    }

    function i(e) {
        for (var t, i = getComputedStyle(e).fontFamily, o = {}; null !== (t = c.exec(i));)o[t[1]] = t[2];
        return o
    }

    function o(t, i, o) {
        var n = e(i || 1, o || 0);
        m.call(t, "src") !== n && v.call(t, "src", n)
    }

    function n(e, t) {
        e.naturalWidth ? t(e) : setTimeout(n, 100, e, t)
    }

    function s(e) {
        var s = i(e), a = e[l];
        if (s["object-fit"] = s["object-fit"] || "fill", !a.img) {
            if ("fill" === s["object-fit"])return;
            if (!a.skipTest && p && !s["object-position"])return
        }
        if (!a.img) {
            a.img = new Image(e.width, e.height), a.img.srcset = m.call(e, "data-ofi-srcset") || e.srcset, a.img.src = m.call(e, "data-ofi-src") || e.src, v.call(e, "data-ofi-src", e.src), e.srcset && v.call(e, "data-ofi-srcset", e.srcset), o(e, e.naturalWidth || e.width, e.naturalHeight || e.height), e.srcset && (e.srcset = "");
            try {
                r(e)
            } catch (e) {
                window.console && console.warn("https://bit.ly/ofi-old-browser")
            }
        }
        t(a.img), e.style.backgroundImage = 'url("' + (a.img.currentSrc || a.img.src).replace(/"/g, '\\"') + '")', e.style.backgroundPosition = s["object-position"] || "center", e.style.backgroundRepeat = "no-repeat", e.style.backgroundOrigin = "content-box", /scale-down/.test(s["object-fit"]) ? n(a.img, function () {
            a.img.naturalWidth > e.width || a.img.naturalHeight > e.height ? e.style.backgroundSize = "contain" : e.style.backgroundSize = "auto"
        }) : e.style.backgroundSize = s["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), n(a.img, function (t) {
            o(e, t.naturalWidth, t.naturalHeight)
        })
    }

    function r(e) {
        var t = {
            get: function (t) {
                return e[l].img[t || "src"]
            }, set: function (t, i) {
                return e[l].img[i || "src"] = t, v.call(e, "data-ofi-" + i, t), s(e), t
            }
        };
        Object.defineProperty(e, "src", t), Object.defineProperty(e, "currentSrc", {
            get: function () {
                return t.get("currentSrc")
            }
        }), Object.defineProperty(e, "srcset", {
            get: function () {
                return t.get("srcset")
            }, set: function (e) {
                return t.set(e, "srcset")
            }
        })
    }

    function a(e, t) {
        var i = !g && !e;
        if (t = t || {}, e = e || "img", u && !t.skipTest || !f)return !1;
        "img" === e ? e = document.getElementsByTagName("img") : "string" == typeof e ? e = document.querySelectorAll(e) : "length" in e || (e = [e]);
        for (var o = 0; o < e.length; o++)e[o][l] = e[o][l] || {skipTest: t.skipTest}, s(e[o]);
        i && (document.body.addEventListener("load", function (e) {
            "IMG" === e.target.tagName && a(e.target, {skipTest: t.skipTest})
        }, !0), g = !0, e = "img"), t.watchMQ && window.addEventListener("resize", a.bind(null, e, {skipTest: t.skipTest}))
    }

    var l = "bfred-it:object-fit-images", c = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
        d = "undefined" == typeof Image ? {style: {"object-position": 1}} : new Image, p = "object-fit" in d.style,
        u = "object-position" in d.style, f = "background-size" in d.style, h = "string" == typeof d.currentSrc,
        m = d.getAttribute, v = d.setAttribute, g = !1;
    return a.supportsObjectFit = p, a.supportsObjectPosition = u, function () {
        function e(e, t) {
            return e[l] && e[l].img && ("src" === t || "srcset" === t) ? e[l].img : e
        }

        u || (HTMLImageElement.prototype.getAttribute = function (t) {
            return m.call(e(this, t), t)
        }, HTMLImageElement.prototype.setAttribute = function (t, i) {
            return v.call(e(this, t), t, String(i))
        })
    }(), a
}();
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function () {
    return function (e) {
        function t(o) {
            if (i[o])return i[o].exports;
            var n = i[o] = {exports: {}, id: o, loaded: !1};
            return e[o].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
        }

        var i = {};
        return t.m = e, t.c = i, t.p = "dist/", t(0)
    }([function (e, t, i) {
        "use strict";
        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        var n = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var i = arguments[t];
                        for (var o in i)Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o])
                    }
                    return e
                }, s = o((o(i(1)), i(6))), r = o(i(7)), a = o(i(8)), l = o(i(9)), c = o(i(10)), d = o(i(11)), p = o(i(14)),
            u = [], f = !1, h = document.all && !window.atob, m = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                startEvent: "DOMContentLoaded"
            }, v = function () {
                if (arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && (f = !0), f)return u = (0, d.default)(u, m), (0, c.default)(u, m.once), u
            }, g = function () {
                u = (0, p.default)(), v()
            }, y = function () {
                u.forEach(function (e, t) {
                    e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
                })
            }, b = function (e) {
                return !0 === e || "mobile" === e && l.default.mobile() || "phone" === e && l.default.phone() || "tablet" === e && l.default.tablet() || "function" == typeof e && !0 === e()
            };
        e.exports = {
            init: function (e) {
                return m = n(m, e), u = (0, p.default)(), b(m.disable) || h ? y() : (document.querySelector("body").setAttribute("data-aos-easing", m.easing), document.querySelector("body").setAttribute("data-aos-duration", m.duration), document.querySelector("body").setAttribute("data-aos-delay", m.delay), "DOMContentLoaded" === m.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? v(!0) : "load" === m.startEvent ? window.addEventListener(m.startEvent, function () {
                    v(!0)
                }) : document.addEventListener(m.startEvent, function () {
                    v(!0)
                }), window.addEventListener("resize", (0, r.default)(v, 50, !0)), window.addEventListener("orientationchange", (0, r.default)(v, 50, !0)), window.addEventListener("scroll", (0, s.default)(function () {
                    (0, c.default)(u, m.once)
                }, 99)), document.addEventListener("DOMNodeRemoved", function (e) {
                    var t = e.target;
                    t && 1 === t.nodeType && t.hasAttribute && t.hasAttribute("data-aos") && (0, r.default)(g, 50, !0)
                }), (0, a.default)("[data-aos]", g), u)
            }, refresh: v, refreshHard: g
        }
    }, function (e, t) {
    }, , , , , function (e, t) {
        (function (t) {
            "use strict";
            function i(e, t, i) {
                function n(t) {
                    var i = f, o = h;
                    return f = h = void 0, b = t, v = e.apply(o, i)
                }

                function s(e) {
                    return b = e, g = setTimeout(d, t), S ? n(e) : v
                }

                function a(e) {
                    var i = e - b, o = t - (e - y);
                    return T ? k(o, m - i) : o
                }

                function c(e) {
                    var i = e - y, o = e - b;
                    return void 0 === y || i >= t || i < 0 || T && o >= m
                }

                function d() {
                    var e = x();
                    return c(e) ? p(e) : void(g = setTimeout(d, a(e)))
                }

                function p(e) {
                    return g = void 0, C && f ? n(e) : (f = h = void 0, v)
                }

                function u() {
                    var e = x(), i = c(e);
                    if (f = arguments, h = this, y = e, i) {
                        if (void 0 === g)return s(y);
                        if (T)return g = setTimeout(d, t), n(y)
                    }
                    return void 0 === g && (g = setTimeout(d, t)), v
                }

                var f, h, m, v, g, y, b = 0, S = !1, T = !1, C = !0;
                if ("function" != typeof e)throw new TypeError(l);
                return t = r(t) || 0, o(i) && (S = !!i.leading, T = "maxWait" in i, m = T ? w(r(i.maxWait) || 0, t) : m, C = "trailing" in i ? !!i.trailing : C), u.cancel = function () {
                    void 0 !== g && clearTimeout(g), b = 0, f = y = h = g = void 0
                }, u.flush = function () {
                    return void 0 === g ? v : p(x())
                }, u
            }

            function o(e) {
                var t = void 0 === e ? "undefined" : a(e);
                return !!e && ("object" == t || "function" == t)
            }

            function n(e) {
                return !!e && "object" == (void 0 === e ? "undefined" : a(e))
            }

            function s(e) {
                return "symbol" == (void 0 === e ? "undefined" : a(e)) || n(e) && b.call(e) == d
            }

            function r(e) {
                if ("number" == typeof e)return e;
                if (s(e))return c;
                if (o(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = o(t) ? t + "" : t
                }
                if ("string" != typeof e)return 0 === e ? e : +e;
                e = e.replace(p, "");
                var i = f.test(e);
                return i || h.test(e) ? m(e.slice(2), i ? 2 : 8) : u.test(e) ? c : +e
            }

            var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, l = "Expected a function", c = NaN, d = "[object Symbol]", p = /^\s+|\s+$/g, u = /^[-+]0x[0-9a-f]+$/i,
                f = /^0b[01]+$/i, h = /^0o[0-7]+$/i, m = parseInt,
                v = "object" == (void 0 === t ? "undefined" : a(t)) && t && t.Object === Object && t,
                g = "object" == ("undefined" == typeof self ? "undefined" : a(self)) && self && self.Object === Object && self,
                y = v || g || Function("return this")(), b = Object.prototype.toString, w = Math.max, k = Math.min,
                x = function () {
                    return y.Date.now()
                };
            e.exports = function (e, t, n) {
                var s = !0, r = !0;
                if ("function" != typeof e)throw new TypeError(l);
                return o(n) && (s = "leading" in n ? !!n.leading : s, r = "trailing" in n ? !!n.trailing : r), i(e, t, {
                    leading: s,
                    maxWait: t,
                    trailing: r
                })
            }
        }).call(t, function () {
            return this
        }())
    }, function (e, t) {
        (function (t) {
            "use strict";
            function i(e) {
                var t = void 0 === e ? "undefined" : r(e);
                return !!e && ("object" == t || "function" == t)
            }

            function o(e) {
                return !!e && "object" == (void 0 === e ? "undefined" : r(e))
            }

            function n(e) {
                return "symbol" == (void 0 === e ? "undefined" : r(e)) || o(e) && y.call(e) == c
            }

            function s(e) {
                if ("number" == typeof e)return e;
                if (n(e))return l;
                if (i(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = i(t) ? t + "" : t
                }
                if ("string" != typeof e)return 0 === e ? e : +e;
                e = e.replace(d, "");
                var o = u.test(e);
                return o || f.test(e) ? h(e.slice(2), o ? 2 : 8) : p.test(e) ? l : +e
            }

            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, a = "Expected a function", l = NaN, c = "[object Symbol]", d = /^\s+|\s+$/g, p = /^[-+]0x[0-9a-f]+$/i,
                u = /^0b[01]+$/i, f = /^0o[0-7]+$/i, h = parseInt,
                m = "object" == (void 0 === t ? "undefined" : r(t)) && t && t.Object === Object && t,
                v = "object" == ("undefined" == typeof self ? "undefined" : r(self)) && self && self.Object === Object && self,
                g = m || v || Function("return this")(), y = Object.prototype.toString, b = Math.max, w = Math.min,
                k = function () {
                    return g.Date.now()
                };
            e.exports = function (e, t, o) {
                function n(t) {
                    var i = f, o = h;
                    return f = h = void 0, x = t, v = e.apply(o, i)
                }

                function r(e) {
                    return x = e, g = setTimeout(d, t), S ? n(e) : v
                }

                function l(e) {
                    var i = e - x, o = t - (e - y);
                    return T ? w(o, m - i) : o
                }

                function c(e) {
                    var i = e - y, o = e - x;
                    return void 0 === y || i >= t || i < 0 || T && o >= m
                }

                function d() {
                    var e = k();
                    return c(e) ? p(e) : void(g = setTimeout(d, l(e)))
                }

                function p(e) {
                    return g = void 0, C && f ? n(e) : (f = h = void 0, v)
                }

                function u() {
                    var e = k(), i = c(e);
                    if (f = arguments, h = this, y = e, i) {
                        if (void 0 === g)return r(y);
                        if (T)return g = setTimeout(d, t), n(y)
                    }
                    return void 0 === g && (g = setTimeout(d, t)), v
                }

                var f, h, m, v, g, y, x = 0, S = !1, T = !1, C = !0;
                if ("function" != typeof e)throw new TypeError(a);
                return t = s(t) || 0, i(o) && (S = !!o.leading, T = "maxWait" in o, m = T ? b(s(o.maxWait) || 0, t) : m, C = "trailing" in o ? !!o.trailing : C), u.cancel = function () {
                    void 0 !== g && clearTimeout(g), x = 0, f = y = h = g = void 0
                }, u.flush = function () {
                    return void 0 === g ? v : p(k())
                }, u
            }
        }).call(t, function () {
            return this
        }())
    }, function (e, t) {
        "use strict";
        function i() {
            for (var e, t, i = 0, n = s.length; i < n; i++) {
                e = s[i];
                for (var r, a = 0, l = (t = o.querySelectorAll(e.selector)).length; a < l; a++)(r = t[a]).ready || (r.ready = !0, e.fn.call(r, r))
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var o = window.document, n = window.MutationObserver || window.WebKitMutationObserver, s = [], r = void 0;
        t.default = function (e, t) {
            s.push({selector: e, fn: t}), !r && n && (r = new n(i)).observe(o.documentElement, {
                childList: !0,
                subtree: !0,
                removedNodes: !0
            }), i()
        }
    }, function (e, t) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
        }

        function o() {
            return navigator.userAgent || navigator.vendor || window.opera || ""
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var n = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var o = t[i];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }

                return function (t, i, o) {
                    return i && e(t.prototype, i), o && e(t, o), t
                }
            }(),
            s = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            r = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            a = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            l = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            c = function () {
                function e() {
                    i(this, e)
                }

                return n(e, [{
                    key: "phone", value: function () {
                        var e = o();
                        return !(!s.test(e) && !r.test(e.substr(0, 4)))
                    }
                }, {
                    key: "mobile", value: function () {
                        var e = o();
                        return !(!a.test(e) && !l.test(e.substr(0, 4)))
                    }
                }, {
                    key: "tablet", value: function () {
                        return this.mobile() && !this.phone()
                    }
                }]), e
            }();
        t.default = new c
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var i = function (e, t, i) {
            var o = e.node.getAttribute("data-aos-once");
            t > e.position ? e.node.classList.add("aos-animate") : void 0 !== o && ("false" === o || !i && "true" !== o) && e.node.classList.remove("aos-animate")
        };
        t.default = function (e, t) {
            var o = window.pageYOffset, n = window.innerHeight;
            e.forEach(function (e, s) {
                i(e, n + o, t)
            })
        }
    }, function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(i(12));
        t.default = function (e, t) {
            return e.forEach(function (e, i) {
                e.node.classList.add("aos-init"), e.position = (0, o.default)(e.node, t.offset)
            }), e
        }
    }, function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var o = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(i(13));
        t.default = function (e, t) {
            var i = 0, n = 0, s = window.innerHeight, r = {
                offset: e.getAttribute("data-aos-offset"),
                anchor: e.getAttribute("data-aos-anchor"),
                anchorPlacement: e.getAttribute("data-aos-anchor-placement")
            };
            switch (r.offset && !isNaN(r.offset) && (n = parseInt(r.offset)), r.anchor && document.querySelectorAll(r.anchor) && (e = document.querySelectorAll(r.anchor)[0]), i = (0, o.default)(e).top, r.anchorPlacement) {
                case"top-bottom":
                    break;
                case"center-bottom":
                    i += e.offsetHeight / 2;
                    break;
                case"bottom-bottom":
                    i += e.offsetHeight;
                    break;
                case"top-center":
                    i += s / 2;
                    break;
                case"bottom-center":
                    i += s / 2 + e.offsetHeight;
                    break;
                case"center-center":
                    i += s / 2 + e.offsetHeight / 2;
                    break;
                case"top-top":
                    i += s;
                    break;
                case"bottom-top":
                    i += e.offsetHeight + s;
                    break;
                case"center-top":
                    i += e.offsetHeight / 2 + s
            }
            return r.anchorPlacement || r.offset || isNaN(t) || (n = t), i + n
        }
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        t.default = function (e) {
            for (var t = 0, i = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);)t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), i += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
            return {top: i, left: t}
        }
    }, function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        t.default = function (e) {
            e = e || document.querySelectorAll("[data-aos]");
            var t = [];
            return [].forEach.call(e, function (e, i) {
                t.push({node: e})
            }), t
        }
    }])
}), function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).fitvids = e()
    }
}(function () {
    return function e(t, i, o) {
        function n(r, a) {
            if (!i[r]) {
                if (!t[r]) {
                    var l = "function" == typeof require && require;
                    if (!a && l)return l(r, !0);
                    if (s)return s(r, !0);
                    var c = new Error("Cannot find module '" + r + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var d = i[r] = {exports: {}};
                t[r][0].call(d.exports, function (e) {
                    var i = t[r][1][e];
                    return n(i || e)
                }, d, d.exports, e, t, i, o)
            }
            return i[r].exports
        }

        for (var s = "function" == typeof require && require, r = 0; r < o.length; r++)n(o[r]);
        return n
    }({
        1: [function (e, t, i) {
            "use strict";
            function o(e, t) {
                return "string" == typeof e && (t = e, e = document), Array.prototype.slice.call(e.querySelectorAll(t))
            }

            function n(e) {
                return "string" == typeof e ? e.split(",").map(c).filter(l) : u(e) ? d(e.map(n).filter(l)) : e || []
            }

            function s(e) {
                if (!/fluid-width-video-wrapper/.test(e.parentNode.className)) {
                    var t = parseInt(e.getAttribute("width"), 10), i = parseInt(e.getAttribute("height"), 10),
                        o = isNaN(t) ? e.clientWidth : t, n = (isNaN(i) ? e.clientHeight : i) / o;
                    e.removeAttribute("width"), e.removeAttribute("height");
                    var s = document.createElement("div");
                    e.parentNode.insertBefore(s, e), s.className = "fluid-width-video-wrapper", s.style.paddingTop = 100 * n + "%", s.appendChild(e)
                }
            }

            function r() {
                var e = document.createElement("div");
                return e.innerHTML = '<p>x</p><style id="fit-vids-style">' + h + "</style>", e.childNodes[1]
            }

            function a(e) {
                return e.length < 1 ? function () {
                    return !0
                } : function (t) {
                    return -1 === e.indexOf(t)
                }
            }

            function l(e) {
                return e.length > 0
            }

            function c(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }

            function d(e) {
                return [].concat.apply([], e)
            }

            function p(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            }

            function u(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }

            var f = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object"],
                h = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";
            t.exports = function (e, t) {
                e = e || "body", t = t || {}, p(e) && (t = e, e = "body"), t.ignore = t.ignore || "", t.players = t.players || "";
                var i = o(e);
                if (l(i)) {
                    document.getElementById("fit-vids-style") || (document.head || document.getElementsByTagName("head")[0]).appendChild(r());
                    var c = n(t.players) || [], d = n(t.ignore) || [], u = f.filter(a(d)).concat(c).join();
                    l(u) && i.forEach(function (e) {
                        o(e, u).forEach(function (e) {
                            s(e)
                        })
                    })
                }
            }
        }, {}]
    }, {}, [1])(1)
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function (e) {
    "use strict";
    var t = window.Slick || {};
    (t = function () {
        var t = 0;
        return function (i, o) {
            var n, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(i),
                appendDots: e(i),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (t, i) {
                    return e('<button type="button" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, e.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = e(i), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, n = e(i).data("slick") || {}, s.options = e.extend({}, s.defaults, o, n), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, void 0 !== document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = e.proxy(s.autoPlay, s), s.autoPlayClear = e.proxy(s.autoPlayClear, s), s.autoPlayIterator = e.proxy(s.autoPlayIterator, s), s.changeSlide = e.proxy(s.changeSlide, s), s.clickHandler = e.proxy(s.clickHandler, s), s.selectHandler = e.proxy(s.selectHandler, s), s.setPosition = e.proxy(s.setPosition, s), s.swipeHandler = e.proxy(s.swipeHandler, s), s.dragHandler = e.proxy(s.dragHandler, s), s.keyHandler = e.proxy(s.keyHandler, s), s.instanceUid = t++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
        }
    }()).prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    }, t.prototype.addSlide = t.prototype.slickAdd = function (t, i, o) {
        var n = this;
        if ("boolean" == typeof i) o = i, i = null; else if (i < 0 || i >= n.slideCount)return !1;
        n.unload(), "number" == typeof i ? 0 === i && 0 === n.$slides.length ? e(t).appendTo(n.$slideTrack) : o ? e(t).insertBefore(n.$slides.eq(i)) : e(t).insertAfter(n.$slides.eq(i)) : !0 === o ? e(t).prependTo(n.$slideTrack) : e(t).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function (t, i) {
            e(i).attr("data-slick-index", t)
        }), n.$slidesCache = n.$slides, n.reinit()
    }, t.prototype.animateHeight = function () {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({height: t}, e.options.speed)
        }
    }, t.prototype.animateSlide = function (t, i) {
        var o = {}, n = this;
        n.animateHeight(), !0 === n.options.rtl && !1 === n.options.vertical && (t = -t), !1 === n.transformsEnabled ? !1 === n.options.vertical ? n.$slideTrack.animate({left: t}, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({top: t}, n.options.speed, n.options.easing, i) : !1 === n.cssTransitions ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft), e({animStart: n.currentLeft}).animate({animStart: t}, {
            duration: n.options.speed,
            easing: n.options.easing,
            step: function (e) {
                e = Math.ceil(e), !1 === n.options.vertical ? (o[n.animType] = "translate(" + e + "px, 0px)", n.$slideTrack.css(o)) : (o[n.animType] = "translate(0px," + e + "px)", n.$slideTrack.css(o))
            },
            complete: function () {
                i && i.call()
            }
        })) : (n.applyTransition(), t = Math.ceil(t), !1 === n.options.vertical ? o[n.animType] = "translate3d(" + t + "px, 0px, 0px)" : o[n.animType] = "translate3d(0px," + t + "px, 0px)", n.$slideTrack.css(o), i && setTimeout(function () {
            n.disableTransition(), i.call()
        }, n.options.speed))
    }, t.prototype.getNavTarget = function () {
        var t = this, i = t.options.asNavFor;
        return i && null !== i && (i = e(i).not(t.$slider)), i
    }, t.prototype.asNavFor = function (t) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function () {
            var i = e(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    }, t.prototype.applyTransition = function (e) {
        var t = this, i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, t.prototype.autoPlay = function () {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function () {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function () {
        var e = this, t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, t.prototype.buildArrows = function () {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, t.prototype.buildDots = function () {
        var t, i, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), i = e("<ul />").addClass(o.options.dotsClass), t = 0; t <= o.getDotCount(); t += 1)i.append(e("<li />").append(o.options.customPaging.call(this, o, t)));
            o.$dots = i.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, t.prototype.buildOut = function () {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function (t, i) {
            e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function () {
        var e, t, i, o, n, s, r, a = this;
        if (o = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 1) {
            for (r = a.options.slidesPerRow * a.options.rows, n = Math.ceil(s.length / r), e = 0; e < n; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var c = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var d = e * r + (t * a.options.slidesPerRow + i);
                        s.get(d) && c.appendChild(s.get(d))
                    }
                    l.appendChild(c)
                }
                o.appendChild(l)
            }
            a.$slider.empty().append(o), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, t.prototype.checkResponsive = function (t, i) {
        var o, n, s, r = this, a = !1, l = r.$slider.width(), c = window.innerWidth || e(window).width();
        if ("window" === r.respondTo ? s = c : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(c, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            n = null;
            for (o in r.breakpoints)r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? s < r.breakpoints[o] && (n = r.breakpoints[o]) : s > r.breakpoints[o] && (n = r.breakpoints[o]));
            null !== n ? null !== r.activeBreakpoint ? (n !== r.activeBreakpoint || i) && (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[n]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = n) : (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[n]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = n) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t), a = n), t || !1 === a || r.$slider.trigger("breakpoint", [r, a])
        }
    }, t.prototype.changeSlide = function (t, i) {
        var o, n, s, r = this, a = e(t.currentTarget);
        switch (a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest("li")), s = r.slideCount % r.options.slidesToScroll != 0, o = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
            case"previous":
                n = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - n, !1, i);
                break;
            case"next":
                n = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + n, !1, i);
                break;
            case"index":
                var l = 0 === t.data.index ? 0 : t.data.index || a.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, t.prototype.checkNavigable = function (e) {
        var t, i;
        if (t = this.getNavigableIndexes(), i = 0, e > t[t.length - 1]) e = t[t.length - 1]; else for (var o in t) {
            if (e < t[o]) {
                e = i;
                break
            }
            i = t[o]
        }
        return e
    }, t.prototype.cleanUpEvents = function () {
        var t = this;
        t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpSlideEvents = function () {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.cleanUpRows = function () {
        var e, t = this;
        t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
    }, t.prototype.clickHandler = function (e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function (t) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), e(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            e(this).attr("style", e(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, t || i.$slider.trigger("destroy", [i])
    }, t.prototype.disableTransition = function (e) {
        var t = this, i = {};
        i[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, t.prototype.fadeSlide = function (e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({zIndex: i.options.zIndex}), i.$slides.eq(e).animate({opacity: 1}, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), t && setTimeout(function () {
            i.disableTransition(e), t.call()
        }, i.options.speed))
    }, t.prototype.fadeSlideOut = function (e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function (e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.focusHandler = function () {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (i) {
            i.stopImmediatePropagation();
            var o = e(this);
            setTimeout(function () {
                t.options.pauseOnFocus && (t.focussed = o.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function () {
        return this.currentSlide
    }, t.prototype.getDotCount = function () {
        var e = this, t = 0, i = 0, o = 0;
        if (!0 === e.options.infinite)if (e.slideCount <= e.options.slidesToShow) ++o; else for (; t < e.slideCount;)++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; else if (!0 === e.options.centerMode) o = e.slideCount; else if (e.options.asNavFor)for (; t < e.slideCount;)++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return o - 1
    }, t.prototype.getLeft = function (e) {
        var t, i, o, n = this, s = 0;
        return n.slideOffset = 0, i = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = i * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll != 0 && e + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (e > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1, s = (n.options.slidesToShow - (e - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, s = n.slideCount % n.options.slidesToScroll * i * -1))) : e + n.options.slidesToShow > n.slideCount && (n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth, s = (e + n.options.slidesToShow - n.slideCount) * i), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, s = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), t = !1 === n.options.vertical ? e * n.slideWidth * -1 + n.slideOffset : e * i * -1 + s, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow), t = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1), t = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, t += (n.$list.width() - o.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function (e) {
        return this.options[e]
    }, t.prototype.getNavigableIndexes = function () {
        var e, t = this, i = 0, o = 0, n = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll, o = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); i < e;)n.push(i), i = o + t.options.slidesToScroll, o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return n
    }, t.prototype.getSlick = function () {
        return this
    }, t.prototype.getSlideCount = function () {
        var t, i, o = this;
        return i = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (n, s) {
            if (s.offsetLeft - i + e(s).outerWidth() / 2 > -1 * o.swipeLeft)return t = s, !1
        }), Math.abs(e(t).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function (e, t) {
        this.changeSlide({data: {message: "index", index: parseInt(e)}}, t)
    }, t.prototype.init = function (t) {
        var i = this;
        e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), t && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
    }, t.prototype.initADA = function () {
        var t = this, i = Math.ceil(t.slideCount / t.options.slidesToShow),
            o = t.getNavigableIndexes().filter(function (e) {
                return e >= 0 && e < t.slideCount
            });
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function (i) {
            var n = o.indexOf(i);
            e(this).attr({
                role: "tabpanel",
                id: "slick-slide" + t.instanceUid + i,
                tabindex: -1
            }), -1 !== n && e(this).attr({"aria-describedby": "slick-slide-control" + t.instanceUid + n})
        }), t.$dots.attr("role", "tablist").find("li").each(function (n) {
            var s = o[n];
            e(this).attr({role: "presentation"}), e(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + t.instanceUid + n,
                "aria-controls": "slick-slide" + t.instanceUid + s,
                "aria-label": n + 1 + " of " + i,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(t.currentSlide).find("button").attr({"aria-selected": "true", tabindex: "0"}).end());
        for (var n = t.currentSlide, s = n + t.options.slidesToShow; n < s; n++)t.$slides.eq(n).attr("tabindex", 0);
        t.activateADA()
    }, t.prototype.initArrowEvents = function () {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }, t.prototype.initDotEvents = function () {
        var t = this;
        !0 === t.options.dots && (e("li", t.$dots).on("click.slick", {message: "index"}, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.initSlideEvents = function () {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }, t.prototype.initializeEvents = function () {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {action: "start"}, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {action: "move"}, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {action: "end"}, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
    }, t.prototype.initUI = function () {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, t.prototype.keyHandler = function (e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({data: {message: !0 === t.options.rtl ? "next" : "previous"}}) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({data: {message: !0 === t.options.rtl ? "previous" : "next"}}))
    }, t.prototype.lazyLoad = function () {
        function t(t) {
            e("img[data-lazy]", t).each(function () {
                var t = e(this), i = e(this).attr("data-lazy"), o = e(this).attr("data-srcset"),
                    n = e(this).attr("data-sizes") || s.$slider.attr("data-sizes"), r = document.createElement("img");
                r.onload = function () {
                    t.animate({opacity: 0}, 100, function () {
                        o && (t.attr("srcset", o), n && t.attr("sizes", n)), t.attr("src", i).animate({opacity: 1}, 200, function () {
                            t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), s.$slider.trigger("lazyLoaded", [s, t, i])
                    })
                }, r.onerror = function () {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, t, i])
                }, r.src = i
            })
        }

        var i, o, n, s = this;
        if (!0 === s.options.centerMode ? !0 === s.options.infinite ? n = (o = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), n = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, n = Math.ceil(o + s.options.slidesToShow), !0 === s.options.fade && (o > 0 && o--, n <= s.slideCount && n++)), i = s.$slider.find(".slick-slide").slice(o, n), "anticipated" === s.options.lazyLoad)for (var r = o - 1, a = n, l = s.$slider.find(".slick-slide"), c = 0; c < s.options.slidesToScroll; c++)r < 0 && (r = s.slideCount - 1), i = (i = i.add(l.eq(r))).add(l.eq(a)), r--, a++;
        t(i), s.slideCount <= s.options.slidesToShow ? t(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? t(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && t(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
    }, t.prototype.loadSlider = function () {
        var e = this;
        e.setPosition(), e.$slideTrack.css({opacity: 1}), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function () {
        this.changeSlide({data: {message: "next"}})
    }, t.prototype.orientationChange = function () {
        var e = this;
        e.checkResponsive(), e.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function () {
        var e = this;
        e.autoPlayClear(), e.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function () {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, t.prototype.postSlide = function (t) {
        var i = this;
        i.unslicked || (i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.autoplay || e(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
    }, t.prototype.prev = t.prototype.slickPrev = function () {
        this.changeSlide({data: {message: "previous"}})
    }, t.prototype.preventDefault = function (e) {
        e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function (t) {
        t = t || 1;
        var i, o, n, s, r, a = this, l = e("img[data-lazy]", a.$slider);
        l.length ? (i = l.first(), o = i.attr("data-lazy"), n = i.attr("data-srcset"), s = i.attr("data-sizes") || a.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
            n && (i.attr("srcset", n), s && i.attr("sizes", s)), i.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, i, o]), a.progressiveLazyLoad()
        }, r.onerror = function () {
            t < 3 ? setTimeout(function () {
                a.progressiveLazyLoad(t + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, i, o]), a.progressiveLazyLoad())
        }, r.src = o) : a.$slider.trigger("allImagesLoaded", [a])
    }, t.prototype.refresh = function (t) {
        var i, o, n = this;
        o = n.slideCount - n.options.slidesToShow, !n.options.infinite && n.currentSlide > o && (n.currentSlide = o), n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0), i = n.currentSlide, n.destroy(!0), e.extend(n, n.initials, {currentSlide: i}), n.init(), t || n.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, t.prototype.registerBreakpoints = function () {
        var t, i, o, n = this, s = n.options.responsive || null;
        if ("array" === e.type(s) && s.length) {
            n.respondTo = n.options.respondTo || "window";
            for (t in s)if (o = n.breakpoints.length - 1, s.hasOwnProperty(t)) {
                for (i = s[t].breakpoint; o >= 0;)n.breakpoints[o] && n.breakpoints[o] === i && n.breakpoints.splice(o, 1), o--;
                n.breakpoints.push(i), n.breakpointSettings[i] = s[t].settings
            }
            n.breakpoints.sort(function (e, t) {
                return n.options.mobileFirst ? e - t : t - e
            })
        }
    }, t.prototype.reinit = function () {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, t.prototype.resize = function () {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function () {
            t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }, 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function (e, t, i) {
        var o = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : o.slideCount - 1 : !0 === t ? --e : e, o.slideCount < 1 || e < 0 || e > o.slideCount - 1)return !1;
        o.unload(), !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, t.prototype.setCSS = function (e) {
        var t, i, o = this, n = {};
        !0 === o.options.rtl && (e = -e), t = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px", n[o.positionProp] = e, !1 === o.transformsEnabled ? o.$slideTrack.css(n) : (n = {}, !1 === o.cssTransitions ? (n[o.animType] = "translate(" + t + ", " + i + ")", o.$slideTrack.css(n)) : (n[o.animType] = "translate3d(" + t + ", " + i + ", 0px)", o.$slideTrack.css(n)))
    }, t.prototype.setDimensions = function () {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({padding: "0px " + e.options.centerPadding}) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({padding: e.options.centerPadding + " 0px"})), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function () {
        var t, i = this;
        i.$slides.each(function (o, n) {
            t = i.slideWidth * o * -1, !0 === i.options.rtl ? e(n).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : e(n).css({position: "relative", left: t, top: 0, zIndex: i.options.zIndex - 2, opacity: 0})
        }), i.$slides.eq(i.currentSlide).css({zIndex: i.options.zIndex - 1, opacity: 1})
    }, t.prototype.setHeight = function () {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, t.prototype.setOption = t.prototype.slickSetOption = function () {
        var t, i, o, n, s, r = this, a = !1;
        if ("object" === e.type(arguments[0]) ? (o = arguments[0], a = arguments[1], s = "multiple") : "string" === e.type(arguments[0]) && (o = arguments[0], n = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")), "single" === s) r.options[o] = n; else if ("multiple" === s) e.each(o, function (e, t) {
            r.options[e] = t
        }); else if ("responsive" === s)for (i in n)if ("array" !== e.type(r.options.responsive)) r.options.responsive = [n[i]]; else {
            for (t = r.options.responsive.length - 1; t >= 0;)r.options.responsive[t].breakpoint === n[i].breakpoint && r.options.responsive.splice(t, 1), t--;
            r.options.responsive.push(n[i])
        }
        a && (r.unload(), r.reinit())
    }, t.prototype.setPosition = function () {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function () {
        var e = this, t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, t.prototype.setSlideClasses = function (e) {
        var t, i, o, n, s = this;
        i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(e).addClass("slick-current"), !0 === s.options.centerMode ? (t = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (e >= t && e <= s.slideCount - 1 - t ? s.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = s.options.slidesToShow + e, i.slice(o - t + 1, o + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : e === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(e, e + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = s.slideCount % s.options.slidesToShow, o = !0 === s.options.infinite ? s.options.slidesToShow + e : e, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - e < s.options.slidesToShow ? i.slice(o - (s.options.slidesToShow - n), o + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
    }, t.prototype.setupInfinite = function () {
        var t, i, o, n = this;
        if (!0 === n.options.fade && (n.options.centerMode = !1), !0 === n.options.infinite && !1 === n.options.fade && (i = null, n.slideCount > n.options.slidesToShow)) {
            for (o = !0 === n.options.centerMode ? n.options.slidesToShow + 1 : n.options.slidesToShow, t = n.slideCount; t > n.slideCount - o; t -= 1)i = t - 1, e(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < o + n.slideCount; t += 1)i = t, e(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
            n.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                e(this).attr("id", "")
            })
        }
    }, t.prototype.interrupt = function (e) {
        var t = this;
        e || t.autoPlay(), t.interrupted = e
    }, t.prototype.selectHandler = function (t) {
        var i = this, o = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
            n = parseInt(o.attr("data-slick-index"));
        n || (n = 0), i.slideCount <= i.options.slidesToShow ? i.slideHandler(n, !1, !0) : i.slideHandler(n)
    }, t.prototype.slideHandler = function (e, t, i) {
        var o, n, s, r, a, l = null, c = this;
        if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e))if (!1 === t && c.asNavFor(e), o = e, l = c.getLeft(o), r = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? r : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (o = c.currentSlide, !0 !== i ? c.animateSlide(r, function () {
            c.postSlide(o)
        }) : c.postSlide(o)); else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (o = c.currentSlide, !0 !== i ? c.animateSlide(r, function () {
            c.postSlide(o)
        }) : c.postSlide(o)); else {
            if (c.options.autoplay && clearInterval(c.autoPlayTimer), n = o < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + o : o >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : o - c.slideCount : o, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, n]), s = c.currentSlide, c.currentSlide = n, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade)return !0 !== i ? (c.fadeSlideOut(s), c.fadeSlide(n, function () {
                c.postSlide(n)
            })) : c.postSlide(n), void c.animateHeight();
            !0 !== i ? c.animateSlide(l, function () {
                c.postSlide(n)
            }) : c.postSlide(n)
        }
    }, t.prototype.startLoad = function () {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function () {
        var e, t, i, o, n = this;
        return e = n.touchObject.startX - n.touchObject.curX, t = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(t, e), (o = Math.round(180 * i / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === n.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === n.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === n.options.rtl ? "right" : "left" : !0 === n.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, t.prototype.swipeEnd = function (e) {
        var t, i, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling)return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX)return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (i = o.swipeDirection()) {
                case"left":
                case"down":
                    t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case"right":
                case"up":
                    t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != i && (o.slideHandler(t), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, t.prototype.swipeHandler = function (e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse")))switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case"start":
                t.swipeStart(e);
                break;
            case"move":
                t.swipeMove(e);
                break;
            case"end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function (e) {
        var t, i, o, n, s, r, a = this;
        return s = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || s && 1 !== s.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== s ? s[0].pageX : e.clientX, a.touchObject.curY = void 0 !== s ? s[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && r > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r), i = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), n = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (n = a.touchObject.curY > a.touchObject.startY ? 1 : -1), o = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (o = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + o * n : a.swipeLeft = t + o * (a.$list.height() / a.listWidth) * n, !0 === a.options.verticalSwiping && (a.swipeLeft = t + o * n), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
    }, t.prototype.swipeStart = function (e) {
        var t, i = this;
        if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)return i.touchObject = {}, !1;
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, i.dragging = !0
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function () {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function () {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function (e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, t.prototype.updateArrows = function () {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, t.prototype.updateDots = function () {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }, t.prototype.visibility = function () {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, e.fn.slick = function () {
        var e, i, o = this, n = arguments[0], s = Array.prototype.slice.call(arguments, 1), r = o.length;
        for (e = 0; e < r; e++)if ("object" == typeof n || void 0 === n ? o[e].slick = new t(o[e], n) : i = o[e].slick[n].apply(o[e].slick, s), void 0 !== i)return i;
        return o
    }
});
var pJS = function (e, t) {
    var i = document.querySelector("#" + e + " > .particles-js-canvas-el");
    this.pJS = {
        canvas: {el: i, w: i.offsetWidth, h: i.offsetHeight},
        particles: {
            number: {value: 400, density: {enable: !0, value_area: 800}},
            color: {value: "#fff"},
            shape: {
                type: "circle",
                stroke: {width: 0, color: "#ff0000"},
                polygon: {nb_sides: 5},
                image: {src: "", width: 100, height: 100}
            },
            opacity: {value: 1, random: !1, anim: {enable: !1, speed: 2, opacity_min: 0, sync: !1}},
            size: {value: 20, random: !1, anim: {enable: !1, speed: 20, size_min: 0, sync: !1}},
            line_linked: {enable: !0, distance: 100, color: "#fff", opacity: 1, width: 1},
            move: {
                enable: !0,
                speed: 2,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {enable: !1, rotateX: 3e3, rotateY: 3e3}
            },
            array: []
        },
        interactivity: {
            detect_on: "canvas",
            events: {onhover: {enable: !0, mode: "grab"}, onclick: {enable: !0, mode: "push"}, resize: !0},
            modes: {
                grab: {distance: 100, line_linked: {opacity: 1}},
                bubble: {distance: 200, size: 80, duration: .4},
                repulse: {distance: 200, duration: .4},
                push: {particles_nb: 4},
                remove: {particles_nb: 2}
            },
            mouse: {}
        },
        retina_detect: !1,
        fn: {interact: {}, modes: {}, vendors: {}},
        tmp: {}
    };
    var o = this.pJS;
    t && Object.deepExtend(o, t), o.tmp.obj = {
        size_value: o.particles.size.value,
        size_anim_speed: o.particles.size.anim.speed,
        move_speed: o.particles.move.speed,
        line_linked_distance: o.particles.line_linked.distance,
        line_linked_width: o.particles.line_linked.width,
        mode_grab_distance: o.interactivity.modes.grab.distance,
        mode_bubble_distance: o.interactivity.modes.bubble.distance,
        mode_bubble_size: o.interactivity.modes.bubble.size,
        mode_repulse_distance: o.interactivity.modes.repulse.distance
    }, o.fn.retinaInit = function () {
        o.retina_detect && window.devicePixelRatio > 1 ? (o.canvas.pxratio = window.devicePixelRatio, o.tmp.retina = !0) : (o.canvas.pxratio = 1, o.tmp.retina = !1), o.canvas.w = o.canvas.el.offsetWidth * o.canvas.pxratio, o.canvas.h = o.canvas.el.offsetHeight * o.canvas.pxratio, o.particles.size.value = o.tmp.obj.size_value * o.canvas.pxratio, o.particles.size.anim.speed = o.tmp.obj.size_anim_speed * o.canvas.pxratio, o.particles.move.speed = o.tmp.obj.move_speed * o.canvas.pxratio, o.particles.line_linked.distance = o.tmp.obj.line_linked_distance * o.canvas.pxratio, o.interactivity.modes.grab.distance = o.tmp.obj.mode_grab_distance * o.canvas.pxratio, o.interactivity.modes.bubble.distance = o.tmp.obj.mode_bubble_distance * o.canvas.pxratio, o.particles.line_linked.width = o.tmp.obj.line_linked_width * o.canvas.pxratio, o.interactivity.modes.bubble.size = o.tmp.obj.mode_bubble_size * o.canvas.pxratio, o.interactivity.modes.repulse.distance = o.tmp.obj.mode_repulse_distance * o.canvas.pxratio
    }, o.fn.canvasInit = function () {
        o.canvas.ctx = o.canvas.el.getContext("2d")
    }, o.fn.canvasSize = function () {
        o.canvas.el.width = o.canvas.w, o.canvas.el.height = o.canvas.h, o && o.interactivity.events.resize && window.addEventListener("resize", function () {
            o.canvas.w = o.canvas.el.offsetWidth, o.canvas.h = o.canvas.el.offsetHeight, o.tmp.retina && (o.canvas.w *= o.canvas.pxratio, o.canvas.h *= o.canvas.pxratio), o.canvas.el.width = o.canvas.w, o.canvas.el.height = o.canvas.h, o.particles.move.enable || (o.fn.particlesEmpty(), o.fn.particlesCreate(), o.fn.particlesDraw(), o.fn.vendors.densityAutoParticles()), o.fn.vendors.densityAutoParticles()
        })
    }, o.fn.canvasPaint = function () {
        o.canvas.ctx.fillRect(0, 0, o.canvas.w, o.canvas.h)
    }, o.fn.canvasClear = function () {
        o.canvas.ctx.clearRect(0, 0, o.canvas.w, o.canvas.h)
    }, o.fn.particle = function (e, t, i) {
        if (this.radius = (o.particles.size.random ? Math.random() : 1) * o.particles.size.value, o.particles.size.anim.enable && (this.size_status = !1, this.vs = o.particles.size.anim.speed / 100, o.particles.size.anim.sync || (this.vs = this.vs * Math.random())), this.x = i ? i.x : Math.random() * o.canvas.w, this.y = i ? i.y : Math.random() * o.canvas.h, this.x > o.canvas.w - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius), this.y > o.canvas.h - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius), o.particles.move.bounce && o.fn.vendors.checkOverlap(this, i), this.color = {}, "object" == typeof e.value)if (e.value instanceof Array) {
            var n = e.value[Math.floor(Math.random() * o.particles.color.value.length)];
            this.color.rgb = hexToRgb(n)
        } else void 0 != e.value.r && void 0 != e.value.g && void 0 != e.value.b && (this.color.rgb = {
            r: e.value.r,
            g: e.value.g,
            b: e.value.b
        }), void 0 != e.value.h && void 0 != e.value.s && void 0 != e.value.l && (this.color.hsl = {
            h: e.value.h,
            s: e.value.s,
            l: e.value.l
        }); else"random" == e.value ? this.color.rgb = {
            r: Math.floor(256 * Math.random()) + 0,
            g: Math.floor(256 * Math.random()) + 0,
            b: Math.floor(256 * Math.random()) + 0
        } : "string" == typeof e.value && (this.color = e, this.color.rgb = hexToRgb(this.color.value));
        this.opacity = (o.particles.opacity.random ? Math.random() : 1) * o.particles.opacity.value, o.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = o.particles.opacity.anim.speed / 100, o.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
        var s = {};
        switch (o.particles.move.direction) {
            case"top":
                s = {x: 0, y: -1};
                break;
            case"top-right":
                s = {x: .5, y: -.5};
                break;
            case"right":
                s = {x: 1, y: -0};
                break;
            case"bottom-right":
                s = {x: .5, y: .5};
                break;
            case"bottom":
                s = {x: 0, y: 1};
                break;
            case"bottom-left":
                s = {x: -.5, y: 1};
                break;
            case"left":
                s = {x: -1, y: 0};
                break;
            case"top-left":
                s = {x: -.5, y: -.5};
                break;
            default:
                s = {x: 0, y: 0}
        }
        o.particles.move.straight ? (this.vx = s.x, this.vy = s.y, o.particles.move.random && (this.vx = this.vx * Math.random(), this.vy = this.vy * Math.random())) : (this.vx = s.x + Math.random() - .5, this.vy = s.y + Math.random() - .5), this.vx_i = this.vx, this.vy_i = this.vy;
        var r = o.particles.shape.type;
        if ("object" == typeof r) {
            if (r instanceof Array) {
                var a = r[Math.floor(Math.random() * r.length)];
                this.shape = a
            }
        } else this.shape = r;
        if ("image" == this.shape) {
            var l = o.particles.shape;
            this.img = {
                src: l.image.src,
                ratio: l.image.width / l.image.height
            }, this.img.ratio || (this.img.ratio = 1), "svg" == o.tmp.img_type && void 0 != o.tmp.source_svg && (o.fn.vendors.createSvgImg(this), o.tmp.pushing && (this.img.loaded = !1))
        }
    }, o.fn.particle.prototype.draw = function () {
        var e = this;
        if (void 0 != e.radius_bubble) t = e.radius_bubble; else var t = e.radius;
        if (void 0 != e.opacity_bubble) i = e.opacity_bubble; else var i = e.opacity;
        if (e.color.rgb) n = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + i + ")"; else var n = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + i + ")";
        switch (o.canvas.ctx.fillStyle = n, o.canvas.ctx.beginPath(), e.shape) {
            case"circle":
                o.canvas.ctx.arc(e.x, e.y, t, 0, 2 * Math.PI, !1);
                break;
            case"edge":
                o.canvas.ctx.rect(e.x - t, e.y - t, 2 * t, 2 * t);
                break;
            case"triangle":
                o.fn.vendors.drawShape(o.canvas.ctx, e.x - t, e.y + t / 1.66, 2 * t, 3, 2);
                break;
            case"polygon":
                o.fn.vendors.drawShape(o.canvas.ctx, e.x - t / (o.particles.shape.polygon.nb_sides / 3.5), e.y - t / .76, 2.66 * t / (o.particles.shape.polygon.nb_sides / 3), o.particles.shape.polygon.nb_sides, 1);
                break;
            case"star":
                o.fn.vendors.drawShape(o.canvas.ctx, e.x - 2 * t / (o.particles.shape.polygon.nb_sides / 4), e.y - t / 1.52, 2 * t * 2.66 / (o.particles.shape.polygon.nb_sides / 3), o.particles.shape.polygon.nb_sides, 2);
                break;
            case"image":
                if ("svg" == o.tmp.img_type) s = e.img.obj; else var s = o.tmp.img_obj;
                s && o.canvas.ctx.drawImage(s, e.x - t, e.y - t, 2 * t, 2 * t / e.img.ratio)
        }
        o.canvas.ctx.closePath(), o.particles.shape.stroke.width > 0 && (o.canvas.ctx.strokeStyle = o.particles.shape.stroke.color, o.canvas.ctx.lineWidth = o.particles.shape.stroke.width, o.canvas.ctx.stroke()), o.canvas.ctx.fill()
    }, o.fn.particlesCreate = function () {
        for (var e = 0; e < o.particles.number.value; e++)o.particles.array.push(new o.fn.particle(o.particles.color, o.particles.opacity.value))
    }, o.fn.particlesUpdate = function () {
        for (var e = 0; e < o.particles.array.length; e++) {
            var t = o.particles.array[e];
            if (o.particles.move.enable) {
                var i = o.particles.move.speed / 2;
                t.x += t.vx * i, t.y += t.vy * i
            }
            if (o.particles.opacity.anim.enable && (1 == t.opacity_status ? (t.opacity >= o.particles.opacity.value && (t.opacity_status = !1), t.opacity += t.vo) : (t.opacity <= o.particles.opacity.anim.opacity_min && (t.opacity_status = !0), t.opacity -= t.vo), t.opacity < 0 && (t.opacity = 0)), o.particles.size.anim.enable && (1 == t.size_status ? (t.radius >= o.particles.size.value && (t.size_status = !1), t.radius += t.vs) : (t.radius <= o.particles.size.anim.size_min && (t.size_status = !0), t.radius -= t.vs), t.radius < 0 && (t.radius = 0)), "bounce" == o.particles.move.out_mode) n = {
                x_left: t.radius,
                x_right: o.canvas.w,
                y_top: t.radius,
                y_bottom: o.canvas.h
            }; else var n = {
                x_left: -t.radius,
                x_right: o.canvas.w + t.radius,
                y_top: -t.radius,
                y_bottom: o.canvas.h + t.radius
            };
            switch (t.x - t.radius > o.canvas.w ? (t.x = n.x_left, t.y = Math.random() * o.canvas.h) : t.x + t.radius < 0 && (t.x = n.x_right, t.y = Math.random() * o.canvas.h), t.y - t.radius > o.canvas.h ? (t.y = n.y_top, t.x = Math.random() * o.canvas.w) : t.y + t.radius < 0 && (t.y = n.y_bottom, t.x = Math.random() * o.canvas.w), o.particles.move.out_mode) {
                case"bounce":
                    t.x + t.radius > o.canvas.w ? t.vx = -t.vx : t.x - t.radius < 0 && (t.vx = -t.vx), t.y + t.radius > o.canvas.h ? t.vy = -t.vy : t.y - t.radius < 0 && (t.vy = -t.vy)
            }
            if (isInArray("grab", o.interactivity.events.onhover.mode) && o.fn.modes.grabParticle(t), (isInArray("bubble", o.interactivity.events.onhover.mode) || isInArray("bubble", o.interactivity.events.onclick.mode)) && o.fn.modes.bubbleParticle(t), (isInArray("repulse", o.interactivity.events.onhover.mode) || isInArray("repulse", o.interactivity.events.onclick.mode)) && o.fn.modes.repulseParticle(t), o.particles.line_linked.enable || o.particles.move.attract.enable)for (var s = e + 1; s < o.particles.array.length; s++) {
                var r = o.particles.array[s];
                o.particles.line_linked.enable && o.fn.interact.linkParticles(t, r), o.particles.move.attract.enable && o.fn.interact.attractParticles(t, r), o.particles.move.bounce && o.fn.interact.bounceParticles(t, r)
            }
        }
    }, o.fn.particlesDraw = function () {
        o.canvas.ctx.clearRect(0, 0, o.canvas.w, o.canvas.h), o.fn.particlesUpdate();
        for (var e = 0; e < o.particles.array.length; e++)o.particles.array[e].draw()
    }, o.fn.particlesEmpty = function () {
        o.particles.array = []
    }, o.fn.particlesRefresh = function () {
        cancelRequestAnimFrame(o.fn.checkAnimFrame), cancelRequestAnimFrame(o.fn.drawAnimFrame), o.tmp.source_svg = void 0, o.tmp.img_obj = void 0, o.tmp.count_svg = 0, o.fn.particlesEmpty(), o.fn.canvasClear(), o.fn.vendors.start()
    }, o.fn.interact.linkParticles = function (e, t) {
        var i = e.x - t.x, n = e.y - t.y, s = Math.sqrt(i * i + n * n);
        if (s <= o.particles.line_linked.distance) {
            var r = o.particles.line_linked.opacity - s / (1 / o.particles.line_linked.opacity) / o.particles.line_linked.distance;
            if (r > 0) {
                var a = o.particles.line_linked.color_rgb_line;
                o.canvas.ctx.strokeStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + r + ")", o.canvas.ctx.lineWidth = o.particles.line_linked.width, o.canvas.ctx.beginPath(), o.canvas.ctx.moveTo(e.x, e.y), o.canvas.ctx.lineTo(t.x, t.y), o.canvas.ctx.stroke(), o.canvas.ctx.closePath()
            }
        }
    }, o.fn.interact.attractParticles = function (e, t) {
        var i = e.x - t.x, n = e.y - t.y;
        if (Math.sqrt(i * i + n * n) <= o.particles.line_linked.distance) {
            var s = i / (1e3 * o.particles.move.attract.rotateX), r = n / (1e3 * o.particles.move.attract.rotateY);
            e.vx -= s, e.vy -= r, t.vx += s, t.vy += r
        }
    }, o.fn.interact.bounceParticles = function (e, t) {
        var i = e.x - t.x, o = e.y - t.y;
        Math.sqrt(i * i + o * o) <= e.radius + t.radius && (e.vx = -e.vx, e.vy = -e.vy, t.vx = -t.vx, t.vy = -t.vy)
    }, o.fn.modes.pushParticles = function (e, t) {
        o.tmp.pushing = !0;
        for (var i = 0; i < e; i++)o.particles.array.push(new o.fn.particle(o.particles.color, o.particles.opacity.value, {
            x: t ? t.pos_x : Math.random() * o.canvas.w,
            y: t ? t.pos_y : Math.random() * o.canvas.h
        })), i == e - 1 && (o.particles.move.enable || o.fn.particlesDraw(), o.tmp.pushing = !1)
    }, o.fn.modes.removeParticles = function (e) {
        o.particles.array.splice(0, e), o.particles.move.enable || o.fn.particlesDraw()
    }, o.fn.modes.bubbleParticle = function (e) {
        function t() {
            e.opacity_bubble = e.opacity, e.radius_bubble = e.radius
        }

        function i(t, i, n, s, r) {
            if (t != i)if (o.tmp.bubble_duration_end) void 0 != n && (l = t + (t - (s - p * (s - t) / o.interactivity.modes.bubble.duration)), "size" == r && (e.radius_bubble = l), "opacity" == r && (e.opacity_bubble = l)); else if (d <= o.interactivity.modes.bubble.distance) {
                if (void 0 != n) a = n; else var a = s;
                if (a != t) {
                    var l = s - p * (s - t) / o.interactivity.modes.bubble.duration;
                    "size" == r && (e.radius_bubble = l), "opacity" == r && (e.opacity_bubble = l)
                }
            } else"size" == r && (e.radius_bubble = void 0), "opacity" == r && (e.opacity_bubble = void 0)
        }

        if (o.interactivity.events.onhover.enable && isInArray("bubble", o.interactivity.events.onhover.mode)) {
            var n = e.x - o.interactivity.mouse.pos_x, s = e.y - o.interactivity.mouse.pos_y,
                r = 1 - (d = Math.sqrt(n * n + s * s)) / o.interactivity.modes.bubble.distance;
            if (d <= o.interactivity.modes.bubble.distance) {
                if (r >= 0 && "mousemove" == o.interactivity.status) {
                    if (o.interactivity.modes.bubble.size != o.particles.size.value)if (o.interactivity.modes.bubble.size > o.particles.size.value) (l = e.radius + o.interactivity.modes.bubble.size * r) >= 0 && (e.radius_bubble = l); else {
                        var a = e.radius - o.interactivity.modes.bubble.size, l = e.radius - a * r;
                        e.radius_bubble = l > 0 ? l : 0
                    }
                    if (o.interactivity.modes.bubble.opacity != o.particles.opacity.value)if (o.interactivity.modes.bubble.opacity > o.particles.opacity.value) (c = o.interactivity.modes.bubble.opacity * r) > e.opacity && c <= o.interactivity.modes.bubble.opacity && (e.opacity_bubble = c); else {
                        var c = e.opacity - (o.particles.opacity.value - o.interactivity.modes.bubble.opacity) * r;
                        c < e.opacity && c >= o.interactivity.modes.bubble.opacity && (e.opacity_bubble = c)
                    }
                }
            } else t();
            "mouseleave" == o.interactivity.status && t()
        } else if (o.interactivity.events.onclick.enable && isInArray("bubble", o.interactivity.events.onclick.mode)) {
            if (o.tmp.bubble_clicking) {
                var n = e.x - o.interactivity.mouse.click_pos_x, s = e.y - o.interactivity.mouse.click_pos_y,
                    d = Math.sqrt(n * n + s * s), p = ((new Date).getTime() - o.interactivity.mouse.click_time) / 1e3;
                p > o.interactivity.modes.bubble.duration && (o.tmp.bubble_duration_end = !0), p > 2 * o.interactivity.modes.bubble.duration && (o.tmp.bubble_clicking = !1, o.tmp.bubble_duration_end = !1)
            }
            o.tmp.bubble_clicking && (i(o.interactivity.modes.bubble.size, o.particles.size.value, e.radius_bubble, e.radius, "size"), i(o.interactivity.modes.bubble.opacity, o.particles.opacity.value, e.opacity_bubble, e.opacity, "opacity"))
        }
    }, o.fn.modes.repulseParticle = function (e) {
        if (o.interactivity.events.onhover.enable && isInArray("repulse", o.interactivity.events.onhover.mode) && "mousemove" == o.interactivity.status) {
            var t = e.x - o.interactivity.mouse.pos_x, i = e.y - o.interactivity.mouse.pos_y,
                n = Math.sqrt(t * t + i * i), s = {x: t / n, y: i / n},
                r = clamp(1 / (l = o.interactivity.modes.repulse.distance) * (-1 * Math.pow(n / l, 2) + 1) * l * 100, 0, 50),
                a = {x: e.x + s.x * r, y: e.y + s.y * r};
            "bounce" == o.particles.move.out_mode ? (a.x - e.radius > 0 && a.x + e.radius < o.canvas.w && (e.x = a.x), a.y - e.radius > 0 && a.y + e.radius < o.canvas.h && (e.y = a.y)) : (e.x = a.x, e.y = a.y)
        } else if (o.interactivity.events.onclick.enable && isInArray("repulse", o.interactivity.events.onclick.mode))if (o.tmp.repulse_finish || (o.tmp.repulse_count++, o.tmp.repulse_count == o.particles.array.length && (o.tmp.repulse_finish = !0)), o.tmp.repulse_clicking) {
            var l = Math.pow(o.interactivity.modes.repulse.distance / 6, 3),
                c = o.interactivity.mouse.click_pos_x - e.x, d = o.interactivity.mouse.click_pos_y - e.y,
                p = c * c + d * d, u = -l / p * 1;
            p <= l && function () {
                var t = Math.atan2(d, c);
                if (e.vx = u * Math.cos(t), e.vy = u * Math.sin(t), "bounce" == o.particles.move.out_mode) {
                    var i = {x: e.x + e.vx, y: e.y + e.vy};
                    i.x + e.radius > o.canvas.w ? e.vx = -e.vx : i.x - e.radius < 0 && (e.vx = -e.vx), i.y + e.radius > o.canvas.h ? e.vy = -e.vy : i.y - e.radius < 0 && (e.vy = -e.vy)
                }
            }()
        } else 0 == o.tmp.repulse_clicking && (e.vx = e.vx_i, e.vy = e.vy_i)
    }, o.fn.modes.grabParticle = function (e) {
        if (o.interactivity.events.onhover.enable && "mousemove" == o.interactivity.status) {
            var t = e.x - o.interactivity.mouse.pos_x, i = e.y - o.interactivity.mouse.pos_y,
                n = Math.sqrt(t * t + i * i);
            if (n <= o.interactivity.modes.grab.distance) {
                var s = o.interactivity.modes.grab.line_linked.opacity - n / (1 / o.interactivity.modes.grab.line_linked.opacity) / o.interactivity.modes.grab.distance;
                if (s > 0) {
                    var r = o.particles.line_linked.color_rgb_line;
                    o.canvas.ctx.strokeStyle = "rgba(" + r.r + "," + r.g + "," + r.b + "," + s + ")", o.canvas.ctx.lineWidth = o.particles.line_linked.width, o.canvas.ctx.beginPath(), o.canvas.ctx.moveTo(e.x, e.y), o.canvas.ctx.lineTo(o.interactivity.mouse.pos_x, o.interactivity.mouse.pos_y), o.canvas.ctx.stroke(), o.canvas.ctx.closePath()
                }
            }
        }
    }, o.fn.vendors.eventsListeners = function () {
        "window" == o.interactivity.detect_on ? o.interactivity.el = window : o.interactivity.el = o.canvas.el, (o.interactivity.events.onhover.enable || o.interactivity.events.onclick.enable) && (o.interactivity.el.addEventListener("mousemove", function (e) {
            if (o.interactivity.el == window)var t = e.clientX, i = e.clientY; else var t = e.offsetX || e.clientX,
                i = e.offsetY || e.clientY;
            o.interactivity.mouse.pos_x = t, o.interactivity.mouse.pos_y = i, o.tmp.retina && (o.interactivity.mouse.pos_x *= o.canvas.pxratio, o.interactivity.mouse.pos_y *= o.canvas.pxratio), o.interactivity.status = "mousemove"
        }), o.interactivity.el.addEventListener("mouseleave", function (e) {
            o.interactivity.mouse.pos_x = null, o.interactivity.mouse.pos_y = null, o.interactivity.status = "mouseleave"
        })), o.interactivity.events.onclick.enable && o.interactivity.el.addEventListener("click", function () {
            if (o.interactivity.mouse.click_pos_x = o.interactivity.mouse.pos_x, o.interactivity.mouse.click_pos_y = o.interactivity.mouse.pos_y, o.interactivity.mouse.click_time = (new Date).getTime(), o.interactivity.events.onclick.enable)switch (o.interactivity.events.onclick.mode) {
                case"push":
                    o.particles.move.enable ? o.fn.modes.pushParticles(o.interactivity.modes.push.particles_nb, o.interactivity.mouse) : 1 == o.interactivity.modes.push.particles_nb ? o.fn.modes.pushParticles(o.interactivity.modes.push.particles_nb, o.interactivity.mouse) : o.interactivity.modes.push.particles_nb > 1 && o.fn.modes.pushParticles(o.interactivity.modes.push.particles_nb);
                    break;
                case"remove":
                    o.fn.modes.removeParticles(o.interactivity.modes.remove.particles_nb);
                    break;
                case"bubble":
                    o.tmp.bubble_clicking = !0;
                    break;
                case"repulse":
                    o.tmp.repulse_clicking = !0, o.tmp.repulse_count = 0, o.tmp.repulse_finish = !1, setTimeout(function () {
                        o.tmp.repulse_clicking = !1
                    }, 1e3 * o.interactivity.modes.repulse.duration)
            }
        })
    }, o.fn.vendors.densityAutoParticles = function () {
        if (o.particles.number.density.enable) {
            var e = o.canvas.el.width * o.canvas.el.height / 1e3;
            o.tmp.retina && (e /= 2 * o.canvas.pxratio);
            var t = e * o.particles.number.value / o.particles.number.density.value_area,
                i = o.particles.array.length - t;
            i < 0 ? o.fn.modes.pushParticles(Math.abs(i)) : o.fn.modes.removeParticles(i)
        }
    }, o.fn.vendors.checkOverlap = function (e, t) {
        for (var i = 0; i < o.particles.array.length; i++) {
            var n = o.particles.array[i], s = e.x - n.x, r = e.y - n.y;
            Math.sqrt(s * s + r * r) <= e.radius + n.radius && (e.x = t ? t.x : Math.random() * o.canvas.w, e.y = t ? t.y : Math.random() * o.canvas.h, o.fn.vendors.checkOverlap(e))
        }
    }, o.fn.vendors.createSvgImg = function (e) {
        var t = /#([0-9A-F]{3,6})/gi, i = o.tmp.source_svg.replace(t, function (t, i, o, n) {
                if (e.color.rgb) s = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + e.opacity + ")"; else var s = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + e.opacity + ")";
                return s
            }), n = new Blob([i], {type: "image/svg+xml;charset=utf-8"}), s = window.URL || window.webkitURL || window,
            r = s.createObjectURL(n), a = new Image;
        a.addEventListener("load", function () {
            e.img.obj = a, e.img.loaded = !0, s.revokeObjectURL(r), o.tmp.count_svg++
        }), a.src = r
    }, o.fn.vendors.destroypJS = function () {
        cancelAnimationFrame(o.fn.drawAnimFrame), i.remove(), pJSDom = null
    }, o.fn.vendors.drawShape = function (e, t, i, o, n, s) {
        var r = n * s, a = n / s, l = 180 * (a - 2) / a, c = Math.PI - Math.PI * l / 180;
        e.save(), e.beginPath(), e.translate(t, i), e.moveTo(0, 0);
        for (var d = 0; d < r; d++)e.lineTo(o, 0), e.translate(o, 0), e.rotate(c);
        e.fill(), e.restore()
    }, o.fn.vendors.exportImg = function () {
        window.open(o.canvas.el.toDataURL("image/png"), "_blank")
    }, o.fn.vendors.loadImg = function (e) {
        if (o.tmp.img_error = void 0, "" != o.particles.shape.image.src)if ("svg" == e) {
            var t = new XMLHttpRequest;
            t.open("GET", o.particles.shape.image.src), t.onreadystatechange = function (e) {
                4 == t.readyState && (200 == t.status ? (o.tmp.source_svg = e.currentTarget.response, o.fn.vendors.checkBeforeDraw()) : (console.log("Error pJS - Image not found"), o.tmp.img_error = !0))
            }, t.send()
        } else {
            var i = new Image;
            i.addEventListener("load", function () {
                o.tmp.img_obj = i, o.fn.vendors.checkBeforeDraw()
            }), i.src = o.particles.shape.image.src
        } else console.log("Error pJS - No image.src"), o.tmp.img_error = !0
    }, o.fn.vendors.draw = function () {
        "image" == o.particles.shape.type ? "svg" == o.tmp.img_type ? o.tmp.count_svg >= o.particles.number.value ? (o.fn.particlesDraw(), o.particles.move.enable ? o.fn.drawAnimFrame = requestAnimFrame(o.fn.vendors.draw) : cancelRequestAnimFrame(o.fn.drawAnimFrame)) : o.tmp.img_error || (o.fn.drawAnimFrame = requestAnimFrame(o.fn.vendors.draw)) : void 0 != o.tmp.img_obj ? (o.fn.particlesDraw(), o.particles.move.enable ? o.fn.drawAnimFrame = requestAnimFrame(o.fn.vendors.draw) : cancelRequestAnimFrame(o.fn.drawAnimFrame)) : o.tmp.img_error || (o.fn.drawAnimFrame = requestAnimFrame(o.fn.vendors.draw)) : (o.fn.particlesDraw(), o.particles.move.enable ? o.fn.drawAnimFrame = requestAnimFrame(o.fn.vendors.draw) : cancelRequestAnimFrame(o.fn.drawAnimFrame))
    }, o.fn.vendors.checkBeforeDraw = function () {
        "image" == o.particles.shape.type ? "svg" == o.tmp.img_type && void 0 == o.tmp.source_svg ? o.tmp.checkAnimFrame = requestAnimFrame(check) : (cancelRequestAnimFrame(o.tmp.checkAnimFrame), o.tmp.img_error || (o.fn.vendors.init(), o.fn.vendors.draw())) : (o.fn.vendors.init(), o.fn.vendors.draw())
    }, o.fn.vendors.init = function () {
        o.fn.retinaInit(), o.fn.canvasInit(), o.fn.canvasSize(), o.fn.canvasPaint(), o.fn.particlesCreate(), o.fn.vendors.densityAutoParticles(), o.particles.line_linked.color_rgb_line = hexToRgb(o.particles.line_linked.color)
    }, o.fn.vendors.start = function () {
        isInArray("image", o.particles.shape.type) ? (o.tmp.img_type = o.particles.shape.image.src.substr(o.particles.shape.image.src.length - 3), o.fn.vendors.loadImg(o.tmp.img_type)) : o.fn.vendors.checkBeforeDraw()
    }, o.fn.vendors.eventsListeners(), o.fn.vendors.start()
};
Object.deepExtend = function (e, t) {
    for (var i in t)t[i] && t[i].constructor && t[i].constructor === Object ? (e[i] = e[i] || {}, arguments.callee(e[i], t[i])) : e[i] = t[i];
    return e
}, window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
        window.setTimeout(e, 1e3 / 60)
    }, window.cancelRequestAnimFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout, window.pJSDom = [], window.particlesJS = function (e, t) {
    "string" != typeof e && (t = e, e = "particles-js"), e || (e = "particles-js");
    var i = document.getElementById(e), o = i.getElementsByClassName("particles-js-canvas-el");
    if (o.length)for (; o.length > 0;)i.removeChild(o[0]);
    var n = document.createElement("canvas");
    n.className = "particles-js-canvas-el", n.style.width = "100%", n.style.height = "100%", null != document.getElementById(e).appendChild(n) && pJSDom.push(new pJS(e, t))
}, window.particlesJS.load = function (e, t, i) {
    var o = new XMLHttpRequest;
    o.open("GET", t), o.onreadystatechange = function (t) {
        if (4 == o.readyState)if (200 == o.status) {
            var n = JSON.parse(t.currentTarget.response);
            window.particlesJS(e, n), i && i()
        } else console.log("Error pJS - XMLHttpRequest status: " + o.status), console.log("Error pJS - File config not found")
    }, o.send()
}, function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function (e) {
    "use strict";
    function t(e) {
        if (e instanceof Date)return e;
        if (String(e).match(r))return String(e).match(/^[0-9]*$/) && (e = Number(e)), String(e).match(/\-/) && (e = String(e).replace(/\-/g, "/")), new Date(e);
        throw new Error("Couldn't cast `" + e + "` to a date object.")
    }

    function i(e) {
        var t = e.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(t)
    }

    function o(e) {
        return function (t) {
            var o = t.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (o)for (var s = 0, r = o.length; s < r; ++s) {
                var a = o[s].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), c = i(a[0]), d = a[1] || "", p = a[3] || "",
                    u = null;
                a = a[2], l.hasOwnProperty(a) && (u = l[a], u = Number(e[u])), null !== u && ("!" === d && (u = n(p, u)), "" === d && u < 10 && (u = "0" + u.toString()), t = t.replace(c, u.toString()))
            }
            return t = t.replace(/%%/, "%")
        }
    }

    function n(e, t) {
        var i = "s", o = "";
        return e && (1 === (e = e.replace(/(:|;|\s)/gi, "").split(/\,/)).length ? i = e[0] : (o = e[0], i = e[1])), Math.abs(t) > 1 ? i : o
    }

    var s = [], r = [], a = {precision: 100, elapse: !1, defer: !1};
    r.push(/^[0-9]*$/.source), r.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), r.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), r = new RegExp(r.join("|"));
    var l = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    }, c = function (t, i, o) {
        this.el = t, this.$el = e(t), this.interval = null, this.offset = {}, this.options = e.extend({}, a), this.instanceNumber = s.length, s.push(this), this.$el.data("countdown-instance", this.instanceNumber), o && ("function" == typeof o ? (this.$el.on("update.countdown", o), this.$el.on("stoped.countdown", o), this.$el.on("finish.countdown", o)) : this.options = e.extend({}, a, o)), this.setFinalDate(i), !1 === this.options.defer && this.start()
    };
    e.extend(c.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var e = this;
            this.update(), this.interval = setInterval(function () {
                e.update.call(e)
            }, this.options.precision)
        }, stop: function () {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        }, toggle: function () {
            this.interval ? this.stop() : this.start()
        }, pause: function () {
            this.stop()
        }, resume: function () {
            this.start()
        }, remove: function () {
            this.stop.call(this), s[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        }, setFinalDate: function (e) {
            this.finalDate = t(e)
        }, update: function () {
            if (0 !== this.$el.closest("html").length) {
                var t, i = void 0 !== e._data(this.el, "events"), o = new Date;
                t = this.finalDate.getTime() - o.getTime(), t = Math.ceil(t / 1e3), t = !this.options.elapse && t < 0 ? 0 : Math.abs(t), this.totalSecsLeft !== t && i && (this.totalSecsLeft = t, this.elapsed = o >= this.finalDate, this.offset = {
                    seconds: this.totalSecsLeft % 60,
                    minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                    hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                    days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                    weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                    weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                    months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                    years: Math.abs(this.finalDate.getFullYear() - o.getFullYear()),
                    totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                    totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                    totalMinutes: Math.floor(this.totalSecsLeft / 60),
                    totalSeconds: this.totalSecsLeft
                }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))
            } else this.remove()
        }, dispatchEvent: function (t) {
            var i = e.Event(t + ".countdown");
            i.finalDate = this.finalDate, i.elapsed = this.elapsed, i.offset = e.extend({}, this.offset), i.strftime = o(this.offset), this.$el.trigger(i)
        }
    }), e.fn.countdown = function () {
        var t = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var i = e(this).data("countdown-instance");
            if (void 0 !== i) {
                var o = s[i], n = t[0];
                c.prototype.hasOwnProperty(n) ? o[n].apply(o, t.slice(1)) : null === String(n).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (o.setFinalDate.call(o, n), o.start()) : e.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, n))
            } else new c(this, t[0], t[1])
        })
    }
}), function (e) {
    "use strict";
    function t(e) {
        var t = {path: !0, query: !0, hash: !0};
        return e ? (/^[a-z]+:/.test(e) && (t.protocol = !0, t.host = !0, /[-a-z0-9]+(\.[-a-z0-9])*:\d+/i.test(e) && (t.port = !0), /\/\/(.*?)(?::(.*?))?@/.test(e) && (t.user = !0, t.pass = !0)), t) : t
    }

    function i(e, i, o) {
        var p, u, f,
            h = a ? "file://" + (process.platform.match(/^win/i) ? "/" : "") + l("fs").realpathSync(".") : document.location.href;
        i || (i = h), a ? p = l("url").parse(i) : (p = document.createElement("a")).href = i;
        var m = t(i);
        f = i.match(/\/\/(.*?)(?::(.*?))?@/) || [];
        for (u in c)m[u] ? e[u] = p[c[u]] || "" : e[u] = "";
        if (e.protocol = e.protocol.replace(/:$/, ""), e.query = e.query.replace(/^\?/, ""), e.hash = n(e.hash.replace(/^#/, "")), e.user = n(f[1] || ""), e.pass = n(f[2] || ""), e.port = d[e.protocol] == e.port || 0 == e.port ? "" : e.port, !m.protocol && /[^/#?]/.test(i.charAt(0)) && (e.path = i.split("?")[0].split("#")[0]), !m.protocol && o) {
            var v = new r(h.match(/(.*\/)/)[0]), g = v.path.split("/"), y = e.path.split("/"),
                b = ["protocol", "user", "pass", "host", "port"], w = b.length;
            for (g.pop(), u = 0; u < w; u++)e[b[u]] = v[b[u]];
            for (; ".." === y[0];)g.pop(), y.shift();
            e.path = ("/" !== i.charAt(0) ? g.join("/") : "") + "/" + y.join("/")
        }
        e.path = e.path.replace(/^\/{2,}/, "/"), e.paths(("/" === e.path.charAt(0) ? e.path.slice(1) : e.path).split("/")), e.query = new s(e.query)
    }

    function o(e) {
        return encodeURIComponent(e).replace(/'/g, "%27")
    }

    function n(e) {
        return e = e.replace(/\+/g, " "), e = e.replace(/%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi, function (e, t, i, o) {
            var n = parseInt(t, 16) - 224, s = parseInt(i, 16) - 128;
            if (0 === n && s < 32)return e;
            var r = (n << 12) + (s << 6) + (parseInt(o, 16) - 128);
            return r > 65535 ? e : String.fromCharCode(r)
        }), (e = e.replace(/%([cd][0-9a-f])%([89ab][0-9a-f])/gi, function (e, t, i) {
            var o = parseInt(t, 16) - 192;
            if (o < 2)return e;
            var n = parseInt(i, 16) - 128;
            return String.fromCharCode((o << 6) + n)
        })).replace(/%([0-7][0-9a-f])/gi, function (e, t) {
            return String.fromCharCode(parseInt(t, 16))
        })
    }

    function s(e) {
        for (var t, i = /([^=&]+)(=([^&]*))?/g; t = i.exec(e);) {
            var o = decodeURIComponent(t[1].replace(/\+/g, " ")), s = t[3] ? n(t[3]) : "";
            void 0 !== this[o] && null !== this[o] ? (this[o] instanceof Array || (this[o] = [this[o]]), this[o].push(s)) : this[o] = s
        }
    }

    function r(e, t) {
        i(this, e, !t)
    }

    var a = "undefined" == typeof window && "undefined" != typeof global && "function" == typeof require,
        l = a ? e.require : null,
        c = {protocol: "protocol", host: "hostname", port: "port", path: "pathname", query: "search", hash: "hash"},
        d = {ftp: 21, gopher: 70, http: 80, https: 443, ws: 80, wss: 443};
    s.prototype.toString = function () {
        var e, t, i = "", n = o;
        for (e in this)if (!(this[e] instanceof Function || null === this[e]))if (this[e] instanceof Array) {
            var s = this[e].length;
            if (s)for (t = 0; t < s; t++)i += i ? "&" : "", i += n(e) + "=" + n(this[e][t]); else i += (i ? "&" : "") + n(e) + "="
        } else i += i ? "&" : "", i += n(e) + "=" + n(this[e]);
        return i
    }, r.prototype.clearQuery = function () {
        for (var e in this.query)this.query[e] instanceof Function || delete this.query[e];
        return this
    }, r.prototype.queryLength = function () {
        var e, t = 0;
        for (e in this)this[e] instanceof Function || t++;
        return t
    }, r.prototype.isEmptyQuery = function () {
        return 0 === this.queryLength()
    }, r.prototype.paths = function (e) {
        var t, i = "", s = 0;
        if (e && e.length && e + "" !== e) {
            for (this.isAbsolute() && (i = "/"), t = e.length; s < t; s++)e[s] = !s && e[s].match(/^\w:$/) ? e[s] : o(e[s]);
            this.path = i + e.join("/")
        }
        for (s = 0, t = (e = ("/" === this.path.charAt(0) ? this.path.slice(1) : this.path).split("/")).length; s < t; s++)e[s] = n(e[s]);
        return e
    }, r.prototype.encode = o, r.prototype.decode = n, r.prototype.isAbsolute = function () {
        return this.protocol || "/" === this.path.charAt(0)
    }, r.prototype.toString = function () {
        return (this.protocol && this.protocol + "://") + (this.user && o(this.user) + (this.pass && ":" + o(this.pass)) + "@") + (this.host && this.host) + (this.port && ":" + this.port) + (this.path && this.path) + (this.query.toString() && "?" + this.query) + (this.hash && "#" + o(this.hash))
    }, e[e.exports ? "exports" : "Url"] = r
}("undefined" != typeof module && module.exports ? module : window), function () {
    var e, t, i, o, n, s = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }, r = [].indexOf || function (e) {
            for (var t = 0, i = this.length; t < i; t++)if (t in this && this[t] === e)return t;
            return -1
        };
    t = function () {
        function e() {
        }

        return e.prototype.extend = function (e, t) {
            var i, o;
            for (i in t)o = t[i], null == e[i] && (e[i] = o);
            return e
        }, e.prototype.isMobile = function (e) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
        }, e.prototype.createEvent = function (e, t, i, o) {
            var n;
            return null == t && (t = !1), null == i && (i = !1), null == o && (o = null), null != document.createEvent ? (n = document.createEvent("CustomEvent")).initCustomEvent(e, t, i, o) : null != document.createEventObject ? (n = document.createEventObject()).eventType = e : n.eventName = e, n
        }, e.prototype.emitEvent = function (e, t) {
            return null != e.dispatchEvent ? e.dispatchEvent(t) : t in (null != e) ? e[t]() : "on" + t in (null != e) ? e["on" + t]() : void 0
        }, e.prototype.addEvent = function (e, t, i) {
            return null != e.addEventListener ? e.addEventListener(t, i, !1) : null != e.attachEvent ? e.attachEvent("on" + t, i) : e[t] = i
        }, e.prototype.removeEvent = function (e, t, i) {
            return null != e.removeEventListener ? e.removeEventListener(t, i, !1) : null != e.detachEvent ? e.detachEvent("on" + t, i) : delete e[t]
        }, e.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, e
    }(), i = this.WeakMap || this.MozWeakMap || (i = function () {
            function e() {
                this.keys = [], this.values = []
            }

            return e.prototype.get = function (e) {
                var t, i, o, n;
                for (t = i = 0, o = (n = this.keys).length; i < o; t = ++i)if (n[t] === e)return this.values[t]
            }, e.prototype.set = function (e, t) {
                var i, o, n, s;
                for (i = o = 0, n = (s = this.keys).length; o < n; i = ++o)if (s[i] === e)return void(this.values[i] = t);
                return this.keys.push(e), this.values.push(t)
            }, e
        }()), e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function () {
            function e() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }

            return e.notSupported = !0, e.prototype.observe = function () {
            }, e
        }()), o = this.getComputedStyle || function (e, t) {
            return this.getPropertyValue = function (t) {
                var i;
                return "float" === t && (t = "styleFloat"), n.test(t) && t.replace(n, function (e, t) {
                    return t.toUpperCase()
                }), (null != (i = e.currentStyle) ? i[t] : void 0) || null
            }, this
        }, n = /(\-([a-z]){1})/g, this.WOW = function () {
        function n(e) {
            null == e && (e = {}), this.scrollCallback = s(this.scrollCallback, this), this.scrollHandler = s(this.scrollHandler, this), this.resetAnimation = s(this.resetAnimation, this), this.start = s(this.start, this), this.scrolled = !0, this.config = this.util().extend(e, this.defaults), null != e.scrollContainer && (this.config.scrollContainer = document.querySelector(e.scrollContainer)), this.animationNameCache = new i, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }

        return n.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, n.prototype.init = function () {
            var e;
            return this.element = window.document.documentElement, "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, n.prototype.start = function () {
            var t, i, o, n;
            if (this.stopped = !1, this.boxes = function () {
                    var e, i, o, n;
                    for (n = [], e = 0, i = (o = this.element.querySelectorAll("." + this.config.boxClass)).length; e < i; e++)t = o[e], n.push(t);
                    return n
                }.call(this), this.all = function () {
                    var e, i, o, n;
                    for (n = [], e = 0, i = (o = this.boxes).length; e < i; e++)t = o[e], n.push(t);
                    return n
                }.call(this), this.boxes.length)if (this.disabled()) this.resetStyle(); else for (i = 0, o = (n = this.boxes).length; i < o; i++)t = n[i], this.applyStyle(t, !0);
            if (this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live)return new e(function (e) {
                return function (t) {
                    var i, o, n, s, r;
                    for (r = [], i = 0, o = t.length; i < o; i++)s = t[i], r.push(function () {
                        var e, t, i, o;
                        for (o = [], e = 0, t = (i = s.addedNodes || []).length; e < t; e++)n = i[e], o.push(this.doSync(n));
                        return o
                    }.call(e));
                    return r
                }
            }(this)).observe(document.body, {childList: !0, subtree: !0})
        }, n.prototype.stop = function () {
            if (this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval)return clearInterval(this.interval)
        }, n.prototype.sync = function (t) {
            if (e.notSupported)return this.doSync(this.element)
        }, n.prototype.doSync = function (e) {
            var t, i, o, n, s;
            if (null == e && (e = this.element), 1 === e.nodeType) {
                for (s = [], i = 0, o = (n = (e = e.parentNode || e).querySelectorAll("." + this.config.boxClass)).length; i < o; i++)t = n[i], r.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0), s.push(this.scrolled = !0)) : s.push(void 0);
                return s
            }
        }, n.prototype.show = function (e) {
            return this.applyStyle(e), e.className = e.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(e), this.util().emitEvent(e, this.wowEvent), this.util().addEvent(e, "animationend", this.resetAnimation), this.util().addEvent(e, "oanimationend", this.resetAnimation), this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation), e
        }, n.prototype.applyStyle = function (e, t) {
            var i, o, n;
            return o = e.getAttribute("data-wow-duration"), i = e.getAttribute("data-wow-delay"), n = e.getAttribute("data-wow-iteration"), this.animate(function (s) {
                return function () {
                    return s.customStyle(e, t, o, i, n)
                }
            }(this))
        }, n.prototype.animate = "requestAnimationFrame" in window ? function (e) {
            return window.requestAnimationFrame(e)
        } : function (e) {
            return e()
        }, n.prototype.resetStyle = function () {
            var e, t, i, o, n;
            for (n = [], t = 0, i = (o = this.boxes).length; t < i; t++)e = o[t], n.push(e.style.visibility = "visible");
            return n
        }, n.prototype.resetAnimation = function (e) {
            var t;
            if (e.type.toLowerCase().indexOf("animationend") >= 0)return t = e.target || e.srcElement, t.className = t.className.replace(this.config.animateClass, "").trim()
        }, n.prototype.customStyle = function (e, t, i, o, n) {
            return t && this.cacheAnimationName(e), e.style.visibility = t ? "hidden" : "visible", i && this.vendorSet(e.style, {animationDuration: i}), o && this.vendorSet(e.style, {animationDelay: o}), n && this.vendorSet(e.style, {animationIterationCount: n}), this.vendorSet(e.style, {animationName: t ? "none" : this.cachedAnimationName(e)}), e
        }, n.prototype.vendors = ["moz", "webkit"], n.prototype.vendorSet = function (e, t) {
            var i, o, n, s;
            o = [];
            for (i in t)n = t[i], e["" + i] = n, o.push(function () {
                var t, o, r, a;
                for (a = [], t = 0, o = (r = this.vendors).length; t < o; t++)s = r[t], a.push(e["" + s + i.charAt(0).toUpperCase() + i.substr(1)] = n);
                return a
            }.call(this));
            return o
        }, n.prototype.vendorCSS = function (e, t) {
            var i, n, s, r, a, l;
            for (r = (a = o(e)).getPropertyCSSValue(t), i = 0, n = (s = this.vendors).length; i < n; i++)l = s[i], r = r || a.getPropertyCSSValue("-" + l + "-" + t);
            return r
        }, n.prototype.animationName = function (e) {
            var t;
            try {
                t = this.vendorCSS(e, "animation-name").cssText
            } catch (i) {
                t = o(e).getPropertyValue("animation-name")
            }
            return "none" === t ? "" : t
        }, n.prototype.cacheAnimationName = function (e) {
            return this.animationNameCache.set(e, this.animationName(e))
        }, n.prototype.cachedAnimationName = function (e) {
            return this.animationNameCache.get(e)
        }, n.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, n.prototype.scrollCallback = function () {
            var e;
            if (this.scrolled && (this.scrolled = !1, this.boxes = function () {
                    var t, i, o, n;
                    for (n = [], t = 0, i = (o = this.boxes).length; t < i; t++)(e = o[t]) && (this.isVisible(e) ? this.show(e) : n.push(e));
                    return n
                }.call(this), !this.boxes.length && !this.config.live))return this.stop()
        }, n.prototype.offsetTop = function (e) {
            for (var t; void 0 === e.offsetTop;)e = e.parentNode;
            for (t = e.offsetTop; e = e.offsetParent;)t += e.offsetTop;
            return t
        }, n.prototype.isVisible = function (e) {
            var t, i, o, n, s;
            return i = e.getAttribute("data-wow-offset") || this.config.offset, s = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, n = s + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, o = this.offsetTop(e), t = o + e.clientHeight, o <= n && t >= s
        }, n.prototype.util = function () {
            return null != this._util ? this._util : this._util = new t
        }, n.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, n
    }()
}.call(this);
