// @ts-nocheck
import {Qs,YH} from "./m137.ts";
import {b} from "../runtime.ts";
function dlr(e){if(!e)throw new Qs("Identity token file path is empty");return async()=>{let t=await import("fs"),n;try{n=await t.promises.readFile(e,"utf-8")}catch(o){throw new Qs(`Failed to read identity token file at ${e}: ${o}`)}let r=n.trim();if(!r)throw new Qs(`Identity token file at ${e} is empty`);return r}}
function l5o(e){if(!e)throw new Qs("Identity token value is empty");return()=>e}
var c5o=b(()=>{YH()});
export {dlr,l5o,c5o};
