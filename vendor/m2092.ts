// @ts-nocheck
import {Q} from "../runtime.ts";
import {JBe} from "./m2055.ts";
import {Dci} from "./m2090.ts";
import {hUr} from "./m2067.ts";
import {Oci} from "./m2091.ts";
import {oUr} from "./m2062.ts";
import {XBe} from "./m2059.ts";
var Nci=Q((KTn)=>{Object.defineProperty(KTn,"__esModule",{value:!0});KTn.PropagationAPI=void 0;var LUr=JBe(),crd=Dci(),Lci=hUr(),VTn=Oci(),urd=oUr(),Mci=XBe(),MUr="propagation",drd=new crd.NoopTextMapPropagator;class NUr{constructor(){this.createBaggage=urd.createBaggage,this.getBaggage=VTn.getBaggage,this.getActiveBaggage=VTn.getActiveBaggage,this.setBaggage=VTn.setBaggage,this.deleteBaggage=VTn.deleteBaggage}static getInstance(){if(!this._instance)this._instance=new NUr;return this._instance}setGlobalPropagator(e){return(0,LUr.registerGlobal)(MUr,e,Mci.DiagAPI.instance())}inject(e,t,n=Lci.defaultTextMapSetter){return this._getGlobalPropagator().inject(e,t,n)}extract(e,t,n=Lci.defaultTextMapGetter){return this._getGlobalPropagator().extract(e,t,n)}fields(){return this._getGlobalPropagator().fields()}disable(){(0,LUr.unregisterGlobal)(MUr,Mci.DiagAPI.instance())}_getGlobalPropagator(){return(0,LUr.getGlobal)(MUr)||drd}}KTn.PropagationAPI=NUr});
export {Nci};
