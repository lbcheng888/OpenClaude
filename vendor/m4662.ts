// @ts-nocheck
import {Box} from "./m2432.ts";
import {qE,BG} from "./m4563.ts";
import {Text} from "./m2433.ts";
import {hr} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {TS} from "./m4541.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function UTl(e){let t=BTl.c(15),{repoName:n,onSelectAction:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=[{label:"Update workflow file with latest version",value:"update"},{label:"Skip workflow update (configure secrets only)",value:"skip"},{label:"Exit without making changes",value:"exit"}],t[0]=o;else o=t[0];let s=o,i;if(t[1]!==r)i=(g)=>{r(g)},t[1]=r,t[2]=i;else i=t[2];let a=i,l;if(t[3]!==r)l=()=>{r("exit")},t[3]=r,t[4]=l;else l=t[4];let c=l,u=`Repository: ${n}`,d;if(t[5]!==u)d=E6.jsx(Box,{marginBottom:1,children:E6.jsx(qE,{subtitle:u,children:"Existing Workflow Found"})}),t[5]=u,t[6]=d;else d=t[6];let p;if(t[7]===Symbol.for("react.memo_cache_sentinel"))p=E6.jsxs(Box,{flexDirection:"column",marginBottom:1,children:[E6.jsxs(Text,{children:["A Claude workflow file already exists at"," ",E6.jsx(Text,{color:"claude",children:".github/workflows/claude.yml"})]}),E6.jsx(Text,{dimColor:!0,children:"What would you like to do?"})]}),t[7]=p;else p=t[7];let m;if(t[8]!==c||t[9]!==a)m=E6.jsx(Box,{flexDirection:"column",children:E6.jsx(hr,{options:s,onChange:a,onCancel:c})}),t[8]=c,t[9]=a,t[10]=m;else m=t[10];let f;if(t[11]===Symbol.for("react.memo_cache_sentinel"))f=E6.jsx(Box,{marginTop:1,children:E6.jsxs(Text,{dimColor:!0,children:["View the latest workflow template at:"," ",E6.jsx(Text,{color:"claude",children:"https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml"})]})}),t[11]=f;else f=t[11];let h;if(t[12]!==d||t[13]!==m)h=E6.jsxs(Box,{flexDirection:"column",borderStyle:"round",borderDimColor:!0,paddingX:1,children:[d,p,m,f]}),t[12]=d,t[13]=m,t[14]=h;else h=t[14];return h}
var BTl,E6;
var $Tl=b(()=>{TS();BG();je();BTl=x(tt(),1),E6=x(oe(),1)});
export {UTl,BTl,E6,$Tl};
