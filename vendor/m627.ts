// @ts-nocheck
import {hnn,ggr} from "./m448.ts";
import {fre,FTt} from "./m48.ts";
import {zy,xU} from "./m23.ts";
import {srs,irs} from "./m626.ts";
import {eRt,Cyr} from "./m624.ts";
import {ZAt,Eyr} from "./m621.ts";
import {Pre,u7e} from "./m206.ts";
import {b} from "../runtime.ts";
function ars(e,t,n,r,o){if(e===t)return;hnn(t,function(s,i){if(o||(o=new fre),zy(s))srs(e,t,i,n,ars,r,o);else{var a=r?r(eRt(e,i),s,i+"",e,t,o):void 0;if(a===void 0)a=s;ZAt(e,i,a)}},Pre)}
var lrs;
var crs=b(()=>{FTt();Eyr();ggr();irs();xU();u7e();Cyr();lrs=ars});
export {ars,lrs,crs};
