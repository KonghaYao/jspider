/**
 * MIT License
 * 
 * Copyright (c) 2020 动中之动
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

import{O as t,b as e,p as n,f as r,m as i}from"../mergeMap-1cf10555.js";import{k as s,d as o,l as u,n as c,p as l,o as a,O as h,h as d}from"../map-f4798e28.js";import{c as f}from"../concatMap-0d4163f6.js";import{d as p}from"../delayWhen-ec4378ef.js";var v=function(){return Date.now()},y=function(t){function e(e,n){return t.call(this)||this}return s(e,t),e.prototype.schedule=function(t,e){return this},e}(o),w=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return setInterval.apply(void 0,u([],c(t)))},x=function(t){return clearInterval(t)},b=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.scheduler=e,r.work=n,r.pending=!1,r}return s(e,t),e.prototype.schedule=function(t,e){if(void 0===e&&(e=0),this.closed)return this;this.state=t;var n=this.id,r=this.scheduler;return null!=n&&(this.id=this.recycleAsyncId(r,n,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(r,this.id,e),this},e.prototype.requestAsyncId=function(t,e,n){return void 0===n&&(n=0),w(t.flush.bind(t,this),n)},e.prototype.recycleAsyncId=function(t,e,n){if(void 0===n&&(n=0),null!=n&&this.delay===n&&!1===this.pending)return e;x(e)},e.prototype.execute=function(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var n=this._execute(t,e);if(n)return n;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,e){var n,r=!1;try{this.work(t)}catch(t){r=!0,n=!!t&&t||new Error(t)}if(r)return this.unsubscribe(),n},e.prototype.unsubscribe=function(){if(!this.closed){var e=this.id,n=this.scheduler,r=n.actions;this.work=this.state=this.scheduler=null,this.pending=!1,l(r,this),null!=e&&(this.id=this.recycleAsyncId(n,e,null)),this.delay=null,t.prototype.unsubscribe.call(this)}},e}(y),m=function(){function t(e,n){void 0===n&&(n=t.now),this.schedulerActionCtor=e,this.now=n}return t.prototype.schedule=function(t,e,n){return void 0===e&&(e=0),new this.schedulerActionCtor(this,t).schedule(n,e)},t.now=v,t}(),g=new(function(t){function e(e,n){void 0===n&&(n=m.now);var r=t.call(this,e,n)||this;return r.actions=[],r._active=!1,r._scheduled=void 0,r}return s(e,t),e.prototype.flush=function(t){var e=this.actions;if(this._active)e.push(t);else{var n;this._active=!0;do{if(n=t.execute(t.state,t.delay))break}while(t=e.shift());if(this._active=!1,n){for(;t=e.shift();)t.unsubscribe();throw n}}},e}(m))(b),A=g;function I(n,r,i){void 0===n&&(n=0),void 0===i&&(i=A);var s=-1;return null!=r&&(e(r)?i=r:s=r),new t((function(t){var e,r=(e=n)instanceof Date&&!isNaN(e)?+n-i.now():n;r<0&&(r=0);var o=0;return i.schedule((function(){t.closed||(t.next(o++),0<=s?this.schedule(void 0,s):t.complete())}),r)}))}export default(t,{$delay:e=200,$count:s=3})=>{return n((o=s,void 0===u&&(u=null),u=null!=u?u:o,a((function(t,e){var n=[],r=0;t.subscribe(new h(e,(function(t){var i,s,c,a,h=null;r++%u==0&&n.push([]);try{for(var f=d(n),p=f.next();!p.done;p=f.next())(w=p.value).push(t),o<=w.length&&(h=null!=h?h:[]).push(w)}catch(t){i={error:t}}finally{try{p&&!p.done&&(s=f.return)&&s.call(f)}finally{if(i)throw i.error}}if(h)try{for(var v=d(h),y=v.next();!y.done;y=v.next()){var w=y.value;l(n,w),e.next(w)}}catch(t){c={error:t}}finally{try{y&&!y.done&&(a=v.return)&&a.call(v)}finally{if(c)throw c.error}}}),(function(){var t,r;try{for(var i=d(n),s=i.next();!s.done;s=i.next()){var o=s.value;e.next(o)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}e.complete()}),void 0,(function(){n=null})))}))),f((n=>r(n).pipe(i((e=>r(t(e)))),function(t,e){void 0===e&&(e=g);var n=I(t,e);return p((function(){return n}))}(e)))));var o,u};
