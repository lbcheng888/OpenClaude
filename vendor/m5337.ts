// @ts-nocheck
import {Or,Ts} from "./m2542.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {pr} from "./m2562.ts";
import {Uy,zq} from "./m3339.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {lr,readRoster} from "./m2547.ts";
import {Wu,lS} from "./m2571.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {yb} from "./m4521.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function l6l(e){let t=i6l.c(25),{currentValue:n,onSelect:r,onCancel:o,isMidConversation:s}=e,[i,a]=a6l.useState(null),l;if(t[0]===Symbol.for("react.memo_cache_sentinel"))l=[{value:"true",label:"Enabled",description:"Claude will think before responding"},{value:"false",label:"Disabled",description:"Claude will respond without extended thinking"}],t[0]=l;else l=t[0];let c=l,u;if(t[1]!==i||t[2]!==o)u=()=>{if(i!==null)a(null);else o()},t[1]=i,t[2]=o,t[3]=u;else u=t[3];let d;if(t[4]===Symbol.for("react.memo_cache_sentinel"))d={context:"Confirmation"},t[4]=d;else d=t[4];Or("confirm:no",u,d);let p;if(t[5]!==i||t[6]!==r)p=()=>{if(i!==null)r(i)},t[5]=i,t[6]=r,t[7]=p;else p=t[7];let m=i!==null,f;if(t[8]!==m)f={context:"Confirmation",isActive:m},t[8]=m,t[9]=f;else f=t[9];Or("confirm:yes",p,f);let A;if(t[10]!==n||t[11]!==s||t[12]!==r)A=function(v){let R=v==="true";if(s&&R!==n)a(R);else r(R)},t[10]=n,t[11]=s,t[12]=r,t[13]=A;else A=t[13];let h=A,g;if(t[14]===Symbol.for("react.memo_cache_sentinel"))g=wg.createElement(Box,{marginBottom:1,flexDirection:"column"},wg.createElement(Text,{color:"remember",bold:!0},"Toggle thinking mode"),wg.createElement(Text,{dimColor:!0},"Enable or disable thinking for this session.")),t[14]=g;else g=t[14];let _;if(t[15]!==i||t[16]!==n||t[17]!==h||t[18]!==o)_=wg.createElement(Box,{flexDirection:"column"},g,i!==null?wg.createElement(Box,{flexDirection:"column",marginBottom:1,gap:1},wg.createElement(Text,{color:"warning"},"Changing thinking mode mid-conversation will increase latency and may reduce quality. For best results, set this at the start of a session."),wg.createElement(Text,{color:"warning"},"Do you want to proceed?")):wg.createElement(Box,{flexDirection:"column",marginBottom:1},wg.createElement(pr,{defaultValue:n?"true":"false",defaultFocusValue:n?"true":"false",options:c,onChange:h,onCancel:o,visibleOptionCount:2}))),t[15]=i,t[16]=n,t[17]=h,t[18]=o,t[19]=_;else _=t[19];let y;if(t[20]!==i)y=wg.createElement(Uy,null,i!==null?wg.createElement(Tn,null,wg.createElement(at,{chord:"enter",action:"confirm"}),wg.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})):wg.createElement(Tn,null,wg.createElement(at,{chord:"enter",action:"confirm"}),wg.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"}))),t[20]=i,t[21]=y;else y=t[21];let T;if(t[22]!==y||t[23]!==_)T=wg.createElement(Wu,{color:"permission"},_,y),t[22]=y,t[23]=_,t[24]=T;else T=t[24];return T}
var i6l,wg,a6l;
var c6l=b(()=>{zq();ze();Ts();readRoster();yb();zs();rs();lS();i6l=M(rt(),1),wg=M(Te(),1),a6l=M(Te(),1)});
export {l6l,i6l,wg,a6l,c6l};
