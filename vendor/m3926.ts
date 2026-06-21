// @ts-nocheck
import {NoSelect} from "./m2437.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {sl,e1} from "./m715.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function uUn(e){let t=q2t.c(7),{connectors:n,children:r}=e,o;if(t[0]!==n)o=n.length>0&&Wv.createElement(NoSelect,{fromLeftEdge:!0,flexShrink:0,flexDirection:"row"},n.map(cSp)),t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]!==r)s=Wv.createElement(Box,{flexGrow:1,flexShrink:1},r),t[2]=r,t[3]=s;else s=t[3];let i;if(t[4]!==o||t[5]!==s)i=Wv.createElement(Box,{flexDirection:"row"},o,s),t[4]=o,t[5]=s,t[6]=i;else i=t[6];return i}
function cSp(e,t){return Wv.createElement(Box,{key:t,width:2},Wv.createElement(Text,{dimColor:!0},lSp[e]))}
function vio(e,t=!0){let n=xte.Children.toArray(e);return n.map((r,o)=>Wv.createElement(Cio.Provider,{key:o,value:t&&o===n.length-1},r))}
function uSp(e){let t=q2t.c(10),{children:n,variant:r}=e,o=r===void 0?"outline":r,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=[],t[0]=s;else s=t[0];let i;if(t[1]!==o)i={variant:o,ancestors:s},t[1]=o,t[2]=i;else i=t[2];let a;if(t[3]!==n)a=vio(n),t[3]=n,t[4]=a;else a=t[4];let l;if(t[5]!==a)l=Wv.createElement(Box,{flexDirection:"column"},a),t[5]=a,t[6]=l;else l=t[6];let c;if(t[7]!==i||t[8]!==l)c=Wv.createElement(Eio.Provider,{value:i},l),t[7]=i,t[8]=l,t[9]=c;else c=t[9];return c}
function dSp(e){let t=q2t.c(19),{label:n,children:r,dimColor:o,color:s}=e,{variant:i,ancestors:a}=xte.useContext(Eio),l=xte.useContext(Cio),c=i==="outline"?"last":l?"last":"branch",u=i==="outline"?"space":l?"space":"pipe",d=n!=null&&n!==!1,p=d?n:r,m;if(t[0]!==a||t[1]!==c)m=[...a,c],t[0]=a,t[1]=c,t[2]=m;else m=t[2];let f;if(t[3]!==s||t[4]!==o||t[5]!==p)f=xte.isValidElement(p)?p:Wv.createElement(Text,{dimColor:o,color:s},p),t[3]=s,t[4]=o,t[5]=p,t[6]=f;else f=t[6];let A;if(t[7]!==m||t[8]!==f)A=Wv.createElement(uUn,{connectors:m},f),t[7]=m,t[8]=f,t[9]=A;else A=t[9];let h;if(t[10]!==a||t[11]!==r||t[12]!==u||t[13]!==d||t[14]!==i)h=d&&Wv.createElement(Eio.Provider,{value:{variant:i,ancestors:[...a,u]}},vio(r)),t[10]=a,t[11]=r,t[12]=u,t[13]=d,t[14]=i,t[15]=h;else h=t[15];let g;if(t[16]!==A||t[17]!==h)g=Wv.createElement(Box,{flexDirection:"column"},A,h),t[16]=A,t[17]=h,t[18]=g;else g=t[18];return g}
function pSp(e){let t=q2t.c(3),{children:n}=e,r=xte.useContext(Cio),o;if(t[0]!==n||t[1]!==r)o=vio(n,r),t[0]=n,t[1]=r,t[2]=o;else o=t[2];return o}
var q2t,Wv,xte,lSp,Eio,Cio,Es;
var kte=b(()=>{sl();ze();q2t=M(rt(),1),Wv=M(Te(),1),xte=M(Te(),1),lSp={branch:e1.branch,last:e1.last,pipe:e1.pipe,space:""};Eio=xte.createContext({variant:"outline",ancestors:[]}),Cio=xte.createContext(!0);Es=Object.assign(uSp,{Node:dSp,Group:pSp})});
export {uUn,cSp,vio,uSp,dSp,pSp,q2t,Wv,xte,lSp,Eio,Cio,Es,kte};
