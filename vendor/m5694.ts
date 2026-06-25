// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {YKn,cvo} from "./m4619.ts";
import {Text} from "./m2433.ts";
import {hr} from "./m2573.ts";
import {preInitQueue,di} from "./m2583.ts";
import {je} from "./m2462.ts";
import {TS} from "./m4541.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var jmc={};
ft(jmc,{InvalidSettingsDialog:()=>InvalidSettingsDialog});
function InvalidSettingsDialog(e){let t=zmc.c(21),{settingsErrors:n,onContinue:r,onFix:o,onExit:s}=e,i;if(t[0]!==r||t[1]!==s||t[2]!==o)i=function(S){if(S==="exit")s();else if(S==="fix")o();else r()},t[0]=r,t[1]=s,t[2]=o,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==n)l=n.some(XKm),t[4]=n,t[5]=l;else l=t[5];let c=l,u;if(t[6]!==c)u=c?[{label:"Fix with Claude",value:"fix"},{label:"Exit and fix manually",value:"exit"},{label:"Continue without these settings",value:"continue"}]:[{label:"Continue",value:"continue"},{label:"Fix with Claude",value:"fix"},{label:"Exit and fix manually",value:"exit"}],t[6]=c,t[7]=u;else u=t[7];let d=u,p=c?"Settings Error":"Settings Warning",m=c?s:r,f;if(t[8]!==n)f=Vyt.jsx(YKn,{errors:n}),t[8]=n,t[9]=f;else f=t[9];let h=c?"Files with errors are skipped entirely, not just the invalid settings.":"The values listed above were skipped; the rest of the file is in effect.",g;if(t[10]!==h)g=Vyt.jsx(Text,{dimColor:!0,children:h}),t[10]=h,t[11]=g;else g=t[11];let _;if(t[12]!==a||t[13]!==d)_=Vyt.jsx(hr,{options:d,onChange:a}),t[12]=a,t[13]=d,t[14]=_;else _=t[14];let T;if(t[15]!==p||t[16]!==m||t[17]!==f||t[18]!==g||t[19]!==_)T=Vyt.jsxs(preInitQueue,{title:p,onCancel:m,color:"warning",children:[f,g,_]}),t[15]=p,t[16]=m,t[17]=f,t[18]=g,t[19]=_,t[20]=T;else T=t[20];return T}
function XKm(e){return e.severity!=="warning"}
var zmc,Vyt;
var Ymc=b(()=>{je();TS();di();cvo();zmc=x(tt(),1),Vyt=x(oe(),1)});
export {jmc,InvalidSettingsDialog,XKm,zmc,Vyt,Ymc};
