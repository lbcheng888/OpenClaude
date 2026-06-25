// @ts-nocheck
import {b} from "../runtime.ts";
function OQs(e,t=0){return(FM[e[t+0]]+FM[e[t+1]]+FM[e[t+2]]+FM[e[t+3]]+"-"+FM[e[t+4]]+FM[e[t+5]]+"-"+FM[e[t+6]]+FM[e[t+7]]+"-"+FM[e[t+8]]+FM[e[t+9]]+"-"+FM[e[t+10]]+FM[e[t+11]]+FM[e[t+12]]+FM[e[t+13]]+FM[e[t+14]]+FM[e[t+15]]).toLowerCase()}
var FM;
var LQs=b(()=>{FM=[];for(let e=0;e<256;++e)FM.push((e+256).toString(16).slice(1))});
export {OQs,FM,LQs};
