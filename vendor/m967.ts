// @ts-nocheck
import {Man,iRr} from "./m951.ts";
import {QCs,ZCs,oAs} from "./m966.ts";
import {b,x} from "../runtime.ts";
import {n7} from "./m954.ts";
import {iQ} from "./m921.ts";
var sAs=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r}=e;return{setHttpAuthScheme(o){let s=t.findIndex((i)=>i.schemeId===o.schemeId);if(s===-1)t.push(o);else t.splice(s,1,o)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(o){n=o},httpAuthSchemeProvider(){return n},setCredentials(o){r=o},credentials(){return r}}},iAs=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()});
var Van,aAs=(e,t)=>{let n=Object.assign(Van.getAwsRegionExtensionConfiguration(e),Man(e),QCs(e),sAs(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,Van.resolveAwsRegionExtensionConfiguration(n),iRr(n),ZCs(n),iAs(n))};
var lAs=b(()=>{oAs();n7();Van=x(iQ(),1)});
export {sAs,iAs,Van,aAs,lAs};
