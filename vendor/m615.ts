// @ts-nocheck
import {_re,AWe} from "./m29.ts";
import {hSe,pyt} from "./m198.ts";
import {b} from "../runtime.ts";
function g7e(e){let t=[],n=!1;async function r(){if(n)return;if(t.length===0)return;n=!0;while(t.length>0){let{args:o,resolve:s,reject:i,context:a}=t.shift();try{let l=await e.apply(a,o);s(l)}catch(l){i(l)}}if(n=!1,t.length>0)r()}return function(...o){return new Promise((s,i)=>{t.push({args:o,resolve:s,reject:i,context:this}),r()})}}
function $Kc(e,t,n){if(n!==void 0&&!_re(e[t],n)||n===void 0&&!(t in e))hSe(e,t,n)}
var Rbt;
var Kmr=b(()=>{pyt();AWe();Rbt=$Kc});
export {g7e,$Kc,Rbt,Kmr};
