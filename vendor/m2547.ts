// @ts-nocheck
import {qH,Iwe} from "../src/tui/2545_current.ts";
import {at,rs} from "./m2546.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function lr(e){let t=cIi.c(5),{action:n,context:r,fallback:o,description:s,parens:i,bold:a}=e,l=qH(n,r,o),c;if(t[0]!==a||t[1]!==l||t[2]!==s||t[3]!==i)c=p3r.createElement(at,{chord:l,action:s,parens:i,bold:a}),t[0]=a,t[1]=l,t[2]=s,t[3]=i,t[4]=c;else c=t[4];return c}
var cIi,p3r;
var readRoster=b(()=>{Iwe();rs();cIi=M(rt(),1),p3r=M(Te(),1)});
export {lr,cIi,p3r,readRoster};
