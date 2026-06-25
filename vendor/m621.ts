// @ts-nocheck
import {mre,lKe} from "./m6.ts";
import {Xbe,Bbt} from "./m200.ts";
import {b} from "../runtime.ts";
function fje(e){let t=[],n=!1;async function r(){if(n)return;if(t.length===0)return;n=!0;while(t.length>0){let{args:o,resolve:s,reject:i,context:a}=t.shift();try{let l=await e.apply(a,o);s(l)}catch(l){i(l)}}if(n=!1,t.length>0)r()}return function(...o){return new Promise((s,i)=>{t.push({args:o,resolve:s,reject:i,context:this}),r()})}}
function oou(e,t,n){if(n!==void 0&&!mre(e[t],n)||n===void 0&&!(t in e))Xbe(e,t,n)}
var ZAt;
var Eyr=b(()=>{Bbt();lKe();ZAt=oou});
export {fje,oou,ZAt,Eyr};
