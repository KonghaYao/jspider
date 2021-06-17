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

import{O as n,o as e,i as r,a as t,b as u,s as o}from"./subscribeTo-a0871bd2.js";import{b as c}from"./Subscriber-4bc9607d.js";function i(e,r){return new n((function(n){var t=new c,u=0;return t.add(r.schedule((function(){u!==e.length?(n.next(e[u++]),n.closed||t.add(this.schedule())):n.complete()}))),t}))}function f(o,f){if(null!=o){if(function(n){return n&&"function"==typeof n[e]}(o))return function(r,t){return new n((function(n){var u=new c;return u.add(t.schedule((function(){var o=r[e]();u.add(o.subscribe({next:function(e){u.add(t.schedule((function(){return n.next(e)})))},error:function(e){u.add(t.schedule((function(){return n.error(e)})))},complete:function(){u.add(t.schedule((function(){return n.complete()})))}}))}))),u}))}(o,f);if(t(o))return function(e,r){return new n((function(n){var t=new c;return t.add(r.schedule((function(){return e.then((function(e){t.add(r.schedule((function(){n.next(e),t.add(r.schedule((function(){return n.complete()})))})))}),(function(e){t.add(r.schedule((function(){return n.error(e)})))}))}))),t}))}(o,f);if(u(o))return i(o,f);if(function(n){return n&&"function"==typeof n[r]}(o)||"string"==typeof o)return function(e,t){if(!e)throw new Error("Iterable cannot be null");return new n((function(n){var u,o=new c;return o.add((function(){u&&"function"==typeof u.return&&u.return()})),o.add(t.schedule((function(){u=e[r](),o.add(t.schedule((function(){if(!n.closed){var e,r;try{var t=u.next();e=t.value,r=t.done}catch(e){return void n.error(e)}r?n.complete():(n.next(e),this.schedule())}})))}))),o}))}(o,f)}throw new TypeError((null!==o&&typeof o||o)+" is not observable")}function d(e,r){return r?f(e,r):e instanceof n?e:new n(o(e))}export{d as f,i as s};
