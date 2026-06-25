// @ts-nocheck
import {JV,FLe} from "./m106.ts";
import {a5,BLe} from "./m107.ts";
import {yKe,HYt} from "./m72.ts";
import {Rbe,qTt} from "./m71.ts";
import {jy,DU} from "./m60.ts";
import {Mde,BTt} from "./m68.ts";
import {b} from "../runtime.ts";
function ERc(e,t,n){t=JV(t,e);var r=-1,o=t.length,s=!1;while(++r<o){var i=a5(t[r]);if(!(s=e!=null&&n(e,i)))break;e=e[i]}if(s||++r!=o)return s;return o=e==null?0:e.length,!!o&&yKe(o)&&Rbe(i,o)&&(jy(e)||Mde(e))}
var Cqo;
var Aqo=b(()=>{FLe();BTt();DU();qTt();HYt();BLe();Cqo=ERc});
export {ERc,Cqo,Aqo};
