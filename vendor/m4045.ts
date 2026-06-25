// @ts-nocheck
import {useClock} from "./m2442.ts";
import {QS,Q2} from "./m2552.ts";
import {Cnt,ss} from "./m2553.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function f4a(e){return m4a.get(e)??e.normalize("NFKC")}
function _xe({inputValue:e,setInputValue:t,isValidDigit:n,onDigit:r,enabled:o=!0,once:s=!1,debounceMs:i=iDp,mountDelayMs:a=aDp}){let l=useClock(),c=_ce.useRef(e),u=_ce.useRef(!1),d=_ce.useRef(null),p=_ce.useRef(o?l.now():null),m=_ce.useRef(o);if(o&&!m.current)p.current=l.now();m.current=o;let f=_ce.useRef({setInputValue:t,isValidDigit:n,onDigit:r});f.current={setInputValue:t,isValidDigit:n,onDigit:r};let h=QS(),g=_ce.useRef(h);g.current=h,Cnt((_,T)=>{if(!T.return||T.shift||T.ctrl||T.meta||T.super||!o||s&&u.current)return;let y=g.current;if(y){let R=y.resolve(_,T,[...y.activeContexts,"Chat","Global"]);if(R.type!=="match"||R.action!=="chat:submit")return}if(p.current!==null&&l.now()-p.current<a)return;if(e===c.current||e.length!==1)return;let S=e.normalize("NFKC"),E=f.current.isValidDigit(S)?S:m4a.get(e)??S;if(!f.current.isValidDigit(E))return;if(d.current!==null)d.current(),d.current=null;return u.current=!0,f.current.setInputValue(""),f.current.onDigit(E),!0},{isActive:o}),_ce.useEffect(()=>{if(!o||s&&u.current)return;if(d.current!==null)d.current(),d.current=null;if(p.current!==null&&l.now()-p.current<a)return;if(e!==c.current&&e.length===1){let _=e.normalize("NFKC");if(f.current.isValidDigit(_))d.current=l.setTimeout(()=>{d.current=null,u.current=!0,f.current.setInputValue(""),f.current.onDigit(_)},i)}return()=>{if(d.current!==null)d.current(),d.current=null}},[e,o,s,i,a,l])}
var _ce,iDp=400,aDp=600,m4a;
var Y3t=b(()=>{je();Q2();ss();_ce=x(et(),1),m4a=new Map([["&","1"],["\xE9","2"],['"',"3"],["'","4"],["(","5"],["-","6"],["\xA7","6"],["\xE8","7"],["_","8"],["\xE7","9"],["\xE0","0"]])});
export {f4a,_xe,_ce,iDp,aDp,m4a,Y3t};
