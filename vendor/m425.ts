// @ts-nocheck
import {b,x} from "../runtime.ts";
import {Mtn} from "./m421.ts";
import {mYo} from "./m424.ts";
function qFc(){let e=new fYo.default({strict:!1,validateFormats:!0,validateSchema:!1,allErrors:!0});return hYo.default(e),e}
class sAt{constructor(e){this._ajv=e??qFc()}getValidator(e){let t="$id"in e&&typeof e.$id==="string"?this._ajv.getSchema(e.$id)??this._ajv.compile(e):this._ajv.compile(e);return(n)=>{if(t(n))return{valid:!0,data:n,errorMessage:void 0};else return{valid:!1,data:void 0,errorMessage:this._ajv.errorsText(t.errors)}}}}
var fYo,hYo;
var Vhr=b(()=>{fYo=x(Mtn(),1),hYo=x(mYo(),1)});
export {qFc,sAt,fYo,hYo,Vhr};
