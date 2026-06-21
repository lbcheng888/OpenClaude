// @ts-nocheck
import {D5,E$,aAe,FZ} from "../src/telemetry/2465_bindings.ts";
import {Box} from "./m2422.ts";
import {Hx,Ypt} from "./m4573.ts";
import {Es,kte} from "./m3926.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function dcl(){let e=ucl.c(1);if(!D5())return null;let t=E$.warnings;if(t.length===0)return null;let n;if(e[0]===Symbol.for("react.memo_cache_sentinel")){let r=[...t].sort(o7p),o=r[0]?.severity==="error";n=Rje.default.createElement(Box,{flexDirection:"column",marginTop:1},Rje.default.createElement(Hx,{title:"Keybinding configuration issues",status:o?"error":"warning",detail:aAe()}),Rje.default.createElement(Es,{variant:"tree"},r.map(r7p))),e[0]=n}else n=e[0];return n}
function r7p(e,t){return Rje.default.createElement(Es.Group,{key:t},Rje.default.createElement(Es.Node,{color:e.severity==="error"?"error":"warning"},e.message),e.suggestion&&Rje.default.createElement(Es.Node,{dimColor:!0},e.suggestion))}
function o7p(e,t){return e.severity===t.severity?0:e.severity==="error"?-1:1}
var ucl,Rje;
var pcl=b(()=>{ze();FZ();Ypt();kte();ucl=M(rt(),1),Rje=M(Te(),1)});
export {dcl,r7p,o7p,ucl,Rje,pcl};
