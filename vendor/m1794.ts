// @ts-nocheck
import {_Mr,xQs} from "./m1791.ts";
import {yMr,PQs} from "./m1792.ts";
import {OQs,LQs} from "./m1793.ts";
import {b} from "../runtime.ts";
function sWu(e,t,n){if(_Mr.randomUUID&&!t&&!e)return _Mr.randomUUID();e=e||{};let r=e.random??e.rng?.()??yMr();if(r.length<16)throw Error("Random bytes length must be >= 16");if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){if(n=n||0,n<0||n+16>t.length)throw RangeError(`UUID byte range ${n}:${n+15} is out of buffer bounds`);for(let o=0;o<16;++o)t[n+o]=r[o];return t}return OQs(r)}
var TMr;
var MQs=b(()=>{xQs();PQs();LQs();TMr=sWu});
export {sWu,TMr,MQs};
