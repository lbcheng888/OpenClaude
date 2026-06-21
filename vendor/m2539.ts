// @ts-nocheck
import {useTheme} from "./m2274.ts";
import {useTerminalFocus} from "./m2380.ts";
import {NZ,gUe} from "../src/config/2421_gUe.ts";
import {useVoiceState,iAe} from "./m2457.ts";
import {hEn,o3r} from "./m2527.ts";
import {Bbn,I9r} from "./m2513.ts";
import {_t,cu} from "./m582.ts";
import {nUe,E5} from "../src/config/2288_level.ts";
import {pEn,t3r} from "./m2524.ts";
import {No} from "./m2421.ts";
import {Box} from "./m2422.ts";
import {_En,a3r} from "./m2538.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Pa(e){let[t]=useTheme(),n=useTerminalFocus(),r=j0t.useMemo(NZ,[]),s=useVoiceState((u)=>u.voiceState)==="recording",[i,a]=hEn();Bbn(n,!!e.onImagePaste);let l=!n?(u)=>u:a?()=>_t.hex(a.hex)(a.char):r?(u)=>u:nUe,c=pEn({value:e.value,onChange:e.onChange,onSubmit:e.onSubmit,onExit:e.onExit,onExitMessage:e.onExitMessage,onLeftArrowOnEmpty:e.onLeftArrowOnEmpty,onLeftArrowOnEmptyMessage:e.onLeftArrowOnEmptyMessage,onHistoryReset:e.onHistoryReset,onHistoryUp:e.onHistoryUp,onHistoryDown:e.onHistoryDown,onClearInput:e.onClearInput,focus:e.focus,mask:e.mask,multiline:e.multiline,cursorChar:e.showCursor?" ":"",highlightPastedText:e.highlightPastedText,invert:l,themeText:No("text",t),columns:e.columns,maxVisibleLines:e.maxVisibleLines,onImagePaste:e.onImagePaste,disableCursorMovementForUpDownKeys:e.disableCursorMovementForUpDownKeys,disableEscapeDoublePress:e.disableEscapeDoublePress,externalOffset:e.cursorOffset,onOffsetChange:e.onChangeCursorOffset,inputFilter:e.inputFilter,inlineGhostText:e.inlineGhostText,dim:_t.dim});return j0t.default.createElement(Box,{ref:i},j0t.default.createElement(_En,{inputState:c,terminalFocus:n,highlights:e.highlights,invert:l,hidePlaceholderText:s,cursorCellPainted:a!=null,...e}))}
var j0t;
var rh=b(()=>{cu();iAe();I9r();t3r();o3r();E5();ze();gUe();a3r();j0t=M(Te(),1)});
export {Pa,j0t,rh};
