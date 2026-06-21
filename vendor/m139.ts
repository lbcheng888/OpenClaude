// @ts-nocheck
import {i$o,cSe,a$o,SX} from "./m138.ts";
import {b} from "../runtime.ts";
function bX(){return Math.floor(Date.now()/1000)}
class TokenCache{constructor(e,t){this.cached=null,this.pendingRefresh=null,this.nextForce=!1,this.lastAdvisoryError=0,this.provider=e,this.onAdvisoryRefreshError=t}async getToken(){let e=this.nextForce;this.nextForce=!1;let t=this.cached;if(e||t==null)return(await this.refresh(e)).token;if(t.expiresAt==null)return t.token;let n=t.expiresAt-bX();if(n>i$o)return t.token;if(n>cSe)return this.backgroundRefresh(),t.token;return(await this.refresh()).token}invalidate(){this.cached=null,this.nextForce=!0}refresh(e=!1){if(this.pendingRefresh&&!e)return this.pendingRefresh;return this.doRefresh(e)}backgroundRefresh(){if(this.pendingRefresh)return;if(bX()-this.lastAdvisoryError<a$o)return;this.doRefresh().catch((e)=>{this.lastAdvisoryError=bX(),this.onAdvisoryRefreshError?.(e)})}doRefresh(e=!1){return this.pendingRefresh=this.provider(e?{forceRefresh:!0}:void 0).then((t)=>(this.cached=t,this.pendingRefresh=null,t),(t)=>{throw this.pendingRefresh=null,t}),this.pendingRefresh}}
var Tzt=b(()=>{SX()});
export {bX,TokenCache,Tzt};
