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

import{O as n,m as r,c as t,i as e,a as u}from"./mergeMap-1cf10555.js";import{o,O as i,q as c,m as f}from"./map-f4798e28.js";var a=new n((function(n){return n.complete()}));function s(){return void 0===(n=1)&&(n=1/0),r(t,n);var n}function p(n){return n<=0?function(){return a}:o((function(r,t){var e=0;r.subscribe(new i(t,(function(r){++e<=n&&(t.next(r),n<=e&&t.complete())})))}))}function m(n,t){return t?function(r){return function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return s()(e(n,u(n)))}(t.pipe(p(1),o((function(n,r){n.subscribe(new i(r,c))}))),r.pipe(m(n)))}:r((function(r,t){return n(r,t).pipe(p(1),function(n){return f((function(){return n}))}(r))}))}export{m as d};
