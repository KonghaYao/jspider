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

import{S as r,r as n,e as t,c as e,h as o,a as u}from"./Subscriber-4bc9607d.js";var i=function(){return"function"==typeof Symbol&&Symbol.observable||"@@observable"}();function c(r){return r}function s(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return a(r)}function a(r){return 0===r.length?c:1===r.length?r[0]:function(n){return r.reduce((function(r,n){return n(r)}),n)}}var f=function(){function o(r){this._isScalar=!1,r&&(this._subscribe=r)}return o.prototype.lift=function(r){var n=new o;return n.source=this,n.operator=r,n},o.prototype.subscribe=function(o,u,i){var c=this.operator,s=function(e,o,u){if(e){if(e instanceof r)return e;if(e[n])return e[n]()}return e||o||u?new r(e,o,u):new r(t)}(o,u,i);if(c?s.add(c.call(s,this.source)):s.add(this.source||e.useDeprecatedSynchronousErrorHandling&&!s.syncErrorThrowable?this._subscribe(s):this._trySubscribe(s)),e.useDeprecatedSynchronousErrorHandling&&s.syncErrorThrowable&&(s.syncErrorThrowable=!1,s.syncErrorThrown))throw s.syncErrorValue;return s},o.prototype._trySubscribe=function(n){try{return this._subscribe(n)}catch(t){e.useDeprecatedSynchronousErrorHandling&&(n.syncErrorThrown=!0,n.syncErrorValue=t),!function(n){for(;n;){var t=n,e=t.closed,o=t.destination,u=t.isStopped;if(e||u)return!1;n=o&&o instanceof r?o:null}return!0}(n)?console.warn(t):n.error(t)}},o.prototype.forEach=function(r,n){var t=this;return new(n=b(n))((function(n,e){var o;o=t.subscribe((function(n){try{r(n)}catch(r){e(r),o&&o.unsubscribe()}}),e,n)}))},o.prototype._subscribe=function(r){var n=this.source;return n&&n.subscribe(r)},o.prototype[i]=function(){return this},o.prototype.pipe=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return 0===r.length?this:a(r)(this)},o.prototype.toPromise=function(r){var n=this;return new(r=b(r))((function(r,t){var e;n.subscribe((function(r){return e=r}),(function(r){return t(r)}),(function(){return r(e)}))}))},o.create=function(r){return new o(r)},o}();function b(r){if(r||(r=Promise),!r)throw new Error("no Promise impl found");return r}var p=function(r){return function(n){for(var t=0,e=r.length;t<e&&!n.closed;t++)n.next(r[t]);n.complete()}};function l(){return"function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator"}var h=l(),y=function(r){return r&&"number"==typeof r.length&&"function"!=typeof r};function d(r){return!!r&&"function"!=typeof r.subscribe&&"function"==typeof r.then}var v=function(r){if(r&&"function"==typeof r[i])return e=r,function(r){var n=e[i]();if("function"!=typeof n.subscribe)throw new TypeError("Provided object does not correctly implement Symbol.observable");return n.subscribe(r)};if(y(r))return p(r);if(d(r))return t=r,function(r){return t.then((function(n){r.closed||(r.next(n),r.complete())}),(function(n){return r.error(n)})).then(null,o),r};if(r&&"function"==typeof r[h])return n=r,function(r){for(var t=n[h]();;){var e=void 0;try{e=t.next()}catch(n){return r.error(n),r}if(e.done){r.complete();break}if(r.next(e.value),r.closed)break}return"function"==typeof t.return&&r.add((function(){t.return&&t.return()})),r};var n,t,e,c=u(r)?"an invalid object":"'"+r+"'";throw new TypeError("You provided "+c+" where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")};export{f as O,d as a,y as b,p as c,h as i,i as o,s as p,v as s};
