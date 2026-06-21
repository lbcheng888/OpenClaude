// @ts-nocheck
import {getOauthConfig,Dc} from "../api/0459_getOauthConfig.ts";
import {fo} from "../../vendor/m566.ts";
import {getUserAgent,fk} from "../api/2032_withOAuth401Retry.ts";
import {exe,txe} from "../../vendor/m2739.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {De,Rn} from "../session/0615_length.ts";
import {useTimeout,f0t} from "../../vendor/m2450.ts";
import {Box} from "../../vendor/m2422.ts";
import {tp,_x} from "../tui/3835_mode.ts";
import {Text} from "../../vendor/m2423.ts";
import {setBgExitCause,qV} from "../../vendor/m229.ts";
import {b,M} from "../../runtime.ts";
import {Gp} from "../../vendor/m567.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
async function L9m(){try{let e=getOauthConfig(),t=new URL(e.TOKEN_URL),n=[`${e.BASE_API_URL}/api/hello`,`${t.origin}/v1/oauth/hello`],r=async(i)=>{try{let a=await fo.get(i,{headers:{"User-Agent":getUserAgent()}});if(a.status!==200)return{success:!1,error:`Failed to connect to ${new URL(i).hostname}: Status ${a.status}`};return{success:!0}}catch(a){let l=new URL(i).hostname,c=exe(a);return{success:!1,error:`Failed to connect to ${l}: ${a instanceof Error?a.code||a.message:String(a)}`,sslHint:c??void 0}}},s=(await Promise.all(n.map(r))).find((i)=>!i.success);if(s)logEvent("tengu_preflight_check_failed",{isConnectivityError:!1,hasErrorMessage:!!s.error,isSSLError:!!s.sslHint});return s||{success:!0}}catch(e){return De(e),logEvent("tengu_preflight_check_failed",{isConnectivityError:!0}),{success:!1,error:`Connectivity check error: ${e instanceof Error?e.code||e.message:String(e)}`}}}
function $rc(e){let t=Urc.c(14),{onSuccess:n}=e,[r,o]=xI.useState(null),[s,i]=xI.useState(!0),a=useTimeout(1000)&&s,l,c;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=()=>{(async function(){let h=await L9m();o(h),i(!1)})()},c=[],t[0]=l,t[1]=c;else l=t[0],c=t[1];xI.useEffect(l,c);let u;if(t[2]!==n||t[3]!==r?.success)u=()=>{if(r?.success)n()},t[2]=n,t[3]=r?.success,t[4]=u;else u=t[4];let d;if(t[5]!==n||t[6]!==r)d=[r,n],t[5]=n,t[6]=r,t[7]=d;else d=t[7];xI.useEffect(u,d),useTimeout(M9m,r&&!r.success?100:null);let p;if(t[8]!==s||t[9]!==r||t[10]!==a)p=s&&a?xI.default.createElement(Box,{paddingLeft:1},xI.default.createElement(tp,null),xI.default.createElement(Text,null,"Checking connectivity...")):!r?.success&&!s&&xI.default.createElement(Box,{flexDirection:"column",gap:1},xI.default.createElement(Text,{color:"error"},"Unable to connect to Anthropic services"),xI.default.createElement(Text,{color:"error"},r?.error),r?.sslHint?xI.default.createElement(Box,{flexDirection:"column",gap:1},xI.default.createElement(Text,null,r.sslHint),xI.default.createElement(Text,{color:"suggestion"},"See https://code.claude.com/docs/en/network-config")):xI.default.createElement(Box,{flexDirection:"column",gap:1},xI.default.createElement(Text,null,"Please check your internet connection and network settings."),xI.default.createElement(Text,null,"Note: Claude Code might not be available in your country. Check supported countries at"," ",xI.default.createElement(Text,{color:"suggestion"},"https://anthropic.com/supported-countries")))),t[8]=s,t[9]=r,t[10]=a,t[11]=p;else p=t[11];let m;if(t[12]!==p)m=xI.default.createElement(Box,{flexDirection:"column",gap:1,paddingLeft:1},p),t[12]=p,t[13]=m;else m=t[13];return m}
function M9m(){setBgExitCause("preflight_endpoint"),process.exit(1)}
var Urc,xI;
var qrc=b(()=>{Gp();Ct();_x();Dc();qV();f0t();ze();txe();fk();Rn();Urc=M(rt(),1),xI=M(Te(),1)});
export {L9m,$rc,M9m,Urc,xI,qrc};
