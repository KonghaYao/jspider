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

import{init as t}from"./plugins/Dexie/Dexie.js";import{putData as e,getData as i}from"./plugins/Dexie/data.js";import{_ as r,S as o}from"./Subscriber-66236423.js";import{O as n,s,f as u}from"./from-87624c8d.js";var c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.notifyNext=function(t,e,i,r,o){this.destination.next(e)},e.prototype.notifyError=function(t,e){this.destination.error(t)},e.prototype.notifyComplete=function(t){this.destination.complete()},e}(o),p=function(t){function e(e,i,r){var o=t.call(this)||this;return o.parent=e,o.outerValue=i,o.outerIndex=r,o.index=0,o}return r(e,t),e.prototype._next=function(t){this.parent.notifyNext(this.outerValue,t,this.outerIndex,this.index++,this)},e.prototype._error=function(t){this.parent.notifyError(t,this),this.unsubscribe()},e.prototype._complete=function(){this.parent.notifyComplete(this),this.unsubscribe()},e}(o);var a=function(){function t(t){this.delayDurationSelector=t}return t.prototype.call=function(t,e){return e.subscribe(new h(t,this.delayDurationSelector))},t}(),h=function(t){function e(e,i){var r=t.call(this,e)||this;return r.delayDurationSelector=i,r.completed=!1,r.delayNotifierSubscriptions=[],r.index=0,r}return r(e,t),e.prototype.notifyNext=function(t,e,i,r,o){this.destination.next(t),this.removeSubscription(o),this.tryComplete()},e.prototype.notifyError=function(t,e){this._error(t)},e.prototype.notifyComplete=function(t){var e=this.removeSubscription(t);e&&this.destination.next(e),this.tryComplete()},e.prototype._next=function(t){var e=this.index++;try{var i=this.delayDurationSelector(t,e);i&&this.tryDelay(i,t)}catch(t){this.destination.error(t)}},e.prototype._complete=function(){this.completed=!0,this.tryComplete(),this.unsubscribe()},e.prototype.removeSubscription=function(t){t.unsubscribe();var e=this.delayNotifierSubscriptions.indexOf(t);return-1!==e&&this.delayNotifierSubscriptions.splice(e,1),t.outerValue},e.prototype.tryDelay=function(t,e){var i=function(t,e,i,r,o){if(void 0===o&&(o=new p(t,i,r)),!o.closed)return e instanceof n?e.subscribe(o):s(e)(o)}(this,t,e);i&&!i.closed&&(this.destination.add(i),this.delayNotifierSubscriptions.push(i))},e.prototype.tryComplete=function(){this.completed&&0===this.delayNotifierSubscriptions.length&&this.destination.complete()},e}(c),f=function(t){function e(e,i){var r=t.call(this)||this;return r.source=e,r.subscriptionDelay=i,r}return r(e,t),e.prototype._subscribe=function(t){this.subscriptionDelay.subscribe(new l(t,this.source))},e}(n),l=function(t){function e(e,i){var r=t.call(this)||this;return r.parent=e,r.source=i,r.sourceSubscribed=!1,r}return r(e,t),e.prototype._next=function(t){this.subscribeToSource()},e.prototype._error=function(t){this.unsubscribe(),this.parent.error(t)},e.prototype._complete=function(){this.unsubscribe(),this.subscribeToSource()},e.prototype.subscribeToSource=function(){this.sourceSubscribed||(this.sourceSubscribed=!0,this.unsubscribe(),this.source.subscribe(this.parent))},e}(o);const b=t=>i=>{let{dbName:r="JSpider"}=t||{};return i.pipe((o=t=>{t.$commit("complete",t._mainUUID);let i=t.$output();return i._isABackup=!0,u(e(r,i))},n?function(t){return new f(t,n).lift(new a(o))}:function(t){return t.lift(new a(o))}));var o,n};var y=Object.freeze({__proto__:null,getData:i,setStore:b,init:t});export{y as D,b as s};
