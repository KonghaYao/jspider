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

import o from"./ExcelHelper/createExcelFile.js";import{init as r}from"./ExcelHelper/xlsx.js";import{m as e}from"../map-39ac3b74.js";import"../tools/loader/loader.js";import"../tools/loader/loaderFunction.js";import"../tools/loader/scriptStore.js";import"../tools/loader/jsDelivr.js";import"../utils/type.js";import"../Subscriber-4bc9607d.js";const t=(r,t)=>s=>s.pipe(e(((e,s)=>{let{name:i="爬取结果",XLSXOptions:l={}}=t||{},m=e.$commit("processing");r&&(m=r(m));let p=o(m,i,l);return e.$commit("success",p),e})));t.init=r;export{t as ExcelHelper};
