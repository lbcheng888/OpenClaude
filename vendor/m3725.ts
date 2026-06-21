// @ts-nocheck
import {X} from "../runtime.ts";
import {z1n} from "./m3724.ts";
var fva=X((Y1n)=>{Object.defineProperty(Y1n,"__esModule",{value:!0});Y1n.InstrumentSelector=void 0;var pva=z1n();class mva{_nameFilter;_type;_unitFilter;constructor(e){this._nameFilter=new pva.PatternPredicate(e?.name??"*"),this._type=e?.type,this._unitFilter=new pva.ExactPredicate(e?.unit)}getType(){return this._type}getNameFilter(){return this._nameFilter}getUnitFilter(){return this._unitFilter}}Y1n.InstrumentSelector=mva});
export {fva};
