// @ts-nocheck
import {Q} from "../runtime.ts";
import {wgr} from "./m474.ts";
import {kgr} from "./m475.ts";
import {Hgr} from "./m476.ts";
var Igr=Q((gCf,wnn)=>{var mXo=wgr(),C8c=kgr(),A8c=Hgr();wnn.exports=R8c;wnn.exports.ascending=fXo;wnn.exports.descending=v8c;function R8c(e,t,n,r){var o=C8c(e,n);return mXo(e,t,o,function s(i,a){if(i){r(i,a);return}if(o.index++,o.index<(o.keyedList||e).length){mXo(e,t,o,s);return}r(null,o.results)}),A8c.bind(o,r)}function fXo(e,t){return e<t?-1:e>t?1:0}function v8c(e,t){return-1*fXo(e,t)}});
export {Igr};
