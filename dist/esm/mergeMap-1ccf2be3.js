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

import{_ as t}from"./Subscriber-4bc9607d.js";import{m as i}from"./map-39ac3b74.js";import{f as e}from"./from-d10c21fa.js";import{S as n,i as r,a as o}from"./innerSubscribe-6069f3a4.js";function s(t,n,r){return void 0===r&&(r=Number.POSITIVE_INFINITY),"function"==typeof n?function(o){return o.pipe(s((function(r,o){return e(t(r,o)).pipe(i((function(t,i){return n(r,t,o,i)})))}),r))}:("number"==typeof n&&(r=n),function(i){return i.lift(new c(t,r))})}var c=function(){function t(t,i){void 0===i&&(i=Number.POSITIVE_INFINITY),this.project=t,this.concurrent=i}return t.prototype.call=function(t,i){return i.subscribe(new u(t,this.project,this.concurrent))},t}(),u=function(i){function e(t,e,n){void 0===n&&(n=Number.POSITIVE_INFINITY);var r=i.call(this,t)||this;return r.project=e,r.concurrent=n,r.hasCompleted=!1,r.buffer=[],r.active=0,r.index=0,r}return t(e,i),e.prototype._next=function(t){this.active<this.concurrent?this._tryNext(t):this.buffer.push(t)},e.prototype._tryNext=function(t){var i,e=this.index++;try{i=this.project(t,e)}catch(t){return void this.destination.error(t)}this.active++,this._innerSub(i)},e.prototype._innerSub=function(t){var i=new n(this),e=this.destination;e.add(i);var o=r(t,i);o!==i&&e.add(o)},e.prototype._complete=function(){this.hasCompleted=!0,0===this.active&&0===this.buffer.length&&this.destination.complete(),this.unsubscribe()},e.prototype.notifyNext=function(t){this.destination.next(t)},e.prototype.notifyComplete=function(){var t=this.buffer;this.active--,t.length>0?this._next(t.shift()):0===this.active&&this.hasCompleted&&this.destination.complete()},e}(o);export{s as m};
