// @ts-nocheck
import {mi} from "./m135.ts";
import {b} from "../runtime.ts";
import {zde} from "./m168.ts";
import {oor,U_t} from "./m170.ts";
import {sor,Pzt} from "./m171.ts";
import {QC,Rp,Ss} from "./m156.ts";
import {P_t,Dzt} from "./m159.ts";
import {lor,aor} from "./m172.ts";
import {F$o,K_t} from "../src/core/0175_cause.ts";
import {hor,J_t} from "../src/api/0177_promise.ts";
import {jzt,sGe} from "./m175.ts";
function G$o(e){if(!e.output_format)return e;if(e.output_config?.format)throw new mi("Both output_format and output_config.format were provided. Please use only output_config.format (output_format is deprecated).");let{output_format:t,...n}=e;return{...n,output_config:{...e.output_config,format:t}}}
var W$o,Yhc,mSe;
var gor=b(()=>{zde();oor();sor();QC();P_t();lor();F$o();hor();jzt();oor();hor();jzt();W$o={"claude-1.3":"November 6th, 2024","claude-1.3-100k":"November 6th, 2024","claude-instant-1.1":"November 6th, 2024","claude-instant-1.1-100k":"November 6th, 2024","claude-instant-1.2":"November 6th, 2024","claude-3-sonnet-20240229":"July 21st, 2025","claude-3-opus-20240229":"January 5th, 2026","claude-2.1":"July 21st, 2025","claude-2.0":"July 21st, 2025","claude-3-7-sonnet-latest":"February 19th, 2026","claude-3-7-sonnet-20250219":"February 19th, 2026"},Yhc=["claude-mythos-preview","claude-opus-4-6"];mSe=class mSe extends Rp{constructor(){super(...arguments);this.batches=new U_t(this._client)}create(e,t){let n=G$o(e),{betas:r,...o}=n;if(o.model in W$o)console.warn(`The model '${o.model}' is deprecated and will reach end-of-life on ${W$o[o.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);if(Yhc.includes(o.model)&&o.thinking&&o.thinking.type==="enabled")console.warn(`Using Claude with ${o.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);let s=this._client._options.timeout;if(!o.stream&&s==null){let a=Pzt[o.model]??void 0;s=this._client.calculateNonstreamingTimeout(o.max_tokens,a)}let i=Dzt(o.tools,o.messages);return this._client.post("/v1/messages?beta=true",{body:o,timeout:s??600000,...t,headers:Ss([{...r?.toString()!=null?{"anthropic-beta":r?.toString()}:void 0},i,t?.headers]),stream:n.stream??!1})}parse(e,t){return t={...t,headers:Ss([{"anthropic-beta":[...e.betas??[],"structured-outputs-2025-12-15"].toString()},t?.headers])},this.create(e,t).then((n)=>aor(n,e,{logger:this._client.logger??console}))}stream(e,t){return K_t.createMessage(this,e,t)}countTokens(e,t){let n=G$o(e),{betas:r,...o}=n;return this._client.post("/v1/messages/count_tokens?beta=true",{body:o,...t,headers:Ss([{"anthropic-beta":[...r??[],"token-counting-2024-11-01"].toString()},t?.headers])})}toolRunner(e,t){return new J_t(this._client,e,t)}};mSe.Batches=U_t;mSe.BetaToolRunner=J_t;mSe.ToolError=sGe});
export {G$o,W$o,Yhc,mSe,gor};
