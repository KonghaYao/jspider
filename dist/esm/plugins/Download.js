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

import{toFile as t}from"./utils/toFile.js";import{_ as r,S as e}from"../Subscriber-66236423.js";import{m as i}from"../map-94257997.js";var n=function(){function t(t,r){this.predicate=t,this.thisArg=r}return t.prototype.call=function(t,r){return r.subscribe(new o(t,this.predicate,this.thisArg))},t}(),o=function(t){function e(r,e,i){var n=t.call(this,r)||this;return n.predicate=e,n.thisArg=i,n.count=0,n}return r(e,t),e.prototype._next=function(t){var r;try{r=this.predicate.call(this.thisArg,t,this.count++)}catch(t){return void this.destination.error(t)}r&&this.destination.next(t)},e}(e);const s={main:Promise.resolve(!0),add(t){this.main.then((()=>c(t)))}},c=function(t){let r=document.createElement("a");r.href=URL.createObjectURL(t),r.download=t.name,r.click(),URL.revokeObjectURL(r.href),r.remove(),console.log("%c 下载完成","color:green")},a=r=>{const{url:e,name:i}=r.data,n=r.$commit("processing"),o=t(n,i||("string"==typeof e?e.replace(/[^\/]*?\//g,""):""));return s.add(o),r},u=(t={})=>t=>{return t.pipe((r=t=>"error"!==t._status&&t._result,function(t){return t.lift(new n(r,e))}),i(a));var r,e};export{u as Download};
