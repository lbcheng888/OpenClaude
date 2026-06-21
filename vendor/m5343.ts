// @ts-nocheck
import {useTheme} from "./m2274.ts";
import {useTerminalFocus} from "./m2380.ts";
import {NZ,gUe} from "../src/config/2421_gUe.ts";
import {Bbn,I9r} from "./m2513.ts";
import {$6l,q6l} from "./m5342.ts";
import {nUe,E5} from "../src/config/2288_level.ts";
import {No} from "./m2421.ts";
import {Box} from "./m2422.ts";
import {_En,a3r} from "./m2538.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function aOo(e){let[t]=useTheme(),n=useTerminalFocus(),r=s5e.useMemo(NZ,[]);Bbn(n,!!e.onImagePaste);let o=$6l({value:e.value,onChange:e.onChange,onSubmit:e.onSubmit,onExit:e.onExit,onExitMessage:e.onExitMessage,onLeftArrowOnEmpty:e.onLeftArrowOnEmpty,onLeftArrowOnEmptyMessage:e.onLeftArrowOnEmptyMessage,onHistoryReset:e.onHistoryReset,onHistoryUp:e.onHistoryUp,onHistoryDown:e.onHistoryDown,onClearInput:e.onClearInput,focus:e.focus,mask:e.mask,multiline:e.multiline,cursorChar:e.showCursor&&!r?" ":"",highlightPastedText:e.highlightPastedText,invert:n?nUe:(a)=>a,themeText:No("text",t),columns:e.columns,maxVisibleLines:e.maxVisibleLines,onImagePaste:e.onImagePaste,disableCursorMovementForUpDownKeys:e.disableCursorMovementForUpDownKeys,disableEscapeDoublePress:e.disableEscapeDoublePress,externalOffset:e.cursorOffset,onOffsetChange:e.onChangeCursorOffset,inputFilter:e.inputFilter,onModeChange:e.onModeChange,onUndo:e.onUndo,onOpenHistorySearch:e.onOpenHistorySearch}),{mode:s,setMode:i}=o;return s5e.useEffect(()=>{if(e.initialMode&&e.initialMode!==s)i(e.initialMode)},[e.initialMode,s,i]),s5e.default.createElement(Box,{flexDirection:"column"},s5e.default.createElement(_En,{inputState:o,terminalFocus:n,highlights:e.highlights,...e}))}
var s5e;
var j6l=b(()=>{I9r();q6l();E5();ze();gUe();a3r();s5e=M(Te(),1)});
export {aOo,s5e,j6l};
