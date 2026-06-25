// @ts-nocheck
import {zy,xU} from "./m23.ts";
import {JV,FLe} from "./m106.ts";
import {a5,BLe} from "./m107.ts";
import {Rbe,qTt} from "./m71.ts";
import {Qbe,Ubt} from "./m201.ts";
import {b} from "../runtime.ts";
function QFc(e,t,n,r){if(!zy(e))return e;t=JV(t,e);var o=-1,s=t.length,i=s-1,a=e;while(a!=null&&++o<s){var l=a5(t[o]),c=n;if(l==="__proto__"||l==="constructor"||l==="prototype")return e;if(o!=i){var u=a[l];if(c=r?r(u,l,a):void 0,c===void 0)c=zy(u)?u:Rbe(t[o+1])?[]:{}}Qbe(a,l,c),a=a[l]}return e}
var CYo;
var AYo=b(()=>{Ubt();FLe();qTt();xU();BLe();CYo=QFc});
export {QFc,CYo,AYo};
