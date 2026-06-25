// @ts-nocheck
import {jy,DU} from "./m60.ts";
import {kbe,jTt} from "./m103.ts";
import {wbe,zTt} from "./m98.ts";
import {b} from "../runtime.ts";
import {PLe,DP} from "./m19.ts";
function gqo(e){if(typeof e=="string")return e;if(jy(e))return kbe(e,gqo)+"";if(wbe(e))return hqo?hqo.call(e):"";var t=e+"";return t=="0"&&1/e==-fRc?"-0":t}
var fRc=1/0,fqo,hqo,_qo;
var yqo=b(()=>{PLe();jTt();DU();zTt();fqo=DP?DP.prototype:void 0,hqo=fqo?fqo.toString:void 0;_qo=gqo});
export {gqo,fRc,fqo,hqo,_qo,yqo};
