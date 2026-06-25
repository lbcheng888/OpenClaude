// @ts-nocheck
import {Q} from "../runtime.ts";
import {qli} from "./m2052.ts";
import {nUr} from "./m2053.ts";
import {Vli} from "./m2054.ts";
var JBe=Q((qRe)=>{Object.defineProperty(qRe,"__esModule",{value:!0});qRe.unregisterGlobal=qRe.getGlobal=qRe.registerGlobal=void 0;var Ktd=qli(),xZe=nUr(),ztd=Vli(),jtd=xZe.VERSION.split(".")[0],_xt=Symbol.for(`opentelemetry.js.api.${jtd}`),yxt=Ktd._globalThis;function Ytd(e,t,n,r=!1){var o;let s=yxt[_xt]=(o=yxt[_xt])!==null&&o!==void 0?o:{version:xZe.VERSION};if(!r&&s[e]){let i=Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);return n.error(i.stack||i.message),!1}if(s.version!==xZe.VERSION){let i=Error(`@opentelemetry/api: Registration of version v${s.version} for ${e} does not match previously registered API v${xZe.VERSION}`);return n.error(i.stack||i.message),!1}return s[e]=t,n.debug(`@opentelemetry/api: Registered a global for ${e} v${xZe.VERSION}.`),!0}qRe.registerGlobal=Ytd;function Jtd(e){var t,n;let r=(t=yxt[_xt])===null||t===void 0?void 0:t.version;if(!r||!(0,ztd.isCompatible)(r))return;return(n=yxt[_xt])===null||n===void 0?void 0:n[e]}qRe.getGlobal=Jtd;function Xtd(e,t){t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${xZe.VERSION}.`);let n=yxt[_xt];if(n)delete n[e]}qRe.unregisterGlobal=Xtd});
export {JBe};
