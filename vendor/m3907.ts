// @ts-nocheck
import {xm} from "./m135.ts";
import {b} from "../runtime.ts";
import {LD} from "./m194.ts";
async function wOa(e,t){let n=()=>{e.catch(()=>{})};if(t.aborted)throw n(),new xm;let r=()=>{};try{return await Promise.race([e,new Promise((o,s)=>{r=()=>s(new xm),t.addEventListener("abort",r,{once:!0})})])}catch(o){throw n(),o}finally{t.removeEventListener("abort",r)}}
var k2t=60000,H2t=120000,EOa=60000,COa=4,vOa="classify_result";
var VFn=b(()=>{LD()});
export {wOa,k2t,H2t,EOa,COa,vOa,VFn};
