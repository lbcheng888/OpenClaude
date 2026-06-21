// @ts-nocheck
import {XUi,QUi} from "./m2745.ts";
import {ZUi,e2i} from "./m2746.ts";
import {t2i,n2i} from "./m2747.ts";
import {bWe,z7t} from "./m61.ts";
import {V7t,Ber} from "./m57.ts";
import {G7t,Ner} from "./m55.ts";
import {b} from "../runtime.ts";
function ixd(e,t,n){var r=-1,o=XUi,s=e.length,i=!0,a=[],l=a;if(n)i=!1,o=ZUi;else if(s>=sxd){var c=t?null:t2i(e);if(c)return bWe(c);i=!1,o=V7t,l=new G7t}else l=t?[]:a;e:while(++r<s){var u=e[r],d=t?t(u):u;if(u=n||u!==0?u:0,i&&d===d){var p=l.length;while(p--)if(l[p]===d)continue e;if(t)l.push(d);a.push(u)}else if(!o(l,d,n)){if(l!==a)l.push(d);a.push(u)}}return a}
var sxd=200,r2i;
var o2i=b(()=>{Ner();QUi();e2i();Ber();n2i();z7t();r2i=ixd});
export {ixd,sxd,r2i,o2i};
