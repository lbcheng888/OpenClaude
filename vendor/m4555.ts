// @ts-nocheck
import {b} from "../runtime.ts";
function zAo(e){return e in eKn}
function jAo(e){return e in rKn}
function pfl(){return{mode:"INSERT",insertedText:""}}
function mfl(){return{lastChange:null,lastFind:null,register:"",registerIsLinewise:!1}}
var eKn,tKn,nKn,rKn,YAo,oKn=1e4;
var JAo=b(()=>{eKn={d:"delete",c:"change",y:"yank"};tKn=new Set(["h","l"," ","j","k","w","b","e","W","B","E","0","^","$"]),nKn=new Set(["f","F","t","T"]),rKn={i:"inner",a:"around"};YAo=new Set(["w","W",'"',"'","`","(",")","b","[","]","{","}","B","<",">"])});
export {zAo,jAo,pfl,mfl,eKn,tKn,nKn,rKn,YAo,oKn,JAo};
