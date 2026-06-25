// @ts-nocheck
import {Q9,Gre,aen,WU,oze} from "./m313.ts";
import {toJSONSchema} from "./m306.ts";
import {nfr} from "./m350.ts";
import {b} from "../runtime.ts";
import {bpr} from "./m312.ts";
import {a7o} from "./m351.ts";
function FPc(e){if(!e)return"draft-7";if(e==="jsonSchema7"||e==="draft-7")return"draft-7";if(e==="jsonSchema2019-09"||e==="draft-2020-12")return"draft-2020-12";return"draft-7"}
function ofr(e,t){if(Q9(e))return toJSONSchema(e,{target:FPc(t?.target),io:t?.pipeStrategy??"input"});return nfr(e,{strictUnions:t?.strictUnions??!0,pipeStrategy:t?.pipeStrategy??"input"})}
function sfr(e){let n=Gre(e)?.method;if(!n)throw Error("Schema is missing a method literal");let r=aen(n);if(typeof r!=="string")throw Error("Schema method literal must be a string");return r}
function ifr(e,t){let n=WU(e,t);if(!n.success)throw n.error;return n.data}
var afr=b(()=>{bpr();oze();a7o()});
export {FPc,ofr,sfr,ifr,afr};
