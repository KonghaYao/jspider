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

import{Dexie as o}from"./Dexie.js";import"../../tools/loader/loader.js";import"../../tools/loader/loaderFunction.js";import"../../tools/loader/scriptStore.js";import"../../tools/loader/jsDelivr.js";import"../../utils/type.js";const t={};function e(e){console.log(t);let r=new o(e);return r.open().catch("NoSuchDatabaseError",(t=>(r.close(),r=new o(e),r.version(1).stores({default:"_index,createdAt"}),r.open()))).then((o=>t[e]=o))}async function r(o="JSpider"){return t.hasOwnProperty(o)||await e(o),new Promise(((e,r)=>t[o].table("default").toArray(e)))}async function n(o,r){return t.hasOwnProperty(o)||await e(o),t[o].table("default").put(r,"_index")}export{r as getData,n as putData};
