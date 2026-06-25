// @ts-nocheck
import {Qs} from "./m137.ts";
import {b} from "../runtime.ts";
import {npe} from "./m170.ts";
import {Plr,fbt} from "./m172.ts";
import {Olr,pXt} from "./m173.ts";
import {oA,Jd,is} from "./m158.ts";
import {abt,dXt} from "./m161.ts";
import {Nlr,Mlr} from "./m174.ts";
import {I5o,bbt} from "../src/core/0177_cause.ts";
import {Glr,Abt} from "../src/api/0179_promise.ts";
import {EXt,t7e} from "./m177.ts";
function M5o(e){if(!e.output_format)return e;if(e.output_config?.format)throw new Qs("Both output_format and output_config.format were provided. Please use only output_config.format (output_format is deprecated).");let{output_format:t,...n}=e;return{...n,output_config:{...e.output_config,format:t}}}
var L5o,Zvc,jbe;
var Vlr=b(()=>{npe();Plr();Olr();oA();abt();Nlr();I5o();Glr();EXt();Plr();Glr();EXt();L5o={"claude-1.3":"November 6th, 2024","claude-1.3-100k":"November 6th, 2024","claude-instant-1.1":"November 6th, 2024","claude-instant-1.1-100k":"November 6th, 2024","claude-instant-1.2":"November 6th, 2024","claude-3-sonnet-20240229":"July 21st, 2025","claude-3-opus-20240229":"January 5th, 2026","claude-2.1":"July 21st, 2025","claude-2.0":"July 21st, 2025","claude-3-7-sonnet-latest":"February 19th, 2026","claude-3-7-sonnet-20250219":"February 19th, 2026"},Zvc=["claude-mythos-preview","claude-opus-4-6"];jbe=class jbe extends Jd{constructor(){super(...arguments);this.batches=new fbt(this._client)}create(e,t){let n=M5o(e),{betas:r,...o}=n;if(o.model in L5o)console.warn(`The model '${o.model}' is deprecated and will reach end-of-life on ${L5o[o.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);if(Zvc.includes(o.model)&&o.thinking&&o.thinking.type==="enabled")console.warn(`Using Claude with ${o.model} and 'thinking.type=enabled' is deprecated. Use 'thinking.type=adaptive' instead which results in better model performance in our testing: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking`);let s=this._client._options.timeout;if(!o.stream&&s==null){let a=pXt[o.model]??void 0;s=this._client.calculateNonstreamingTimeout(o.max_tokens,a)}let i=dXt(o.tools,o.messages);return this._client.post("/v1/messages?beta=true",{body:o,timeout:s??600000,...t,headers:is([{...r?.toString()!=null?{"anthropic-beta":r?.toString()}:void 0},i,t?.headers]),stream:n.stream??!1})}parse(e,t){return t={...t,headers:is([{"anthropic-beta":[...e.betas??[],"structured-outputs-2025-12-15"].toString()},t?.headers])},this.create(e,t).then((n)=>Mlr(n,e,{logger:this._client.logger??console}))}stream(e,t){return bbt.createMessage(this,e,t)}countTokens(e,t){let n=M5o(e),{betas:r,...o}=n;return this._client.post("/v1/messages/count_tokens?beta=true",{body:o,...t,headers:is([{"anthropic-beta":[...r??[],"token-counting-2024-11-01"].toString()},t?.headers])})}toolRunner(e,t){return new Abt(this._client,e,t)}};jbe.Batches=fbt;jbe.BetaToolRunner=Abt;jbe.ToolError=t7e});
export {M5o,L5o,Zvc,jbe,Vlr};
