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

import{zipper as o}from"./JSzip/zipper.js";import{tasksToFiles as r}from"./JSzip/tasksToFiles.js";import{T as t}from"../Task-f41dffa5.js";import{init as s}from"./JSzip/JSzip.js";import{b as i}from"../bufferCount-cc50a06c.js";import{m as p}from"../mergeMap-063b7a69.js";import{f as m}from"../from-87624c8d.js";import{m as e}from"../map-94257997.js";import"./utils/toFile.js";import"../core/components.js";import"../utils/type.js";import"../tools/loader/loader.js";import"../tools/loader/scriptStore.js";import"../tools/loader/loaderFunction.js";import"../Subscriber-66236423.js";const a=(s={})=>a=>{let{zipName:c="",$chunk:f=1}=s,j=[];return f>=1&&j.push(i(f)),a.pipe(...j,p(((s,i)=>{let p=s.map(r),a=o(p,c||(new Date).getTime(),i);return m(a).pipe(e((o=>{const r=new t({data:s},s[0]._pluginsUUID);return r.$commit("success",o),r})))})))};a.init=s;export{a as ZipFile};
