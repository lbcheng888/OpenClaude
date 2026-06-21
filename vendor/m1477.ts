// @ts-nocheck
import {B7,k8} from "./m1291.ts";
import {b} from "../runtime.ts";
import {ok,Rh} from "./m633.ts";
import {bt,dn} from "./m195.ts";
import {ws,jt} from "./m228.ts";
import {Xt,qt,Le} from "../src/config/0228_encoding.ts";
import {Rwt,hNe} from "./m1474.ts";
function gdn(){let e=B7(),t=".credentials.json";return{storageDir:e,storagePath:N9s.join(e,".credentials.json")}}
var M9s,N9s,_dn;
var B9s=b(()=>{ok();bt();ws();Xt();k8();Rwt();M9s=require("fs/promises"),N9s=require("path");_dn={name:"plaintext",read(){let{storagePath:e}=gdn();try{let t=jt().readFileSync(e,{encoding:"utf8"});return qt(t)}catch{return null}},async readAsync(){let{storagePath:e}=gdn();try{let t=await jt().readFile(e,{encoding:"utf8"});return qt(t)}catch{return null}},mutate(e){return hNe(_dn,e)},async update(e){try{let{storageDir:t,storagePath:n}=gdn();return await jt().mkdir(t),await Rh(n,Le(e),384),await M9s.chmod(n,384),{success:!0,warning:"Warning: Storing credentials in plaintext."}}catch{return{success:!1}}},async delete(){let{storagePath:e}=gdn();try{return await jt().unlink(e),!0}catch(t){if(dn(t)==="ENOENT")return!0;return!1}}}});
export {gdn,M9s,N9s,_dn,B9s};
