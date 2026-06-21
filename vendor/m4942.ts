// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Ab,Rte} from "./m3925.ts";
import {NL,K0,i_} from "./m3824.ts";
import {Xx,dr} from "./m231.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function bVn(e){let t=Mwl.c(17),{agentName:n,currentColor:r,onConfirm:o}=e,s=r===void 0?"automatic":r,i;if(t[0]!==s)i=mft.findIndex((g)=>g===s),t[0]=s,t[1]=i;else i=t[1];let[a,l]=Y9.useState(Math.max(0,i)),c;if(t[2]!==o||t[3]!==a)c=(g)=>{if(g.key==="up")g.preventDefault(),l(dam);else if(g.key==="down")g.preventDefault(),l(uam);else if(g.key==="return"){g.preventDefault();let _=mft[a];o(_==="automatic"?void 0:_)}},t[2]=o,t[3]=a,t[4]=c;else c=t[4];let u=c,d=mft[a],p;if(t[5]!==a)p=mft.map((g,_)=>{let y=_===a;return Y9.default.createElement(Box,{key:g,flexDirection:"row",gap:1},Y9.default.createElement(Text,{color:y?"suggestion":void 0},y?et.pointer:" "),g==="automatic"?Y9.default.createElement(Text,{bold:y},"Automatic color"):Y9.default.createElement(Box,{gap:1},Y9.default.createElement(Ab,{color:NL[g]}," "),Y9.default.createElement(Text,{bold:y},Xx(g))))}),t[5]=a,t[6]=p;else p=t[6];let m;if(t[7]!==p)m=Y9.default.createElement(Box,{flexDirection:"column"},p),t[7]=p,t[8]=m;else m=t[8];let f;if(t[9]===Symbol.for("react.memo_cache_sentinel"))f=Y9.default.createElement(Text,null,"Preview: "),t[9]=f;else f=t[9];let A;if(t[10]!==n||t[11]!==d)A=Y9.default.createElement(Box,{marginTop:1},f,d===void 0||d==="automatic"?Y9.default.createElement(Text,{inverse:!0,bold:!0}," ","@",n," "):Y9.default.createElement(Ab,{color:NL[d],bold:!0,padded:!0},"@",n)),t[10]=n,t[11]=d,t[12]=A;else A=t[12];let h;if(t[13]!==u||t[14]!==m||t[15]!==A)h=Y9.default.createElement(Box,{flexDirection:"column",gap:1,tabIndex:0,autoFocus:!0,onKeyDown:u},m,A),t[13]=u,t[14]=m,t[15]=A,t[16]=h;else h=t[16];return h}
function uam(e){return e<mft.length-1?e+1:0}
function dam(e){return e>0?e-1:mft.length-1}
var Mwl,Y9,mft;
var iwo=b(()=>{Ai();ze();K0();dr();Rte();Mwl=M(rt(),1),Y9=M(Te(),1),mft=["automatic",...i_]});
export {bVn,uam,dam,Mwl,Y9,mft,iwo};
