// @ts-nocheck
import {er,ZE} from "./m460.ts";
import {fen,Jpr} from "./m543.ts";
import {Y_,KX} from "./m522.ts";
import {b,M} from "../runtime.ts";
class jKo{constructor(e,t){let{escapeName:n}=this.constructor,r=er.isString(t),o=`Content-Disposition: form-data; name="${n(e)}"${!r&&t.name?`; filename="${n(t.name)}"`:""}${bMe}`;if(r)t=dbt.encode(String(t).replace(/\r?\n|\r\n?/g,bMe));else{let s=String(t.type||"application/octet-stream").replace(/[\r\n]/g,"");o+=`Content-Type: ${s}${bMe}`}this.headers=dbt.encode(o+bMe),this.contentLength=r?t.byteLength:t.size,this.size=this.headers.byteLength+this.contentLength+U2c,this.name=e,this.value=t}async*encode(){yield this.headers;let{value:e}=this;if(er.isTypedArray(e))yield e;else yield*fen(e);yield F2c}static escapeName(e){return String(e).replace(/[\r\n"]/g,(t)=>({"\r":"%0D","\n":"%0A",'"':"%22"})[t])}}
var $Ko,qKo,B2c,dbt,bMe=`\r
`,F2c,U2c=2,$2c=(e,t,n)=>{let{tag:r="form-data-boundary",size:o=25,boundary:s=r+"-"+Y_.generateString(o,B2c)}=n||{};if(!er.isFormData(e))throw TypeError("FormData instance required");if(s.length<1||s.length>70)throw Error("boundary must be 10-70 characters long");let i=dbt.encode("--"+s+bMe),a=dbt.encode("--"+s+"--"+bMe),l=a.byteLength,c=Array.from(e.entries()).map(([d,p])=>{let m=new jKo(d,p);return l+=m.size,m});l+=i.byteLength*c.length,l=er.toFiniteNumber(l);let u={"Content-Type":`multipart/form-data; boundary=${s}`};if(Number.isFinite(l))u["Content-Length"]=l;return t&&t(u),qKo.Readable.from(async function*(){for(let d of c)yield i,yield*d.encode();yield a}())},WKo;
var GKo=b(()=>{ZE();Jpr();KX();$Ko=M(require("util")),qKo=require("stream"),B2c=Y_.ALPHABET.ALPHA_DIGIT+"-_",dbt=typeof TextEncoder==="function"?new TextEncoder:new $Ko.default.TextEncoder,F2c=dbt.encode(bMe);WKo=$2c});
export {jKo,$Ko,qKo,B2c,dbt,bMe,F2c,U2c,$2c,WKo,GKo};
