// @ts-nocheck
import {tT,c2} from "./m13.ts";
import {kV,qOe} from "./m109.ts";
import {Gj,jOe} from "./m110.ts";
import {VTe,fgt} from "./m75.ts";
import {gSe,myt} from "./m199.ts";
import {b} from "../runtime.ts";
function zHc(e,t,n,r){if(!tT(e))return e;t=kV(t,e);var o=-1,s=t.length,i=s-1,a=e;while(a!=null&&++o<s){var l=Gj(t[o]),c=n;if(l==="__proto__"||l==="constructor"||l==="prototype")return e;if(o!=i){var u=a[l];if(c=r?r(u,l,a):void 0,c===void 0)c=tT(u)?u:VTe(t[o+1])?[]:{}}gSe(a,l,c),a=a[l]}return e}
var xWo;
var kWo=b(()=>{myt();qOe();fgt();c2();jOe();xWo=zHc});
export {zHc,xWo,kWo};
