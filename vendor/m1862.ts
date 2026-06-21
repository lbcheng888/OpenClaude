// @ts-nocheck
import {X} from "../runtime.ts";
import {$Ys} from "./m1860.ts";
import {jYs} from "./m1861.ts";
var kDr=X((uBA,WYs)=>{var l3u=$Ys(),c3u=jYs(),u3u={ec:["ES256","ES384","ES512"],rsa:["RS256","PS256","RS384","PS384","RS512","PS512"],"rsa-pss":["PS256","PS384","PS512"]},d3u={ES256:"prime256v1",ES384:"secp384r1",ES512:"secp521r1"};WYs.exports=function(e,t){if(!e||!t)return;let n=t.asymmetricKeyType;if(!n)return;let r=u3u[n];if(!r)throw Error(`Unknown key type "${n}".`);if(!r.includes(e))throw Error(`"alg" parameter for "${n}" key type must be one of: ${r.join(", ")}.`);if(l3u)switch(n){case"ec":let o=t.asymmetricKeyDetails.namedCurve,s=d3u[e];if(o!==s)throw Error(`"alg" parameter "${e}" requires curve "${s}".`);break;case"rsa-pss":if(c3u){let i=parseInt(e.slice(-3),10),{hashAlgorithm:a,mgf1HashAlgorithm:l,saltLength:c}=t.asymmetricKeyDetails;if(a!==`sha${i}`||l!==a)throw Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${e}.`);if(c!==void 0&&c>i>>3)throw Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${e}.`)}break}}});
export {kDr};
