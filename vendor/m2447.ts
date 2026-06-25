// @ts-nocheck
import {BaseBox,xZ} from "./m2397.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function NoSelect(e){let t=Axi.c(9),n,r,o;if(t[0]!==e)({children:r,fromLeftEdge:o,...n}=e),t[0]=e,t[1]=n,t[2]=r,t[3]=o;else n=t[1],r=t[2],o=t[3];let s=o?"stretch":void 0,i=o?"from-left-edge":!0,a;if(t[4]!==n||t[5]!==r||t[6]!==s||t[7]!==i)a=Rxi.jsx(BaseBox,{alignSelf:s,...n,noSelect:i,children:r}),t[4]=n,t[5]=r,t[6]=s,t[7]=i,t[8]=a;else a=t[8];return a}
var Axi,Rxi;
var o6r=b(()=>{xZ();Axi=x(tt(),1),Rxi=x(oe(),1)});
export {NoSelect,Axi,Rxi,o6r};
