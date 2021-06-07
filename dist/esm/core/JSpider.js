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

import{v as e,s as r,T as t}from"../Task-ce8b0387.js";import{c as n}from"../concatMap-0d4163f6.js";import{o as s,O as a,m as o}from"../map-f4798e28.js";import{p as i,f as p}from"../mergeMap-1cf10555.js";import{o as c}from"../of-0c892e58.js";import"./components.js";import"../utils/type.js";function l(e,r,t,n){switch(e){case 0:return r&t^~r&n;case 1:return r^t^n;case 2:return r&t^r&n^t&n;case 3:return r^t^n}}function u(e,r){return e<<r|e>>>32-r}var f=function(t,n,s){function a(t,a,o,i){if("string"==typeof t&&(t=function(e){e=unescape(encodeURIComponent(e));for(var r=[],t=0;t<e.length;++t)r.push(e.charCodeAt(t));return r}(t)),"string"==typeof a&&(a=function(r){if(!e(r))throw TypeError("Invalid UUID");var t,n=new Uint8Array(16);return n[0]=(t=parseInt(r.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(r.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(r.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(r.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(r.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n}(a)),16!==a.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var p=new Uint8Array(16+t.length);if(p.set(a),p.set(t,a.length),(p=s(p))[6]=15&p[6]|n,p[8]=63&p[8]|128,o){i=i||0;for(var c=0;c<16;++c)o[i+c]=p[c];return o}return r(p)}try{a.name=t}catch(e){}return a.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",a.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",a}("v5",80,(function(e){var r=[1518500249,1859775393,2400959708,3395469782],t=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){var n=unescape(encodeURIComponent(e));e=[];for(var s=0;s<n.length;++s)e.push(n.charCodeAt(s))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);for(var a=e.length/4+2,o=Math.ceil(a/16),i=new Array(o),p=0;p<o;++p){for(var c=new Uint32Array(16),f=0;f<16;++f)c[f]=e[64*p+4*f]<<24|e[64*p+4*f+1]<<16|e[64*p+4*f+2]<<8|e[64*p+4*f+3];i[p]=c}i[o-1][14]=8*(e.length-1)/Math.pow(2,32),i[o-1][14]=Math.floor(i[o-1][14]),i[o-1][15]=8*(e.length-1)&4294967295;for(var h=0;h<o;++h){for(var m=new Uint32Array(80),U=0;U<16;++U)m[U]=i[h][U];for(var g=16;g<80;++g)m[g]=u(m[g-3]^m[g-8]^m[g-14]^m[g-16],1);for(var v=t[0],I=t[1],y=t[2],_=t[3],d=t[4],b=0;b<80;++b){var D=Math.floor(b/20),w=u(v,5)+l(D,I,y,_)+d+r[D]+m[b]>>>0;d=_,_=y,y=u(I,30)>>>0,I=v,v=w}t[0]=t[0]+v>>>0,t[1]=t[1]+I>>>0,t[2]=t[2]+y>>>0,t[3]=t[3]+_>>>0,t[4]=t[4]+d>>>0}return[t[0]>>24&255,t[0]>>16&255,t[0]>>8&255,255&t[0],t[1]>>24&255,t[1]>>16&255,t[1]>>8&255,255&t[1],t[2]>>24&255,t[2]>>16&255,t[2]>>8&255,255&t[2],t[3]>>24&255,t[3]>>16&255,t[3]>>8&255,255&t[3],t[4]>>24&255,t[4]>>16&255,t[4]>>8&255,255&t[4]]}));export default class{constructor(...e){this.plugins=e,this._createPipeline()}marksPath=[];plugins=[];_aboutElementIndex=-1;_status="normal";_tasks=[];_pluginsUUID;_createUUID(e){return f(e,f.URL)}_createPipeline(){let e=[],r=this.plugins.reduce(((r,t)=>{let s=t.toString(),a=this._createUUID(s);return t.uuid=a,e.push(s),!1===t.$canSkip?r.push(t):r.push(n((e=>{let r=c(e);return e.$checkRepeat(a)?r:r.pipe(t)})),o((e=>(e.$Mark(a),e)))),r}),[]);this._pluginsUUID=this._createUUID(JSON.stringify(e)),console.log(this._pluginsUUID),this.pipeline=i(...r)}apply(e){return console.log("开始流",e),p(e).pipe(o(((e,r)=>{const n=new t(e,r);return n._mainUUID=this._pluginsUUID,this._tasks.push(n),n})),(r=e=>!(!e._complete||"complete"!==e._status||e._completeUUID!==this._pluginsUUID||(console.log("跳过一个目标"),0)),s((function(e,t){var n=!1,s=0;e.subscribe(new a(t,(function(e){return(n||(n=!r(e,s++)))&&t.next(e)})))}))),this.pipeline,o((e=>e.$commit("complete",this._pluginsUUID)))).subscribe({complete(){console.log("爬虫全部完成")}});var r}setting(){}restart(){}retry(){}about(){}report(e){}}
