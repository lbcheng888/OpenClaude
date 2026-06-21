// @ts-nocheck
import {b} from "../runtime.ts";
import {Fxn} from "./m3054.ts";
import {y$e} from "./m3052.ts";
import {lN} from "./m3021.ts";
import {yhe} from "./m3026.ts";
import {g$e} from "./m3027.ts";
import {_$e} from "./m3030.ts";
import {Knt} from "./m3019.ts";
var fS;
var A7i=b(()=>{Fxn();fS=y$e((e,t)=>{let{transformer:n=(p)=>p?"yes":"no"}=e,[r,o]=lN("idle"),[s,i]=lN(""),a=yhe(e.theme),l=g$e({status:r,theme:a});_$e((p,m)=>{if(Knt(p)){let f=e.default!==!1;if(/^(y|yes)/i.test(s))f=!0;else if(/^(n|no)/i.test(s))f=!1;i(n(f)),o("done"),t(f)}else i(m.line)});let c=s,u="";if(r==="done")c=a.style.answer(s);else u=` ${a.style.defaultAnswer(e.default===!1?"y/N":"Y/n")}`;let d=a.style.message(e.message,r);return`${l} ${d}${u} ${c}`})});
export {fS,A7i};
