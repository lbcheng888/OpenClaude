// @ts-nocheck
import {X} from "../runtime.ts";
var Gda=X((Qq)=>{Object.defineProperty(Qq,"__esModule",{value:!0});Qq.getConflictResolutionRecipe=Qq.getDescriptionResolutionRecipe=Qq.getTypeConflictResolutionRecipe=Qq.getUnitConflictResolutionRecipe=Qq.getValueTypeConflictResolutionRecipe=Qq.getIncompatibilityDetails=void 0;function KVd(e,t){let n="";if(e.unit!==t.unit)n+=`	- Unit '${e.unit}' does not match '${t.unit}'
`;if(e.type!==t.type)n+=`	- Type '${e.type}' does not match '${t.type}'
`;if(e.valueType!==t.valueType)n+=`	- Value Type '${e.valueType}' does not match '${t.valueType}'
`;if(e.description!==t.description)n+=`	- Description '${e.description}' does not match '${t.description}'
`;return n}Qq.getIncompatibilityDetails=KVd;function $da(e,t){return`	- use valueType '${e.valueType}' on instrument creation or use an instrument name other than '${t.name}'`}Qq.getValueTypeConflictResolutionRecipe=$da;function qda(e,t){return`	- use unit '${e.unit}' on instrument creation or use an instrument name other than '${t.name}'`}Qq.getUnitConflictResolutionRecipe=qda;function jda(e,t){let n={name:t.name,type:t.type,unit:t.unit},r=JSON.stringify(n);return`	- create a new view with a name other than '${e.name}' and InstrumentSelector '${r}'`}Qq.getTypeConflictResolutionRecipe=jda;function Wda(e,t){let n={name:t.name,type:t.type,unit:t.unit},r=JSON.stringify(n);return`	- create a new view with a name other than '${e.name}' and InstrumentSelector '${r}'
    	- OR - create a new view with the name ${e.name} and description '${e.description}' and InstrumentSelector ${r}
    	- OR - create a new view with the name ${t.name} and description '${e.description}' and InstrumentSelector ${r}`}Qq.getDescriptionResolutionRecipe=Wda;function zVd(e,t){if(e.valueType!==t.valueType)return $da(e,t);if(e.unit!==t.unit)return qda(e,t);if(e.type!==t.type)return jda(e,t);if(e.description!==t.description)return Wda(e,t);return""}Qq.getConflictResolutionRecipe=zVd});
export {Gda};
