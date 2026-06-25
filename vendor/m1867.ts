// @ts-nocheck
import {Q} from "../runtime.ts";
import {Mti} from "./m1865.ts";
import {Fti} from "./m1866.ts";
var s1r=Q((DWh,Bti)=>{var w7u=Mti(),k7u=Fti(),H7u={ec:["ES256","ES384","ES512"],rsa:["RS256","PS256","RS384","PS384","RS512","PS512"],"rsa-pss":["PS256","PS384","PS512"]},I7u={ES256:"prime256v1",ES384:"secp384r1",ES512:"secp521r1"};Bti.exports=function(e,t){if(!e||!t)return;let n=t.asymmetricKeyType;if(!n)return;let r=H7u[n];if(!r)throw Error(`Unknown key type "${n}".`);if(!r.includes(e))throw Error(`"alg" parameter for "${n}" key type must be one of: ${r.join(", ")}.`);if(w7u)switch(n){case"ec":let o=t.asymmetricKeyDetails.namedCurve,s=I7u[e];if(o!==s)throw Error(`"alg" parameter "${e}" requires curve "${s}".`);break;case"rsa-pss":if(k7u){let i=parseInt(e.slice(-3),10),{hashAlgorithm:a,mgf1HashAlgorithm:l,saltLength:c}=t.asymmetricKeyDetails;if(a!==`sha${i}`||l!==a)throw Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${e}.`);if(c!==void 0&&c>i>>3)throw Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${e}.`)}break}}});
export {s1r};
