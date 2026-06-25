// @ts-nocheck
import {ft,b,x,oo} from "../runtime.ts";
import {q0,lZ} from "./m2270.ts";
import {$W,gIe} from "./m3317.ts";
import {dLn,hno} from "./m3366.ts";
import {Si,ud} from "./m134.ts";
import {setMcpClientsAccessor,lt} from "../src/session/0132_sent.ts";
import {pLn,mLn} from "../src/telemetry/3368_source.ts";
import {hLn,gLn,yno} from "./m3369.ts";
import {Aat,uLn} from "./m3365.ts";
import {R_a,fno} from "./m3364.ts";
import {jtt,uo} from "./m2468.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
import {The,Vxi} from "./m2467.ts";
var O_a={};
ft(O_a,{AppStateProvider:()=>AppStateProvider});
function AppStateProvider(e){let t=D_a.c(23),{children:n,initialState:r,onChangeAppState:o}=e;if($ee.useContext(x_a))throw Error("AppStateProvider can not be nested within another AppStateProvider");let i;if(t[0]!==r||t[1]!==o)i=()=>q0(r??$W(),o),t[0]=r,t[1]=o,t[2]=i;else i=t[2];let[a]=$ee.useState(i),l,c;if(t[3]!==a)l=()=>{let S=()=>dLn(a.getState().tasks),E=Si(S);return()=>{S(),E()}},c=[a],t[3]=a,t[4]=l,t[5]=c;else l=t[4],c=t[5];$ee.useEffect(l,c);let u,d;if(t[6]!==a)u=()=>(setMcpClientsAccessor(()=>a.getState().mcp.clients),ctp),d=[a],t[6]=a,t[7]=u,t[8]=d;else u=t[7],d=t[8];$ee.useEffect(u,d);let p;if(t[9]!==a.setState)p=()=>pLn(a.setState),t[9]=a.setState,t[10]=p;else p=t[10];let m;if(t[11]!==a)m=[a],t[11]=a,t[12]=m;else m=t[12];$ee.useEffect(p,m);let f;if(t[13]!==a.setState)f=(S)=>hLn(S,a.setState),t[13]=a.setState,t[14]=f;else f=t[14];let h=$ee.useEffectEvent(f);Aat(h);let g;if(t[15]!==h)g=()=>{gLn(()=>h("policySettings"))},t[15]=h,t[16]=g;else g=t[16];let _;if(t[17]===Symbol.for("react.memo_cache_sentinel"))_=[],t[17]=_;else _=t[17];$ee.useEffect(g,_);let T;if(t[18]!==n)T=nUt.jsx(R_a,{children:nUt.jsx(ltp,{children:n})}),t[18]=n,t[19]=T;else T=t[19];let y;if(t[20]!==a||t[21]!==T)y=nUt.jsx(x_a.Provider,{value:!0,children:nUt.jsx(jtt.Provider,{value:a,children:T})}),t[20]=a,t[21]=T,t[22]=y;else y=t[22];return y}
function ctp(){return setMcpClientsAccessor(void 0)}
var D_a,P_a,$ee,nUt,ltp,x_a;
var pq=b(()=>{lt();fno();uLn();hno();ud();mLn();yno();uo();lZ();gIe();D_a=x(tt(),1),P_a=x(et(),1),$ee=x(et(),1),nUt=x(oe(),1),ltp=(The(),oo(Vxi)).VoiceProvider,x_a=P_a.createContext(!1)});
export {O_a,AppStateProvider,ctp,D_a,P_a,$ee,nUt,ltp,x_a,pq};
