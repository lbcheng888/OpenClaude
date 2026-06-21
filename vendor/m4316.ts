// @ts-nocheck
import {b} from "../runtime.ts";
function Tza(e){if(e.length<2)return!1;return yza.includes(e)||_za.some((t)=>t.startsWith(e))}
var efo,tfo,gza,_za,yza,R2_,Sza;
var nfo=b(()=>{efo=["-verbose","-debug"],tfo=["-erroraction","-warningaction","-informationaction","-progressaction","-errorvariable","-warningvariable","-informationvariable","-outvariable","-outbuffer","-pipelinevariable","-ea","-wa","-infa","-proga"],gza=new Set([...efo,...tfo]),_za=["-erroraction","-warningaction","-informationaction","-progressaction"],yza=["-ea","-wa","-infa","-proga"];R2_=new Set([..._za,...yza]),Sza=new Set(["silentlycontinue","0","stop","1","continue","2","ignore","4"])});
export {Tza,efo,tfo,gza,_za,yza,R2_,Sza,nfo};
