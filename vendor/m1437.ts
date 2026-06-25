// @ts-nocheck
import {fromInstanceMetadata} from "./m769.ts";
import {b,x} from "../runtime.ts";
import {sNe} from "./m770.ts";
import {b0} from "./m756.ts";
var M6s,z$u=(e)=>(e?.logger?.debug("@smithy/credential-provider-imds","fromInstanceMetadata"),async()=>fromInstanceMetadata(e)().then((t)=>M6s.setCredentialFeature(t,"CREDENTIALS_IMDS","0")));
var N6s=b(()=>{sNe();M6s=x(b0(),1)});
export {M6s,z$u,N6s};
