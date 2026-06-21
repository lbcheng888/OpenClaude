// @ts-nocheck
import {X} from "../runtime.ts";
import {Qni} from "./m2051.ts";
import {Zni} from "./m2053.ts";
import {$hn} from "./m2052.ts";
import {ZBe} from "./m2050.ts";
var eFe=X((Whn)=>{Object.defineProperty(Whn,"__esModule",{value:!0});Whn.DiagAPI=void 0;var MVu=Qni(),NVu=Zni(),eri=$hn(),jhn=ZBe(),BVu="diag";class HMr{constructor(){function e(r){return function(...o){let s=(0,jhn.getGlobal)("diag");if(!s)return;return s[r](...o)}}let t=this,n=(r,o={logLevel:eri.DiagLogLevel.INFO})=>{var s,i,a;if(r===t){let u=Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");return t.error((s=u.stack)!==null&&s!==void 0?s:u.message),!1}if(typeof o==="number")o={logLevel:o};let l=(0,jhn.getGlobal)("diag"),c=(0,NVu.createLogLevelDiagLogger)((i=o.logLevel)!==null&&i!==void 0?i:eri.DiagLogLevel.INFO,r);if(l&&!o.suppressOverrideMessage){let u=(a=Error().stack)!==null&&a!==void 0?a:"<failed to generate stacktrace>";l.warn(`Current logger will be overwritten from ${u}`),c.warn(`Current logger will overwrite one already registered from ${u}`)}return(0,jhn.registerGlobal)("diag",c,t,!0)};t.setLogger=n,t.disable=()=>{(0,jhn.unregisterGlobal)(BVu,t)},t.createComponentLogger=(r)=>new MVu.DiagComponentLogger(r),t.verbose=e("verbose"),t.debug=e("debug"),t.info=e("info"),t.warn=e("warn"),t.error=e("error")}static instance(){if(!this._instance)this._instance=new HMr;return this._instance}}Whn.DiagAPI=HMr});
export {eFe};
