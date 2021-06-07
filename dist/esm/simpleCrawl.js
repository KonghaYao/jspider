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

import o from"./core/JSpider.js";import{Request as r}from"./plugins/Request.js";import{Download as e}from"./plugins/Download.js";import"./plugins/ExcelHelper.js";import"./Task-ce8b0387.js";import"./core/components.js";import"./utils/type.js";import"./concatMap-0d4163f6.js";import"./mergeMap-1cf10555.js";import"./map-f4798e28.js";import"./of-0c892e58.js";import"./utils/concurrent.js";import"./delayWhen-ec4378ef.js";import"./plugins/ExcelHelper/createExcelFile.js";import"./plugins/ExcelHelper/xlsx.js";import"./tools/loader/loader.js";import"./tools/loader/scriptStore.js";import"./tools/loader/loaderFunction.js";function p(p){return new o(r({returnType:"blob"}),e()).apply(p)}export default p;
