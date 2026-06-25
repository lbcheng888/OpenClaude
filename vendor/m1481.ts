// @ts-nocheck
import {wM,Woe,ZP,G5,aC,tpn,d7} from "./m1296.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {qt,tn,TeamDeleteToolName} from "../src/config/0230_encoding.ts";
import {Fme,$mn} from "./m1465.ts";
import {Kb,zN} from "./m688.ts";
import {b} from "../runtime.ts";
import {qe,logForDebugging} from "../src/config/0236_setHasFormattedOutput.ts";
import {bTr,execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING} from "./m689.ts";
import {eHt,pFe} from "./m1479.ts";
async function H8s(){try{let e=wM(Woe),t=ZP(),{stdout:n,code:r}=await execFileNoThrow("security",["find-generic-password","-a",t,"-w","-s",e],{useCwd:!1,preserveOutputOnError:!1,timeout:HXe});if(r===0&&n)return qt(n.trim());if(r===0||r===y3u||r===T3u)return null;return Fme}catch(e){return null}}
function I8s(){if(Qmn!==void 0)return Qmn;return Qmn=Kb("security",["show-keychain-info"],{reject:!1,stdio:["ignore","pipe","pipe"],timeout:HXe}).then((e)=>e.exitCode===36).catch(()=>!1),Qmn}
var HXe=2000,_3u=4032,y3u=44,T3u=36,jxr,Qmn;
var Yxr=b(()=>{qe();Ii();bTr();zN();tn();G5();$mn();eHt();jxr={name:"keychain",read(){let e=aC.cache;if(Date.now()-e.cachedAt<tpn)return e.data;try{let t=wM(Woe),n=ZP(),r=execSyncWithDefaults_BLOCKS_EVENT_LOOP_WILL_FREEZE_UI_MAKE_SURE_YOU_KNOW_WHAT_YOU_ARE_DOING(`security find-generic-password -a "${n}" -w -s "${t}"`,{timeout:HXe});if(r){let o=qt(r);return aC.cache={data:o,cachedAt:Date.now()},o}}catch(t){}if(e.data!==null)return logForDebugging("[keychain] read failed; serving stale cache",{level:"warn"}),aC.cache={data:e.data,cachedAt:Date.now()},e.data;return aC.cache={data:null,cachedAt:Date.now()},null},async readAsync(){let e=aC.cache;if(Date.now()-e.cachedAt<tpn)return e.data;if(aC.readInFlight)return aC.readInFlight;let t=aC.generation,n=H8s().then((r)=>{let o=r===Fme?null:r;if(t===aC.generation){if(o===null&&e.data!==null)logForDebugging("[keychain] readAsync failed; serving stale cache",{level:"warn"});let s=o??e.data;return aC.cache={data:s,cachedAt:Date.now()},aC.readInFlight=null,s}return o});return aC.readInFlight=n,n},async readAsyncStrict(){let e=aC.generation,t=await H8s();if(t!==Fme&&e===aC.generation)aC.cache={data:t,cachedAt:Date.now()};return t},invalidateCache(){d7()},mutate(e){return pFe(jxr,e)},async update(e){d7();try{let t=wM(Woe),n=ZP(),r=TeamDeleteToolName(e),o=Buffer.from(r,"utf-8").toString("hex"),s=`add-generic-password -U -a "${n}" -s "${t}" -X "${o}"
`,i;if(s.length<=_3u)i=await Kb("security",["-i"],{input:s,stdio:["pipe","pipe","pipe"],reject:!1,timeout:HXe});else logForDebugging(`Keychain payload (${r.length}B JSON) exceeds security -i stdin limit; using argv`,{level:"warn"}),i=await Kb("security",["add-generic-password","-U","-a",n,"-s",t,"-X",o],{stdio:["ignore","pipe","pipe"],reject:!1,timeout:HXe});if(i.exitCode!==0)return{success:!1,transient:i.timedOut};return aC.cache={data:e,cachedAt:Date.now()},{success:!0}}catch(t){return{success:!1}}},async delete(){d7();try{let e=wM(Woe),t=ZP();return await execFileNoThrow("security",["delete-generic-password","-a",t,"-s",e],{timeout:HXe,useCwd:!1}),!0}catch(e){return!1}}}});
export {H8s,I8s,HXe,_3u,y3u,T3u,jxr,Qmn,Yxr};
