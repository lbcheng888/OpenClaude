// @ts-nocheck
import {u7,G5} from "./m1296.ts";
import {b} from "../runtime.ts";
import {Pv,vf} from "./m639.ts";
import {Ct,cn} from "./m197.ts";
import {ps,Wt} from "./m230.ts";
import {tn,qt,TeamDeleteToolName} from "../src/config/0230_encoding.ts";
import {eHt,pFe} from "./m1479.ts";
function Zmn(){let e=u7(),t=".credentials.json";return{storageDir:e,storagePath:D8s.join(e,".credentials.json")}}
var x8s,D8s,efn;
var P8s=b(()=>{Pv();Ct();ps();tn();G5();eHt();x8s=require("fs/promises"),D8s=require("path");efn={name:"plaintext",read(){let{storagePath:e}=Zmn();try{let t=Wt().readFileSync(e,{encoding:"utf8"});return qt(t)}catch{return null}},async readAsync(){let{storagePath:e}=Zmn();try{let t=await Wt().readFile(e,{encoding:"utf8"});return qt(t)}catch{return null}},mutate(e){return pFe(efn,e)},async update(e){try{let{storageDir:t,storagePath:n}=Zmn();return await Wt().mkdir(t),await vf(n,TeamDeleteToolName(e),384),await x8s.chmod(n,384),{success:!0,warning:"Warning: Storing credentials in plaintext."}}catch{return{success:!1}}},async delete(){let{storagePath:e}=Zmn();try{return await Wt().unlink(e),!0}catch(t){if(cn(t)==="ENOENT")return!0;return!1}}}});
export {Zmn,x8s,D8s,efn,P8s};
