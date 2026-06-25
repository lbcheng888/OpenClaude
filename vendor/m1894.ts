// @ts-nocheck
import {T1r,Nni} from "./m1893.ts";
import {b} from "../runtime.ts";
import {Ngn} from "./m1801.ts";
import {Sp} from "./m1722.ts";
class __n{constructor(){this.linearRetryStrategy=new T1r}static get DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS(){return Gju}async pauseForRetry(e,t,n,r){if(Vju.includes(e)&&t<Wju){let o=this.linearRetryStrategy.calculateDelay(r,__n.DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS);return n.verbose(`Retrying request in ${o}ms (retry attempt: ${t+1})`),await new Promise((s)=>setTimeout(s,o)),!0}return!1}}
var Wju=3,Gju=1000,Vju;
var Fni=b(()=>{Ngn();Nni();/*! @azure/msal-node v3.8.1 2025-10-29 */Vju=[Sp.NOT_FOUND,Sp.REQUEST_TIMEOUT,Sp.TOO_MANY_REQUESTS,Sp.SERVER_ERROR,Sp.SERVICE_UNAVAILABLE,Sp.GATEWAY_TIMEOUT]});
export {__n,Wju,Gju,Vju,Fni};
