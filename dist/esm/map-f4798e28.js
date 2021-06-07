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
var t=function(n,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(n,r)};function n(n,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function e(){this.constructor=n}t(n,r),n.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}function r(t,n,r,e){return new(r||(r=Promise))((function(o,i){function a(t){try{u(e.next(t))}catch(t){i(t)}}function s(t){try{u(e.throw(t))}catch(t){i(t)}}function u(t){var n;t.done?o(t.value):(n=t.value,n instanceof r?n:new r((function(t){t(n)}))).then(a,s)}u((e=e.apply(t,n||[])).next())}))}function e(t,n){var r,e,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,e&&(o=2&i[0]?e.return:i[0]?e.throw||((o=e.return)&&o.call(e),0):e.next)&&!(o=o.call(e,i[1])).done)return o;switch(e=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,e=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=n.call(t,a)}catch(t){i=[6,t],e=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}function o(t){var n="function"==typeof Symbol&&Symbol.iterator,r=n&&t[n],e=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&e>=t.length&&(t=void 0),{value:t&&t[e++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function i(t,n){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var e,o,i=r.call(t),a=[];try{for(;(void 0===n||n-- >0)&&!(e=i.next()).done;)a.push(e.value)}catch(t){o={error:t}}finally{try{e&&!e.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a}function a(t,n){for(var r=0,e=n.length,o=t.length;r<e;r++,o++)t[o]=n[r];return t}function s(t){return this instanceof s?(this.v=t,this):new s(t)}function u(t,n,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,o=r.apply(t,n||[]),i=[];return e={},a("next"),a("throw"),a("return"),e[Symbol.asyncIterator]=function(){return this},e;function a(t){o[t]&&(e[t]=function(n){return new Promise((function(r,e){i.push([t,n,r,e])>1||u(t,n)}))})}function u(t,n){try{(r=o[t](n)).value instanceof s?Promise.resolve(r.value.v).then(c,l):f(i[0][2],r)}catch(t){f(i[0][3],t)}var r}function c(t){u("next",t)}function l(t){u("throw",t)}function f(t,n){t(n),i.shift(),i.length&&u(i[0][0],i[0][1])}}function c(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,r=t[Symbol.asyncIterator];return r?r.call(t):(t=o(t),n={},e("next"),e("throw"),e("return"),n[Symbol.asyncIterator]=function(){return this},n);function e(r){n[r]=t[r]&&function(n){return new Promise((function(e,o){(function(t,n,r,e){Promise.resolve(e).then((function(n){t({value:n,done:r})}),n)})(e,o,(n=t[r](n)).done,n.value)}))}}}function l(t){return"function"==typeof t}var f,p=((f=function(t){return function(n){t(this),this.message=n?n.length+" errors occurred during unsubscription:\n"+n.map((function(t,n){return n+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=n}}((function(t){Error.call(t),t.stack=(new Error).stack}))).prototype=Object.create(Error.prototype),f.prototype.constructor=f,f);function h(t,n){if(t){var r=t.indexOf(n);0<=r&&t.splice(r,1)}}var y=function(){function t(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._teardowns=null}var n;return t.prototype.unsubscribe=function(){var t,n,r,e,s;if(!this.closed){this.closed=!0;var u=this._parentage;if(u)if(this._parentage=null,Array.isArray(u))try{for(var c=o(u),f=c.next();!f.done;f=c.next()){f.value.remove(this)}}catch(n){t={error:n}}finally{try{f&&!f.done&&(n=c.return)&&n.call(c)}finally{if(t)throw t.error}}else u.remove(this);var h=this.initialTeardown;if(l(h))try{h()}catch(t){s=t instanceof p?t.errors:[t]}var y=this._teardowns;if(y){this._teardowns=null;try{for(var d=o(y),b=d.next();!b.done;b=d.next()){var w=b.value;try{v(w)}catch(t){s=null!=s?s:[],t instanceof p?s=a(a([],i(s)),i(t.errors)):s.push(t)}}}catch(t){r={error:t}}finally{try{b&&!b.done&&(e=d.return)&&e.call(d)}finally{if(r)throw r.error}}}if(s)throw new p(s)}},t.prototype.add=function(n){var r;if(n&&n!==this)if(this.closed)v(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._teardowns=null!==(r=this._teardowns)&&void 0!==r?r:[]).push(n)}},t.prototype._hasParent=function(t){var n=this._parentage;return n===t||Array.isArray(n)&&n.includes(t)},t.prototype._addParent=function(t){var n=this._parentage;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t},t.prototype._removeParent=function(t){var n=this._parentage;n===t?this._parentage=null:Array.isArray(n)&&h(n,t)},t.prototype.remove=function(n){var r=this._teardowns;r&&h(r,n),n instanceof t&&n._removeParent(this)},t.EMPTY=((n=new t).closed=!0,n),t}();function d(t){return t instanceof y||t&&"closed"in t&&l(t.remove)&&l(t.add)&&l(t.unsubscribe)}function v(t){l(t)?t():t.unsubscribe()}var b={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},w=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return setTimeout.apply(void 0,a([],i(t)))};function m(t){w((function(){throw t}))}function _(){}var x=function(t){function r(n){var r=t.call(this)||this;return r.isStopped=!1,n?(r.destination=n,d(n)&&n.add(r)):r.destination=E,r}return n(r,t),r.create=function(t,n,r){return new S(t,n,r)},r.prototype.next=function(t){this.isStopped||this._next(t)},r.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},r.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},r.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},r.prototype._next=function(t){this.destination.next(t)},r.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},r.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},r}(y),S=function(t){function r(n,r,e){var o,i=t.call(this)||this;if(l(n))o=n;else if(n){var a;o=n.next,r=n.error,e=n.complete,i&&b.useDeprecatedNextContext?(a=Object.create(n)).unsubscribe=function(){return i.unsubscribe()}:a=n,o=null==o?void 0:o.bind(a),r=null==r?void 0:r.bind(a),e=null==e?void 0:e.bind(a)}return i.destination={next:o?g(o):_,error:g(null!=r?r:P),complete:e?g(e):_},i}return n(r,t),r}(x);function g(t,n){return function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];try{t.apply(void 0,a([],i(n)))}catch(t){m(t)}}}function P(t){throw t}var E={closed:!0,next:_,error:P,complete:_};function O(t){return function(n){if(function(t){return l(null==t?void 0:t.lift)}(n))return n.lift((function(n){try{return t(n,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}var T=function(t){function r(n,r,e,o,i){var a=t.call(this,n)||this;return a.onFinalize=i,a._next=r?function(t){try{r(t)}catch(t){n.error(t)}}:t.prototype._next,a._error=o?function(t){try{o(t)}catch(t){n.error(t)}finally{this.unsubscribe()}}:t.prototype._error,a._complete=e?function(){try{e()}catch(t){n.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,a}return n(r,t),r.prototype.unsubscribe=function(){var n,r=this.closed;t.prototype.unsubscribe.call(this),!r&&(null===(n=this.onFinalize)||void 0===n||n.call(this))},r}(x);function A(t,n){return O((function(r,e){var o=0;r.subscribe(new T(e,(function(r){e.next(t.call(n,r,o++))})))}))}export{T as O,x as S,u as _,d as a,S as b,b as c,y as d,e,s as f,r as g,o as h,l as i,c as j,n as k,a as l,A as m,i as n,O as o,h as p,_ as q,m as r};