// @ts-nocheck
import {dBe,Mgn} from "./m1798.ts";
import {Egn,gQs,RA} from "./m1783.ts";
import {Co,MM} from "./m1722.ts";
import {M3,WIt} from "./m1797.ts";
import {b,x} from "../runtime.ts";
import {iT} from "./m1780.ts";
class bMr{constructor(){this.hashUtils=new dBe}async generatePkceCodes(){let e=this.generateCodeVerifier(),t=this.generateCodeChallengeFromVerifier(e);return{verifier:e,challenge:t}}generateCodeVerifier(){let e=[],t=256-256%Egn.CV_CHARSET.length;while(e.length<=gQs){let r=BQs.default.randomBytes(1)[0];if(r>=t)continue;let o=r%Egn.CV_CHARSET.length;e.push(Egn.CV_CHARSET[o])}let n=e.join(Co.EMPTY_STRING);return M3.base64EncodeUrl(n)}generateCodeChallengeFromVerifier(e){return M3.base64EncodeUrl(this.hashUtils.sha256(e).toString(MM.BASE64),MM.BASE64)}}
var BQs;
var UQs=b(()=>{iT();RA();WIt();Mgn();BQs=x(require("crypto"));/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {bMr,BQs,UQs};
