// @ts-nocheck
import {JEs,XEs,QEs} from "./m950.ts";
import {b} from "../runtime.ts";
var ZEs=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),eCs=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var Man=(e)=>Object.assign(JEs(e),ZEs(e)),DEu,iRr=(e)=>Object.assign(XEs(e),eCs(e));
var tCs=b(()=>{QEs();DEu=Man});
export {ZEs,eCs,Man,DEu,iRr,tCs};
