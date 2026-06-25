// @ts-nocheck
import {Tre,RKe} from "./m105.ts";
import {Rts,vts} from "./m591.ts";
import {b} from "../runtime.ts";
function Ntu(e){return e=Tre(e),e&&e.replace(Itu,Rts).replace(Mtu,"")}
var Itu,xtu="\\u0300-\\u036f",Dtu="\\ufe20-\\ufe2f",Ptu="\\u20d0-\\u20ff",Otu,Ltu,Mtu,wts;
var kts=b(()=>{vts();RKe();Itu=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Otu=xtu+Dtu+Ptu,Ltu="["+Otu+"]",Mtu=RegExp(Ltu,"g");wts=Ntu});
export {Ntu,Itu,xtu,Dtu,Ptu,Otu,Ltu,Mtu,wts,kts};
