// @ts-nocheck
import {X} from "../runtime.ts";
import {LJe} from "./m1809.ts";
var XZs=X((dAn)=>{Object.defineProperty(dAn,"__esModule",{value:!0});dAn.buildPayloadForJwsSign=JZs;dAn.getJwsSign=T8u;var g8u=LJe(),_8u="RS256",y8u="https://oauth2.googleapis.com/token";function JZs(e){let t=Math.floor(new Date().getTime()/1000);return{iss:e.iss,scope:e.scope,aud:y8u,exp:t+3600,iat:t,sub:e.sub,...e.additionalClaims}}function T8u(e){let t=JZs(e);return(0,g8u.sign)({header:{alg:_8u},payload:t,secret:e.key})}});
export {XZs};
