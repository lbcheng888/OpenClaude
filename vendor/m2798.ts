// @ts-nocheck
import {Axe,sLt} from "./m2797.ts";
import {qH,Iwe} from "../src/tui/2545_current.ts";
import {Text} from "./m2423.ts";
import {at,rs} from "./m2546.ts";
import {qw,UZ} from "../src/telemetry/2468_action.ts";
import {_t,cu} from "./m582.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function iLt(e){let t=kWr.c(2),{children:n}=e,r;if(t[0]!==n)r=hxe.default.createElement(L9i.Provider,{value:!0},n),t[0]=n,t[1]=r;else r=t[1];return r}
function cx(){let e=kWr.c(3),t=hxe.useContext(L9i),n=hxe.useContext(Axe),r=qH("app:toggleTranscript","Global","ctrl+o");if(t||n)return null;let o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o={keyCase:"lower"},e[0]=o;else o=e[0];let s;if(e[1]!==r)s=hxe.default.createElement(Text,{dimColor:!0},hxe.default.createElement(at,{chord:r,action:"expand",parens:!0,format:o})),e[1]=r,e[2]=s;else s=e[2];return s}
function M9i(){let e=qw("app:toggleTranscript","Global","ctrl+o");return _t.dim(`(${e} to expand)`)}
var kWr,hxe,L9i;
var iW=b(()=>{cu();ze();UZ();Iwe();rs();sLt();kWr=M(rt(),1),hxe=M(Te(),1),L9i=hxe.default.createContext(!1)});
export {iLt,cx,M9i,kWr,hxe,L9i,iW};
