// @ts-nocheck
import {K8,K2,She,MZ} from "../src/telemetry/2475_bindings.ts";
import {Box} from "./m2432.ts";
import {Ww,tht} from "./m4601.ts";
import {cs,kte} from "./m3992.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Kgl(){let e=Vgl.c(1);if(!K8())return null;let t=K2.warnings;if(t.length===0)return null;let n;if(e[0]===Symbol.for("react.memo_cache_sentinel")){let r=[...t].sort(ltm),o=r[0]?.severity==="error";n=pPe.jsxs(Box,{flexDirection:"column",marginTop:1,children:[pPe.jsx(Ww,{title:"Keybinding configuration issues",status:o?"error":"warning",detail:She()}),pPe.jsx(cs,{variant:"tree",children:r.map(atm)})]}),e[0]=n}else n=e[0];return n}
function atm(e,t){return pPe.jsxs(cs.Group,{children:[pPe.jsx(cs.Node,{color:e.severity==="error"?"error":"warning",children:e.message}),e.suggestion&&pPe.jsx(cs.Node,{dimColor:!0,children:e.suggestion})]},t)}
function ltm(e,t){return e.severity===t.severity?0:e.severity==="error"?-1:1}
var Vgl,pPe;
var zgl=b(()=>{je();MZ();tht();kte();Vgl=x(tt(),1),pPe=x(oe(),1)});
export {Kgl,atm,ltm,Vgl,pPe,zgl};
