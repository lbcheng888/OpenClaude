// @ts-nocheck
import {b} from "../runtime.ts";
function Uel(e){if(e.length<2)return!1;return Bel.includes(e)||Fel.some((t)=>t.startsWith(e))}
var Qyo,Zyo,Nel,Fel,Bel,rzy,$el;
var eTo=b(()=>{Qyo=["-verbose","-debug"],Zyo=["-erroraction","-warningaction","-informationaction","-progressaction","-errorvariable","-warningvariable","-informationvariable","-outvariable","-outbuffer","-pipelinevariable","-ea","-wa","-infa","-proga"],Nel=new Set([...Qyo,...Zyo]),Fel=["-erroraction","-warningaction","-informationaction","-progressaction"],Bel=["-ea","-wa","-infa","-proga"];rzy=new Set([...Fel,...Bel]),$el=new Set(["silentlycontinue","0","stop","1","continue","2","ignore","4"])});
export {Uel,Qyo,Zyo,Nel,Fel,Bel,rzy,$el,eTo};
