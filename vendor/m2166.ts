// @ts-nocheck
import {Uxt,WSn} from "./m2164.ts";
import {b} from "../runtime.ts";
class g2r{constructor(e,t,n,r){this._provider=e,this.name=t,this.version=n,this.options=r}emit(e){this._getLogger().emit(e)}_getLogger(){if(this._delegate)return this._delegate;let e=this._provider._getDelegateLogger(this.name,this.version,this.options);if(!e)return Uxt;return this._delegate=e,this._delegate}}
var aTi=b(()=>{WSn()});
export {g2r,aTi};
