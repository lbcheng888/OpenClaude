// @ts-nocheck
import {Q} from "../runtime.ts";
import {$Bn} from "./m3740.ts";
var Hxa=Q((qBn)=>{Object.defineProperty(qBn,"__esModule",{value:!0});qBn.InstrumentSelector=void 0;var wxa=$Bn();class kxa{_nameFilter;_type;_unitFilter;constructor(e){this._nameFilter=new wxa.PatternPredicate(e?.name??"*"),this._type=e?.type,this._unitFilter=new wxa.ExactPredicate(e?.unit)}getType(){return this._type}getNameFilter(){return this._nameFilter}getUnitFilter(){return this._unitFilter}}qBn.InstrumentSelector=kxa});
export {Hxa};
