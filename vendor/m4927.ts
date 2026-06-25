// @ts-nocheck
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Wxl(e){let t=$xl.c(4),{children:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=[],t[0]=r;else r=t[0];let o=ygt.useRef(r),s;if(t[1]===Symbol.for("react.memo_cache_sentinel"))s={getDenials:()=>o.current,recordDenial:(l)=>{o.current=[l,...o.current.slice(0,phm-1)]},removeDenial:(l)=>{o.current=o.current.filter((c)=>c!==l)}},t[1]=s;else s=t[1];let i=s,a;if(t[2]!==n)a=Gxl.jsx(qxl.Provider,{value:i,children:n}),t[2]=n,t[3]=a;else a=t[3];return a}
function Tgt(){return ygt.useContext(qxl)}
var $xl,ygt,Gxl,qxl,phm=20;
var PGt=b(()=>{$xl=x(tt(),1),ygt=x(et(),1),Gxl=x(oe(),1),qxl=ygt.createContext({getDenials:()=>[],recordDenial:()=>{},removeDenial:()=>{}})});
export {Wxl,Tgt,$xl,ygt,Gxl,qxl,phm,PGt};
