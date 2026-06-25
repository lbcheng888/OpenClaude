// @ts-nocheck
import {rr,oC} from "./m466.ts";
import {b} from "../runtime.ts";
import {S5,Hi} from "./m467.ts";
import {wAt,MEe} from "./m524.ts";
import {vAt,LEe} from "./m520.ts";
import {cZo,Zgr} from "./m529.ts";
import {GX,X_} from "./m528.ts";
import {e_r,Fnn} from "./m530.ts";
function jWc(e,t,n){if(rr.isString(e))try{return(t||JSON.parse)(e),rr.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}
var Wze=(e,t)=>e!=null&&rr.hasOwnProp(e,t)?e[t]:void 0,t_r,Gze;
var Bnn=b(()=>{oC();S5();wAt();vAt();cZo();GX();e_r();t_r={transitional:MEe,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){let r=n.getContentType()||"",o=r.indexOf("application/json")>-1,s=rr.isObject(t);if(s&&rr.isHTMLForm(t))t=new FormData(t);if(rr.isFormData(t))return o?JSON.stringify(Fnn(t)):t;if(rr.isArrayBuffer(t)||rr.isBuffer(t)||rr.isStream(t)||rr.isFile(t)||rr.isBlob(t)||rr.isReadableStream(t))return t;if(rr.isArrayBufferView(t))return t.buffer;if(rr.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let a;if(s){let l=Wze(this,"formSerializer");if(r.indexOf("application/x-www-form-urlencoded")>-1)return Zgr(t,l).toString();if((a=rr.isFileList(t))||r.indexOf("multipart/form-data")>-1){let c=Wze(this,"env"),u=c&&c.FormData;return LEe(a?{"files[]":t}:t,u&&new u,l)}}if(s||o)return n.setContentType("application/json",!1),jWc(t);return t}],transformResponse:[function(t){let n=Wze(this,"transitional")||t_r.transitional,r=n&&n.forcedJSONParsing,o=Wze(this,"responseType"),s=o==="json";if(rr.isResponse(t)||rr.isReadableStream(t))return t;if(t&&rr.isString(t)&&(r&&!o||s)){let a=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t,Wze(this,"parseReviver"))}catch(l){if(a){if(l.name==="SyntaxError")throw Hi.from(l,Hi.ERR_BAD_RESPONSE,this,null,Wze(this,"response"));throw l}}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:X_.classes.FormData,Blob:X_.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};rr.forEach(["delete","get","head","post","put","patch"],(e)=>{t_r.headers[e]={}});Gze=t_r});
export {jWc,Wze,t_r,Gze,Bnn};
