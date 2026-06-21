// @ts-nocheck
import {$0r,M7s} from "./m1786.ts";
import {q0r,B7s} from "./m1787.ts";
import {F7s,U7s} from "./m1788.ts";
import {b} from "../runtime.ts";
function UFu(e,t,n){if($0r.randomUUID&&!t&&!e)return $0r.randomUUID();e=e||{};let r=e.random??e.rng?.()??q0r();if(r.length<16)throw Error("Random bytes length must be >= 16");if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){if(n=n||0,n<0||n+16>t.length)throw RangeError(`UUID byte range ${n}:${n+15} is out of buffer bounds`);for(let o=0;o<16;++o)t[n+o]=r[o];return t}return F7s(r)}
var j0r;
var $7s=b(()=>{M7s();B7s();U7s();j0r=UFu});
export {UFu,j0r,$7s};
