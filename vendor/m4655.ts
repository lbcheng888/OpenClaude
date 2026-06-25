// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Link} from "./m2437.ts";
import {nPe,N8t} from "./m4540.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {uc,dr} from "./m2558.ts";
import {Is,bn} from "./m2565.ts";
import {Wo,at} from "./m2557.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function mTl(e){let t=dTl.c(14),{onSubmit:n,defaultSelections:r}=e,[o,s]=pTl.useState(!1),i;if(t[0]!==n)i=(_)=>{if(_.length===0){s(!0);return}s(!1),n(_)},t[0]=n,t[1]=i;else i=t[1];let a=i,l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=()=>{s(!1)},t[2]=l;else l=t[2];let c=l,u;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=()=>{s(!0)},t[3]=u;else u=t[3];let d=u,p;if(t[4]===Symbol.for("react.memo_cache_sentinel"))p=b6.jsx(Box,{children:b6.jsxs(Text,{dimColor:!0,children:["More workflow examples (issue triage, CI fixes, etc.) at:"," ",b6.jsx(Link,{url:"https://github.com/anthropics/claude-code-action/blob/main/examples/",children:"https://github.com/anthropics/claude-code-action/blob/main/examples/"})]})}),t[4]=p;else p=t[4];let m;if(t[5]===Symbol.for("react.memo_cache_sentinel"))m=mrm.map(hrm),t[5]=m;else m=t[5];let f;if(t[6]!==r||t[7]!==a)f=b6.jsx(nPe,{options:m,defaultValue:r,onSubmit:a,onChange:c,onCancel:d,hideIndexes:!0}),t[6]=r,t[7]=a,t[8]=f;else f=t[8];let h;if(t[9]!==o)h=o&&b6.jsx(Box,{children:b6.jsx(Text,{color:"error",children:"You must select at least one workflow to continue"})}),t[9]=o,t[10]=h;else h=t[10];let g;if(t[11]!==f||t[12]!==h)g=b6.jsxs(preInitQueue,{title:"Select GitHub workflows to install",subtitle:"We'll create a workflow file in your repository for each one you select.",onCancel:d,inputGuide:frm,children:[p,f,h]}),t[11]=f,t[12]=h,t[13]=g;else g=t[13];return g}
function hrm(e){return{label:e.label,value:e.value}}
var dTl,pTl,b6,mrm,frm;
var fTl=b(()=>{je();uc();N8t();Is();di();Wo();dTl=x(tt(),1),pTl=x(et(),1),b6=x(oe(),1),mrm=[{value:"claude",label:"@Claude Code - Tag @claude in issues and PR comments"},{value:"claude-review",label:"Claude Code Review - Automated code review on new PRs"}],frm=b6.jsxs(bn,{children:[b6.jsx(at,{chord:["up","down"],action:"navigate"}),b6.jsx(at,{chord:"space",action:"toggle"}),b6.jsx(at,{chord:"enter",action:"confirm"}),b6.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"cancel"})]})});
export {mTl,hrm,dTl,pTl,b6,mrm,frm,fTl};
