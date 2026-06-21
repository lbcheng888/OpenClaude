// @ts-nocheck
import {Or,Ts} from "./m2542.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Box} from "./m2422.ts";
import {Pa,rh} from "./m2539.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function jil(e){let t=qil.c(13),{initialLanguage:n,onComplete:r,onCancel:o}=e,[s,i]=cue.useState(n),[a,l]=cue.useState((n??"").length),c;if(t[0]===Symbol.for("react.memo_cache_sentinel"))c={context:"Settings"},t[0]=c;else c=t[0];Or("confirm:no",o,c);let u;if(t[1]!==s||t[2]!==r)u=function(){let y=s?.trim();r(y||void 0)},t[1]=s,t[2]=r,t[3]=u;else u=t[3];let d=u,p;if(t[4]===Symbol.for("react.memo_cache_sentinel"))p=cue.default.createElement(Text,null,"Enter your preferred response and voice language:"),t[4]=p;else p=t[4];let m;if(t[5]===Symbol.for("react.memo_cache_sentinel"))m=cue.default.createElement(Text,null,et.pointer),t[5]=m;else m=t[5];let f=s??"",A;if(t[6]!==a||t[7]!==d||t[8]!==f)A=cue.default.createElement(Box,{flexDirection:"row",gap:1},m,cue.default.createElement(Pa,{value:f,onChange:i,onSubmit:d,focus:!0,showCursor:!0,placeholder:`e.g., Japanese, \u65E5\u672C\u8A9E, Espa\xF1ol${et.ellipsis}`,columns:60,cursorOffset:a,onChangeCursorOffset:l})),t[6]=a,t[7]=d,t[8]=f,t[9]=A;else A=t[9];let h;if(t[10]===Symbol.for("react.memo_cache_sentinel"))h=cue.default.createElement(Text,{dimColor:!0},"Leave empty for default (English)"),t[10]=h;else h=t[10];let g;if(t[11]!==A)g=cue.default.createElement(Box,{flexDirection:"column",gap:1},p,A,h),t[11]=A,t[12]=g;else g=t[12];return g}
var qil,cue;
var Wil=b(()=>{Ai();ze();Ts();rh();qil=M(rt(),1),cue=M(Te(),1)});
export {jil,qil,cue,Wil};
