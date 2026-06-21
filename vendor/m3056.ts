// @ts-nocheck
import {b} from "../runtime.ts";
import {Fxn} from "./m3054.ts";
import {y$e} from "./m3052.ts";
import {yhe} from "./m3026.ts";
import {lN} from "./m3021.ts";
import {g$e} from "./m3027.ts";
import {_$e} from "./m3030.ts";
import {Knt,vxn} from "./m3019.ts";
var Xg;
var h7i=b(()=>{Fxn();Xg=y$e((e,t)=>{let{required:n,validate:r=()=>!0}=e,o=yhe(e.theme),[s,i]=lN("idle"),[a="",l]=lN(e.default),[c,u]=lN(),[d,p]=lN(""),m=g$e({status:s,theme:o});_$e(async(_,y)=>{if(s!=="idle")return;if(Knt(_)){let T=d||a;i("loading");let S=n&&!T?"You must provide a value":await r(T);if(S===!0)p(T),i("done"),t(T);else y.write(d),u(S||"You must provide a valid value"),i("idle")}else if(vxn(_)&&!d)l(void 0);else if(_.name==="tab"&&!d)l(void 0),y.clearLine(0),y.write(a),p(a);else p(y.line),u(void 0)});let f=o.style.message(e.message,s),A=d;if(typeof e.transformer==="function")A=e.transformer(d,{isFinal:s==="done"});else if(s==="done")A=o.style.answer(d);let h;if(a&&s!=="done"&&!d)h=o.style.defaultAnswer(a);let g="";if(c)g=o.style.error(c);return[[m,f,h,A].filter((_)=>_!==void 0).join(" "),g]})});
export {Xg,h7i};
