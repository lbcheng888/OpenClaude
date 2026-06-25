// @ts-nocheck
import {b} from "../runtime.ts";
import {k0n} from "./m3064.ts";
import {E9e} from "./m3062.ts";
import {b1} from "./m3031.ts";
import {Ige} from "./m3036.ts";
import {S9e} from "./m3037.ts";
import {b9e} from "./m3040.ts";
import {Xot} from "./m3029.ts";
var lS;
var lZi=b(()=>{k0n();lS=E9e((e,t)=>{let{transformer:n=(p)=>p?"yes":"no"}=e,[r,o]=b1("idle"),[s,i]=b1(""),a=Ige(e.theme),l=S9e({status:r,theme:a});b9e((p,m)=>{if(Xot(p)){let f=e.default!==!1;if(/^(y|yes)/i.test(s))f=!0;else if(/^(n|no)/i.test(s))f=!1;i(n(f)),o("done"),t(f)}else i(m.line)});let c=s,u="";if(r==="done")c=a.style.answer(s);else u=` ${a.style.defaultAnswer(e.default===!1?"y/N":"Y/n")}`;let d=a.style.message(e.message,r);return`${l} ${d}${u} ${c}`})});
export {lS,lZi};
