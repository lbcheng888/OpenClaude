// @ts-nocheck
import {b} from "../runtime.ts";
function getFastModeModelDisplayName(e,t){return e.repeat(Number.isFinite(t)&&t>0?t:0)}
function mk(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function fk(e){return e.charAt(0).toUpperCase()+e.slice(1)}
function Sn(e,t,n=t+"s"){return e===1?t:n}
function tEe(e,t){if(e.length<=t)return e;let n=[];for(let r of e){if(n.length>=t)break;n.push(r)}return n.join("")}
function Yx(e,t){if(e.length<=t)return e;let n=e.slice(0,t),r=n.charCodeAt(t-1);return r>=55296&&r<=56319?n.slice(0,-1):n}
function _7e(e,t){if(e.length<=t)return e;let n=e.slice(-t),r=n.charCodeAt(0);return r>=56320&&r<=57343?n.slice(1):n}
function WXt(e){if(qXt)return qXt(e);return!Ykc.test(e)}
function GXt(e){if(tWo)return tWo(e);return e.replace(nWo,"\uFFFD")}
function rWo(e){if(qXt&&qXt(e))return e;return e.replace(nWo,"")}
function VXt(e){let t=!1,n=[e];while(n.length>0){let r=n.pop();if(Array.isArray(r))for(let o=0;o<r.length;o++){let s=r[o];if(typeof s==="string"){if(!WXt(s))r[o]=GXt(s),t=!0}else if(s!==null&&typeof s==="object")n.push(s)}else if(r!==null&&typeof r==="object"){let o=r;for(let s of Object.keys(o)){let i=o[s];if(typeof i==="string"){if(!WXt(i))o[s]=GXt(i),t=!0}else if(i!==null&&typeof i==="object")n.push(i)}}}return t}
function oWo(e){let t=[e];while(t.length>0){let n=t.pop();if(Array.isArray(n))for(let r=0;r<n.length;r++){let o=n[r];if(typeof o==="string"){if(!WXt(o))return!0}else if(o!==null&&typeof o==="object")t.push(o)}else if(n!==null&&typeof n==="object"){let r=n;for(let o of Object.keys(r)){let s=r[o];if(typeof s==="string"){if(!WXt(s))return!0}else if(s!==null&&typeof s==="object")t.push(s)}}}return!1}
function mi(e,t){let n=e.indexOf(t);return n===-1?e:e.slice(0,n)}
function Cd(e){return mi(e,`
`)}
function nu(e,t,n=0){let r=0,o=e.indexOf(t,n);while(o!==-1)r++,o=e.indexOf(t,o+1);return r}
function Mre(e){return e.replace(/[\uFF10-\uFF19]/g,(t)=>String.fromCharCode(t.charCodeAt(0)-65248))}
function Nre(e){return e.replaceAll("\u3000"," ")}
function KXt(e,t=",",n=sWo){let o="";for(let s of e){let i=o?t:"",a=i+s;if(o.length+a.length<=n)o+=a;else{let l=n-o.length-i.length-14;if(l>0)o+=i+s.slice(0,l)+"...[truncated]";else o+="...[truncated]";return o}}return o}
class Gbt{maxSize;content="";isTruncated=!1;totalBytesReceived=0;constructor(e=sWo){this.maxSize=e}append(e){let t=typeof e==="string"?e:e.toString();if(this.totalBytesReceived+=t.length,this.isTruncated&&this.content.length>=this.maxSize)return;if(this.content.length+t.length>this.maxSize){let n=this.maxSize-this.content.length;if(n>0)this.content+=t.slice(0,n);this.isTruncated=!0}else this.content+=t}toString(){if(!this.isTruncated)return this.content;let e=this.totalBytesReceived-this.maxSize,t=Math.round(e/1024);return this.content+`
... [output truncated - ${t}KB removed]`}clear(){this.content="",this.isTruncated=!1,this.totalBytesReceived=0}get length(){return this.content.length}get truncated(){return this.isTruncated}get totalBytes(){return this.totalBytesReceived}}
function zXt(e,t){let n=e.split(`
`);if(n.length<=t)return e;return n.slice(0,t).join(`
`)+"\u2026"}
function _Me(e,t){if(e.length<=t)return e;let n=Yx(e,t);return`${n}\u2026 [+${e.length-n.length} chars]`}
var Ykc,nWo,qXt,tWo,sWo=33554432;
var lr=b(()=>{Ykc=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/,nWo=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,qXt=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0,tWo=typeof String.prototype.toWellFormed==="function"?Function.prototype.call.bind(String.prototype.toWellFormed):void 0});
export {getFastModeModelDisplayName,mk,fk,Sn,tEe,Yx,_7e,WXt,GXt,rWo,VXt,oWo,mi,Cd,nu,Mre,Nre,KXt,Gbt,zXt,_Me,Ykc,nWo,qXt,tWo,sWo,lr};
