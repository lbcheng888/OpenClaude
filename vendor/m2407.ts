// @ts-nocheck
import {Zg,dhe} from "./m2362.ts";
import {ClickEvent,kqr} from "./m2406.ts";
import {b} from "../runtime.ts";
function kPt(e,t,n){let r=Zg.get(e);if(!r)return null;let o=t>=r.x&&t<r.x+r.width&&n>=r.y&&n<r.y+r.height;if(!o&&!e.hasAbsoluteDescendant)return null;let s=null,i=!1;for(let a=e.childNodes.length-1;a>=0;a--){let l=e.childNodes[a];if(l.nodeName==="#text")continue;let c=Zg.get(l);if(!c)continue;let u=t>=c.x&&t<c.x+c.width&&n>=c.y&&n<c.y+c.height;if(!u&&!l.hasAbsoluteDescendant)continue;if(s!==null&&u)continue;let d=kPt(l,t,n);if(!d)continue;let p=!u;if(s===null||p&&!i)s=d,i=p;if(i)break}return s??(o?e:null)}
function GIi(e,t,n,r=!1,o){let s=kPt(e,t,n)??void 0;if(!s)return!1;if(e.focusManager){let l=s;while(l){if(typeof l.attributes.tabIndex==="number"){e.focusManager.handleClickFocus(l);break}l=l.parentNode}}let i=new ClickEvent(t,n,r,o),a=!1;while(s){let l=s._eventHandlers?.onClick;if(l){let c=Zg.get(s);if(c)i.localCol=t-c.x,i.localRow=n-c.y;if(i.defaultAllowed=!1,l(i),i.didStopImmediatePropagation())return!i.defaultAllowed;if(!i.defaultAllowed)a=!0}s=s.parentNode}return a}
function VIi(e,t,n,r,o=!1){let s=new Set,i=kPt(e,t,n)??void 0;while(i){let a=i._eventHandlers;if((a?.onMouseEnter||a?.onMouseLeave)&&!(o&&i.attributes.hoverIgnoresBlankCells))s.add(i);i=i.parentNode}for(let a of r)if(!s.has(a)){if(r.delete(a),a.parentNode)a._eventHandlers?.onMouseLeave?.()}for(let a of s)if(!r.has(a))r.add(a),a._eventHandlers?.onMouseEnter?.()}
var KIi=b(()=>{kqr();dhe()});
export {kPt,GIi,VIi,KIi};
