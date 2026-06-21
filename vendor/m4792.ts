// @ts-nocheck
import {Box} from "./m2422.ts";
import {Bs,rA} from "./m2550.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Eyl(e){let t=byl.c(4),{messages:n}=e;if(n.length===0)return null;let r;if(t[0]!==n)r=n.map(ntm),t[0]=n,t[1]=r;else r=t[1];let o;if(t[2]!==r)o=Dne.createElement(Box,{flexDirection:"column"},r),t[2]=r,t[3]=o;else o=t[3];return o}
function ntm(e){return Dne.createElement(Box,{key:e,flexDirection:"row"},Dne.createElement(Bs,{status:"warning",withSpace:!0}),Dne.createElement(Text,{color:"warning"},e,Dne.createElement(Text,{dimColor:!0}," \xB7 run claude install to repair")))}
var byl,Dne;
var Cyl=b(()=>{ze();rA();byl=M(rt(),1),Dne=M(Te(),1)});
export {Eyl,ntm,byl,Dne,Cyl};
