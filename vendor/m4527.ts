// @ts-nocheck
import {Text} from "./m2423.ts";
import {pr} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {yb} from "./m4521.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Mil(e){let t=Lil.c(17),{currentVersion:n,onChoice:r}=e,o;if(t[0]!==r)o=function(h){r(h)},t[0]=r,t[1]=o;else o=t[1];let s=o,i;if(t[2]!==r)i=function(){r("cancel")},t[2]=r,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==n)l=m6t.default.createElement(Text,null,"The stable channel may have an older version than what you're currently running (",n,")."),t[4]=n,t[5]=l;else l=t[5];let c;if(t[6]===Symbol.for("react.memo_cache_sentinel"))c=m6t.default.createElement(Text,{dimColor:!0},"How would you like to handle this?"),t[6]=c;else c=t[6];let u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u={label:"Allow possible downgrade to stable version",value:"downgrade"},t[7]=u;else u=t[7];let d=`Stay on current version (${n}) until stable catches up`,p;if(t[8]!==d)p=[u,{label:d,value:"stay"}],t[8]=d,t[9]=p;else p=t[9];let m;if(t[10]!==s||t[11]!==p)m=m6t.default.createElement(pr,{options:p,onChange:s}),t[10]=s,t[11]=p,t[12]=m;else m=t[12];let f;if(t[13]!==a||t[14]!==l||t[15]!==m)f=m6t.default.createElement(Kn,{title:"Switch to Stable Channel",onCancel:a,color:"permission",hideBorder:!0,hideInputGuide:!0},l,c,m),t[13]=a,t[14]=l,t[15]=m,t[16]=f;else f=t[16];return f}
var Lil,m6t;
var Nil=b(()=>{ze();yb();Li();Lil=M(rt(),1),m6t=M(Te(),1)});
export {Mil,Lil,m6t,Nil};
