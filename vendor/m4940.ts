// @ts-nocheck
import {Text} from "./m2433.ts";
import {eCe,Pa} from "./m720.ts";
import {X3,cZ} from "./m2273.ts";
import {lc,mg} from "./m2209.ts";
import {bt,Gc} from "./m588.ts";
import {color,Kve} from "./m2431.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function bDl(e){let t=SDl.c(2),{cooldown:n}=e;if(n){let o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=n0o.jsx(Text,{color:"promptBorder",dimColor:!0,children:eCe}),t[0]=o;else o=t[0];return o}let r;if(t[1]===Symbol.for("react.memo_cache_sentinel"))r=n0o.jsx(Text,{color:"fastMode",children:eCe}),t[1]=r;else r=t[1];return r}
function XPe(e=!0,t=!1){if(!e)return eCe;let n=X3(lc("theme","dark").value);if(t)return bt.dim(color("promptBorder",n)(eCe));return color("fastMode",n)(eCe)}
var SDl,n0o;
var tYn=b(()=>{Gc();Pa();je();mg();cZ();Kve();SDl=x(tt(),1),n0o=x(oe(),1)});
export {bDl,XPe,SDl,n0o,tYn};
