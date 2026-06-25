// @ts-nocheck
import {NoSelect} from "./m2447.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {Gtt,FAn} from "./m2464.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Yn(e){let t=p6r.c(11),{children:n,height:r,screenReaderLabel:o}=e;if(m6r.useContext(f6r))return n;let i=o===void 0,a;if(t[0]!==o||t[1]!==i)a=yhe.jsx(NoSelect,{fromLeftEdge:!0,flexShrink:0,children:yhe.jsxs(Text,{"aria-hidden":i,"aria-label":o,dimColor:!0,children:["  ","\u23BF \xA0"]})}),t[0]=o,t[1]=i,t[2]=a;else a=t[2];let l;if(t[3]!==n)l=yhe.jsx(Box,{flexShrink:1,flexGrow:1,children:n}),t[3]=n,t[4]=l;else l=t[4];let c;if(t[5]!==r||t[6]!==a||t[7]!==l)c=yhe.jsx(Qyd,{children:yhe.jsxs(Box,{flexDirection:"row",height:r,overflowY:"hidden",children:[a,l]})}),t[5]=r,t[6]=a,t[7]=l,t[8]=c;else c=t[8];let u=c;if(r!==void 0)return u;let d;if(t[9]!==u)d=yhe.jsx(Gtt,{lock:"offscreen",children:u}),t[9]=u,t[10]=d;else d=t[10];return d}
function qxi(){return m6r.useContext(f6r)}
function Qyd(e){let t=p6r.c(2),{children:n}=e,r;if(t[0]!==n)r=yhe.jsx(f6r.Provider,{value:!0,children:n}),t[0]=n,t[1]=r;else r=t[1];return r}
var p6r,$xi,m6r,yhe,f6r;
var Pl=b(()=>{je();FAn();p6r=x(tt(),1),$xi=x(et(),1),m6r=x(et(),1),yhe=x(oe(),1);f6r=$xi.createContext(!1)});
export {Yn,qxi,Qyd,p6r,$xi,m6r,yhe,f6r,Pl};
