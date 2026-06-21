// @ts-nocheck
import {zX,gen} from "./m554.ts";
import {er,ZE} from "./m460.ts";
import {SR,soe} from "./m527.ts";
import {AMe,nen} from "./m516.ts";
import {gMe,aen} from "./m531.ts";
import {Y_,KX} from "./m522.ts";
import {Tzo,Szo} from "./m552.ts";
import {bzo,Ezo} from "./m553.ts";
import {b} from "../runtime.ts";
var _en=(e)=>{let t=zX({},e),n=(p)=>er.hasOwnProp(t,p)?t[p]:void 0,r=n("data"),o=n("withXSRFToken"),s=n("xsrfHeaderName"),i=n("xsrfCookieName"),a=n("headers"),l=n("auth"),c=n("baseURL"),u=n("allowAbsoluteUrls"),d=n("url");if(t.headers=a=SR.from(a),t.url=AMe(gMe(c,d,u),e.params,e.paramsSerializer),l)a.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):"")));if(er.isFormData(r)){if(Y_.hasStandardBrowserEnv||Y_.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(er.isFunction(r.getHeaders)){let p=r.getHeaders(),m=["content-type","content-length"];Object.entries(p).forEach(([f,A])=>{if(m.includes(f.toLowerCase()))a.set(f,A)})}}if(Y_.hasStandardBrowserEnv){if(er.isFunction(o))o=o(t);if(o===!0||o==null&&Tzo(t.url)){let m=s&&i&&bzo.read(i);if(m)a.set(s,m)}}return t};
var nmr=b(()=>{KX();ZE();Szo();Ezo();aen();gen();soe();nen()});
export {_en,nmr};
