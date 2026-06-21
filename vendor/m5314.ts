// @ts-nocheck
import {useClock} from "./m2432.ts";
import {ju,wk} from "../src/tui/2564_current.ts";
import {SandboxManager,Ag} from "./m2671.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function G4l(){let e=W4l.c(7),[t,n]=FAt.useState(0),r=FAt.useRef(null),o=useClock(),s=ju("app:toggleTranscript","Global","ctrl+o"),i,a;if(e[0]!==o)i=()=>{if(!SandboxManager.isSandboxingEnabled())return;let u=SandboxManager.getSandboxViolationStore(),d=u.getTotalCount(),p=u.subscribe(()=>{let m=u.getTotalCount(),f=m-d;if(f>0){if(n(f),d=m,r.current)r.current();r.current=o.setTimeout(()=>n(0),5000)}});return()=>{if(p(),r.current)r.current()}},a=[o],e[0]=o,e[1]=i,e[2]=a;else i=e[1],a=e[2];if(FAt.useEffect(i,a),!SandboxManager.isSandboxingEnabled()||t===0)return null;let l=t===1?"operation":"operations",c;if(e[3]!==s||e[4]!==t||e[5]!==l)c=nGt.createElement(Box,{paddingX:0,paddingY:0},nGt.createElement(Text,{color:"inactive",wrap:"truncate"},"\u29C8 Sandbox blocked ",t," ",l," \xB7"," ",s," for details \xB7 /sandbox to disable")),e[3]=s,e[4]=t,e[5]=l,e[6]=c;else c=e[6];return c}
var W4l,nGt,FAt;
var V4l=b(()=>{ze();wk();Ag();W4l=M(rt(),1),nGt=M(Te(),1),FAt=M(Te(),1)});
export {G4l,W4l,nGt,FAt,V4l};
