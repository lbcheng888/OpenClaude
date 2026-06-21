// @ts-nocheck
import {X} from "../runtime.ts";
import {Lds} from "./m877.ts";
var Mds=X((pyr)=>{Object.defineProperty(pyr,"__esModule",{value:!0});pyr.parseXML=Uiu;var Fiu=Lds(),dyr=new Fiu.XMLParser({attributeNamePrefix:"",htmlEntities:!0,ignoreAttributes:!1,ignoreDeclaration:!0,parseTagValue:!1,trimValues:!1,tagValueProcessor:(e,t)=>t.trim()===""&&t.includes(`
`)?"":void 0});dyr.addEntity("#xD","\r");dyr.addEntity("#10",`
`);function Uiu(e){return dyr.parse(e,!0)}});
export {Mds};
