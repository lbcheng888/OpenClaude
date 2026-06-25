// @ts-nocheck
import {useApp} from "./m2452.ts";
import {render,je} from "./m2462.ts";
import {bAn,i4} from "./m2426.ts";
import {cc} from "./m2459.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Ubp(){}
function py(e){let t=BDa.c(5),{children:n}=e,{exit:r}=useApp(),o,s;if(t[0]!==r)o=()=>{let a=setTimeout(r,0);return()=>clearTimeout(a)},s=[r],t[0]=r,t[1]=o,t[2]=s;else o=t[1],s=t[2];UDa.useLayoutEffect(o,s);let i;if(t[3]!==n)i=mct.jsx(mct.Fragment,{children:n}),t[3]=n,t[4]=i;else i=t[4];return i}
async function fct(e,t){let n="",r=!1,o=new $Da.PassThrough;if(t!==void 0)o.columns=t;return o.on("data",(i)=>{if(r)return;r=!0,n=i.toString()}),await(await render(mct.jsx(py,{children:mct.jsx(bAn,{value:Ubp,children:e})}),{stdout:o,patchConsole:!1})).waitUntilExit(),n}
async function qDa(e,t){let n=await fct(e,t);return cc(n)}
var BDa,UDa,$Da,mct;
var i0e=b(()=>{i4();je();BDa=x(tt(),1),UDa=x(et(),1),$Da=require("stream"),mct=x(oe(),1)});
export {Ubp,py,fct,qDa,BDa,UDa,$Da,mct,i0e};
