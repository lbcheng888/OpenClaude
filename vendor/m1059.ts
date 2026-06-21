// @ts-nocheck
import {ein,XSr} from "./m1043.ts";
import {FCs,UCs,GCs} from "./m1058.ts";
import {b,M} from "../runtime.ts";
import {ri} from "./m1046.ts";
import {cQ} from "./m916.ts";
var VCs=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r,token:o}=e;return{setHttpAuthScheme(s){let i=t.findIndex((a)=>a.schemeId===s.schemeId);if(i===-1)t.push(s);else t.splice(i,1,s)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(s){n=s},httpAuthSchemeProvider(){return n},setCredentials(s){r=s},credentials(){return r},setToken(s){o=s},token(){return o}}},KCs=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials(),token:e.token()});
var ain,zCs=(e,t)=>{let n=Object.assign(ain.getAwsRegionExtensionConfiguration(e),ein(e),FCs(e),VCs(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,ain.resolveAwsRegionExtensionConfiguration(n),XSr(n),UCs(n),KCs(n))};
var YCs=b(()=>{GCs();ri();ain=M(cQ(),1)});
export {VCs,KCs,ain,zCs,YCs};
