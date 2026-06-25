// @ts-nocheck
import {zy,xU} from "./m23.ts";
import {yre,EKe} from "./m82.ts";
import {Rbe,qTt} from "./m71.ts";
import {mre,lKe} from "./m6.ts";
import {b} from "../runtime.ts";
function Rou(e,t,n){if(!zy(n))return!1;var r=typeof t;if(r=="number"?yre(n)&&Rbe(t,n.length):r=="string"&&(t in n))return mre(n[t],e);return!1}
var brs;
var Ers=b(()=>{lKe();EKe();qTt();xU();brs=Rou});
export {Rou,brs,Ers};
