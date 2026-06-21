// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {f5n,YTo} from "./m4591.ts";
import {Text} from "./m2423.ts";
import {pr} from "./m2562.ts";
import {Kn,Li} from "./m2572.ts";
import {ze} from "./m2452.ts";
import {yb} from "./m4521.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var ssc={};
isFullscreenWithTTY(ssc,{InvalidSettingsDialog:()=>InvalidSettingsDialog});
function InvalidSettingsDialog(e){let t=osc.c(21),{settingsErrors:n,onContinue:r,onFix:o,onExit:s}=e,i;if(t[0]!==r||t[1]!==s||t[2]!==o)i=function(T){if(T==="exit")s();else if(T==="fix")o();else r()},t[0]=r,t[1]=s,t[2]=o,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==n)l=n.some(C3m),t[4]=n,t[5]=l;else l=t[5];let c=l,u;if(t[6]!==c)u=c?[{label:"Fix with Claude",value:"fix"},{label:"Exit and fix manually",value:"exit"},{label:"Continue without these settings",value:"continue"}]:[{label:"Continue",value:"continue"},{label:"Fix with Claude",value:"fix"},{label:"Exit and fix manually",value:"exit"}],t[6]=c,t[7]=u;else u=t[7];let d=u,p=c?"Settings Error":"Settings Warning",m=c?s:r,f;if(t[8]!==n)f=CVt.default.createElement(f5n,{errors:n}),t[8]=n,t[9]=f;else f=t[9];let A=c?"Files with errors are skipped entirely, not just the invalid settings.":"The values listed above were skipped; the rest of the file is in effect.",h;if(t[10]!==A)h=CVt.default.createElement(Text,{dimColor:!0},A),t[10]=A,t[11]=h;else h=t[11];let g;if(t[12]!==a||t[13]!==d)g=CVt.default.createElement(pr,{options:d,onChange:a}),t[12]=a,t[13]=d,t[14]=g;else g=t[14];let _;if(t[15]!==p||t[16]!==m||t[17]!==f||t[18]!==h||t[19]!==g)_=CVt.default.createElement(Kn,{title:p,onCancel:m,color:"warning"},f,h,g),t[15]=p,t[16]=m,t[17]=f,t[18]=h,t[19]=g,t[20]=_;else _=t[20];return _}
function C3m(e){return e.severity!=="warning"}
var osc,CVt;
var isc=b(()=>{ze();yb();Li();YTo();osc=M(rt(),1),CVt=M(Te(),1)});
export {ssc,InvalidSettingsDialog,C3m,osc,CVt,isc};
