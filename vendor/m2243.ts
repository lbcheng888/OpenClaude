// @ts-nocheck
import {b} from "../runtime.ts";
var Xfe,tie,HUe,U2;
var i9r=b(()=>{Xfe=class Xfe extends Error{path;expected;actual;existingId;constructor(e,t,n,r){super(`conflict on ${e}: expected ${t??"<none>"}, actual ${n??"<unknown>"}`);this.path=e;this.expected=t;this.actual=n;this.existingId=r;this.name="ConflictError"}};tie=class tie extends Error{path;constructor(e){super(`not found: ${e}`);this.path=e;this.name="NotFoundError"}};HUe=class HUe extends Error{cause;constructor(e,t){super(e);this.cause=t;this.name="UnavailableError"}};U2=class U2 extends Error{reason;constructor(e,t){super(t??`permanent: ${e}`);this.reason=e;this.name="PermanentError"}}});
export {Xfe,tie,HUe,U2,i9r};
