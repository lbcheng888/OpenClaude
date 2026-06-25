// @ts-nocheck
import {useTheme} from "./m2285.ts";
import {useTerminalFocus} from "./m2390.ts";
import {PZ,f2e} from "../src/config/2431_f2e.ts";
import {RRn,c5r} from "./m2524.ts";
import {bfl,ZAo} from "./m4557.ts";
import {ZUe,N8} from "../src/config/2299_level.ts";
import {color} from "./m2431.ts";
import {Box} from "./m2432.ts";
import {ivn,N5r} from "./m2549.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function vFo(e){let[t]=useTheme(),n=useTerminalFocus(),r=Der.useMemo(PZ,[]);RRn(n,!!e.onImagePaste);let o=bfl({value:e.value,onChange:e.onChange,onSubmit:e.onSubmit,onExit:e.onExit,onExitMessage:e.onExitMessage,onLeftArrowOnEmpty:e.onLeftArrowOnEmpty,onLeftArrowOnEmptyMessage:e.onLeftArrowOnEmptyMessage,onHistoryReset:e.onHistoryReset,onHistoryUp:e.onHistoryUp,onHistoryDown:e.onHistoryDown,onClearInput:e.onClearInput,focus:e.focus,mask:e.mask,multiline:e.multiline,cursorChar:e.showCursor&&!r?" ":"",highlightPastedText:e.highlightPastedText,invert:n?ZUe:(a)=>a,themeText:color("text",t),columns:e.columns,maxVisibleLines:e.maxVisibleLines,onImagePaste:e.onImagePaste,disableCursorMovementForUpDownKeys:e.disableCursorMovementForUpDownKeys,disableEscapeDoublePress:e.disableEscapeDoublePress,externalOffset:e.cursorOffset,onOffsetChange:e.onChangeCursorOffset,inputFilter:e.inputFilter,onModeChange:e.onModeChange,onUndo:e.onUndo,onOpenHistorySearch:e.onOpenHistorySearch}),{mode:s,setMode:i}=o;return Der.useEffect(()=>{if(e.initialMode&&e.initialMode!==s)i(e.initialMode)},[e.initialMode,s,i]),RFo.jsx(Box,{flexDirection:"column",children:RFo.jsx(ivn,{inputState:o,terminalFocus:n,highlights:e.highlights,...e})})}
var Der,RFo;
var Sjl=b(()=>{c5r();ZAo();N8();je();f2e();N5r();Der=x(et(),1),RFo=x(oe(),1)});
export {vFo,Der,RFo,Sjl};
