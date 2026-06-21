// @ts-nocheck
import {X} from "../runtime.ts";
var vys=X((oze)=>{Object.defineProperty(oze,"__esModule",{value:!0});oze.resolveHttpAuthRuntimeConfig=oze.getHttpAuthExtensionConfiguration=void 0;var Dmu=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r}=e;return{setHttpAuthScheme(o){let s=t.findIndex((i)=>i.schemeId===o.schemeId);if(s===-1)t.push(o);else t.splice(s,1,o)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(o){n=o},httpAuthSchemeProvider(){return n},setCredentials(o){r=o},credentials(){return r}}};oze.getHttpAuthExtensionConfiguration=Dmu;var Pmu=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()});oze.resolveHttpAuthRuntimeConfig=Pmu});
export {vys};
