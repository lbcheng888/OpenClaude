// @ts-nocheck
import {iu} from "./m3830.ts";
import {T0e,G$t} from "./m3833.ts";
import {b,x} from "../runtime.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function DMa(){let e=IMa.c(16),{goBack:t,goNext:n,updateWizardData:r,wizardData:o,title:s}=iu(),i=o.accessKeyId??"",a=o.secretAccessKey??"",l=o.sessionToken??"",c;if(e[0]!==i||e[1]!==a||e[2]!==l)c={accessKeyId:i,secretAccessKey:a,sessionToken:l},e[0]=i,e[1]=a,e[2]=l,e[3]=c;else c=e[3];let[u,d]=xMa.useState(c),p;if(e[4]!==n||e[5]!==r||e[6]!==u.accessKeyId||e[7]!==u.secretAccessKey||e[8]!==u.sessionToken)p=()=>{r({accessKeyId:u.accessKeyId.trim(),secretAccessKey:u.secretAccessKey.trim(),sessionToken:u.sessionToken.trim()||void 0}),n()},e[4]=n,e[5]=r,e[6]=u.accessKeyId,e[7]=u.secretAccessKey,e[8]=u.sessionToken,e[9]=p;else p=e[9];let m=p,f=s??"Set up AWS Bedrock",h;if(e[10]===Symbol.for("react.memo_cache_sentinel"))h=(_,T)=>d((y)=>({...y,[_]:T})),e[10]=h;else h=e[10];let g;if(e[11]!==t||e[12]!==m||e[13]!==f||e[14]!==u)g=PMa.jsx(T0e,{title:f,subtitle:"AWS access keys",fields:qAp,values:u,onChange:h,onSubmit:m,onCancel:t,submitLabel:"Continue"}),e[11]=t,e[12]=m,e[13]=f,e[14]=u,e[15]=g;else g=e[15];return g}
var IMa,xMa,PMa,qAp;
var OMa=b(()=>{G$t();Fy();IMa=x(tt(),1),xMa=x(et(),1),PMa=x(oe(),1),qAp=[{type:"text",key:"accessKeyId",label:"Access key ID",placeholder:"AKIA\u2026",required:!0},{type:"text",key:"secretAccessKey",label:"Secret access key",mask:"*",required:!0},{type:"text",key:"sessionToken",label:"Session token",mask:"*",hint:()=>"Only needed for temporary credentials from STS. Leave empty for long-lived keys."}]});
export {DMa,IMa,xMa,PMa,qAp,OMa};
