// @ts-nocheck
import {Text} from "./m2423.ts";
import {Ab,Rte} from "./m3925.ts";
import {formatNumber,ps} from "./m238.ts";
import {uUn,kte} from "./m3926.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function GLa(e){let t=WLa.c(32),{agentType:n,description:r,name:o,descriptionColor:s,taskDescription:i,toolUseCount:a,tokens:l,color:c,isLast:u,isResolved:d,isAsync:p,lastToolInfo:m,hideType:f}=e,A=p===void 0?!1:p,h=f===void 0?!1:f,g=A&&d,_;if(t[0]!==g||t[1]!==d||t[2]!==m||t[3]!==i)_=()=>{if(!d)return m||"Initializing\u2026";if(g)return i??"Running in the background";return"Done"},t[0]=g,t[1]=d,t[2]=m,t[3]=i,t[4]=_;else _=t[4];let y=_,T=u?"last":"branch",S;if(t[5]!==T)S=[T],t[5]=T,t[6]=S;else S=t[6];let v=!d,R;if(t[7]!==n||t[8]!==c||t[9]!==r||t[10]!==s||t[11]!==h||t[12]!==o)R=h?Wf.createElement(Wf.Fragment,null,Wf.createElement(Text,{bold:!0},o??r??n),o&&r&&Wf.createElement(Text,{dimColor:!0},": ",r)):Wf.createElement(Wf.Fragment,null,Wf.createElement(Ab,{color:c,bold:!0},n),r&&Wf.createElement(Wf.Fragment,null," (",Wf.createElement(Ab,{color:s},r),")")),t[7]=n,t[8]=c,t[9]=r,t[10]=s,t[11]=h,t[12]=o,t[13]=R;else R=t[13];let k;if(t[14]!==g||t[15]!==l||t[16]!==a)k=!g&&Wf.createElement(Wf.Fragment,null," \xB7 ",a," tool ",a===1?"use":"uses",l!==null&&Wf.createElement(Wf.Fragment,null," \xB7 ",formatNumber(l)," tokens")),t[14]=g,t[15]=l,t[16]=a,t[17]=k;else k=t[17];let x;if(t[18]!==v||t[19]!==R||t[20]!==k)x=Wf.createElement(Text,{dimColor:v},R,k),t[18]=v,t[19]=R,t[20]=k,t[21]=x;else x=t[21];let H;if(t[22]!==S||t[23]!==x)H=Wf.createElement(uUn,{connectors:S},x),t[22]=S,t[23]=x,t[24]=H;else H=t[24];let I;if(t[25]!==y||t[26]!==g||t[27]!==u)I=!g&&Wf.createElement(uUn,{connectors:[u?"space":"pipe"]},Wf.createElement(Text,{dimColor:!0},"\u23BF  ",y())),t[25]=y,t[26]=g,t[27]=u,t[28]=I;else I=t[28];let P;if(t[29]!==H||t[30]!==I)P=Wf.createElement(Box,{flexDirection:"column",paddingLeft:3},H,I),t[29]=H,t[30]=I,t[31]=P;else P=t[31];return P}
var WLa,Wf;
var VLa=b(()=>{ze();ps();Rte();kte();WLa=M(rt(),1),Wf=M(Te(),1)});
export {GLa,WLa,Wf,VLa};
