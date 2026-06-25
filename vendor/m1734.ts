// @ts-nocheck
import {uE,uRe} from "./m1733.ts";
import {zS,cRe} from "./m1732.ts";
import {emptyInputScopesError,Zme} from "./m1731.ts";
import {Co,gF,MOr,dC} from "./m1722.ts";
import {jo,x0} from "./m1726.ts";
import {cannotAppendScopeSet,cannotRemoveEmptyScope,emptyInputScopeSet,uI} from "./m1725.ts";
import {b} from "../runtime.ts";
class Hk{constructor(e){let t=e?uE.trimArrayEntries([...e]):[],n=t?uE.removeEmptyStringsFromArray(t):[];if(!n||!n.length)throw zS(emptyInputScopesError);this.scopes=new Set,n.forEach((r)=>this.scopes.add(r))}static fromString(e){let n=(e||Co.EMPTY_STRING).split(" ");return new Hk(n)}static createSearchScopes(e){let t=e&&e.length>0?e:[...gF],n=new Hk(t);if(!n.containsOnlyOIDCScopes())n.removeOIDCScopes();else n.removeScope(Co.OFFLINE_ACCESS_SCOPE);return n}containsScope(e){let t=this.printScopesLowerCase().split(" "),n=new Hk(t);return e?n.scopes.has(e.toLowerCase()):!1}containsScopeSet(e){if(!e||e.scopes.size<=0)return!1;return this.scopes.size>=e.scopes.size&&e.asArray().every((t)=>this.containsScope(t))}containsOnlyOIDCScopes(){let e=0;return MOr.forEach((t)=>{if(this.containsScope(t))e+=1}),this.scopes.size===e}appendScope(e){if(e)this.scopes.add(e.trim())}appendScopes(e){try{e.forEach((t)=>this.appendScope(t))}catch(t){throw jo(cannotAppendScopeSet)}}removeScope(e){if(!e)throw jo(cannotRemoveEmptyScope);this.scopes.delete(e.trim())}removeOIDCScopes(){MOr.forEach((e)=>{this.scopes.delete(e)})}unionScopeSets(e){if(!e)throw jo(emptyInputScopeSet);let t=new Set;return e.scopes.forEach((n)=>t.add(n.toLowerCase())),this.scopes.forEach((n)=>t.add(n.toLowerCase())),t}intersectingScopeSets(e){if(!e)throw jo(emptyInputScopeSet);if(!e.containsOnlyOIDCScopes())e.removeOIDCScopes();let t=this.unionScopeSets(e),n=e.getScopeCount(),r=this.getScopeCount();return t.size<r+n}getScopeCount(){return this.scopes.size}asArray(){let e=[];return this.scopes.forEach((t)=>e.push(t)),e}printScopes(){if(this.scopes)return this.asArray().join(" ");return Co.EMPTY_STRING}printScopesLowerCase(){return this.printScopes().toLowerCase()}}
var cIt=b(()=>{cRe();uRe();x0();dC();Zme();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {Hk,cIt};
