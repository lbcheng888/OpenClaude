// @ts-nocheck
import {Eu,eoo} from "./m3812.ts";
import {Kn,Li} from "./m2572.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {Box} from "./m2422.ts";
import {Uy,zq} from "./m3339.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function React(e){let t=lHa.c(14),{title:n,color:r,children:o,subtitle:s,footerText:i}=e,a=r===void 0?"suggestion":r,{currentStepIndex:l,totalSteps:c,title:u,showStepCounter:d,goBack:p}=Eu(),m=n||u||"Wizard",f=d!==!1?` (${l+1}/${c})`:"",A=`${m}${f}`,h;if(t[0]!==o||t[1]!==a||t[2]!==p||t[3]!==s||t[4]!==A)h=Xle.default.createElement(Kn,{title:A,subtitle:s,onCancel:p,color:a,hideInputGuide:!0,isCancelActive:!1},o),t[0]=o,t[1]=a,t[2]=p,t[3]=s,t[4]=A,t[5]=h;else h=t[5];let g;if(t[6]!==l||t[7]!==i)g=i??Xle.default.createElement(Tn,null,Xle.default.createElement(at,{chord:["up","down"],action:"navigate"}),Xle.default.createElement(at,{chord:"enter",action:"select"}),Xle.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:l>0?"go back":"cancel"})),t[6]=l,t[7]=i,t[8]=g;else g=t[8];let _;if(t[9]!==g)_=Xle.default.createElement(Box,{marginLeft:2,marginTop:1},Xle.default.createElement(Uy,null,g)),t[9]=g,t[10]=_;else _=t[10];let y;if(t[11]!==h||t[12]!==_)y=Xle.default.createElement(Xle.default.Fragment,null,h,_),t[11]=h,t[12]=_,t[13]=y;else y=t[13];return y}
var lHa,Xle;
var CE=b(()=>{ze();readRoster();zs();Li();zq();rs();eoo();lHa=M(rt(),1),Xle=M(Te(),1)});
export {React,lHa,Xle,CE};
