// @ts-nocheck
import {useClock} from "./m2432.ts";
import {getSettingsSchema,k$} from "./m2541.ts";
import {yet,Ts} from "./m2542.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function dIe({inputValue:e,setInputValue:t,isValidDigit:n,onDigit:r,enabled:o=!0,once:s=!1,debounceMs:i=pEp,mountDelayMs:a=mEp}){let l=useClock(),c=Tce.useRef(e),u=Tce.useRef(!1),d=Tce.useRef(null),p=Tce.useRef(o?l.now():null),m=Tce.useRef(o);if(o&&!m.current)p.current=l.now();m.current=o;let f=Tce.useRef({setInputValue:t,isValidDigit:n,onDigit:r});f.current={setInputValue:t,isValidDigit:n,onDigit:r};let A=getSettingsSchema(),h=Tce.useRef(A);h.current=A,yet((g,_)=>{if(!_.return||_.shift||_.ctrl||_.meta||_.super||!o||s&&u.current)return;let y=h.current;if(y){let S=y.resolve(g,_,[...y.activeContexts,"Chat","Global"]);if(S.type!=="match"||S.action!=="chat:submit")return}if(p.current!==null&&l.now()-p.current<a)return;if(e===c.current||e.length!==1)return;let T=e.normalize("NFKC");if(!f.current.isValidDigit(T))return;if(d.current!==null)d.current(),d.current=null;return u.current=!0,f.current.setInputValue(""),f.current.onDigit(T),!0},{isActive:o}),Tce.useEffect(()=>{if(!o||s&&u.current)return;if(d.current!==null)d.current(),d.current=null;if(p.current!==null&&l.now()-p.current<a)return;if(e!==c.current&&e.length===1){let g=e.normalize("NFKC");if(f.current.isValidDigit(g))d.current=l.setTimeout(()=>{d.current=null,u.current=!0,f.current.setInputValue(""),f.current.onDigit(g)},i)}return()=>{if(d.current!==null)d.current(),d.current=null}},[e,o,s,i,a,l])}
var Tce,pEp=400,mEp=600;
var a$t=b(()=>{ze();k$();Ts();Tce=M(Te(),1)});
export {dIe,Tce,pEp,mEp,a$t};
