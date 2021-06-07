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

function t(t){return new Promise((e=>setTimeout((()=>e(t)),200)))}class e{constructor(t){this.data=t}headers={"content-type":"application/json",get(t){return this[t]}};json(){return this.data instanceof Object?this.data:JSON.parse(this.data)}blob(){return new Blob([this.data])}text(){return JSON.stringify(this.data)}}class o{constructor(t){this.Mock=t,window.fetch.isFake||this.fakeFetch()}fakeFetch(){const o=this;window.$fetch=window.fetch,window.fetch=function(n,r={}){let i=o.find({url:n,type:r.method||"GET"});if(i){const n=o.convert(i,{});return console.warn("代理中",n),new Promise((t=>t(new e(n)))).then((e=>t(e)))}return console.log("未使用 mockjs"),window.$fetch(...arguments).then((e=>t(e)))}}find(t){for(var e in this.Mock.XHR.Mock._mocked){var o=this.Mock.XHR.Mock._mocked[e];if((!o.rurl||this.match(o.rurl,t.url))&&(!o.rtype||this.match(o.rtype,t.type.toLowerCase())))return o}return!1}match(t,e){return"string"===this.Mock.Util.type(t)?t===e:"regexp"===this.Mock.Util.type(t)?t.test(e):void 0}convert(t,e){return this.Mock.Util.isFunction(t.template)?t.template(e):this.Mock.XHR.Mock.mock(t.template)}}export{o as MockFetch};
