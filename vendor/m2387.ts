// @ts-nocheck
import {YR,v2r} from "./m2375.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function CSn(e,t,n,r){if(e===void 0&&t===void 0&&n===void 0&&r===void 0)return;return{hidden:e,label:t,role:n,state:r}}
function jid({children:e,ref:t,tabIndex:n,autoFocus:r,onClick:o,onFocus:s,onFocusCapture:i,onBlur:a,onBlurCapture:l,onMouseEnter:c,onMouseLeave:u,hoverIgnoresBlankCells:d,onKeyDown:p,onKeyDownCapture:m,onPaste:f,onPasteCapture:A,onWheel:h,onWheelCapture:g,keybindingScope:_,onAction:y,onActionCapture:T,"aria-hidden":S,"aria-label":v,"aria-role":R,"aria-state":k,...x}){if(YR(x.margin,"margin"),YR(x.marginX,"marginX"),YR(x.marginY,"marginY"),YR(x.marginTop,"marginTop"),YR(x.marginBottom,"marginBottom"),x.marginLeft!=="auto")YR(x.marginLeft,"marginLeft");if(x.marginRight!=="auto")YR(x.marginRight,"marginRight");return YR(x.padding,"padding"),YR(x.paddingX,"paddingX"),YR(x.paddingY,"paddingY"),YR(x.paddingTop,"paddingTop"),YR(x.paddingBottom,"paddingBottom"),YR(x.paddingLeft,"paddingLeft"),YR(x.paddingRight,"paddingRight"),YR(x.gap,"gap"),YR(x.columnGap,"columnGap"),YR(x.rowGap,"rowGap"),x.flexWrap??="nowrap",x.flexDirection??="row",x.flexGrow??=0,x.flexShrink??=1,x.overflowX=x.overflowX??x.overflow??"visible",x.overflowY=x.overflowY??x.overflow??"visible",_Ci.default.createElement("ink-box",{ref:t,tabIndex:n,autoFocus:r,onClick:o,onFocus:s,onFocusCapture:i,onBlur:a,onBlurCapture:l,onMouseEnter:c,onMouseLeave:u,hoverIgnoresBlankCells:d,onKeyDown:p,onKeyDownCapture:m,onPaste:f,onPasteCapture:A,onWheel:h,onWheelCapture:g,keybindingScope:_,onAction:y,onActionCapture:T,accessibility:CSn(S,v,R,k),style:x},e)}
var _Ci,BaseBox;
var LZ=b(()=>{v2r();_Ci=M(Te(),1);BaseBox=jid});
export {CSn,jid,_Ci,BaseBox,LZ};
