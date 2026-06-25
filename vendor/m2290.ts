// @ts-nocheck
import {wbe,zTt} from "./m98.ts";
import {zy,xU} from "./m23.ts";
import {ZAi,eRi} from "./m2289.ts";
import {b} from "../runtime.ts";
function gdd(e){if(typeof e=="number")return e;if(wbe(e))return tRi;if(zy(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=zy(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=ZAi(e);var n=mdd.test(e);return n||fdd.test(e)?hdd(e.slice(2),n?2:8):pdd.test(e)?tRi:+e}
var tRi=NaN,pdd,mdd,fdd,hdd,f3r;
var nRi=b(()=>{eRi();xU();zTt();pdd=/^[-+]0x[0-9a-f]+$/i,mdd=/^0b[01]+$/i,fdd=/^0o[0-7]+$/i,hdd=parseInt;f3r=gdd});
export {gdd,tRi,pdd,mdd,fdd,hdd,f3r,nRi};
