// @ts-nocheck
import {b} from "../runtime.ts";
import {gjs} from "./m1634.ts";
import {Zfn} from "./m1633.ts";
function nhn(){return PPr.getLogLevel()}
function YAe(e){return PPr.createClientLogger(e)}
var PPr,dNh;
var TFe=b(()=>{gjs();PPr=Zfn({logLevelEnvVarName:"AZURE_LOG_LEVEL",namespace:"azure"}),dNh=PPr.logger});
export {nhn,YAe,PPr,dNh,TFe};
