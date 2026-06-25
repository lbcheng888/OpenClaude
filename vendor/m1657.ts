// @ts-nocheck
import {JAe,ihn} from "./m1647.ts";
import {Bjs,XPr} from "./m1654.ts";
import {b} from "../runtime.ts";
import {thn,ehn} from "./m1633.ts";
var bHt=3;
function EHt(e,t={maxRetries:bHt}){let n=t.logger||Qqu;return{name:Zqu,async sendRequest(r,o){var s,i;let a,l,c=-1;e:while(!0){c+=1,a=void 0,l=void 0;try{n.info(`Retry ${c}: Attempting to send request`,r.requestId),a=await o(r),n.info(`Retry ${c}: Received a response from request`,r.requestId)}catch(u){if(n.error(`Retry ${c}: Received an error from request`,r.requestId),l=u,!u||l.name!=="RestError")throw u;a=l.response}if((s=r.abortSignal)===null||s===void 0?void 0:s.aborted)throw n.error(`Retry ${c}: Request aborted.`),new JAe;if(c>=((i=t.maxRetries)!==null&&i!==void 0?i:bHt))if(n.info(`Retry ${c}: Maximum retries reached. Returning the last received response, or throwing the last received error.`),l)throw l;else if(a)return a;else throw Error("Maximum retries reached with no response or error to throw");n.info(`Retry ${c}: Processing ${e.length} retry strategies.`);t:for(let u of e){let d=u.logger||n;d.info(`Retry ${c}: Processing retry strategy ${u.name}.`);let p=u.retry({retryCount:c,response:a,responseError:l});if(p.skipStrategy){d.info(`Retry ${c}: Skipped.`);continue t}let{errorToThrow:m,retryAfterInMs:f,redirectTo:h}=p;if(m)throw d.error(`Retry ${c}: Retry strategy ${u.name} throws error:`,m),m;if(f||f===0){d.info(`Retry ${c}: Retry strategy ${u.name} retries after ${f}`),await Bjs(f,void 0,{abortSignal:r.abortSignal});continue e}if(h){d.info(`Retry ${c}: Retry strategy ${u.name} redirects to ${h}`),r.url=h;continue e}}if(l)throw n.info("None of the retry strategies could work with the received error. Throwing it."),l;if(a)return n.info("None of the retry strategies could work with the received response. Returning it."),a}}}}
var Qqu,Zqu="retryPolicy";
var eOr=b(()=>{XPr();ihn();thn();Qqu=ehn("ts-http-runtime retryPolicy")});
export {bHt,EHt,Qqu,Zqu,eOr};
