// @ts-nocheck
import {X} from "../runtime.ts";
import {wFt} from "./m3706.ts";
import {Xi} from "./m2091.ts";
import {UCa} from "./m3714.ts";
var qCa=X((U1n)=>{Object.defineProperty(U1n,"__esModule",{value:!0});U1n.MetricStorageRegistry=void 0;var Hcp=wFt(),$Ca=Xi(),F1n=UCa();class Pno{_sharedRegistry=new Map;_perCollectorRegistry=new Map;static create(){return new Pno}getStorages(e){let t=[];for(let r of this._sharedRegistry.values())t=t.concat(r);let n=this._perCollectorRegistry.get(e);if(n!=null)for(let r of n.values())t=t.concat(r);return t}register(e){this._registerStorage(e,this._sharedRegistry)}registerForCollector(e,t){let n=this._perCollectorRegistry.get(e);if(n==null)n=new Map,this._perCollectorRegistry.set(e,n);this._registerStorage(t,n)}findOrUpdateCompatibleStorage(e){let t=this._sharedRegistry.get(e.name);if(t===void 0)return null;return this._findOrUpdateCompatibleStorage(e,t)}findOrUpdateCompatibleCollectorStorage(e,t){let n=this._perCollectorRegistry.get(e);if(n===void 0)return null;let r=n.get(t.name);if(r===void 0)return null;return this._findOrUpdateCompatibleStorage(t,r)}_registerStorage(e,t){let n=e.getInstrumentDescriptor(),r=t.get(n.name);if(r===void 0){t.set(n.name,[e]);return}r.push(e)}_findOrUpdateCompatibleStorage(e,t){let n=null;for(let r of t){let o=r.getInstrumentDescriptor();if((0,Hcp.isDescriptorCompatibleWith)(o,e)){if(o.description!==e.description){if(e.description.length>o.description.length)r.updateDescription(e.description);$Ca.diag.warn("A view or instrument with the name ",e.name,` has already been registered, but has a different description and is incompatible with another registered view.
`,`Details:
`,(0,F1n.getIncompatibilityDetails)(o,e),`The longer description will be used.
To resolve the conflict:`,(0,F1n.getConflictResolutionRecipe)(o,e))}n=r}else $Ca.diag.warn("A view or instrument with the name ",e.name,` has already been registered and is incompatible with another registered view.
`,`Details:
`,(0,F1n.getIncompatibilityDetails)(o,e),`To resolve the conflict:
`,(0,F1n.getConflictResolutionRecipe)(o,e))}return n}}U1n.MetricStorageRegistry=Pno});
export {qCa};
