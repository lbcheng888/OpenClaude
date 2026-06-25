// @ts-nocheck
import {gve,fsModule,P8,Q3} from "./m2277.ts";
import {b} from "../runtime.ts";
function fAi(e){return e>=Get.PARAM_START&&e<=Get.PARAM_END}
function NDt(e){return e>=Get.INTERMEDIATE_START&&e<=Get.INTERMEDIATE_END}
function hAi(e){return e>=Get.FINAL_START&&e<=Get.FINAL_END}
function Nh(...e){if(e.length===0)return Z9r;if(e.length===1)return`${Z9r}${e[0]}`;let t=e.slice(0,-1),n=e.at(-1);return`${Z9r}${t.join(gve)}${n}`}
function yAi(e=1){return e===0?"":Nh(e,"A")}
function t3r(e=1){return e===0?"":Nh(e,"B")}
function Lud(e=1){return e===0?"":Nh(e,"C")}
function Mud(e=1){return e===0?"":Nh(e,"D")}
function BEn(e){return Nh(e,"G")}
function Z3(e,t){return Nh(e,t,"H")}
function iie(e,t){let n="";if(e<0)n+=Mud(-e);else if(e>0)n+=Lud(e);if(t<0)n+=yAi(-t);else if(t>0)n+=t3r(t);return n}
function TAi(){return Nh("K")}
function UEn(e){if(e<=0)return"";let t="";for(let n=0;n<e;n++)if(t+=_ve,n<e-1)t+=yAi(1);return t+=Nud,t}
function SAi(e=1){return e===0?"":Nh(e,"S")}
function bAi(e=1){return e===0?"":Nh(e,"T")}
function az(e,t){return Nh(e,t,"r")}
var Z9r,Get,Hy,gAi,_Ai,e3r,Nud,yE,Gpg,Vpg,_ve,Mk,Vet,O8,EAi,CAi,VUe,yve,AAi,aie,RAi,ihe;
var dO=b(()=>{fsModule();Z9r=P8+String.fromCharCode(Q3.CSI),Get={PARAM_START:48,PARAM_END:63,INTERMEDIATE_START:32,INTERMEDIATE_END:47,FINAL_START:64,FINAL_END:126};Hy={CUU:65,CUD:66,CUF:67,CUB:68,CNL:69,CPL:70,CHA:71,CUP:72,CHT:73,HPA:96,HPR:97,VPA:100,VPR:101,HVP:102,ED:74,EL:75,ECH:88,IL:76,DL:77,ICH:64,DCH:80,SU:83,SD:84,SM:104,RM:108,SGR:109,DSR:110,DECSCUSR:113,DECSTBM:114,SCOSC:115,SCORC:117,CBT:90},gAi=["toEnd","toStart","all","scrollback"],_Ai=["toEnd","toStart","all"],e3r=[{style:"block",blinking:!0},{style:"block",blinking:!0},{style:"block",blinking:!1},{style:"underline",blinking:!0},{style:"underline",blinking:!1},{style:"bar",blinking:!0},{style:"bar",blinking:!1}];Nud=Nh("G");yE=Nh("H");Gpg=Nh("s"),Vpg=Nh("u");_ve=Nh(2,"K"),Mk=Nh(2,"J"),Vet=Nh(3,"J");O8=Nh("r"),EAi=Nh("200~"),CAi=Nh("201~"),VUe=Nh("I"),yve=Nh("O"),AAi=Nh(">1u"),aie=Nh("<u"),RAi=Nh(">4;2m"),ihe=Nh(">4m")});
export {fAi,NDt,hAi,Nh,yAi,t3r,Lud,Mud,BEn,Z3,iie,TAi,UEn,SAi,bAi,az,Z9r,Get,Hy,gAi,_Ai,e3r,Nud,yE,Gpg,Vpg,_ve,Mk,Vet,O8,EAi,CAi,VUe,yve,AAi,aie,RAi,ihe,dO};
