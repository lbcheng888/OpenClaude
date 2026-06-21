// @ts-nocheck
import {X} from "../runtime.ts";
import {Dri} from "./m2082.ts";
import {ZBe} from "./m2050.ts";
import {eFe} from "./m2054.ts";
var Ori=X((cgn)=>{Object.defineProperty(cgn,"__esModule",{value:!0});cgn.MetricsAPI=void 0;var N7u=Dri(),o1r=ZBe(),Pri=eFe(),s1r="metrics";class i1r{constructor(){}static getInstance(){if(!this._instance)this._instance=new i1r;return this._instance}setGlobalMeterProvider(e){return(0,o1r.registerGlobal)(s1r,e,Pri.DiagAPI.instance())}getMeterProvider(){return(0,o1r.getGlobal)(s1r)||N7u.NOOP_METER_PROVIDER}getMeter(e,t,n){return this.getMeterProvider().getMeter(e,t,n)}disable(){(0,o1r.unregisterGlobal)(s1r,Pri.DiagAPI.instance())}}cgn.MetricsAPI=i1r});
export {Ori};
