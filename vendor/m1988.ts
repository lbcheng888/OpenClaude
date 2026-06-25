// @ts-nocheck
import {Q} from "../runtime.ts";
import {PQe} from "./m1814.ts";
var Ksi=Q((z_n)=>{Object.defineProperty(z_n,"__esModule",{value:!0});z_n.buildPayloadForJwsSign=Vsi;z_n.getJwsSign=BXu;var MXu=PQe(),NXu="RS256",FXu="https://oauth2.googleapis.com/token";function Vsi(e){let t=Math.floor(new Date().getTime()/1000);return{iss:e.iss,scope:e.scope,aud:FXu,exp:t+3600,iat:t,sub:e.sub,...e.additionalClaims}}function BXu(e){let t=Vsi(e);return(0,MXu.sign)({header:{alg:NXu},payload:t,secret:e.key})}});
export {Ksi};
