// @ts-nocheck
import {xx,$P} from "./m4515.ts";
import {et,Ai} from "./m2208.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function YCl(e){let t=KCl.c(23),{onExit:n,toolPermissionContext:r,onRequestAddDirectory:o,onRequestRemoveDirectory:s,onHeaderFocusChange:i}=e,{headerFocused:a,focusHeader:l}=xx(),c,u;if(t[0]!==a||t[1]!==i)c=()=>{i(a)},u=[a,i],t[0]=a,t[1]=i,t[2]=c,t[3]=u;else c=t[2],u=t[3];zCl.useEffect(c,u);let d;if(t[4]!==r.additionalWorkingDirectories)d=Array.from(r.additionalWorkingDirectories.keys()).map(iim),t[4]=r.additionalWorkingDirectories,t[5]=d;else d=t[5];let p=d,m;if(t[6]!==p||t[7]!==o||t[8]!==s)m=(v)=>{if(v==="add-directory"){o();return}let R=p.find((k)=>k.path===v);if(R&&R.isDeletable)s(R.path)},t[6]=p,t[7]=o,t[8]=s,t[9]=m;else m=t[9];let f=m,A;if(t[10]!==n)A=()=>n("Workspace dialog dismissed",{display:"system"}),t[10]=n,t[11]=A;else A=t[11];let h=A,g;if(t[12]!==p){g=p.map(sim);let v;if(t[14]===Symbol.for("react.memo_cache_sentinel"))v={label:`Add directory${et.ellipsis}`,value:"add-directory"},t[14]=v;else v=t[14];g.push(v),t[12]=p,t[13]=g}else g=t[13];let _=g,y;if(t[15]===Symbol.for("react.memo_cache_sentinel"))y=One.createElement(Box,{flexDirection:"row",marginTop:1,marginLeft:2,gap:1},One.createElement(Text,null,`-  ${getOriginalCwd()}`),One.createElement(Text,{dimColor:!0},"(Original working directory)")),t[15]=y;else y=t[15];let T=Math.min(10,_.length),S;if(t[16]!==l||t[17]!==h||t[18]!==f||t[19]!==a||t[20]!==_||t[21]!==T)S=One.createElement(Box,{flexDirection:"column",marginBottom:1},y,One.createElement(pr,{options:_,onChange:f,onCancel:h,visibleOptionCount:T,onUpFromFirstItem:l,isDisabled:a})),t[16]=l,t[17]=h,t[18]=f,t[19]=a,t[20]=_,t[21]=T,t[22]=S;else S=t[22];return S}
function sim(e){return{label:e.path,value:e.path}}
function iim(e){return{path:e,isCurrent:!1,isDeletable:!0}}
var KCl,One,zCl;
var JCl=b(()=>{Ai();lt();Yl();ze();$P();KCl=M(rt(),1),One=M(Te(),1),zCl=M(Te(),1)});
export {YCl,sim,iim,KCl,One,zCl,JCl};
