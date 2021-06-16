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

import{_ as t,S as n}from"./Subscriber-66236423.js";import{m as i}from"./map-94257997.js";import{O as e,s as o,f as r}from"./from-87624c8d.js";var s=function(n){function i(t){var i=n.call(this)||this;return i.parent=t,i}return t(i,n),i.prototype._next=function(t){this.parent.notifyNext(t)},i.prototype._error=function(t){this.parent.notifyError(t),this.unsubscribe()},i.prototype._complete=function(){this.parent.notifyComplete(),this.unsubscribe()},i}(n),u=function(n){function i(){return null!==n&&n.apply(this,arguments)||this}return t(i,n),i.prototype.notifyNext=function(t){this.destination.next(t)},i.prototype.notifyError=function(t){this.destination.error(t)},i.prototype.notifyComplete=function(){this.destination.complete()},i}(n);function c(t,n,e){return void 0===e&&(e=Number.POSITIVE_INFINITY),"function"==typeof n?function(o){return o.pipe(c((function(e,o){return r(t(e,o)).pipe(i((function(t,i){return n(e,t,o,i)})))}),e))}:("number"==typeof n&&(e=n),function(n){return n.lift(new p(t,e))})}var p=function(){function t(t,n){void 0===n&&(n=Number.POSITIVE_INFINITY),this.project=t,this.concurrent=n}return t.prototype.call=function(t,n){return n.subscribe(new f(t,this.project,this.concurrent))},t}(),f=function(n){function i(t,i,e){void 0===e&&(e=Number.POSITIVE_INFINITY);var o=n.call(this,t)||this;return o.project=i,o.concurrent=e,o.hasCompleted=!1,o.buffer=[],o.active=0,o.index=0,o}return t(i,n),i.prototype._next=function(t){this.active<this.concurrent?this._tryNext(t):this.buffer.push(t)},i.prototype._tryNext=function(t){var n,i=this.index++;try{n=this.project(t,i)}catch(t){return void this.destination.error(t)}this.active++,this._innerSub(n)},i.prototype._innerSub=function(t){var n=new s(this),i=this.destination;i.add(n);var r=function(t,n){if(!n.closed)return t instanceof e?t.subscribe(n):o(t)(n)}(t,n);r!==n&&i.add(r)},i.prototype._complete=function(){this.hasCompleted=!0,0===this.active&&0===this.buffer.length&&this.destination.complete(),this.unsubscribe()},i.prototype.notifyNext=function(t){this.destination.next(t)},i.prototype.notifyComplete=function(){var t=this.buffer;this.active--,t.length>0?this._next(t.shift()):0===this.active&&this.hasCompleted&&this.destination.complete()},i}(u);export{c as m};
