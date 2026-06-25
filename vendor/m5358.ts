// @ts-nocheck
import {useClock} from "./m2442.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function _zl({maxBufferSize:e,debounceMs:t}){let n=useClock(),r=cde.useRef({entries:[],index:-1}),[o,s]=cde.useState(r.current),i=cde.useRef(0),a=cde.useRef(null),l=cde.useCallback((p,m,f={},h={})=>{let g=Date.now();if(a.current)a.current(),a.current=null;if(!h.immediate&&g-i.current<t){a.current=n.setTimeout(()=>l(p,m,f),t);return}i.current=g;let _=r.current;if(_.entries[_.index]?.text===p)return;let T=[..._.entries.slice(0,_.index+1),{text:p,cursorOffset:m,pastedContents:f,timestamp:g}],y=T.length>e?T.slice(-e):T;r.current={entries:y,index:y.length-1},s(r.current)},[t,e,n]),c=cde.useCallback(()=>{if(a.current)a.current(),a.current=null;let p=r.current,m=p.entries[p.index];if(!m)return;return r.current={entries:p.entries,index:p.index-1},s(r.current),m},[]),u=cde.useCallback(()=>{if(r.current={entries:[],index:-1},s(r.current),i.current=0,a.current)a.current(),a.current=null},[]),d=o.index>=0&&o.entries[o.index]!==void 0;return{pushToBuffer:l,undo:c,canUndo:d,clearBuffer:u}}
var cde;
var yzl=b(()=>{je();cde=x(et(),1)});
export {_zl,cde,yzl};
