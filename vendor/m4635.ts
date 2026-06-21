// @ts-nocheck
import {Box} from "./m2422.ts";
import {cR,gJ} from "./m4537.ts";
import {Text} from "./m2423.ts";
import {pr} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {yb} from "./m4521.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function npl(e){let t=tpl.c(15),{repoName:n,onSelectAction:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=[{label:"Update workflow file with latest version",value:"update"},{label:"Skip workflow update (configure secrets only)",value:"skip"},{label:"Exit without making changes",value:"exit"}],t[0]=o;else o=t[0];let s=o,i;if(t[1]!==r)i=(h)=>{r(h)},t[1]=r,t[2]=i;else i=t[2];let a=i,l;if(t[3]!==r)l=()=>{r("exit")},t[3]=r,t[4]=l;else l=t[4];let c=l,u=`Repository: ${n}`,d;if(t[5]!==u)d=xG.default.createElement(Box,{marginBottom:1},xG.default.createElement(cR,{subtitle:u},"Existing Workflow Found")),t[5]=u,t[6]=d;else d=t[6];let p;if(t[7]===Symbol.for("react.memo_cache_sentinel"))p=xG.default.createElement(Box,{flexDirection:"column",marginBottom:1},xG.default.createElement(Text,null,"A Claude workflow file already exists at"," ",xG.default.createElement(Text,{color:"claude"},".github/workflows/claude.yml")),xG.default.createElement(Text,{dimColor:!0},"What would you like to do?")),t[7]=p;else p=t[7];let m;if(t[8]!==c||t[9]!==a)m=xG.default.createElement(Box,{flexDirection:"column"},xG.default.createElement(pr,{options:s,onChange:a,onCancel:c})),t[8]=c,t[9]=a,t[10]=m;else m=t[10];let f;if(t[11]===Symbol.for("react.memo_cache_sentinel"))f=xG.default.createElement(Box,{marginTop:1},xG.default.createElement(Text,{dimColor:!0},"View the latest workflow template at:"," ",xG.default.createElement(Text,{color:"claude"},"https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml"))),t[11]=f;else f=t[11];let A;if(t[12]!==d||t[13]!==m)A=xG.default.createElement(Box,{flexDirection:"column",borderStyle:"round",borderDimColor:!0,paddingX:1},d,p,m,f),t[12]=d,t[13]=m,t[14]=A;else A=t[14];return A}
var tpl,xG;
var rpl=b(()=>{yb();gJ();ze();tpl=M(rt(),1),xG=M(Te(),1)});
export {npl,tpl,xG,rpl};
