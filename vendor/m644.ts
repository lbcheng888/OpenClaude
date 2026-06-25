// @ts-nocheck
import {$Jt,zf} from "./m133.ts";
import {b} from "../runtime.ts";
function Pou(){return!1}
function Lrs(e){try{return Nrs.lstatSync(e,{throwIfNoEntry:!1})===void 0}catch{return!1}}
function Mou(e){let t=e.toLowerCase().replace(/.*[\\/]/,"").replace(/[. ]+$/,""),n=t.lastIndexOf(".");return n>0&&Lou.has(t.slice(n))}
function Dyr(e,t=!1){let n=Tje.get(e);if(n!==void 0)if(n!==null){if(!Lrs(n))return n;Tje.delete(e)}else{if(!t)return n;Tje.delete(e)}let r=process.env.SYSTEMROOT||"C:\\Windows",o=Frs.join(r,"System32","where.exe");try{let i=Mrs.execFileSync(o,[e],{stdio:"pipe",encoding:"utf8",timeout:Oou,windowsHide:!0,env:process.env}).trim().split(/\r?\n/).filter(Boolean),a=process.cwd(),l=!1;for(let c of i){if(Lrs(c))continue;if($Jt(c,a)){l=!0;continue}if(!Mou(c))continue;return Tje.set(e,c),c}if(i.length>0&&!l)Tje.set(e,null);return null}catch(s){if(Nou(s))Tje.set(e,null);return null}}
function Nou(e){if(e===null||typeof e!=="object")return!1;let t="status"in e?e.status:void 0,n="signal"in e?e.signal:void 0,r="code"in e?e.code:void 0;return t===1&&!n&&!r}
function Sje(e,t=!1){if(!Pou())return e;if(e.includes("/")||e.includes("\\"))return e;return Dyr(e,t)}
var Mrs,Nrs,Frs,Tje,Oou=5000,Lou;
var bje=b(()=>{zf();Mrs=require("child_process"),Nrs=require("fs"),Frs=require("path");Tje=new Map;Lou=new Set([".com",".exe",".bat",".cmd"])});
export {Pou,Lrs,Mou,Dyr,Nou,Sje,Mrs,Nrs,Frs,Tje,Oou,Lou,bje};
