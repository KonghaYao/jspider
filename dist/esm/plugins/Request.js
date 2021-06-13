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

import t from"../utils/concurrent.js";import"../from-87624c8d.js";import"../Subscriber-66236423.js";import"../bufferCount-cc50a06c.js";import"../mergeMap-063b7a69.js";import"../map-94257997.js";import"../of-f7a7e7ed.js";const r=r=>e=>{r=r||{};const{$delay:o=200,$count:s=3,RequestOptions:n={}}=r;return e.pipe(t((t=>((t,r)=>{const{returnType:e=""}=r,{url:o,options:s}=t.$commit("start");return console.log("- 爬取 ",t.$commit("start")),fetch(o,s).then((t=>function(t,r){let e=t.headers.get("content-type")||"";return t.returnType&&"auto"!==t.returnType?r?t[r]():t.json():/text|html|rtf|xml/.test(e)?t.text():/json/.test(e)?t.json():/arrayBuffer/.test(e)?t.arrayBuffer():t.buffer?t.buffer():t.blob()}(t,e))).then((r=>(t.$commit("success",r),t))).catch((r=>(t.$commit("error",r),t)))})(t,n)),{$delay:o,$count:s}))};export{r as Request};
