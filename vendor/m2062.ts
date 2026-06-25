// @ts-nocheck
import {Q} from "../runtime.ts";
import {XBe} from "./m2059.ts";
import {Jli} from "./m2060.ts";
import {Xli} from "./m2061.ts";
var oUr=Q((PZe)=>{Object.defineProperty(PZe,"__esModule",{value:!0});PZe.baggageEntryMetadataFromString=PZe.createBaggage=void 0;var ond=XBe(),snd=Jli(),ind=Xli(),and=ond.DiagAPI.instance();function lnd(e={}){return new snd.BaggageImpl(new Map(Object.entries(e)))}PZe.createBaggage=lnd;function cnd(e){if(typeof e!=="string")and.error(`Cannot create baggage metadata from unknown type: ${typeof e}`),e="";return{__TYPE__:ind.baggageEntryMetadataSymbol,toString(){return e}}}PZe.baggageEntryMetadataFromString=cnd});
export {oUr};
