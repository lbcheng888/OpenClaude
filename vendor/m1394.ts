// @ts-nocheck
import {xpn,BIr} from "./m1378.ts";
import {oqs,sqs,uqs} from "./m1393.ts";
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {iQ} from "./m921.ts";
var dqs=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r}=e;return{setHttpAuthScheme(o){let s=t.findIndex((i)=>i.schemeId===o.schemeId);if(s===-1)t.push(o);else t.splice(s,1,o)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(o){n=o},httpAuthSchemeProvider(){return n},setCredentials(o){r=o},credentials(){return r}}},pqs=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()});
var Upn,mqs=(e,t)=>{let n=Object.assign(Upn.getAwsRegionExtensionConfiguration(e),xpn(e),oqs(e),dqs(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,Upn.resolveAwsRegionExtensionConfiguration(n),BIr(n),sqs(n),pqs(n))};
var fqs=b(()=>{uqs();vy();Upn=x(iQ(),1)});
export {dqs,pqs,Upn,mqs,fqs};
