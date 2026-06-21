// @ts-nocheck
import {gln,bCr} from "./m1233.ts";
import {ePs,tPs,iPs} from "./m1257.ts";
import {b,M} from "../runtime.ts";
import {PO} from "./m1236.ts";
import {cQ} from "./m916.ts";
var aPs=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r,token:o}=e;return{setHttpAuthScheme(s){let i=t.findIndex((a)=>a.schemeId===s.schemeId);if(i===-1)t.push(s);else t.splice(i,1,s)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(s){n=s},httpAuthSchemeProvider(){return n},setCredentials(s){r=s},credentials(){return r},setToken(s){o=s},token(){return o}}},lPs=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials(),token:e.token()});
var Cln,cPs=(e,t)=>{let n=Object.assign(Cln.getAwsRegionExtensionConfiguration(e),gln(e),ePs(e),aPs(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,Cln.resolveAwsRegionExtensionConfiguration(n),bCr(n),tPs(n),lPs(n))};
var uPs=b(()=>{iPs();PO();Cln=M(cQ(),1)});
export {aPs,lPs,Cln,cPs,uPs};
