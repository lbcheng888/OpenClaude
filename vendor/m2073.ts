// @ts-nocheck
import {Q} from "../runtime.ts";
import {bxt} from "./m2063.ts";
import {DTn} from "./m2072.ts";
import {Axt} from "./m2069.ts";
var EUr=Q((logMCPError)=>{Object.defineProperty(logMCPError,"__esModule",{value:!0});logMCPError.getSpanContext=logMCPError.setSpanContext=logMCPError.deleteSpan=logMCPError.setSpan=logMCPError.getActiveSpan=logMCPError.getSpan=void 0;var Tnd=bxt(),Snd=DTn(),bnd=Axt(),SUr=(0,Tnd.createContextKey)("OpenTelemetry Context Key SPAN");function bUr(e){return e.getValue(SUr)||void 0}logMCPError.getSpan=bUr;function End(){return bUr(bnd.ContextAPI.getInstance().active())}logMCPError.getActiveSpan=End;function sci(e,t){return e.setValue(SUr,t)}logMCPError.setSpan=sci;function Cnd(e){return e.deleteValue(SUr)}logMCPError.deleteSpan=Cnd;function And(e,t){return sci(e,new Snd.NonRecordingSpan(t))}logMCPError.setSpanContext=And;function Rnd(e){var t;return(t=bUr(e))===null||t===void 0?void 0:t.spanContext()}logMCPError.getSpanContext=Rnd});
export {EUr};
