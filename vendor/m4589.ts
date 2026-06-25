// @ts-nocheck
import {s4,Rtt,$ve} from "./m2391.ts";
import {aUa,lUa,t3t} from "../src/config/3927_hunks.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function DRo(e=0){let n=rJ.useContext(s4)?.setTimeout??Rtt,[r,o]=rJ.useState(null),[s,i]=rJ.useState(xRo),[a,l]=rJ.useState(!0),c=rJ.useRef(!1);return rJ.useEffect(()=>{let u=!1,d=new AbortController;async function p(){try{let f=await aUa(d.signal);if(u)return;let h=f?.source.kind==="branch"?f.source.baseRef:"HEAD",g=await lUa(d.signal,h);if(u)return;if(f!==null)o(f);else if(!c.current)o(null);if(g!==null)i(g);else if(!c.current)i(xRo);c.current=!0,l(!1)}catch(f){if(u)return;if(!c.current)o(null),i(xRo);c.current=!0,l(!1)}}let m=n(p,c.current?Sem:0);return()=>{u=!0,m(),d.abort()}},[e]),rJ.useMemo(()=>{if(!r)return{stats:null,files:[],hunks:new Map,loading:a,source:{kind:"working-tree"}};let{stats:u,perFileStats:d,source:p}=r,m=[];for(let[f,h]of d){let g=h.isUntracked,_=s.skippedLarge.has(f),T=h.added+h.removed,y=!_&&!h.isBinary&&T>Tem;m.push({path:f,linesAdded:h.added,linesRemoved:h.removed,isBinary:h.isBinary,isLargeFile:_,isTruncated:y,isUntracked:g})}return m.sort((f,h)=>f.path.localeCompare(h.path)),{stats:u,files:m,hunks:s.hunks,loading:!1,source:p}},[r,s,a])}
var rJ,Tem=400,Sem=150,xRo;
var PRo=b(()=>{$ve();t3t();rJ=x(et(),1),xRo={hunks:new Map,skippedLarge:new Set}});
export {DRo,rJ,Tem,Sem,xRo,PRo};
