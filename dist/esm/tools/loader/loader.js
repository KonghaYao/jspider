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

import{loaderFunction as t}from"./loaderFunction.js";import r from"./scriptStore.js";import{jsdelivr as s}from"./jsDelivr.js";import i from"../../utils/type.js";const e=/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;class o{url="";type="script";path="";version="";way="npm";constructor(t){"string"==typeof t?e.test(t)?this.URL(t):r.hasOwnProperty(t)?this.url=r[t]:this.jsdelivr({name:t}):this.jsdelivr(t)}URL(t){this.url=t}jsdelivr({name:t,way:r="npm",path:i="",version:e="",type:o}){this.path=i,this.version=e,this.way=r,this.type=o,this.url=s(t,{version:e,store:r,path:i})}async getURL(){return t[this.type||"script"](this.url)}}function p(t){return"array"===i(t)?Promise.all(t.map((t=>new o(t).getURL()))):new o(t).getURL()}export{p as $load};
