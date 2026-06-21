// @ts-nocheck
import {X} from "../runtime.ts";
import {eFe} from "./m2054.ts";
import {tri} from "./m2055.ts";
import {nri} from "./m2056.ts";
var IMr=X((OXe)=>{Object.defineProperty(OXe,"__esModule",{value:!0});OXe.baggageEntryMetadataFromString=OXe.createBaggage=void 0;var FVu=eFe(),UVu=tri(),$Vu=nri(),qVu=FVu.DiagAPI.instance();function jVu(e={}){return new UVu.BaggageImpl(new Map(Object.entries(e)))}OXe.createBaggage=jVu;function WVu(e){if(typeof e!=="string")qVu.error(`Cannot create baggage metadata from unknown type: ${typeof e}`),e="";return{__TYPE__:$Vu.baggageEntryMetadataSymbol,toString(){return e}}}OXe.baggageEntryMetadataFromString=WVu});
export {IMr};
