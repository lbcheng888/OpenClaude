// @ts-nocheck
import {useClock,yUe} from "./m2432.ts";
import {BaseBox,LZ} from "./m2387.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function _ld(e){let t=Zvi.c(31),n,r,o,s,i,a;if(t[0]!==e)({onAction:o,tabIndex:a,autoFocus:n,children:r,ref:s,...i}=e),t[0]=e,t[1]=n,t[2]=r,t[3]=o,t[4]=s,t[5]=i,t[6]=a;else n=t[1],r=t[2],o=t[3],s=t[4],i=t[5],a=t[6];let l=a===void 0?0:a,[c,u]=Sie.useState(!1),[d,p]=Sie.useState(!1),[m,f]=Sie.useState(!1),A=useClock(),h=Sie.useRef(null),g,_;if(t[7]===Symbol.for("react.memo_cache_sentinel"))g=()=>()=>{h.current?.()},_=[],t[7]=g,t[8]=_;else g=t[7],_=t[8];Sie.useEffect(g,_);let y;if(t[9]!==A||t[10]!==o)y=(U)=>{if(U.key==="return"||U.key===" ")U.preventDefault(),f(!0),o(),h.current?.(),h.current=A.setTimeout(()=>f(!1),100)},t[9]=A,t[10]=o,t[11]=y;else y=t[11];let T=y,S;if(t[12]!==o)S=(U)=>{o()},t[12]=o,t[13]=S;else S=t[13];let v=S,R;if(t[14]===Symbol.for("react.memo_cache_sentinel"))R=(U)=>u(!0),t[14]=R;else R=t[14];let k=R,x;if(t[15]===Symbol.for("react.memo_cache_sentinel"))x=(U)=>u(!1),t[15]=x;else x=t[15];let H=x,I;if(t[16]===Symbol.for("react.memo_cache_sentinel"))I=()=>p(!0),t[16]=I;else I=t[16];let P=I,L;if(t[17]===Symbol.for("react.memo_cache_sentinel"))L=()=>p(!1),t[17]=L;else L=t[17];let D=L,N;if(t[18]!==r||t[19]!==m||t[20]!==c||t[21]!==d)N=typeof r==="function"?r({focused:c,hovered:d,active:m}):r,t[18]=r,t[19]=m,t[20]=c,t[21]=d,t[22]=N;else N=t[22];let O=N,$;if(t[23]!==n||t[24]!==O||t[25]!==v||t[26]!==T||t[27]!==s||t[28]!==i||t[29]!==l)$=Sie.default.createElement(BaseBox,{ref:s,tabIndex:l,autoFocus:n,onKeyDown:T,onClick:v,onFocus:k,onBlur:H,onMouseEnter:P,onMouseLeave:D,...i},O),t[23]=n,t[24]=O,t[25]=v,t[26]=T,t[27]=s,t[28]=i,t[29]=l,t[30]=$;else $=t[30];return $}
var Zvi,Sie,Button;
var ewi=b(()=>{yUe();LZ();Zvi=M(rt(),1),Sie=M(Te(),1);Button=_ld});
export {_ld,Zvi,Sie,Button,ewi};
