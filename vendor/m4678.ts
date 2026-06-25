// @ts-nocheck
import {HSl,ISl} from "../src/tui/4678_plugins.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function h7n(){return Uvo}
function DSl(){return $vo}
function hht(){let e=aWe.useContext(Bvo);if(!e)throw Error("useMcpReconnect must be used within MCPConnectionManager");return e.reconnectMcpServer}
function SPe(){let e=aWe.useContext(Bvo);if(!e)throw Error("useMcpToggleEnabled must be used within MCPConnectionManager");return e.toggleMcpServer}
function hWt(e){let t=xSl.c(12),{children:n,dynamicMcpConfig:r,isStrictMcpConfig:o}=e,{reconnectMcpServer:s,toggleMcpServer:i}=HSl(r,o),a;if(t[0]!==i)a=async(m)=>{await i(m)},t[0]=i,t[1]=a;else a=t[1];let l;if(t[2]!==s||t[3]!==a)l={reconnectMcpServer:s,toggleMcpServer:a},t[2]=s,t[3]=a,t[4]=l;else l=t[4];let c=l,u,d;if(t[5]!==s||t[6]!==i)u=()=>(Uvo=s,$vo=i,Frm),d=[s,i],t[5]=s,t[6]=i,t[7]=u,t[8]=d;else u=t[7],d=t[8];aWe.useEffect(u,d);let p;if(t[9]!==n||t[10]!==c)p=PSl.jsx(Bvo.Provider,{value:c,children:n}),t[9]=n,t[10]=c,t[11]=p;else p=t[11];return p}
function Frm(){Uvo=null,$vo=null}
var xSl,aWe,PSl,Bvo,Uvo=null,$vo=null;
var Sue=b(()=>{ISl();xSl=x(tt(),1),aWe=x(et(),1),PSl=x(oe(),1),Bvo=aWe.createContext(null)});
export {h7n,DSl,hht,SPe,hWt,Frm,xSl,aWe,PSl,Bvo,Uvo,$vo,Sue};
