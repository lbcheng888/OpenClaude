// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {ac,e_} from "./m3338.ts";
import {Kn,Li} from "./m2572.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var x1o={};
isFullscreenWithTTY(x1o,{ThirdPartyModelUpgradeDialog:()=>ThirdPartyModelUpgradeDialog});
function ThirdPartyModelUpgradeDialog(e){let t=Voc.c(27),{tierLabel:n,fromName:r,toName:o,toProviderId:s,onDone:i}=e,a=`Newer ${n} model available`,l;if(t[0]!==i)l=()=>i(!1),t[0]=i,t[1]=l;else l=t[1];let c;if(t[2]!==r)c=aX.default.createElement(Text,null,"Currently pinned: ",aX.default.createElement(Text,{bold:!0},r)),t[2]=r,t[3]=c;else c=t[3];let u;if(t[4]!==o)u=aX.default.createElement(Text,{bold:!0},o),t[4]=o,t[5]=u;else u=t[5];let d;if(t[6]!==s)d=aX.default.createElement(Text,{dimColor:!0},"(",s,")"),t[6]=s,t[7]=d;else d=t[7];let p;if(t[8]!==u||t[9]!==d)p=aX.default.createElement(Text,null,"Latest available: ",u," ",d),t[8]=u,t[9]=d,t[10]=p;else p=t[10];let m;if(t[11]!==c||t[12]!==p)m=aX.default.createElement(Box,{flexDirection:"column"},c,p),t[11]=c,t[12]=p,t[13]=m;else m=t[13];let f;if(t[14]===Symbol.for("react.memo_cache_sentinel"))f=aX.default.createElement(Text,{dimColor:!0},"Claude Code will restart to apply."),t[14]=f;else f=t[14];let A;if(t[15]!==o)A=aX.default.createElement(Text,null,"Update settings to use ",o,"?"," ",f),t[15]=o,t[16]=A;else A=t[16];let h;if(t[17]!==i)h=aX.default.createElement(ac,{onConfirm:()=>i(!0),onCancel:()=>i(!1)}),t[17]=i,t[18]=h;else h=t[18];let g;if(t[19]!==h||t[20]!==m||t[21]!==A)g=aX.default.createElement(Box,{flexDirection:"column",gap:1},m,A,h),t[19]=h,t[20]=m,t[21]=A,t[22]=g;else g=t[22];let _;if(t[23]!==a||t[24]!==g||t[25]!==l)_=aX.default.createElement(Kn,{title:a,color:"permission",onCancel:l},g),t[23]=a,t[24]=g,t[25]=l,t[26]=_;else _=t[26];return _}
var Voc,aX;
var k1o=b(()=>{ze();e_();Li();Voc=M(rt(),1),aX=M(Te(),1)});
export {x1o,ThirdPartyModelUpgradeDialog,Voc,aX,k1o};
