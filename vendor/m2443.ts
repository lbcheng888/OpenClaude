// @ts-nocheck
import {useClock,g2e} from "./m2442.ts";
import {BaseBox,xZ} from "./m2397.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Wyd(e){let t=gxi.c(31),n,r,o,s,i,a;if(t[0]!==e)({onAction:o,tabIndex:a,autoFocus:n,children:r,ref:s,...i}=e),t[0]=e,t[1]=n,t[2]=r,t[3]=o,t[4]=s,t[5]=i,t[6]=a;else n=t[1],r=t[2],o=t[3],s=t[4],i=t[5],a=t[6];let l=a===void 0?0:a,[c,u]=Yve.useState(!1),[d,p]=Yve.useState(!1),[m,f]=Yve.useState(!1),h=useClock(),g=Yve.useRef(null),_,T;if(t[7]===Symbol.for("react.memo_cache_sentinel"))_=()=>()=>{g.current?.()},T=[],t[7]=_,t[8]=T;else _=t[7],T=t[8];Yve.useEffect(_,T);let y;if(t[9]!==h||t[10]!==o)y=(F)=>{if(F.key==="return"||F.key===" ")F.preventDefault(),f(!0),o(),g.current?.(),g.current=h.setTimeout(()=>f(!1),100)},t[9]=h,t[10]=o,t[11]=y;else y=t[11];let S=y,E;if(t[12]!==o)E=(F)=>{o()},t[12]=o,t[13]=E;else E=t[13];let R=E,w;if(t[14]===Symbol.for("react.memo_cache_sentinel"))w=(F)=>u(!0),t[14]=w;else w=t[14];let H=w,k;if(t[15]===Symbol.for("react.memo_cache_sentinel"))k=(F)=>u(!1),t[15]=k;else k=t[15];let I=k,D;if(t[16]===Symbol.for("react.memo_cache_sentinel"))D=()=>p(!0),t[16]=D;else D=t[16];let O=D,L;if(t[17]===Symbol.for("react.memo_cache_sentinel"))L=()=>p(!1),t[17]=L;else L=t[17];let P=L,M;if(t[18]!==r||t[19]!==m||t[20]!==c||t[21]!==d)M=typeof r==="function"?r({focused:c,hovered:d,active:m}):r,t[18]=r,t[19]=m,t[20]=c,t[21]=d,t[22]=M;else M=t[22];let B=M,N;if(t[23]!==n||t[24]!==B||t[25]!==R||t[26]!==S||t[27]!==s||t[28]!==i||t[29]!==l)N=_xi.jsx(BaseBox,{ref:s,tabIndex:l,autoFocus:n,onKeyDown:S,onClick:R,onFocus:H,onBlur:I,onMouseEnter:O,onMouseLeave:P,...i,children:B}),t[23]=n,t[24]=B,t[25]=R,t[26]=S,t[27]=s,t[28]=i,t[29]=l,t[30]=N;else N=t[30];return N}
var gxi,Yve,_xi,Button;
var yxi=b(()=>{g2e();xZ();gxi=x(tt(),1),Yve=x(et(),1),_xi=x(oe(),1);Button=Wyd});
export {Wyd,gxi,Yve,_xi,Button,yxi};
