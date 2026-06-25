// @ts-nocheck
import {Q} from "../runtime.ts";
import {iQ} from "./m921.ts";
import {Ian} from "./m922.ts";
import {m2} from "./m901.ts";
import {TRs} from "./m994.ts";
var ARs=Q((cln)=>{Object.defineProperty(cln,"__esModule",{value:!0});cln.resolveRuntimeExtensions=void 0;var SRs=iQ(),bRs=Ian(),ERs=m2(),CRs=TRs(),JCu=(e,t)=>{let n=Object.assign((0,SRs.getAwsRegionExtensionConfiguration)(e),(0,ERs.getDefaultExtensionConfiguration)(e),(0,bRs.getHttpHandlerExtensionConfiguration)(e),(0,CRs.getHttpAuthExtensionConfiguration)(e));return t.forEach((r)=>r.configure(n)),Object.assign(e,(0,SRs.resolveAwsRegionExtensionConfiguration)(n),(0,ERs.resolveDefaultRuntimeConfig)(n),(0,bRs.resolveHttpHandlerRuntimeConfig)(n),(0,CRs.resolveHttpAuthRuntimeConfig)(n))};cln.resolveRuntimeExtensions=JCu});
export {ARs};
