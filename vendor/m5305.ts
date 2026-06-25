// @ts-nocheck
import {Bl,d_} from "./m3354.ts";
import {preInitQueue,di} from "./m2583.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function WVl(e){let t=qVl.c(7),{summary:n,carryOverCount:r,onConfirm:o,onCancel:s}=e,i=r>0?` ${r} ${r===1?"task carries":"tasks carry"} over to the background session.`:"",a=`${n} running \u2014 they will be stopped.${i}`,l;if(t[0]!==s||t[1]!==o)l=yNo.jsx(Bl,{confirmLabel:"Background anyway (tasks will be stopped)",cancelLabel:"Stay",onConfirm:o,onCancel:s}),t[0]=s,t[1]=o,t[2]=l;else l=t[2];let c;if(t[3]!==s||t[4]!==a||t[5]!==l)c=yNo.jsx(preInitQueue,{title:"Background this session?",subtitle:a,onCancel:s,children:l}),t[3]=s,t[4]=a,t[5]=l,t[6]=c;else c=t[6];return c}
var qVl,yNo;
var GVl=b(()=>{d_();di();qVl=x(tt(),1),yNo=x(oe(),1)});
export {WVl,qVl,yNo,GVl};
