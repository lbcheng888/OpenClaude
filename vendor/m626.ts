// @ts-nocheck
import {eRt,Cyr} from "./m624.ts";
import {ZAt,Eyr} from "./m621.ts";
import {jy,DU} from "./m60.ts";
import {gre,$Tt} from "./m70.ts";
import {SKe,PYt} from "./m76.ts";
import {ers,trs} from "./m622.ts";
import {DXt,gcr} from "./m209.ts";
import {qbt,hcr} from "./m208.ts";
import {NXt,ycr} from "./m220.ts";
import {hje,Hrn} from "./m623.ts";
import {Mde,BTt} from "./m68.ts";
import {rrs,ors} from "./m625.ts";
import {zy,xU} from "./m23.ts";
import {uKe,fYt} from "./m24.ts";
import {FXt,Tcr} from "./m223.ts";
import {b} from "../runtime.ts";
function fou(e,t,n,r,o,s,i){var a=eRt(e,n),l=eRt(t,n),c=i.get(l);if(c){ZAt(e,n,c);return}var u=s?s(a,l,n+"",e,t,i):void 0,d=u===void 0;if(d){var p=jy(l),m=!p&&gre(l),f=!p&&!m&&SKe(l);if(u=l,p||m||f)if(jy(a))u=a;else if(ers(a))u=DXt(a);else if(m)d=!1,u=qbt(l,!0);else if(f)d=!1,u=NXt(l,!0);else u=[];else if(hje(l)||Mde(l)){if(u=a,Mde(a))u=rrs(a);else if(!zy(a)||uKe(a))u=FXt(l)}else d=!1}if(d)i.set(l,u),o(u,l,r,s,i),i.delete(l);ZAt(e,n,u)}
var srs;
var irs=b(()=>{Eyr();hcr();ycr();gcr();Tcr();BTt();DU();trs();$Tt();fYt();xU();Hrn();PYt();Cyr();ors();srs=fou});
export {fou,srs,irs};
