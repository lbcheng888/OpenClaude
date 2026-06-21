// @ts-nocheck
import {_2} from "./m190.ts";
import {slowOpTracer} from "./m185.ts";
import {b} from "../runtime.ts";
import {isCompletedWithKeepalive,BaseAnthropic} from "../src/api/0194_baseURL.ts";
import {dGe} from "./m192.ts";
import {U6s,F6s} from "../src/core/1547_fromNodeProviderChain.ts";
import {O8s,upn} from "./m1609.ts";
import {Mwt,apn} from "./m1607.ts";
import {Ukr,Dme,zYe} from "./m1610.ts";
import {B8s,$kr} from "./m1611.ts";
import {Bkr,cpn} from "./m1608.ts";
import {fSe} from "./m186.ts";
function QMu(e){let t=new _2(e);return delete t.batches,delete t.countTokens,t}
function ZMu(e){let t=new slowOpTracer(e);return delete t.promptCaching,delete t.messages.batches,delete t.messages.countTokens,t}
var JMu="bedrock-2023-05-31",XMu,AnthropicBedrock;
var jkr=b(()=>{isCompletedWithKeepalive();dGe();U6s();O8s();Mwt();Ukr();B8s();Bkr();isCompletedWithKeepalive();XMu=new Set(["/v1/complete","/v1/messages","/v1/messages?beta=true"]);AnthropicBedrock=class AnthropicBedrock extends BaseAnthropic{constructor({awsRegion:e=Dme("AWS_REGION")??"us-east-1",baseURL:t=Dme("ANTHROPIC_BEDROCK_BASE_URL")??`https://bedrock-runtime.${e}.amazonaws.com`,apiKey:n=Dme("AWS_BEARER_TOKEN_BEDROCK"),awsSecretKey:r=null,awsAccessKey:o=null,awsSessionToken:s=null,providerChainResolver:i=null,...a}={}){super({baseURL:t,authToken:n,...a});this.skipAuth=!1,this.messages=QMu(this),this.completions=new fSe(this),this.beta=ZMu(this);let l=o!=null,c=r!=null;if(l!==c)cpn(this).warn("Warning: Passing only one of `awsAccessKey` or `awsSecretKey` is deprecated. Please provide both keys, or provide neither and rely on the AWS credential provider chain.");this.awsSecretKey=r,this.awsAccessKey=o,this.awsRegion=e,this.awsSessionToken=s,this.skipAuth=a.skipAuth??!1,this.providerChainResolver=i}validateHeaders(){}async prepareRequest(e,{url:t,options:n}){if(this.skipAuth){e.headers.delete("Authorization");return}if(this.authToken)return;let r=this.awsRegion;if(!r)throw Error("Expected `awsRegion` option to be passed to the client or the `AWS_REGION` environment variable to be present");let o=await F6s(e,{url:t,regionName:r,awsAccessKey:this.awsAccessKey,awsSecretKey:this.awsSecretKey,awsSessionToken:this.awsSessionToken,fetchOptions:this.fetchOptions,providerChainResolver:this.providerChainResolver});e.headers=zYe([o,e.headers]).values}async buildRequest(e){if(e.__streamClass=upn,apn(e.body))e.body={...e.body};if(apn(e.body)){if(!e.body.anthropic_version)e.body.anthropic_version=JMu;if(e.headers&&!e.body.anthropic_beta){let t=zYe([e.headers]).values.get("anthropic-beta");if(t!=null)e.body.anthropic_beta=t.split(",")}}if(XMu.has(e.path)&&e.method==="post"){if(!apn(e.body))throw Error("Expected request body to be an object for post /v1/messages");let t=e.body.model;e.body.model=void 0;let n=e.body.stream;if(e.body.stream=void 0,n)e.path=$kr`/model/${t}/invoke-with-response-stream`;else e.path=$kr`/model/${t}/invoke`}return super.buildRequest(e)}}});
export {QMu,ZMu,JMu,XMu,AnthropicBedrock,jkr};
