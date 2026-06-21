// @ts-nocheck
import {uzt,ng} from "./m132.ts";
import {b} from "../runtime.ts";
function hzc(){return!1}
function BXo(e){try{return UXo.lstatSync(e,{throwIfNoEntry:!1})===void 0}catch{return!1}}
function yzc(e){let t=e.toLowerCase().replace(/.*[\\/]/,"").replace(/[. ]+$/,""),n=t.lastIndexOf(".");return n>0&&_zc.has(t.slice(n))}
function rfr(e,t=!1){let n=b7e.get(e);if(n!==void 0)if(n!==null){if(!BXo(n))return n;b7e.delete(e)}else{if(!t)return n;b7e.delete(e)}let r=process.env.SYSTEMROOT||"C:\\Windows",o=$Xo.join(r,"System32","where.exe");try{let i=FXo.execFileSync(o,[e],{stdio:"pipe",encoding:"utf8",timeout:gzc,windowsHide:!0,env:process.env}).trim().split(/\r?\n/).filter(Boolean),a=process.cwd(),l=!1;for(let c of i){if(BXo(c))continue;if(uzt(c,a)){l=!0;continue}if(!yzc(c))continue;return b7e.set(e,c),c}if(i.length>0&&!l)b7e.set(e,null);return null}catch(s){if(Tzc(s))b7e.set(e,null);return null}}
function Tzc(e){if(e===null||typeof e!=="object")return!1;let t="status"in e?e.status:void 0,n="signal"in e?e.signal:void 0,r="code"in e?e.code:void 0;return t===1&&!n&&!r}
function E7e(e,t=!1){if(!hzc())return e;if(e.includes("/")||e.includes("\\"))return e;return rfr(e,t)}
var FXo,UXo,$Xo,b7e,gzc=5000,_zc;
var C7e=b(()=>{ng();FXo=require("child_process"),UXo=require("fs"),$Xo=require("path");b7e=new Map;_zc=new Set([".com",".exe",".bat",".cmd"])});
export {hzc,BXo,yzc,rfr,Tzc,E7e,FXo,UXo,$Xo,b7e,gzc,_zc,C7e};
