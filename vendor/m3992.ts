// @ts-nocheck
import {HE,JW} from "./m3976.ts";
import {l_,dU} from "./m3932.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function YUn(e){let t=bNa.c(5),{addMargin:n,planContent:r}=e,o=n?1:0,s;if(t[0]!==r)s=dqe.createElement(HE,{color:"planMode",title:"Plan to implement"},dqe.createElement(l_,null,r)),t[0]=r,t[1]=s;else s=t[1];let i;if(t[2]!==o||t[3]!==s)i=dqe.createElement(Box,{marginTop:o},s),t[2]=o,t[3]=s,t[4]=i;else i=t[4];return i}
var bNa,dqe;
var Rao=b(()=>{ze();JW();dU();bNa=M(rt(),1),dqe=M(Te(),1)});
export {YUn,bNa,dqe,Rao};
