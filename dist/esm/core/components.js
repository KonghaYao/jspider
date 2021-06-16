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

var t="object"==typeof global&&global&&global.Object===Object&&global,r="object"==typeof self&&self&&self.Object===Object&&self,e=t||r||Function("return this")(),n=e.Symbol,o=Object.prototype,i=o.hasOwnProperty,a=o.toString,u=n?n.toStringTag:void 0;var c=Object.prototype.toString;var s=n?n.toStringTag:void 0;function f(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":s&&s in Object(t)?function(t){var r=i.call(t,u),e=t[u];try{t[u]=void 0;var n=!0}catch(t){}var o=a.call(t);return n&&(r?t[u]=e:delete t[u]),o}(t):function(t){return c.call(t)}(t)}function l(t){return null!=t&&"object"==typeof t}var p=Array.isArray;function h(t){var r=typeof t;return null!=t&&("object"==r||"function"==r)}function v(t){return t}function y(t){if(!h(t))return!1;var r=f(t);return"[object Function]"==r||"[object GeneratorFunction]"==r||"[object AsyncFunction]"==r||"[object Proxy]"==r}var _,b=e["__core-js_shared__"],d=(_=/[^.]+$/.exec(b&&b.keys&&b.keys.IE_PROTO||""))?"Symbol(src)_1."+_:"";var j=Function.prototype.toString;var g=/^\[object .+?Constructor\]$/,O=Function.prototype,m=Object.prototype,w=O.toString,A=m.hasOwnProperty,x=RegExp("^"+w.call(A).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function z(t){return!(!h(t)||(r=t,d&&d in r))&&(y(t)?x:g).test(function(t){if(null!=t){try{return j.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t));var r}function P(t,r){var e=function(t,r){return null==t?void 0:t[r]}(t,r);return z(e)?e:void 0}var S=Object.create,T=function(){function t(){}return function(r){if(!h(r))return{};if(S)return S(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}();function F(t,r,e){switch(e.length){case 0:return t.call(r);case 1:return t.call(r,e[0]);case 2:return t.call(r,e[0],e[1]);case 3:return t.call(r,e[0],e[1],e[2])}return t.apply(r,e)}var U=Date.now;var $,B,I,k=function(){try{var t=P(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),D=($=k?function(t,r){return k(t,"toString",{configurable:!0,enumerable:!1,value:(e=r,function(){return e}),writable:!0});var e}:v,B=0,I=0,function(){var t=U(),r=16-(t-I);if(I=t,r>0){if(++B>=800)return arguments[0]}else B=0;return $.apply(void 0,arguments)}),E=/^(?:0|[1-9]\d*)$/;function M(t,r){var e=typeof t;return!!(r=null==r?9007199254740991:r)&&("number"==e||"symbol"!=e&&E.test(t))&&t>-1&&t%1==0&&t<r}function L(t,r,e){"__proto__"==r&&k?k(t,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):t[r]=e}function R(t,r){return t===r||t!=t&&r!=r}var q=Object.prototype.hasOwnProperty;function C(t,r,e){var n=t[r];q.call(t,r)&&R(n,e)&&(void 0!==e||r in t)||L(t,r,e)}var N=Math.max;function G(t,r){return D(function(t,r,e){return r=N(void 0===r?t.length-1:r,0),function(){for(var n=arguments,o=-1,i=N(n.length-r,0),a=Array(i);++o<i;)a[o]=n[r+o];o=-1;for(var u=Array(r+1);++o<r;)u[o]=n[o];return u[r]=e(a),F(t,this,u)}}(t,r,v),t+"")}function V(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}function W(t){return null!=t&&V(t.length)&&!y(t)}var H=Object.prototype;function J(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||H)}function K(t){return l(t)&&"[object Arguments]"==f(t)}var Q=Object.prototype,X=Q.hasOwnProperty,Y=Q.propertyIsEnumerable,Z=K(function(){return arguments}())?K:function(t){return l(t)&&X.call(t,"callee")&&!Y.call(t,"callee")};var tt="object"==typeof exports&&exports&&!exports.nodeType&&exports,rt=tt&&"object"==typeof module&&module&&!module.nodeType&&module,et=rt&&rt.exports===tt?e.Buffer:void 0,nt=(et?et.isBuffer:void 0)||function(){return!1},ot={};ot["[object Float32Array]"]=ot["[object Float64Array]"]=ot["[object Int8Array]"]=ot["[object Int16Array]"]=ot["[object Int32Array]"]=ot["[object Uint8Array]"]=ot["[object Uint8ClampedArray]"]=ot["[object Uint16Array]"]=ot["[object Uint32Array]"]=!0,ot["[object Arguments]"]=ot["[object Array]"]=ot["[object ArrayBuffer]"]=ot["[object Boolean]"]=ot["[object DataView]"]=ot["[object Date]"]=ot["[object Error]"]=ot["[object Function]"]=ot["[object Map]"]=ot["[object Number]"]=ot["[object Object]"]=ot["[object RegExp]"]=ot["[object Set]"]=ot["[object String]"]=ot["[object WeakMap]"]=!1;var it="object"==typeof exports&&exports&&!exports.nodeType&&exports,at=it&&"object"==typeof module&&module&&!module.nodeType&&module,ut=at&&at.exports===it&&t.process,ct=function(){try{var t=at&&at.require&&at.require("util").types;return t||ut&&ut.binding&&ut.binding("util")}catch(t){}}(),st=ct&&ct.isTypedArray,ft=st?function(t){return function(r){return t(r)}}(st):function(t){return l(t)&&V(t.length)&&!!ot[f(t)]},lt=Object.prototype.hasOwnProperty;function pt(t,r){var e=p(t),n=!e&&Z(t),o=!e&&!n&&nt(t),i=!e&&!n&&!o&&ft(t),a=e||n||o||i,u=a?function(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n}(t.length,String):[],c=u.length;for(var s in t)!r&&!lt.call(t,s)||a&&("length"==s||o&&("offset"==s||"parent"==s)||i&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||M(s,c))||u.push(s);return u}var ht=Object.prototype.hasOwnProperty;function vt(t){if(!h(t))return function(t){var r=[];if(null!=t)for(var e in Object(t))r.push(e);return r}(t);var r=J(t),e=[];for(var n in t)("constructor"!=n||!r&&ht.call(t,n))&&e.push(n);return e}function yt(t){return W(t)?pt(t,!0):vt(t)}var _t=P(Object,"create");var bt=Object.prototype.hasOwnProperty;var dt=Object.prototype.hasOwnProperty;function jt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}function gt(t,r){for(var e=t.length;e--;)if(R(t[e][0],r))return e;return-1}jt.prototype.clear=function(){this.__data__=_t?_t(null):{},this.size=0},jt.prototype.delete=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r},jt.prototype.get=function(t){var r=this.__data__;if(_t){var e=r[t];return"__lodash_hash_undefined__"===e?void 0:e}return bt.call(r,t)?r[t]:void 0},jt.prototype.has=function(t){var r=this.__data__;return _t?void 0!==r[t]:dt.call(r,t)},jt.prototype.set=function(t,r){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=_t&&void 0===r?"__lodash_hash_undefined__":r,this};var Ot=Array.prototype.splice;function mt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}mt.prototype.clear=function(){this.__data__=[],this.size=0},mt.prototype.delete=function(t){var r=this.__data__,e=gt(r,t);return!(e<0)&&(e==r.length-1?r.pop():Ot.call(r,e,1),--this.size,!0)},mt.prototype.get=function(t){var r=this.__data__,e=gt(r,t);return e<0?void 0:r[e][1]},mt.prototype.has=function(t){return gt(this.__data__,t)>-1},mt.prototype.set=function(t,r){var e=this.__data__,n=gt(e,t);return n<0?(++this.size,e.push([t,r])):e[n][1]=r,this};var wt=P(e,"Map");function At(t,r){var e,n,o=t.__data__;return("string"==(n=typeof(e=r))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==e:null===e)?o["string"==typeof r?"string":"hash"]:o.map}function xt(t){var r=-1,e=null==t?0:t.length;for(this.clear();++r<e;){var n=t[r];this.set(n[0],n[1])}}xt.prototype.clear=function(){this.size=0,this.__data__={hash:new jt,map:new(wt||mt),string:new jt}},xt.prototype.delete=function(t){var r=At(this,t).delete(t);return this.size-=r?1:0,r},xt.prototype.get=function(t){return At(this,t).get(t)},xt.prototype.has=function(t){return At(this,t).has(t)},xt.prototype.set=function(t,r){var e=At(this,t),n=e.size;return e.set(t,r),this.size+=e.size==n?0:1,this};var zt=function(t,r){return function(e){return t(r(e))}}(Object.getPrototypeOf,Object),Pt=Function.prototype,St=Object.prototype,Tt=Pt.toString,Ft=St.hasOwnProperty,Ut=Tt.call(Object);function $t(t){var r=this.__data__=new mt(t);this.size=r.size}$t.prototype.clear=function(){this.__data__=new mt,this.size=0},$t.prototype.delete=function(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e},$t.prototype.get=function(t){return this.__data__.get(t)},$t.prototype.has=function(t){return this.__data__.has(t)},$t.prototype.set=function(t,r){var e=this.__data__;if(e instanceof mt){var n=e.__data__;if(!wt||n.length<199)return n.push([t,r]),this.size=++e.size,this;e=this.__data__=new xt(n)}return e.set(t,r),this.size=e.size,this};var Bt="object"==typeof exports&&exports&&!exports.nodeType&&exports,It=Bt&&"object"==typeof module&&module&&!module.nodeType&&module,kt=It&&It.exports===Bt?e.Buffer:void 0,Dt=kt?kt.allocUnsafe:void 0;var Et=e.Uint8Array;function Mt(t,r){var e,n,o=r?(e=t.buffer,n=new e.constructor(e.byteLength),new Et(n).set(new Et(e)),n):t.buffer;return new t.constructor(o,t.byteOffset,t.length)}var Lt,Rt=function(t,r,e){for(var n=-1,o=Object(t),i=e(t),a=i.length;a--;){var u=i[Lt?a:++n];if(!1===r(o[u],u,o))break}return t};function qt(t,r,e){(void 0!==e&&!R(t[r],e)||void 0===e&&!(r in t))&&L(t,r,e)}function Ct(t,r){if(("constructor"!==r||"function"!=typeof t[r])&&"__proto__"!=r)return t[r]}function Nt(t){return function(t,r,e,n){var o=!e;e||(e={});for(var i=-1,a=r.length;++i<a;){var u=r[i],c=n?n(e[u],t[u],u,e,t):void 0;void 0===c&&(c=t[u]),o?L(e,u,c):C(e,u,c)}return e}(t,yt(t))}function Gt(t,r,e,n,o,i,a){var u=Ct(t,e),c=Ct(r,e),s=a.get(c);if(s)qt(t,e,s);else{var v,_=i?i(u,c,e+"",t,r,a):void 0,b=void 0===_;if(b){var d=p(c),j=!d&&nt(c),g=!d&&!j&&ft(c);_=c,d||j||g?p(u)?_=u:l(v=u)&&W(v)?_=function(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r}(u):j?(b=!1,_=function(t,r){if(r)return t.slice();var e=t.length,n=Dt?Dt(e):new t.constructor(e);return t.copy(n),n}(c,!0)):g?(b=!1,_=Mt(c,!0)):_=[]:function(t){if(!l(t)||"[object Object]"!=f(t))return!1;var r=zt(t);if(null===r)return!0;var e=Ft.call(r,"constructor")&&r.constructor;return"function"==typeof e&&e instanceof e&&Tt.call(e)==Ut}(c)||Z(c)?(_=u,Z(u)?_=Nt(u):h(u)&&!y(u)||(_=function(t){return"function"!=typeof t.constructor||J(t)?{}:T(zt(t))}(c))):b=!1}b&&(a.set(c,_),o(_,c,n,i,a),a.delete(c)),qt(t,e,_)}}function Vt(t,r,e,n,o){t!==r&&Rt(r,(function(i,a){if(o||(o=new $t),h(i))Gt(t,r,a,e,Vt,n,o);else{var u=n?n(Ct(t,a),i,a+"",t,r,o):void 0;void 0===u&&(u=i),qt(t,a,u)}}),yt)}var Wt,Ht=(Wt=function(t,r,e){Vt(t,r,e)},G((function(t,r){var e=-1,n=r.length,o=n>1?r[n-1]:void 0,i=n>2?r[2]:void 0;for(o=Wt.length>3&&"function"==typeof o?(n--,o):void 0,i&&function(t,r,e){if(!h(e))return!1;var n=typeof r;return!!("number"==n?W(e)&&M(r,e.length):"string"==n&&r in e)&&R(e[r],t)}(r[0],r[1],i)&&(o=n<3?void 0:o,n=1),t=Object(t);++e<n;){var a=r[e];a&&Wt(t,a,e,o)}return t})));class Jt{constructor(t){this.err=t,this.errTime=new Date}}const Kt={data:()=>({url:{},options:{},result:null}),format:{String(t){this.data.url=t},Object(t){!0===t._isABackup&&Ht(this,t),Ht(this.data,t)}},commit:{start(){return this.data},processing(t){return this._result},complete(t){this._complete=!0,this._completeUUID=t},success(t){this._result=t},error(t){this._errorList.push(new Jt(t))}}};export default Kt;
