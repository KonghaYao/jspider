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

import{_ as t,S as i}from"./Subscriber-4bc9607d.js";import{O as e,s as r}from"./subscribeTo-a0871bd2.js";var o=function(i){function e(){return null!==i&&i.apply(this,arguments)||this}return t(e,i),e.prototype.notifyNext=function(t,i,e,r,o){this.destination.next(i)},e.prototype.notifyError=function(t,i){this.destination.error(t)},e.prototype.notifyComplete=function(t){this.destination.complete()},e}(i),n=function(i){function e(t,e,r){var o=i.call(this)||this;return o.parent=t,o.outerValue=e,o.outerIndex=r,o.index=0,o}return t(e,i),e.prototype._next=function(t){this.parent.notifyNext(this.outerValue,t,this.outerIndex,this.index++,this)},e.prototype._error=function(t){this.parent.notifyError(t,this),this.unsubscribe()},e.prototype._complete=function(){this.parent.notifyComplete(this),this.unsubscribe()},e}(i);function s(t,i){return i?function(e){return new p(e,i).lift(new u(t))}:function(i){return i.lift(new u(t))}}var u=function(){function t(t){this.delayDurationSelector=t}return t.prototype.call=function(t,i){return i.subscribe(new c(t,this.delayDurationSelector))},t}(),c=function(i){function o(t,e){var r=i.call(this,t)||this;return r.delayDurationSelector=e,r.completed=!1,r.delayNotifierSubscriptions=[],r.index=0,r}return t(o,i),o.prototype.notifyNext=function(t,i,e,r,o){this.destination.next(t),this.removeSubscription(o),this.tryComplete()},o.prototype.notifyError=function(t,i){this._error(t)},o.prototype.notifyComplete=function(t){var i=this.removeSubscription(t);i&&this.destination.next(i),this.tryComplete()},o.prototype._next=function(t){var i=this.index++;try{var e=this.delayDurationSelector(t,i);e&&this.tryDelay(e,t)}catch(t){this.destination.error(t)}},o.prototype._complete=function(){this.completed=!0,this.tryComplete(),this.unsubscribe()},o.prototype.removeSubscription=function(t){t.unsubscribe();var i=this.delayNotifierSubscriptions.indexOf(t);return-1!==i&&this.delayNotifierSubscriptions.splice(i,1),t.outerValue},o.prototype.tryDelay=function(t,i){var o=function(t,i,o,s,u){if(void 0===u&&(u=new n(t,o,s)),!u.closed)return i instanceof e?i.subscribe(u):r(i)(u)}(this,t,i);o&&!o.closed&&(this.destination.add(o),this.delayNotifierSubscriptions.push(o))},o.prototype.tryComplete=function(){this.completed&&0===this.delayNotifierSubscriptions.length&&this.destination.complete()},o}(o),p=function(i){function e(t,e){var r=i.call(this)||this;return r.source=t,r.subscriptionDelay=e,r}return t(e,i),e.prototype._subscribe=function(t){this.subscriptionDelay.subscribe(new h(t,this.source))},e}(e),h=function(i){function e(t,e){var r=i.call(this)||this;return r.parent=t,r.source=e,r.sourceSubscribed=!1,r}return t(e,i),e.prototype._next=function(t){this.subscribeToSource()},e.prototype._error=function(t){this.unsubscribe(),this.parent.error(t)},e.prototype._complete=function(){this.unsubscribe(),this.subscribeToSource()},e.prototype.subscribeToSource=function(){this.sourceSubscribed||(this.sourceSubscribed=!0,this.unsubscribe(),this.source.subscribe(this.parent))},e}(i);export{s as d};
