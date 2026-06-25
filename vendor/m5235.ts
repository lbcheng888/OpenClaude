// @ts-nocheck
import {qt,tn} from "../src/config/0230_encoding.ts";
import {Jte,oft} from "./m4411.ts";
import {Vb,VT} from "./m648.ts";
import {setOriginalCwd,setProjectRoot,setCwdState,switchSession,resetStartTime,resetFdCredentialState,lt} from "../src/session/0132_sent.ts";
import {C_,lk} from "./m125.ts";
import {getProjectPathForConfig,resetTrustDialogAcceptedCache,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {FT,xS} from "./m122.ts";
import {rFa,W$} from "../src/config/3882_entrypoint.ts";
import {resetDebugCaches,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {resetEnvDerivedAuthCaches,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {Vdn,JJe} from "./m1293.ts";
import {rUt,oUt} from "../src/config/3374_key.ts";
import {b} from "../runtime.ts";
function KQn(e,t,n){return new Promise((r,o)=>{let s=(a)=>{i.close(),o(a)},i=X5l.createServer((a)=>{let l="";a.setEncoding("utf8"),a.on("data",(c)=>{if(l+=c,n&&l.length>8388608){a.destroy();return}let u=l.indexOf(`
`);if(u<0)return;if(n){let d;try{d=qt(l.slice(0,u))}catch{d=void 0}if(!d||!Jte(d.auth,n)){a.destroy();return}i.close(),r(d);return}i.close();try{r(qt(l.slice(0,u)))}catch(d){o(d)}}),a.on("error",n?()=>a.destroy():s)});if(i.on("error",s),t)i.once("listening",()=>{try{t()}catch(a){s(a)}});i.listen(e)})}
async function zQn(e,t){let n=await Vb(e.cwd);if(process.chdir(n),setOriginalCwd(n),setProjectRoot(n),setCwdState(n),C_(),getProjectPathForConfig.cache?.clear?.(),resetTrustDialogAcceptedCache(),e.sessionId)switchSession(FT(e.sessionId),"spare_claim");resetStartTime(),rFa(),Object.assign(process.env,e.env),process.argv=[process.argv[0],process.argv[1],...e.argv],resetDebugCaches(),resetFdCredentialState(),resetEnvDerivedAuthCaches(),Vdn(),rUt();let{main:r}=await t;await r()}
var X5l;
var XMo=b(()=>{lt();oft();oUt();JJe();xS();lo();tr();qe();VT();lk();tn();W$();X5l=require("net")});
export {KQn,zQn,X5l,XMo};
