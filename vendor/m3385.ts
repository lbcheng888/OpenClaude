// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {Yee} from "./m3362.ts";
var FNt=X((ale)=>{Object.defineProperty(ale,"__esModule",{value:!0});ale.isValidName=ale.isDescriptorCompatibleWith=ale.createInstrumentDescriptorWithView=ale.createInstrumentDescriptor=void 0;var vda=Xi(),HVd=Yee();function IVd(e,t,n){if(!wda(e))vda.diag.warn(`Invalid metric name: "${e}". The metric name should be a ASCII string with a length no greater than 255 characters.`);return{name:e,type:t,description:n?.description??"",unit:n?.unit??"",valueType:n?.valueType??vda.ValueType.DOUBLE,advice:n?.advice??{}}}ale.createInstrumentDescriptor=IVd;function DVd(e,t){return{name:e.name??t.name,description:e.description??t.description,type:t.type,unit:t.unit,valueType:t.valueType,advice:t.advice}}ale.createInstrumentDescriptorWithView=DVd;function PVd(e,t){return(0,HVd.equalsCaseInsensitive)(e.name,t.name)&&e.unit===t.unit&&e.type===t.type&&e.valueType===t.valueType}ale.isDescriptorCompatibleWith=PVd;var OVd=/^[a-z][a-z0-9_.\-/]{0,254}$/i;function wda(e){return e.match(OVd)!=null}ale.isValidName=wda});
export {FNt};
