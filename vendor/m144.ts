// @ts-nocheck
import {mi,SH} from "./m135.ts";
import {b} from "../runtime.ts";
function Mrr(e){if(!e)throw new mi("Identity token file path is empty");return async()=>{let t=await import("fs"),n;try{n=await t.promises.readFile(e,"utf-8")}catch(o){throw new mi(`Failed to read identity token file at ${e}: ${o}`)}let r=n.trim();if(!r)throw new mi(`Identity token file at ${e} is empty`);return r}}
function g$o(e){if(!e)throw new mi("Identity token value is empty");return()=>e}
var _$o=b(()=>{SH()});
export {Mrr,g$o,_$o};
