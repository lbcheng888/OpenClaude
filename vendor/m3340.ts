// @ts-nocheck
import {truncate,EH} from "./m237.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function $ke(e){let t=Xca.c(20),{title:n,subtitle:r,color:o,workerBadge:s,requestSource:i,srPrefix:a}=e,l=o===void 0?"permission":o,c=i?.workflowName,u;if(t[0]!==c)u=c!==void 0?truncate(c,24,!0):void 0,t[0]=c,t[1]=u;else u=t[1];let d=u,p=a!==void 0?`${a} ${n}`:void 0,m;if(t[2]!==l||t[3]!==p||t[4]!==n)m=m9.createElement(Text,{"aria-label":p,bold:!0,color:l},n),t[2]=l,t[3]=p,t[4]=n,t[5]=m;else m=t[5];let f;if(t[6]!==s)f=s&&m9.createElement(Text,{dimColor:!0},"\xB7 ","@",s.name),t[6]=s,t[7]=f;else f=t[7];let A;if(t[8]!==i?.type||t[9]!==d)A=i?.type==="workflow-agent"&&m9.createElement(Text,null,m9.createElement(Text,{dimColor:!0},"\xB7 "),d!==void 0?`from the "${d}" workflow`:"from a workflow"),t[8]=i?.type,t[9]=d,t[10]=A;else A=t[10];let h;if(t[11]!==m||t[12]!==f||t[13]!==A)h=m9.createElement(Box,{flexDirection:"row",gap:1},m,f,A),t[11]=m,t[12]=f,t[13]=A,t[14]=h;else h=t[14];let g;if(t[15]!==r)g=r!=null&&(typeof r==="string"?m9.createElement(Text,{dimColor:!0,wrap:"truncate-start"},r):r),t[15]=r,t[16]=g;else g=t[16];let _;if(t[17]!==h||t[18]!==g)_=m9.createElement(Box,{flexDirection:"column"},h,g),t[17]=h,t[18]=g,t[19]=_;else _=t[19];return _}
var Xca,m9;
var CNt=b(()=>{ze();EH();Xca=M(rt(),1),m9=M(Te(),1)});
export {$ke,Xca,m9,CNt};
