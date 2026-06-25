// @ts-nocheck
import {LEe,vAt} from "./m520.ts";
import {X_,GX} from "./m528.ts";
import {rr,oC} from "./m466.ts";
import {b} from "../runtime.ts";
function Zgr(e,t){return LEe(e,new X_.classes.URLSearchParams,{visitor:function(n,r,o,s){if(X_.isNode&&rr.isBuffer(n))return this.append(r,n.toString("base64")),!1;return s.defaultVisitor.apply(this,arguments)},...t})}
var cZo=b(()=>{oC();vAt();GX()});
export {Zgr,cZo};
