// @ts-nocheck
import {normalizeParams,pp} from "./m254.ts";
import {$ZodCheckLessThan,$ZodCheckGreaterThan,$ZodCheckMultipleOf,$ZodCheckMaxSize,$ZodCheckMinSize,$ZodCheckSizeEquals,$ZodCheckMaxLength,$ZodCheckMinLength,$ZodCheckLengthEquals,$ZodCheckRegex,$ZodCheckLowerCase,$ZodCheckUpperCase,$ZodCheckIncludes,$ZodCheckStartsWith,$ZodCheckEndsWith,$ZodCheckProperty,$ZodCheckMimeType,$ZodCheckOverwrite,JYt} from "./m258.ts";
import {$ZodType,$ZodPipe,$ZodBoolean,$ZodString,$ZodTransform,eTt} from "./m260.ts";
import {b} from "../runtime.ts";
function _string(e,t){return new e({type:"string",...normalizeParams(t)})}
function _coercedString(e,t){return new e({type:"string",coerce:!0,...normalizeParams(t)})}
function _email(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...normalizeParams(t)})}
function _guid(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...normalizeParams(t)})}
function _uuid(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...normalizeParams(t)})}
function _uuidv4(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...normalizeParams(t)})}
function _uuidv6(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...normalizeParams(t)})}
function _uuidv7(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...normalizeParams(t)})}
function _url(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...normalizeParams(t)})}
function uTt(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...normalizeParams(t)})}
function _nanoid(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...normalizeParams(t)})}
function _cuid(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...normalizeParams(t)})}
function _cuid2(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...normalizeParams(t)})}
function _ulid(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...normalizeParams(t)})}
function _xid(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...normalizeParams(t)})}
function _ksuid(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...normalizeParams(t)})}
function _ipv4(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...normalizeParams(t)})}
function _ipv6(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...normalizeParams(t)})}
function _cidrv4(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...normalizeParams(t)})}
function _cidrv6(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...normalizeParams(t)})}
function _base64(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...normalizeParams(t)})}
function _base64url(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...normalizeParams(t)})}
function _e164(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...normalizeParams(t)})}
function _jwt(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...normalizeParams(t)})}
function _isoDateTime(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...normalizeParams(t)})}
function _isoDate(e,t){return new e({type:"string",format:"date",check:"string_format",...normalizeParams(t)})}
function _isoTime(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...normalizeParams(t)})}
function _isoDuration(e,t){return new e({type:"string",format:"duration",check:"string_format",...normalizeParams(t)})}
function _number(e,t){return new e({type:"number",checks:[],...normalizeParams(t)})}
function _coercedNumber(e,t){return new e({type:"number",coerce:!0,checks:[],...normalizeParams(t)})}
function _int(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...normalizeParams(t)})}
function _float32(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"float32",...normalizeParams(t)})}
function _float64(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"float64",...normalizeParams(t)})}
function _int32(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"int32",...normalizeParams(t)})}
function _uint32(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"uint32",...normalizeParams(t)})}
function _boolean(e,t){return new e({type:"boolean",...normalizeParams(t)})}
function _coercedBoolean(e,t){return new e({type:"boolean",coerce:!0,...normalizeParams(t)})}
function _bigint(e,t){return new e({type:"bigint",...normalizeParams(t)})}
function _coercedBigint(e,t){return new e({type:"bigint",coerce:!0,...normalizeParams(t)})}
function _int64(e,t){return new e({type:"bigint",check:"bigint_format",abort:!1,format:"int64",...normalizeParams(t)})}
function _uint64(e,t){return new e({type:"bigint",check:"bigint_format",abort:!1,format:"uint64",...normalizeParams(t)})}
function _symbol(e,t){return new e({type:"symbol",...normalizeParams(t)})}
function _undefined(e,t){return new e({type:"undefined",...normalizeParams(t)})}
function _null(e,t){return new e({type:"null",...normalizeParams(t)})}
function _any(e){return new e({type:"any"})}
function _unknown(e){return new e({type:"unknown"})}
function _never(e,t){return new e({type:"never",...normalizeParams(t)})}
function _void(e,t){return new e({type:"void",...normalizeParams(t)})}
function _date(e,t){return new e({type:"date",...normalizeParams(t)})}
function _coercedDate(e,t){return new e({type:"date",coerce:!0,...normalizeParams(t)})}
function _nan(e,t){return new e({type:"nan",...normalizeParams(t)})}
function ppe(e,t){return new $ZodCheckLessThan({check:"less_than",...normalizeParams(t),value:e,inclusive:!1})}
function KV(e,t){return new $ZodCheckLessThan({check:"less_than",...normalizeParams(t),value:e,inclusive:!0})}
function mpe(e,t){return new $ZodCheckGreaterThan({check:"greater_than",...normalizeParams(t),value:e,inclusive:!1})}
function D3(e,t){return new $ZodCheckGreaterThan({check:"greater_than",...normalizeParams(t),value:e,inclusive:!0})}
function Bar(e){return mpe(0,e)}
function Far(e){return ppe(0,e)}
function Uar(e){return KV(0,e)}
function $ar(e){return D3(0,e)}
function GLe(e,t){return new $ZodCheckMultipleOf({check:"multiple_of",...normalizeParams(t),value:e})}
function rVe(e,t){return new $ZodCheckMaxSize({check:"max_size",...normalizeParams(t),maximum:e})}
function VLe(e,t){return new $ZodCheckMinSize({check:"min_size",...normalizeParams(t),minimum:e})}
function vTt(e,t){return new $ZodCheckSizeEquals({check:"size_equals",...normalizeParams(t),size:e})}
function oVe(e,t){return new $ZodCheckMaxLength({check:"max_length",...normalizeParams(t),maximum:e})}
function PSe(e,t){return new $ZodCheckMinLength({check:"min_length",...normalizeParams(t),minimum:e})}
function sVe(e,t){return new $ZodCheckLengthEquals({check:"length_equals",...normalizeParams(t),length:e})}
function wTt(e,t){return new $ZodCheckRegex({check:"string_format",format:"regex",...normalizeParams(t),pattern:e})}
function RTt(e){return new $ZodCheckLowerCase({check:"string_format",format:"lowercase",...normalizeParams(e)})}
function xTt(e){return new $ZodCheckUpperCase({check:"string_format",format:"uppercase",...normalizeParams(e)})}
function kTt(e,t){return new $ZodCheckIncludes({check:"string_format",format:"includes",...normalizeParams(t),includes:e})}
function HTt(e,t){return new $ZodCheckStartsWith({check:"string_format",format:"starts_with",...normalizeParams(t),prefix:e})}
function ITt(e,t){return new $ZodCheckEndsWith({check:"string_format",format:"ends_with",...normalizeParams(t),suffix:e})}
function qar(e,t,n){return new $ZodCheckProperty({check:"property",property:e,schema:t,...normalizeParams(n)})}
function DTt(e,t){return new $ZodCheckMimeType({check:"mime_type",mime:e,...normalizeParams(t)})}
function fpe(e){return new $ZodCheckOverwrite({check:"overwrite",tx:e})}
function PTt(e){return fpe((t)=>t.normalize(e))}
function OTt(){return fpe((e)=>e.trim())}
function LTt(){return fpe((e)=>e.toLowerCase())}
function MTt(){return fpe((e)=>e.toUpperCase())}
function _array(e,t,n){return new e({type:"array",element:t,...normalizeParams(n)})}
function _union(e,t,n){return new e({type:"union",options:t,...normalizeParams(n)})}
function _discriminatedUnion(e,t,n,r){return new e({type:"union",options:n,discriminator:t,...normalizeParams(r)})}
function _intersection(e,t,n){return new e({type:"intersection",left:t,right:n})}
function _tuple(e,t,n,r){let o=n instanceof $ZodType;return new e({type:"tuple",items:t,rest:o?n:null,...normalizeParams(o?r:n)})}
function _record(e,t,n,r){return new e({type:"record",keyType:t,valueType:n,...normalizeParams(r)})}
function _map(e,t,n,r){return new e({type:"map",keyType:t,valueType:n,...normalizeParams(r)})}
function _set(e,t,n){return new e({type:"set",valueType:t,...normalizeParams(n)})}
function _enum(e,t,n){let r=Array.isArray(t)?Object.fromEntries(t.map((o)=>[o,o])):t;return new e({type:"enum",entries:r,...normalizeParams(n)})}
function _nativeEnum(e,t,n){return new e({type:"enum",entries:t,...normalizeParams(n)})}
function _literal(e,t,n){return new e({type:"literal",values:Array.isArray(t)?t:[t],...normalizeParams(n)})}
function _file(e,t){return new e({type:"file",...normalizeParams(t)})}
function _transform(e,t){return new e({type:"transform",transform:t})}
function _optional(e,t){return new e({type:"optional",innerType:t})}
function _nullable(e,t){return new e({type:"nullable",innerType:t})}
function _default(e,t,n){return new e({type:"default",innerType:t,get defaultValue(){return typeof n==="function"?n():n}})}
function _nonoptional(e,t,n){return new e({type:"nonoptional",innerType:t,...normalizeParams(n)})}
function _success(e,t){return new e({type:"success",innerType:t})}
function _catch(e,t,n){return new e({type:"catch",innerType:t,catchValue:typeof n==="function"?n:()=>n})}
function _pipe(e,t,n){return new e({type:"pipe",in:t,out:n})}
function _readonly(e,t){return new e({type:"readonly",innerType:t})}
function _templateLiteral(e,t,n){return new e({type:"template_literal",parts:t,...normalizeParams(n)})}
function _lazy(e,t){return new e({type:"lazy",getter:t})}
function _promise(e,t){return new e({type:"promise",innerType:t})}
function _custom(e,t,n){let r=normalizeParams(n);return r.abort??(r.abort=!0),new e({type:"custom",check:"custom",fn:t,...r})}
function _refine(e,t,n){return new e({type:"custom",check:"custom",fn:t,...normalizeParams(n)})}
function _stringbool(e,t){let n=normalizeParams(t),r=n.truthy??["true","1","yes","on","y","enabled"],o=n.falsy??["false","0","no","off","n","disabled"];if(n.case!=="sensitive")r=r.map((f)=>typeof f==="string"?f.toLowerCase():f),o=o.map((f)=>typeof f==="string"?f.toLowerCase():f);let s=new Set(r),i=new Set(o),a=e.Pipe??$ZodPipe,l=e.Boolean??$ZodBoolean,c=e.String??$ZodString,d=new(e.Transform??$ZodTransform)({type:"transform",transform:(f,A)=>{let h=f;if(n.case!=="sensitive")h=h.toLowerCase();if(s.has(h))return!0;else if(i.has(h))return!1;else return A.issues.push({code:"invalid_value",expected:"stringbool",values:[...s,...i],input:A.value,inst:d}),{}},error:n.error}),p=new a({type:"pipe",in:new c({type:"string",error:n.error}),out:d,error:n.error});return new a({type:"pipe",in:p,out:new l({type:"boolean",error:n.error}),error:n.error})}
function _stringFormat(e,t,n,r={}){let o=normalizeParams(r),s={...normalizeParams(r),check:"string_format",type:"string",format:t,fn:typeof n==="function"?n:(a)=>n.test(a),...o};if(n instanceof RegExp)s.pattern=n;return new e(s)}
var TimePrecision;
var War=b(()=>{JYt();eTt();pp();TimePrecision={Any:null,Minute:-1,Second:0,Millisecond:3,Microsecond:6}});
export {_string,_coercedString,_email,_guid,_uuid,_uuidv4,_uuidv6,_uuidv7,_url,uTt,_nanoid,_cuid,_cuid2,_ulid,_xid,_ksuid,_ipv4,_ipv6,_cidrv4,_cidrv6,_base64,_base64url,_e164,_jwt,_isoDateTime,_isoDate,_isoTime,_isoDuration,_number,_coercedNumber,_int,_float32,_float64,_int32,_uint32,_boolean,_coercedBoolean,_bigint,_coercedBigint,_int64,_uint64,_symbol,_undefined,_null,_any,_unknown,_never,_void,_date,_coercedDate,_nan,ppe,KV,mpe,D3,Bar,Far,Uar,$ar,GLe,rVe,VLe,vTt,oVe,PSe,sVe,wTt,RTt,xTt,kTt,HTt,ITt,qar,DTt,fpe,PTt,OTt,LTt,MTt,_array,_union,_discriminatedUnion,_intersection,_tuple,_record,_map,_set,_enum,_nativeEnum,_literal,_file,_transform,_optional,_nullable,_default,_nonoptional,_success,_catch,_pipe,_readonly,_templateLiteral,_lazy,_promise,_custom,_refine,_stringbool,_stringFormat,TimePrecision,War};
