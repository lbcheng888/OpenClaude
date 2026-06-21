// @ts-nocheck
import {Dve,hZ,y5,I4} from "./m2267.ts";
import {b} from "../runtime.ts";
function a_i(e){return e>=WQe.PARAM_START&&e<=WQe.PARAM_END}
function uIt(e){return e>=WQe.INTERMEDIATE_START&&e<=WQe.INTERMEDIATE_END}
function l_i(e){return e>=WQe.FINAL_START&&e<=WQe.FINAL_END}
function Oh(...e){if(e.length===0)return bFr;if(e.length===1)return`${bFr}${e[0]}`;let t=e.slice(0,-1),n=e.at(-1);return`${bFr}${t.join(Dve)}${n}`}
function d_i(e=1){return e===0?"":Oh(e,"A")}
function CFr(e=1){return e===0?"":Oh(e,"B")}
function ued(e=1){return e===0?"":Oh(e,"C")}
function ded(e=1){return e===0?"":Oh(e,"D")}
function eTn(e){return Oh(e,"G")}
function D4(e,t){return Oh(e,t,"H")}
function aie(e,t){let n="";if(e<0)n+=ded(-e);else if(e>0)n+=ued(e);if(t<0)n+=d_i(-t);else if(t>0)n+=CFr(t);return n}
function p_i(){return Oh("K")}
function tTn(e){if(e<=0)return"";let t="";for(let n=0;n<e;n++)if(t+=Pve,n<e-1)t+=d_i(1);return t+=ped,t}
function m_i(e=1){return e===0?"":Oh(e,"S")}
function f_i(e=1){return e===0?"":Oh(e,"T")}
function DK(e,t){return Oh(e,t,"r")}
var bFr,WQe,Dy,c_i,u_i,EFr,ped,uC,deh,peh,Pve,UH,GQe,T5,A_i,h_i,VFe,KFe,g_i,lie,__i,Jfe;
var zO=b(()=>{hZ();bFr=y5+String.fromCharCode(I4.CSI),WQe={PARAM_START:48,PARAM_END:63,INTERMEDIATE_START:32,INTERMEDIATE_END:47,FINAL_START:64,FINAL_END:126};Dy={CUU:65,CUD:66,CUF:67,CUB:68,CNL:69,CPL:70,CHA:71,CUP:72,CHT:73,HPA:96,HPR:97,VPA:100,VPR:101,HVP:102,ED:74,EL:75,ECH:88,IL:76,DL:77,ICH:64,DCH:80,SU:83,SD:84,SM:104,RM:108,SGR:109,DSR:110,DECSCUSR:113,DECSTBM:114,SCOSC:115,SCORC:117,CBT:90},c_i=["toEnd","toStart","all","scrollback"],u_i=["toEnd","toStart","all"],EFr=[{style:"block",blinking:!0},{style:"block",blinking:!0},{style:"block",blinking:!1},{style:"underline",blinking:!0},{style:"underline",blinking:!1},{style:"bar",blinking:!0},{style:"bar",blinking:!1}];ped=Oh("G");uC=Oh("H");deh=Oh("s"),peh=Oh("u");Pve=Oh(2,"K"),UH=Oh(2,"J"),GQe=Oh(3,"J");T5=Oh("r"),A_i=Oh("200~"),h_i=Oh("201~"),VFe=Oh("I"),KFe=Oh("O"),g_i=Oh(">1u"),lie=Oh("<u"),__i=Oh(">4;2m"),Jfe=Oh(">4m")});
export {a_i,uIt,l_i,Oh,d_i,CFr,ued,ded,eTn,D4,aie,p_i,tTn,m_i,f_i,DK,bFr,WQe,Dy,c_i,u_i,EFr,ped,uC,deh,peh,Pve,UH,GQe,T5,A_i,h_i,VFe,KFe,g_i,lie,__i,Jfe,zO};
