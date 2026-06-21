// @ts-nocheck
import {n9,jnt,aGr} from "./m3004.ts";
import {b} from "../runtime.ts";
import {cu,_t} from "./m582.ts";
function ala(e){if(typeof e==="string")return e;let t=e.children.map(ala).join(""),n=e.scope??e.kind,r=n?M5d[n.replace(/^hljs-/,"")]:void 0;return r?r(t):t}
function N5d(e,t){let n=t?.language;if(!n)return e;let r;try{let i=n9(n);if(!i)return e;r=jnt().highlight(e,{language:i,ignoreIllegals:!0})}catch{return e}let o=r._emitter??r.emitter,s=o?.rootNode??o?.root;if(!s||typeof s==="string")return e;return s.children.map(ala).join("")}
function B5d(e){return n9(e)!==null}
function Ike(){return F5d}
async function y9e(e){let t=ila.extname(e).slice(1);if(!t)return"unknown";let n=n9(t);if(!n)return"unknown";return jnt().getLanguage(n)?.name??"unknown"}
var ila,M5d,F5d;
var T9e=b(()=>{cu();aGr();ila=require("path"),M5d={keyword:_t.blue,built_in:_t.cyan,type:_t.cyan.dim,literal:_t.blue,number:_t.green,regexp:_t.red,string:_t.red,subst:_t.reset,symbol:_t.reset,class:_t.blue,function:_t.yellow,title:_t.reset,params:_t.reset,comment:_t.green,doctag:_t.green,meta:_t.grey,"meta-keyword":_t.reset,"meta-string":_t.reset,section:_t.reset,tag:_t.grey,name:_t.blue,attr:_t.cyan,attribute:_t.reset,variable:_t.reset,bullet:_t.reset,code:_t.reset,emphasis:_t.italic,strong:_t.bold,link:_t.underline,quote:_t.reset,addition:_t.green,deletion:_t.red};F5d={highlight:N5d,supportsLanguage:B5d}});
export {ala,N5d,B5d,Ike,y9e,ila,M5d,F5d,T9e};
