// @ts-nocheck
import {Text} from "./m2433.ts";
import {hr} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {TS} from "./m4541.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function vml(e){let t=Rml.c(17),{currentVersion:n,onChoice:r}=e,o;if(t[0]!==r)o=function(g){r(g)},t[0]=r,t[1]=o;else o=t[1];let s=o,i;if(t[2]!==r)i=function(){r("cancel")},t[2]=r,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==n)l=Vft.jsxs(Text,{children:["The stable channel may have an older version than what you're currently running (",n,")."]}),t[4]=n,t[5]=l;else l=t[5];let c;if(t[6]===Symbol.for("react.memo_cache_sentinel"))c=Vft.jsx(Text,{dimColor:!0,children:"How would you like to handle this?"}),t[6]=c;else c=t[6];let u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u={label:"Allow possible downgrade to stable version",value:"downgrade"},t[7]=u;else u=t[7];let d=`Stay on current version (${n}) until stable catches up`,p;if(t[8]!==d)p=[u,{label:d,value:"stay"}],t[8]=d,t[9]=p;else p=t[9];let m;if(t[10]!==s||t[11]!==p)m=Vft.jsx(hr,{options:p,onChange:s}),t[10]=s,t[11]=p,t[12]=m;else m=t[12];let f;if(t[13]!==a||t[14]!==l||t[15]!==m)f=Vft.jsxs(preInitQueue,{title:"Switch to Stable Channel",onCancel:a,color:"permission",hideBorder:!0,hideInputGuide:!0,children:[l,c,m]}),t[13]=a,t[14]=l,t[15]=m,t[16]=f;else f=t[16];return f}
var Rml,Vft;
var wml=b(()=>{je();TS();di();Rml=x(tt(),1),Vft=x(oe(),1)});
export {vml,Rml,Vft,wml};
