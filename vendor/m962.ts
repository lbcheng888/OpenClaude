// @ts-nocheck
import {Zon,ITr} from "./m946.ts";
import {o_s,s_s,u_s} from "./m961.ts";
import {b,M} from "../runtime.ts";
import {H7} from "./m949.ts";
import {cQ} from "./m916.ts";
var d_s=(e)=>{let{httpAuthSchemes:t,httpAuthSchemeProvider:n,credentials:r}=e;return{setHttpAuthScheme(o){let s=t.findIndex((i)=>i.schemeId===o.schemeId);if(s===-1)t.push(o);else t.splice(s,1,o)},httpAuthSchemes(){return t},setHttpAuthSchemeProvider(o){n=o},httpAuthSchemeProvider(){return n},setCredentials(o){r=o},credentials(){return r}}},p_s=(e)=>({httpAuthSchemes:e.httpAuthSchemes(),httpAuthSchemeProvider:e.httpAuthSchemeProvider(),credentials:e.credentials()});
var lsn,m_s=(e,t)=>{let n=Object.assign(lsn.getAwsRegionExtensionConfiguration(e),Zon(e),o_s(e),d_s(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,lsn.resolveAwsRegionExtensionConfiguration(n),ITr(n),s_s(n),p_s(n))};
var f_s=b(()=>{u_s();H7();lsn=M(cQ(),1)});
export {d_s,p_s,lsn,m_s,f_s};
