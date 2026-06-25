// @ts-nocheck
import {VX,Qnn} from "./m560.ts";
import {rr,oC} from "./m466.ts";
import {Iv,roe} from "./m533.ts";
import {l1e,Nnn} from "./m522.ts";
import {u1e,qnn} from "./m537.ts";
import {X_,GX} from "./m528.ts";
import {_es,yes} from "./m558.ts";
import {Tes,Ses} from "./m559.ts";
import {b} from "../runtime.ts";
var Znn=(e)=>{let t=VX({},e),n=(p)=>rr.hasOwnProp(t,p)?t[p]:void 0,r=n("data"),o=n("withXSRFToken"),s=n("xsrfHeaderName"),i=n("xsrfCookieName"),a=n("headers"),l=n("auth"),c=n("baseURL"),u=n("allowAbsoluteUrls"),d=n("url");if(t.headers=a=Iv.from(a),t.url=l1e(u1e(c,d,u),e.params,e.paramsSerializer),l)a.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):"")));if(rr.isFormData(r)){if(X_.hasStandardBrowserEnv||X_.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(rr.isFunction(r.getHeaders)){let p=r.getHeaders(),m=["content-type","content-length"];Object.entries(p).forEach(([f,h])=>{if(m.includes(f.toLowerCase()))a.set(f,h)})}}if(X_.hasStandardBrowserEnv){if(rr.isFunction(o))o=o(t);if(o===!0||o==null&&_es(t.url)){let m=s&&i&&Tes.read(i);if(m)a.set(s,m)}}return t};
var x_r=b(()=>{GX();oC();yes();Ses();qnn();Qnn();roe();Nnn()});
export {Znn,x_r};
