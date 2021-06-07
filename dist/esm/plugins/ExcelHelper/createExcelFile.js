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

import{XLSX as o}from"./xlsx.js";import"../../tools/loader/loader.js";import"../../tools/loader/scriptStore.js";import"../../tools/loader/loaderFunction.js";function t(t){let e=o.utils.book_new();return Object.entries(t).forEach((([t,r])=>{let n=function(t){return t.forEach((o=>{Object.entries(o).forEach((([t,e])=>{e instanceof Object&&(o[t]=JSON.stringify(e))}))})),o.utils.json_to_sheet(t)}(r);o.utils.book_append_sheet(e,n,t)})),e}function e(e,r,n){let{bookType:i="xlsx",bookSST:s=!0,type:l="array"}=n||{};return function(t,e,r){let n=o.write(t,r);return new File([n],e+"."+r.bookType)}(t(e),r,{bookType:i,bookSST:s,type:l})}export default e;