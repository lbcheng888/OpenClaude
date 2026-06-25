// @ts-nocheck
import {BU} from "./m192.ts";
import {TR} from "./m187.ts";
import {b} from "../runtime.ts";
import {$zs,CPr} from "./m1623.ts";
import {zfn} from "./m1621.ts";
import {Gzs} from "./m1626.ts";
import {cK,UU} from "../src/api/0196_baseURL.ts";
import {a7e} from "./m194.ts";
import {Yfn} from "./m1625.ts";
import {Qs} from "./m137.ts";
function Aqu(e){let t=new BU(e);return delete t.batches,t}
function Rqu(e){let t=new TR(e);return delete t.messages.batches,t}
var AnthropicFoundry;
var RPr=b(()=>{$zs();zfn();Gzs();cK();cK();a7e();AnthropicFoundry=class AnthropicFoundry extends UU{constructor({baseURL:e=Yfn("ANTHROPIC_FOUNDRY_BASE_URL"),apiKey:t=Yfn("ANTHROPIC_FOUNDRY_API_KEY"),resource:n=Yfn("ANTHROPIC_FOUNDRY_RESOURCE"),azureADTokenProvider:r,dangerouslyAllowBrowser:o,...s}={}){if(typeof r==="function")o=!0;if(!r&&!t)throw new Qs("Missing credentials. Please pass one of `apiKey` and `azureTokenProvider`, or set the `ANTHROPIC_FOUNDRY_API_KEY` environment variable.");if(r&&t)throw new Qs("The `apiKey` and `azureADTokenProvider` arguments are mutually exclusive; only one can be passed at a time.");if(!e){if(!n)throw new Qs("Must provide one of the `baseURL` or `resource` arguments, or the `ANTHROPIC_FOUNDRY_RESOURCE` environment variable");e=`https://${n}.services.ai.azure.com/anthropic/`}else if(n)throw new Qs("baseURL and resource are mutually exclusive");super({apiKey:r??t,baseURL:e,...s,...o!==void 0?{dangerouslyAllowBrowser:o}:{}});this.resource=null,this.messages=Aqu(this),this.beta=Rqu(this),this.models=void 0}async authHeaders(){if(typeof this._options.apiKey==="function"){let e;try{e=await this._options.apiKey()}catch(t){if(t instanceof Qs)throw t;throw new Qs(`Failed to get token from azureADTokenProvider: ${t.message}`,{cause:t})}if(typeof e!=="string"||!e)throw new Qs(`Expected azureADTokenProvider function argument to return a string but it returned ${e}`);return CPr([{Authorization:`Bearer ${e}`}])}if(typeof this._options.apiKey==="string")return CPr([{"x-api-key":this.apiKey}]);return}validateHeaders(){return}}});
export {Aqu,Rqu,AnthropicFoundry,RPr};
