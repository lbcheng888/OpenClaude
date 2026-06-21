// @ts-nocheck
import {KD,vun} from "./m1444.ts";
import {Box} from "./m2422.ts";
import {nl,v_} from "./m2573.ts";
import {HE,JW} from "./m3976.ts";
import {Text} from "./m2423.ts";
import {Link} from "./m2427.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Gtc(){let e=Wtc.c(10),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=KD.getInstance().getStatus(),e[0]=t;else t=e[0];let[n,r]=sX.useState(t),o,s;if(e[1]===Symbol.for("react.memo_cache_sentinel"))o=()=>KD.getInstance().subscribe(r),s=[],e[1]=o,e[2]=s;else o=e[1],s=e[2];if(sX.useEffect(o,s),!n.isAuthenticating&&!n.error&&n.output.length===0)return null;if(!n.isAuthenticating&&!n.error)return null;let i;if(e[3]!==n.output)i=n.output.length>0&&sX.default.createElement(Box,{flexDirection:"column"},n.output.slice(-5).map(w$m)),e[3]=n.output,e[4]=i;else i=e[4];let a;if(e[5]!==n.error)a=n.error&&sX.default.createElement(nl,{error:n.error}),e[5]=n.error,e[6]=a;else a=e[6];let l;if(e[7]!==i||e[8]!==a)l=sX.default.createElement(Box,{marginY:1},sX.default.createElement(HE,{color:"permission",title:"Cloud authentication"},i,a)),e[7]=i,e[8]=a,e[9]=l;else l=e[9];return l}
function w$m(e,t){let n=e.match(v$m);if(!n)return sX.default.createElement(Text,{key:t,dimColor:!0},e);let r=n[0],o=n.index??0,s=e.slice(0,o),i=e.slice(o+r.length);return sX.default.createElement(Text,{key:t,dimColor:!0},s,sX.default.createElement(Link,{url:r},r),i)}
var Wtc,sX,v$m;
var Vtc=b(()=>{ze();vun();v_();JW();Wtc=M(rt(),1),sX=M(Te(),1),v$m=/https?:\/\/\S+/});
export {Gtc,w$m,Wtc,sX,v$m,Vtc};
