// @ts-nocheck
import {aaa,ele} from "./m3293.ts";
import {mr,ki} from "./m2453.ts";
import {useInterval} from "./m2446.ts";
import {Box} from "./m2422.ts";
import {aoo,loo} from "../src/tui/3834_toolWindowStart.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function x5l(e){let t=w5l.c(3),{agentId:n}=e,r=aaa(n),{columns:o}=mr(),[,s]=R5l.useReducer(ZDm,0);if(useInterval(s,r?1000:null),r===null)return null;let i;if(t[0]!==o||t[1]!==r)i=EGt.createElement(Box,{flexDirection:"row",marginTop:1,width:"100%"},EGt.createElement(aoo,{status:r,columns:o})),t[0]=o,t[1]=r,t[2]=i;else i=t[2];return i}
function ZDm(e){return e+1}
var w5l,EGt,R5l;
var k5l=b(()=>{loo();ele();ki();ze();w5l=M(rt(),1),EGt=M(Te(),1),R5l=M(Te(),1)});
export {x5l,ZDm,w5l,EGt,R5l,k5l};
