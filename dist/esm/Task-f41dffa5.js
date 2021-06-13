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

import t from"./core/components.js";import r from"./utils/type.js";var e,o=new Uint8Array(16);function a(){if(!e&&!(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(o)}var s=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function n(t){return"string"==typeof t&&s.test(t)}for(var i=[],u=0;u<256;++u)i.push((u+256).toString(16).substr(1));function m(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=(i[t[r+0]]+i[t[r+1]]+i[t[r+2]]+i[t[r+3]]+"-"+i[t[r+4]]+i[t[r+5]]+"-"+i[t[r+6]]+i[t[r+7]]+"-"+i[t[r+8]]+i[t[r+9]]+"-"+i[t[r+10]]+i[t[r+11]]+i[t[r+12]]+i[t[r+13]]+i[t[r+14]]+i[t[r+15]]).toLowerCase();if(!n(e))throw TypeError("Stringified UUID is invalid");return e}function p(t,r,e){var o=(t=t||{}).random||(t.rng||a)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,r){e=e||0;for(var s=0;s<16;++s)r[e+s]=o[s];return r}return m(o)}class d{_index=p();_status="free";_createdAt=new Date;_updatedAt=new Date;_errorList=[];_result;_marks={};_complete=!1;_completeUUID;_mainUUID;data={};constructor(r,e){Object.assign(this.data,t.data()),this.$formatMessage(r),this._markUUID=e}$formatMessage(e){let o=r(e);if(!(t.format[o]instanceof Function))throw new Error("format 状态错误"+this._index);t.format[o].apply(this,[e])}$commit(r,...e){if(!(t.commit[r]instanceof Function))throw new Error("commit 状态错误"+this._index);{const o=t.commit[r].apply(this,e);if(!1!==o)return this._status=r,this._updatedAt=new Date,o}}$Mark(t){this._marks[t]=this._result}$checkRepeat(t){return this._marks.hasOwnProperty(t)}$output(){return["_complete",,"_completeUUID","_mainUUID","_index","_status","_createdAt","_updatedAt","_errorList","_result","_marks","data"].reduce(((t,r)=>(t[r]=this[r],t)),{})}}export{d as T,m as s,n as v};
