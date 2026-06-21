// @ts-nocheck
import {Eu} from "./m3812.ts";
import {BHe,LBn} from "./m3844.ts";
import {Text} from "./m2423.ts";
import {React,CE} from "./m3813.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function EIa(){let e=bIa.c(12),{goBack:t,goToStep:n,updateWizardData:r,wizardData:o}=Eu(),s;if(e[0]===Symbol.for("react.memo_cache_sentinel"))s={label:"Application Default Credentials (gcloud auth)",value:"adc"},e[0]=s;else s=e[0];let i;if(e[1]===Symbol.for("react.memo_cache_sentinel"))i={label:"Service account key file",value:"serviceAccount"},e[1]=i;else i=e[1];let a;if(e[2]===Symbol.for("react.memo_cache_sentinel"))a=[s,i,{label:"Use credentials already in my environment",value:"environment"}],e[2]=a;else a=e[2];let l=a,c;if(e[3]===Symbol.for("react.memo_cache_sentinel"))c={adc:BHe.PROJECT,serviceAccount:BHe.SERVICE_ACCOUNT,environment:BHe.PROJECT},e[3]=c;else c=e[3];let u=c,d;if(e[4]!==n||e[5]!==r)d=(A)=>{let h=A;r({authMethod:h}),n(u[h])},e[4]=n,e[5]=r,e[6]=d;else d=e[6];let p=d,m;if(e[7]===Symbol.for("react.memo_cache_sentinel"))m=vUt.default.createElement(Text,{dimColor:!0},"Claude Code uses the standard GCP credential chain. Pick the method you already use with gcloud or in your deployment."),e[7]=m;else m=e[7];let f;if(e[8]!==t||e[9]!==p||e[10]!==o.authMethod)f=vUt.default.createElement(React,{subtitle:"How do you authenticate to Google Cloud?"},vUt.default.createElement(Box,{flexDirection:"column",gap:1},m,vUt.default.createElement(pr,{options:l,defaultValue:o.authMethod,onChange:p,onCancel:t}))),e[8]=t,e[9]=p,e[10]=o.authMethod,e[11]=f;else f=e[11];return f}
var bIa,vUt;
var CIa=b(()=>{ze();Yl();$y();CE();LBn();bIa=M(rt(),1),vUt=M(Te(),1)});
export {EIa,bIa,vUt,CIa};
