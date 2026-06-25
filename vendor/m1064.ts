// @ts-nocheck
import {Nln,vvr} from "./m1048.ts";
import {PIs,OIs,BIs} from "./m1063.ts";
import {b,x} from "../runtime.ts";
import {$s} from "./m1051.ts";
import {iQ} from "./m921.ts";
var UIs=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r,token:o}=e;return{setHttpAuthScheme(s){let i=t.findIndex((a)=>a.schemeId===s.schemeId);if(i===-1)t.push(s);else t.splice(i,1,s)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(s){n=s},httpAuthSchemeProvider(){return n},setCredentials(s){r=s},credentials(){return r},setToken(s){o=s},token(){return o}}},$Is=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials(),token:e.token()});
var Gln,qIs=(e,t)=>{let n=Object.assign(Gln.getAwsRegionExtensionConfiguration(e),Nln(e),PIs(e),UIs(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,Gln.resolveAwsRegionExtensionConfiguration(n),vvr(n),OIs(n),$Is(n))};
var WIs=b(()=>{BIs();$s();Gln=x(iQ(),1)});
export {UIs,$Is,Gln,qIs,WIs};
