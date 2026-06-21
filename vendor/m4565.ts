// @ts-nocheck
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Bll(e){let t=Mll.c(3),{children:n}=e,r=mDe.useRef(null),o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o={setHandler:(a)=>{r.current=a},tryDelete:(a)=>r.current?.(a)??!1},t[0]=o;else o=t[0];let s=o,i;if(t[1]!==n)i=mDe.default.createElement(Nll.Provider,{value:s},n),t[1]=n,t[2]=i;else i=t[2];return i}
function X8n(){return mDe.useContext(Nll)}
var Mll,mDe,Nll;
var Q8n=b(()=>{Mll=M(rt(),1),mDe=M(Te(),1),Nll=mDe.createContext({setHandler:()=>{},tryDelete:()=>!1})});
export {Bll,X8n,Mll,mDe,Nll,Q8n};
