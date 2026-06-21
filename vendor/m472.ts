// @ts-nocheck
import {X} from "../runtime.ts";
import {Qdr} from "./m468.ts";
import {Zdr} from "./m469.ts";
import {epr} from "./m470.ts";
var tpr=X((Yuf,VZt)=>{var hVo=Qdr(),hFc=Zdr(),gFc=epr();VZt.exports=_Fc;VZt.exports.ascending=gVo;VZt.exports.descending=yFc;function _Fc(e,t,n,r){var o=hFc(e,n);return hVo(e,t,o,function s(i,a){if(i){r(i,a);return}if(o.index++,o.index<(o.keyedList||e).length){hVo(e,t,o,s);return}r(null,o.results)}),gFc.bind(o,r)}function gVo(e,t){return e<t?-1:e>t?1:0}function yFc(e,t){return-1*gVo(e,t)}});
export {tpr};
