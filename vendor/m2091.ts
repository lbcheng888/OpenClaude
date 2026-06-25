// @ts-nocheck
import {Q} from "../runtime.ts";
import {Axt} from "./m2069.ts";
import {bxt} from "./m2063.ts";
var Oci=Q((Fse)=>{Object.defineProperty(Fse,"__esModule",{value:!0});Fse.deleteBaggage=Fse.setBaggage=Fse.getActiveBaggage=Fse.getBaggage=void 0;var ord=Axt(),srd=bxt(),OUr=(0,srd.createContextKey)("OpenTelemetry Baggage Key");function Pci(e){return e.getValue(OUr)||void 0}Fse.getBaggage=Pci;function ird(){return Pci(ord.ContextAPI.getInstance().active())}Fse.getActiveBaggage=ird;function ard(e,t){return e.setValue(OUr,t)}Fse.setBaggage=ard;function lrd(e){return e.deleteValue(OUr)}Fse.deleteBaggage=lrd});
export {Oci};
