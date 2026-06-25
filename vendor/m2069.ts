// @ts-nocheck
import {Q} from "../runtime.ts";
import {nci} from "./m2068.ts";
import {JBe} from "./m2055.ts";
import {XBe} from "./m2059.ts";
var Axt=Q((HTn)=>{Object.defineProperty(HTn,"__esModule",{value:!0});HTn.ContextAPI=void 0;var fnd=nci(),gUr=JBe(),rci=XBe(),_Ur="context",hnd=new fnd.NoopContextManager;class yUr{constructor(){}static getInstance(){if(!this._instance)this._instance=new yUr;return this._instance}setGlobalContextManager(e){return(0,gUr.registerGlobal)(_Ur,e,rci.DiagAPI.instance())}active(){return this._getContextManager().active()}with(e,t,n,...r){return this._getContextManager().with(e,t,n,...r)}bind(e,t){return this._getContextManager().bind(e,t)}_getContextManager(){return(0,gUr.getGlobal)(_Ur)||hnd}disable(){this._getContextManager().disable(),(0,gUr.unregisterGlobal)(_Ur,rci.DiagAPI.instance())}}HTn.ContextAPI=yUr});
export {Axt};
