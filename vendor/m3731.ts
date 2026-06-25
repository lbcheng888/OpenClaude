// @ts-nocheck
import {Q} from "../runtime.ts";
import {n$t} from "./m3722.ts";
import {xi} from "./m2096.ts";
import {txa} from "./m3730.ts";
var rxa=Q((PBn)=>{Object.defineProperty(PBn,"__esModule",{value:!0});PBn.MetricStorageRegistry=void 0;var _Sp=n$t(),nxa=xi(),DBn=txa();class hao{_sharedRegistry=new Map;_perCollectorRegistry=new Map;static create(){return new hao}getStorages(e){let t=[];for(let r of this._sharedRegistry.values())t=t.concat(r);let n=this._perCollectorRegistry.get(e);if(n!=null)for(let r of n.values())t=t.concat(r);return t}register(e){this._registerStorage(e,this._sharedRegistry)}registerForCollector(e,t){let n=this._perCollectorRegistry.get(e);if(n==null)n=new Map,this._perCollectorRegistry.set(e,n);this._registerStorage(t,n)}findOrUpdateCompatibleStorage(e){let t=this._sharedRegistry.get(e.name);if(t===void 0)return null;return this._findOrUpdateCompatibleStorage(e,t)}findOrUpdateCompatibleCollectorStorage(e,t){let n=this._perCollectorRegistry.get(e);if(n===void 0)return null;let r=n.get(t.name);if(r===void 0)return null;return this._findOrUpdateCompatibleStorage(t,r)}_registerStorage(e,t){let n=e.getInstrumentDescriptor(),r=t.get(n.name);if(r===void 0){t.set(n.name,[e]);return}r.push(e)}_findOrUpdateCompatibleStorage(e,t){let n=null;for(let r of t){let o=r.getInstrumentDescriptor();if((0,_Sp.isDescriptorCompatibleWith)(o,e)){if(o.description!==e.description){if(e.description.length>o.description.length)r.updateDescription(e.description);nxa.diag.warn("A view or instrument with the name ",e.name,` has already been registered, but has a different description and is incompatible with another registered view.
`,`Details:
`,(0,DBn.getIncompatibilityDetails)(o,e),`The longer description will be used.
To resolve the conflict:`,(0,DBn.getConflictResolutionRecipe)(o,e))}n=r}else nxa.diag.warn("A view or instrument with the name ",e.name,` has already been registered and is incompatible with another registered view.
`,`Details:
`,(0,DBn.getIncompatibilityDetails)(o,e),`To resolve the conflict:
`,(0,DBn.getConflictResolutionRecipe)(o,e))}return n}}PBn.MetricStorageRegistry=hao});
export {rxa};
