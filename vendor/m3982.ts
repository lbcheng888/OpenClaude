// @ts-nocheck
import {hce,iIe,act} from "../src/tui/3943_children.ts";
import {Ms,Pp} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {m8,sl} from "./m715.ts";
import {NoSelect,R$r} from "./m2437.ts";
import {Tct,Sce} from "./m3981.ts";
import {dIe,a$t} from "./m3980.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function X1a(e){let t=e.lastIndexOf(Y1a);if(t===-1)return{synthesis:e,sources:[]};return{synthesis:e.slice(0,t),sources:e.slice(t+Y1a.length).split(", ").filter(Boolean)}}
function fEp(e){return e.startsWith("team/")||e.startsWith("team\\")}
function AEp(e){return e.startsWith("org/")}
function gao(e){return e.length>0&&e.every((t)=>hEp.test(t.path))}
function Q1a(e){let t=0,n=0,r=0;for(let o of e)for(let s of X1a(o.content).sources)if(fEp(s))t++;else if(AEp(s))r++;else n++;return{cited_team_count:t,cited_private_count:n,cited_org_count:r}}
function Z1a(e){let t=qUn.c(24),{memories:n,messageUuid:r,addMargin:o,isTranscriptMode:s}=e,i=init_subprocessEnv.useContext(hce),a=iIe(r),[l,c]=init_subprocessEnv.useState(null),u;if(t[0]!==s||t[1]!==r||t[2]!==i)u=Ms()&&!s&&i!==null&&r!==void 0,t[0]=s,t[1]=r,t[2]=i,t[3]=u;else u=t[3];let d=u,p;if(t[4]!==n)p=Q1a(n),t[4]=n,t[5]=p;else p=t[5];let m=p,f=o?1:0,A;if(t[6]!==l||t[7]!==n||t[8]!==r||t[9]!==i||t[10]!==a||t[11]!==d||t[12]!==m){let g;if(t[14]!==l||t[15]!==r||t[16]!==i||t[17]!==a||t[18]!==d||t[19]!==m)g=(_,y)=>{let{synthesis:T}=X1a(_.content),S=T.split(`
`).map(_Ep).filter(Boolean);return init_subprocessEnv.default.createElement(Box,{key:_.path,flexDirection:"column"},init_subprocessEnv.default.createElement(Box,{flexDirection:"row"},init_subprocessEnv.default.createElement(Box,{minWidth:2},init_subprocessEnv.default.createElement(Text,{color:"remember"},m8)),!1,init_subprocessEnv.default.createElement(Text,{bold:!0,color:"remember"},"Recalled from memory"),d&&y===0&&init_subprocessEnv.default.createElement(init_subprocessEnv.default.Fragment,null,init_subprocessEnv.default.createElement(Text,{dimColor:!0}," \xB7 "),init_subprocessEnv.default.createElement(J1a,{label:"[Good]",color:"success",sentiment:"positive",hover:l,rating:a,setHover:c,onRate:(v)=>i(r,v,"tiny_memory",m)}),init_subprocessEnv.default.createElement(Text,null," "),init_subprocessEnv.default.createElement(J1a,{label:"[Bad]",color:"error",sentiment:"negative",hover:l,rating:a,setHover:c,onRate:(v)=>i(r,v,"tiny_memory",m)}))),S.map(gEp))},t[14]=l,t[15]=r,t[16]=i,t[17]=a,t[18]=d,t[19]=m,t[20]=g;else g=t[20];A=n.map(g),t[6]=l,t[7]=n,t[8]=r,t[9]=i,t[10]=a,t[11]=d,t[12]=m,t[13]=A}else A=t[13];let h;if(t[21]!==f||t[22]!==A)h=init_subprocessEnv.default.createElement(Box,{flexDirection:"column",marginTop:f},A),t[21]=f,t[22]=A,t[23]=h;else h=t[23];return h}
function gEp(e,t){return init_subprocessEnv.default.createElement(Box,{key:t,flexDirection:"row",marginTop:t>0?1:0},init_subprocessEnv.default.createElement(Box,{width:4,flexShrink:0},init_subprocessEnv.default.createElement(Text,{dimColor:!0},"  \xB7 ")),init_subprocessEnv.default.createElement(Box,{flexShrink:1,flexGrow:1},init_subprocessEnv.default.createElement(Text,{wrap:"wrap"},e)))}
function _Ep(e){return e.replace(/^-\s*/,"")}
function J1a(e){let t=qUn.c(17),{label:n,color:r,sentiment:o,hover:s,rating:i,setHover:a,onRate:l}=e,c;if(t[0]!==l||t[1]!==o)c=()=>l(o),t[0]=l,t[1]=o,t[2]=c;else c=t[2];let u;if(t[3]!==o||t[4]!==a)u=()=>a(o),t[3]=o,t[4]=a,t[5]=u;else u=t[5];let d;if(t[6]!==a)d=()=>a(null),t[6]=a,t[7]=d;else d=t[7];let p=s===o?void 0:r,m=i!==void 0&&i!==o,f;if(t[8]!==n||t[9]!==p||t[10]!==m)f=init_subprocessEnv.default.createElement(Text,{color:p,dimColor:m},n),t[8]=n,t[9]=p,t[10]=m,t[11]=f;else f=t[11];let A;if(t[12]!==c||t[13]!==u||t[14]!==d||t[15]!==f)A=init_subprocessEnv.default.createElement(NoSelect,{onClick:c,onMouseEnter:u,onMouseLeave:d},f),t[12]=c,t[13]=u,t[14]=d,t[15]=f,t[16]=A;else A=t[16];return A}
function yEp(e){return e==="+"||e==="-"}
function eNa(e){let t=qUn.c(11),{messages:n,setInputValue:r,enabled:o}=e,s=Tct(),i=init_subprocessEnv.useContext(hce),a;if(t[0]!==o||t[1]!==n){e:{if(!o){a=null;break e}let p=n.findLast(TEp);if(p?.type!=="attachment"){a=null;break e}if(p.attachment.type!=="relevant_memories"){a=null;break e}a={uuid:p.uuid,scopeCounts:Q1a(p.attachment.memories)}}t[0]=o,t[1]=n,t[2]=a}else a=t[2];let l=a,c;if(t[3]!==i||t[4]!==l)c=(p)=>{if(i===null||l===null)return;i(l.uuid,p==="+"?"positive":"negative","tiny_memory",l.scopeCounts)},t[3]=i,t[4]=l,t[5]=c;else c=t[5];let u=o&&i!==null&&l!==null,d;if(t[6]!==s||t[7]!==r||t[8]!==c||t[9]!==u)d={inputValue:s,setInputValue:r,isValidDigit:yEp,onDigit:c,enabled:u},t[6]=s,t[7]=r,t[8]=c,t[9]=u,t[10]=d;else d=t[10];return dIe(d),null}
function TEp(e){return e.type==="attachment"&&e.attachment.type==="relevant_memories"&&gao(e.attachment.memories)}
var qUn,init_subprocessEnv,Y1a=`

Sources: `,hEp;
var _ao=b(()=>{sl();R$r();ze();Pp();a$t();Sce();act();qUn=M(rt(),1),init_subprocessEnv=M(Te(),1);hEp=/^<synthesis:(.+)>$/});
export {X1a,fEp,AEp,gao,Q1a,Z1a,gEp,_Ep,J1a,yEp,eNa,TEp,qUn,init_subprocessEnv,Y1a,hEp,_ao};
