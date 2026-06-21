// @ts-nocheck
import {Mie,_et} from "./m2532.ts";
import {U0t,s3r} from "./m2531.ts";
import {iP,gAe} from "./m2533.ts";
import {NZ,gUe} from "../src/config/2421_gUe.ts";
import {useIsScreenReaderEnabled,dwe} from "./m2434.ts";
import {OHi,LHi} from "./m2528.ts";
import {Box} from "./m2422.ts";
import {zHi,YHi} from "./m2537.ts";
import {Text} from "./m2423.ts";
import {Ansi} from "./m2431.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function _En({inputState:e,children:t,terminalFocus:n,invert:r,hidePlaceholderText:o,cursorCellPainted:s,...i}){let{handleKeyDown:a,renderedValue:l,cursorLine:c,cursorColumn:u}=e,d=Mie({line:c,column:u,active:Boolean(i.focus&&i.showCursor),visible:!s}),p=rL.useRef(null),m=rL.useCallback((N)=>{p.current=N,d(N)},[d]),{handleKeyDown:f,handlePaste:A,isPasting:h}=U0t({onPaste:i.onPaste,handleKeyDown:(N)=>{if(i.onKeyDownBefore?.(N),N.defaultPrevented||N.didStopImmediatePropagation())return;a(N)},onImagePaste:i.onImagePaste}),{onIsPastingChange:g}=i;rL.useEffect(()=>{if(g)g(h)},[h,g]);let _=i.focus!==!1;iP(p,_);let y=rL.useMemo(NZ,[]),T=useIsScreenReaderEnabled(),{showPlaceholder:S,renderedPlaceholder:v}=OHi({placeholder:i.placeholder,value:i.value,showCursor:i.showCursor&&!y,focus:i.focus,terminalFocus:n,invert:r,hidePlaceholderText:o||T}),R=_?{tabIndex:0,autoFocus:!0,onKeyDown:f,onPaste:A}:{},k=i.value&&i.value.trim().indexOf(" ")===-1||i.value&&i.value.endsWith(" "),x=Boolean(i.argumentHint&&i.value&&k&&i.value.startsWith("/")),H=i.showCursor&&i.highlights?i.highlights.filter((N)=>N.dimColor||i.cursorOffset<N.start||i.cursorOffset>=N.end):i.highlights,{viewportCharOffset:I,viewportCharEnd:P}=e,L=H&&I>0?H.filter((N)=>N.end>I&&N.start<P).map((N)=>({...N,start:Math.max(0,N.start-I),end:N.end-I})):H;if(L&&L.length>0)return rL.default.createElement(Box,{ref:m,...R},rL.default.createElement(Box,{flexShrink:0},rL.default.createElement(zHi,{text:l,highlights:L})),x&&rL.default.createElement(Text,{dimColor:!0,wrap:"truncate-end"},i.value?.endsWith(" ")?"":" ",i.argumentHint),t);return rL.default.createElement(Box,{ref:m,...R},rL.default.createElement(Text,{wrap:"truncate-end",dimColor:i.dimColor},S&&i.placeholderElement?i.placeholderElement:S&&v?rL.default.createElement(Ansi,null,v):rL.default.createElement(Ansi,null,l),x&&rL.default.createElement(Text,{dimColor:!0},i.value?.endsWith(" ")?"":" ",i.argumentHint),t))}
var rL;
var a3r=b(()=>{LHi();s3r();_et();dwe();gAe();ze();gUe();YHi();rL=M(Te(),1)});
export {_En,rL,a3r};
