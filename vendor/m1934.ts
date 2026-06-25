// @ts-nocheck
import {jg,LM} from "./m1717.ts";
import {Oh,H0,VS,Lp} from "./m1636.ts";
import {AggregateAuthenticationError,CredentialUnavailableError,cD} from "./m1637.ts";
import {b} from "../runtime.ts";
class ChainedTokenCredential{constructor(...e){this._sources=[],this._sources=e}async getToken(e,t={}){let{token:n}=await this.getTokenInternal(e,t);return n}async getTokenInternal(e,t={}){let n=null,r,o=[];return jg.withSpan("ChainedTokenCredential.getToken",t,async(s)=>{for(let i=0;i<this._sources.length&&n===null;i++)try{n=await this._sources[i].getToken(e,s),r=this._sources[i]}catch(a){if(a.name==="CredentialUnavailableError"||a.name==="AuthenticationRequiredError")o.push(a);else throw Z1r.getToken.info(Oh(e,a)),a}if(!n&&o.length>0){let i=new AggregateAuthenticationError(o,"ChainedTokenCredential authentication failed.");throw Z1r.getToken.info(Oh(e,i)),i}if(Z1r.getToken.info(`Result for ${r.constructor.name}: ${H0(e)}`),n===null)throw new CredentialUnavailableError("Failed to retrieve a valid token");return{token:n,successfulCredential:r}})}}
var Z1r;
var eNr=b(()=>{cD();VS();LM();Z1r=Lp("ChainedTokenCredential")});
export {ChainedTokenCredential,Z1r,eNr};
