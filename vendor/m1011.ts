// @ts-nocheck
import {fws,hws} from "./m1010.ts";
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
import {ZU} from "./m606.ts";
var wln,gws,_ws,yws,Tws=async(e,t,n)=>{let r=t[e];if(t[e]){let o=r.credential_process;if(o!==void 0){let s=yws.promisify(gws.externalDataInterceptor?.getTokenRecord?.().exec??_ws.exec);try{let{stdout:i}=await s(o),a;try{a=JSON.parse(i.trim())}catch{throw Error(`Profile ${e} credential_process returned invalid JSON.`)}return fws(e,a,t)}catch(i){throw new wln.CredentialsProviderError(i.message,{logger:n})}}else throw new wln.CredentialsProviderError(`Profile ${e} did not contain credential_process.`,{logger:n})}else throw new wln.CredentialsProviderError(`Profile ${e} could not be found in shared credentials file.`,{logger:n})};
var Sws=b(()=>{hws();wln=x(Vg(),1),gws=x(ZU(),1),_ws=require("child_process"),yws=require("util")});
export {wln,gws,_ws,yws,Tws,Sws};
