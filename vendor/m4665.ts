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
function JTl(e){let t=YTl.c(8),{onSelect:n,onCancel:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=[{label:"Set up GitHub Actions workflows",value:"setup"},{label:"Skip for now (you can run /install-github-app again later)",value:"skip"}],t[0]=o;else o=t[0];let s=o,i;if(t[1]!==n)i=(d)=>{n(d)},t[1]=n,t[2]=i;else i=t[2];let a=i,l;if(t[3]===Symbol.for("react.memo_cache_sentinel"))l=wTe.jsx(Box,{marginBottom:1,children:wTe.jsx(qE,{subtitle:"Set up GitHub Actions",children:"GitHub App installed!"})}),t[3]=l;else l=t[3];let c;if(t[4]===Symbol.for("react.memo_cache_sentinel"))c=wTe.jsx(Box,{flexDirection:"column",marginBottom:1,children:wTe.jsx(Text,{children:"The Claude GitHub App is now installed. You can optionally set up GitHub Actions workflows so Claude responds to @claude mentions in issues and PRs."})}),t[4]=c;else c=t[4];let u;if(t[5]!==a||t[6]!==r)u=wTe.jsxs(Box,{flexDirection:"column",borderStyle:"round",borderDimColor:!0,paddingX:1,children:[l,c,wTe.jsx(Box,{flexDirection:"column",children:wTe.jsx(hr,{options:s,onChange:a,onCancel:r})})]}),t[5]=a,t[6]=r,t[7]=u;else u=t[7];return u}
var YTl,wTe;
var XTl=b(()=>{TS();BG();je();YTl=x(tt(),1),wTe=x(oe(),1)});
export {JTl,YTl,wTe,XTl};
