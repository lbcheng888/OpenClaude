// @ts-nocheck
import {pl,Wu} from "./m438.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {Z0,dS} from "../src/config/4460_source.ts";
import {Text} from "./m2433.ts";
import {bs,ff} from "./m2561.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Lnr(){let e=auc.c(6),[t,n]=Onr.useState(null),r=Onr.useRef(!1),o;if(e[0]!==t)o=(c)=>{if(pl())return;if(t)return;if(r.current)return;r.current=!0,c().then((u)=>{if(u)n(u)}).catch(Ie).finally(()=>{r.current=!1})},e[0]=t,e[1]=o;else o=e[1];let s=o,i;if(e[2]===Symbol.for("react.memo_cache_sentinel"))i=()=>n(null),e[2]=i;else i=e[2];let a=i,l;if(e[3]!==t||e[4]!==s)l={recommendation:t,clearRecommendation:a,tryResolve:s},e[3]=t,e[4]=s,e[5]=l;else l=e[5];return l}
async function Mnr(e,t,n,r,o){try{let s=await Z0(e);if(!s)throw Error(`Plugin ${e} not found in marketplace`);await o(s),r({key:`${n}-installed`,kind:"feedback",jsx:Ozt.jsxs(Text,{color:"success",children:[Ozt.jsx(bs,{status:"success",withSpace:!0}),t," installed \xB7 restart to apply"]}),priority:"immediate",timeoutMs:5000}),He("plugin_recommendation_install")}catch(s){logForDebugging(`Failed to install plugin ${e}: ${s instanceof Error?s.message:String(s)}`,{level:"error"}),r({key:`${n}-install-failed`,jsx:Ozt.jsxs(Text,{color:"error",children:["Failed to install ",t]}),priority:"immediate",timeoutMs:5000}),xe("plugin_recommendation_install","install_failed")}}
var auc,Onr,Ozt;
var b2o=b(()=>{ff();je();Wu();mn();qe();vn();dS();auc=x(tt(),1),Onr=x(et(),1),Ozt=x(oe(),1)});
export {Lnr,Mnr,auc,Onr,Ozt,b2o};
