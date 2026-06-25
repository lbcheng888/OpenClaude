// @ts-nocheck
import {QS,Q2} from "./m2552.ts";
import {xhe,zR} from "./m2562.ts";
import {Oo,ss} from "./m2553.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
function SBo(e){let t=RXl.c(8),{onSubmit:n,isActive:r}=e,o=QS(),s=xhe(),i;e:{if(!o){let m;if(t[0]===Symbol.for("react.memo_cache_sentinel"))m=new Set,t[0]=m;else m=t[0];i=m;break e}let p;if(t[1]!==o.bindings){p=new Set;for(let m of o.bindings)if(m.action?.startsWith("command:"))p.add(m.action);t[1]=o.bindings,t[2]=p}else p=t[2];i=p}let a=i,l;if(t[3]!==a||t[4]!==n){l={};for(let p of a){let m=p.slice(8);l[p]=()=>{n(`/${m}`,_2m,void 0,{fromKeybinding:!0})}}t[3]=a,t[4]=n,t[5]=l}else l=t[5];let c=l,u=r&&!s,d;if(t[6]!==u)d={context:"Chat",isActive:u},t[6]=u,t[7]=d;else d=t[7];return Oo(c,d),null}
var RXl,_2m;
var vXl=b(()=>{zR();Q2();ss();RXl=x(tt(),1),_2m={setCursorOffset:()=>{},clearBuffer:()=>{},resetHistory:()=>{}}});
export {SBo,RXl,_2m,vXl};
