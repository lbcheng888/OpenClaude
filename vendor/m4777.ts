// @ts-nocheck
import {O_l,P_l,L_l} from "./m4776.ts";
import {dg,J4} from "./m2570.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function N_l(e){let t=M_l.c(10),{feeds:n,maxWidth:r}=e,o;if(t[0]!==n){let c=n.map(Dem);o=Math.max(...c),t[0]=n,t[1]=o}else o=t[1];let i=Math.min(o,r),a;if(t[2]!==i||t[3]!==n){let c;if(t[5]!==i||t[6]!==n.length)c=(u,d)=>Ine.createElement(Ine.Fragment,{key:d},Ine.createElement(O_l,{config:u,actualWidth:i}),d<n.length-1&&Ine.createElement(dg,{color:"claude",width:i})),t[5]=i,t[6]=n.length,t[7]=c;else c=t[7];a=n.map(c),t[2]=i,t[3]=n,t[4]=a}else a=t[4];let l;if(t[8]!==a)l=Ine.createElement(Box,{flexDirection:"column"},a),t[8]=a,t[9]=l;else l=t[9];return l}
function Dem(e){return P_l(e)}
var M_l,Ine;
var B_l=b(()=>{ze();J4();L_l();M_l=M(rt(),1),Ine=M(Te(),1)});
export {N_l,Dem,M_l,Ine,B_l};
