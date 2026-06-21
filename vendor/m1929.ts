// @ts-nocheck
import {isKeybindingCustomizationEnabled,S1} from "./m1712.ts";
import {Hh,d0,GS,hm} from "./m1631.ts";
import {AggregateAuthenticationError,CredentialUnavailableError,JD} from "./m1632.ts";
import {b} from "../runtime.ts";
class ChainedTokenCredential{constructor(...e){this._sources=[],this._sources=e}async getToken(e,t={}){let{token:n}=await this.getTokenInternal(e,t);return n}async getTokenInternal(e,t={}){let n=null,r,o=[];return isKeybindingCustomizationEnabled.withSpan("ChainedTokenCredential.getToken",t,async(s)=>{for(let i=0;i<this._sources.length&&n===null;i++)try{n=await this._sources[i].getToken(e,s),r=this._sources[i]}catch(a){if(a.name==="CredentialUnavailableError"||a.name==="AuthenticationRequiredError")o.push(a);else throw EPr.getToken.info(Hh(e,a)),a}if(!n&&o.length>0){let i=new AggregateAuthenticationError(o,"ChainedTokenCredential authentication failed.");throw EPr.getToken.info(Hh(e,i)),i}if(EPr.getToken.info(`Result for ${r.constructor.name}: ${d0(e)}`),n===null)throw new CredentialUnavailableError("Failed to retrieve a valid token");return{token:n,successfulCredential:r}})}}
var EPr;
var CPr=b(()=>{JD();GS();S1();EPr=hm("ChainedTokenCredential")});
export {ChainedTokenCredential,EPr,CPr};
