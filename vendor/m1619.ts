// @ts-nocheck
import {TR} from "./m187.ts";
import {b} from "../runtime.ts";
import {gPr,$me,KXe} from "./m1615.ts";
import {qfn} from "./m1611.ts";
import {cK,BaseAnthropic} from "../src/api/0196_baseURL.ts";
import {a7e} from "./m194.ts";
import {Fzs,Nzs} from "../src/core/1619_fromNodeProviderChain.ts";
import {Qs} from "./m137.ts";
import {BU} from "./m192.ts";
function bqu(e){let{messages:t}=new TR(e);return{messages:t}}
var Squ="bedrock-mantle",AnthropicBedrockMantle;
var Bzs=b(()=>{gPr();qfn();cK();a7e();Fzs();AnthropicBedrockMantle=class AnthropicBedrockMantle extends BaseAnthropic{constructor({awsRegion:e,baseURL:t,apiKey:n,awsAccessKey:r=null,awsSecretAccessKey:o=null,awsSessionToken:s=null,awsProfile:i,providerChainResolver:a=null,skipAuth:l=!1,...c}={}){let u=e??$me("AWS_REGION")??$me("AWS_DEFAULT_REGION"),d=t??$me("ANTHROPIC_BEDROCK_MANTLE_BASE_URL")??(u?`https://bedrock-mantle.${u}.api.aws/anthropic`:void 0);if(!d)throw new Qs("No AWS region or base URL found. Set `awsRegion` in the constructor, the `AWS_REGION` / `AWS_DEFAULT_REGION` environment variable, or provide a `baseURL` / `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` environment variable.");let p=n!=null;if(r!=null!==(o!=null))throw new Qs("`awsAccessKey` and `awsSecretAccessKey` must be provided together. You provided only one.");let f=r!=null&&o!=null,h=i!=null,g;if(p)g=n;else if(!f&&!h)g=$me("AWS_BEARER_TOKEN_BEDROCK")??void 0;super({apiKey:g,baseURL:d,...c});this.messages=new BU(this),this.beta=bqu(this),this.skipAuth=!1,this.awsRegion=u,this.awsAccessKey=r,this.awsSecretAccessKey=o,this.awsSessionToken=s,this.awsProfile=i??null,this.providerChainResolver=a,this.skipAuth=l,this._useSigV4=g==null}async authHeaders(e){if(this.skipAuth)return;if(!this._useSigV4)return KXe([{Authorization:`Bearer ${this.apiKey}`}]);return}validateHeaders(){}async prepareRequest(e,{url:t,options:n}){if(this.skipAuth||!this._useSigV4)return;let r=this.awsRegion;if(!r)throw new Qs("No AWS region found. Set `awsRegion` in the constructor or the `AWS_REGION` / `AWS_DEFAULT_REGION` environment variable.");let o=await Nzs(e,{url:t,regionName:r,serviceName:Squ,awsAccessKey:this.awsAccessKey,awsSecretAccessKey:this.awsSecretAccessKey,awsSessionToken:this.awsSessionToken,awsProfile:this.awsProfile,providerChainResolver:this.providerChainResolver});e.headers=KXe([o,e.headers]).values}}});
export {bqu,Squ,AnthropicBedrockMantle,Bzs};
