// @ts-nocheck
import {isFullscreenWithTTY,b,M,ro} from "../runtime.ts";
import {C0} from "./m2262.ts";
import {getDefaultAppState,kke} from "./m3301.ts";
import {_Dn,PXr} from "./m3350.ts";
import {Gi,ReactHooks} from "./m133.ts";
import {setMcpClientsAccessor,lt} from "../src/session/0131_sent.ts";
import {yDn,TDn} from "../src/telemetry/3352_source.ts";
import {bDn,EDn,MXr} from "./m3353.ts";
import {wst,gDn} from "./m3349.ts";
import {pua,DXr} from "./m3348.ts";
import {VZe,configProtoStore} from "./m2458.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
import {iAe,wwi} from "./m2457.ts";
var yua={};
isFullscreenWithTTY(yua,{AppStateProvider:()=>AppStateProvider});
function AppStateProvider(e){let t=_ua.c(23),{children:n,initialState:r,onChangeAppState:o}=e;if(gN.useContext(gua))throw Error("AppStateProvider can not be nested within another AppStateProvider");let i;if(t[0]!==r||t[1]!==o)i=()=>C0(r??getDefaultAppState(),o),t[0]=r,t[1]=o,t[2]=i;else i=t[2];let[a]=gN.useState(i),l,c;if(t[3]!==a)l=()=>{let T=()=>_Dn(a.getState().tasks),S=Gi(T);return()=>{T(),S()}},c=[a],t[3]=a,t[4]=l,t[5]=c;else l=t[4],c=t[5];gN.useEffect(l,c);let u,d;if(t[6]!==a)u=()=>(setMcpClientsAccessor(()=>a.getState().mcp.clients),bGd),d=[a],t[6]=a,t[7]=u,t[8]=d;else u=t[7],d=t[8];gN.useEffect(u,d);let p;if(t[9]!==a.setState)p=()=>yDn(a.setState),t[9]=a.setState,t[10]=p;else p=t[10];let m;if(t[11]!==a)m=[a],t[11]=a,t[12]=m;else m=t[12];gN.useEffect(p,m);let f;if(t[13]!==a.setState)f=(T)=>bDn(T,a.setState),t[13]=a.setState,t[14]=f;else f=t[14];let A=gN.useEffectEvent(f);wst(A);let h;if(t[15]!==A)h=()=>{EDn(()=>A("policySettings"))},t[15]=A,t[16]=h;else h=t[16];let g;if(t[17]===Symbol.for("react.memo_cache_sentinel"))g=[],t[17]=g;else g=t[17];gN.useEffect(h,g);let _;if(t[18]!==n)_=gN.default.createElement(pua,null,gN.default.createElement(SGd,null,n)),t[18]=n,t[19]=_;else _=t[19];let y;if(t[20]!==a||t[21]!==_)y=gN.default.createElement(gua.Provider,{value:!0},gN.default.createElement(VZe.Provider,{value:a},_)),t[20]=a,t[21]=_,t[22]=y;else y=t[22];return y}
function bGd(){return setMcpClientsAccessor(void 0)}
var _ua,gN,SGd,gua;
var Jq=b(()=>{lt();DXr();gDn();PXr();ReactHooks();TDn();MXr();configProtoStore();kke();_ua=M(rt(),1),gN=M(Te(),1),SGd=(iAe(),ro(wwi)).VoiceProvider,gua=gN.default.createContext(!1)});
export {yua,AppStateProvider,bGd,_ua,gN,SGd,gua,Jq};
