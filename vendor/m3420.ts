// @ts-nocheck
import {Q} from "../runtime.ts";
import {oMn} from "./m3419.ts";
var OTa=Q((sMn)=>{Object.defineProperty(sMn,"__esModule",{value:!0});sMn.InstrumentSelector=void 0;var DTa=oMn();class PTa{_nameFilter;_type;_unitFilter;constructor(e){this._nameFilter=new DTa.PatternPredicate(e?.name??"*"),this._type=e?.type,this._unitFilter=new DTa.ExactPredicate(e?.unit)}getType(){return this._type}getNameFilter(){return this._nameFilter}getUnitFilter(){return this._unitFilter}}sMn.InstrumentSelector=PTa});
export {OTa};
