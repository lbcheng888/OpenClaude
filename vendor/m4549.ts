// @ts-nocheck
import {Or,ss} from "./m2553.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Box} from "./m2432.ts";
import {ga,rh} from "./m2550.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Pml(e){let t=Dml.c(13),{initialLanguage:n,onComplete:r,onCancel:o}=e,[s,i]=FAo.useState(n),[a,l]=FAo.useState((n??"").length),c;if(t[0]===Symbol.for("react.memo_cache_sentinel"))c={context:"Settings"},t[0]=c;else c=t[0];Or("confirm:no",o,c);let u;if(t[1]!==s||t[2]!==r)u=function(){let y=s?.trim();r(y||void 0)},t[1]=s,t[2]=r,t[3]=u;else u=t[3];let d=u,p;if(t[4]===Symbol.for("react.memo_cache_sentinel"))p=oPe.jsx(Text,{children:"Enter your preferred response and voice language:"}),t[4]=p;else p=t[4];let m;if(t[5]===Symbol.for("react.memo_cache_sentinel"))m=oPe.jsx(Text,{children:Xe.pointer}),t[5]=m;else m=t[5];let f=s??"",h;if(t[6]!==a||t[7]!==d||t[8]!==f)h=oPe.jsxs(Box,{flexDirection:"row",gap:1,children:[m,oPe.jsx(ga,{value:f,onChange:i,onSubmit:d,focus:!0,showCursor:!0,placeholder:`e.g., Japanese, \u65E5\u672C\u8A9E, Espa\xF1ol${Xe.ellipsis}`,columns:60,cursorOffset:a,onChangeCursorOffset:l})]}),t[6]=a,t[7]=d,t[8]=f,t[9]=h;else h=t[9];let g;if(t[10]===Symbol.for("react.memo_cache_sentinel"))g=oPe.jsx(Text,{dimColor:!0,children:"Leave empty for default (English)"}),t[10]=g;else g=t[10];let _;if(t[11]!==h)_=oPe.jsxs(Box,{flexDirection:"column",gap:1,children:[p,h,g]}),t[11]=h,t[12]=_;else _=t[12];return _}
var Dml,FAo,oPe;
var Oml=b(()=>{Zs();je();ss();rh();Dml=x(tt(),1),FAo=x(et(),1),oPe=x(oe(),1)});
export {Pml,Dml,FAo,oPe,Oml};
