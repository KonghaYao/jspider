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

import{_ as t,S as n}from"./Subscriber-4bc9607d.js";import{O as o,s as i}from"./subscribeTo-a0871bd2.js";var r=function(n){function o(t){var o=n.call(this)||this;return o.parent=t,o}return t(o,n),o.prototype._next=function(t){this.parent.notifyNext(t)},o.prototype._error=function(t){this.parent.notifyError(t),this.unsubscribe()},o.prototype._complete=function(){this.parent.notifyComplete(),this.unsubscribe()},o}(n),e=function(n){function o(){return null!==n&&n.apply(this,arguments)||this}return t(o,n),o.prototype.notifyNext=function(t){this.destination.next(t)},o.prototype.notifyError=function(t){this.destination.error(t)},o.prototype.notifyComplete=function(){this.destination.complete()},o}(n);function s(t,n){if(!n.closed)return t instanceof o?t.subscribe(n):i(t)(n)}export{r as S,e as a,s as i};
