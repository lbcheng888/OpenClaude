// @ts-nocheck
import {X6o,Gbe,Q6o,TX} from "./m140.ts";
import {b} from "../runtime.ts";
function SX(){return Math.floor(Date.now()/1000)}
class TokenCache{constructor(e,t){this.cached=null,this.pendingRefresh=null,this.nextForce=!1,this.lastAdvisoryError=0,this.provider=e,this.onAdvisoryRefreshError=t}async getToken(){let e=this.nextForce;this.nextForce=!1;let t=this.cached;if(e||t==null)return(await this.refresh(e)).token;if(t.expiresAt==null)return t.token;let n=t.expiresAt-SX();if(n>X6o)return t.token;if(n>Gbe)return this.backgroundRefresh(),t.token;return(await this.refresh()).token}invalidate(){this.cached=null,this.nextForce=!0}refresh(e=!1){if(this.pendingRefresh&&!e)return this.pendingRefresh;return this.doRefresh(e)}backgroundRefresh(){if(this.pendingRefresh)return;if(SX()-this.lastAdvisoryError<Q6o)return;this.doRefresh().catch((e)=>{this.lastAdvisoryError=SX(),this.onAdvisoryRefreshError?.(e)})}doRefresh(e=!1){return this.pendingRefresh=this.provider(e?{forceRefresh:!0}:void 0).then((t)=>(this.cached=t,this.pendingRefresh=null,t),(t)=>{throw this.pendingRefresh=null,t}),this.pendingRefresh}}
var ZJt=b(()=>{TX()});
export {SX,TokenCache,ZJt};
