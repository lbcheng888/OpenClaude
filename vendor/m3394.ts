// @ts-nocheck
import {X} from "../runtime.ts";
import {FNt} from "./m3385.ts";
import {Xi} from "./m2091.ts";
import {Gda} from "./m3393.ts";
var Kda=X((rPn)=>{Object.defineProperty(rPn,"__esModule",{value:!0});rPn.MetricStorageRegistry=void 0;var YVd=FNt(),Vda=Xi(),nPn=Gda();class cQr{_sharedRegistry=new Map;_perCollectorRegistry=new Map;static create(){return new cQr}getStorages(e){let t=[];for(let r of this._sharedRegistry.values())t=t.concat(r);let n=this._perCollectorRegistry.get(e);if(n!=null)for(let r of n.values())t=t.concat(r);return t}register(e){this._registerStorage(e,this._sharedRegistry)}registerForCollector(e,t){let n=this._perCollectorRegistry.get(e);if(n==null)n=new Map,this._perCollectorRegistry.set(e,n);this._registerStorage(t,n)}findOrUpdateCompatibleStorage(e){let t=this._sharedRegistry.get(e.name);if(t===void 0)return null;return this._findOrUpdateCompatibleStorage(e,t)}findOrUpdateCompatibleCollectorStorage(e,t){let n=this._perCollectorRegistry.get(e);if(n===void 0)return null;let r=n.get(t.name);if(r===void 0)return null;return this._findOrUpdateCompatibleStorage(t,r)}_registerStorage(e,t){let n=e.getInstrumentDescriptor(),r=t.get(n.name);if(r===void 0){t.set(n.name,[e]);return}r.push(e)}_findOrUpdateCompatibleStorage(e,t){let n=null;for(let r of t){let o=r.getInstrumentDescriptor();if((0,YVd.isDescriptorCompatibleWith)(o,e)){if(o.description!==e.description){if(e.description.length>o.description.length)r.updateDescription(e.description);Vda.diag.warn("A view or instrument with the name ",e.name,` has already been registered, but has a different description and is incompatible with another registered view.
`,`Details:
`,(0,nPn.getIncompatibilityDetails)(o,e),`The longer description will be used.
To resolve the conflict:`,(0,nPn.getConflictResolutionRecipe)(o,e))}n=r}else Vda.diag.warn("A view or instrument with the name ",e.name,` has already been registered and is incompatible with another registered view.
`,`Details:
`,(0,nPn.getIncompatibilityDetails)(o,e),`To resolve the conflict:
`,(0,nPn.getConflictResolutionRecipe)(o,e))}return n}}rPn.MetricStorageRegistry=cQr});
export {Kda};
