// @ts-nocheck
import {X} from "../runtime.ts";
import {Kni} from "./m2047.ts";
import {kMr} from "./m2048.ts";
import {Jni} from "./m2049.ts";
var ZBe=X((ive)=>{Object.defineProperty(ive,"__esModule",{value:!0});ive.unregisterGlobal=ive.getGlobal=ive.registerGlobal=void 0;var RVu=Kni(),DXe=kMr(),xVu=Jni(),kVu=DXe.VERSION.split(".")[0],Wkt=Symbol.for(`opentelemetry.js.api.${kVu}`),Gkt=RVu._globalThis;function HVu(e,t,n,r=!1){var o;let s=Gkt[Wkt]=(o=Gkt[Wkt])!==null&&o!==void 0?o:{version:DXe.VERSION};if(!r&&s[e]){let i=Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);return n.error(i.stack||i.message),!1}if(s.version!==DXe.VERSION){let i=Error(`@opentelemetry/api: Registration of version v${s.version} for ${e} does not match previously registered API v${DXe.VERSION}`);return n.error(i.stack||i.message),!1}return s[e]=t,n.debug(`@opentelemetry/api: Registered a global for ${e} v${DXe.VERSION}.`),!0}ive.registerGlobal=HVu;function IVu(e){var t,n;let r=(t=Gkt[Wkt])===null||t===void 0?void 0:t.version;if(!r||!(0,xVu.isCompatible)(r))return;return(n=Gkt[Wkt])===null||n===void 0?void 0:n[e]}ive.getGlobal=IVu;function DVu(e,t){t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${DXe.VERSION}.`);let n=Gkt[Wkt];if(n)delete n[e]}ive.unregisterGlobal=DVu});
export {ZBe};
