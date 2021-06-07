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

import{o as e,O as n,m as r}from"../map-f4798e28.js";const t={main:Promise.resolve(!0),add(e){this.main.then((()=>o(e)))}},o=function(e){let n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=e.name,n.click(),URL.revokeObjectURL(n.href),n.remove(),console.log("%c 完成","color:green")};const a=e=>{const{url:n,name:r}=e.data,o=function(e,n){return e instanceof File?e:e instanceof Blob?(e.name=n,e):new File([JSON.stringify(e)],n)}(e.$commit("processing"),r||n.replace(/[^\/]*?\//g,""));t.add(o)},c=(t={})=>t=>{return t.pipe((o=e=>"error"!==e.$status&&e.$result,e((function(e,r){var t=0;e.subscribe(new n(r,(function(e){return o.call(c,e,t++)&&r.next(e)})))}))),r(a));var o,c};export{c as Download};
