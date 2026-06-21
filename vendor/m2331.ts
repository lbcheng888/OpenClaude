// @ts-nocheck
import {X} from "../runtime.ts";
import {dF} from "./m2298.ts";
import {vIt} from "./m2324.ts";
import {MK} from "./m2323.ts";
import {RIt} from "./m2325.ts";
import {EIt} from "./m2314.ts";
import {PTn} from "./m2315.ts";
import {LTn} from "./m2319.ts";
import {OTn} from "./m2318.ts";
var FTn=X((wnh,vSi)=>{var Prd=dF(),CSi=vIt(),{ANY:Ord}=CSi,Lrd=MK(),Mrd=RIt(),bSi=EIt(),ESi=PTn(),Nrd=LTn(),Brd=OTn(),Frd=(e,t,n,r)=>{e=new Prd(e,r),t=new Lrd(t,r);let o,s,i,a,l;switch(n){case">":o=bSi,s=Nrd,i=ESi,a=">",l=">=";break;case"<":o=ESi,s=Brd,i=bSi,a="<",l="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"')}if(Mrd(e,t,r))return!1;for(let c=0;c<t.set.length;++c){let u=t.set[c],d=null,p=null;if(u.forEach((m)=>{if(m.semver===Ord)m=new CSi(">=0.0.0");if(d=d||m,p=p||m,o(m.semver,d.semver,r))d=m;else if(i(m.semver,p.semver,r))p=m}),d.operator===a||d.operator===l)return!1;if((!p.operator||p.operator===a)&&s(e,p.semver))return!1;else if(p.operator===l&&i(e,p.semver))return!1}return!0};vSi.exports=Frd});
export {FTn};
