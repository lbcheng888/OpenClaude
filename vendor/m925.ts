// @ts-nocheck
import {HYe} from "./m924.ts";
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
var dbs,WCe=(e,t,n=!1)=>{if(typeof t>"u")throw new dbs.TokenProviderError(`Value not present for '${e}' in SSO Token${n?". Cannot refresh":""}. ${HYe}`,!1)};
var pbs=b(()=>{dbs=x(Vg(),1)});
export {dbs,WCe,pbs};
