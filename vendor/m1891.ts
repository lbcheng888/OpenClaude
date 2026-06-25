// @ts-nocheck
import {AA,RA} from "./m1783.ts";
import {uC} from "./m1722.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
class y1r{constructor(e,t,n){this.httpClientNoRetries=e,this.retryPolicy=t,this.logger=n}async sendNetworkRequestAsyncHelper(e,t,n){if(e===AA.GET)return this.httpClientNoRetries.sendGetRequestAsync(t,n);else return this.httpClientNoRetries.sendPostRequestAsync(t,n)}async sendNetworkRequestAsync(e,t,n){let r=await this.sendNetworkRequestAsyncHelper(e,t,n);if("isNewRequest"in this.retryPolicy)this.retryPolicy.isNewRequest=!0;let o=0;while(await this.retryPolicy.pauseForRetry(r.status,o,this.logger,r.headers[uC.RETRY_AFTER]))r=await this.sendNetworkRequestAsyncHelper(e,t,n),o++;return r}async sendGetRequestAsync(e,t){return this.sendNetworkRequestAsync(AA.GET,e,t)}async sendPostRequestAsync(e,t){return this.sendNetworkRequestAsync(AA.POST,e,t)}}
var Mni=b(()=>{iT();RA();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {y1r,Mni};
