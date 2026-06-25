// @ts-nocheck
import {b,x} from "../runtime.ts";
import {z6t,VY} from "./m4392.ts";
import {et} from "./m2261.ts";
function mJl({sessionKey:e,sendResponse:t,requestDialog:n}){let r=OSe.useRef(t);r.current=t;let o=OSe.useRef(n);o.current=n;let s=OSe.useRef(new Map),i=OSe.useCallback((l)=>{if(l.request.subtype!=="request_user_dialog")return;let{request:c,request_id:u}=l,d=CUm[c.dialog_kind];if(!d){r.current(u,{behavior:"cancelled"});return}let p=s.current,m=new AbortController;p.set(u,m),d(o.current,c.payload,{signal:m.signal}).then((f)=>{if(!p.delete(u))return;r.current(u,f)}).catch(()=>{if(!p.delete(u))return;r.current(u,{behavior:"cancelled"})})},[]),a=OSe.useCallback((l)=>{let c=s.current.get(l);if(c)s.current.delete(l),c.abort()},[]);return OSe.useEffect(()=>{let l=s.current;return()=>{for(let[c,u]of l)l.delete(c),u.abort()}},[e]),{dispatch:i,cancel:a}}
var OSe,CUm;
var fJl=b(()=>{z6t();OSe=x(et(),1),CUm={...{[VY.kind]:async(e,t,n)=>{let r=VY.payload().safeParse(t);if(!r.success)return{behavior:"cancelled"};let o=await e(VY,r.data,n);return o==="cancelled"?{behavior:"cancelled"}:{behavior:"completed",result:o}}}}});
export {mJl,OSe,CUm,fJl};
