// @ts-nocheck
import {b} from "../runtime.ts";
function uf(e,t){return e.repeat(Number.isFinite(t)&&t>0?t:0)}
function VI(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function Xx(e){return e.charAt(0).toUpperCase()+e.slice(1)}
function Cn(e,t,n=t+"s"){return e===1?t:n}
function TSe(e,t){if(e.length<=t)return e;let n=[];for(let r of e){if(n.length>=t)break;n.push(r)}return n.join("")}
function ND(e,t){if(e.length<=t)return e;let n=e.slice(0,t),r=n.charCodeAt(t-1);return r>=55296&&r<=56319?n.slice(0,-1):n}
function TGe(e,t){if(e.length<=t)return e;let n=e.slice(-t),r=n.charCodeAt(0);return r>=56320&&r<=57343?n.slice(1):n}
function uYt(e){if(cYt)return cYt(e);return!G_c.test(e)}
function dYt(e){if(i3o)return i3o(e);return e.replace(a3o,"\uFFFD")}
function l3o(e){if(cYt&&cYt(e))return e;return e.replace(a3o,"")}
function pYt(e){let t=!1,n=[e];while(n.length>0){let r=n.pop();if(Array.isArray(r))for(let o=0;o<r.length;o++){let s=r[o];if(typeof s==="string"){if(!uYt(s))r[o]=dYt(s),t=!0}else if(s!==null&&typeof s==="object")n.push(s)}else if(r!==null&&typeof r==="object"){let o=r;for(let s of Object.keys(o)){let i=o[s];if(typeof i==="string"){if(!uYt(i))o[s]=dYt(i),t=!0}else if(i!==null&&typeof i==="object")n.push(i)}}}return t}
function c3o(e){let t=[e];while(t.length>0){let n=t.pop();if(Array.isArray(n))for(let r=0;r<n.length;r++){let o=n[r];if(typeof o==="string"){if(!uYt(o))return!0}else if(o!==null&&typeof o==="object")t.push(o)}else if(n!==null&&typeof n==="object"){let r=n;for(let o of Object.keys(r)){let s=r[o];if(typeof s==="string"){if(!uYt(s))return!0}else if(s!==null&&typeof s==="object")t.push(s)}}}return!1}
function Di(e,t){let n=e.indexOf(t);return n===-1?e:e.slice(0,n)}
function zd(e){return Di(e,`
`)}
function Uu(e,t,n=0){let r=0,o=e.indexOf(t,n);while(o!==-1)r++,o=e.indexOf(t,o+1);return r}
function Bre(e){return e.replace(/[\uFF10-\uFF19]/g,(t)=>String.fromCharCode(t.charCodeAt(0)-65248))}
function Fre(e){return e.replaceAll("\u3000"," ")}
function mYt(e,t=",",n=u3o){let o="";for(let s of e){let i=o?t:"",a=i+s;if(o.length+a.length<=n)o+=a;else{let l=n-o.length-i.length-14;if(l>0)o+=i+s.slice(0,l)+"...[truncated]";else o+="...[truncated]";return o}}return o}
class gyt{maxSize;content="";isTruncated=!1;totalBytesReceived=0;constructor(e=u3o){this.maxSize=e}append(e){let t=typeof e==="string"?e:e.toString();if(this.totalBytesReceived+=t.length,this.isTruncated&&this.content.length>=this.maxSize)return;if(this.content.length+t.length>this.maxSize){let n=this.maxSize-this.content.length;if(n>0)this.content+=t.slice(0,n);this.isTruncated=!0}else this.content+=t}toString(){if(!this.isTruncated)return this.content;let e=this.totalBytesReceived-this.maxSize,t=Math.round(e/1024);return this.content+`
... [output truncated - ${t}KB removed]`}clear(){this.content="",this.isTruncated=!1,this.totalBytesReceived=0}get length(){return this.content.length}get truncated(){return this.isTruncated}get totalBytes(){return this.totalBytesReceived}}
function fYt(e,t){let n=e.split(`
`);if(n.length<=t)return e;return n.slice(0,t).join(`
`)+"\u2026"}
function CLe(e,t){if(e.length<=t)return e;let n=ND(e,t);return`${n}\u2026 [+${e.length-n.length} chars]`}
var G_c,a3o,cYt,i3o,u3o=33554432;
var dr=b(()=>{G_c=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/,a3o=/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,cYt=typeof String.prototype.isWellFormed==="function"?Function.prototype.call.bind(String.prototype.isWellFormed):void 0,i3o=typeof String.prototype.toWellFormed==="function"?Function.prototype.call.bind(String.prototype.toWellFormed):void 0});
export {uf,VI,Xx,Cn,TSe,ND,TGe,uYt,dYt,l3o,pYt,c3o,Di,zd,Uu,Bre,Fre,mYt,gyt,fYt,CLe,G_c,a3o,cYt,i3o,u3o,dr};
