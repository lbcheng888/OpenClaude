// @ts-nocheck
import {b} from "../runtime.ts";
function t7d(e){return e.match(e7d)||[]}
var Cia="\\ud800-\\udfff",WKd="\\u0300-\\u036f",GKd="\\ufe20-\\ufe2f",VKd="\\u20d0-\\u20ff",KKd,zKd="\\ufe0e\\ufe0f",jKd,wXr,kXr="\\ud83c[\\udffb-\\udfff]",YKd,Aia,Ria="(?:\\ud83c[\\udde6-\\uddff]){2}",via="[\\ud800-\\udbff][\\udc00-\\udfff]",JKd="\\u200d",wia,kia,XKd,QKd,ZKd,e7d,Hia;
var Iia=b(()=>{KKd=WKd+GKd+VKd,jKd="["+Cia+"]",wXr="["+KKd+"]",YKd="(?:"+wXr+"|"+kXr+")",Aia="[^"+Cia+"]",wia=YKd+"?",kia="["+zKd+"]?",XKd="(?:"+JKd+"(?:"+[Aia,Ria,via].join("|")+")"+kia+wia+")*",QKd=kia+wia+XKd,ZKd="(?:"+[Aia+wXr+"?",wXr,Ria,via,jKd].join("|")+")",e7d=RegExp(kXr+"(?="+kXr+")|"+ZKd+QKd,"g");Hia=t7d});
export {t7d,Cia,WKd,GKd,VKd,KKd,zKd,jKd,wXr,kXr,YKd,Aia,Ria,via,JKd,wia,kia,XKd,QKd,ZKd,e7d,Hia,Iia};
