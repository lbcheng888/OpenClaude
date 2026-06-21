// @ts-nocheck
import {xA,jH} from "./m2566.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Uy(e){let t=Jca.c(2),{children:n}=e,{pending:r,keyName:o}=xA(),s=r?`Press ${o} again to exit`:n,i;if(t[0]!==s)i=vXr.createElement(Text,{dimColor:!0},s),t[0]=s,t[1]=i;else i=t[1];return i}
var Jca,vXr;
var zq=b(()=>{jH();ze();Jca=M(rt(),1),vXr=M(Te(),1)});
export {Uy,Jca,vXr,zq};
