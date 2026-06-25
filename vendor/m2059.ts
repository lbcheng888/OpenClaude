// @ts-nocheck
import {Q} from "../runtime.ts";
import {zli} from "./m2056.ts";
import {jli} from "./m2058.ts";
import {STn} from "./m2057.ts";
import {JBe} from "./m2055.ts";
var XBe=Q((CTn)=>{Object.defineProperty(CTn,"__esModule",{value:!0});CTn.DiagAPI=void 0;var tnd=zli(),nnd=jli(),Yli=STn(),ETn=JBe(),rnd="diag";class rUr{constructor(){function e(r){return function(...o){let s=(0,ETn.getGlobal)("diag");if(!s)return;return s[r](...o)}}let t=this,n=(r,o={logLevel:Yli.DiagLogLevel.INFO})=>{var s,i,a;if(r===t){let u=Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");return t.error((s=u.stack)!==null&&s!==void 0?s:u.message),!1}if(typeof o==="number")o={logLevel:o};let l=(0,ETn.getGlobal)("diag"),c=(0,nnd.createLogLevelDiagLogger)((i=o.logLevel)!==null&&i!==void 0?i:Yli.DiagLogLevel.INFO,r);if(l&&!o.suppressOverrideMessage){let u=(a=Error().stack)!==null&&a!==void 0?a:"<failed to generate stacktrace>";l.warn(`Current logger will be overwritten from ${u}`),c.warn(`Current logger will overwrite one already registered from ${u}`)}return(0,ETn.registerGlobal)("diag",c,t,!0)};t.setLogger=n,t.disable=()=>{(0,ETn.unregisterGlobal)(rnd,t)},t.createComponentLogger=(r)=>new tnd.DiagComponentLogger(r),t.verbose=e("verbose"),t.debug=e("debug"),t.info=e("info"),t.warn=e("warn"),t.error=e("error")}static instance(){if(!this._instance)this._instance=new rUr;return this._instance}}CTn.DiagAPI=rUr});
export {XBe};
