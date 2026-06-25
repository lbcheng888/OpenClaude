// @ts-nocheck
import {b} from "../runtime.ts";
function gEe(e){return e==="completed"||e==="failed"||e==="cancelled"}
var HKo,kKo,IKo=(e)=>typeof e==="string"?{...kKo,name:e}:{...kKo,...e};
var Ven=b(()=>{HKo=Symbol("Let zodToJsonSchema decide on which parser to use"),kKo={name:void 0,$refStrategy:"root",basePath:["#"],effectStrategy:"input",pipeStrategy:"all",dateStrategy:"format:date-time",mapStrategy:"entries",removeAdditionalStrategy:"passthrough",allowedAdditionalProperties:!0,rejectedAdditionalProperties:!1,definitionPath:"definitions",target:"jsonSchema7",strictUnions:!1,definitions:{},errorMessages:!1,markdownDescription:!1,patternStrategy:"escape",applyRegexFlags:!1,emailStrategy:"format:email",base64Strategy:"contentEncoding:base64",nameStrategy:"ref",openAiAnyTypeName:"OpenAiAnyType"}});
export {gEe,HKo,kKo,IKo,Ven};
