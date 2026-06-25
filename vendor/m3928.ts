// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {Text} from "./m2433.ts";
import {Yn,Pl} from "./m2465.ts";
import {h9e,j1t} from "./m3022.ts";
import {Box} from "./m2432.ts";
import {zn} from "../src/api/0465_getOauthConfig.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function J$n(e){let t=uUa.c(22),{filePath:n,structuredPatch:r,firstLine:o,fileContent:s,style:i,verbose:a,previewHint:l}=e,{columns:c}=_r(),u=r.reduce(Vkp,0),d=r.reduce(Wkp,0),p;if(t[0]!==u)p=u>0?DB.jsxs(DB.Fragment,{children:["Added ",DB.jsx(Text,{bold:!0,children:u})," ",u>1?"lines":"line"]}):null,t[0]=u,t[1]=p;else p=t[1];let m=u>0&&d>0?", ":null,f;if(t[2]!==u||t[3]!==d)f=d>0?DB.jsxs(DB.Fragment,{children:[u===0?"R":"r","emoved ",DB.jsx(Text,{bold:!0,children:d})," ",d>1?"lines":"line"]}):null,t[2]=u,t[3]=d,t[4]=f;else f=t[4];let h;if(t[5]!==p||t[6]!==m||t[7]!==f)h=DB.jsxs(Text,{children:[p,m,f]}),t[5]=p,t[6]=m,t[7]=f,t[8]=h;else h=t[8];let g=h;if(l){if(i!=="condensed"&&!a){let E;if(t[9]!==l)E=DB.jsx(Yn,{children:DB.jsx(Text,{dimColor:!0,children:l})}),t[9]=l,t[10]=E;else E=t[10];return E}}else if(i==="condensed"&&!a)return g;let _;if(t[11]!==g)_=DB.jsx(Text,{children:g}),t[11]=g,t[12]=_;else _=t[12];let T=c-12,y;if(t[13]!==s||t[14]!==n||t[15]!==o||t[16]!==r||t[17]!==T)y=DB.jsx(h9e,{hunks:r,dim:!1,width:T,filePath:n,firstLine:o,fileContent:s}),t[13]=s,t[14]=n,t[15]=o,t[16]=r,t[17]=T,t[18]=y;else y=t[18];let S;if(t[19]!==_||t[20]!==y)S=DB.jsx(Yn,{children:DB.jsxs(Box,{flexDirection:"column",children:[_,y]})}),t[19]=_,t[20]=y,t[21]=S;else S=t[21];return S}
function Wkp(e,t){return e+zn(t.lines,Gkp)}
function Gkp(e){return e.startsWith("-")}
function Vkp(e,t){return e+zn(t.lines,Kkp)}
function Kkp(e){return e.startsWith("+")}
var uUa,DB;
var Yuo=b(()=>{ui();je();Pl();j1t();uUa=x(tt(),1),DB=x(oe(),1)});
export {J$n,Wkp,Gkp,Vkp,Kkp,uUa,DB,Yuo};
