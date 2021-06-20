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

import{loaderFunction as t}from"./loaderFunction.js";import r from"./scriptStore.js";import{jsdelivr as e}from"./jsDelivr.js";import n from"../../utils/type.js";const o=/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;const s={Object({url:n="",name:o,way:s="npm",path:a="",version:p="",type:m="script"}){if(!n){const t=function({name:t,way:n,path:o,version:s}){return r.hasOwnProperty(t)?r[t]:e(t,{version:s,store:n,path:o})}({name:o,way:s,path:a,version:p});if("string"!=typeof t)return i(t);n=t}return t[m](n)},String(t){return this.Object({[o.test(t)?"url":"name"]:t})},Array:t=>Promise.all(t.map((t=>i(t))))};async function i(t){return s[n(t)](t)}export{i as $load};
