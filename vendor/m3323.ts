// @ts-nocheck
import {A$,Yot,Wjr} from "./m3017.ts";
import {b} from "../runtime.ts";
import {Gc,bt} from "./m588.ts";
function _ha(e){if(typeof e==="string")return e;let t=e.children.map(_ha).join(""),n=e.scope??e.kind,r=n?CZd[n.replace(/^hljs-/,"")]:void 0;return r?r(t):t}
function AZd(e,t){let n=t?.language;if(!n)return e;let r;try{let i=A$(n);if(!i)return e;r=Yot().highlight(e,{language:i,ignoreIllegals:!0})}catch{return e}let o=r._emitter??r.emitter,s=o?.rootNode??o?.root;if(!s||typeof s==="string")return e;return s.children.map(_ha).join("")}
function RZd(e){return A$(e)!==null}
function yIe(){return vZd}
async function I3e(e){let t=gha.extname(e).slice(1);if(!t)return"unknown";let n=A$(t);if(!n)return"unknown";return Yot().getLanguage(n)?.name??"unknown"}
var gha,CZd,vZd;
var x3e=b(()=>{Gc();Wjr();gha=require("path"),CZd={keyword:bt.blue,built_in:bt.cyan,type:bt.cyan.dim,literal:bt.blue,number:bt.green,regexp:bt.red,string:bt.red,subst:bt.reset,symbol:bt.reset,class:bt.blue,function:bt.yellow,title:bt.reset,params:bt.reset,comment:bt.green,doctag:bt.green,meta:bt.grey,"meta-keyword":bt.reset,"meta-string":bt.reset,section:bt.reset,tag:bt.grey,name:bt.blue,attr:bt.cyan,attribute:bt.reset,variable:bt.reset,bullet:bt.reset,code:bt.reset,emphasis:bt.italic,strong:bt.bold,link:bt.underline,quote:bt.reset,addition:bt.green,deletion:bt.red};vZd={highlight:AZd,supportsLanguage:RZd}});
export {_ha,AZd,RZd,yIe,I3e,gha,CZd,vZd,x3e};
