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

import{scriptMap as t}from"./scriptStore.js";import{loaderFunction as e}from"./loaderFunction.js";const r={jsdelivr:"https://cdn.jsdelivr.net/"};let o={scriptMap:t,_getURL(e){let r=e;if("string"==typeof e){t.hasOwnProperty(e)&&(r=t[e])}return"string"==typeof r?[{url:r,type:"script"}]:r instanceof Array?r.map((t=>this._generateURLObject(t))):[this._generateURLObject(r)]},_generateURLObject:({root:t,repo:e,path:o,type:p="script"})=>({url:(r[t]||t)+e+o,type:p})};function p(t){let r=o._getURL(t);return Promise.all(r.map((({url:t,type:r})=>(console.log(t),e.hasOwnProperty(r)?e[r](t):Promise.resolve(!0)))))}export{p as $load};
