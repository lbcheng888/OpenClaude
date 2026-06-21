// @ts-nocheck
import {sE,RCe} from "./m1728.ts";
import {KS,wCe} from "./m1727.ts";
import {emptyInputScopesError,Wme} from "./m1726.ts";
import {Ho,KB,iIr,aC} from "./m1717.ts";
import {ls,m0} from "./m1721.ts";
import {cannotAppendScopeSet,cannotRemoveEmptyScope,emptyInputScopeSet,LH} from "./m1720.ts";
import {b} from "../runtime.ts";
class Ak{constructor(e){let t=e?sE.trimArrayEntries([...e]):[],n=t?sE.removeEmptyStringsFromArray(t):[];if(!n||!n.length)throw KS(emptyInputScopesError);this.scopes=new Set,n.forEach((r)=>this.scopes.add(r))}static fromString(e){let n=(e||Ho.EMPTY_STRING).split(" ");return new Ak(n)}static createSearchScopes(e){let t=e&&e.length>0?e:[...KB],n=new Ak(t);if(!n.containsOnlyOIDCScopes())n.removeOIDCScopes();else n.removeScope(Ho.OFFLINE_ACCESS_SCOPE);return n}containsScope(e){let t=this.printScopesLowerCase().split(" "),n=new Ak(t);return e?n.scopes.has(e.toLowerCase()):!1}containsScopeSet(e){if(!e||e.scopes.size<=0)return!1;return this.scopes.size>=e.scopes.size&&e.asArray().every((t)=>this.containsScope(t))}containsOnlyOIDCScopes(){let e=0;return iIr.forEach((t)=>{if(this.containsScope(t))e+=1}),this.scopes.size===e}appendScope(e){if(e)this.scopes.add(e.trim())}appendScopes(e){try{e.forEach((t)=>this.appendScope(t))}catch(t){throw ls(cannotAppendScopeSet)}}removeScope(e){if(!e)throw ls(cannotRemoveEmptyScope);this.scopes.delete(e.trim())}removeOIDCScopes(){iIr.forEach((e)=>{this.scopes.delete(e)})}unionScopeSets(e){if(!e)throw ls(emptyInputScopeSet);let t=new Set;return e.scopes.forEach((n)=>t.add(n.toLowerCase())),this.scopes.forEach((n)=>t.add(n.toLowerCase())),t}intersectingScopeSets(e){if(!e)throw ls(emptyInputScopeSet);if(!e.containsOnlyOIDCScopes())e.removeOIDCScopes();let t=this.unionScopeSets(e),n=e.getScopeCount(),r=this.getScopeCount();return t.size<r+n}getScopeCount(){return this.scopes.size}asArray(){let e=[];return this.scopes.forEach((t)=>e.push(t)),e}printScopes(){if(this.scopes)return this.asArray().join(" ");return Ho.EMPTY_STRING}printScopesLowerCase(){return this.printScopes().toLowerCase()}}
var MRt=b(()=>{wCe();RCe();m0();aC();Wme();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {Ak,MRt};
