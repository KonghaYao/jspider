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

import{S as n,i as r,a as e,b as t,c as u,d as o,_ as c,e as i,f as s,r as a,g as f,h as l,j as d,O as h,m as b,o as v}from"./map-f4798e28.js";var p="function"==typeof Symbol&&Symbol.observable||"@@observable";function y(n){return n}function m(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return w(n)}function w(n){return 0===n.length?y:1===n.length?n[0]:function(r){return n.reduce((function(n,r){return r(n)}),r)}}var x=function(){function u(n){n&&(this._subscribe=n)}return u.prototype.lift=function(n){var r=new u;return r.source=this,r.operator=n,r},u.prototype.subscribe=function(u,o,c){var i,s=(i=u)&&i instanceof n||function(n){return n&&r(n.next)&&r(n.error)&&r(n.complete)}(i)&&e(i)?u:new t(u,o,c),a=this.operator,f=this.source;return s.add(a?a.call(s,f):f?this._subscribe(s):this._trySubscribe(s)),s},u.prototype._deprecatedSyncErrorSubscribe=function(n){var r=n;r._syncErrorHack_isSubscribing=!0;var e=this.operator;if(e)n.add(e.call(n,this.source));else try{n.add(this._subscribe(n))}catch(n){r.__syncError=n}for(var t=r;t;){if("__syncError"in t)try{throw t.__syncError}finally{n.unsubscribe()}t=t.destination}r._syncErrorHack_isSubscribing=!1},u.prototype._trySubscribe=function(n){try{return this._subscribe(n)}catch(r){n.error(r)}},u.prototype.forEach=function(n,r){var e=this;return new(r=_(r))((function(r,t){var u;u=e.subscribe((function(r){try{n(r)}catch(n){t(n),null==u||u.unsubscribe()}}),t,r)}))},u.prototype._subscribe=function(n){var r;return null===(r=this.source)||void 0===r?void 0:r.subscribe(n)},u.prototype[p]=function(){return this},u.prototype.pipe=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return n.length?w(n)(this):this},u.prototype.toPromise=function(n){var r=this;return new(n=_(n))((function(n,e){var t;r.subscribe((function(n){return t=n}),(function(n){return e(n)}),(function(){return n(t)}))}))},u.create=function(n){return new u(n)},u}();function _(n){var r;return null!==(r=null!=n?n:u.Promise)&&void 0!==r?r:Promise}function S(n,r){return new x((function(e){var t=0;return r.schedule((function(){t===n.length?e.complete():(e.next(n[t++]),e.closed||this.schedule())}))}))}var g=function(n){return n&&"number"==typeof n.length&&"function"!=typeof n};function E(n){return r(null==n?void 0:n.then)}var I="function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator";function j(n,r){if(!n)throw new Error("Iterable cannot be null");return new x((function(e){var t=new o;return t.add(r.schedule((function(){var u=n[Symbol.asyncIterator]();t.add(r.schedule((function(){var n=this;u.next().then((function(r){r.done?e.complete():(e.next(r.value),n.schedule())}))})))}))),t}))}function P(n){return r(n[p])}function k(n){return r(null==n?void 0:n[I])}function O(n){return Symbol.asyncIterator&&r(null==n?void 0:n[Symbol.asyncIterator])}function R(n){return new TypeError("You provided "+(null!==n&&"object"==typeof n?"an invalid object":"'"+n+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function A(n){return c(this,arguments,(function(){var r,e,t;return i(this,(function(u){switch(u.label){case 0:r=n.getReader(),u.label=1;case 1:u.trys.push([1,,9,10]),u.label=2;case 2:return[4,s(r.read())];case 3:return e=u.sent(),t=e.value,e.done?[4,s(void 0)]:[3,5];case 4:return[2,u.sent()];case 5:return[4,s(t)];case 6:return[4,u.sent()];case 7:return u.sent(),[3,2];case 8:return[3,10];case 9:return r.releaseLock(),[7];case 10:return[2]}}))}))}function H(n){return r(null==n?void 0:n.getReader)}function T(n,e){if(null!=n){if(P(n))return function(n,r){return new x((function(e){var t=new o;return t.add(r.schedule((function(){var u=n[p]();t.add(u.subscribe({next:function(n){t.add(r.schedule((function(){return e.next(n)})))},error:function(n){t.add(r.schedule((function(){return e.error(n)})))},complete:function(){t.add(r.schedule((function(){return e.complete()})))}}))}))),t}))}(n,e);if(g(n))return S(n,e);if(E(n))return function(n,r){return new x((function(e){return r.schedule((function(){return n.then((function(n){e.add(r.schedule((function(){e.next(n),e.add(r.schedule((function(){return e.complete()})))})))}),(function(n){e.add(r.schedule((function(){return e.error(n)})))}))}))}))}(n,e);if(O(n))return j(n,e);if(k(n))return function(n,e){return new x((function(t){var u;return t.add(e.schedule((function(){u=n[I](),function(n,r,e,t){void 0===t&&(t=0);var u=r.schedule((function(){try{e.call(this)}catch(r){n.error(r)}}),t);n.add(u)}(t,e,(function(){var n=u.next(),r=n.value;n.done?t.complete():(t.next(r),this.schedule())}))}))),function(){return r(null==u?void 0:u.return)&&u.return()}}))}(n,e);if(H(n))return function(n,r){return j(A(n),r)}(n,e)}throw R(n)}function Y(n,r){return r?T(n,r):L(n)}function L(n){if(n instanceof x)return n;if(null!=n){if(P(n))return u=n,new x((function(n){var e=u[p]();if(r(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if(g(n))return q(n);if(E(n))return t=n,new x((function(n){t.then((function(r){n.closed||(n.next(r),n.complete())}),(function(r){return n.error(r)})).then(null,a)}));if(O(n))return z(n);if(k(n))return e=n,new x((function(n){var r,t;try{for(var u=l(e),o=u.next();!o.done;o=u.next()){var c=o.value;if(n.next(c),n.closed)return}}catch(n){r={error:n}}finally{try{o&&!o.done&&(t=u.return)&&t.call(u)}finally{if(r)throw r.error}}n.complete()}));if(H(n))return z(A(n))}var e,t,u;throw R(n)}function q(n){return new x((function(r){for(var e=0;e<n.length&&!r.closed;e++)r.next(n[e]);r.complete()}))}function z(n){return new x((function(r){(function(n,r){var e,t,u,o;return f(this,void 0,void 0,(function(){var c,s;return i(this,(function(i){switch(i.label){case 0:i.trys.push([0,5,6,11]),e=d(n),i.label=1;case 1:return[4,e.next()];case 2:if((t=i.sent()).done)return[3,4];if(c=t.value,r.next(c),r.closed)return[2];i.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return s=i.sent(),u={error:s},[3,11];case 6:return i.trys.push([6,,9,10]),t&&!t.done&&(o=e.return)?[4,o.call(e)]:[3,8];case 7:i.sent(),i.label=8;case 8:return[3,10];case 9:if(u)throw u.error;return[7];case 10:return[7];case 11:return r.complete(),[2]}}))}))})(n,r).catch((function(n){return r.error(n)}))}))}function B(n,r){return r?S(n,r):q(n)}function C(n){return n&&r(n.schedule)}function D(n){return C((r=n)[r.length-1])?n.pop():void 0;var r}function F(n,e,t){return void 0===t&&(t=1/0),r(e)?F((function(r,t){return b((function(n,u){return e(r,n,t,u)}))(L(n(r,t)))}),t):("number"==typeof e&&(t=e),v((function(r,e){return function(n,r,e,t,u,o,c,i){var s=[],a=0,f=0,l=!1,d=function(){!l||s.length||a||r.complete()},b=function(n){return a<t?v(n):s.push(n)},v=function(n){o&&r.next(n),a++;var i=!1;L(e(n,f++)).subscribe(new h(r,(function(n){null==u||u(n),o?b(n):r.next(n)}),(function(){i=!0}),void 0,(function(){if(i)try{a--;for(var n=function(){var n=s.shift();c?r.add(c.schedule((function(){return v(n)}))):v(n)};s.length&&a<t;)n();d()}catch(n){r.error(n)}})))};return n.subscribe(new h(r,b,(function(){l=!0,d()}))),function(){null==i||i()}}(r,e,n,t)})))}export{x as O,D as a,C as b,y as c,Y as f,B as i,F as m,m as p,S as s};
