// @ts-nocheck
import {NoSelect} from "./m2447.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {Pa,mM} from "./m720.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function q9n(e){let t=P3t.c(7),{connectors:n,children:r}=e,o;if(t[0]!==n)o=n.length>0&&Gq.jsx(NoSelect,{fromLeftEdge:!0,flexShrink:0,flexDirection:"row",children:n.map(E0p)}),t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]!==r)s=Gq.jsx(Box,{flexGrow:1,flexShrink:1,children:r}),t[2]=r,t[3]=s;else s=t[3];let i;if(t[4]!==o||t[5]!==s)i=Gq.jsxs(Box,{flexDirection:"row",children:[o,s]}),t[4]=o,t[5]=s,t[6]=i;else i=t[6];return i}
function E0p(e,t){return Gq.jsx(Box,{width:2,children:Gq.jsx(Text,{dimColor:!0,children:b0p[e]})},t)}
function opo(e,t=!0){let n=wte.Children.toArray(e);return n.map((r,o)=>Gq.jsx(rpo.Provider,{value:t&&o===n.length-1,children:r},o))}
function C0p(e){let t=P3t.c(10),{children:n,variant:r}=e,o=r===void 0?"outline":r,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=[],t[0]=s;else s=t[0];let i;if(t[1]!==o)i={variant:o,ancestors:s},t[1]=o,t[2]=i;else i=t[2];let a;if(t[3]!==n)a=opo(n),t[3]=n,t[4]=a;else a=t[4];let l;if(t[5]!==a)l=Gq.jsx(Box,{flexDirection:"column",children:a}),t[5]=a,t[6]=l;else l=t[6];let c;if(t[7]!==i||t[8]!==l)c=Gq.jsx(npo.Provider,{value:i,children:l}),t[7]=i,t[8]=l,t[9]=c;else c=t[9];return c}
function A0p(e){let t=P3t.c(19),{label:n,children:r,dimColor:o,color:s}=e,{variant:i,ancestors:a}=wte.useContext(npo),l=wte.useContext(rpo),c=i==="outline"?"last":l?"last":"branch",u=i==="outline"?"space":l?"space":"pipe",d=n!=null&&n!==!1,p=d?n:r,m;if(t[0]!==a||t[1]!==c)m=[...a,c],t[0]=a,t[1]=c,t[2]=m;else m=t[2];let f;if(t[3]!==s||t[4]!==o||t[5]!==p)f=wte.isValidElement(p)?p:Gq.jsx(Text,{dimColor:o,color:s,children:p}),t[3]=s,t[4]=o,t[5]=p,t[6]=f;else f=t[6];let h;if(t[7]!==m||t[8]!==f)h=Gq.jsx(q9n,{connectors:m,children:f}),t[7]=m,t[8]=f,t[9]=h;else h=t[9];let g;if(t[10]!==a||t[11]!==r||t[12]!==u||t[13]!==d||t[14]!==i)g=d&&Gq.jsx(npo.Provider,{value:{variant:i,ancestors:[...a,u]},children:opo(r)}),t[10]=a,t[11]=r,t[12]=u,t[13]=d,t[14]=i,t[15]=g;else g=t[15];let _;if(t[16]!==h||t[17]!==g)_=Gq.jsxs(Box,{flexDirection:"column",children:[h,g]}),t[16]=h,t[17]=g,t[18]=_;else _=t[18];return _}
function R0p(e){let t=P3t.c(3),{children:n}=e,r=wte.useContext(rpo),o;if(t[0]!==n||t[1]!==r)o=opo(n,r),t[0]=n,t[1]=r,t[2]=o;else o=t[2];return o}
var P3t,wte,Gq,b0p,npo,rpo,cs;
var kte=b(()=>{Pa();je();P3t=x(tt(),1),wte=x(et(),1),Gq=x(oe(),1),b0p={branch:mM.branch,last:mM.last,pipe:mM.pipe,space:""};npo=wte.createContext({variant:"outline",ancestors:[]}),rpo=wte.createContext(!0);cs=Object.assign(C0p,{Node:A0p,Group:R0p})});
export {q9n,E0p,opo,C0p,A0p,R0p,P3t,wte,Gq,b0p,npo,rpo,cs,kte};
