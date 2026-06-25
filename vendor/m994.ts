// @ts-nocheck
import {Q} from "../runtime.ts";
var TRs=Q((nJe)=>{Object.defineProperty(nJe,"__esModule",{value:!0});nJe.resolveHttpAuthRuntimeConfig=nJe.getHttpAuthExtensionConfiguration=void 0;var jCu=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r}=e;return{setHttpAuthScheme(o){let s=t.findIndex((i)=>i.schemeId===o.schemeId);if(s===-1)t.push(o);else t.splice(s,1,o)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(o){n=o},httpAuthSchemeProvider(){return n},setCredentials(o){r=o},credentials(){return r}}};nJe.getHttpAuthExtensionConfiguration=jCu;var YCu=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()});nJe.resolveHttpAuthRuntimeConfig=YCu});
export {TRs};
