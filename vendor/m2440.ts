// @ts-nocheck
import {gie,wZe} from "./m2390.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function fwi(e,t){if(!e?.yogaNode||!t)return null;let n=e.yogaNode.getComputedHeight(),r=t.rows,o=e.yogaNode.getComputedTop(),s=e.parentNode,i=e.yogaNode;while(s){if(s.yogaNode)o+=s.yogaNode.getComputedTop(),i=s.yogaNode;if(s.scrollTop)o-=s.scrollTop;s=s.parentNode}let a=i.getComputedHeight(),l=o+n,c=a>r?1:0,u=Math.max(0,a-r)+c,d=u+r;if(n===0)return o>=u&&o<d;return l>u&&o<d}
function useTerminalViewport(){let e=x5.useContext(gie),t=x5.useRef(null),n=x5.useRef({isVisible:!0}),r=x5.useCallback((c)=>{t.current=c},[]);function o(){let c=fwi(t.current,e);if(c===null)return n.current.isVisible;if(c!==n.current.isVisible)n.current={isVisible:c};return c}let s=x5.useRef(o);s.current=o;let i=x5.useCallback(()=>s.current(),[]),a=x5.useRef(e);a.current=e;let l=x5.useCallback(()=>fwi(t.current,a.current),[]);return x5.useLayoutEffect(()=>{o()}),[r,n.current,i,l]}
var x5;
var d0t=b(()=>{wZe();x5=M(Te(),1)});
export {fwi,useTerminalViewport,x5,d0t};
