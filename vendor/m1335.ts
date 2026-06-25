// @ts-nocheck
import {rpn,pIr} from "./m1319.ts";
import {b$s,E$s,w$s} from "./m1334.ts";
import {b,x} from "../runtime.ts";
import {rD} from "./m1322.ts";
import {iQ} from "./m921.ts";
var k$s=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r}=e;return{setHttpAuthScheme(o){let s=t.findIndex((i)=>i.schemeId===o.schemeId);if(s===-1)t.push(o);else t.splice(s,1,o)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(o){n=o},httpAuthSchemeProvider(){return n},setCredentials(o){r=o},credentials(){return r}}},H$s=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()});
var upn,I$s=(e,t)=>{let n=Object.assign(upn.getAwsRegionExtensionConfiguration(e),rpn(e),b$s(e),k$s(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,upn.resolveAwsRegionExtensionConfiguration(n),pIr(n),E$s(n),H$s(n))};
var x$s=b(()=>{w$s();rD();upn=x(iQ(),1)});
export {k$s,H$s,upn,I$s,x$s};
