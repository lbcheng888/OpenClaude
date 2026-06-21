// @ts-nocheck
import {b} from "../runtime.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {P_t,Dzt} from "./m159.ts";
import {Q$o,ayt} from "../src/core/0189_cause.ts";
import {kor,xor} from "./m187.ts";
import {Lor,lyt} from "./m189.ts";
import {sor,Pzt} from "./m171.ts";
var _2,Z$o,igc;
var Mor=b(()=>{QC();P_t();Q$o();kor();Lor();Lor();sor();_2=class _2 extends Rp{constructor(){super(...arguments);this.batches=new lyt(this._client)}create(e,t){if(e.model in Z$o)console.warn(`The model '${e.model}' is deprecated and will reach end-of-life on ${Z$o[e.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);if(igc.includes(e.model)&&e.thinking&&e.thinking.type==="enabled")console.warn(`Using Claude with ${e.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);let n=this._client._options.timeout;if(!e.stream&&n==null){let o=Pzt[e.model]??void 0;n=this._client.calculateNonstreamingTimeout(e.max_tokens,o)}let r=Dzt(e.tools,e.messages);return this._client.post("/v1/messages",{body:e,timeout:n??600000,...t,headers:Ss([r,t?.headers]),stream:e.stream??!1})}parse(e,t){return this.create(e,t).then((n)=>xor(n,e,{logger:this._client.logger??console}))}stream(e,t){return ayt.createMessage(this,e,t,{logger:this._client.logger??console})}countTokens(e,t){return this._client.post("/v1/messages/count_tokens",{body:e,...t})}};Z$o={"claude-1.3":"November 6th, 2024","claude-1.3-100k":"November 6th, 2024","claude-instant-1.1":"November 6th, 2024","claude-instant-1.1-100k":"November 6th, 2024","claude-instant-1.2":"November 6th, 2024","claude-3-sonnet-20240229":"July 21st, 2025","claude-3-opus-20240229":"January 5th, 2026","claude-2.1":"July 21st, 2025","claude-2.0":"July 21st, 2025","claude-3-7-sonnet-latest":"February 19th, 2026","claude-3-7-sonnet-20250219":"February 19th, 2026","claude-3-5-haiku-latest":"February 19th, 2026","claude-3-5-haiku-20241022":"February 19th, 2026","claude-opus-4-0":"June 15th, 2026","claude-opus-4-20250514":"June 15th, 2026","claude-sonnet-4-0":"June 15th, 2026","claude-sonnet-4-20250514":"June 15th, 2026"},igc=["claude-mythos-preview","claude-opus-4-6"];_2.Batches=lyt});
export {_2,Z$o,igc,Mor};
