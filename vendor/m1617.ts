// @ts-nocheck
import {BU} from "./m192.ts";
import {TR} from "./m187.ts";
import {b} from "../runtime.ts";
import {cK,BaseAnthropic} from "../src/api/0196_baseURL.ts";
import {a7e} from "./m194.ts";
import {LKs,OKs} from "../src/core/1552_fromNodeProviderChain.ts";
import {Hzs,Kfn} from "./m1614.ts";
import {cHt,Wfn} from "./m1612.ts";
import {gPr,$me,KXe} from "./m1615.ts";
import {Pzs,_Pr} from "./m1616.ts";
import {fPr,Vfn} from "./m1613.ts";
import {Ybe} from "./m188.ts";
function _qu(e){let t=new BU(e);return delete t.batches,delete t.countTokens,t}
function yqu(e){let t=new TR(e);return delete t.promptCaching,delete t.messages.batches,delete t.messages.countTokens,t}
var hqu="bedrock-2023-05-31",gqu,AnthropicBedrock;
var TPr=b(()=>{cK();a7e();LKs();Hzs();cHt();gPr();Pzs();fPr();cK();gqu=new Set(["/v1/complete","/v1/messages","/v1/messages?beta=true"]);AnthropicBedrock=class AnthropicBedrock extends BaseAnthropic{constructor({awsRegion:e=$me("AWS_REGION")??"us-east-1",baseURL:t=$me("ANTHROPIC_BEDROCK_BASE_URL")??`https://bedrock-runtime.${e}.amazonaws.com`,apiKey:n=$me("AWS_BEARER_TOKEN_BEDROCK"),awsSecretKey:r=null,awsAccessKey:o=null,awsSessionToken:s=null,providerChainResolver:i=null,...a}={}){super({baseURL:t,authToken:n,...a});this.skipAuth=!1,this.messages=_qu(this),this.completions=new Ybe(this),this.beta=yqu(this);let l=o!=null,c=r!=null;if(l!==c)Vfn(this).warn("Warning: Passing only one of `awsAccessKey` or `awsSecretKey` is deprecated. Please provide both keys, or provide neither and rely on the AWS credential provider chain.");this.awsSecretKey=r,this.awsAccessKey=o,this.awsRegion=e,this.awsSessionToken=s,this.skipAuth=a.skipAuth??!1,this.providerChainResolver=i}validateHeaders(){}async prepareRequest(e,{url:t,options:n}){if(this.skipAuth){e.headers.delete("Authorization");return}if(this.authToken)return;let r=this.awsRegion;if(!r)throw Error("Expected `awsRegion` option to be passed to the client or the `AWS_REGION` environment variable to be present");let o=await OKs(e,{url:t,regionName:r,awsAccessKey:this.awsAccessKey,awsSecretKey:this.awsSecretKey,awsSessionToken:this.awsSessionToken,fetchOptions:this.fetchOptions,providerChainResolver:this.providerChainResolver});e.headers=KXe([o,e.headers]).values}async buildRequest(e){if(e.__streamClass=Kfn,Wfn(e.body))e.body={...e.body};if(Wfn(e.body)){if(!e.body.anthropic_version)e.body.anthropic_version=hqu;if(e.headers&&!e.body.anthropic_beta){let t=KXe([e.headers]).values.get("anthropic-beta");if(t!=null)e.body.anthropic_beta=t.split(",")}}if(gqu.has(e.path)&&e.method==="post"){if(!Wfn(e.body))throw Error("Expected request body to be an object for post /v1/messages");let t=e.body.model;e.body.model=void 0;let n=e.body.stream;if(e.body.stream=void 0,n)e.path=_Pr`/model/${t}/invoke-with-response-stream`;else e.path=_Pr`/model/${t}/invoke`}return super.buildRequest(e)}}});
export {_qu,yqu,hqu,gqu,AnthropicBedrock,TPr};
