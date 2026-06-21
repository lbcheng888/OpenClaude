// @ts-nocheck
import {X} from "../runtime.ts";
import {ZBe} from "./m2050.ts";
import {Nri} from "./m2085.ts";
import {qMr} from "./m2062.ts";
import {Fri} from "./m2086.ts";
import {IMr} from "./m2057.ts";
import {eFe} from "./m2054.ts";
var qri=X((mgn)=>{Object.defineProperty(mgn,"__esModule",{value:!0});mgn.PropagationAPI=void 0;var l1r=ZBe(),W7u=Nri(),Uri=qMr(),pgn=Fri(),G7u=IMr(),$ri=eFe(),c1r="propagation",V7u=new W7u.NoopTextMapPropagator;class u1r{constructor(){this.createBaggage=G7u.createBaggage,this.getBaggage=pgn.getBaggage,this.getActiveBaggage=pgn.getActiveBaggage,this.setBaggage=pgn.setBaggage,this.deleteBaggage=pgn.deleteBaggage}static getInstance(){if(!this._instance)this._instance=new u1r;return this._instance}setGlobalPropagator(e){return(0,l1r.registerGlobal)(c1r,e,$ri.DiagAPI.instance())}inject(e,t,n=Uri.defaultTextMapSetter){return this._getGlobalPropagator().inject(e,t,n)}extract(e,t,n=Uri.defaultTextMapGetter){return this._getGlobalPropagator().extract(e,t,n)}fields(){return this._getGlobalPropagator().fields()}disable(){(0,l1r.unregisterGlobal)(c1r,$ri.DiagAPI.instance())}_getGlobalPropagator(){return(0,l1r.getGlobal)(c1r)||V7u}}mgn.PropagationAPI=u1r});
export {qri};
