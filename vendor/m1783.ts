// @ts-nocheck
import {MH,HJe} from "./m1782.ts";
import {LCe,fBe} from "./m1781.ts";
import {qR,_7s,_v} from "./m1778.ts";
import {b} from "../runtime.ts";
class B0r{get id(){return this._id}set id(e){this._id=e}get idType(){return this._idType}set idType(e){this._idType=e}constructor(e){let t=e?.userAssignedClientId,n=e?.userAssignedResourceId,r=e?.userAssignedObjectId;if(t){if(n||r)throw MH(LCe);this.id=t,this.idType=qR.USER_ASSIGNED_CLIENT_ID}else if(n){if(t||r)throw MH(LCe);this.id=n,this.idType=qR.USER_ASSIGNED_RESOURCE_ID}else if(r){if(t||n)throw MH(LCe);this.id=r,this.idType=qR.USER_ASSIGNED_OBJECT_ID}else this.id=_7s,this.idType=qR.SYSTEM_ASSIGNED}}
var D7s=b(()=>{HJe();_v();fBe();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {B0r,D7s};
