// @ts-nocheck
import {b} from "../runtime.ts";
var $fe,nie,DFe,g$;
var xBr=b(()=>{$fe=class $fe extends Error{path;expected;actual;existingId;constructor(e,t,n,r){super(`conflict on ${e}: expected ${t??"<none>"}, actual ${n??"<unknown>"}`);this.path=e;this.expected=t;this.actual=n;this.existingId=r;this.name="ConflictError"}};nie=class nie extends Error{path;constructor(e){super(`not found: ${e}`);this.path=e;this.name="NotFoundError"}};DFe=class DFe extends Error{cause;constructor(e,t){super(e);this.cause=t;this.name="UnavailableError"}};g$=class g$ extends Error{reason;constructor(e,t){super(t??`permanent: ${e}`);this.reason=e;this.name="PermanentError"}}});
export {$fe,nie,DFe,g$,xBr};
