// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {Mle} from "./m3660.ts";
var wFt=X(($le)=>{Object.defineProperty($le,"__esModule",{value:!0});$le.isValidName=$le.isDescriptorCompatibleWith=$le.createInstrumentDescriptorWithView=$le.createInstrumentDescriptor=void 0;var TCa=Xi(),dcp=Mle();function pcp(e,t,n){if(!SCa(e))TCa.diag.warn(`Invalid metric name: "${e}". The metric name should be a ASCII string with a length no greater than 255 characters.`);return{name:e,type:t,description:n?.description??"",unit:n?.unit??"",valueType:n?.valueType??TCa.ValueType.DOUBLE,advice:n?.advice??{}}}$le.createInstrumentDescriptor=pcp;function mcp(e,t){return{name:e.name??t.name,description:e.description??t.description,type:t.type,unit:t.unit,valueType:t.valueType,advice:t.advice}}$le.createInstrumentDescriptorWithView=mcp;function fcp(e,t){return(0,dcp.equalsCaseInsensitive)(e.name,t.name)&&e.unit===t.unit&&e.type===t.type&&e.valueType===t.valueType}$le.isDescriptorCompatibleWith=fcp;var Acp=/^[a-z][a-z0-9_.\-/]{0,254}$/i;function SCa(e){return Acp.test(e)}$le.isValidName=SCa});
export {wFt};
