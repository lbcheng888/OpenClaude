// @ts-nocheck
import {ABe,efn} from "./m1793.ts";
import {Umn,S7s,_v} from "./m1778.ts";
import {Ho,b1} from "./m1717.ts";
import {g4,hxt} from "./m1792.ts";
import {b,M} from "../runtime.ts";
import {AT} from "./m1775.ts";
class G0r{constructor(){this.hashUtils=new ABe}async generatePkceCodes(){let e=this.generateCodeVerifier(),t=this.generateCodeChallengeFromVerifier(e);return{verifier:e,challenge:t}}generateCodeVerifier(){let e=[],t=256-256%Umn.CV_CHARSET.length;while(e.length<=S7s){let r=W7s.default.randomBytes(1)[0];if(r>=t)continue;let o=r%Umn.CV_CHARSET.length;e.push(Umn.CV_CHARSET[o])}let n=e.join(Ho.EMPTY_STRING);return g4.base64EncodeUrl(n)}generateCodeChallengeFromVerifier(e){return g4.base64EncodeUrl(this.hashUtils.sha256(e).toString(b1.BASE64),b1.BASE64)}}
var W7s;
var G7s=b(()=>{AT();_v();hxt();efn();W7s=M(require("crypto"));/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {G0r,W7s,G7s};
