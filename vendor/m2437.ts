// @ts-nocheck
import {BaseBox,LZ} from "./m2387.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function NoSelect(e){let t=iwi.c(9),n,r,o;if(t[0]!==e)({children:r,fromLeftEdge:o,...n}=e),t[0]=e,t[1]=n,t[2]=r,t[3]=o;else n=t[1],r=t[2],o=t[3];let s=o?"stretch":void 0,i=o?"from-left-edge":!0,a;if(t[4]!==n||t[5]!==r||t[6]!==s||t[7]!==i)a=awi.default.createElement(BaseBox,{alignSelf:s,...n,noSelect:i},r),t[4]=n,t[5]=r,t[6]=s,t[7]=i,t[8]=a;else a=t[8];return a}
var iwi,awi;
var R$r=b(()=>{LZ();iwi=M(rt(),1),awi=M(Te(),1)});
export {NoSelect,iwi,awi,R$r};
