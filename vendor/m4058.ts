// @ts-nocheck
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Q4a(){return J4a.useContext(X4a)}
function Z4a(e){let t=j4a.c(10),{isFirst:n,useBriefLayout:r,selectionHighlight:o,children:s}=e,i=r?0:vDp,a=i*2,l;if(t[0]!==n||t[1]!==o||t[2]!==a)l={isQueued:!0,isFirst:n,paddingWidth:a,selectionHighlight:o},t[0]=n,t[1]=o,t[2]=a,t[3]=l;else l=t[3];let c=l,u;if(t[4]!==s||t[5]!==i)u=dmo.jsx(Box,{paddingX:i,children:s}),t[4]=s,t[5]=i,t[6]=u;else u=t[6];let d;if(t[7]!==u||t[8]!==c)d=dmo.jsx(X4a.Provider,{value:c,children:u}),t[7]=u,t[8]=c,t[9]=d;else d=t[9];return d}
var j4a,Y4a,J4a,dmo,X4a,vDp=2;
var pmo=b(()=>{je();j4a=x(tt(),1),Y4a=x(et(),1),J4a=x(et(),1),dmo=x(oe(),1),X4a=Y4a.createContext(void 0)});
export {Q4a,Z4a,j4a,Y4a,J4a,dmo,X4a,vDp,pmo};
