// @ts-nocheck
import {X} from "../runtime.ts";
import {ari} from "./m2063.ts";
import {ZBe} from "./m2050.ts";
import {eFe} from "./m2054.ts";
var Xkt=X((Jhn)=>{Object.defineProperty(Jhn,"__esModule",{value:!0});Jhn.ContextAPI=void 0;var YVu=ari(),jMr=ZBe(),lri=eFe(),WMr="context",JVu=new YVu.NoopContextManager;class GMr{constructor(){}static getInstance(){if(!this._instance)this._instance=new GMr;return this._instance}setGlobalContextManager(e){return(0,jMr.registerGlobal)(WMr,e,lri.DiagAPI.instance())}active(){return this._getContextManager().active()}with(e,t,n,...r){return this._getContextManager().with(e,t,n,...r)}bind(e,t){return this._getContextManager().bind(e,t)}_getContextManager(){return(0,jMr.getGlobal)(WMr)||JVu}disable(){this._getContextManager().disable(),(0,jMr.unregisterGlobal)(WMr,lri.DiagAPI.instance())}}Jhn.ContextAPI=GMr});
export {Xkt};
