// @ts-nocheck
import {_g,zR} from "./m2562.ts";
import {_t,bo,uo} from "./m2468.ts";
import {Ci,fd} from "./m2469.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {getBranch,ia} from "./m698.ts";
import {x,b} from "../runtime.ts";
import {Kht} from "./m4785.ts";
import {Oo,ss} from "./m2553.ts";
import {tw,mg} from "./m2209.ts";
import {Dq,h2n,Qct,jMa,_2n,g2n,ate} from "./m3839.ts";
import {$on,Uon,Pa} from "./m720.ts";
import {preInitQueue,di} from "./m2583.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Ba,I_} from "./m2584.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function sjl({onDone:e}){_g("bridge-dialog");let t=_t((P)=>P.replBridgeConnected),n=_t((P)=>P.replBridgeSessionActive),r=_t((P)=>P.replBridgeReconnecting),o=_t((P)=>P.replBridgeConnectUrl),s=_t((P)=>P.replBridgeSessionUrl),i=_t((P)=>P.replBridgeError),a=_t((P)=>P.replBridgeExplicit),l=_t((P)=>P.replBridgeEnabled),c=_t((P)=>P.replBridgeEnvironmentId),u=_t((P)=>P.replBridgeSessionId),d=_t((P)=>P.verbose),p=bo(),{removeNotification:m}=Ci(),[f,h]=KGe.useState(!1),[g,_]=KGe.useState(""),[T,y]=KGe.useState(""),S=ojl.basename(getOriginalCwd());KGe.useEffect(()=>{getBranch().then(y).catch(()=>{})},[]);let E=n?s:o;KGe.useEffect(()=>{if(!f||!E){_("");return}Promise.resolve().then(() => x(Kht(),1)).then(({toString:P})=>P(E,{type:"utf8",errorCorrectionLevel:"L",small:!0})).then(_).catch(()=>_(""))},[f,E]),Oo({"confirm:yes":e,"confirm:toggle":()=>{h((P)=>!P)}},{context:"Confirmation"});function R(P){if(P.key==="d"&&!P.ctrl&&!P.meta){if(P.preventDefault(),a&&l)tw("remoteControlAtStartup",!1);m(Dq),p((M)=>{if(!M.replBridgeEnabled&&M.replBridgeError===void 0)return M;return{...M,replBridgeEnabled:!1,replBridgeError:void 0}}),e()}}let{label:w,color:H}=h2n({error:i,connected:t,sessionActive:n,reconnecting:r}),k=i?$on:Uon,I=g?g.split(`
`).filter((P)=>P.length>0):[],D=[];if(S)D.push(S);if(T)D.push(T);let O=D.length>0?" \xB7 "+D.join(" \xB7 "):"",L=i===Qct?void 0:i?jMa:E?n?_2n(E):g2n(E):void 0;return gP.jsx(preInitQueue,{title:"Remote Control",onCancel:e,hideInputGuide:!0,children:gP.jsxs(Box,{flexDirection:"column",gap:1,tabIndex:0,autoFocus:!0,onKeyDown:R,children:[gP.jsxs(Box,{flexDirection:"column",children:[gP.jsxs(Text,{children:[gP.jsxs(Text,{color:H,children:[k," ",w]}),gP.jsx(Text,{dimColor:!0,children:O})]}),gP.jsx(Ba,{error:i}),d&&c&&gP.jsxs(Text,{dimColor:!0,children:["Environment: ",c]}),d&&u&&gP.jsxs(Text,{dimColor:!0,children:["Session: ",u]})]}),f&&I.length>0&&gP.jsx(Box,{flexDirection:"column",children:I.map((P,M)=>gP.jsx(Text,{children:P},M))}),L&&gP.jsx(Text,{dimColor:!0,children:L}),gP.jsx(Text,{dimColor:!0,children:gP.jsxs(bn,{children:[gP.jsx(at,{chord:"d",action:i!==void 0&&!l?"dismiss":"disconnect"}),Boolean(E)&&gP.jsx(Text,{children:"space for QR code"}),gP.jsx(at,{chord:["enter","escape"],action:"close"})]})})]})})}
var ojl,KGe,gP;
var ijl=b(()=>{lt();ate();Pa();fd();zR();je();ss();uo();ia();mg();Is();di();I_();Wo();ojl=require("path"),KGe=x(et(),1),gP=x(oe(),1)});
export {sjl,ojl,KGe,gP,ijl};
