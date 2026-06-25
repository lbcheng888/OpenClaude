// @ts-nocheck
import {iu} from "./m3830.ts";
import {z_e,p2n} from "./m3835.ts";
import {Text} from "./m2433.ts";
import {_c,PE} from "./m3831.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function MMa(){let e=LMa.c(12),{goBack:t,goToStep:n,updateWizardData:r}=iu(),o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o={label:"AWS profile (SSO or named profile)",value:"profile"},e[0]=o;else o=e[0];let s;if(e[1]===Symbol.for("react.memo_cache_sentinel"))s={label:"Bedrock API key (bearer token)",value:"bearer"},e[1]=s;else s=e[1];let i;if(e[2]===Symbol.for("react.memo_cache_sentinel"))i={label:"Access key + secret",value:"accessKey"},e[2]=i;else i=e[2];let a;if(e[3]===Symbol.for("react.memo_cache_sentinel"))a=[o,s,i,{label:"Use credentials already in my environment",value:"environment"}],e[3]=a;else a=e[3];let l=a,c;if(e[4]===Symbol.for("react.memo_cache_sentinel"))c={profile:z_e.PROFILE,bearer:z_e.BEARER,accessKey:z_e.ACCESS_KEY_ID,environment:z_e.REGION},e[4]=c;else c=e[4];let u=c,d;if(e[5]!==n||e[6]!==r)d=(h)=>{let g=h;r({authMethod:g}),n(u[g])},e[5]=n,e[6]=r,e[7]=d;else d=e[7];let p=d,m;if(e[8]===Symbol.for("react.memo_cache_sentinel"))m=Xct.jsx(Text,{dimColor:!0,children:"Claude Code uses the standard AWS credential chain. Pick the method you already use with the AWS CLI."}),e[8]=m;else m=e[8];let f;if(e[9]!==t||e[10]!==p)f=Xct.jsx(_c,{subtitle:"How do you authenticate to AWS?",children:Xct.jsxs(Box,{flexDirection:"column",gap:1,children:[m,Xct.jsx(hr,{options:l,onChange:p,onCancel:t})]})}),e[9]=t,e[10]=p,e[11]=f;else f=e[11];return f}
var LMa,Xct;
var NMa=b(()=>{je();Ol();Fy();PE();p2n();LMa=x(tt(),1),Xct=x(oe(),1)});
export {MMa,LMa,Xct,NMa};
