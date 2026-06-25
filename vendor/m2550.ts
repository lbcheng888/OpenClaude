// @ts-nocheck
import {useTheme} from "./m2285.ts";
import {useTerminalFocus} from "./m2390.ts";
import {PZ,f2e} from "../src/config/2431_f2e.ts";
import {useVoiceState,The} from "./m2467.ts";
import {rvn,ovn} from "./m2538.ts";
import {RRn,c5r} from "./m2524.ts";
import {bt,Gc} from "./m588.ts";
import {ZUe,N8} from "../src/config/2299_level.ts";
import {ZRn,P5r} from "./m2535.ts";
import {color} from "./m2431.ts";
import {Box} from "./m2432.ts";
import {ivn,N5r} from "./m2549.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function ga(e){let[t]=useTheme(),n=useTerminalFocus(),r=yMi.useMemo(PZ,[]),s=useVoiceState((u)=>u.voiceState)==="recording",[i,a]=rvn();RRn(n,!!e.onImagePaste);let l=!n?(u)=>u:a?()=>bt.hex(a.hex)(a.char):r?(u)=>u:ZUe,c=ZRn({value:e.value,onChange:e.onChange,onSubmit:e.onSubmit,onExit:e.onExit,onExitMessage:e.onExitMessage,onLeftArrowOnEmpty:e.onLeftArrowOnEmpty,onLeftArrowOnEmptyMessage:e.onLeftArrowOnEmptyMessage,onHistoryReset:e.onHistoryReset,onHistoryUp:e.onHistoryUp,onHistoryDown:e.onHistoryDown,onClearInput:e.onClearInput,focus:e.focus,mask:e.mask,multiline:e.multiline,cursorChar:e.showCursor?" ":"",highlightPastedText:e.highlightPastedText,invert:l,themeText:color("text",t),columns:e.columns,maxVisibleLines:e.maxVisibleLines,onImagePaste:e.onImagePaste,disableCursorMovementForUpDownKeys:e.disableCursorMovementForUpDownKeys,disableEscapeDoublePress:e.disableEscapeDoublePress,externalOffset:e.cursorOffset,onOffsetChange:e.onChangeCursorOffset,inputFilter:e.inputFilter,inlineGhostText:e.inlineGhostText,dim:bt.dim});return F5r.jsx(Box,{ref:i,children:F5r.jsx(ivn,{inputState:c,terminalFocus:n,highlights:e.highlights,invert:l,hidePlaceholderText:s,cursorCellPainted:a!=null,...e})})}
var yMi,F5r;
var rh=b(()=>{Gc();The();c5r();P5r();ovn();N8();je();f2e();N5r();yMi=x(et(),1),F5r=x(oe(),1)});
export {ga,yMi,F5r,rh};
