// @ts-nocheck
import {mHt,u_n} from "./m2159.ts";
import {b} from "../runtime.ts";
class j1r{constructor(e,t,n,r){this._provider=e,this.name=t,this.version=n,this.options=r}emit(e){this._getLogger().emit(e)}_getLogger(){if(this._delegate)return this._delegate;let e=this._provider._getDelegateLogger(this.name,this.version,this.options);if(!e)return mHt;return this._delegate=e,this._delegate}}
var pmi=b(()=>{u_n()});
export {j1r,pmi};
