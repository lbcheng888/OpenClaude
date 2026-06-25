// @ts-nocheck
import {Gze,Bnn} from "./m531.ts";
import {Iv,roe} from "./m533.ts";
import {rr,oC} from "./m466.ts";
import {b} from "../runtime.ts";
function IAt(e,t){let n=this||Gze,r=t||n,o=Iv.from(r.headers),s=r.data;return rr.forEach(e,function(a){s=a.call(n,s,o.normalize(),t?t.status:void 0)}),o.normalize(),s}
var mZo=b(()=>{oC();Bnn();roe()});
export {IAt,mZo};
