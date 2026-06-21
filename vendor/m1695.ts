// @ts-nocheck
import {OWs} from "./m1666.ts";
import {Ywt} from "./m1652.ts";
import {b} from "../runtime.ts";
import {ENe,pCe} from "./m1630.ts";
import {DQ} from "./m1662.ts";
function XHr(e,t={maxRetries:OWs}){return Ywt(e,Object.assign({logger:INu},t))}
var INu;
var EGs=b(()=>{ENe();DQ();INu=pCe("core-rest-pipeline retryPolicy")});
export {XHr,INu,EGs};
