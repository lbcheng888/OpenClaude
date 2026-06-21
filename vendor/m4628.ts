// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Link} from "./m2427.ts";
import {sDe,d6t} from "./m4520.ts";
import {Kn,Li} from "./m2572.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {readRoster,lr} from "./m2547.ts";
import {zs,Tn} from "./m2554.ts";
import {rs,at} from "./m2546.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Idl(e){let t=Hdl.c(14),{onSubmit:n,defaultSelections:r}=e,[o,s]=j9.useState(!1),i;if(t[0]!==n)i=(g)=>{if(g.length===0){s(!0);return}s(!1),n(g)},t[0]=n,t[1]=i;else i=t[1];let a=i,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=()=>{s(!1)},t[2]=l;else l=t[2];let c=l,u;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=()=>{s(!0)},t[3]=u;else u=t[3];let d=u,p;if(t[4]===Symbol.for("react.memo_cache_sentinel"))p=j9.default.createElement(Box,null,j9.default.createElement(Text,{dimColor:!0},"More workflow examples (issue triage, CI fixes, etc.) at:"," ",j9.default.createElement(Link,{url:"https://github.com/anthropics/claude-code-action/blob/main/examples/"},"https://github.com/anthropics/claude-code-action/blob/main/examples/"))),t[4]=p;else p=t[4];let m;if(t[5]===Symbol.for("react.memo_cache_sentinel"))m=dzp.map(mzp),t[5]=m;else m=t[5];let f;if(t[6]!==r||t[7]!==a)f=j9.default.createElement(sDe,{options:m,defaultValue:r,onSubmit:a,onChange:c,onCancel:d,hideIndexes:!0}),t[6]=r,t[7]=a,t[8]=f;else f=t[8];let A;if(t[9]!==o)A=o&&j9.default.createElement(Box,null,j9.default.createElement(Text,{color:"error"},"You must select at least one workflow to continue")),t[9]=o,t[10]=A;else A=t[10];let h;if(t[11]!==f||t[12]!==A)h=j9.default.createElement(Kn,{title:"Select GitHub workflows to install",subtitle:"We'll create a workflow file in your repository for each one you select.",onCancel:d,inputGuide:pzp},p,f,A),t[11]=f,t[12]=A,t[13]=h;else h=t[13];return h}
function mzp(e){return{label:e.label,value:e.value}}
var Hdl,j9,dzp,pzp;
var Ddl=b(()=>{ze();readRoster();d6t();zs();Li();rs();Hdl=M(rt(),1),j9=M(Te(),1),dzp=[{value:"claude",label:"@Claude Code - Tag @claude in issues and PR comments"},{value:"claude-review",label:"Claude Code Review - Automated code review on new PRs"}],pzp=j9.default.createElement(Tn,null,j9.default.createElement(at,{chord:["up","down"],action:"navigate"}),j9.default.createElement(at,{chord:"space",action:"toggle"}),j9.default.createElement(at,{chord:"enter",action:"confirm"}),j9.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"}))});
export {Idl,mzp,Hdl,j9,dzp,pzp,Ddl};
