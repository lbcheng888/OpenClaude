// @ts-nocheck
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function PCl(e){let t=ICl.c(4),{children:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=[],t[0]=r;else r=t[0];let o=YDe.useRef(r),s;if(t[1]===Symbol.for("react.memo_cache_sentinel"))s={getDenials:()=>o.current,recordDenial:(l)=>{o.current=[l,...o.current.slice(0,eim-1)]},removeDenial:(l)=>{o.current=o.current.filter((c)=>c!==l)}},t[1]=s;else s=t[1];let i=s,a;if(t[2]!==n)a=YDe.default.createElement(DCl.Provider,{value:i},n),t[2]=n,t[3]=a;else a=t[3];return a}
function ift(){return YDe.useContext(DCl)}
var ICl,YDe,DCl,eim=20;
var d8t=b(()=>{ICl=M(rt(),1),YDe=M(Te(),1),DCl=YDe.createContext({getDenials:()=>[],recordDenial:()=>{},removeDenial:()=>{}})});
export {PCl,ift,ICl,YDe,DCl,eim,d8t};
