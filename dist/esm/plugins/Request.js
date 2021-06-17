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

import{concurrent as r}from"../utils/concurrent.js";import"../utils/retryAndDelay.js";import"../subscribeTo-a0871bd2.js";import"../Subscriber-4bc9607d.js";import"../innerSubscribe-6069f3a4.js";import"../delayWhen-2c1232cb.js";import"../isScheduler-8c992f4d.js";import"../bufferCount-4c0d3420.js";import"../mergeMap-1ccf2be3.js";import"../map-39ac3b74.js";import"../from-d10c21fa.js";import"../of-4aaceac2.js";const t=function(r,t){throw r},e=({delay:e=200,buffer:o=3,retry:s=3,handleError:c=null,RequestOptions:n={}}={})=>i=>i.pipe(r((r=>((r,t)=>{const{returnType:e="json"}=t,{url:o,options:s}=r.$commit("start");return console.log("- 爬取 ",o),fetch(o,s).then((r=>function(r,t){let e=r.headers.get("content-type")||"";return t&&"auto"!==t?t?r[t]():r.json():/text|html|rtf|xml/.test(e)?r.text():/json/.test(e)?r.json():/arrayBuffer/.test(e)?r.arrayBuffer():r.buffer?r.buffer():r.blob()}(r,e))).then((t=>(r.$commit("success",t),r))).catch((r=>{throw r}))})(r,n)),{delay:e,buffer:o,retry:s,handleError:c||t}));export{e as Request};
