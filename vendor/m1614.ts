// @ts-nocheck
import {slowOpTracer} from "./m185.ts";
import {b} from "../runtime.ts";
import {Ukr,Dme,zYe} from "./m1610.ts";
import {ipn} from "./m1606.ts";
import {isCompletedWithKeepalive,BaseAnthropic} from "../src/api/0194_baseURL.ts";
import {dGe} from "./m192.ts";
import {j8s,q8s} from "../src/core/1614_fromNodeProviderChain.ts";
import {mi} from "./m135.ts";
import {_2} from "./m190.ts";
function n1u(e){let{messages:t}=new slowOpTracer(e);return{messages:t}}
var t1u="bedrock-mantle",AnthropicBedrockMantle;
var W8s=b(()=>{Ukr();ipn();isCompletedWithKeepalive();dGe();j8s();AnthropicBedrockMantle=class AnthropicBedrockMantle extends BaseAnthropic{constructor({awsRegion:e,baseURL:t,apiKey:n,awsAccessKey:r=null,awsSecretAccessKey:o=null,awsSessionToken:s=null,awsProfile:i,providerChainResolver:a=null,skipAuth:l=!1,...c}={}){let u=e??Dme("AWS_REGION")??Dme("AWS_DEFAULT_REGION"),d=t??Dme("ANTHROPIC_BEDROCK_MANTLE_BASE_URL")??(u?`https://bedrock-mantle.${u}.api.aws/anthropic`:void 0);if(!d)throw new mi("No AWS region or base URL found. Set `awsRegion` in the constructor, the `AWS_REGION` / `AWS_DEFAULT_REGION` environment variable, or provide a `baseURL` / `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` environment variable.");let p=n!=null;if(r!=null!==(o!=null))throw new mi("`awsAccessKey` and `awsSecretAccessKey` must be provided together. You provided only one.");let f=r!=null&&o!=null,A=i!=null,h;if(p)h=n;else if(!f&&!A)h=Dme("AWS_BEARER_TOKEN_BEDROCK")??void 0;super({apiKey:h,baseURL:d,...c});this.messages=new _2(this),this.beta=n1u(this),this.skipAuth=!1,this.awsRegion=u,this.awsAccessKey=r,this.awsSecretAccessKey=o,this.awsSessionToken=s,this.awsProfile=i??null,this.providerChainResolver=a,this.skipAuth=l,this._useSigV4=h==null}async authHeaders(e){if(this.skipAuth)return;if(!this._useSigV4)return zYe([{Authorization:`Bearer ${this.apiKey}`}]);return}validateHeaders(){}async prepareRequest(e,{url:t,options:n}){if(this.skipAuth||!this._useSigV4)return;let r=this.awsRegion;if(!r)throw new mi("No AWS region found. Set `awsRegion` in the constructor or the `AWS_REGION` / `AWS_DEFAULT_REGION` environment variable.");let o=await q8s(e,{url:t,regionName:r,serviceName:t1u,awsAccessKey:this.awsAccessKey,awsSecretAccessKey:this.awsSecretAccessKey,awsSessionToken:this.awsSessionToken,awsProfile:this.awsProfile,providerChainResolver:this.providerChainResolver});e.headers=zYe([o,e.headers]).values}}});
export {n1u,t1u,AnthropicBedrockMantle,W8s};
