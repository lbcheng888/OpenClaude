// @ts-nocheck
import {xie,bnt} from "./m2543.ts";
import {_Ot,M5r} from "./m2542.ts";
import {bD,Ihe} from "./m2544.ts";
import {PZ,f2e} from "../src/config/2431_f2e.ts";
import {useIsScreenReaderEnabled,Jve} from "./m2444.ts";
import {tMi,nMi} from "./m2539.ts";
import {Box} from "./m2432.ts";
import {gMi,_Mi} from "./m2548.ts";
import {Text} from "./m2433.ts";
import {Ansi} from "./m2441.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function ivn({inputState:e,children:t,terminalFocus:n,invert:r,hidePlaceholderText:o,cursorCellPainted:s,...i}){let{handleKeyDown:a,renderedValue:l,cursorLine:c,cursorColumn:u}=e,d=xie({line:c,column:u,active:Boolean(i.focus&&i.showCursor),visible:!s}),p=fwe.useRef(null),m=fwe.useCallback((M)=>{p.current=M,d(M)},[d]),{handleKeyDown:f,handlePaste:h,isPasting:g}=_Ot({onPaste:i.onPaste,handleKeyDown:(M)=>{if(i.onKeyDownBefore?.(M),M.defaultPrevented||M.didStopImmediatePropagation())return;a(M)},onImagePaste:i.onImagePaste}),{onIsPastingChange:_}=i;fwe.useEffect(()=>{if(_)_(g)},[g,_]);let T=i.focus!==!1;bD(p,T);let y=fwe.useMemo(PZ,[]),S=useIsScreenReaderEnabled(),{showPlaceholder:E,renderedPlaceholder:R}=tMi({placeholder:i.placeholder,value:i.value,showCursor:i.showCursor&&!y,focus:i.focus,terminalFocus:n,invert:r,hidePlaceholderText:o||S}),w=T?{tabIndex:0,autoFocus:!0,onKeyDown:f,onPaste:h}:{},H=i.value&&i.value.trim().indexOf(" ")===-1||i.value&&i.value.endsWith(" "),k=Boolean(i.argumentHint&&i.value&&H&&i.value.startsWith("/")),I=i.showCursor&&i.highlights?i.highlights.filter((M)=>M.dimColor||i.cursorOffset<M.start||i.cursorOffset>=M.end):i.highlights,{viewportCharOffset:D,viewportCharEnd:O}=e,L=I&&D>0?I.filter((M)=>M.end>D&&M.start<O).map((M)=>({...M,start:Math.max(0,M.start-D),end:M.end-D})):I;if(L&&L.length>0)return WZ.jsxs(Box,{ref:m,...w,children:[WZ.jsx(Box,{flexShrink:0,children:WZ.jsx(gMi,{text:l,highlights:L})}),k&&WZ.jsxs(Text,{dimColor:!0,wrap:"truncate-end",children:[i.value?.endsWith(" ")?"":" ",i.argumentHint]}),t]});return WZ.jsx(Box,{ref:m,...w,children:WZ.jsxs(Text,{wrap:"truncate-end",dimColor:i.dimColor,children:[E&&i.placeholderElement?i.placeholderElement:E&&R?WZ.jsx(Ansi,{children:R}):WZ.jsx(Ansi,{children:l}),k&&WZ.jsxs(Text,{dimColor:!0,children:[i.value?.endsWith(" ")?"":" ",i.argumentHint]}),t]})})}
var fwe,WZ;
var N5r=b(()=>{nMi();M5r();bnt();Jve();Ihe();je();f2e();_Mi();fwe=x(et(),1),WZ=x(oe(),1)});
export {ivn,fwe,WZ,N5r};
