// @ts-nocheck
import {X} from "../runtime.ts";
var UCa=X((p6)=>{Object.defineProperty(p6,"__esModule",{value:!0});p6.getConflictResolutionRecipe=p6.getDescriptionResolutionRecipe=p6.getTypeConflictResolutionRecipe=p6.getUnitConflictResolutionRecipe=p6.getValueTypeConflictResolutionRecipe=p6.getIncompatibilityDetails=void 0;function xcp(e,t){let n="";if(e.unit!==t.unit)n+=`	- Unit '${e.unit}' does not match '${t.unit}'
`;if(e.type!==t.type)n+=`	- Type '${e.type}' does not match '${t.type}'
`;if(e.valueType!==t.valueType)n+=`	- Value Type '${e.valueType}' does not match '${t.valueType}'
`;if(e.description!==t.description)n+=`	- Description '${e.description}' does not match '${t.description}'
`;return n}p6.getIncompatibilityDetails=xcp;function MCa(e,t){return`	- use valueType '${e.valueType}' on instrument creation or use an instrument name other than '${t.name}'`}p6.getValueTypeConflictResolutionRecipe=MCa;function NCa(e,t){return`	- use unit '${e.unit}' on instrument creation or use an instrument name other than '${t.name}'`}p6.getUnitConflictResolutionRecipe=NCa;function BCa(e,t){let n={name:t.name,type:t.type,unit:t.unit},r=JSON.stringify(n);return`	- create a new view with a name other than '${e.name}' and InstrumentSelector '${r}'`}p6.getTypeConflictResolutionRecipe=BCa;function FCa(e,t){let n={name:t.name,type:t.type,unit:t.unit},r=JSON.stringify(n);return`	- create a new view with a name other than '${e.name}' and InstrumentSelector '${r}'
    	- OR - create a new view with the name ${e.name} and description '${e.description}' and InstrumentSelector ${r}
    	- OR - create a new view with the name ${t.name} and description '${e.description}' and InstrumentSelector ${r}`}p6.getDescriptionResolutionRecipe=FCa;function kcp(e,t){if(e.valueType!==t.valueType)return MCa(e,t);if(e.unit!==t.unit)return NCa(e,t);if(e.type!==t.type)return BCa(e,t);if(e.description!==t.description)return FCa(e,t);return""}p6.getConflictResolutionRecipe=kcp});
export {UCa};
