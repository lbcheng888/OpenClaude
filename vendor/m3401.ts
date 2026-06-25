// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {Wee} from "./m3378.ts";
var hUt=Q((ile)=>{Object.defineProperty(ile,"__esModule",{value:!0});ile.isValidName=ile.isDescriptorCompatibleWith=ile.createInstrumentDescriptorWithView=ile.createInstrumentDescriptor=void 0;var Uya=xi(),_np=Wee();function ynp(e,t,n){if(!$ya(e))Uya.diag.warn(`Invalid metric name: "${e}". The metric name should be a ASCII string with a length no greater than 255 characters.`);return{name:e,type:t,description:n?.description??"",unit:n?.unit??"",valueType:n?.valueType??Uya.ValueType.DOUBLE,advice:n?.advice??{}}}ile.createInstrumentDescriptor=ynp;function Tnp(e,t){return{name:e.name??t.name,description:e.description??t.description,type:t.type,unit:t.unit,valueType:t.valueType,advice:t.advice}}ile.createInstrumentDescriptorWithView=Tnp;function Snp(e,t){return(0,_np.equalsCaseInsensitive)(e.name,t.name)&&e.unit===t.unit&&e.type===t.type&&e.valueType===t.valueType}ile.isDescriptorCompatibleWith=Snp;var bnp=/^[a-z][a-z0-9_.\-/]{0,254}$/i;function $ya(e){return e.match(bnp)!=null}ile.isValidName=$ya});
export {hUt};
