// @ts-nocheck
import {er,ZE} from "./m460.ts";
import {b} from "../runtime.ts";
import {o8,Ji} from "./m461.ts";
import {tbt,ebe} from "./m518.ts";
import {ebt,ZSe} from "./m514.ts";
import {pKo,Cpr} from "./m523.ts";
import {KX,Y_} from "./m522.ts";
import {vpr,ren} from "./m524.ts";
function $Uc(e,t,n){if(er.isString(e))try{return(t||JSON.parse)(e),er.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}
var GVe=(e,t)=>e!=null&&er.hasOwnProp(e,t)?e[t]:void 0,wpr,VVe;
var oen=b(()=>{ZE();o8();tbt();ebt();pKo();KX();vpr();wpr={transitional:ebe,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){let r=n.getContentType()||"",o=r.indexOf("application/json")>-1,s=er.isObject(t);if(s&&er.isHTMLForm(t))t=new FormData(t);if(er.isFormData(t))return o?JSON.stringify(ren(t)):t;if(er.isArrayBuffer(t)||er.isBuffer(t)||er.isStream(t)||er.isFile(t)||er.isBlob(t)||er.isReadableStream(t))return t;if(er.isArrayBufferView(t))return t.buffer;if(er.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let a;if(s){let l=GVe(this,"formSerializer");if(r.indexOf("application/x-www-form-urlencoded")>-1)return Cpr(t,l).toString();if((a=er.isFileList(t))||r.indexOf("multipart/form-data")>-1){let c=GVe(this,"env"),u=c&&c.FormData;return ZSe(a?{"files[]":t}:t,u&&new u,l)}}if(s||o)return n.setContentType("application/json",!1),$Uc(t);return t}],transformResponse:[function(t){let n=GVe(this,"transitional")||wpr.transitional,r=n&&n.forcedJSONParsing,o=GVe(this,"responseType"),s=o==="json";if(er.isResponse(t)||er.isReadableStream(t))return t;if(t&&er.isString(t)&&(r&&!o||s)){let a=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t,GVe(this,"parseReviver"))}catch(l){if(a){if(l.name==="SyntaxError")throw Ji.from(l,Ji.ERR_BAD_RESPONSE,this,null,GVe(this,"response"));throw l}}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Y_.classes.FormData,Blob:Y_.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};er.forEach(["delete","get","head","post","put","patch"],(e)=>{wpr.headers[e]={}});VVe=wpr});
export {$Uc,GVe,wpr,VVe,oen};
