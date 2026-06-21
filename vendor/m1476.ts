// @ts-nocheck
import {m1,joe,OO,k8,rC,gcn,F7} from "./m1291.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {qt,Xt,Le} from "../src/config/0228_encoding.ts";
import {kme,sdn} from "./m1460.ts";
import {qb,vB} from "./m682.ts";
import {b} from "../runtime.ts";
import {qe,logForDebugging} from "../src/config/0234_setHasFormattedOutput.ts";
import {Vfr,execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING} from "./m683.ts";
import {Rwt,hNe} from "./m1474.ts";
async function O9s(){try{let e=m1(joe),t=OO(),{stdout:n,code:r}=await execFileNoThrow("security",["find-generic-password","-a",t,"-w","-s",e],{useCwd:!1,preserveOutputOnError:!1,timeout:IYe});if(r===0&&n)return qt(n.trim());if(r===0||r===ZOu||r===eLu)return null;return kme}catch(e){return null}}
function L9s(){if(hdn!==void 0)return hdn;return hdn=qb("security",["show-keychain-info"],{reject:!1,stdio:["ignore","pipe","pipe"],timeout:IYe}).then((e)=>e.exitCode===36).catch(()=>!1),hdn}
var IYe=2000,QOu=4032,ZOu=44,eLu=36,_xr,hdn;
var yxr=b(()=>{qe();oa();Vfr();vB();Xt();k8();sdn();Rwt();_xr={name:"keychain",read(){let e=rC.cache;if(Date.now()-e.cachedAt<gcn)return e.data;try{let t=m1(joe),n=OO(),r=execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING(`security find-generic-password -a "${n}" -w -s "${t}"`,{timeout:IYe});if(r){let o=qt(r);return rC.cache={data:o,cachedAt:Date.now()},o}}catch(t){}if(e.data!==null)return logForDebugging("[keychain] read failed; serving stale cache",{level:"warn"}),rC.cache={data:e.data,cachedAt:Date.now()},e.data;return rC.cache={data:null,cachedAt:Date.now()},null},async readAsync(){let e=rC.cache;if(Date.now()-e.cachedAt<gcn)return e.data;if(rC.readInFlight)return rC.readInFlight;let t=rC.generation,n=O9s().then((r)=>{let o=r===kme?null:r;if(t===rC.generation){if(o===null&&e.data!==null)logForDebugging("[keychain] readAsync failed; serving stale cache",{level:"warn"});let s=o??e.data;return rC.cache={data:s,cachedAt:Date.now()},rC.readInFlight=null,s}return o});return rC.readInFlight=n,n},async readAsyncStrict(){let e=rC.generation,t=await O9s();if(t!==kme&&e===rC.generation)rC.cache={data:t,cachedAt:Date.now()};return t},invalidateCache(){F7()},mutate(e){return hNe(_xr,e)},async update(e){F7();try{let t=m1(joe),n=OO(),r=Le(e),o=Buffer.from(r,"utf-8").toString("hex"),s=`add-generic-password -U -a "${n}" -s "${t}" -X "${o}"
`,i;if(s.length<=QOu)i=await qb("security",["-i"],{input:s,stdio:["pipe","pipe","pipe"],reject:!1,timeout:IYe});else logForDebugging(`Keychain payload (${r.length}B JSON) exceeds security -i stdin limit; using argv`,{level:"warn"}),i=await qb("security",["add-generic-password","-U","-a",n,"-s",t,"-X",o],{stdio:["ignore","pipe","pipe"],reject:!1,timeout:IYe});if(i.exitCode!==0)return{success:!1,transient:i.timedOut};return rC.cache={data:e,cachedAt:Date.now()},{success:!0}}catch(t){return{success:!1}}},async delete(){F7();try{let e=m1(joe),t=OO();return await execFileNoThrow("security",["delete-generic-password","-a",t,"-s",e],{timeout:IYe,useCwd:!1}),!0}catch(e){return!1}}}});
export {O9s,L9s,IYe,QOu,ZOu,eLu,_xr,hdn,yxr};
