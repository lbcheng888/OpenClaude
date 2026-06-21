// @ts-nocheck
import {Eu} from "./m3812.ts";
import {IHe,fUt} from "./m3815.ts";
import {b,M} from "../runtime.ts";
import {$y} from "./m3814.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function uHa(){let e=cHa.c(16),{goBack:t,goNext:n,updateWizardData:r,wizardData:o,title:s}=Eu(),i=o.accessKeyId??"",a=o.secretAccessKey??"",l=o.sessionToken??"",c;if(e[0]!==i||e[1]!==a||e[2]!==l)c={accessKeyId:i,secretAccessKey:a,sessionToken:l},e[0]=i,e[1]=a,e[2]=l,e[3]=c;else c=e[3];let[u,d]=_Bn.useState(c),p;if(e[4]!==n||e[5]!==r||e[6]!==u.accessKeyId||e[7]!==u.secretAccessKey||e[8]!==u.sessionToken)p=()=>{r({accessKeyId:u.accessKeyId.trim(),secretAccessKey:u.secretAccessKey.trim(),sessionToken:u.sessionToken.trim()||void 0}),n()},e[4]=n,e[5]=r,e[6]=u.accessKeyId,e[7]=u.secretAccessKey,e[8]=u.sessionToken,e[9]=p;else p=e[9];let m=p,f=s??"Set up AWS Bedrock",A;if(e[10]===Symbol.for("react.memo_cache_sentinel"))A=(g,_)=>d((y)=>({...y,[g]:_})),e[10]=A;else A=e[10];let h;if(e[11]!==t||e[12]!==m||e[13]!==f||e[14]!==u)h=_Bn.default.createElement(IHe,{title:f,subtitle:"AWS access keys",fields:Zmp,values:u,onChange:A,onSubmit:m,onCancel:t,submitLabel:"Continue"}),e[11]=t,e[12]=m,e[13]=f,e[14]=u,e[15]=h;else h=e[15];return h}
var cHa,_Bn,Zmp;
var dHa=b(()=>{fUt();$y();cHa=M(rt(),1),_Bn=M(Te(),1),Zmp=[{type:"text",key:"accessKeyId",label:"Access key ID",placeholder:"AKIA\u2026",required:!0},{type:"text",key:"secretAccessKey",label:"Secret access key",mask:"*",required:!0},{type:"text",key:"sessionToken",label:"Session token",mask:"*",hint:()=>"Only needed for temporary credentials from STS. Leave empty for long-lived keys."}]});
export {uHa,cHa,_Bn,Zmp,dHa};
