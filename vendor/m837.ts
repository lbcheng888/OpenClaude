// @ts-nocheck
import {Pls,Ols,Lls} from "./m836.ts";
import {b} from "../runtime.ts";
var Mls=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),Nls=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var Bls=(e)=>Object.assign(Pls(e),Mls(e)),gru,_ru=(e)=>Object.assign(Ols(e),Nls(e));
var Fls=b(()=>{Lls();gru=Bls});
export {Mls,Nls,Bls,gru,_ru,Fls};
