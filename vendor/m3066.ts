// @ts-nocheck
import {b} from "../runtime.ts";
import {k0n} from "./m3064.ts";
import {E9e} from "./m3062.ts";
import {Ige} from "./m3036.ts";
import {b1} from "./m3031.ts";
import {S9e} from "./m3037.ts";
import {b9e} from "./m3040.ts";
import {Xot,f0n} from "./m3029.ts";
var l_;
var cZi=b(()=>{k0n();l_=E9e((e,t)=>{let{required:n,validate:r=()=>!0}=e,o=Ige(e.theme),[s,i]=b1("idle"),[a="",l]=b1(e.default),[c,u]=b1(),[d,p]=b1(""),m=S9e({status:s,theme:o});b9e(async(T,y)=>{if(s!=="idle")return;if(Xot(T)){let S=d||a;i("loading");let E=n&&!S?"You must provide a value":await r(S);if(E===!0)p(S),i("done"),t(S);else y.write(d),u(E||"You must provide a valid value"),i("idle")}else if(f0n(T)&&!d)l(void 0);else if(T.name==="tab"&&!d)l(void 0),y.clearLine(0),y.write(a),p(a);else p(y.line),u(void 0)});let f=o.style.message(e.message,s),h=d;if(typeof e.transformer==="function")h=e.transformer(d,{isFinal:s==="done"});else if(s==="done")h=o.style.answer(d);let g;if(a&&s!=="done"&&!d)g=o.style.defaultAnswer(a);let _="";if(c)_=o.style.error(c);return[[m,f,g,h].filter((T)=>T!==void 0).join(" "),_]})});
export {l_,cZi};
