// @ts-nocheck
import {sv,Epe} from "./m434.ts";
import {bxn,hGr} from "./m3014.ts";
import {T3,XTe} from "./m121.ts";
import {b} from "../runtime.ts";
function _ee(e){let t=[];return{expanded:e.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*(?::-[^}]*)?)\}/g,(r,o)=>{let s=o.indexOf(":-"),i=s===-1?o:o.slice(0,s),a=s===-1?void 0:o.slice(s+2),l=process.env[i];if(l!==void 0)return l;if(a!==void 0)return a;return t.push(i),r}),missingVars:t}}
function qMd(e,t){return sv(e,bxn(T3(t)))}
var yee;
var Vnt=b(()=>{XTe();hGr();Epe();yee=qMd});
export {_ee,qMd,yee,Vnt};
