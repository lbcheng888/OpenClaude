// @ts-nocheck
import {D0} from "./m1740.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
class DistributedCachePlugin{constructor(e,t){this.client=e,this.partitionManager=t}async beforeCacheAccess(e){let t=await this.partitionManager.getKey(),n=await this.client.get(t);e.tokenCache.deserialize(n)}async afterCacheAccess(e){if(e.cacheHasChanged){let t=e.tokenCache.getKVStore(),n=Object.values(t).filter((o)=>D0.isAccountEntity(o)),r;if(n.length>0){let o=n[0];r=await this.partitionManager.extractKey(o)}else r=await this.partitionManager.getKey();await this.client.set(r,e.tokenCache.serialize())}}}
var eri=b(()=>{iT();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {DistributedCachePlugin,eri};
