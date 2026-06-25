// @ts-nocheck
import {Q} from "../runtime.ts";
import {BM} from "./m1964.ts";
import {u8} from "./m1982.ts";
import {aFr} from "./m1999.ts";
import {BQ} from "./m1979.ts";
var ryn=Q((nyn)=>{Object.defineProperty(nyn,"__esModule",{value:!0});nyn.StsCredentials=void 0;var mQu=BM(),fQu=u8(),dii=aFr(),hQu=BQ();class lFr extends dii.OAuthClientAuthHandler{#e;constructor(e={tokenExchangeEndpoint:""},t){if(typeof e!=="object"||e instanceof URL)e={tokenExchangeEndpoint:e,clientAuthentication:t};super(e);this.#e=e.tokenExchangeEndpoint}async exchangeToken(e,t,n){let r={grant_type:e.grantType,resource:e.resource,audience:e.audience,scope:e.scope?.join(" "),requested_token_type:e.requestedTokenType,subject_token:e.subjectToken,subject_token_type:e.subjectTokenType,actor_token:e.actingParty?.actorToken,actor_token_type:e.actingParty?.actorTokenType,options:n&&JSON.stringify(n)},o={...lFr.RETRY_CONFIG,url:this.#e.toString(),method:"POST",headers:t,data:new URLSearchParams((0,hQu.removeUndefinedValuesInObject)(r)),responseType:"json"};fQu.AuthClient.setMethodName(o,"exchangeToken"),this.applyClientAuthenticationOptions(o);try{let s=await this.transporter.request(o),i=s.data;return i.res=s,i}catch(s){if(s instanceof mQu.GaxiosError&&s.response)throw(0,dii.getErrorFromOAuthErrorResponse)(s.response.data,s);throw s}}}nyn.StsCredentials=lFr});
export {ryn};
