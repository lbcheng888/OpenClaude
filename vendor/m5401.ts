// @ts-nocheck
import {getSettingsSchema,k$} from "./m2541.ts";
import {Pwe,ZR} from "./m2551.ts";
import {Wo,Ts} from "./m2542.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
function eLo(e){let t=$5l.c(8),{onSubmit:n,isActive:r}=e,o=getSettingsSchema(),s=Pwe(),i;e:{if(!o){let m;if(t[0]===Symbol.for("react.memo_cache_sentinel"))m=new Set,t[0]=m;else m=t[0];i=m;break e}let p;if(t[1]!==o.bindings){p=new Set;for(let m of o.bindings)if(m.action?.startsWith("command:"))p.add(m.action);t[1]=o.bindings,t[2]=p}else p=t[2];i=p}let a=i,l;if(t[3]!==a||t[4]!==n){l={};for(let p of a){let m=p.slice(8);l[p]=()=>{n(`/${m}`,lPm,void 0,{fromKeybinding:!0})}}t[3]=a,t[4]=n,t[5]=l}else l=t[5];let c=l,u=r&&!s,d;if(t[6]!==u)d={context:"Chat",isActive:u},t[6]=u,t[7]=d;else d=t[7];return Wo(c,d),null}
var $5l,lPm;
var q5l=b(()=>{ZR();k$();Ts();$5l=M(rt(),1),lPm={setCursorOffset:()=>{},clearBuffer:()=>{},resetHistory:()=>{}}});
export {eLo,$5l,lPm,q5l};
