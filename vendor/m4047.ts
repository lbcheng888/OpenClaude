// @ts-nocheck
import {mce,dxe,ydt} from "../src/tui/4005_children.ts";
import {Cs,tp} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {H5,Pa} from "./m720.ts";
import {NoSelect,o6r} from "./m2447.ts";
import {Ldt,yce} from "./m4046.ts";
import {_xe,Y3t} from "./m4045.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function S4a(e){let t=e.lastIndexOf(y4a);if(t===-1)return{synthesis:e,sources:[]};return{synthesis:e.slice(0,t),sources:e.slice(t+y4a.length).split(", ").filter(Boolean)}}
function lDp(e){return e.startsWith("team/")||e.startsWith("team\\")}
function cDp(e){return e.startsWith("org/")}
function tmo(e){return e.length>0&&e.every((t)=>uDp.test(t.path))}
function b4a(e){let t=0,n=0,r=0;for(let o of e)for(let s of S4a(o.content).sources)if(lDp(s))t++;else if(cDp(s))r++;else n++;return{cited_team_count:t,cited_private_count:n,cited_org_count:r}}
function E4a(e){let t=v3n.c(24),{memories:n,messageUuid:r,addMargin:o,isTranscriptMode:s}=e,i=X3t.useContext(mce),a=dxe(r),[l,c]=X3t.useState(null),u;if(t[0]!==s||t[1]!==r||t[2]!==i)u=Cs()&&!s&&i!==null&&r!==void 0,t[0]=s,t[1]=r,t[2]=i,t[3]=u;else u=t[3];let d=u,p;if(t[4]!==n)p=b4a(n),t[4]=n,t[5]=p;else p=t[5];let m=p,f=o?1:0,h;if(t[6]!==l||t[7]!==n||t[8]!==r||t[9]!==i||t[10]!==a||t[11]!==d||t[12]!==m){let _;if(t[14]!==l||t[15]!==r||t[16]!==i||t[17]!==a||t[18]!==d||t[19]!==m)_=(T,y)=>{let{synthesis:S}=S4a(T.content),E=S.split(`
`).map(pDp).filter(Boolean);return fH.jsxs(Box,{flexDirection:"column",children:[fH.jsxs(Box,{flexDirection:"row",children:[fH.jsx(Box,{minWidth:2,children:fH.jsx(Text,{color:"remember",children:H5})}),!1,fH.jsx(Text,{bold:!0,color:"remember",children:"Recalled from memory"}),d&&y===0&&fH.jsxs(fH.Fragment,{children:[fH.jsx(Text,{dimColor:!0,children:" \xB7 "}),fH.jsx(T4a,{label:"[Good]",color:"success",sentiment:"positive",hover:l,rating:a,setHover:c,onRate:(R)=>i(r,R,"tiny_memory",m)}),fH.jsx(Text,{children:" "}),fH.jsx(T4a,{label:"[Bad]",color:"error",sentiment:"negative",hover:l,rating:a,setHover:c,onRate:(R)=>i(r,R,"tiny_memory",m)})]})]}),E.map(dDp)]},T.path)},t[14]=l,t[15]=r,t[16]=i,t[17]=a,t[18]=d,t[19]=m,t[20]=_;else _=t[20];h=n.map(_),t[6]=l,t[7]=n,t[8]=r,t[9]=i,t[10]=a,t[11]=d,t[12]=m,t[13]=h}else h=t[13];let g;if(t[21]!==f||t[22]!==h)g=fH.jsx(Box,{flexDirection:"column",marginTop:f,children:h}),t[21]=f,t[22]=h,t[23]=g;else g=t[23];return g}
function dDp(e,t){return fH.jsxs(Box,{flexDirection:"row",marginTop:t>0?1:0,children:[fH.jsx(Box,{width:4,flexShrink:0,children:fH.jsx(Text,{dimColor:!0,children:"  \xB7 "})}),fH.jsx(Box,{flexShrink:1,flexGrow:1,children:fH.jsx(Text,{wrap:"wrap",children:e})})]},t)}
function pDp(e){return e.replace(/^-\s*/,"")}
function T4a(e){let t=v3n.c(17),{label:n,color:r,sentiment:o,hover:s,rating:i,setHover:a,onRate:l}=e,c;if(t[0]!==l||t[1]!==o)c=()=>l(o),t[0]=l,t[1]=o,t[2]=c;else c=t[2];let u;if(t[3]!==o||t[4]!==a)u=()=>a(o),t[3]=o,t[4]=a,t[5]=u;else u=t[5];let d;if(t[6]!==a)d=()=>a(null),t[6]=a,t[7]=d;else d=t[7];let p=s===o?void 0:r,m=i!==void 0&&i!==o,f;if(t[8]!==n||t[9]!==p||t[10]!==m)f=fH.jsx(Text,{color:p,dimColor:m,children:n}),t[8]=n,t[9]=p,t[10]=m,t[11]=f;else f=t[11];let h;if(t[12]!==c||t[13]!==u||t[14]!==d||t[15]!==f)h=fH.jsx(NoSelect,{onClick:c,onMouseEnter:u,onMouseLeave:d,children:f}),t[12]=c,t[13]=u,t[14]=d,t[15]=f,t[16]=h;else h=t[16];return h}
function mDp(e){return e==="+"||e==="-"}
function C4a(e){let t=v3n.c(11),{messages:n,setInputValue:r,enabled:o}=e,s=Ldt(),i=X3t.useContext(mce),a;if(t[0]!==o||t[1]!==n){e:{if(!o){a=null;break e}let p=n.findLast(fDp);if(p?.type!=="attachment"){a=null;break e}if(p.attachment.type!=="relevant_memories"){a=null;break e}a={uuid:p.uuid,scopeCounts:b4a(p.attachment.memories)}}t[0]=o,t[1]=n,t[2]=a}else a=t[2];let l=a,c;if(t[3]!==i||t[4]!==l)c=(p)=>{if(i===null||l===null)return;i(l.uuid,p==="+"?"positive":"negative","tiny_memory",l.scopeCounts)},t[3]=i,t[4]=l,t[5]=c;else c=t[5];let u=o&&i!==null&&l!==null,d;if(t[6]!==s||t[7]!==r||t[8]!==c||t[9]!==u)d={inputValue:s,setInputValue:r,isValidDigit:mDp,onDigit:c,enabled:u},t[6]=s,t[7]=r,t[8]=c,t[9]=u,t[10]=d;else d=t[10];return _xe(d),null}
function fDp(e){return e.type==="attachment"&&e.attachment.type==="relevant_memories"&&tmo(e.attachment.memories)}
var v3n,X3t,fH,y4a=`

Sources: `,uDp;
var nmo=b(()=>{Pa();o6r();je();tp();Y3t();yce();ydt();v3n=x(tt(),1),X3t=x(et(),1),fH=x(oe(),1);uDp=/^<synthesis:(.+)>$/});
export {S4a,lDp,cDp,tmo,b4a,E4a,dDp,pDp,T4a,mDp,C4a,fDp,v3n,X3t,fH,y4a,uDp,nmo};
