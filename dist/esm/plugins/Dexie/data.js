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

import{Dexie as e}from"./Dexie.js";import"../../tools/loader/loader.js";import"../../tools/loader/scriptStore.js";import"../../tools/loader/loaderFunction.js";const o={};function t(t){console.log(o);let r=new e(t);return r.open().catch("NoSuchDatabaseError",(o=>(r.close(),r=new e(t),r.version(1).stores({default:"_index,createdAt"}),r.open()))).then((e=>o[t]=e))}async function r(e="JSpider"){return o.hasOwnProperty(e)||await t(e),new Promise(((t,r)=>o[e].table("default").toArray(t)))}async function n(e,r){return o.hasOwnProperty(e)||await t(e),o[e].table("default").put(r,"_index")}export{r as getData,n as putData};
