// @ts-nocheck
import {SandboxManager,Uh} from "./m2682.ts";
import {Box} from "./m2432.ts";
import {Ww,tht} from "./m4601.ts";
import {cs,kte} from "./m3992.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function A_l(){let e=C_l.c(2);if(!SandboxManager.isSupportedPlatform())return null;if(!SandboxManager.isSandboxEnabledInSettings())return null;if(!SandboxManager.isPlatformInEnabledList())return null;let t,n;if(e[0]===Symbol.for("react.memo_cache_sentinel")){n=Symbol.for("react.early_return_sentinel");e:{let r=SandboxManager.checkDependencies(),o=r.errors.length>0,s=r.warnings.length>0;if(!o&&!s){n=null;break e}t=ATe.jsxs(Box,{flexDirection:"column",marginTop:1,children:[ATe.jsx(Ww,{title:"Sandbox",status:o?"error":"warning"}),ATe.jsxs(cs,{variant:"tree",children:[r.errors.map(qtm),r.warnings.map($tm),o&&ATe.jsxs(cs.Node,{dimColor:!0,children:["Run ",ATe.jsx(Text,{color:"suggestion",children:"/sandbox"})," for install instructions"]})]})]})}e[0]=t,e[1]=n}else t=e[0],n=e[1];if(n!==Symbol.for("react.early_return_sentinel"))return n;return t}
function $tm(e,t){return ATe.jsx(cs.Node,{color:"warning",children:e},t)}
function qtm(e,t){return ATe.jsx(cs.Node,{color:"error",children:e},t)}
var C_l,ATe;
var R_l=b(()=>{je();Uh();tht();kte();C_l=x(tt(),1),ATe=x(oe(),1)});
export {A_l,$tm,qtm,C_l,ATe,R_l};
