// @ts-nocheck
import {b} from "../runtime.ts";
import {oA,Jd,is} from "./m158.ts";
import {abt,dXt} from "./m161.ts";
import {W5o,Lbt} from "../src/core/0191_cause.ts";
import {rcr,ncr} from "./m189.ts";
import {ccr,Mbt} from "./m191.ts";
import {Olr,pXt} from "./m173.ts";
var BU,G5o,uwc;
var ucr=b(()=>{oA();abt();W5o();rcr();ccr();ccr();Olr();BU=class BU extends Jd{constructor(){super(...arguments);this.batches=new Mbt(this._client)}create(e,t){if(e.model in G5o)console.warn(`The model '${e.model}' is deprecated and will reach end-of-life on ${G5o[e.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);if(uwc.includes(e.model)&&e.thinking&&e.thinking.type==="enabled")console.warn(`Using Claude with ${e.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);let n=this._client._options.timeout;if(!e.stream&&n==null){let o=pXt[e.model]??void 0;n=this._client.calculateNonstreamingTimeout(e.max_tokens,o)}let r=dXt(e.tools,e.messages);return this._client.post("/v1/messages",{body:e,timeout:n??600000,...t,headers:is([r,t?.headers]),stream:e.stream??!1})}parse(e,t){return this.create(e,t).then((n)=>ncr(n,e,{logger:this._client.logger??console}))}stream(e,t){return Lbt.createMessage(this,e,t,{logger:this._client.logger??console})}countTokens(e,t){return this._client.post("/v1/messages/count_tokens",{body:e,...t})}};G5o={"claude-1.3":"November 6th, 2024","claude-1.3-100k":"November 6th, 2024","claude-instant-1.1":"November 6th, 2024","claude-instant-1.1-100k":"November 6th, 2024","claude-instant-1.2":"November 6th, 2024","claude-3-sonnet-20240229":"July 21st, 2025","claude-3-opus-20240229":"January 5th, 2026","claude-2.1":"July 21st, 2025","claude-2.0":"July 21st, 2025","claude-3-7-sonnet-latest":"February 19th, 2026","claude-3-7-sonnet-20250219":"February 19th, 2026","claude-3-5-haiku-latest":"February 19th, 2026","claude-3-5-haiku-20241022":"February 19th, 2026","claude-opus-4-0":"June 15th, 2026","claude-opus-4-20250514":"June 15th, 2026","claude-sonnet-4-0":"June 15th, 2026","claude-sonnet-4-20250514":"June 15th, 2026"},uwc=["claude-mythos-preview","claude-opus-4-6"];BU.Batches=Mbt});
export {BU,G5o,uwc,ucr};
