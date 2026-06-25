// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {Lle} from "./m3676.ts";
var n$t=Q((Ule)=>{Object.defineProperty(Ule,"__esModule",{value:!0});Ule.isValidName=Ule.isDescriptorCompatibleWith=Ule.createInstrumentDescriptorWithView=Ule.createInstrumentDescriptor=void 0;var L0a=xi(),QTp=Lle();function ZTp(e,t,n){if(!M0a(e))L0a.diag.warn(`Invalid metric name: "${e}". The metric name should be a ASCII string with a length no greater than 255 characters.`);return{name:e,type:t,description:n?.description??"",unit:n?.unit??"",valueType:n?.valueType??L0a.ValueType.DOUBLE,advice:n?.advice??{}}}Ule.createInstrumentDescriptor=ZTp;function eSp(e,t){return{name:e.name??t.name,description:e.description??t.description,type:t.type,unit:t.unit,valueType:t.valueType,advice:t.advice}}Ule.createInstrumentDescriptorWithView=eSp;function tSp(e,t){return(0,QTp.equalsCaseInsensitive)(e.name,t.name)&&e.unit===t.unit&&e.type===t.type&&e.valueType===t.valueType}Ule.isDescriptorCompatibleWith=tSp;var nSp=/^[a-z][a-z0-9_.\-/]{0,254}$/i;function M0a(e){return nSp.test(e)}Ule.isValidName=M0a});
export {n$t};
