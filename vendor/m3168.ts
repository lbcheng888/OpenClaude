// @ts-nocheck
import {b} from "../runtime.ts";
function y9d(e){return e.match(_9d)||[]}
var bZi="\\ud800-\\udfff",a9d="\\u0300-\\u036f",l9d="\\ufe20-\\ufe2f",c9d="\\u20d0-\\u20ff",u9d,d9d="\\ufe0e\\ufe0f",p9d,V7r,K7r="\\ud83c[\\udffb-\\udfff]",m9d,EZi,CZi="(?:\\ud83c[\\udde6-\\uddff]){2}",vZi="[\\ud800-\\udbff][\\udc00-\\udfff]",f9d="\\u200d",wZi,RZi,A9d,h9d,g9d,_9d,xZi;
var kZi=b(()=>{u9d=a9d+l9d+c9d,p9d="["+bZi+"]",V7r="["+u9d+"]",m9d="(?:"+V7r+"|"+K7r+")",EZi="[^"+bZi+"]",wZi=m9d+"?",RZi="["+d9d+"]?",A9d="(?:"+f9d+"(?:"+[EZi,CZi,vZi].join("|")+")"+RZi+wZi+")*",h9d=RZi+wZi+A9d,g9d="(?:"+[EZi+V7r+"?",V7r,CZi,vZi,p9d].join("|")+")",_9d=RegExp(K7r+"(?="+K7r+")|"+g9d+h9d,"g");xZi=y9d});
export {y9d,bZi,a9d,l9d,c9d,u9d,d9d,p9d,V7r,K7r,m9d,EZi,CZi,vZi,f9d,wZi,RZi,A9d,h9d,g9d,_9d,xZi,kZi};
