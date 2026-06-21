// @ts-nocheck
import {gv,_v} from "./m1778.ts";
import {iC} from "./m1717.ts";
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
class qDr{constructor(e,t,n){this.httpClientNoRetries=e,this.retryPolicy=t,this.logger=n}async sendNetworkRequestAsyncHelper(e,t,n){if(e===gv.GET)return this.httpClientNoRetries.sendGetRequestAsync(t,n);else return this.httpClientNoRetries.sendPostRequestAsync(t,n)}async sendNetworkRequestAsync(e,t,n){let r=await this.sendNetworkRequestAsyncHelper(e,t,n);if("isNewRequest"in this.retryPolicy)this.retryPolicy.isNewRequest=!0;let o=0;while(await this.retryPolicy.pauseForRetry(r.status,o,this.logger,r.headers[iC.RETRY_AFTER]))r=await this.sendNetworkRequestAsyncHelper(e,t,n),o++;return r}async sendGetRequestAsync(e,t){return this.sendNetworkRequestAsync(gv.GET,e,t)}async sendPostRequestAsync(e,t){return this.sendNetworkRequestAsync(gv.POST,e,t)}}
var $Js=b(()=>{AT();_v();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {qDr,$Js};
