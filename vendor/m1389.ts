// @ts-nocheck
import {Kcn,uwr} from "./m1373.ts";
import {cUs,uUs,AUs} from "./m1388.ts";
import {b,M} from "../runtime.ts";
import {Ry} from "./m1376.ts";
import {cQ} from "./m916.ts";
var hUs=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r}=e;return{setHttpAuthScheme(o){let s=t.findIndex((i)=>i.schemeId===o.schemeId);if(s===-1)t.push(o);else t.splice(s,1,o)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(o){n=o},httpAuthSchemeProvider(){return n},setCredentials(o){r=o},credentials(){return r}}},gUs=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()});
var nun,_Us=(e,t)=>{let n=Object.assign(nun.getAwsRegionExtensionConfiguration(e),Kcn(e),cUs(e),hUs(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,nun.resolveAwsRegionExtensionConfiguration(n),uwr(n),uUs(n),gUs(n))};
var yUs=b(()=>{AUs();Ry();nun=M(cQ(),1)});
export {hUs,gUs,nun,_Us,yUs};
