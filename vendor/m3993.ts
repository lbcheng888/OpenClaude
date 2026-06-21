// @ts-nocheck
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function wNa(){return CNa.useContext(vNa)}
function RNa(e){let t=ENa.c(10),{isFirst:n,useBriefLayout:r,selectionHighlight:o,children:s}=e,i=r?0:DEp,a=i*2,l;if(t[0]!==n||t[1]!==o||t[2]!==a)l={isQueued:!0,isFirst:n,paddingWidth:a,selectionHighlight:o},t[0]=n,t[1]=o,t[2]=a,t[3]=l;else l=t[3];let c=l,u;if(t[4]!==s||t[5]!==i)u=pqe.createElement(Box,{paddingX:i},s),t[4]=s,t[5]=i,t[6]=u;else u=t[6];let d;if(t[7]!==u||t[8]!==c)d=pqe.createElement(vNa.Provider,{value:c},u),t[7]=u,t[8]=c,t[9]=d;else d=t[9];return d}
var ENa,pqe,CNa,vNa,DEp=2;
var xao=b(()=>{ze();ENa=M(rt(),1),pqe=M(Te(),1),CNa=M(Te(),1),vNa=pqe.createContext(void 0)});
export {wNa,RNa,ENa,pqe,CNa,vNa,DEp,xao};
