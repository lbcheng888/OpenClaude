// @ts-nocheck
import {rr,oC} from "./m466.ts";
import {Ynn,R_r} from "./m549.ts";
import {X_,GX} from "./m528.ts";
import {b,x} from "../runtime.ts";
class UZo{constructor(e,t){let{escapeName:n}=this.constructor,r=rr.isString(t),o=`Content-Disposition: form-data; name="${n(e)}"${!r&&t.name?`; filename="${n(t.name)}"`:""}${h1e}`;if(r)t=NAt.encode(String(t).replace(/\r?\n|\r\n?/g,h1e));else{let s=String(t.type||"application/octet-stream").replace(/[\r\n]/g,"");o+=`Content-Type: ${s}${h1e}`}this.headers=NAt.encode(o+h1e),this.contentLength=r?t.byteLength:t.size,this.size=this.headers.byteLength+this.contentLength+zGc,this.name=e,this.value=t}async*encode(){yield this.headers;let{value:e}=this;if(rr.isTypedArray(e))yield e;else yield*Ynn(e);yield KGc}static escapeName(e){return String(e).replace(/[\r\n"]/g,(t)=>({"\r":"%0D","\n":"%0A",'"':"%22"})[t])}}
var FZo,BZo,VGc,NAt,h1e=`\r
`,KGc,zGc=2,jGc=(e,t,n)=>{let{tag:r="form-data-boundary",size:o=25,boundary:s=r+"-"+X_.generateString(o,VGc)}=n||{};if(!rr.isFormData(e))throw TypeError("FormData instance required");if(s.length<1||s.length>70)throw Error("boundary must be 10-70 characters long");let i=NAt.encode("--"+s+h1e),a=NAt.encode("--"+s+"--"+h1e),l=a.byteLength,c=Array.from(e.entries()).map(([d,p])=>{let m=new UZo(d,p);return l+=m.size,m});l+=i.byteLength*c.length,l=rr.toFiniteNumber(l);let u={"Content-Type":`multipart/form-data; boundary=${s}`};if(Number.isFinite(l))u["Content-Length"]=l;return t&&t(u),BZo.Readable.from(async function*(){for(let d of c)yield i,yield*d.encode();yield a}())},$Zo;
var qZo=b(()=>{oC();R_r();GX();FZo=x(require("util")),BZo=require("stream"),VGc=X_.ALPHABET.ALPHA_DIGIT+"-_",NAt=typeof TextEncoder==="function"?new TextEncoder:new FZo.default.TextEncoder,KGc=NAt.encode(h1e);$Zo=jGc});
export {UZo,FZo,BZo,VGc,NAt,h1e,KGc,zGc,jGc,$Zo,qZo};
