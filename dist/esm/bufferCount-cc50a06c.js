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

import{_ as t,S as e}from"./Subscriber-66236423.js";function r(t,e){return void 0===e&&(e=null),function(r){return r.lift(new n(t,e))}}var n=function(){function t(t,e){this.bufferSize=t,this.startBufferEvery=e,this.subscriberClass=e&&t!==e?s:i}return t.prototype.call=function(t,e){return e.subscribe(new this.subscriberClass(t,this.bufferSize,this.startBufferEvery))},t}(),i=function(e){function r(t,r){var n=e.call(this,t)||this;return n.bufferSize=r,n.buffer=[],n}return t(r,e),r.prototype._next=function(t){var e=this.buffer;e.push(t),e.length==this.bufferSize&&(this.destination.next(e),this.buffer=[])},r.prototype._complete=function(){var t=this.buffer;t.length>0&&this.destination.next(t),e.prototype._complete.call(this)},r}(e),s=function(e){function r(t,r,n){var i=e.call(this,t)||this;return i.bufferSize=r,i.startBufferEvery=n,i.buffers=[],i.count=0,i}return t(r,e),r.prototype._next=function(t){var e=this,r=e.bufferSize,n=e.startBufferEvery,i=e.buffers,s=e.count;this.count++,s%n==0&&i.push([]);for(var f=i.length;f--;){var u=i[f];u.push(t),u.length===r&&(i.splice(f,1),this.destination.next(u))}},r.prototype._complete=function(){for(var t=this.buffers,r=this.destination;t.length>0;){var n=t.shift();n.length>0&&r.next(n)}e.prototype._complete.call(this)},r}(e);export{r as b};
