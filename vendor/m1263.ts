// @ts-nocheck
import {tdn,Xkr} from "./m1238.ts";
import {jNs,YNs,eFs} from "./m1262.ts";
import {b,x} from "../runtime.ts";
import {QP} from "./m1241.ts";
import {iQ} from "./m921.ts";
var tFs=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r,token:o}=e;return{setHttpAuthScheme(s){let i=t.findIndex((a)=>a.schemeId===s.schemeId);if(i===-1)t.push(s);else t.splice(i,1,s)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(s){n=s},httpAuthSchemeProvider(){return n},setCredentials(s){r=s},credentials(){return r},setToken(s){o=s},token(){return o}}},nFs=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials(),token:e.token()});
var ldn,rFs=(e,t)=>{let n=Object.assign(ldn.getAwsRegionExtensionConfiguration(e),tdn(e),jNs(e),tFs(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,ldn.resolveAwsRegionExtensionConfiguration(n),Xkr(n),YNs(n),nFs(n))};
var oFs=b(()=>{eFs();QP();ldn=x(iQ(),1)});
export {tFs,nFs,ldn,rFs,oFs};
