// @ts-nocheck
import {b} from "../runtime.ts";
import {S5s} from "./m1629.ts";
import {gpn} from "./m1628.ts";
function Tpn(){return rHr.getLogLevel()}
function pCe(e){return rHr.createClientLogger(e)}
var rHr,jwA;
var ENe=b(()=>{S5s();rHr=gpn({logLevelEnvVarName:"AZURE_LOG_LEVEL",namespace:"azure"}),jwA=rHr.logger});
export {Tpn,pCe,rHr,jwA,ENe};
