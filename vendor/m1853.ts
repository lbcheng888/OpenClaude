// @ts-nocheck
import {X} from "../runtime.ts";
import {JB} from "./m1820.ts";
import {xxt} from "./m1846.ts";
import {initSessionMetadataPersistence} from "./m1845.ts";
import {Hxt} from "./m1847.ts";
import {wxt} from "./m1836.ts";
import {Tfn} from "./m1837.ts";
import {bfn} from "./m1841.ts";
import {Sfn} from "./m1840.ts";
var wfn=X((tBA,SYs)=>{var s9u=JB(),TYs=xxt(),{ANY:i9u}=TYs,a9u=initSessionMetadataPersistence(),l9u=Hxt(),_Ys=wxt(),yYs=Tfn(),c9u=bfn(),u9u=Sfn(),d9u=(e,t,n,r)=>{e=new s9u(e,r),t=new a9u(t,r);let o,s,i,a,l;switch(n){case">":o=_Ys,s=c9u,i=yYs,a=">",l=">=";break;case"<":o=yYs,s=u9u,i=_Ys,a="<",l="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"')}if(l9u(e,t,r))return!1;for(let c=0;c<t.set.length;++c){let u=t.set[c],d=null,p=null;if(u.forEach((m)=>{if(m.semver===i9u)m=new TYs(">=0.0.0");if(d=d||m,p=p||m,o(m.semver,d.semver,r))d=m;else if(i(m.semver,p.semver,r))p=m}),d.operator===a||d.operator===l)return!1;if((!p.operator||p.operator===a)&&s(e,p.semver))return!1;else if(p.operator===l&&i(e,p.semver))return!1}return!0};SYs.exports=d9u});
export {wfn};
