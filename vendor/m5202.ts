// @ts-nocheck
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {one,opt} from "./m4389.ts";
import {$b,QT} from "./m642.ts";
import {setOriginalCwd,setProjectRoot,setCwdState,switchSession,resetStartTime,resetFdCredentialState,lt} from "../src/session/0131_sent.ts";
import {f_,Kx} from "./m128.ts";
import {getProjectPathForConfig,resetTrustDialogAcceptedCache,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {qT,zE} from "./m125.ts";
import {D0a,_9} from "../src/config/3864_entrypoint.ts";
import {resetDebugCaches,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {resetEnvDerivedAuthCaches,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {acn,Zze} from "./m1288.ts";
import {RNt,xNt} from "../src/config/3358_key.ts";
import {b} from "../runtime.ts";
function Yzn(e,t,n){return new Promise((r,o)=>{let s=(a)=>{i.close(),o(a)},i=lUl.createServer((a)=>{let l="";a.setEncoding("utf8"),a.on("data",(c)=>{if(l+=c,n&&l.length>8388608){a.destroy();return}let u=l.indexOf(`
`);if(u<0)return;if(n){let d;try{d=qt(l.slice(0,u))}catch{d=void 0}if(!d||!one(d.auth,n)){a.destroy();return}i.close(),r(d);return}i.close();try{r(qt(l.slice(0,u)))}catch(d){o(d)}}),a.on("error",n?()=>a.destroy():s)});if(i.on("error",s),t)i.once("listening",()=>{try{t()}catch(a){s(a)}});i.listen(e)})}
async function Jzn(e,t){let n=await $b(e.cwd);if(process.chdir(n),setOriginalCwd(n),setProjectRoot(n),setCwdState(n),f_(),getProjectPathForConfig.cache?.clear?.(),resetTrustDialogAcceptedCache(),e.sessionId)switchSession(qT(e.sessionId),"spare_claim");resetStartTime(),D0a(),Object.assign(process.env,e.env),process.argv=[process.argv[0],process.argv[1],...e.argv],resetDebugCaches(),resetFdCredentialState(),resetEnvDerivedAuthCaches(),acn(),RNt();let{main:r}=await t;await r()}
var lUl;
var D0o=b(()=>{lt();opt();xNt();Zze();zE();Ao();Qn();qe();QT();Kx();Xt();_9();lUl=require("net")});
export {Yzn,Jzn,lUl,D0o};
