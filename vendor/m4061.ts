// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {Text} from "./m2423.ts";
import {Gn,sc} from "./m2455.ts";
import {p$e,TLt} from "./m3009.ts";
import {Box} from "./m2422.ts";
import {Wn} from "../src/api/0459_getOauthConfig.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function s$n(e){let t=e2a.c(22),{filePath:n,structuredPatch:r,firstLine:o,fileContent:s,style:i,verbose:a,previewHint:l}=e,{columns:c}=mr(),u=r.reduce(Pwp,0),d=r.reduce(Iwp,0),p;if(t[0]!==u)p=u>0?gb.createElement(gb.Fragment,null,"Added ",gb.createElement(Text,{bold:!0},u)," ",u>1?"lines":"line"):null,t[0]=u,t[1]=p;else p=t[1];let m=u>0&&d>0?", ":null,f;if(t[2]!==u||t[3]!==d)f=d>0?gb.createElement(gb.Fragment,null,u===0?"R":"r","emoved ",gb.createElement(Text,{bold:!0},d)," ",d>1?"lines":"line"):null,t[2]=u,t[3]=d,t[4]=f;else f=t[4];let A;if(t[5]!==p||t[6]!==m||t[7]!==f)A=gb.createElement(Text,null,p,m,f),t[5]=p,t[6]=m,t[7]=f,t[8]=A;else A=t[8];let h=A;if(l){if(i!=="condensed"&&!a){let S;if(t[9]!==l)S=gb.createElement(Gn,null,gb.createElement(Text,{dimColor:!0},l)),t[9]=l,t[10]=S;else S=t[10];return S}}else if(i==="condensed"&&!a)return h;let g;if(t[11]!==h)g=gb.createElement(Text,null,h),t[11]=h,t[12]=g;else g=t[12];let _=c-12,y;if(t[13]!==s||t[14]!==n||t[15]!==o||t[16]!==r||t[17]!==_)y=gb.createElement(p$e,{hunks:r,dim:!1,width:_,filePath:n,firstLine:o,fileContent:s}),t[13]=s,t[14]=n,t[15]=o,t[16]=r,t[17]=_,t[18]=y;else y=t[18];let T;if(t[19]!==g||t[20]!==y)T=gb.createElement(Gn,null,gb.createElement(Box,{flexDirection:"column"},g,y)),t[19]=g,t[20]=y,t[21]=T;else T=t[21];return T}
function Iwp(e,t){return e+Wn(t.lines,Dwp)}
function Dwp(e){return e.startsWith("-")}
function Pwp(e,t){return e+Wn(t.lines,Owp)}
function Owp(e){return e.startsWith("+")}
var e2a,gb;
var $lo=b(()=>{ki();ze();sc();TLt();e2a=M(rt(),1),gb=M(Te(),1)});
export {s$n,Iwp,Dwp,Pwp,Owp,e2a,gb,$lo};
