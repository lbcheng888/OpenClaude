// @ts-nocheck
import {ZSe,ebt} from "./m514.ts";
import {Y_,KX} from "./m522.ts";
import {er,ZE} from "./m460.ts";
import {b} from "../runtime.ts";
function Cpr(e,t){return ZSe(e,new Y_.classes.URLSearchParams,{visitor:function(n,r,o,s){if(Y_.isNode&&er.isBuffer(n))return this.append(r,n.toString("base64")),!1;return s.defaultVisitor.apply(this,arguments)},...t})}
var pKo=b(()=>{ZE();ebt();KX()});
export {Cpr,pKo};
