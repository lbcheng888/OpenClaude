// @ts-nocheck
import {aw,rqr} from "./m2385.ts";
import {b,x} from "../runtime.ts";
import {oe} from "./m2275.ts";
function uAn(e,t,n,r){if(e===void 0&&t===void 0&&n===void 0&&r===void 0)return;return{hidden:e,label:t,role:n,state:r}}
function f_d({children:e,ref:t,tabIndex:n,autoFocus:r,onClick:o,onFocus:s,onFocusCapture:i,onBlur:a,onBlurCapture:l,onMouseEnter:c,onMouseLeave:u,hoverIgnoresBlankCells:d,onKeyDown:p,onKeyDownCapture:m,onPaste:f,onPasteCapture:h,onWheel:g,onWheelCapture:_,keybindingScope:T,onAction:y,onActionCapture:S,"aria-hidden":E,"aria-label":R,"aria-role":w,"aria-state":H,...k}){if(aw(k.margin,"margin"),aw(k.marginX,"marginX"),aw(k.marginY,"marginY"),aw(k.marginTop,"marginTop"),aw(k.marginBottom,"marginBottom"),k.marginLeft!=="auto")aw(k.marginLeft,"marginLeft");if(k.marginRight!=="auto")aw(k.marginRight,"marginRight");return aw(k.padding,"padding"),aw(k.paddingX,"paddingX"),aw(k.paddingY,"paddingY"),aw(k.paddingTop,"paddingTop"),aw(k.paddingBottom,"paddingBottom"),aw(k.paddingLeft,"paddingLeft"),aw(k.paddingRight,"paddingRight"),aw(k.gap,"gap"),aw(k.columnGap,"columnGap"),aw(k.rowGap,"rowGap"),k.flexWrap??="nowrap",k.flexDirection??="row",k.flexGrow??=0,k.flexShrink??=1,k.overflowX=k.overflowX??k.overflow??"visible",k.overflowY=k.overflowY??k.overflow??"visible",IIi.jsx("ink-box",{ref:t,tabIndex:n,autoFocus:r,onClick:o,onFocus:s,onFocusCapture:i,onBlur:a,onBlurCapture:l,onMouseEnter:c,onMouseLeave:u,hoverIgnoresBlankCells:d,onKeyDown:p,onKeyDownCapture:m,onPaste:f,onPasteCapture:h,onWheel:g,onWheelCapture:_,keybindingScope:T,onAction:y,onActionCapture:S,accessibility:uAn(E,R,w,H),style:k,children:e})}
var IIi,BaseBox;
var xZ=b(()=>{rqr();IIi=x(oe(),1);BaseBox=f_d});
export {uAn,f_d,IIi,BaseBox,xZ};
