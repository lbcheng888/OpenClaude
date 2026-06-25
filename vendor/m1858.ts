// @ts-nocheck
import {Q} from "../runtime.ts";
import {TF} from "./m1825.ts";
import {t0t} from "./m1851.ts";
import {x7} from "./m1850.ts";
import {r0t} from "./m1852.ts";
import {ZIt} from "./m1841.ts";
import {n_n} from "./m1842.ts";
import {o_n} from "./m1846.ts";
import {r_n} from "./m1845.ts";
var l_n=Q((CWh,gti)=>{var AKu=TF(),hti=t0t(),{ANY:RKu}=hti,vKu=x7(),wKu=r0t(),mti=ZIt(),fti=n_n(),kKu=o_n(),HKu=r_n(),IKu=(e,t,n,r)=>{e=new AKu(e,r),t=new vKu(t,r);let o,s,i,a,l;switch(n){case">":o=mti,s=kKu,i=fti,a=">",l=">=";break;case"<":o=fti,s=HKu,i=mti,a="<",l="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"')}if(wKu(e,t,r))return!1;for(let c=0;c<t.set.length;++c){let u=t.set[c],d=null,p=null;if(u.forEach((m)=>{if(m.semver===RKu)m=new hti(">=0.0.0");if(d=d||m,p=p||m,o(m.semver,d.semver,r))d=m;else if(i(m.semver,p.semver,r))p=m}),d.operator===a||d.operator===l)return!1;if((!p.operator||p.operator===a)&&s(e,p.semver))return!1;else if(p.operator===l&&i(e,p.semver))return!1}return!0};gti.exports=IKu});
export {l_n};
