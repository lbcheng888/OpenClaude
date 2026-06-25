// @ts-nocheck
import {Text} from "./m2433.ts";
import {Yn,Pl} from "./m2465.ts";
import {Box} from "./m2432.ts";
import {gh,G1} from "./m3957.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function a9n(e){let t=F2a.c(3),{plan:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=s6e.jsx(Text,{color:"subtle",children:"User rejected Claude's plan:"}),t[0]=r;else r=t[0];let o;if(t[1]!==n)o=s6e.jsx(Yn,{children:s6e.jsxs(Box,{flexDirection:"column",children:[r,s6e.jsx(Box,{borderStyle:"round",borderColor:"planMode",paddingX:1,overflow:"hidden",children:s6e.jsx(gh,{children:n})})]})}),t[1]=n,t[2]=o;else o=t[2];return o}
var F2a,s6e;
var _do=b(()=>{G1();Pl();je();F2a=x(tt(),1),s6e=x(oe(),1)});
export {a9n,F2a,s6e,_do};
