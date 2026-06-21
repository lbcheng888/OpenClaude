// @ts-nocheck
import {$ke,CNt} from "./m3340.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Tm(e){let t=Qca.c(16),{title:n,subtitle:r,color:o,titleColor:s,innerPaddingX:i,workerBadge:a,requestSource:l,titleRight:c,children:u}=e,d=o===void 0?"permission":o,p=i===void 0?1:i,m;if(t[0]!==l||t[1]!==r||t[2]!==n||t[3]!==s||t[4]!==a)m=Kee.createElement($ke,{title:n,subtitle:r,color:s,workerBadge:a,requestSource:l,srPrefix:"Permission Required:"}),t[0]=l,t[1]=r,t[2]=n,t[3]=s,t[4]=a,t[5]=m;else m=t[5];let f;if(t[6]!==m||t[7]!==c)f=Kee.createElement(Box,{paddingX:1,flexDirection:"column"},Kee.createElement(Box,{justifyContent:"space-between"},m,c)),t[6]=m,t[7]=c,t[8]=f;else f=t[8];let A;if(t[9]!==u||t[10]!==p)A=Kee.createElement(Box,{flexDirection:"column",paddingX:p},u),t[9]=u,t[10]=p,t[11]=A;else A=t[11];let h;if(t[12]!==d||t[13]!==f||t[14]!==A)h=Kee.createElement(Box,{flexDirection:"column",borderStyle:"round",borderColor:d,borderLeft:!1,borderRight:!1,borderBottom:!1,marginTop:1},f,A),t[12]=d,t[13]=f,t[14]=A,t[15]=h;else h=t[15];return h}
var Qca,Kee;
var Fk=b(()=>{ze();CNt();Qca=M(rt(),1),Kee=M(Te(),1)});
export {Tm,Qca,Kee,Fk};
