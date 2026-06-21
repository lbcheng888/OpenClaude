// @ts-nocheck
import {Dl,lo} from "../src/tools/5190_userPromptCount.ts";
import {formatDuration,ps} from "./m238.ts";
import {Text} from "./m2423.ts";
import {fc,sl} from "./m715.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function REp(e){switch(e){case"completed":return"success";case"failed":return"error";case"killed":return"warning";default:return"text"}}
function sNa(e){let t=oNa.c(19),{addMargin:n,param:r}=e,{text:o}=r,s;if(t[0]!==o)s=Dl(o,"summary"),t[0]=o,t[1]=s;else s=t[1];let i=s;if(!i)return null;let a;if(t[2]!==o){let _=Dl(o,"status");a=REp(_),t[2]=o,t[3]=a}else a=t[3];let l=a,c;if(t[4]!==o)c=Dl(o,"duration_ms"),t[4]=o,t[5]=c;else c=t[5];let u=Number(c),d;if(t[6]!==u)d=Number.isFinite(u)&&u>0?` \xB7 ${formatDuration(u)}`:null,t[6]=u,t[7]=d;else d=t[7];let p=d,m=n?1:0,f;if(t[8]!==l)f=n_e.createElement(Text,{color:l},fc),t[8]=l,t[9]=f;else f=t[9];let A;if(t[10]!==p)A=p&&n_e.createElement(Text,{dimColor:!0},p),t[10]=p,t[11]=A;else A=t[11];let h;if(t[12]!==i||t[13]!==f||t[14]!==A)h=n_e.createElement(Text,null,f," ",i,A),t[12]=i,t[13]=f,t[14]=A,t[15]=h;else h=t[15];let g;if(t[16]!==m||t[17]!==h)g=n_e.createElement(Box,{marginTop:m},h),t[16]=m,t[17]=h,t[18]=g;else g=t[18];return g}
var oNa,n_e;
var iNa=b(()=>{sl();ze();ps();lo();oNa=M(rt(),1),n_e=M(Te(),1)});
export {REp,sNa,oNa,n_e,iNa};
