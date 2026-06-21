// @ts-nocheck
import {B4,CZe,rwe} from "./m2381.ts";
import {XUa,QUa,$$t} from "../src/config/4060_hunks.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function _To(e=0){let n=_J.useContext(B4)?.setTimeout??CZe,[r,o]=_J.useState(null),[s,i]=_J.useState(gTo),[a,l]=_J.useState(!0),c=_J.useRef(!1);return _J.useEffect(()=>{let u=!1,d=new AbortController;async function p(){try{let f=await XUa(d.signal);if(u)return;let A=f?.source.kind==="branch"?f.source.baseRef:"HEAD",h=await QUa(d.signal,A);if(u)return;if(f!==null)o(f);else if(!c.current)o(null);if(h!==null)i(h);else if(!c.current)i(gTo);c.current=!0,l(!1)}catch(f){if(u)return;if(!c.current)o(null),i(gTo);c.current=!0,l(!1)}}let m=n(p,c.current?hVp:0);return()=>{u=!0,m(),d.abort()}},[e]),_J.useMemo(()=>{if(!r)return{stats:null,files:[],hunks:new Map,loading:a,source:{kind:"working-tree"}};let{stats:u,perFileStats:d,source:p}=r,m=[];for(let[f,A]of d){let h=A.isUntracked,g=s.skippedLarge.has(f),_=A.added+A.removed,y=!g&&!A.isBinary&&_>AVp;m.push({path:f,linesAdded:A.added,linesRemoved:A.removed,isBinary:A.isBinary,isLargeFile:g,isTruncated:y,isUntracked:h})}return m.sort((f,A)=>f.path.localeCompare(A.path)),{stats:u,files:m,hunks:s.hunks,loading:!1,source:p}},[r,s,a])}
var _J,AVp=400,hVp=150,gTo;
var yTo=b(()=>{rwe();$$t();_J=M(Te(),1),gTo={hunks:new Map,skippedLarge:new Set}});
export {_To,_J,AVp,hVp,gTo,yTo};
