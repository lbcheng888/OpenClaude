// @ts-nocheck
import {P3,Vre,xXt,b2,aVe} from "./m311.ts";
import {toJSONSchema} from "./m304.ts";
import {kcr} from "./m348.ts";
import {b} from "../runtime.ts";
import {zar} from "./m310.ts";
import {pjo} from "./m349.ts";
function OCc(e){if(!e)return"draft-7";if(e==="jsonSchema7"||e==="draft-7")return"draft-7";if(e==="jsonSchema2019-09"||e==="draft-2020-12")return"draft-2020-12";return"draft-7"}
function Icr(e,t){if(P3(e))return toJSONSchema(e,{target:OCc(t?.target),io:t?.pipeStrategy??"input"});return kcr(e,{strictUnions:t?.strictUnions??!0,pipeStrategy:t?.pipeStrategy??"input"})}
function Dcr(e){let n=Vre(e)?.method;if(!n)throw Error("Schema is missing a method literal");let r=xXt(n);if(typeof r!=="string")throw Error("Schema method literal must be a string");return r}
function Pcr(e,t){let n=b2(e,t);if(!n.success)throw n.error;return n.data}
var Ocr=b(()=>{zar();aVe();pjo()});
export {OCc,Icr,Dcr,Pcr,Ocr};
