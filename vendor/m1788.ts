// @ts-nocheck
import {dI,kQe} from "./m1787.ts";
import {yRe,uBe} from "./m1786.ts";
import {ew,mQs,RA} from "./m1783.ts";
import {b} from "../runtime.ts";
class fMr{get id(){return this._id}set id(e){this._id=e}get idType(){return this._idType}set idType(e){this._idType=e}constructor(e){let t=e?.userAssignedClientId,n=e?.userAssignedResourceId,r=e?.userAssignedObjectId;if(t){if(n||r)throw dI(yRe);this.id=t,this.idType=ew.USER_ASSIGNED_CLIENT_ID}else if(n){if(t||r)throw dI(yRe);this.id=n,this.idType=ew.USER_ASSIGNED_RESOURCE_ID}else if(r){if(t||n)throw dI(yRe);this.id=r,this.idType=ew.USER_ASSIGNED_OBJECT_ID}else this.id=mQs,this.idType=ew.SYSTEM_ASSIGNED}}
var wQs=b(()=>{kQe();RA();uBe();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {fMr,wQs};
