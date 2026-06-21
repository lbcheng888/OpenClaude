// @ts-nocheck
import {X} from "../runtime.ts";
import {Jdr} from "./m466.ts";
import {Xdr} from "./m467.ts";
var Qdr=X((Guf,dVo)=>{var uVo=Jdr(),sFc=Xdr();dVo.exports=iFc;function iFc(e,t,n,r){var o=n.keyedList?n.keyedList[n.index]:n.index;n.jobs[o]=aFc(t,o,e[o],function(s,i){if(!(o in n.jobs))return;if(delete n.jobs[o],s)sFc(n);else n.results[o]=i;r(s,n.results)})}function aFc(e,t,n,r){var o;if(e.length==2)o=e(n,uVo(r));else o=e(n,t,uVo(r));return o}});
export {Qdr};
