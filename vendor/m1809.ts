// @ts-nocheck
import {X} from "../runtime.ts";
import {HKs} from "./m1807.ts";
import {UKs} from "./m1808.ts";
var LJe=X((MCe)=>{var $Ks=HKs(),dfn=UKs(),d2u=["HS256","HS384","HS512","RS256","RS384","RS512","PS256","PS384","PS512","ES256","ES384","ES512"];MCe.ALGORITHMS=d2u;MCe.sign=$Ks.sign;MCe.verify=dfn.verify;MCe.decode=dfn.decode;MCe.isValid=dfn.isValid;MCe.createSign=function(t){return new $Ks(t)};MCe.createVerify=function(t){return new dfn(t)}});
export {LJe};
