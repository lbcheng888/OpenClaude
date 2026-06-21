// @ts-nocheck
import {X} from "../runtime.ts";
import {zkt} from "./m2058.ts";
import {Zhn} from "./m2067.ts";
import {Xkt} from "./m2064.ts";
var YMr=X((b4)=>{Object.defineProperty(b4,"__esModule",{value:!0});b4.getSpanContext=b4.setSpanContext=b4.deleteSpan=b4.setSpan=b4.getActiveSpan=b4.getSpan=void 0;var e7u=zkt(),t7u=Zhn(),n7u=Xkt(),KMr=(0,e7u.createContextKey)("OpenTelemetry Context Key SPAN");function zMr(e){return e.getValue(KMr)||void 0}b4.getSpan=zMr;function r7u(){return zMr(n7u.ContextAPI.getInstance().active())}b4.getActiveSpan=r7u;function uri(e,t){return e.setValue(KMr,t)}b4.setSpan=uri;function o7u(e){return e.deleteValue(KMr)}b4.deleteSpan=o7u;function s7u(e,t){return uri(e,new t7u.NonRecordingSpan(t))}b4.setSpanContext=s7u;function i7u(e){var t;return(t=zMr(e))===null||t===void 0?void 0:t.spanContext()}b4.getSpanContext=i7u});
export {YMr};
