// @ts-nocheck
import {Q} from "../runtime.ts";
import {wci} from "./m2087.ts";
import {JBe} from "./m2055.ts";
import {XBe} from "./m2059.ts";
var Hci=Q((qTn)=>{Object.defineProperty(qTn,"__esModule",{value:!0});qTn.MetricsAPI=void 0;var nrd=wci(),xUr=JBe(),kci=XBe(),DUr="metrics";class PUr{constructor(){}static getInstance(){if(!this._instance)this._instance=new PUr;return this._instance}setGlobalMeterProvider(e){return(0,xUr.registerGlobal)(DUr,e,kci.DiagAPI.instance())}getMeterProvider(){return(0,xUr.getGlobal)(DUr)||nrd.NOOP_METER_PROVIDER}getMeter(e,t,n){return this.getMeterProvider().getMeter(e,t,n)}disable(){(0,xUr.unregisterGlobal)(DUr,kci.DiagAPI.instance())}}qTn.MetricsAPI=PUr});
export {Hci};
