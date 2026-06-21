// @ts-nocheck
import {b,M} from "../runtime.ts";
import {S4t,cJ} from "./m4370.ts";
import {Te} from "./m2253.ts";
function k8l({sessionKey:e,sendResponse:t,requestDialog:n}){let r=nTe.useRef(t);r.current=t;let o=nTe.useRef(n);o.current=n;let s=nTe.useRef(new Map),i=nTe.useCallback((l)=>{if(l.request.subtype!=="request_user_dialog")return;let{request:c,request_id:u}=l,d=mDm[c.dialog_kind];if(!d){r.current(u,{behavior:"cancelled"});return}let p=s.current,m=new AbortController;p.set(u,m),d(o.current,c.payload,{signal:m.signal}).then((f)=>{if(!p.delete(u))return;r.current(u,f)}).catch(()=>{if(!p.delete(u))return;r.current(u,{behavior:"cancelled"})})},[]),a=nTe.useCallback((l)=>{let c=s.current.get(l);if(c)s.current.delete(l),c.abort()},[]);return nTe.useEffect(()=>{let l=s.current;return()=>{for(let[c,u]of l)l.delete(c),u.abort()}},[e]),{dispatch:i,cancel:a}}
var nTe,mDm;
var H8l=b(()=>{S4t();nTe=M(Te(),1),mDm={...{[cJ.kind]:async(e,t,n)=>{let r=cJ.payload().safeParse(t);if(!r.success)return{behavior:"cancelled"};let o=await e(cJ,r.data,n);return o==="cancelled"?{behavior:"cancelled"}:{behavior:"completed",result:o}}}}});
export {k8l,nTe,mDm,H8l};
