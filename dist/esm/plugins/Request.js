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

import t from"../utils/concurrent.js";import"../mergeMap-1cf10555.js";import"../map-f4798e28.js";import"../concatMap-0d4163f6.js";import"../delayWhen-ec4378ef.js";const e=e=>r=>{e=e||{};const{$delay:o=200,$count:n=3}=e;return r.pipe(t((t=>((t,e)=>{const{returnType:r=""}=e,{url:o,options:n}=t.$commit("start");return console.log("- 爬取 ",t.$commit("start")),fetch(o,n).then((t=>function(t,e){let r=t.headers.get("content-type")||"";return t.returnType&&"auto"!==t.returnType?e?t[e]():t.json():/text|html|rtf|xml/.test(r)?t.text():/json/.test(r)?t.json():/arrayBuffer/.test(r)?t.arrayBuffer():t.buffer?t.buffer():t.blob()}(t,r))).then((e=>(t.$commit("success",e),t))).catch((e=>(t.$commit("error",e),t)))})(t,e)),{$delay:o,$count:n}))};export{e as Request};
