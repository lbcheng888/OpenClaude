// @ts-nocheck
import {b} from "../runtime.ts";
function agc(e,t){var n=-1,r=e==null?0:e.length;while(++n<r)if(t(e[n],n,e)===!1)break;return e}
var i9o;
var a9o=b(()=>{i9o=agc});
export {agc,i9o,a9o};
