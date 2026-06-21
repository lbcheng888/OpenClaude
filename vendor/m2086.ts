// @ts-nocheck
import {X} from "../runtime.ts";
import {Xkt} from "./m2064.ts";
import {zkt} from "./m2058.ts";
var Fri=X((Bse)=>{Object.defineProperty(Bse,"__esModule",{value:!0});Bse.deleteBaggage=Bse.setBaggage=Bse.getActiveBaggage=Bse.getBaggage=void 0;var F7u=Xkt(),U7u=zkt(),a1r=(0,U7u.createContextKey)("OpenTelemetry Baggage Key");function Bri(e){return e.getValue(a1r)||void 0}Bse.getBaggage=Bri;function $7u(){return Bri(F7u.ContextAPI.getInstance().active())}Bse.getActiveBaggage=$7u;function q7u(e,t){return e.setValue(a1r,t)}Bse.setBaggage=q7u;function j7u(e){return e.deleteValue(a1r)}Bse.deleteBaggage=j7u});
export {Fri};
