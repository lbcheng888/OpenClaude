// @ts-nocheck
import {Text} from "./m2423.ts";
import {Gn,sc} from "./m2455.ts";
import {Box} from "./m2422.ts";
import {l_,dU} from "./m3932.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function n2n(e){let t=cBa.c(3),{plan:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=Bte.createElement(Text,{color:"subtle"},"User rejected Claude's plan:"),t[0]=r;else r=t[0];let o;if(t[1]!==n)o=Bte.createElement(Gn,null,Bte.createElement(Box,{flexDirection:"column"},r,Bte.createElement(Box,{borderStyle:"round",borderColor:"planMode",paddingX:1,overflow:"hidden"},Bte.createElement(l_,null,n)))),t[1]=n,t[2]=o;else o=t[2];return o}
var cBa,Bte;
var Mao=b(()=>{dU();sc();ze();cBa=M(rt(),1),Bte=M(Te(),1)});
export {n2n,cBa,Bte,Mao};
