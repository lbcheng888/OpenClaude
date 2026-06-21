// @ts-nocheck
import {Eu} from "./m3812.ts";
import {Ige,yBn} from "./m3817.ts";
import {Text} from "./m2423.ts";
import {React,CE} from "./m3813.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function mHa(){let e=pHa.c(12),{goBack:t,goToStep:n,updateWizardData:r}=Eu(),o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o={label:"AWS profile (SSO or named profile)",value:"profile"},e[0]=o;else o=e[0];let s;if(e[1]===Symbol.for("react.memo_cache_sentinel"))s={label:"Bedrock API key (bearer token)",value:"bearer"},e[1]=s;else s=e[1];let i;if(e[2]===Symbol.for("react.memo_cache_sentinel"))i={label:"Access key + secret",value:"accessKey"},e[2]=i;else i=e[2];let a;if(e[3]===Symbol.for("react.memo_cache_sentinel"))a=[o,s,i,{label:"Use credentials already in my environment",value:"environment"}],e[3]=a;else a=e[3];let l=a,c;if(e[4]===Symbol.for("react.memo_cache_sentinel"))c={profile:Ige.PROFILE,bearer:Ige.BEARER,accessKey:Ige.ACCESS_KEY_ID,environment:Ige.REGION},e[4]=c;else c=e[4];let u=c,d;if(e[5]!==n||e[6]!==r)d=(A)=>{let h=A;r({authMethod:h}),n(u[h])},e[5]=n,e[6]=r,e[7]=d;else d=e[7];let p=d,m;if(e[8]===Symbol.for("react.memo_cache_sentinel"))m=AUt.default.createElement(Text,{dimColor:!0},"Claude Code uses the standard AWS credential chain. Pick the method you already use with the AWS CLI."),e[8]=m;else m=e[8];let f;if(e[9]!==t||e[10]!==p)f=AUt.default.createElement(React,{subtitle:"How do you authenticate to AWS?"},AUt.default.createElement(Box,{flexDirection:"column",gap:1},m,AUt.default.createElement(pr,{options:l,onChange:p,onCancel:t}))),e[9]=t,e[10]=p,e[11]=f;else f=e[11];return f}
var pHa,AUt;
var fHa=b(()=>{ze();Yl();$y();CE();yBn();pHa=M(rt(),1),AUt=M(Te(),1)});
export {mHa,pHa,AUt,fHa};
