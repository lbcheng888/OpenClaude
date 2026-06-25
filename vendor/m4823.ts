// @ts-nocheck
import {Sdt,V1} from "./m4006.ts";
import {getModelSourceAnnotation,renderModelSetting,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {t7n,n7n} from "./m4623.ts";
import {FPe,Qzn} from "./m4822.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Twl(){let e=Sdt(),t=ywl.useMemo(getModelSourceAnnotation,[e]),n=t7n();if(!t&&!n)return null;let r=t&&n?`${t.slice(0,-1)}, auto-updated)`:n?" (auto-updated)":t;return Swl.jsxs(FPe,{command:"/model",children:["Using ",renderModelSetting(e),r]})}
var ywl,Swl;
var bwl=b(()=>{V1();Ro();n7n();Qzn();ywl=x(et(),1),Swl=x(oe(),1)});
export {Twl,ywl,Swl,bwl};
