// @ts-nocheck
import {X} from "../runtime.ts";
import {v1} from "./m1959.ts";
import {J8} from "./m1977.ts";
import {IOr} from "./m1994.ts";
import {jQ} from "./m1974.ts";
var SAn=X((TAn)=>{Object.defineProperty(TAn,"__esModule",{value:!0});TAn.StsCredentials=void 0;var z8u=v1(),Y8u=J8(),hei=IOr(),J8u=jQ();class DOr extends hei.OAuthClientAuthHandler{#e;constructor(e={tokenExchangeEndpoint:""},t){if(typeof e!=="object"||e instanceof URL)e={tokenExchangeEndpoint:e,clientAuthentication:t};super(e);this.#e=e.tokenExchangeEndpoint}async exchangeToken(e,t,n){let r={grant_type:e.grantType,resource:e.resource,audience:e.audience,scope:e.scope?.join(" "),requested_token_type:e.requestedTokenType,subject_token:e.subjectToken,subject_token_type:e.subjectTokenType,actor_token:e.actingParty?.actorToken,actor_token_type:e.actingParty?.actorTokenType,options:n&&JSON.stringify(n)},o={...DOr.RETRY_CONFIG,url:this.#e.toString(),method:"POST",headers:t,data:new URLSearchParams((0,J8u.removeUndefinedValuesInObject)(r)),responseType:"json"};Y8u.AuthClient.setMethodName(o,"exchangeToken"),this.applyClientAuthenticationOptions(o);try{let s=await this.transporter.request(o),i=s.data;return i.res=s,i}catch(s){if(s instanceof z8u.GaxiosError&&s.response)throw(0,hei.getErrorFromOAuthErrorResponse)(s.response.data,s);throw s}}}TAn.StsCredentials=DOr});
export {SAn};
