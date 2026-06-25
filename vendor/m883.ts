// @ts-nocheck
import {Q} from "../runtime.ts";
import {H_s} from "./m882.ts";
var I_s=Q(($Cr)=>{Object.defineProperty($Cr,"__esModule",{value:!0});$Cr.parseXML=n_u;var t_u=H_s(),UCr=new t_u.XMLParser({attributeNamePrefix:"",htmlEntities:!0,ignoreAttributes:!1,ignoreDeclaration:!0,parseTagValue:!1,trimValues:!1,tagValueProcessor:(e,t)=>t.trim()===""&&t.includes(`
`)?"":void 0});UCr.addEntity("#xD","\r");UCr.addEntity("#10",`
`);function n_u(e){return UCr.parse(e,!0)}});
export {I_s};
