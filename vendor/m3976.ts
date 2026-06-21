// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2434.ts";
import {Text,cwe} from "./m2423.ts";
import {Box,BSn} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function HE(e){let t=U1a.c(10),{children:n,color:r,title:o}=e,s=useIsScreenReaderEnabled(),i=s?void 0:"round",a=s?0:1,l=o?1:0,c;if(t[0]!==r||t[1]!==o)c=o&&dao.default.createElement(Text,{bold:!0,color:r},o),t[0]=r,t[1]=o,t[2]=c;else c=t[2];let u;if(t[3]!==n||t[4]!==r||t[5]!==i||t[6]!==a||t[7]!==l||t[8]!==c)u=dao.default.createElement(Box,{borderStyle:i,borderColor:r,flexDirection:"column",paddingX:a,gap:l},c,n),t[3]=n,t[4]=r,t[5]=i,t[6]=a,t[7]=l,t[8]=c,t[9]=u;else u=t[9];return u}
var U1a,dao;
var JW=b(()=>{ze();BSn();cwe();U1a=M(rt(),1),dao=M(Te(),1)});
export {HE,U1a,dao,JW};
