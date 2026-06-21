// @ts-nocheck
import {kV,qOe} from "./m109.ts";
import {Gj,jOe} from "./m110.ts";
import {vWe,tKt} from "./m76.ts";
import {VTe,fgt} from "./m75.ts";
import {nT,d2} from "./m64.ts";
import {Hde,dgt} from "./m72.ts";
import {b} from "../runtime.ts";
function yAc(e,t,n){t=kV(t,e);var r=-1,o=t.length,s=!1;while(++r<o){var i=Gj(t[r]);if(!(s=e!=null&&n(e,i)))break;e=e[i]}if(s||++r!=o)return s;return o=e==null?0:e.length,!!o&&vWe(o)&&VTe(i,o)&&(nT(e)||Hde(e))}
var qUo;
var jUo=b(()=>{qOe();dgt();d2();fgt();tKt();jOe();qUo=yAc});
export {yAc,qUo,jUo};
