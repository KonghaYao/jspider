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

import{retryAndDelay as t}from"./retryAndDelay.js";import{p as r}from"../subscribeTo-a0871bd2.js";import{b as i}from"../bufferCount-4c0d3420.js";import{m as n}from"../mergeMap-1ccf2be3.js";import{f as o}from"../from-d10c21fa.js";import{o as e}from"../of-4aaceac2.js";import{_ as s}from"../Subscriber-4bc9607d.js";import{m as c}from"../map-39ac3b74.js";import{S as u,i as p,a}from"../innerSubscribe-6069f3a4.js";import"../delayWhen-2c1232cb.js";import"../isScheduler-8c992f4d.js";var f=function(){function t(t){this.selector=t}return t.prototype.call=function(t,r){return r.subscribe(new h(t,this.selector,this.caught))},t}(),h=function(t){function r(r,i,n){var o=t.call(this,r)||this;return o.selector=i,o.caught=n,o}return s(r,t),r.prototype.error=function(r){if(!this.isStopped){var i=void 0;try{i=this.selector(r,this.caught)}catch(r){return void t.prototype.error.call(this,r)}this._unsubscribeAndRecycle();var n=new u(this);this.add(n);var o=p(i,n);o!==n&&this.add(o)}},r}(a);function b(t,r){return"function"==typeof r?function(i){return i.pipe(b((function(i,n){return o(t(i,n)).pipe(c((function(t,o){return r(i,t,n,o)})))})))}:function(r){return r.lift(new d(t))}}var d=function(){function t(t){this.project=t}return t.prototype.call=function(t,r){return r.subscribe(new l(t,this.project))},t}(),l=function(t){function r(r,i){var n=t.call(this,r)||this;return n.project=i,n.index=0,n}return s(r,t),r.prototype._next=function(t){var r,i=this.index++;try{r=this.project(t,i)}catch(t){return void this.destination.error(t)}this._innerSub(r)},r.prototype._innerSub=function(t){var r=this.innerSubscription;r&&r.unsubscribe();var i=new u(this),n=this.destination;n.add(i),this.innerSubscription=p(t,i),this.innerSubscription!==i&&n.add(this.innerSubscription)},r.prototype._complete=function(){var r=this.innerSubscription;r&&!r.closed||t.prototype._complete.call(this),this.unsubscribe()},r.prototype._unsubscribe=function(){this.innerSubscription=void 0},r.prototype.notifyComplete=function(){this.innerSubscription=void 0,this.isStopped&&t.prototype._complete.call(this)},r.prototype.notifyNext=function(t){this.destination.next(t)},r}(a);const m=(s,{retry:c=3,buffer:u=3,delay:p=300,handleError:a=function(t,r){throw t}}={})=>{return r(i(u),(h=r=>o(r).pipe(n(((...r)=>{return e(r).pipe(b((t=>o(s(...t)))),t(c,p),(i=a,function(t){var r=new f(i),n=t.lift(r);return r.caught=n}));var i}))),n(h,d,1)));var h,d};export{m as concurrent};
