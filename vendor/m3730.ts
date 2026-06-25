// @ts-nocheck
import {Q} from "../runtime.ts";
var txa=Q((kq)=>{Object.defineProperty(kq,"__esModule",{value:!0});kq.getConflictResolutionRecipe=kq.getDescriptionResolutionRecipe=kq.getTypeConflictResolutionRecipe=kq.getUnitConflictResolutionRecipe=kq.getValueTypeConflictResolutionRecipe=kq.getIncompatibilityDetails=void 0;function hSp(e,t){let n="";if(e.unit!==t.unit)n+=`	- Unit '${e.unit}' does not match '${t.unit}'
`;if(e.type!==t.type)n+=`	- Type '${e.type}' does not match '${t.type}'
`;if(e.valueType!==t.valueType)n+=`	- Value Type '${e.valueType}' does not match '${t.valueType}'
`;if(e.description!==t.description)n+=`	- Description '${e.description}' does not match '${t.description}'
`;return n}kq.getIncompatibilityDetails=hSp;function X0a(e,t){return`	- use valueType '${e.valueType}' on instrument creation or use an instrument name other than '${t.name}'`}kq.getValueTypeConflictResolutionRecipe=X0a;function Q0a(e,t){return`	- use unit '${e.unit}' on instrument creation or use an instrument name other than '${t.name}'`}kq.getUnitConflictResolutionRecipe=Q0a;function Z0a(e,t){let n={name:t.name,type:t.type,unit:t.unit},r=JSON.stringify(n);return`	- create a new view with a name other than '${e.name}' and InstrumentSelector '${r}'`}kq.getTypeConflictResolutionRecipe=Z0a;function exa(e,t){let n={name:t.name,type:t.type,unit:t.unit},r=JSON.stringify(n);return`	- create a new view with a name other than '${e.name}' and InstrumentSelector '${r}'
    	- OR - create a new view with the name ${e.name} and description '${e.description}' and InstrumentSelector ${r}
    	- OR - create a new view with the name ${t.name} and description '${e.description}' and InstrumentSelector ${r}`}kq.getDescriptionResolutionRecipe=exa;function gSp(e,t){if(e.valueType!==t.valueType)return X0a(e,t);if(e.unit!==t.unit)return Q0a(e,t);if(e.type!==t.type)return Z0a(e,t);if(e.description!==t.description)return exa(e,t);return""}kq.getConflictResolutionRecipe=gSp});
export {txa};
