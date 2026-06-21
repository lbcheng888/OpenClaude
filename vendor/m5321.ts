// @ts-nocheck
import {useClock} from "./m2432.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function cql({maxBufferSize:e,debounceMs:t}){let n=useClock(),r=nde.useRef({entries:[],index:-1}),[o,s]=nde.useState(r.current),i=nde.useRef(0),a=nde.useRef(null),l=nde.useCallback((p,m,f={},A={})=>{let h=Date.now();if(a.current)a.current(),a.current=null;if(!A.immediate&&h-i.current<t){a.current=n.setTimeout(()=>l(p,m,f),t);return}i.current=h;let g=r.current;if(g.entries[g.index]?.text===p)return;let _=[...g.entries.slice(0,g.index+1),{text:p,cursorOffset:m,pastedContents:f,timestamp:h}],y=_.length>e?_.slice(-e):_;r.current={entries:y,index:y.length-1},s(r.current)},[t,e,n]),c=nde.useCallback(()=>{if(a.current)a.current(),a.current=null;let p=r.current,m=p.entries[p.index];if(!m)return;return r.current={entries:p.entries,index:p.index-1},s(r.current),m},[]),u=nde.useCallback(()=>{if(r.current={entries:[],index:-1},s(r.current),i.current=0,a.current)a.current(),a.current=null},[]),d=o.index>=0&&o.entries[o.index]!==void 0;return{pushToBuffer:l,undo:c,canUndo:d,clearBuffer:u}}
var nde;
var uql=b(()=>{ze();nde=M(Te(),1)});
export {cql,nde,uql};
