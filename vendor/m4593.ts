// @ts-nocheck
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function _gl(e){let t=hgl.c(3),{children:n}=e,r=Zft.useRef(null),o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o={setHandler:(a)=>{r.current=a},tryDelete:(a)=>r.current?.(a)??!1},t[0]=o;else o=t[0];let s=o,i;if(t[1]!==n)i=ygl.jsx(ggl.Provider,{value:s,children:n}),t[1]=n,t[2]=i;else i=t[2];return i}
function xKn(){return Zft.useContext(ggl)}
var hgl,Zft,ygl,ggl;
var DKn=b(()=>{hgl=x(tt(),1),Zft=x(et(),1),ygl=x(oe(),1),ggl=Zft.createContext({setHandler:()=>{},tryDelete:()=>!1})});
export {_gl,xKn,hgl,Zft,ygl,ggl,DKn};
