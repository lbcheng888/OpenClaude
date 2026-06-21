// @ts-nocheck
import {_2} from "./m190.ts";
import {slowOpTracer} from "./m185.ts";
import {b} from "../runtime.ts";
import {V8s,Kkr} from "./m1618.ts";
import {dpn} from "./m1616.ts";
import {Y8s} from "./m1621.ts";
import {isCompletedWithKeepalive,y2} from "../src/api/0194_baseURL.ts";
import {dGe} from "./m192.ts";
import {mpn} from "./m1620.ts";
import {mi} from "./m135.ts";
function s1u(e){let t=new _2(e);return delete t.batches,t}
function i1u(e){let t=new slowOpTracer(e);return delete t.messages.batches,t}
var AnthropicFoundry;
var Ykr=b(()=>{V8s();dpn();Y8s();isCompletedWithKeepalive();isCompletedWithKeepalive();dGe();AnthropicFoundry=class AnthropicFoundry extends y2{constructor({baseURL:e=mpn("ANTHROPIC_FOUNDRY_BASE_URL"),apiKey:t=mpn("ANTHROPIC_FOUNDRY_API_KEY"),resource:n=mpn("ANTHROPIC_FOUNDRY_RESOURCE"),azureADTokenProvider:r,dangerouslyAllowBrowser:o,...s}={}){if(typeof r==="function")o=!0;if(!r&&!t)throw new mi("Missing credentials. Please pass one of `apiKey` and `azureTokenProvider`, or set the `ANTHROPIC_FOUNDRY_API_KEY` environment variable.");if(r&&t)throw new mi("The `apiKey` and `azureADTokenProvider` arguments are mutually exclusive; only one can be passed at a time.");if(!e){if(!n)throw new mi("Must provide one of the `baseURL` or `resource` arguments, or the `ANTHROPIC_FOUNDRY_RESOURCE` environment variable");e=`https://${n}.services.ai.azure.com/anthropic/`}else if(n)throw new mi("baseURL and resource are mutually exclusive");super({apiKey:r??t,baseURL:e,...s,...o!==void 0?{dangerouslyAllowBrowser:o}:{}});this.resource=null,this.messages=s1u(this),this.beta=i1u(this),this.models=void 0}async authHeaders(){if(typeof this._options.apiKey==="function"){let e;try{e=await this._options.apiKey()}catch(t){if(t instanceof mi)throw t;throw new mi(`Failed to get token from azureADTokenProvider: ${t.message}`,{cause:t})}if(typeof e!=="string"||!e)throw new mi(`Expected azureADTokenProvider function argument to return a string but it returned ${e}`);return Kkr([{Authorization:`Bearer ${e}`}])}if(typeof this._options.apiKey==="string")return Kkr([{"x-api-key":this.apiKey}]);return}validateHeaders(){return}}});
export {s1u,i1u,AnthropicFoundry,Ykr};
