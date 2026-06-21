// @ts-nocheck
import {Text} from "./m2423.ts";
import {ybe,sl} from "./m715.ts";
import {H4,Yfe} from "./m2265.ts";
import {bc,Ug} from "./m2264.ts";
import {_t,cu} from "./m582.ts";
import {No,lwe} from "./m2421.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function cvl(e){let t=lvl.c(2),{cooldown:n}=e;if(n){let o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=p8t.createElement(Text,{color:"promptBorder",dimColor:!0},ybe),t[0]=o;else o=t[0];return o}let r;if(t[1]===Symbol.for("react.memo_cache_sentinel"))r=p8t.createElement(Text,{color:"fastMode"},ybe),t[1]=r;else r=t[1];return r}
function XDe(e=!0,t=!1){if(!e)return ybe;let n=H4(bc("theme","dark").value);if(t)return _t.dim(No("promptBorder",n)(ybe));return No("fastMode",n)(ybe)}
var lvl,p8t;
var mVn=b(()=>{cu();sl();ze();Ug();Yfe();lwe();lvl=M(rt(),1),p8t=M(Te(),1)});
export {cvl,XDe,lvl,p8t,mVn};
