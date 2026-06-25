// @ts-nocheck
import {HYs} from "./m1671.ts";
import {EHt} from "./m1657.ts";
import {b} from "../runtime.ts";
import {TFe,YAe} from "./m1635.ts";
import {kQ} from "./m1667.ts";
function wOr(e,t={maxRetries:HYs}){return EHt(e,Object.assign({logger:J6u},t))}
var J6u;
var yJs=b(()=>{TFe();kQ();J6u=YAe("core-rest-pipeline retryPolicy")});
export {wOr,J6u,yJs};
