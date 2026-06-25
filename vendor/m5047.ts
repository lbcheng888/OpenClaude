// @ts-nocheck
import {hs,Tu} from "./m649.ts";
import {b} from "../runtime.ts";
function Qym(e){let t=PYn.extname(e)===""?`${e}.txt`:e;return hs(t)}
async function OYn(e,t){let n=Qym(e);return await DYn.mkdir(PYn.dirname(n),{recursive:!0}),await DYn.writeFile(n,t,{encoding:"utf-8",flush:!0}),n}
var DYn,PYn;
var txo=b(()=>{Tu();DYn=require("fs/promises"),PYn=require("path")});
export {Qym,OYn,DYn,PYn,txo};
