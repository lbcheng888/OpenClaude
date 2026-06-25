// @ts-nocheck
import {useClock} from "./m2442.ts";
import {wu,$k} from "../src/tui/2575_current.ts";
import {SandboxManager,Uh} from "./m2682.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Z7l(){let e=Q7l.c(7),[t,n]=nyt.useState(0),r=nyt.useRef(null),o=useClock(),s=wu("app:toggleTranscript","Global","ctrl+o"),i,a;if(e[0]!==o)i=()=>{if(!SandboxManager.isSandboxingEnabled())return;let u=SandboxManager.getSandboxViolationStore(),d=u.getTotalCount(),p=u.subscribe(()=>{let m=u.getTotalCount(),f=m-d;if(f>0){if(n(f),d=m,r.current)r.current();r.current=o.setTimeout(()=>n(0),5000)}});return()=>{if(p(),r.current)r.current()}},a=[o],e[0]=o,e[1]=i,e[2]=a;else i=e[1],a=e[2];if(nyt.useEffect(i,a),!SandboxManager.isSandboxingEnabled()||t===0)return null;let l=t===1?"operation":"operations",c;if(e[3]!==s||e[4]!==t||e[5]!==l)c=ier.jsx(Box,{paddingX:0,paddingY:0,children:ier.jsxs(Text,{color:"inactive",wrap:"truncate",children:["\u29C8 Sandbox blocked ",t," ",l," \xB7"," ",s," for details \xB7 /sandbox to disable"]})}),e[3]=s,e[4]=t,e[5]=l,e[6]=c;else c=e[6];return c}
var Q7l,nyt,ier;
var ezl=b(()=>{je();$k();Uh();Q7l=x(tt(),1),nyt=x(et(),1),ier=x(oe(),1)});
export {Z7l,Q7l,nyt,ier,ezl};
