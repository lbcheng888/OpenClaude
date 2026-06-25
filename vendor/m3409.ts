// @ts-nocheck
import {Q} from "../runtime.ts";
var iTa=Q((fq)=>{Object.defineProperty(fq,"__esModule",{value:!0});fq.getConflictResolutionRecipe=fq.getDescriptionResolutionRecipe=fq.getTypeConflictResolutionRecipe=fq.getUnitConflictResolutionRecipe=fq.getValueTypeConflictResolutionRecipe=fq.getIncompatibilityDetails=void 0;function Onp(e,t){let n="";if(e.unit!==t.unit)n+=`	- Unit '${e.unit}' does not match '${t.unit}'
`;if(e.type!==t.type)n+=`	- Type '${e.type}' does not match '${t.type}'
`;if(e.valueType!==t.valueType)n+=`	- Value Type '${e.valueType}' does not match '${t.valueType}'
`;if(e.description!==t.description)n+=`	- Description '${e.description}' does not match '${t.description}'
`;return n}fq.getIncompatibilityDetails=Onp;function nTa(e,t){return`	- use valueType '${e.valueType}' on instrument creation or use an instrument name other than '${t.name}'`}fq.getValueTypeConflictResolutionRecipe=nTa;function rTa(e,t){return`	- use unit '${e.unit}' on instrument creation or use an instrument name other than '${t.name}'`}fq.getUnitConflictResolutionRecipe=rTa;function oTa(e,t){let n={name:t.name,type:t.type,unit:t.unit},r=JSON.stringify(n);return`	- create a new view with a name other than '${e.name}' and InstrumentSelector '${r}'`}fq.getTypeConflictResolutionRecipe=oTa;function sTa(e,t){let n={name:t.name,type:t.type,unit:t.unit},r=JSON.stringify(n);return`	- create a new view with a name other than '${e.name}' and InstrumentSelector '${r}'
    	- OR - create a new view with the name ${e.name} and description '${e.description}' and InstrumentSelector ${r}
    	- OR - create a new view with the name ${t.name} and description '${e.description}' and InstrumentSelector ${r}`}fq.getDescriptionResolutionRecipe=sTa;function Lnp(e,t){if(e.valueType!==t.valueType)return nTa(e,t);if(e.unit!==t.unit)return rTa(e,t);if(e.type!==t.type)return oTa(e,t);if(e.description!==t.description)return sTa(e,t);return""}fq.getConflictResolutionRecipe=Lnp});
export {iTa};
