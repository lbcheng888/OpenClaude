// @ts-nocheck
import {tHe,L1t} from "./m2810.ts";
import {yI,gwe} from "../src/tui/2556_current.ts";
import {Text} from "./m2433.ts";
import {at,Wo} from "./m2557.ts";
import {KR,NZ} from "../src/telemetry/2478_action.ts";
import {bt,Gc} from "./m588.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function M1t(e){let t=djr.c(2),{children:n}=e,r;if(t[0]!==n)r=$In.jsx(wWi.Provider,{value:!0,children:n}),t[0]=n,t[1]=r;else r=t[1];return r}
function bw(){let e=djr.c(3),t=ujr.useContext(wWi),n=ujr.useContext(tHe),r=yI("app:toggleTranscript","Global","ctrl+o");if(t||n)return null;let o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o={keyCase:"lower"},e[0]=o;else o=e[0];let s;if(e[1]!==r)s=$In.jsx(Text,{dimColor:!0,children:$In.jsx(at,{chord:r,action:"expand",parens:!0,format:o})}),e[1]=r,e[2]=s;else s=e[2];return s}
function kWi(){let e=KR("app:toggleTranscript","Global","ctrl+o");return bt.dim(`(${e} to expand)`)}
var djr,vWi,ujr,$In,wWi;
var EW=b(()=>{Gc();je();NZ();gwe();Wo();L1t();djr=x(tt(),1),vWi=x(et(),1),ujr=x(et(),1),$In=x(oe(),1),wWi=vWi.createContext(!1)});
export {M1t,bw,kWi,djr,vWi,ujr,$In,wWi,EW};
