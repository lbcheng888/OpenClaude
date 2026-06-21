// @ts-nocheck
import {ug,ZR} from "./m2551.ts";
import {mt,bo,configProtoStore} from "./m2458.ts";
import {Ui,Ld} from "./m2459.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {getBranch,Ba} from "./m693.ts";
import {M,b} from "../runtime.ts";
import {Omt} from "./m4753.ts";
import {Wo,Ts} from "./m2542.ts";
import {KR,Ug} from "./m2264.ts";
import {g6,SBn,Qat,CHa,EBn,bBn,mte} from "./m3821.ts";
import {inn,snn,sl} from "./m715.ts";
import {Kn,Li} from "./m2572.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {nl,v_} from "./m2573.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Yql({onDone:e}){ug("bridge-dialog");let t=mt((D)=>D.replBridgeConnected),n=mt((D)=>D.replBridgeSessionActive),r=mt((D)=>D.replBridgeReconnecting),o=mt((D)=>D.replBridgeConnectUrl),s=mt((D)=>D.replBridgeSessionUrl),i=mt((D)=>D.replBridgeError),a=mt((D)=>D.replBridgeExplicit),l=mt((D)=>D.replBridgeEnabled),c=mt((D)=>D.replBridgeEnvironmentId),u=mt((D)=>D.replBridgeSessionId),d=mt((D)=>D.verbose),p=bo(),{removeNotification:m}=Ui(),[f,A]=t5e.useState(!1),[h,g]=t5e.useState(""),[_,y]=t5e.useState(""),T=zql.basename(getOriginalCwd());t5e.useEffect(()=>{getBranch().then(y).catch(()=>{})},[]);let S=n?s:o;t5e.useEffect(()=>{if(!f||!S){g("");return}Promise.resolve().then(() => M(Omt(),1)).then(({toString:D})=>D(S,{type:"utf8",errorCorrectionLevel:"L",small:!0})).then(g).catch(()=>g(""))},[f,S]),Wo({"confirm:yes":e,"confirm:toggle":()=>{A((D)=>!D)}},{context:"Confirmation"});function v(D){if(D.key==="d"&&!D.ctrl&&!D.meta){if(D.preventDefault(),a&&l)KR("remoteControlAtStartup",!1);m(g6),p((N)=>{if(!N.replBridgeEnabled&&N.replBridgeError===void 0)return N;return{...N,replBridgeEnabled:!1,replBridgeError:void 0}}),e()}}let{label:R,color:k}=SBn({error:i,connected:t,sessionActive:n,reconnecting:r}),x=i?inn:snn,H=h?h.split(`
`).filter((D)=>D.length>0):[],I=[];if(T)I.push(T);if(_)I.push(_);let P=I.length>0?" \xB7 "+I.join(" \xB7 "):"",L=i===Qat?void 0:i?CHa:S?n?EBn(S):bBn(S):void 0;return vg.createElement(Kn,{title:"Remote Control",onCancel:e,hideInputGuide:!0},vg.createElement(Box,{flexDirection:"column",gap:1,tabIndex:0,autoFocus:!0,onKeyDown:v},vg.createElement(Box,{flexDirection:"column"},vg.createElement(Text,null,vg.createElement(Text,{color:k},x," ",R),vg.createElement(Text,{dimColor:!0},P)),vg.createElement(nl,{error:i}),d&&c&&vg.createElement(Text,{dimColor:!0},"Environment: ",c),d&&u&&vg.createElement(Text,{dimColor:!0},"Session: ",u)),f&&H.length>0&&vg.createElement(Box,{flexDirection:"column"},H.map((D,N)=>vg.createElement(Text,{key:N},D))),L&&vg.createElement(Text,{dimColor:!0},L),vg.createElement(Text,{dimColor:!0},vg.createElement(Tn,null,vg.createElement(at,{chord:"d",action:i!==void 0&&!l?"dismiss":"disconnect"}),Boolean(S)&&vg.createElement(Text,null,"space for QR code"),vg.createElement(at,{chord:["enter","escape"],action:"close"})))))}
var zql,vg,t5e;
var Jql=b(()=>{lt();mte();sl();Ld();ZR();ze();Ts();configProtoStore();Ba();Ug();zs();Li();v_();rs();zql=require("path"),vg=M(Te(),1),t5e=M(Te(),1)});
export {Yql,zql,vg,t5e,Jql};
