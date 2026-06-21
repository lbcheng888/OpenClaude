// @ts-nocheck
import {ycn,Nvr} from "./m1314.ts";
import {w1s,R1s,D1s} from "./m1329.ts";
import {b,M} from "../runtime.ts";
import {GD} from "./m1317.ts";
import {cQ} from "./m916.ts";
var P1s=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r}=e;return{setHttpAuthScheme(o){let s=t.findIndex((i)=>i.schemeId===o.schemeId);if(s===-1)t.push(o);else t.splice(s,1,o)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(o){n=o},httpAuthSchemeProvider(){return n},setCredentials(o){r=o},credentials(){return r}}},O1s=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()});
var wcn,L1s=(e,t)=>{let n=Object.assign(wcn.getAwsRegionExtensionConfiguration(e),ycn(e),w1s(e),P1s(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,wcn.resolveAwsRegionExtensionConfiguration(n),Nvr(n),R1s(n),O1s(n))};
var M1s=b(()=>{D1s();GD();wcn=M(cQ(),1)});
export {P1s,O1s,wcn,L1s,M1s};
