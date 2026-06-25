// @ts-nocheck
import {qp} from "./m137.ts";
import {b} from "../runtime.ts";
import {jx} from "./m196.ts";
async function D$a(e,t){let n=()=>{e.catch(()=>{})};if(t.aborted)throw n(),new qp;let r=()=>{};try{return await Promise.race([e,new Promise((o,s)=>{r=()=>s(new qp),t.addEventListener("abort",r,{once:!0})})])}catch(o){throw n(),o}finally{t.removeEventListener("abort",r)}}
var A3t=60000,R3t=120000,H$a=60000,I$a=4,x$a="classify_result";
var E9n=b(()=>{jx()});
export {D$a,A3t,R3t,H$a,I$a,x$a,E9n};
