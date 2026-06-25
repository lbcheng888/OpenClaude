// @ts-nocheck
import {urs,drs} from "./m628.ts";
import {b} from "../runtime.ts";
function gou(e,t,n){return t=prs(t===void 0?e.length-1:t,0),function(){var r=arguments,o=-1,s=prs(r.length-t,0),i=Array(s);while(++o<s)i[o]=r[t+o];o=-1;var a=Array(t+1);while(++o<t)a[o]=r[o];return a[t]=n(i),urs(e,this,a)}}
var prs,Irn;
var Ayr=b(()=>{drs();prs=Math.max;Irn=gou});
export {gou,prs,Irn,Ayr};
