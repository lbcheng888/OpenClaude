// @ts-nocheck
import {pl,Wu} from "./m438.ts";
import {Ws,vd} from "../src/session/1465_promise.ts";
import {Xst,laa,iDn,uS} from "../src/config/3192_path.ts";
import {kl,lh} from "./m2739.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function Vac(e){let t=Wac.c(7),{autoConnectIdeFlag:n,ideToInstallExtension:r,setDynamicMcpConfig:o,setShowIdeOnboarding:s,setIDEInstallationState:i}=e,a,l;if(t[0]!==n||t[1]!==r||t[2]!==o||t[3]!==i||t[4]!==s)a=()=>{if(pl())return;if(Ws()&&!r)return;let c=function(p){if(!p)return;if(!Xst(Boolean(n||r)))return;o((f)=>{if(f?.ide)return f;return{...f,ide:{type:p.url.startsWith("ws:")?"ws-ide":"sse-ide",url:p.url,ideName:p.name,authToken:p.authToken,ideRunningInWindows:p.ideRunningInWindows,scope:"dynamic"}}})},u=kl();return laa(c,r,()=>s(!0),(d)=>i(d),u.signal),()=>{u.abort(),iDn()}},l=[n,r,o,s,i],t[0]=n,t[1]=r,t[2]=o,t[3]=i,t[4]=s,t[5]=a,t[6]=l;else a=t[5],l=t[6];Gac.useEffect(a,l)}
var Wac,Gac;
var Kac=b(()=>{Wu();lh();vd();uS();Wac=x(tt(),1),Gac=x(et(),1)});
export {Vac,Wac,Gac,Kac};
