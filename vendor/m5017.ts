// @ts-nocheck
import {Ds,Iu} from "./m643.ts";
import {b} from "../runtime.ts";
function Ucm(e){let t=UVn.extname(e)===""?`${e}.txt`:e;return Ds(t)}
async function $Vn(e,t){let n=Ucm(e);return await FVn.mkdir(UVn.dirname(n),{recursive:!0}),await FVn.writeFile(n,t,{encoding:"utf-8",flush:!0}),n}
var FVn,UVn;
var Wwo=b(()=>{Iu();FVn=require("fs/promises"),UVn=require("path")});
export {Ucm,$Vn,FVn,UVn,Wwo};
