// @ts-nocheck
import {fromInstanceMetadata} from "./m764.ts";
import {b,M} from "../runtime.ts";
import {p1e} from "./m765.ts";
import {r0} from "./m751.ts";
var $2s,HPu=(e)=>(e?.logger?.debug("@smithy/credential-provider-imds","fromInstanceMetadata"),async()=>fromInstanceMetadata(e)().then((t)=>$2s.setCredentialFeature(t,"CREDENTIALS_IMDS","0")));
var q2s=b(()=>{p1e();$2s=M(r0(),1)});
export {$2s,HPu,q2s};
