// @ts-nocheck
import {Q} from "../runtime.ts";
import {RZs} from "./m1812.ts";
import {LZs} from "./m1813.ts";
var PQe=Q((TRe)=>{var MZs=RZs(),zgn=LZs(),IGu=["HS256","HS384","HS512","RS256","RS384","RS512","PS256","PS384","PS512","ES256","ES384","ES512"];TRe.ALGORITHMS=IGu;TRe.sign=MZs.sign;TRe.verify=zgn.verify;TRe.decode=zgn.decode;TRe.isValid=zgn.isValid;TRe.createSign=function(t){return new MZs(t)};TRe.createVerify=function(t){return new zgn(t)}});
export {PQe};
