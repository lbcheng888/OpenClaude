// @ts-nocheck
import {ec,Dd} from "./m687.ts";
import {_i,hp} from "../src/session/1460_promise.ts";
import {AHn,cea,eea,ab} from "../src/config/3178_path.ts";
import {Jl,ch} from "./m2727.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function rZl(e){let t=tZl.c(7),{autoConnectIdeFlag:n,ideToInstallExtension:r,setDynamicMcpConfig:o,setShowIdeOnboarding:s,setIDEInstallationState:i}=e,a,l;if(t[0]!==n||t[1]!==r||t[2]!==o||t[3]!==i||t[4]!==s)a=()=>{if(ec())return;if(_i()&&!r)return;let c=function(p){if(!p)return;if(!AHn(Boolean(n||r)))return;o((f)=>{if(f?.ide)return f;return{...f,ide:{type:p.url.startsWith("ws:")?"ws-ide":"sse-ide",url:p.url,ideName:p.name,authToken:p.authToken,ideRunningInWindows:p.ideRunningInWindows,scope:"dynamic"}}})},u=Jl();return cea(c,r,()=>s(!0),(d)=>i(d),u.signal),()=>{u.abort(),eea()}},l=[n,r,o,s,i],t[0]=n,t[1]=r,t[2]=o,t[3]=i,t[4]=s,t[5]=a,t[6]=l;else a=t[5],l=t[6];nZl.useEffect(a,l)}
var tZl,nZl;
var oZl=b(()=>{Dd();ch();hp();ab();tZl=M(rt(),1),nZl=M(Te(),1)});
export {rZl,tZl,nZl,oZl};
