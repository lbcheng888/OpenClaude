// @ts-nocheck
import {Text,cwe} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Ab(e){let t=jLa.c(7),{children:n,color:r,textColor:o,padded:s,bold:i,wrap:a}=e,l=s?" ":"",c=o??(r?"inverseText":void 0),u;if(t[0]!==i||t[1]!==n||t[2]!==r||t[3]!==l||t[4]!==c||t[5]!==a)u=bio.createElement(Text,{backgroundColor:r,color:c,bold:i,wrap:a},l,n,l),t[0]=i,t[1]=n,t[2]=r,t[3]=l,t[4]=c,t[5]=a,t[6]=u;else u=t[6];return u}
var jLa,bio;
var Rte=b(()=>{cwe();jLa=M(rt(),1),bio=M(Te(),1)});
export {Ab,jLa,bio,Rte};
