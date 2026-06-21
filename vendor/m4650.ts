// @ts-nocheck
import {qpl,jpl} from "../src/tui/4650_plugins.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function O5n(){return wSo}
function Gpl(){return RSo}
function lmt(){let e=oye.useContext(vSo);if(!e)throw Error("useMcpReconnect must be used within MCPConnectionManager");return e.reconnectMcpServer}
function bDe(){let e=oye.useContext(vSo);if(!e)throw Error("useMcpToggleEnabled must be used within MCPConnectionManager");return e.toggleMcpServer}
function K6t(e){let t=Wpl.c(12),{children:n,dynamicMcpConfig:r,isStrictMcpConfig:o}=e,{reconnectMcpServer:s,toggleMcpServer:i}=qpl(r,o),a;if(t[0]!==i)a=async(m)=>{await i(m)},t[0]=i,t[1]=a;else a=t[1];let l;if(t[2]!==s||t[3]!==a)l={reconnectMcpServer:s,toggleMcpServer:a},t[2]=s,t[3]=a,t[4]=l;else l=t[4];let c=l,u,d;if(t[5]!==s||t[6]!==i)u=()=>(wSo=s,RSo=i,Mzp),d=[s,i],t[5]=s,t[6]=i,t[7]=u,t[8]=d;else u=t[7],d=t[8];oye.useEffect(u,d);let p;if(t[9]!==n||t[10]!==c)p=oye.default.createElement(vSo.Provider,{value:c},n),t[9]=n,t[10]=c,t[11]=p;else p=t[11];return p}
function Mzp(){wSo=null,RSo=null}
var Wpl,oye,vSo,wSo=null,RSo=null;
var Sue=b(()=>{jpl();Wpl=M(rt(),1),oye=M(Te(),1),vSo=oye.createContext(null)});
export {O5n,Gpl,lmt,bDe,K6t,Mzp,Wpl,oye,vSo,wSo,RSo,Sue};
