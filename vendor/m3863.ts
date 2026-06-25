// @ts-nocheck
import {iu} from "./m3830.ts";
import {w0e,x2n} from "./m3862.ts";
import {Text} from "./m2433.ts";
import {_c,PE} from "./m3831.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function j1a(){let e=z1a.c(12),{goBack:t,goToStep:n,updateWizardData:r,wizardData:o}=iu(),s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s={label:"Application Default Credentials (gcloud auth)",value:"adc"},e[0]=s;else s=e[0];let i;if(e[1]===Symbol.for("react.memo_cache_sentinel"))i={label:"Service account key file",value:"serviceAccount"},e[1]=i;else i=e[1];let a;if(e[2]===Symbol.for("react.memo_cache_sentinel"))a=[s,i,{label:"Use credentials already in my environment",value:"environment"}],e[2]=a;else a=e[2];let l=a,c;if(e[3]===Symbol.for("react.memo_cache_sentinel"))c={adc:w0e.PROJECT,serviceAccount:w0e.SERVICE_ACCOUNT,environment:w0e.PROJECT},e[3]=c;else c=e[3];let u=c,d;if(e[4]!==n||e[5]!==r)d=(h)=>{let g=h;r({authMethod:g}),n(u[g])},e[4]=n,e[5]=r,e[6]=d;else d=e[6];let p=d,m;if(e[7]===Symbol.for("react.memo_cache_sentinel"))m=tut.jsx(Text,{dimColor:!0,children:"Claude Code uses the standard GCP credential chain. Pick the method you already use with gcloud or in your deployment."}),e[7]=m;else m=e[7];let f;if(e[8]!==t||e[9]!==p||e[10]!==o.authMethod)f=tut.jsx(_c,{subtitle:"How do you authenticate to Google Cloud?",children:tut.jsxs(Box,{flexDirection:"column",gap:1,children:[m,tut.jsx(hr,{options:l,defaultValue:o.authMethod,onChange:p,onCancel:t})]})}),e[8]=t,e[9]=p,e[10]=o.authMethod,e[11]=f;else f=e[11];return f}
var z1a,tut;
var Y1a=b(()=>{je();Ol();Fy();PE();x2n();z1a=x(tt(),1),tut=x(oe(),1)});
export {j1a,z1a,tut,Y1a};
