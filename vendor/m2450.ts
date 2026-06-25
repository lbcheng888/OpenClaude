// @ts-nocheck
import {gie,wtt} from "./m2400.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Dxi(e,t){if(!e?.yogaNode||!t)return null;let n=e.yogaNode.getComputedHeight(),r=t.rows,o=e.yogaNode.getComputedTop(),s=e.parentNode,i=e.yogaNode;while(s){if(s.yogaNode)o+=s.yogaNode.getComputedTop(),i=s.yogaNode;if(s.scrollTop)o-=s.scrollTop;s=s.parentNode}let a=i.getComputedHeight(),l=o+n,c=a>r?1:0,u=Math.max(0,a-r)+c,d=u+r;if(n===0)return o>=u&&o<d;return l>u&&o<d}
function useTerminalViewport(){let e=q8.useContext(gie),t=q8.useRef(null),n=q8.useRef({isVisible:!0}),r=q8.useCallback((c)=>{t.current=c},[]);function o(){let c=Dxi(t.current,e);if(c===null)return n.current.isVisible;if(c!==n.current.isVisible)n.current={isVisible:c};return c}let s=q8.useRef(o);s.current=o;let i=q8.useCallback(()=>s.current(),[]),a=q8.useRef(e);a.current=e;let l=q8.useCallback(()=>Dxi(t.current,a.current),[]);return q8.useLayoutEffect(()=>{o()}),[r,n.current,i,l]}
var q8;
var $Pt=b(()=>{wtt();q8=x(et(),1)});
export {Dxi,useTerminalViewport,q8,$Pt};
