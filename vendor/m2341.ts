// @ts-nocheck
import {Q} from "../runtime.ts";
import {OF} from "./m2308.ts";
import {ZDt} from "./m2334.ts";
import {dz} from "./m2333.ts";
import {tPt} from "./m2335.ts";
import {XDt} from "./m2324.ts";
import {TCn} from "./m2325.ts";
import {bCn} from "./m2329.ts";
import {SCn} from "./m2328.ts";
var RCn=Q((ihg,Pwi)=>{var ifd=OF(),Dwi=ZDt(),{ANY:afd}=Dwi,lfd=dz(),cfd=tPt(),Iwi=XDt(),xwi=TCn(),ufd=bCn(),dfd=SCn(),pfd=(e,t,n,r)=>{e=new ifd(e,r),t=new lfd(t,r);let o,s,i,a,l;switch(n){case">":o=Iwi,s=ufd,i=xwi,a=">",l=">=";break;case"<":o=xwi,s=dfd,i=Iwi,a="<",l="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"')}if(cfd(e,t,r))return!1;for(let c=0;c<t.set.length;++c){let u=t.set[c],d=null,p=null;if(u.forEach((m)=>{if(m.semver===afd)m=new Dwi(">=0.0.0");if(d=d||m,p=p||m,o(m.semver,d.semver,r))d=m;else if(i(m.semver,p.semver,r))p=m}),d.operator===a||d.operator===l)return!1;if((!p.operator||p.operator===a)&&s(e,p.semver))return!1;else if(p.operator===l&&i(e,p.semver))return!1}return!0};Pwi.exports=pfd});
export {RCn};
