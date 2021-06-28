/**
 * MIT License
 *
 * Copyright (c) 2020 动中之动 江夏尧
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t = function (e, r) {
    return (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
            function (t, e) {
                t.__proto__ = e;
            }) ||
        function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        })(e, r);
};
function e(e, r) {
    function n() {
        this.constructor = e;
    }
    t(e, r),
        (e.prototype =
            null === r
                ? Object.create(r)
                : ((n.prototype = r.prototype), new n()));
}
function r(t) {
    return "function" == typeof t;
}
var n = !1,
    o = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
            t && new Error().stack;
            n = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
            return n;
        }
    };
function i(t) {
    setTimeout(function () {
        throw t;
    }, 0);
}
var s = {
        closed: !0,
        next: function (t) {},
        error: function (t) {
            if (o.useDeprecatedSynchronousErrorHandling) throw t;
            i(t);
        },
        complete: function () {}
    },
    u = (function () {
        return (
            Array.isArray ||
            function (t) {
                return t && "number" == typeof t.length;
            }
        );
    })();
function c(t) {
    return null !== t && "object" == typeof t;
}
var a = (function () {
        function t(t) {
            return (
                Error.call(this),
                (this.message = t
                    ? t.length +
                      " errors occurred during unsubscription:\n" +
                      t
                          .map(function (t, e) {
                              return e + 1 + ") " + t.toString();
                          })
                          .join("\n  ")
                    : ""),
                (this.name = "UnsubscriptionError"),
                (this.errors = t),
                this
            );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
    })(),
    l = (function () {
        function t(t) {
            (this.closed = !1),
                (this._parentOrParents = null),
                (this._subscriptions = null),
                t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
        }
        return (
            (t.prototype.unsubscribe = function () {
                var e;
                if (!this.closed) {
                    var n = this,
                        o = n._parentOrParents,
                        i = n._ctorUnsubscribe,
                        s = n._unsubscribe,
                        l = n._subscriptions;
                    if (
                        ((this.closed = !0),
                        (this._parentOrParents = null),
                        (this._subscriptions = null),
                        o instanceof t)
                    )
                        o.remove(this);
                    else if (null !== o)
                        for (var h = 0; h < o.length; ++h) {
                            o[h].remove(this);
                        }
                    if (r(s)) {
                        i && (this._unsubscribe = void 0);
                        try {
                            s.call(this);
                        } catch (t) {
                            e = t instanceof a ? p(t.errors) : [t];
                        }
                    }
                    if (u(l)) {
                        h = -1;
                        for (var f = l.length; ++h < f; ) {
                            var d = l[h];
                            if (c(d))
                                try {
                                    d.unsubscribe();
                                } catch (t) {
                                    (e = e || []),
                                        t instanceof a
                                            ? (e = e.concat(p(t.errors)))
                                            : e.push(t);
                                }
                        }
                    }
                    if (e) throw new a(e);
                }
            }),
            (t.prototype.add = function (e) {
                var r = e;
                if (!e) return t.EMPTY;
                switch (typeof e) {
                    case "function":
                        r = new t(e);
                    case "object":
                        if (
                            r === this ||
                            r.closed ||
                            "function" != typeof r.unsubscribe
                        )
                            return r;
                        if (this.closed) return r.unsubscribe(), r;
                        if (!(r instanceof t)) {
                            var n = r;
                            (r = new t())._subscriptions = [n];
                        }
                        break;
                    default:
                        throw new Error(
                            "unrecognized teardown " +
                                e +
                                " added to Subscription."
                        );
                }
                var o = r._parentOrParents;
                if (null === o) r._parentOrParents = this;
                else if (o instanceof t) {
                    if (o === this) return r;
                    r._parentOrParents = [o, this];
                } else {
                    if (-1 !== o.indexOf(this)) return r;
                    o.push(this);
                }
                var i = this._subscriptions;
                return null === i ? (this._subscriptions = [r]) : i.push(r), r;
            }),
            (t.prototype.remove = function (t) {
                var e = this._subscriptions;
                if (e) {
                    var r = e.indexOf(t);
                    -1 !== r && e.splice(r, 1);
                }
            }),
            (t.EMPTY = (function (t) {
                return (t.closed = !0), t;
            })(new t())),
            t
        );
    })();
function p(t) {
    return t.reduce(function (t, e) {
        return t.concat(e instanceof a ? e.errors : e);
    }, []);
}
var h = (function () {
        return "function" == typeof Symbol
            ? Symbol("rxSubscriber")
            : "@@rxSubscriber_" + Math.random();
    })(),
    f = (function (t) {
        function r(e, n, o) {
            var i = t.call(this) || this;
            switch (
                ((i.syncErrorValue = null),
                (i.syncErrorThrown = !1),
                (i.syncErrorThrowable = !1),
                (i.isStopped = !1),
                arguments.length)
            ) {
                case 0:
                    i.destination = s;
                    break;
                case 1:
                    if (!e) {
                        i.destination = s;
                        break;
                    }
                    if ("object" == typeof e) {
                        e instanceof r
                            ? ((i.syncErrorThrowable = e.syncErrorThrowable),
                              (i.destination = e),
                              e.add(i))
                            : ((i.syncErrorThrowable = !0),
                              (i.destination = new d(i, e)));
                        break;
                    }
                default:
                    (i.syncErrorThrowable = !0),
                        (i.destination = new d(i, e, n, o));
            }
            return i;
        }
        return (
            e(r, t),
            (r.prototype[h] = function () {
                return this;
            }),
            (r.create = function (t, e, n) {
                var o = new r(t, e, n);
                return (o.syncErrorThrowable = !1), o;
            }),
            (r.prototype.next = function (t) {
                this.isStopped || this._next(t);
            }),
            (r.prototype.error = function (t) {
                this.isStopped || ((this.isStopped = !0), this._error(t));
            }),
            (r.prototype.complete = function () {
                this.isStopped || ((this.isStopped = !0), this._complete());
            }),
            (r.prototype.unsubscribe = function () {
                this.closed ||
                    ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
            }),
            (r.prototype._next = function (t) {
                this.destination.next(t);
            }),
            (r.prototype._error = function (t) {
                this.destination.error(t), this.unsubscribe();
            }),
            (r.prototype._complete = function () {
                this.destination.complete(), this.unsubscribe();
            }),
            (r.prototype._unsubscribeAndRecycle = function () {
                var t = this._parentOrParents;
                return (
                    (this._parentOrParents = null),
                    this.unsubscribe(),
                    (this.closed = !1),
                    (this.isStopped = !1),
                    (this._parentOrParents = t),
                    this
                );
            }),
            r
        );
    })(l),
    d = (function (t) {
        function n(e, n, o, i) {
            var u,
                c = t.call(this) || this;
            c._parentSubscriber = e;
            var a = c;
            return (
                r(n)
                    ? (u = n)
                    : n &&
                      ((u = n.next),
                      (o = n.error),
                      (i = n.complete),
                      n !== s &&
                          (r((a = Object.create(n)).unsubscribe) &&
                              c.add(a.unsubscribe.bind(a)),
                          (a.unsubscribe = c.unsubscribe.bind(c)))),
                (c._context = a),
                (c._next = u),
                (c._error = o),
                (c._complete = i),
                c
            );
        }
        return (
            e(n, t),
            (n.prototype.next = function (t) {
                if (!this.isStopped && this._next) {
                    var e = this._parentSubscriber;
                    o.useDeprecatedSynchronousErrorHandling &&
                    e.syncErrorThrowable
                        ? this.__tryOrSetError(e, this._next, t) &&
                          this.unsubscribe()
                        : this.__tryOrUnsub(this._next, t);
                }
            }),
            (n.prototype.error = function (t) {
                if (!this.isStopped) {
                    var e = this._parentSubscriber,
                        r = o.useDeprecatedSynchronousErrorHandling;
                    if (this._error)
                        r && e.syncErrorThrowable
                            ? (this.__tryOrSetError(e, this._error, t),
                              this.unsubscribe())
                            : (this.__tryOrUnsub(this._error, t),
                              this.unsubscribe());
                    else if (e.syncErrorThrowable)
                        r
                            ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0))
                            : i(t),
                            this.unsubscribe();
                    else {
                        if ((this.unsubscribe(), r)) throw t;
                        i(t);
                    }
                }
            }),
            (n.prototype.complete = function () {
                var t = this;
                if (!this.isStopped) {
                    var e = this._parentSubscriber;
                    if (this._complete) {
                        var r = function () {
                            return t._complete.call(t._context);
                        };
                        o.useDeprecatedSynchronousErrorHandling &&
                        e.syncErrorThrowable
                            ? (this.__tryOrSetError(e, r), this.unsubscribe())
                            : (this.__tryOrUnsub(r), this.unsubscribe());
                    } else this.unsubscribe();
                }
            }),
            (n.prototype.__tryOrUnsub = function (t, e) {
                try {
                    t.call(this._context, e);
                } catch (t) {
                    if (
                        (this.unsubscribe(),
                        o.useDeprecatedSynchronousErrorHandling)
                    )
                        throw t;
                    i(t);
                }
            }),
            (n.prototype.__tryOrSetError = function (t, e, r) {
                if (!o.useDeprecatedSynchronousErrorHandling)
                    throw new Error("bad call");
                try {
                    e.call(this._context, r);
                } catch (e) {
                    return o.useDeprecatedSynchronousErrorHandling
                        ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0), !0)
                        : (i(e), !0);
                }
                return !1;
            }),
            (n.prototype._unsubscribe = function () {
                var t = this._parentSubscriber;
                (this._context = null),
                    (this._parentSubscriber = null),
                    t.unsubscribe();
            }),
            n
        );
    })(f);
var y = (function () {
    return ("function" == typeof Symbol && Symbol.observable) || "@@observable";
})();
function b(t) {
    return t;
}
function v() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return _(t);
}
function _(t) {
    return 0 === t.length
        ? b
        : 1 === t.length
        ? t[0]
        : function (e) {
              return t.reduce(function (t, e) {
                  return e(t);
              }, e);
          };
}
var m = (function () {
    function t(t) {
        (this._isScalar = !1), t && (this._subscribe = t);
    }
    return (
        (t.prototype.lift = function (e) {
            var r = new t();
            return (r.source = this), (r.operator = e), r;
        }),
        (t.prototype.subscribe = function (t, e, r) {
            var n = this.operator,
                i = (function (t, e, r) {
                    if (t) {
                        if (t instanceof f) return t;
                        if (t[h]) return t[h]();
                    }
                    return t || e || r ? new f(t, e, r) : new f(s);
                })(t, e, r);
            if (
                (n
                    ? i.add(n.call(i, this.source))
                    : i.add(
                          this.source ||
                              (o.useDeprecatedSynchronousErrorHandling &&
                                  !i.syncErrorThrowable)
                              ? this._subscribe(i)
                              : this._trySubscribe(i)
                      ),
                o.useDeprecatedSynchronousErrorHandling &&
                    i.syncErrorThrowable &&
                    ((i.syncErrorThrowable = !1), i.syncErrorThrown))
            )
                throw i.syncErrorValue;
            return i;
        }),
        (t.prototype._trySubscribe = function (t) {
            try {
                return this._subscribe(t);
            } catch (e) {
                o.useDeprecatedSynchronousErrorHandling &&
                    ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                    !(function (t) {
                        for (; t; ) {
                            var e = t,
                                r = e.closed,
                                n = e.destination,
                                o = e.isStopped;
                            if (r || o) return !1;
                            t = n && n instanceof f ? n : null;
                        }
                        return !0;
                    })(t)
                        ? console.warn(e)
                        : t.error(e);
            }
        }),
        (t.prototype.forEach = function (t, e) {
            var r = this;
            return new (e = g(e))(function (e, n) {
                var o;
                o = r.subscribe(
                    function (e) {
                        try {
                            t(e);
                        } catch (t) {
                            n(t), o && o.unsubscribe();
                        }
                    },
                    n,
                    e
                );
            });
        }),
        (t.prototype._subscribe = function (t) {
            var e = this.source;
            return e && e.subscribe(t);
        }),
        (t.prototype[y] = function () {
            return this;
        }),
        (t.prototype.pipe = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            return 0 === t.length ? this : _(t)(this);
        }),
        (t.prototype.toPromise = function (t) {
            var e = this;
            return new (t = g(t))(function (t, r) {
                var n;
                e.subscribe(
                    function (t) {
                        return (n = t);
                    },
                    function (t) {
                        return r(t);
                    },
                    function () {
                        return t(n);
                    }
                );
            });
        }),
        (t.create = function (e) {
            return new t(e);
        }),
        t
    );
})();
function g(t) {
    if ((t || (t = Promise), !t)) throw new Error("no Promise impl found");
    return t;
}
var w = (function () {
        function t() {
            return (
                Error.call(this),
                (this.message = "object unsubscribed"),
                (this.name = "ObjectUnsubscribedError"),
                this
            );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
    })(),
    j = (function (t) {
        function r(e, r) {
            var n = t.call(this) || this;
            return (n.subject = e), (n.subscriber = r), (n.closed = !1), n;
        }
        return (
            e(r, t),
            (r.prototype.unsubscribe = function () {
                if (!this.closed) {
                    this.closed = !0;
                    var t = this.subject,
                        e = t.observers;
                    if (
                        ((this.subject = null),
                        e && 0 !== e.length && !t.isStopped && !t.closed)
                    ) {
                        var r = e.indexOf(this.subscriber);
                        -1 !== r && e.splice(r, 1);
                    }
                }
            }),
            r
        );
    })(l),
    S = (function (t) {
        function r(e) {
            var r = t.call(this, e) || this;
            return (r.destination = e), r;
        }
        return e(r, t), r;
    })(f),
    x = (function (t) {
        function r() {
            var e = t.call(this) || this;
            return (
                (e.observers = []),
                (e.closed = !1),
                (e.isStopped = !1),
                (e.hasError = !1),
                (e.thrownError = null),
                e
            );
        }
        return (
            e(r, t),
            (r.prototype[h] = function () {
                return new S(this);
            }),
            (r.prototype.lift = function (t) {
                var e = new O(this, this);
                return (e.operator = t), e;
            }),
            (r.prototype.next = function (t) {
                if (this.closed) throw new w();
                if (!this.isStopped)
                    for (
                        var e = this.observers,
                            r = e.length,
                            n = e.slice(),
                            o = 0;
                        o < r;
                        o++
                    )
                        n[o].next(t);
            }),
            (r.prototype.error = function (t) {
                if (this.closed) throw new w();
                (this.hasError = !0),
                    (this.thrownError = t),
                    (this.isStopped = !0);
                for (
                    var e = this.observers, r = e.length, n = e.slice(), o = 0;
                    o < r;
                    o++
                )
                    n[o].error(t);
                this.observers.length = 0;
            }),
            (r.prototype.complete = function () {
                if (this.closed) throw new w();
                this.isStopped = !0;
                for (
                    var t = this.observers, e = t.length, r = t.slice(), n = 0;
                    n < e;
                    n++
                )
                    r[n].complete();
                this.observers.length = 0;
            }),
            (r.prototype.unsubscribe = function () {
                (this.isStopped = !0),
                    (this.closed = !0),
                    (this.observers = null);
            }),
            (r.prototype._trySubscribe = function (e) {
                if (this.closed) throw new w();
                return t.prototype._trySubscribe.call(this, e);
            }),
            (r.prototype._subscribe = function (t) {
                if (this.closed) throw new w();
                return this.hasError
                    ? (t.error(this.thrownError), l.EMPTY)
                    : this.isStopped
                    ? (t.complete(), l.EMPTY)
                    : (this.observers.push(t), new j(this, t));
            }),
            (r.prototype.asObservable = function () {
                var t = new m();
                return (t.source = this), t;
            }),
            (r.create = function (t, e) {
                return new O(t, e);
            }),
            r
        );
    })(m),
    O = (function (t) {
        function r(e, r) {
            var n = t.call(this) || this;
            return (n.destination = e), (n.source = r), n;
        }
        return (
            e(r, t),
            (r.prototype.next = function (t) {
                var e = this.destination;
                e && e.next && e.next(t);
            }),
            (r.prototype.error = function (t) {
                var e = this.destination;
                e && e.error && this.destination.error(t);
            }),
            (r.prototype.complete = function () {
                var t = this.destination;
                t && t.complete && this.destination.complete();
            }),
            (r.prototype._subscribe = function (t) {
                return this.source ? this.source.subscribe(t) : l.EMPTY;
            }),
            r
        );
    })(x),
    E = (function (t) {
        function r(e, r) {
            var n = t.call(this, e, r) || this;
            return (n.scheduler = e), (n.work = r), (n.pending = !1), n;
        }
        return (
            e(r, t),
            (r.prototype.schedule = function (t, e) {
                if ((void 0 === e && (e = 0), this.closed)) return this;
                this.state = t;
                var r = this.id,
                    n = this.scheduler;
                return (
                    null != r && (this.id = this.recycleAsyncId(n, r, e)),
                    (this.pending = !0),
                    (this.delay = e),
                    (this.id = this.id || this.requestAsyncId(n, this.id, e)),
                    this
                );
            }),
            (r.prototype.requestAsyncId = function (t, e, r) {
                return (
                    void 0 === r && (r = 0),
                    setInterval(t.flush.bind(t, this), r)
                );
            }),
            (r.prototype.recycleAsyncId = function (t, e, r) {
                if (
                    (void 0 === r && (r = 0),
                    null !== r && this.delay === r && !1 === this.pending)
                )
                    return e;
                clearInterval(e);
            }),
            (r.prototype.execute = function (t, e) {
                if (this.closed)
                    return new Error("executing a cancelled action");
                this.pending = !1;
                var r = this._execute(t, e);
                if (r) return r;
                !1 === this.pending &&
                    null != this.id &&
                    (this.id = this.recycleAsyncId(
                        this.scheduler,
                        this.id,
                        null
                    ));
            }),
            (r.prototype._execute = function (t, e) {
                var r = !1,
                    n = void 0;
                try {
                    this.work(t);
                } catch (t) {
                    (r = !0), (n = (!!t && t) || new Error(t));
                }
                if (r) return this.unsubscribe(), n;
            }),
            (r.prototype._unsubscribe = function () {
                var t = this.id,
                    e = this.scheduler,
                    r = e.actions,
                    n = r.indexOf(this);
                (this.work = null),
                    (this.state = null),
                    (this.pending = !1),
                    (this.scheduler = null),
                    -1 !== n && r.splice(n, 1),
                    null != t && (this.id = this.recycleAsyncId(e, t, null)),
                    (this.delay = null);
            }),
            r
        );
    })(
        (function (t) {
            function r(e, r) {
                return t.call(this) || this;
            }
            return (
                e(r, t),
                (r.prototype.schedule = function (t, e) {
                    return this;
                }),
                r
            );
        })(l)
    ),
    k = (function () {
        function t(e, r) {
            void 0 === r && (r = t.now),
                (this.SchedulerAction = e),
                (this.now = r);
        }
        return (
            (t.prototype.schedule = function (t, e, r) {
                return (
                    void 0 === e && (e = 0),
                    new this.SchedulerAction(this, t).schedule(r, e)
                );
            }),
            (t.now = function () {
                return Date.now();
            }),
            t
        );
    })(),
    A = (function (t) {
        function r(e, n) {
            void 0 === n && (n = k.now);
            var o =
                t.call(this, e, function () {
                    return r.delegate && r.delegate !== o
                        ? r.delegate.now()
                        : n();
                }) || this;
            return (o.actions = []), (o.active = !1), (o.scheduled = void 0), o;
        }
        return (
            e(r, t),
            (r.prototype.schedule = function (e, n, o) {
                return (
                    void 0 === n && (n = 0),
                    r.delegate && r.delegate !== this
                        ? r.delegate.schedule(e, n, o)
                        : t.prototype.schedule.call(this, e, n, o)
                );
            }),
            (r.prototype.flush = function (t) {
                var e = this.actions;
                if (this.active) e.push(t);
                else {
                    var r;
                    this.active = !0;
                    do {
                        if ((r = t.execute(t.state, t.delay))) break;
                    } while ((t = e.shift()));
                    if (((this.active = !1), r)) {
                        for (; (t = e.shift()); ) t.unsubscribe();
                        throw r;
                    }
                }
            }),
            r
        );
    })(k),
    T = new m(function (t) {
        return t.complete();
    });
function I(t) {
    return t && "function" == typeof t.schedule;
}
var P = function (t) {
    return function (e) {
        for (var r = 0, n = t.length; r < n && !e.closed; r++) e.next(t[r]);
        e.complete();
    };
};
function D(t, e) {
    return new m(function (r) {
        var n = new l(),
            o = 0;
        return (
            n.add(
                e.schedule(function () {
                    o !== t.length
                        ? (r.next(t[o++]), r.closed || n.add(this.schedule()))
                        : r.complete();
                })
            ),
            n
        );
    });
}
function C(t, e) {
    return e ? D(t, e) : new m(P(t));
}
function F() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    var r = t[t.length - 1];
    return I(r) ? (t.pop(), D(t, r)) : C(t);
}
var L = new A(E);
function U() {}
function R(t, e) {
    return function (r) {
        if ("function" != typeof t)
            throw new TypeError(
                "argument is not a function. Are you looking for `mapTo()`?"
            );
        return r.lift(new z(t, e));
    };
}
var z = (function () {
        function t(t, e) {
            (this.project = t), (this.thisArg = e);
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(new N(t, this.project, this.thisArg));
            }),
            t
        );
    })(),
    N = (function (t) {
        function r(e, r, n) {
            var o = t.call(this, e) || this;
            return (o.project = r), (o.count = 0), (o.thisArg = n || o), o;
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                var e;
                try {
                    e = this.project.call(this.thisArg, t, this.count++);
                } catch (t) {
                    return void this.destination.error(t);
                }
                this.destination.next(e);
            }),
            r
        );
    })(f),
    $ = (function (t) {
        function r() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            e(r, t),
            (r.prototype.notifyNext = function (t, e, r, n, o) {
                this.destination.next(e);
            }),
            (r.prototype.notifyError = function (t, e) {
                this.destination.error(t);
            }),
            (r.prototype.notifyComplete = function (t) {
                this.destination.complete();
            }),
            r
        );
    })(f),
    M = (function (t) {
        function r(e, r, n) {
            var o = t.call(this) || this;
            return (
                (o.parent = e),
                (o.outerValue = r),
                (o.outerIndex = n),
                (o.index = 0),
                o
            );
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                this.parent.notifyNext(
                    this.outerValue,
                    t,
                    this.outerIndex,
                    this.index++,
                    this
                );
            }),
            (r.prototype._error = function (t) {
                this.parent.notifyError(t, this), this.unsubscribe();
            }),
            (r.prototype._complete = function () {
                this.parent.notifyComplete(this), this.unsubscribe();
            }),
            r
        );
    })(f);
function B() {
    return "function" == typeof Symbol && Symbol.iterator
        ? Symbol.iterator
        : "@@iterator";
}
var V = B(),
    H = function (t) {
        return t && "number" == typeof t.length && "function" != typeof t;
    };
function Y(t) {
    return (
        !!t && "function" != typeof t.subscribe && "function" == typeof t.then
    );
}
var q = function (t) {
    if (t && "function" == typeof t[y])
        return (
            (n = t),
            function (t) {
                var e = n[y]();
                if ("function" != typeof e.subscribe)
                    throw new TypeError(
                        "Provided object does not correctly implement Symbol.observable"
                    );
                return e.subscribe(t);
            }
        );
    if (H(t)) return P(t);
    if (Y(t))
        return (
            (r = t),
            function (t) {
                return (
                    r
                        .then(
                            function (e) {
                                t.closed || (t.next(e), t.complete());
                            },
                            function (e) {
                                return t.error(e);
                            }
                        )
                        .then(null, i),
                    t
                );
            }
        );
    if (t && "function" == typeof t[V])
        return (
            (e = t),
            function (t) {
                for (var r = e[V](); ; ) {
                    var n = void 0;
                    try {
                        n = r.next();
                    } catch (e) {
                        return t.error(e), t;
                    }
                    if (n.done) {
                        t.complete();
                        break;
                    }
                    if ((t.next(n.value), t.closed)) break;
                }
                return (
                    "function" == typeof r.return &&
                        t.add(function () {
                            r.return && r.return();
                        }),
                    t
                );
            }
        );
    var e,
        r,
        n,
        o = c(t) ? "an invalid object" : "'" + t + "'";
    throw new TypeError(
        "You provided " +
            o +
            " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."
    );
};
function X(t, e) {
    if (null != t) {
        if (
            (function (t) {
                return t && "function" == typeof t[y];
            })(t)
        )
            return (function (t, e) {
                return new m(function (r) {
                    var n = new l();
                    return (
                        n.add(
                            e.schedule(function () {
                                var o = t[y]();
                                n.add(
                                    o.subscribe({
                                        next: function (t) {
                                            n.add(
                                                e.schedule(function () {
                                                    return r.next(t);
                                                })
                                            );
                                        },
                                        error: function (t) {
                                            n.add(
                                                e.schedule(function () {
                                                    return r.error(t);
                                                })
                                            );
                                        },
                                        complete: function () {
                                            n.add(
                                                e.schedule(function () {
                                                    return r.complete();
                                                })
                                            );
                                        }
                                    })
                                );
                            })
                        ),
                        n
                    );
                });
            })(t, e);
        if (Y(t))
            return (function (t, e) {
                return new m(function (r) {
                    var n = new l();
                    return (
                        n.add(
                            e.schedule(function () {
                                return t.then(
                                    function (t) {
                                        n.add(
                                            e.schedule(function () {
                                                r.next(t),
                                                    n.add(
                                                        e.schedule(function () {
                                                            return r.complete();
                                                        })
                                                    );
                                            })
                                        );
                                    },
                                    function (t) {
                                        n.add(
                                            e.schedule(function () {
                                                return r.error(t);
                                            })
                                        );
                                    }
                                );
                            })
                        ),
                        n
                    );
                });
            })(t, e);
        if (H(t)) return D(t, e);
        if (
            (function (t) {
                return t && "function" == typeof t[V];
            })(t) ||
            "string" == typeof t
        )
            return (function (t, e) {
                if (!t) throw new Error("Iterable cannot be null");
                return new m(function (r) {
                    var n,
                        o = new l();
                    return (
                        o.add(function () {
                            n && "function" == typeof n.return && n.return();
                        }),
                        o.add(
                            e.schedule(function () {
                                (n = t[V]()),
                                    o.add(
                                        e.schedule(function () {
                                            if (!r.closed) {
                                                var t, e;
                                                try {
                                                    var o = n.next();
                                                    (t = o.value), (e = o.done);
                                                } catch (t) {
                                                    return void r.error(t);
                                                }
                                                e
                                                    ? r.complete()
                                                    : (r.next(t),
                                                      this.schedule());
                                            }
                                        })
                                    );
                            })
                        ),
                        o
                    );
                });
            })(t, e);
    }
    throw new TypeError(((null !== t && typeof t) || t) + " is not observable");
}
function W(t, e) {
    return e ? X(t, e) : t instanceof m ? t : new m(q(t));
}
var J = (function (t) {
        function r(e) {
            var r = t.call(this) || this;
            return (r.parent = e), r;
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                this.parent.notifyNext(t);
            }),
            (r.prototype._error = function (t) {
                this.parent.notifyError(t), this.unsubscribe();
            }),
            (r.prototype._complete = function () {
                this.parent.notifyComplete(), this.unsubscribe();
            }),
            r
        );
    })(f),
    Z = (function (t) {
        function r() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
            e(r, t),
            (r.prototype.notifyNext = function (t) {
                this.destination.next(t);
            }),
            (r.prototype.notifyError = function (t) {
                this.destination.error(t);
            }),
            (r.prototype.notifyComplete = function () {
                this.destination.complete();
            }),
            r
        );
    })(f);
function G(t, e) {
    if (!e.closed) return t instanceof m ? t.subscribe(e) : q(t)(e);
}
function K(t, e, r) {
    return (
        void 0 === r && (r = Number.POSITIVE_INFINITY),
        "function" == typeof e
            ? function (n) {
                  return n.pipe(
                      K(function (r, n) {
                          return W(t(r, n)).pipe(
                              R(function (t, o) {
                                  return e(r, t, n, o);
                              })
                          );
                      }, r)
                  );
              }
            : ("number" == typeof e && (r = e),
              function (e) {
                  return e.lift(new Q(t, r));
              })
    );
}
var Q = (function () {
        function t(t, e) {
            void 0 === e && (e = Number.POSITIVE_INFINITY),
                (this.project = t),
                (this.concurrent = e);
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(new tt(t, this.project, this.concurrent));
            }),
            t
        );
    })(),
    tt = (function (t) {
        function r(e, r, n) {
            void 0 === n && (n = Number.POSITIVE_INFINITY);
            var o = t.call(this, e) || this;
            return (
                (o.project = r),
                (o.concurrent = n),
                (o.hasCompleted = !1),
                (o.buffer = []),
                (o.active = 0),
                (o.index = 0),
                o
            );
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                this.active < this.concurrent
                    ? this._tryNext(t)
                    : this.buffer.push(t);
            }),
            (r.prototype._tryNext = function (t) {
                var e,
                    r = this.index++;
                try {
                    e = this.project(t, r);
                } catch (t) {
                    return void this.destination.error(t);
                }
                this.active++, this._innerSub(e);
            }),
            (r.prototype._innerSub = function (t) {
                var e = new J(this),
                    r = this.destination;
                r.add(e);
                var n = G(t, e);
                n !== e && r.add(n);
            }),
            (r.prototype._complete = function () {
                (this.hasCompleted = !0),
                    0 === this.active &&
                        0 === this.buffer.length &&
                        this.destination.complete(),
                    this.unsubscribe();
            }),
            (r.prototype.notifyNext = function (t) {
                this.destination.next(t);
            }),
            (r.prototype.notifyComplete = function () {
                var t = this.buffer;
                this.active--,
                    t.length > 0
                        ? this._next(t.shift())
                        : 0 === this.active &&
                          this.hasCompleted &&
                          this.destination.complete();
            }),
            r
        );
    })(Z);
function et(t) {
    return !u(t) && t - parseFloat(t) + 1 >= 0;
}
function rt(t, e, r) {
    void 0 === t && (t = 0);
    var n = -1;
    return (
        et(e) ? (n = Number(e) < 1 ? 1 : Number(e)) : I(e) && (r = e),
        I(r) || (r = L),
        new m(function (e) {
            var o = et(t) ? t : +t - r.now();
            return r.schedule(nt, o, { index: 0, period: n, subscriber: e });
        })
    );
}
function nt(t) {
    var e = t.index,
        r = t.period,
        n = t.subscriber;
    if ((n.next(e), !n.closed)) {
        if (-1 === r) return n.complete();
        (t.index = e + 1), this.schedule(t, r);
    }
}
function ot(t, e) {
    return (
        void 0 === e && (e = null),
        function (r) {
            return r.lift(new it(t, e));
        }
    );
}
var it = (function () {
        function t(t, e) {
            (this.bufferSize = t),
                (this.startBufferEvery = e),
                (this.subscriberClass = e && t !== e ? ut : st);
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(
                    new this.subscriberClass(
                        t,
                        this.bufferSize,
                        this.startBufferEvery
                    )
                );
            }),
            t
        );
    })(),
    st = (function (t) {
        function r(e, r) {
            var n = t.call(this, e) || this;
            return (n.bufferSize = r), (n.buffer = []), n;
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                var e = this.buffer;
                e.push(t),
                    e.length == this.bufferSize &&
                        (this.destination.next(e), (this.buffer = []));
            }),
            (r.prototype._complete = function () {
                var e = this.buffer;
                e.length > 0 && this.destination.next(e),
                    t.prototype._complete.call(this);
            }),
            r
        );
    })(f),
    ut = (function (t) {
        function r(e, r, n) {
            var o = t.call(this, e) || this;
            return (
                (o.bufferSize = r),
                (o.startBufferEvery = n),
                (o.buffers = []),
                (o.count = 0),
                o
            );
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                var e = this,
                    r = e.bufferSize,
                    n = e.startBufferEvery,
                    o = e.buffers,
                    i = e.count;
                this.count++, i % n == 0 && o.push([]);
                for (var s = o.length; s--; ) {
                    var u = o[s];
                    u.push(t),
                        u.length === r &&
                            (o.splice(s, 1), this.destination.next(u));
                }
            }),
            (r.prototype._complete = function () {
                for (
                    var e = this.buffers, r = this.destination;
                    e.length > 0;

                ) {
                    var n = e.shift();
                    n.length > 0 && r.next(n);
                }
                t.prototype._complete.call(this);
            }),
            r
        );
    })(f);
function ct(t) {
    return function (e) {
        var r = new at(t),
            n = e.lift(r);
        return (r.caught = n);
    };
}
var at = (function () {
        function t(t) {
            this.selector = t;
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(new lt(t, this.selector, this.caught));
            }),
            t
        );
    })(),
    lt = (function (t) {
        function r(e, r, n) {
            var o = t.call(this, e) || this;
            return (o.selector = r), (o.caught = n), o;
        }
        return (
            e(r, t),
            (r.prototype.error = function (e) {
                if (!this.isStopped) {
                    var r = void 0;
                    try {
                        r = this.selector(e, this.caught);
                    } catch (e) {
                        return void t.prototype.error.call(this, e);
                    }
                    this._unsubscribeAndRecycle();
                    var n = new J(this);
                    this.add(n);
                    var o = G(r, n);
                    o !== n && this.add(o);
                }
            }),
            r
        );
    })(Z);
function pt(t, e) {
    return K(t, e, 1);
}
function ht(t, e) {
    return e
        ? function (r) {
              return new yt(r, e).lift(new ft(t));
          }
        : function (e) {
              return e.lift(new ft(t));
          };
}
var ft = (function () {
        function t(t) {
            this.delayDurationSelector = t;
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(new dt(t, this.delayDurationSelector));
            }),
            t
        );
    })(),
    dt = (function (t) {
        function r(e, r) {
            var n = t.call(this, e) || this;
            return (
                (n.delayDurationSelector = r),
                (n.completed = !1),
                (n.delayNotifierSubscriptions = []),
                (n.index = 0),
                n
            );
        }
        return (
            e(r, t),
            (r.prototype.notifyNext = function (t, e, r, n, o) {
                this.destination.next(t),
                    this.removeSubscription(o),
                    this.tryComplete();
            }),
            (r.prototype.notifyError = function (t, e) {
                this._error(t);
            }),
            (r.prototype.notifyComplete = function (t) {
                var e = this.removeSubscription(t);
                e && this.destination.next(e), this.tryComplete();
            }),
            (r.prototype._next = function (t) {
                var e = this.index++;
                try {
                    var r = this.delayDurationSelector(t, e);
                    r && this.tryDelay(r, t);
                } catch (t) {
                    this.destination.error(t);
                }
            }),
            (r.prototype._complete = function () {
                (this.completed = !0), this.tryComplete(), this.unsubscribe();
            }),
            (r.prototype.removeSubscription = function (t) {
                t.unsubscribe();
                var e = this.delayNotifierSubscriptions.indexOf(t);
                return (
                    -1 !== e && this.delayNotifierSubscriptions.splice(e, 1),
                    t.outerValue
                );
            }),
            (r.prototype.tryDelay = function (t, e) {
                var r = (function (t, e, r, n, o) {
                    if ((void 0 === o && (o = new M(t, r, n)), !o.closed))
                        return e instanceof m ? e.subscribe(o) : q(e)(o);
                })(this, t, e);
                r &&
                    !r.closed &&
                    (this.destination.add(r),
                    this.delayNotifierSubscriptions.push(r));
            }),
            (r.prototype.tryComplete = function () {
                this.completed &&
                    0 === this.delayNotifierSubscriptions.length &&
                    this.destination.complete();
            }),
            r
        );
    })($),
    yt = (function (t) {
        function r(e, r) {
            var n = t.call(this) || this;
            return (n.source = e), (n.subscriptionDelay = r), n;
        }
        return (
            e(r, t),
            (r.prototype._subscribe = function (t) {
                this.subscriptionDelay.subscribe(new bt(t, this.source));
            }),
            r
        );
    })(m),
    bt = (function (t) {
        function r(e, r) {
            var n = t.call(this) || this;
            return (n.parent = e), (n.source = r), (n.sourceSubscribed = !1), n;
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                this.subscribeToSource();
            }),
            (r.prototype._error = function (t) {
                this.unsubscribe(), this.parent.error(t);
            }),
            (r.prototype._complete = function () {
                this.unsubscribe(), this.subscribeToSource();
            }),
            (r.prototype.subscribeToSource = function () {
                this.sourceSubscribed ||
                    ((this.sourceSubscribed = !0),
                    this.unsubscribe(),
                    this.source.subscribe(this.parent));
            }),
            r
        );
    })(f);
var vt = (function () {
        function t(t, e, r) {
            void 0 === r && (r = !1),
                (this.accumulator = t),
                (this.seed = e),
                (this.hasSeed = r);
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(
                    new _t(t, this.accumulator, this.seed, this.hasSeed)
                );
            }),
            t
        );
    })(),
    _t = (function (t) {
        function r(e, r, n, o) {
            var i = t.call(this, e) || this;
            return (
                (i.accumulator = r),
                (i._seed = n),
                (i.hasSeed = o),
                (i.index = 0),
                i
            );
        }
        return (
            e(r, t),
            Object.defineProperty(r.prototype, "seed", {
                get: function () {
                    return this._seed;
                },
                set: function (t) {
                    (this.hasSeed = !0), (this._seed = t);
                },
                enumerable: !0,
                configurable: !0
            }),
            (r.prototype._next = function (t) {
                if (this.hasSeed) return this._tryNext(t);
                (this.seed = t), this.destination.next(t);
            }),
            (r.prototype._tryNext = function (t) {
                var e,
                    r = this.index++;
                try {
                    e = this.accumulator(this.seed, t, r);
                } catch (t) {
                    this.destination.error(t);
                }
                (this.seed = e), this.destination.next(e);
            }),
            r
        );
    })(f);
var mt = (function () {
        function t(t, e) {
            (this.notifier = t), (this.source = e);
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(new gt(t, this.notifier, this.source));
            }),
            t
        );
    })(),
    gt = (function (t) {
        function r(e, r, n) {
            var o = t.call(this, e) || this;
            return (o.notifier = r), (o.source = n), o;
        }
        return (
            e(r, t),
            (r.prototype.error = function (e) {
                if (!this.isStopped) {
                    var r = this.errors,
                        n = this.retries,
                        o = this.retriesSubscription;
                    if (n)
                        (this.errors = void 0),
                            (this.retriesSubscription = void 0);
                    else {
                        r = new x();
                        try {
                            n = (0, this.notifier)(r);
                        } catch (e) {
                            return t.prototype.error.call(this, e);
                        }
                        o = G(n, new J(this));
                    }
                    this._unsubscribeAndRecycle(),
                        (this.errors = r),
                        (this.retries = n),
                        (this.retriesSubscription = o),
                        r.next(e);
                }
            }),
            (r.prototype._unsubscribe = function () {
                var t = this.errors,
                    e = this.retriesSubscription;
                t && (t.unsubscribe(), (this.errors = void 0)),
                    e && (e.unsubscribe(), (this.retriesSubscription = void 0)),
                    (this.retries = void 0);
            }),
            (r.prototype.notifyNext = function () {
                var t = this._unsubscribe;
                (this._unsubscribe = null),
                    this._unsubscribeAndRecycle(),
                    (this._unsubscribe = t),
                    this.source.subscribe(this);
            }),
            r
        );
    })(Z);
var wt = (function () {
        function t(t) {
            this.predicate = t;
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(new jt(t, this.predicate));
            }),
            t
        );
    })(),
    jt = (function (t) {
        function r(e, r) {
            var n = t.call(this, e) || this;
            return (n.predicate = r), (n.skipping = !0), (n.index = 0), n;
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                var e = this.destination;
                this.skipping && this.tryCallPredicate(t),
                    this.skipping || e.next(t);
            }),
            (r.prototype.tryCallPredicate = function (t) {
                try {
                    var e = this.predicate(t, this.index++);
                    this.skipping = Boolean(e);
                } catch (t) {
                    this.destination.error(t);
                }
            }),
            r
        );
    })(f);
function St(t, e) {
    return "function" == typeof e
        ? function (r) {
              return r.pipe(
                  St(function (r, n) {
                      return W(t(r, n)).pipe(
                          R(function (t, o) {
                              return e(r, t, n, o);
                          })
                      );
                  })
              );
          }
        : function (e) {
              return e.lift(new xt(t));
          };
}
var xt = (function () {
        function t(t) {
            this.project = t;
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(new Ot(t, this.project));
            }),
            t
        );
    })(),
    Ot = (function (t) {
        function r(e, r) {
            var n = t.call(this, e) || this;
            return (n.project = r), (n.index = 0), n;
        }
        return (
            e(r, t),
            (r.prototype._next = function (t) {
                var e,
                    r = this.index++;
                try {
                    e = this.project(t, r);
                } catch (t) {
                    return void this.destination.error(t);
                }
                this._innerSub(e);
            }),
            (r.prototype._innerSub = function (t) {
                var e = this.innerSubscription;
                e && e.unsubscribe();
                var r = new J(this),
                    n = this.destination;
                n.add(r),
                    (this.innerSubscription = G(t, r)),
                    this.innerSubscription !== r &&
                        n.add(this.innerSubscription);
            }),
            (r.prototype._complete = function () {
                var e = this.innerSubscription;
                (e && !e.closed) || t.prototype._complete.call(this),
                    this.unsubscribe();
            }),
            (r.prototype._unsubscribe = function () {
                this.innerSubscription = void 0;
            }),
            (r.prototype.notifyComplete = function () {
                (this.innerSubscription = void 0),
                    this.isStopped && t.prototype._complete.call(this);
            }),
            (r.prototype.notifyNext = function (t) {
                this.destination.next(t);
            }),
            r
        );
    })(Z);
function Et(t, e, r) {
    return function (n) {
        return n.lift(new kt(t, e, r));
    };
}
var kt = (function () {
        function t(t, e, r) {
            (this.nextOrObserver = t), (this.error = e), (this.complete = r);
        }
        return (
            (t.prototype.call = function (t, e) {
                return e.subscribe(
                    new At(t, this.nextOrObserver, this.error, this.complete)
                );
            }),
            t
        );
    })(),
    At = (function (t) {
        function n(e, n, o, i) {
            var s = t.call(this, e) || this;
            return (
                (s._tapNext = U),
                (s._tapError = U),
                (s._tapComplete = U),
                (s._tapError = o || U),
                (s._tapComplete = i || U),
                r(n)
                    ? ((s._context = s), (s._tapNext = n))
                    : n &&
                      ((s._context = n),
                      (s._tapNext = n.next || U),
                      (s._tapError = n.error || U),
                      (s._tapComplete = n.complete || U)),
                s
            );
        }
        return (
            e(n, t),
            (n.prototype._next = function (t) {
                try {
                    this._tapNext.call(this._context, t);
                } catch (t) {
                    return void this.destination.error(t);
                }
                this.destination.next(t);
            }),
            (n.prototype._error = function (t) {
                try {
                    this._tapError.call(this._context, t);
                } catch (t) {
                    return void this.destination.error(t);
                }
                this.destination.error(t);
            }),
            (n.prototype._complete = function () {
                try {
                    this._tapComplete.call(this._context);
                } catch (t) {
                    return void this.destination.error(t);
                }
                return this.destination.complete();
            }),
            n
        );
    })(f),
    Tt =
        "object" == typeof global &&
        global &&
        global.Object === Object &&
        global,
    It = "object" == typeof self && self && self.Object === Object && self,
    Pt = Tt || It || Function("return this")(),
    Dt = Pt.Symbol,
    Ct = Object.prototype,
    Ft = Ct.hasOwnProperty,
    Lt = Ct.toString,
    Ut = Dt ? Dt.toStringTag : void 0;
var Rt = Object.prototype.toString;
var zt = Dt ? Dt.toStringTag : void 0;
function Nt(t) {
    return null == t
        ? void 0 === t
            ? "[object Undefined]"
            : "[object Null]"
        : zt && zt in Object(t)
        ? (function (t) {
              var e = Ft.call(t, Ut),
                  r = t[Ut];
              try {
                  t[Ut] = void 0;
                  var n = !0;
              } catch (t) {}
              var o = Lt.call(t);
              return n && (e ? (t[Ut] = r) : delete t[Ut]), o;
          })(t)
        : (function (t) {
              return Rt.call(t);
          })(t);
}
function $t(t) {
    return null != t && "object" == typeof t;
}
function Mt(t) {
    return "symbol" == typeof t || ($t(t) && "[object Symbol]" == Nt(t));
}
function Bt(t, e) {
    for (var r = -1, n = null == t ? 0 : t.length, o = Array(n); ++r < n; )
        o[r] = e(t[r], r, t);
    return o;
}
var Vt = Array.isArray,
    Ht = Dt ? Dt.prototype : void 0,
    Yt = Ht ? Ht.toString : void 0;
function qt(t) {
    if ("string" == typeof t) return t;
    if (Vt(t)) return Bt(t, qt) + "";
    if (Mt(t)) return Yt ? Yt.call(t) : "";
    var e = t + "";
    return "0" == e && 1 / t == -Infinity ? "-0" : e;
}
function Xt(t) {
    var e = typeof t;
    return null != t && ("object" == e || "function" == e);
}
function Wt(t) {
    return t;
}
function Jt(t) {
    if (!Xt(t)) return !1;
    var e = Nt(t);
    return (
        "[object Function]" == e ||
        "[object GeneratorFunction]" == e ||
        "[object AsyncFunction]" == e ||
        "[object Proxy]" == e
    );
}
var Zt,
    Gt = Pt["__core-js_shared__"],
    Kt = (Zt = /[^.]+$/.exec((Gt && Gt.keys && Gt.keys.IE_PROTO) || ""))
        ? "Symbol(src)_1." + Zt
        : "";
var Qt = Function.prototype.toString;
var te = /^\[object .+?Constructor\]$/,
    ee = Function.prototype,
    re = Object.prototype,
    ne = ee.toString,
    oe = re.hasOwnProperty,
    ie = RegExp(
        "^" +
            ne
                .call(oe)
                .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                .replace(
                    /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                    "$1.*?"
                ) +
            "$"
    );
function se(t) {
    return (
        !(!Xt(t) || ((e = t), Kt && Kt in e)) &&
        (Jt(t) ? ie : te).test(
            (function (t) {
                if (null != t) {
                    try {
                        return Qt.call(t);
                    } catch (t) {}
                    try {
                        return t + "";
                    } catch (t) {}
                }
                return "";
            })(t)
        )
    );
    var e;
}
function ue(t, e) {
    var r = (function (t, e) {
        return null == t ? void 0 : t[e];
    })(t, e);
    return se(r) ? r : void 0;
}
var ce = Object.create,
    ae = (function () {
        function t() {}
        return function (e) {
            if (!Xt(e)) return {};
            if (ce) return ce(e);
            t.prototype = e;
            var r = new t();
            return (t.prototype = void 0), r;
        };
    })();
function le(t, e, r) {
    switch (r.length) {
        case 0:
            return t.call(e);
        case 1:
            return t.call(e, r[0]);
        case 2:
            return t.call(e, r[0], r[1]);
        case 3:
            return t.call(e, r[0], r[1], r[2]);
    }
    return t.apply(e, r);
}
var pe = Date.now;
var he,
    fe,
    de,
    ye = (function () {
        try {
            var t = ue(Object, "defineProperty");
            return t({}, "", {}), t;
        } catch (t) {}
    })(),
    be =
        ((he = ye
            ? function (t, e) {
                  return ye(t, "toString", {
                      configurable: !0,
                      enumerable: !1,
                      value:
                          ((r = e),
                          function () {
                              return r;
                          }),
                      writable: !0
                  });
                  var r;
              }
            : Wt),
        (fe = 0),
        (de = 0),
        function () {
            var t = pe(),
                e = 16 - (t - de);
            if (((de = t), e > 0)) {
                if (++fe >= 800) return arguments[0];
            } else fe = 0;
            return he.apply(void 0, arguments);
        });
function ve(t) {
    return t != t;
}
function _e(t, e) {
    return (
        !!(null == t ? 0 : t.length) &&
        (function (t, e, r) {
            return e == e
                ? (function (t, e, r) {
                      for (var n = r - 1, o = t.length; ++n < o; )
                          if (t[n] === e) return n;
                      return -1;
                  })(t, e, r)
                : (function (t, e, r, n) {
                      for (
                          var o = t.length, i = r + (n ? 1 : -1);
                          n ? i-- : ++i < o;

                      )
                          if (e(t[i], i, t)) return i;
                      return -1;
                  })(t, ve, r);
        })(t, e, 0) > -1
    );
}
var me = /^(?:0|[1-9]\d*)$/;
function ge(t, e) {
    var r = typeof t;
    return (
        !!(e = null == e ? 9007199254740991 : e) &&
        ("number" == r || ("symbol" != r && me.test(t))) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
    );
}
function we(t, e, r) {
    "__proto__" == e && ye
        ? ye(t, e, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (t[e] = r);
}
function je(t, e) {
    return t === e || (t != t && e != e);
}
var Se = Object.prototype.hasOwnProperty;
function xe(t, e, r) {
    var n = t[e];
    (Se.call(t, e) && je(n, r) && (void 0 !== r || e in t)) || we(t, e, r);
}
var Oe = Math.max;
function Ee(t, e, r) {
    return (
        (e = Oe(void 0 === e ? t.length - 1 : e, 0)),
        function () {
            for (
                var n = arguments,
                    o = -1,
                    i = Oe(n.length - e, 0),
                    s = Array(i);
                ++o < i;

            )
                s[o] = n[e + o];
            o = -1;
            for (var u = Array(e + 1); ++o < e; ) u[o] = n[o];
            return (u[e] = r(s)), le(t, this, u);
        }
    );
}
function ke(t, e) {
    return be(Ee(t, e, Wt), t + "");
}
function Ae(t) {
    return (
        "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
    );
}
function Te(t) {
    return null != t && Ae(t.length) && !Jt(t);
}
var Ie = Object.prototype;
function Pe(t) {
    var e = t && t.constructor;
    return t === (("function" == typeof e && e.prototype) || Ie);
}
function De(t) {
    return $t(t) && "[object Arguments]" == Nt(t);
}
var Ce = Object.prototype,
    Fe = Ce.hasOwnProperty,
    Le = Ce.propertyIsEnumerable,
    Ue = De(
        (function () {
            return arguments;
        })()
    )
        ? De
        : function (t) {
              return $t(t) && Fe.call(t, "callee") && !Le.call(t, "callee");
          };
var Re = "object" == typeof exports && exports && !exports.nodeType && exports,
    ze =
        Re && "object" == typeof module && module && !module.nodeType && module,
    Ne = ze && ze.exports === Re ? Pt.Buffer : void 0,
    $e =
        (Ne ? Ne.isBuffer : void 0) ||
        function () {
            return !1;
        },
    Me = {};
function Be(t) {
    return function (e) {
        return t(e);
    };
}
(Me["[object Float32Array]"] =
    Me["[object Float64Array]"] =
    Me["[object Int8Array]"] =
    Me["[object Int16Array]"] =
    Me["[object Int32Array]"] =
    Me["[object Uint8Array]"] =
    Me["[object Uint8ClampedArray]"] =
    Me["[object Uint16Array]"] =
    Me["[object Uint32Array]"] =
        !0),
    (Me["[object Arguments]"] =
        Me["[object Array]"] =
        Me["[object ArrayBuffer]"] =
        Me["[object Boolean]"] =
        Me["[object DataView]"] =
        Me["[object Date]"] =
        Me["[object Error]"] =
        Me["[object Function]"] =
        Me["[object Map]"] =
        Me["[object Number]"] =
        Me["[object Object]"] =
        Me["[object RegExp]"] =
        Me["[object Set]"] =
        Me["[object String]"] =
        Me["[object WeakMap]"] =
            !1);
var Ve = "object" == typeof exports && exports && !exports.nodeType && exports,
    He =
        Ve && "object" == typeof module && module && !module.nodeType && module,
    Ye = He && He.exports === Ve && Tt.process,
    qe = (function () {
        try {
            var t = He && He.require && He.require("util").types;
            return t || (Ye && Ye.binding && Ye.binding("util"));
        } catch (t) {}
    })(),
    Xe = qe && qe.isTypedArray,
    We = Xe
        ? Be(Xe)
        : function (t) {
              return $t(t) && Ae(t.length) && !!Me[Nt(t)];
          },
    Je = Object.prototype.hasOwnProperty;
function Ze(t, e) {
    var r = Vt(t),
        n = !r && Ue(t),
        o = !r && !n && $e(t),
        i = !r && !n && !o && We(t),
        s = r || n || o || i,
        u = s
            ? (function (t, e) {
                  for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r);
                  return n;
              })(t.length, String)
            : [],
        c = u.length;
    for (var a in t)
        (!e && !Je.call(t, a)) ||
            (s &&
                ("length" == a ||
                    (o && ("offset" == a || "parent" == a)) ||
                    (i &&
                        ("buffer" == a ||
                            "byteLength" == a ||
                            "byteOffset" == a)) ||
                    ge(a, c))) ||
            u.push(a);
    return u;
}
var Ge = Object.prototype.hasOwnProperty;
function Ke(t) {
    if (!Xt(t))
        return (function (t) {
            var e = [];
            if (null != t) for (var r in Object(t)) e.push(r);
            return e;
        })(t);
    var e = Pe(t),
        r = [];
    for (var n in t) ("constructor" != n || (!e && Ge.call(t, n))) && r.push(n);
    return r;
}
function Qe(t) {
    return Te(t) ? Ze(t, !0) : Ke(t);
}
var tr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    er = /^\w*$/;
var rr = ue(Object, "create");
var nr = Object.prototype.hasOwnProperty;
var or = Object.prototype.hasOwnProperty;
function ir(t) {
    var e = -1,
        r = null == t ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
        var n = t[e];
        this.set(n[0], n[1]);
    }
}
function sr(t, e) {
    for (var r = t.length; r--; ) if (je(t[r][0], e)) return r;
    return -1;
}
(ir.prototype.clear = function () {
    (this.__data__ = rr ? rr(null) : {}), (this.size = 0);
}),
    (ir.prototype.delete = function (t) {
        var e = this.has(t) && delete this.__data__[t];
        return (this.size -= e ? 1 : 0), e;
    }),
    (ir.prototype.get = function (t) {
        var e = this.__data__;
        if (rr) {
            var r = e[t];
            return "__lodash_hash_undefined__" === r ? void 0 : r;
        }
        return nr.call(e, t) ? e[t] : void 0;
    }),
    (ir.prototype.has = function (t) {
        var e = this.__data__;
        return rr ? void 0 !== e[t] : or.call(e, t);
    }),
    (ir.prototype.set = function (t, e) {
        var r = this.__data__;
        return (
            (this.size += this.has(t) ? 0 : 1),
            (r[t] = rr && void 0 === e ? "__lodash_hash_undefined__" : e),
            this
        );
    });
var ur = Array.prototype.splice;
function cr(t) {
    var e = -1,
        r = null == t ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
        var n = t[e];
        this.set(n[0], n[1]);
    }
}
(cr.prototype.clear = function () {
    (this.__data__ = []), (this.size = 0);
}),
    (cr.prototype.delete = function (t) {
        var e = this.__data__,
            r = sr(e, t);
        return (
            !(r < 0) &&
            (r == e.length - 1 ? e.pop() : ur.call(e, r, 1), --this.size, !0)
        );
    }),
    (cr.prototype.get = function (t) {
        var e = this.__data__,
            r = sr(e, t);
        return r < 0 ? void 0 : e[r][1];
    }),
    (cr.prototype.has = function (t) {
        return sr(this.__data__, t) > -1;
    }),
    (cr.prototype.set = function (t, e) {
        var r = this.__data__,
            n = sr(r, t);
        return n < 0 ? (++this.size, r.push([t, e])) : (r[n][1] = e), this;
    });
var ar = ue(Pt, "Map");
function lr(t, e) {
    var r = t.__data__;
    return (function (t) {
        var e = typeof t;
        return "string" == e || "number" == e || "symbol" == e || "boolean" == e
            ? "__proto__" !== t
            : null === t;
    })(e)
        ? r["string" == typeof e ? "string" : "hash"]
        : r.map;
}
function pr(t) {
    var e = -1,
        r = null == t ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
        var n = t[e];
        this.set(n[0], n[1]);
    }
}
(pr.prototype.clear = function () {
    (this.size = 0),
        (this.__data__ = {
            hash: new ir(),
            map: new (ar || cr)(),
            string: new ir()
        });
}),
    (pr.prototype.delete = function (t) {
        var e = lr(this, t).delete(t);
        return (this.size -= e ? 1 : 0), e;
    }),
    (pr.prototype.get = function (t) {
        return lr(this, t).get(t);
    }),
    (pr.prototype.has = function (t) {
        return lr(this, t).has(t);
    }),
    (pr.prototype.set = function (t, e) {
        var r = lr(this, t),
            n = r.size;
        return r.set(t, e), (this.size += r.size == n ? 0 : 1), this;
    });
function hr(t, e) {
    if ("function" != typeof t || (null != e && "function" != typeof e))
        throw new TypeError("Expected a function");
    var r = function () {
        var n = arguments,
            o = e ? e.apply(this, n) : n[0],
            i = r.cache;
        if (i.has(o)) return i.get(o);
        var s = t.apply(this, n);
        return (r.cache = i.set(o, s) || i), s;
    };
    return (r.cache = new (hr.Cache || pr)()), r;
}
hr.Cache = pr;
var fr =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    dr = /\\(\\)?/g,
    yr = (function (t) {
        var e = hr(t, function (t) {
                return 500 === r.size && r.clear(), t;
            }),
            r = e.cache;
        return e;
    })(function (t) {
        var e = [];
        return (
            46 === t.charCodeAt(0) && e.push(""),
            t.replace(fr, function (t, r, n, o) {
                e.push(n ? o.replace(dr, "$1") : r || t);
            }),
            e
        );
    });
function br(t, e) {
    return Vt(t)
        ? t
        : (function (t, e) {
              if (Vt(t)) return !1;
              var r = typeof t;
              return (
                  !(
                      "number" != r &&
                      "symbol" != r &&
                      "boolean" != r &&
                      null != t &&
                      !Mt(t)
                  ) ||
                  er.test(t) ||
                  !tr.test(t) ||
                  (null != e && t in Object(e))
              );
          })(t, e)
        ? [t]
        : yr(
              (function (t) {
                  return null == t ? "" : qt(t);
              })(t)
          );
}
function vr(t) {
    if ("string" == typeof t || Mt(t)) return t;
    var e = t + "";
    return "0" == e && 1 / t == -Infinity ? "-0" : e;
}
function _r(t, e) {
    for (var r = 0, n = (e = br(e, t)).length; null != t && r < n; )
        t = t[vr(e[r++])];
    return r && r == n ? t : void 0;
}
function mr(t, e) {
    for (var r = -1, n = e.length, o = t.length; ++r < n; ) t[o + r] = e[r];
    return t;
}
var gr = Dt ? Dt.isConcatSpreadable : void 0;
function wr(t) {
    return Vt(t) || Ue(t) || !!(gr && t && t[gr]);
}
function jr(t, e, r, n, o) {
    var i = -1,
        s = t.length;
    for (r || (r = wr), o || (o = []); ++i < s; ) {
        var u = t[i];
        e > 0 && r(u)
            ? e > 1
                ? jr(u, e - 1, r, n, o)
                : mr(o, u)
            : n || (o[o.length] = u);
    }
    return o;
}
function Sr(t) {
    return (null == t ? 0 : t.length) ? jr(t, 1) : [];
}
var xr = (function (t, e) {
        return function (r) {
            return t(e(r));
        };
    })(Object.getPrototypeOf, Object),
    Or = Function.prototype,
    Er = Object.prototype,
    kr = Or.toString,
    Ar = Er.hasOwnProperty,
    Tr = kr.call(Object);
function Ir(t) {
    var e = (this.__data__ = new cr(t));
    this.size = e.size;
}
(Ir.prototype.clear = function () {
    (this.__data__ = new cr()), (this.size = 0);
}),
    (Ir.prototype.delete = function (t) {
        var e = this.__data__,
            r = e.delete(t);
        return (this.size = e.size), r;
    }),
    (Ir.prototype.get = function (t) {
        return this.__data__.get(t);
    }),
    (Ir.prototype.has = function (t) {
        return this.__data__.has(t);
    }),
    (Ir.prototype.set = function (t, e) {
        var r = this.__data__;
        if (r instanceof cr) {
            var n = r.__data__;
            if (!ar || n.length < 199)
                return n.push([t, e]), (this.size = ++r.size), this;
            r = this.__data__ = new pr(n);
        }
        return r.set(t, e), (this.size = r.size), this;
    });
var Pr = "object" == typeof exports && exports && !exports.nodeType && exports,
    Dr =
        Pr && "object" == typeof module && module && !module.nodeType && module,
    Cr = Dr && Dr.exports === Pr ? Pt.Buffer : void 0,
    Fr = Cr ? Cr.allocUnsafe : void 0;
var Lr = Pt.Uint8Array;
function Ur(t, e) {
    var r,
        n,
        o = e
            ? ((r = t.buffer),
              (n = new r.constructor(r.byteLength)),
              new Lr(n).set(new Lr(r)),
              n)
            : t.buffer;
    return new t.constructor(o, t.byteOffset, t.length);
}
function Rr(t) {
    var e = -1,
        r = null == t ? 0 : t.length;
    for (this.__data__ = new pr(); ++e < r; ) this.add(t[e]);
}
function zr(t, e) {
    return t.has(e);
}
function Nr(t, e) {
    return null != t && e in Object(t);
}
function $r(t, e) {
    return (
        null != t &&
        (function (t, e, r) {
            for (var n = -1, o = (e = br(e, t)).length, i = !1; ++n < o; ) {
                var s = vr(e[n]);
                if (!(i = null != t && r(t, s))) break;
                t = t[s];
            }
            return i || ++n != o
                ? i
                : !!(o = null == t ? 0 : t.length) &&
                      Ae(o) &&
                      ge(s, o) &&
                      (Vt(t) || Ue(t));
        })(t, e, Nr)
    );
}
(Rr.prototype.add = Rr.prototype.push =
    function (t) {
        return this.__data__.set(t, "__lodash_hash_undefined__"), this;
    }),
    (Rr.prototype.has = function (t) {
        return this.__data__.has(t);
    });
var Mr,
    Br = function (t, e, r) {
        for (var n = -1, o = Object(t), i = r(t), s = i.length; s--; ) {
            var u = i[Mr ? s : ++n];
            if (!1 === e(o[u], u, o)) break;
        }
        return t;
    };
function Vr(t, e, r) {
    ((void 0 !== r && !je(t[e], r)) || (void 0 === r && !(e in t))) &&
        we(t, e, r);
}
function Hr(t) {
    return $t(t) && Te(t);
}
function Yr(t, e) {
    if (("constructor" !== e || "function" != typeof t[e]) && "__proto__" != e)
        return t[e];
}
function qr(t) {
    return (function (t, e, r, n) {
        var o = !r;
        r || (r = {});
        for (var i = -1, s = e.length; ++i < s; ) {
            var u = e[i],
                c = n ? n(r[u], t[u], u, r, t) : void 0;
            void 0 === c && (c = t[u]), o ? we(r, u, c) : xe(r, u, c);
        }
        return r;
    })(t, Qe(t));
}
function Xr(t, e, r, n, o, i, s) {
    var u = Yr(t, r),
        c = Yr(e, r),
        a = s.get(c);
    if (a) Vr(t, r, a);
    else {
        var l = i ? i(u, c, r + "", t, e, s) : void 0,
            p = void 0 === l;
        if (p) {
            var h = Vt(c),
                f = !h && $e(c),
                d = !h && !f && We(c);
            (l = c),
                h || f || d
                    ? Vt(u)
                        ? (l = u)
                        : Hr(u)
                        ? (l = (function (t, e) {
                              var r = -1,
                                  n = t.length;
                              for (e || (e = Array(n)); ++r < n; ) e[r] = t[r];
                              return e;
                          })(u))
                        : f
                        ? ((p = !1),
                          (l = (function (t, e) {
                              if (e) return t.slice();
                              var r = t.length,
                                  n = Fr ? Fr(r) : new t.constructor(r);
                              return t.copy(n), n;
                          })(c, !0)))
                        : d
                        ? ((p = !1), (l = Ur(c, !0)))
                        : (l = [])
                    : (function (t) {
                          if (!$t(t) || "[object Object]" != Nt(t)) return !1;
                          var e = xr(t);
                          if (null === e) return !0;
                          var r = Ar.call(e, "constructor") && e.constructor;
                          return (
                              "function" == typeof r &&
                              r instanceof r &&
                              kr.call(r) == Tr
                          );
                      })(c) || Ue(c)
                    ? ((l = u),
                      Ue(u)
                          ? (l = qr(u))
                          : (Xt(u) && !Jt(u)) ||
                            (l = (function (t) {
                                return "function" != typeof t.constructor ||
                                    Pe(t)
                                    ? {}
                                    : ae(xr(t));
                            })(c)))
                    : (p = !1);
        }
        p && (s.set(c, l), o(l, c, n, i, s), s.delete(c)), Vr(t, r, l);
    }
}
function Wr(t, e, r, n, o) {
    t !== e &&
        Br(
            e,
            function (i, s) {
                if ((o || (o = new Ir()), Xt(i))) Xr(t, e, s, r, Wr, n, o);
                else {
                    var u = n ? n(Yr(t, s), i, s + "", t, e, o) : void 0;
                    void 0 === u && (u = i), Vr(t, s, u);
                }
            },
            Qe
        );
}
function Jr(t, e, r) {
    for (var n = -1, o = null == t ? 0 : t.length; ++n < o; )
        if (r(e, t[n])) return !0;
    return !1;
}
var Zr = ke(function (t, e) {
    return Hr(t)
        ? (function (t, e, r, n) {
              var o = -1,
                  i = _e,
                  s = !0,
                  u = t.length,
                  c = [],
                  a = e.length;
              if (!u) return c;
              r && (e = Bt(e, Be(r))),
                  n
                      ? ((i = Jr), (s = !1))
                      : e.length >= 200 &&
                        ((i = zr), (s = !1), (e = new Rr(e)));
              t: for (; ++o < u; ) {
                  var l = t[o],
                      p = null == r ? l : r(l);
                  if (((l = n || 0 !== l ? l : 0), s && p == p)) {
                      for (var h = a; h--; ) if (e[h] === p) continue t;
                      c.push(l);
                  } else i(e, p, n) || c.push(l);
              }
              return c;
          })(t, jr(e, 1, Hr, !0))
        : [];
});
var Gr,
    Kr = qe && qe.isRegExp,
    Qr = Kr
        ? Be(Kr)
        : function (t) {
              return $t(t) && "[object RegExp]" == Nt(t);
          },
    tn =
        ((Gr = function (t, e, r) {
            Wr(t, e, r);
        }),
        ke(function (t, e) {
            var r = -1,
                n = e.length,
                o = n > 1 ? e[n - 1] : void 0,
                i = n > 2 ? e[2] : void 0;
            for (
                o = Gr.length > 3 && "function" == typeof o ? (n--, o) : void 0,
                    i &&
                        (function (t, e, r) {
                            if (!Xt(r)) return !1;
                            var n = typeof e;
                            return (
                                !!("number" == n
                                    ? Te(r) && ge(e, r.length)
                                    : "string" == n && (e in r)) && je(r[e], t)
                            );
                        })(e[0], e[1], i) &&
                        ((o = n < 3 ? void 0 : o), (n = 1)),
                    t = Object(t);
                ++r < n;

            ) {
                var s = e[r];
                s && Gr(t, s, r, o);
            }
            return t;
        }));
function en(t, e, r, n) {
    if (!Xt(t)) return t;
    for (
        var o = -1, i = (e = br(e, t)).length, s = i - 1, u = t;
        null != u && ++o < i;

    ) {
        var c = vr(e[o]),
            a = r;
        if ("__proto__" === c || "constructor" === c || "prototype" === c)
            return t;
        if (o != s) {
            var l = u[c];
            void 0 === (a = n ? n(l, c, u) : void 0) &&
                (a = Xt(l) ? l : ge(e[o + 1]) ? [] : {});
        }
        xe(u, c, a), (u = u[c]);
    }
    return t;
}
function rn(t, e) {
    return (function (t, e, r) {
        for (var n = -1, o = e.length, i = {}; ++n < o; ) {
            var s = e[n],
                u = _r(t, s);
            r(u, s) && en(i, br(s, t), u);
        }
        return i;
    })(t, e, function (e, r) {
        return $r(t, r);
    });
}
var nn = (function (t) {
    return be(Ee(t, void 0, Sr), t + "");
})(function (t, e) {
    return null == t ? {} : rn(t, e);
});
class on {
    constructor(t) {
        (this.err = t), (this.errTime = new Date());
    }
}
const sn = {
    data: () => ({ url: {}, options: {}, result: null }),
    format: {
        String(t) {
            this.originData.url = t;
        },
        Object(t) {
            !0 === t._isABackup && tn(this, t), tn(this.originData, t);
        },
        Array(t) {
            this.originData = t;
        }
    },
    commit: {
        start(t) {
            return (this._marks[t] = null), this._result || this.originData;
        },
        complete(t) {
            return (this._processUUID = t), (this._complete = !0), !0;
        },
        success(t, e, r = !1) {
            return (
                (this._marks[e] = !r || this._result), (this._result = t), !0
            );
        },
        error(t) {
            return this._errorList.push(new on(t)), !0;
        }
    }
};
function un(t) {
    return Object.prototype.toString
        .call(t)
        .match(/(?<=\[object\s+)\S+?(?=\])/)[0];
}
var cn,
    an = new Uint8Array(16);
function ln() {
    if (
        !cn &&
        !(cn =
            ("undefined" != typeof crypto &&
                crypto.getRandomValues &&
                crypto.getRandomValues.bind(crypto)) ||
            ("undefined" != typeof msCrypto &&
                "function" == typeof msCrypto.getRandomValues &&
                msCrypto.getRandomValues.bind(msCrypto)))
    )
        throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
        );
    return cn(an);
}
var pn =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function hn(t) {
    return "string" == typeof t && pn.test(t);
}
for (var fn = [], dn = 0; dn < 256; ++dn)
    fn.push((dn + 256).toString(16).substr(1));
function yn(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        r = (
            fn[t[e + 0]] +
            fn[t[e + 1]] +
            fn[t[e + 2]] +
            fn[t[e + 3]] +
            "-" +
            fn[t[e + 4]] +
            fn[t[e + 5]] +
            "-" +
            fn[t[e + 6]] +
            fn[t[e + 7]] +
            "-" +
            fn[t[e + 8]] +
            fn[t[e + 9]] +
            "-" +
            fn[t[e + 10]] +
            fn[t[e + 11]] +
            fn[t[e + 12]] +
            fn[t[e + 13]] +
            fn[t[e + 14]] +
            fn[t[e + 15]]
        ).toLowerCase();
    if (!hn(r)) throw TypeError("Stringified UUID is invalid");
    return r;
}
function bn(t, e, r) {
    var n = (t = t || {}).random || (t.rng || ln)();
    if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), e)) {
        r = r || 0;
        for (var o = 0; o < 16; ++o) e[r + o] = n[o];
        return e;
    }
    return yn(n);
}
function vn(t, e, r, n) {
    switch (t) {
        case 0:
            return (e & r) ^ (~e & n);
        case 1:
            return e ^ r ^ n;
        case 2:
            return (e & r) ^ (e & n) ^ (r & n);
        case 3:
            return e ^ r ^ n;
    }
}
function _n(t, e) {
    return (t << e) | (t >>> (32 - e));
}
var mn = (function (t, e, r) {
    function n(t, n, o, i) {
        if (
            ("string" == typeof t &&
                (t = (function (t) {
                    t = unescape(encodeURIComponent(t));
                    for (var e = [], r = 0; r < t.length; ++r)
                        e.push(t.charCodeAt(r));
                    return e;
                })(t)),
            "string" == typeof n &&
                (n = (function (t) {
                    if (!hn(t)) throw TypeError("Invalid UUID");
                    var e,
                        r = new Uint8Array(16);
                    return (
                        (r[0] = (e = parseInt(t.slice(0, 8), 16)) >>> 24),
                        (r[1] = (e >>> 16) & 255),
                        (r[2] = (e >>> 8) & 255),
                        (r[3] = 255 & e),
                        (r[4] = (e = parseInt(t.slice(9, 13), 16)) >>> 8),
                        (r[5] = 255 & e),
                        (r[6] = (e = parseInt(t.slice(14, 18), 16)) >>> 8),
                        (r[7] = 255 & e),
                        (r[8] = (e = parseInt(t.slice(19, 23), 16)) >>> 8),
                        (r[9] = 255 & e),
                        (r[10] =
                            ((e = parseInt(t.slice(24, 36), 16)) /
                                1099511627776) &
                            255),
                        (r[11] = (e / 4294967296) & 255),
                        (r[12] = (e >>> 24) & 255),
                        (r[13] = (e >>> 16) & 255),
                        (r[14] = (e >>> 8) & 255),
                        (r[15] = 255 & e),
                        r
                    );
                })(n)),
            16 !== n.length)
        )
            throw TypeError(
                "Namespace must be array-like (16 iterable integer values, 0-255)"
            );
        var s = new Uint8Array(16 + t.length);
        if (
            (s.set(n),
            s.set(t, n.length),
            ((s = r(s))[6] = (15 & s[6]) | e),
            (s[8] = (63 & s[8]) | 128),
            o)
        ) {
            i = i || 0;
            for (var u = 0; u < 16; ++u) o[i + u] = s[u];
            return o;
        }
        return yn(s);
    }
    try {
        n.name = t;
    } catch (t) {}
    return (
        (n.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"),
        (n.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8"),
        n
    );
})("v5", 80, function (t) {
    var e = [1518500249, 1859775393, 2400959708, 3395469782],
        r = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    if ("string" == typeof t) {
        var n = unescape(encodeURIComponent(t));
        t = [];
        for (var o = 0; o < n.length; ++o) t.push(n.charCodeAt(o));
    } else Array.isArray(t) || (t = Array.prototype.slice.call(t));
    t.push(128);
    for (
        var i = t.length / 4 + 2,
            s = Math.ceil(i / 16),
            u = new Array(s),
            c = 0;
        c < s;
        ++c
    ) {
        for (var a = new Uint32Array(16), l = 0; l < 16; ++l)
            a[l] =
                (t[64 * c + 4 * l] << 24) |
                (t[64 * c + 4 * l + 1] << 16) |
                (t[64 * c + 4 * l + 2] << 8) |
                t[64 * c + 4 * l + 3];
        u[c] = a;
    }
    (u[s - 1][14] = (8 * (t.length - 1)) / Math.pow(2, 32)),
        (u[s - 1][14] = Math.floor(u[s - 1][14])),
        (u[s - 1][15] = (8 * (t.length - 1)) & 4294967295);
    for (var p = 0; p < s; ++p) {
        for (var h = new Uint32Array(80), f = 0; f < 16; ++f) h[f] = u[p][f];
        for (var d = 16; d < 80; ++d)
            h[d] = _n(h[d - 3] ^ h[d - 8] ^ h[d - 14] ^ h[d - 16], 1);
        for (
            var y = r[0], b = r[1], v = r[2], _ = r[3], m = r[4], g = 0;
            g < 80;
            ++g
        ) {
            var w = Math.floor(g / 20),
                j = (_n(y, 5) + vn(w, b, v, _) + m + e[w] + h[g]) >>> 0;
            (m = _), (_ = v), (v = _n(b, 30) >>> 0), (b = y), (y = j);
        }
        (r[0] = (r[0] + y) >>> 0),
            (r[1] = (r[1] + b) >>> 0),
            (r[2] = (r[2] + v) >>> 0),
            (r[3] = (r[3] + _) >>> 0),
            (r[4] = (r[4] + m) >>> 0);
    }
    return [
        (r[0] >> 24) & 255,
        (r[0] >> 16) & 255,
        (r[0] >> 8) & 255,
        255 & r[0],
        (r[1] >> 24) & 255,
        (r[1] >> 16) & 255,
        (r[1] >> 8) & 255,
        255 & r[1],
        (r[2] >> 24) & 255,
        (r[2] >> 16) & 255,
        (r[2] >> 8) & 255,
        255 & r[2],
        (r[3] >> 24) & 255,
        (r[3] >> 16) & 255,
        (r[3] >> 8) & 255,
        255 & r[3],
        (r[4] >> 24) & 255,
        (r[4] >> 16) & 255,
        (r[4] >> 8) & 255,
        255 & r[4]
    ];
});
const { format: gn, commit: wn } = sn;
class jn {
    _index = bn();
    _status = "free";
    _createdAt = new Date();
    _updatedAt = new Date();
    _errorList = [];
    originData = {};
    _result;
    _marks = {};
    _complete = !1;
    _processUUID = "";
    constructor(t, e) {
        Object.assign(this.originData, sn.data()),
            this.$formatMessage(t),
            (this._processUUID = e);
    }
    $formatMessage(t) {
        let e = un(t);
        if (!(gn[e] instanceof Function))
            throw new Error("format 状态错误" + this._index);
        gn[e].apply(this, [t]);
    }
    $commit(t, ...e) {
        if (!(wn[t] instanceof Function))
            throw new Error("commit 状态错误" + this._index);
        {
            const r = wn[t].apply(this, e);
            if (!1 !== r)
                return (this._status = t), (this._updatedAt = new Date()), r;
        }
    }
    $checkRepeat(t) {
        return this._marks?.[t];
    }
    $output() {
        const t = nn([
            "_processUUID",
            "_index",
            "_status",
            "_createdAt",
            "_updatedAt",
            "_errorList",
            "_result",
            "_marks",
            "originData"
        ]);
        return (t._isABackup = !0), t;
    }
}
const Sn = (t) => {
    return v(
        ((e = (e) =>
            "complete" === e._status &&
            e._completeUUID === t._processUUID &&
            (console.warn("跳过一个目标"), !0)),
        function (t) {
            return t.lift(new wt(e));
        })
    );
    var e;
};
function xn(t) {
    return mn(t, mn.URL);
}
const On = (t, e) => {
    return v(
        ((r = (r) =>
            r.pipe(
                (function (t, e) {
                    var r = !1;
                    return (
                        arguments.length >= 2 && (r = !0),
                        function (n) {
                            return n.lift(new vt(t, e, r));
                        }
                    );
                })((e, r) => {
                    if ((console.log("尝试次数", e, r), e >= t))
                        throw new Error("超出尝试次数", r);
                    return e + 1;
                }, 0),
                ht((...t) => {
                    switch (typeof e) {
                        case "string":
                        case "number":
                            return rt(parseInt(e));
                        case "function":
                            return rt(e(...t));
                        default:
                            throw new Error("您输入的 delay 错误");
                    }
                })
            )),
        function (t) {
            return t.lift(new mt(r, t));
        })
    );
    var r;
};
class En {
    _ready = !1;
    uuid = "";
    #PluginLine = [];
    constructor(...t) {
        this.#createLineUUID(t), (this.Plugins = t);
    }
    #createLineUUID(t) {
        this.uuid = xn(t.reduce((t, e) => t + e.uuid, ""));
    }
    #preparePlugins() {
        return this.Plugins.reduce(
            (t, e) => (
                this.#PluginLine.push(e.operator(this)),
                e.init instanceof Function && t.then(() => e.init()),
                t
            ),
            Promise.resolve()
        ).then(() => (this._ready = !0));
    }
    use(t) {}
    async apply(t) {
        var e;
        this._ready || (await this.#preparePlugins()),
            W(t)
                .pipe(
                    ((e = this), v(R((t) => new jn(t, e.uuid)))),
                    Sn(this),
                    ...this.#PluginLine,
                    Et((t) => {
                        t.$commit("complete", this.uuid);
                    })
                )
                .subscribe({ complete() {} });
    }
}
class kn {
    constructor({
        forceRetry: t = !0,
        name: e = null,
        main: r,
        init: n = null,
        error: o = null,
        complete: i = null,
        options: s = {},
        saveMiddleResult: u = !1,
        operator: c
    }) {
        const a = xn(r.toString());
        c && (this.operator = c),
            Object.assign(this, {
                name: e || a,
                uuid: a,
                main: r,
                init: n,
                error: o,
                complete: i,
                options: s,
                saveMiddleResult: u,
                forceRetry: t
            });
    }
    TaskStarter(t) {
        return F(t).pipe(
            St((t) =>
                t.$checkRepeat(this.uuid) || this.forceRetry
                    ? F(t).pipe(
                          R((t) => [
                              t.$commit("start", this.uuid),
                              t.originData
                          ]),
                          St(([t, e]) => {
                              const r = this.main(t, e);
                              return r instanceof Promise || r instanceof m
                                  ? W(r)
                                  : F(r);
                          }),
                          R(
                              (e) => (
                                  t.$commit(
                                      "success",
                                      e,
                                      this.uuid,
                                      this.saveMiddleResult
                                  ),
                                  t
                              )
                          )
                      )
                    : (console.log("跳过一个目标"), F(t))
            ),
            ct((...e) => {
                let r;
                if (this.error instanceof Function) {
                    if (((r = this.error(t, ...e)), r)) throw r;
                    return T;
                }
                throw e[0];
            }),
            Et((t) => this.complete && this.complete(t))
        );
    }
    operator(t) {
        return v(St((t) => this.TaskStarter(t)));
    }
}
function An(t) {
    if (t instanceof Function) return new kn({ main: t });
    if (t instanceof Object) return new kn(t);
    throw new Error("Plugin must be input a function or Object");
}
const Tn = {
        data: () => ({}),
        commit: {
            start(t) {
                return (
                    (this._marks[t] = null),
                    this._result ||
                        this.originData.map((e) => e.$commit("start", t))
                );
            },
            complete(t) {
                return (
                    (this._processUUID = t),
                    (this._complete = !0),
                    this.originData.forEach((e) => e.$commit("complete", t)),
                    !0
                );
            },
            success(t, e, r = !1) {
                return (
                    (this._marks[e] = !r || this._result),
                    (this._result = t),
                    this.originData.forEach((r) =>
                        r.$commit("success", t, e, !1)
                    ),
                    !0
                );
            },
            error(t) {
                return (
                    this._errorList.push(new TaskError(t)),
                    this.originData.forEach((e) => e.$commit("error", t)),
                    !0
                );
            }
        }
    },
    { commit: In } = Tn;
class Pn extends jn {
    constructor(t, e) {
        super(new Array(...t), e);
    }
    $commit(t, ...e) {
        if (!(In[t] instanceof Function))
            throw new Error("commit 状态错误" + this._index);
        {
            const r = In[t].apply(this, e);
            if (!1 !== r)
                return (this._status = t), (this._updatedAt = new Date()), r;
        }
    }
    $checkRepeat() {
        return !0;
    }
    $break() {
        return this.originData;
    }
}
const Dn = function ({ url: t, options: e = {} }) {
        const { returnType: r = "json" } = this.options;
        return (
            console.log("- 爬取 ", t),
            fetch(t, e)
                .then((t) => {
                    if (!t.ok) throw Error(t.statusText);
                    return (function (t, e) {
                        let r = t.headers.get("content-type") || "";
                        return e && "auto" !== e
                            ? e
                                ? t[e]()
                                : t.json()
                            : /text|html|rtf|xml/.test(r)
                            ? t.text()
                            : /json/.test(r)
                            ? t.json()
                            : /arrayBuffer/.test(r)
                            ? t.arrayBuffer()
                            : t.buffer
                            ? t.buffer()
                            : t.blob();
                    })(t, r);
                })
                .then((e) => (console.log(t + " 爬取成功"), e))
                .catch((t) => {
                    throw t;
                })
        );
    },
    Cn = function (t, e) {
        throw t;
    },
    Fn = function (t = {}) {
        return An({
            init() {},
            main: Dn,
            options: t,
            operator(t) {
                const {
                    delay: e = 200,
                    buffer: r = 3,
                    retry: n = 3,
                    handleError: o = null
                } = this.options;
                return (t) =>
                    t.pipe(
                        (function (
                            t,
                            {
                                retry: e = 3,
                                buffer: r = 3,
                                delay: n = 0,
                                retryDelay: o = 300,
                                handleError: i = function (t, e) {
                                    throw new Error(t);
                                }
                            } = {}
                        ) {
                            return v(
                                ot(r),
                                ht((t, e) => rt(e * n)),
                                St((t) => F(...t)),
                                pt((r) =>
                                    F(r).pipe(
                                        St((e) => {
                                            const r = t(e);
                                            return r instanceof m ? W(r) : F(r);
                                        }),
                                        On(e, o),
                                        ct((...t) => i(...t) || T)
                                    )
                                )
                            );
                        })((t) => this.TaskStarter(t), {
                            delay: e,
                            buffer: r,
                            retry: n,
                            handleError: o || Cn
                        })
                    );
            }
        });
    };
function Ln(t, e) {
    return t instanceof File
        ? t
        : t instanceof Blob
        ? ((t.name = e), t)
        : new File([JSON.stringify(t)], e);
}
const Un = {
        main: Promise.resolve(!0),
        add(t) {
            this.main.then(() => Rn(t));
        }
    },
    Rn = function (t) {
        let e = document.createElement("a");
        (e.href = URL.createObjectURL(t)),
            (e.download = t.name),
            e.click(),
            URL.revokeObjectURL(e.href),
            e.remove(),
            console.log("%c 下载完成", "color:green");
    },
    zn = (t, { DownloadFileName: e }, r) => {
        const n = Ln(
            t,
            e || ("string" == typeof url ? r.url.replace(/[^\/]*?\//g, "") : "")
        );
        return Un.add(n), null;
    },
    Nn = function (t = {}) {
        return An({ main: zn, options: t });
    };
"undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self && self;
var $n = (function (t, e) {
    return t((e = { exports: {} }), e.exports), e.exports;
})(function (t, e) {
    t.exports = (function () {
        function t(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
        }
        function e(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n);
            }
        }
        function r(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
        }
        function n(t, e, r) {
            return (
                e in t
                    ? Object.defineProperty(t, e, {
                          value: r,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0
                      })
                    : (t[e] = r),
                t
            );
        }
        function o(t, e) {
            var r = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e &&
                    (n = n.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    r.push.apply(r, n);
            }
            return r;
        }
        function i(t) {
            for (var e = 1; e < arguments.length; e++) {
                var r = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? o(Object(r), !0).forEach(function (e) {
                          n(t, e, r[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                          t,
                          Object.getOwnPropertyDescriptors(r)
                      )
                    : o(Object(r)).forEach(function (e) {
                          Object.defineProperty(
                              t,
                              e,
                              Object.getOwnPropertyDescriptor(r, e)
                          );
                      });
            }
            return t;
        }
        function s(t) {
            return (
                (function (t) {
                    if (Array.isArray(t)) return c(t);
                })(t) ||
                (function (t) {
                    if (
                        "undefined" != typeof Symbol &&
                        Symbol.iterator in Object(t)
                    )
                        return Array.from(t);
                })(t) ||
                u(t) ||
                (function () {
                    throw new TypeError(
                        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                    );
                })()
            );
        }
        function u(t, e) {
            if (t) {
                if ("string" == typeof t) return c(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                return (
                    "Object" === r && t.constructor && (r = t.constructor.name),
                    "Map" === r || "Set" === r
                        ? Array.from(t)
                        : "Arguments" === r ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? c(t, e)
                        : void 0
                );
            }
        }
        function c(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
            return n;
        }
        function a(t) {
            if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
                if (Array.isArray(t) || (t = u(t))) {
                    var e = 0,
                        r = function () {};
                    return {
                        s: r,
                        n: function () {
                            return e >= t.length
                                ? { done: !0 }
                                : { done: !1, value: t[e++] };
                        },
                        e: function (t) {
                            throw t;
                        },
                        f: r
                    };
                }
                throw new TypeError(
                    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                );
            }
            var n,
                o,
                i = !0,
                s = !1;
            return {
                s: function () {
                    n = t[Symbol.iterator]();
                },
                n: function () {
                    var t = n.next();
                    return (i = t.done), t;
                },
                e: function (t) {
                    (s = !0), (o = t);
                },
                f: function () {
                    try {
                        i || null == n.return || n.return();
                    } finally {
                        if (s) throw o;
                    }
                }
            };
        }
        var l = {};
        (l[(l.Fatal = 0)] = "Fatal"),
            (l[(l.Error = 0)] = "Error"),
            (l[(l.Warn = 1)] = "Warn"),
            (l[(l.Log = 2)] = "Log"),
            (l[(l.Info = 3)] = "Info"),
            (l[(l.Success = 3)] = "Success"),
            (l[(l.Debug = 4)] = "Debug"),
            (l[(l.Trace = 5)] = "Trace"),
            (l[(l.Silent = -1 / 0)] = "Silent"),
            (l[(l.Verbose = 1 / 0)] = "Verbose");
        var p = {
            silent: { level: -1 },
            fatal: { level: l.Fatal },
            error: { level: l.Error },
            warn: { level: l.Warn },
            log: { level: l.Log },
            info: { level: l.Info },
            success: { level: l.Success },
            debug: { level: l.Debug },
            trace: { level: l.Trace },
            verbose: { level: l.Trace },
            ready: { level: l.Info },
            start: { level: l.Info }
        };
        function h(t) {
            return (
                (e = t),
                !(
                    "[object Object]" !== Object.prototype.toString.call(e) ||
                    (!t.message && !t.args) ||
                    t.stack
                )
            );
            var e;
        }
        var f = !1,
            d = [],
            y = (function () {
                function e() {
                    var r =
                        arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                    for (var n in (t(this, e),
                    (this._reporters = r.reporters || []),
                    (this._types = r.types || p),
                    (this.level = void 0 !== r.level ? r.level : 3),
                    (this._defaults = r.defaults || {}),
                    (this._async = void 0 !== r.async ? r.async : void 0),
                    (this._stdout = r.stdout),
                    (this._stderr = r.stderr),
                    (this._mockFn = r.mockFn),
                    (this._throttle = r.throttle || 1e3),
                    (this._throttleMin = r.throttleMin || 5),
                    this._types)) {
                        var o = i(
                            i({ type: n }, this._types[n]),
                            this._defaults
                        );
                        (this[n] = this._wrapLogFn(o)),
                            (this[n].raw = this._wrapLogFn(o, !0));
                    }
                    this._mockFn && this.mockTypes(),
                        (this._lastLogSerialized = void 0),
                        (this._lastLog = void 0),
                        (this._lastLogTime = void 0),
                        (this._lastLogCount = 0),
                        (this._throttleTimeout = void 0);
                }
                return (
                    r(e, [
                        {
                            key: "create",
                            value: function (t) {
                                return new e(
                                    Object.assign(
                                        {
                                            reporters: this._reporters,
                                            level: this.level,
                                            types: this._types,
                                            defaults: this._defaults,
                                            stdout: this._stdout,
                                            stderr: this._stderr,
                                            mockFn: this._mockFn
                                        },
                                        t
                                    )
                                );
                            }
                        },
                        {
                            key: "withDefaults",
                            value: function (t) {
                                return this.create({
                                    defaults: Object.assign(
                                        {},
                                        this._defaults,
                                        t
                                    )
                                });
                            }
                        },
                        {
                            key: "withTag",
                            value: function (t) {
                                return this.withDefaults({
                                    tag: this._defaults.tag
                                        ? this._defaults.tag + ":" + t
                                        : t
                                });
                            }
                        },
                        {
                            key: "addReporter",
                            value: function (t) {
                                return this._reporters.push(t), this;
                            }
                        },
                        {
                            key: "removeReporter",
                            value: function (t) {
                                if (t) {
                                    var e = this._reporters.indexOf(t);
                                    if (e >= 0)
                                        return this._reporters.splice(e, 1);
                                } else this._reporters.splice(0);
                                return this;
                            }
                        },
                        {
                            key: "setReporters",
                            value: function (t) {
                                return (
                                    (this._reporters = Array.isArray(t)
                                        ? t
                                        : [t]),
                                    this
                                );
                            }
                        },
                        {
                            key: "wrapAll",
                            value: function () {
                                this.wrapConsole(), this.wrapStd();
                            }
                        },
                        {
                            key: "restoreAll",
                            value: function () {
                                this.restoreConsole(), this.restoreStd();
                            }
                        },
                        {
                            key: "wrapConsole",
                            value: function () {
                                for (var t in this._types)
                                    console["__" + t] ||
                                        (console["__" + t] = console[t]),
                                        (console[t] = this[t].raw);
                            }
                        },
                        {
                            key: "restoreConsole",
                            value: function () {
                                for (var t in this._types)
                                    console["__" + t] &&
                                        ((console[t] = console["__" + t]),
                                        delete console["__" + t]);
                            }
                        },
                        {
                            key: "wrapStd",
                            value: function () {
                                this._wrapStream(this.stdout, "log"),
                                    this._wrapStream(this.stderr, "log");
                            }
                        },
                        {
                            key: "_wrapStream",
                            value: function (t, e) {
                                var r = this;
                                t &&
                                    (t.__write || (t.__write = t.write),
                                    (t.write = function (t) {
                                        r[e].raw(String(t).trim());
                                    }));
                            }
                        },
                        {
                            key: "restoreStd",
                            value: function () {
                                this._restoreStream(this.stdout),
                                    this._restoreStream(this.stderr);
                            }
                        },
                        {
                            key: "_restoreStream",
                            value: function (t) {
                                t &&
                                    t.__write &&
                                    ((t.write = t.__write), delete t.__write);
                            }
                        },
                        {
                            key: "pauseLogs",
                            value: function () {
                                f = !0;
                            }
                        },
                        {
                            key: "resumeLogs",
                            value: function () {
                                f = !1;
                                var t,
                                    e = a(d.splice(0));
                                try {
                                    for (e.s(); !(t = e.n()).done; ) {
                                        var r = t.value;
                                        r[0]._logFn(r[1], r[2]);
                                    }
                                } catch (t) {
                                    e.e(t);
                                } finally {
                                    e.f();
                                }
                            }
                        },
                        {
                            key: "mockTypes",
                            value: function (t) {
                                if (
                                    ((this._mockFn = t || this._mockFn),
                                    "function" == typeof this._mockFn)
                                )
                                    for (var e in this._types)
                                        (this[e] =
                                            this._mockFn(e, this._types[e]) ||
                                            this[e]),
                                            (this[e].raw = this[e]);
                            }
                        },
                        {
                            key: "_wrapLogFn",
                            value: function (t, e) {
                                var r = this;
                                return function () {
                                    for (
                                        var n = arguments.length,
                                            o = new Array(n),
                                            i = 0;
                                        i < n;
                                        i++
                                    )
                                        o[i] = arguments[i];
                                    if (!f) return r._logFn(t, o, e);
                                    d.push([r, t, o, e]);
                                };
                            }
                        },
                        {
                            key: "_logFn",
                            value: function (t, e, r) {
                                var n = this;
                                if (t.level > this.level)
                                    return !!this._async && Promise.resolve(!1);
                                var o = Object.assign(
                                    { date: new Date(), args: [] },
                                    t
                                );
                                !r && 1 === e.length && h(e[0])
                                    ? Object.assign(o, e[0])
                                    : (o.args = Array.from(e)),
                                    o.message &&
                                        (o.args.unshift(o.message),
                                        delete o.message),
                                    o.additional &&
                                        (Array.isArray(o.additional) ||
                                            (o.additional =
                                                o.additional.split("\n")),
                                        o.args.push(
                                            "\n" + o.additional.join("\n")
                                        ),
                                        delete o.additional),
                                    (o.type =
                                        "string" == typeof o.type
                                            ? o.type.toLowerCase()
                                            : ""),
                                    (o.tag =
                                        "string" == typeof o.tag
                                            ? o.tag.toLowerCase()
                                            : "");
                                var u = function () {
                                    var t =
                                            arguments.length > 0 &&
                                            void 0 !== arguments[0] &&
                                            arguments[0],
                                        e = n._lastLogCount - n._throttleMin;
                                    if (n._lastLog && e > 0) {
                                        var r = s(n._lastLog.args);
                                        e > 1 &&
                                            r.push(
                                                "(repeated ".concat(
                                                    e,
                                                    " times)"
                                                )
                                            ),
                                            n._log(
                                                i(
                                                    i({}, n._lastLog),
                                                    {},
                                                    { args: r }
                                                )
                                            ),
                                            (n._lastLogCount = 1);
                                    }
                                    if (t) {
                                        if (((n._lastLog = o), n._async))
                                            return n._logAsync(o);
                                        n._log(o);
                                    }
                                };
                                clearTimeout(this._throttleTimeout);
                                var c = this._lastLogTime
                                    ? o.date - this._lastLogTime
                                    : 0;
                                if (
                                    ((this._lastLogTime = o.date),
                                    c < this._throttle)
                                )
                                    try {
                                        var a = JSON.stringify([
                                                o.type,
                                                o.tag,
                                                o.args
                                            ]),
                                            l = this._lastLogSerialized === a;
                                        if (
                                            ((this._lastLogSerialized = a),
                                            l &&
                                                (this._lastLogCount++,
                                                this._lastLogCount >
                                                    this._throttleMin))
                                        )
                                            return void (this._throttleTimeout =
                                                setTimeout(u, this._throttle));
                                    } catch (t) {}
                                u(!0);
                            }
                        },
                        {
                            key: "_log",
                            value: function (t) {
                                var e,
                                    r = a(this._reporters);
                                try {
                                    for (r.s(); !(e = r.n()).done; )
                                        e.value.log(t, {
                                            async: !1,
                                            stdout: this.stdout,
                                            stderr: this.stderr
                                        });
                                } catch (t) {
                                    r.e(t);
                                } finally {
                                    r.f();
                                }
                            }
                        },
                        {
                            key: "_logAsync",
                            value: function (t) {
                                var e = this;
                                return Promise.all(
                                    this._reporters.map(function (r) {
                                        return r.log(t, {
                                            async: !0,
                                            stdout: e.stdout,
                                            stderr: e.stderr
                                        });
                                    })
                                );
                            }
                        },
                        {
                            key: "stdout",
                            get: function () {
                                return this._stdout || console._stdout;
                            }
                        },
                        {
                            key: "stderr",
                            get: function () {
                                return this._stderr || console._stderr;
                            }
                        }
                    ]),
                    e
                );
            })();
        (y.prototype.add = y.prototype.addReporter),
            (y.prototype.remove = y.prototype.removeReporter),
            (y.prototype.clear = y.prototype.removeReporter),
            (y.prototype.withScope = y.prototype.withTag),
            (y.prototype.mock = y.prototype.mockTypes),
            (y.prototype.pause = y.prototype.pauseLogs),
            (y.prototype.resume = y.prototype.resumeLogs);
        var b,
            v = (function () {
                function e(r) {
                    t(this, e),
                        (this.options = Object.assign({}, r)),
                        (this.defaultColor = "#7f8c8d"),
                        (this.levelColorMap = {
                            0: "#c0392b",
                            1: "#f39c12",
                            3: "#00BCD4"
                        }),
                        (this.typeColorMap = { success: "#2ecc71" });
                }
                return (
                    r(e, [
                        {
                            key: "log",
                            value: function (t) {
                                var e =
                                        t.level < 1
                                            ? console.__error || console.error
                                            : 1 === t.level && console.warn
                                            ? console.__warn || console.warn
                                            : console.__log || console.log,
                                    r = "log" !== t.type ? t.type : "",
                                    n = t.tag ? t.tag : "",
                                    o =
                                        this.typeColorMap[t.type] ||
                                        this.levelColorMap[t.level] ||
                                        this.defaultColor,
                                    i = "\n      background: ".concat(
                                        o,
                                        ";\n      border-radius: 0.5em;\n      color: white;\n      font-weight: bold;\n      padding: 2px 0.5em;\n    "
                                    ),
                                    u = "%c".concat(
                                        [n, r].filter(Boolean).join(":")
                                    );
                                "string" == typeof t.args[0]
                                    ? e.apply(
                                          void 0,
                                          [
                                              ""
                                                  .concat(u, "%c ")
                                                  .concat(t.args[0]),
                                              i,
                                              ""
                                          ].concat(s(t.args.slice(1)))
                                      )
                                    : e.apply(void 0, [u, i].concat(s(t.args)));
                            }
                        }
                    ]),
                    e
                );
            })();
        return (
            ("undefined" != typeof window && window.consola) ||
            (((b = new y({ reporters: [new v()] })).Consola = y),
            (b.LogLevel = l),
            (b.BrowserReporter = v),
            b)
        );
    })();
});
const Mn = {
    script: (t) =>
        new Promise((e, r) => {
            let n = document.createElement("script");
            (n.src = t),
                (n.onload = () => {
                    $n.success(t + " 加载完成"), n.remove(), e();
                }),
                (n.onerror = (t) => r(t)),
                document.body.append(n);
        }),
    css: (t) =>
        new Promise((e, r) => {
            let n = document.createElement("style");
            (n.rel = "stylesheet"),
                (n.src = t),
                (n.onload = () => {
                    $n.success(t + " 加载完成"), e();
                }),
                (n.onerror = (t) => r(t)),
                document.body.append(n);
        })
};
var Bn = {
    zangodb:
        "https://cdn.jsdelivr.net/gh/erikolson186/zangodb/dist/zangodb.min.js",
    dexie: "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.min.js",
    mockjs: "https://cdn.jsdelivr.net/npm/mockjs-esm/dist/mock.min.js",
    xlsx: "https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js",
    lodash: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
    gsap: [
        "https://cdn.jsdelivr.net/npm/gsap@3.6.1/dist/gsap.min.js",
        "https://cdn.jsdelivr.net/npm/gsap@3.6.1/dist/ScrollTrigger.min.js"
    ],
    animejs: "https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js",
    rxjs: "https://cdn.jsdelivr.net/npm/rxjs@7.1.0/dist/bundles/rxjs.umd.min.js",
    jszip: "https://cdn.jsdelivr.net/npm/jszip@3.6.0/dist/jszip.min.js",
    "ajax-hook": "https://unpkg.com/ajax-hook@2.0.3/dist/ajaxhook.min.js",
    axios: "https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js",
    react: [
        "https://unpkg.com/react@16/umd/react.production.min.js",
        "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
    ]
};
const Vn = Object.entries({
    npm: /^npm?/i,
    gh: /gh?|github/i,
    wp: /wordpress|wp/i
});
const Hn =
    /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
function Yn({ name: t, way: e, path: r, version: n }) {
    return Bn.hasOwnProperty(t)
        ? Bn[t]
        : (function (
              t,
              { version: e = "", store: r = "npm", path: n = "" } = {}
          ) {
              return `https://cdn.jsdelivr.net/${Vn.reduce(
                  (t, [e, n]) => (n.test(r) ? e : t),
                  "npm"
              )}/${t}${e ? "@" + e : ""}${n ? "/" + n : ""}`;
          })(t, { version: n, store: e, path: r });
}
const qn = {
    Object({
        url: t = "",
        name: e,
        way: r = "npm",
        path: n = "",
        version: o = "",
        type: i = "script"
    }) {
        if (!t) {
            const i = Yn({ name: e, way: r, path: n, version: o });
            if ("string" != typeof i) return Xn(i);
            t = i;
        }
        return Mn[i](t);
    },
    String(t) {
        return this.Object({ [Hn.test(t) ? "url" : "name"]: t });
    },
    Array: (t) => Promise.all(t.map((t) => Xn(t)))
};
async function Xn(t) {
    return qn[un(t)](t);
}
let Wn;
function Jn() {
    return Xn("xlsx").then(() => {
        Wn = window.XLSX;
    });
}
function Zn(t) {
    let e = Wn.utils.book_new();
    return (
        Object.entries(t).forEach(([t, r]) => {
            let n = (function (t) {
                return (
                    t.forEach((t) => {
                        Object.entries(t).forEach(([e, r]) => {
                            r instanceof Object && (t[e] = JSON.stringify(r));
                        });
                    }),
                    Wn.utils.json_to_sheet(t)
                );
            })(r);
            Wn.utils.book_append_sheet(e, n, t);
        }),
        e
    );
}
function Gn(t, e, r) {
    let { bookType: n = "xlsx", bookSST: o = !0, type: i = "array" } = r || {};
    return (function (t, e, r) {
        let n = Wn.write(t, r);
        return new File([n], e + "." + r.bookType);
    })(Zn(t), e, { bookType: n, bookSST: o, type: i });
}
let Kn;
function Qn() {
    return Xn("jszip").then((t) => {
        Kn = window.JSZip;
    });
}
let to = 0;
var eo = Object.freeze({
    __proto__: null,
    Request: Fn,
    Download: Nn,
    ExcelHelper: function (t, e = {}) {
        return An({
            init: Jn,
            options: e,
            main(e) {
                let { fileName: r = "爬取结果", XLSXOptions: n = {} } =
                    this.options;
                return t instanceof Function && (e = t(e)), Gn(e, r, n);
            }
        });
    },
    ZipFile: function (t = {}) {
        return (
            t.zipFileName || (t.zipFileName = new Date().getTime()),
            An({
                init: Qn,
                main(t) {
                    const { zipFileName: e } = this.options;
                    return (async function (t, e) {
                        let r = new Kn();
                        t.forEach((t) => r.file(t.name, t));
                        let n = await r.generateAsync({ type: "blob" });
                        return (n.name = `${e}-${to++}.zip`), n;
                    })(
                        t.map((t) => Ln(t, e)),
                        e
                    );
                },
                options: t,
                operator(t) {
                    const { chunk: e = 3 } = this.options;
                    return (t) =>
                        t.pipe(
                            ot(e),
                            pt((t) => this.TaskStarter(new Pn(t), this.uuid))
                        );
                }
            })
        );
    }
});
var ro = [
    "webkitStorageInfo",
    "0",
    "1",
    "cookieStore",
    "crossOriginIsolated",
    "onbeforexrselect",
    "ontransitioncancel",
    "ontransitionrun",
    "ontransitionstart",
    "originAgentCluster",
    "showDirectoryPicker",
    "showOpenFilePicker",
    "showSaveFilePicker",
    "trustedTypes",
    "parent",
    "opener",
    "top",
    "length",
    "frames",
    "closed",
    "location",
    "self",
    "window",
    "document",
    "name",
    "customElements",
    "history",
    "locationbar",
    "menubar",
    "personalbar",
    "scrollbars",
    "statusbar",
    "toolbar",
    "status",
    "frameElement",
    "navigator",
    "origin",
    "external",
    "screen",
    "innerWidth",
    "innerHeight",
    "scrollX",
    "pageXOffset",
    "scrollY",
    "pageYOffset",
    "visualViewport",
    "screenX",
    "screenY",
    "outerWidth",
    "outerHeight",
    "devicePixelRatio",
    "clientInformation",
    "screenLeft",
    "screenTop",
    "defaultStatus",
    "defaultstatus",
    "styleMedia",
    "onsearch",
    "isSecureContext",
    "onabort",
    "onblur",
    "oncancel",
    "oncanplay",
    "oncanplaythrough",
    "onchange",
    "onclick",
    "onclose",
    "oncontextmenu",
    "oncuechange",
    "ondblclick",
    "ondrag",
    "ondragend",
    "ondragenter",
    "ondragleave",
    "ondragover",
    "ondragstart",
    "ondrop",
    "ondurationchange",
    "onemptied",
    "onended",
    "onerror",
    "onfocus",
    "onformdata",
    "oninput",
    "oninvalid",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onload",
    "onloadeddata",
    "onloadedmetadata",
    "onloadstart",
    "onmousedown",
    "onmouseenter",
    "onmouseleave",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onmousewheel",
    "onpause",
    "onplay",
    "onplaying",
    "onprogress",
    "onratechange",
    "onreset",
    "onresize",
    "onscroll",
    "onseeked",
    "onseeking",
    "onselect",
    "onstalled",
    "onsubmit",
    "onsuspend",
    "ontimeupdate",
    "ontoggle",
    "onvolumechange",
    "onwaiting",
    "onwebkitanimationend",
    "onwebkitanimationiteration",
    "onwebkitanimationstart",
    "onwebkittransitionend",
    "onwheel",
    "onauxclick",
    "ongotpointercapture",
    "onlostpointercapture",
    "onpointerdown",
    "onpointermove",
    "onpointerup",
    "onpointercancel",
    "onpointerover",
    "onpointerout",
    "onpointerenter",
    "onpointerleave",
    "onselectstart",
    "onselectionchange",
    "onanimationend",
    "onanimationiteration",
    "onanimationstart",
    "ontransitionend",
    "onafterprint",
    "onbeforeprint",
    "onbeforeunload",
    "onhashchange",
    "onlanguagechange",
    "onmessage",
    "onmessageerror",
    "onoffline",
    "ononline",
    "onpagehide",
    "onpageshow",
    "onpopstate",
    "onrejectionhandled",
    "onstorage",
    "onunhandledrejection",
    "onunload",
    "performance",
    "stop",
    "open",
    "alert",
    "confirm",
    "prompt",
    "print",
    "queueMicrotask",
    "requestAnimationFrame",
    "cancelAnimationFrame",
    "captureEvents",
    "releaseEvents",
    "requestIdleCallback",
    "cancelIdleCallback",
    "getComputedStyle",
    "matchMedia",
    "moveTo",
    "moveBy",
    "resizeTo",
    "resizeBy",
    "scroll",
    "scrollTo",
    "scrollBy",
    "getSelection",
    "find",
    "webkitRequestAnimationFrame",
    "webkitCancelAnimationFrame",
    "fetch",
    "btoa",
    "atob",
    "setTimeout",
    "clearTimeout",
    "setInterval",
    "clearInterval",
    "createImageBitmap",
    "close",
    "focus",
    "blur",
    "postMessage",
    "onappinstalled",
    "onbeforeinstallprompt",
    "crypto",
    "indexedDB",
    "sessionStorage",
    "localStorage",
    "chrome",
    "onpointerrawupdate",
    "speechSynthesis",
    "webkitRequestFileSystem",
    "webkitResolveLocalFileSystemURL",
    "openDatabase",
    "applicationCache",
    "caches",
    "ondevicemotion",
    "ondeviceorientation",
    "ondeviceorientationabsolute"
];
const no = {
    RE: "",
    StringFunction(t, e, r, n) {
        return this.RE.test(r + "") && t.push(n), t;
    },
    Array(t, e, r) {
        var n = oo(Object.entries(r), this.RE);
        const o = n.reduce((t, [e, r]) => ((t[parseInt(e)] = r), t), []);
        return n.length && t.push([e, o]), t;
    },
    Function(t, e, r) {
        let n = oo(Object.entries(r), this.RE);
        return (
            n.length && t.push([e, Object.assign(r, Object.fromEntries(n))]), t
        );
    },
    Object(t, e, r) {
        let n = oo(Object.entries(r), this.RE);
        return n.length && t.push([e, Object.fromEntries(n)]), t;
    }
};
function oo(t, e, r = !1) {
    return t.reduce((t, n) => {
        const [o, i] = n;
        if (e.test(o)) return [...t, n];
        {
            no.RE = e;
            let s = un(i);
            return no.hasOwnProperty(s) ? no[s](t, o, i, n) : r ? [t, n] : t;
        }
    }, []);
}
(no.Number = no.StringFunction), (no.String = no.StringFunction);
const io = {
        excel: {
            url: "/fake/excel",
            type: "get",
            template: {
                "data|100": [
                    {
                        ID: "@increment()",
                        name: "@cname()",
                        description: "@csentence()",
                        avatar: '@dataImage("64x64")',
                        address: "@region()",
                        province: "@province()"
                    }
                ]
            }
        }
    },
    so = {};
var uo = Object.freeze({
    __proto__: null,
    $antiDebugger: function () {
        Function.prototype.$constructor ||
            ((Function.prototype.$constructor = Function.prototype.constructor),
            (Function.prototype.constructor = function () {
                if (
                    !arguments ||
                    "string" != typeof arguments[0] ||
                    "debugger" !== arguments[0]
                )
                    return Function.prototype.$constructor.apply(
                        this,
                        arguments
                    );
            }));
    },
    $copy: function (t, e = !1) {
        e &&
            ([document, ...document.querySelectorAll("*")].forEach((t) => {
                (t.oncontextmenu = ""),
                    (t.oncopy = ""),
                    (t.oncut = ""),
                    (t.onselectstart = !0);
                let e = window.getEventListeners(t);
                ["keydown", "copy", "cut"].forEach((r) => {
                    e.hasOwnProperty(r) &&
                        e[r].forEach((e) =>
                            t.removeEventListener(r, e.listener)
                        );
                });
            }),
            $n.success("copy 方式清理完成")),
            (window.copy &&
                "function copy(value) { [Command Line API] }" ===
                    window.copy.toString()) ||
                delete window.copy,
            window.copy(t),
            $n.success("copy 完成，请您查看您的剪贴版");
    },
    $GlobalVars: function () {
        const t = Zr(Object.keys(window), ro);
        return nn(window, t);
    },
    $search: function (t, e) {
        var r;
        if (
            (!Qr(e) &&
                ("string" == typeof (r = e) ||
                    (!Vt(r) && $t(r) && "[object String]" == Nt(r))) &&
                (e = new RegExp(e)),
            t instanceof Array)
        )
            return oo(Object.entries({ i: t }), e)[0][1];
        if (t instanceof Object)
            return Object.fromEntries(oo(Object.entries(t), e));
        throw new Error("不是对象，不能搜索");
    },
    $load: Xn,
    $Mock: async function (t) {
        if (
            (window.Mock ||
                (await Xn("mockjs"), $n.warn("Mockjs 载入并代理 Ajax 中")),
            !so[t])
        ) {
            $n.warn("mock 启动后台 ", t);
            let { url: e, type: r, template: n } = io[t];
            window.Mock.mock(e, r, n), (so[t] = !0);
        }
    }
});
const co = function (t) {
    new En(Fn(), Nn()).apply(t);
};
export {
    En as JSpider,
    An as Plugin,
    jn as Task,
    Pn as TaskGroup,
    eo as plugins,
    co as simpleCrawl,
    uo as tools
};
