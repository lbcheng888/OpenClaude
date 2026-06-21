// @ts-nocheck
import {b,M} from "../runtime.ts";
import {rZt} from "./m419.ts";
import {_Wo} from "./m422.ts";
function BHc(){let e=new yWo.default({strict:!1,validateFormats:!0,validateSchema:!1,allErrors:!0});return TWo.default(e),e}
class PSt{constructor(e){this._ajv=e??BHc()}getValidator(e){let t="$id"in e&&typeof e.$id==="string"?this._ajv.getSchema(e.$id)??this._ajv.compile(e):this._ajv.compile(e);return(n)=>{if(t(n))return{valid:!0,data:n,errorMessage:void 0};else return{valid:!1,data:void 0,errorMessage:this._ajv.errorsText(t.errors)}}}}
var yWo,TWo;
var _dr=b(()=>{yWo=M(rZt(),1),TWo=M(_Wo(),1)});
export {BHc,PSt,yWo,TWo,_dr};
