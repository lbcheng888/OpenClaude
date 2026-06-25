// @ts-nocheck
import {b} from "../runtime.ts";
import {ijs,sjs} from "./m1631.ts";
function IPr(e){ljs=e,kPr=[],HPr=[];let t=/\*/g,n=e.split(",").map((r)=>r.trim().replace(t,".*?"));for(let r of n)if(r.startsWith("-"))HPr.push(new RegExp(`^${r.substr(1)}$`));else kPr.push(new RegExp(`^${r}$`));for(let r of Qfn)r.enabled=xPr(r.namespace)}
function xPr(e){if(e.endsWith("*"))return!0;for(let t of HPr)if(t.test(e))return!1;for(let t of kPr)if(t.test(e))return!0;return!1}
function wqu(){let e=ljs||"";return IPr(""),e}
function ujs(e){let t=Object.assign(n,{enabled:xPr(e),destroy:kqu,log:cjs.log,namespace:e,extend:Hqu});function n(...r){if(!t.enabled)return;if(r.length>0)r[0]=`${e} ${r[0]}`;t.log(...r)}return Qfn.push(t),t}
function kqu(){let e=Qfn.indexOf(this);if(e>=0)return Qfn.splice(e,1),!0;return!1}
function Hqu(e){let t=ujs(`${this.namespace}:${e}`);return t.log=this.log,t}
var ajs,ljs,kPr,HPr,Qfn,cjs,YXe;
var djs=b(()=>{ijs();ajs=typeof process<"u"&&process.env&&process.env.DEBUG||void 0,kPr=[],HPr=[],Qfn=[];if(ajs)IPr(ajs);cjs=Object.assign((e)=>ujs(e),{enable:IPr,enabled:xPr,disable:wqu,log:sjs});YXe=cjs});
export {IPr,xPr,wqu,ujs,kqu,Hqu,ajs,ljs,kPr,HPr,Qfn,cjs,YXe,djs};
