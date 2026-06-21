// @ts-nocheck
import {b} from "../runtime.ts";
function QHc(e){return e==="html"?{childList:!0,subtree:!0,attributes:!0,characterData:!0}:{childList:!1,subtree:!1,attributes:!0,attributeFilter:[e]}}
function yZt(e){var t=_Zt.get(e);if(!t)t={element:e,attributes:{}},_Zt.set(e,t);return t}
function TZt(e,t,n,r,o){var s=n(e),i={isDirty:!1,originalValue:s,virtualValue:s,mutations:[],el:e,_positionTimeout:null,observer:new MutationObserver(function(){if(t==="position"&&i._positionTimeout)return;else if(t==="position")i._positionTimeout=setTimeout(function(){i._positionTimeout=null},1000);var a=n(e);if(t==="position"&&a.parentNode===i.virtualValue.parentNode&&a.insertBeforeNode===i.virtualValue.insertBeforeNode)return;if(a===i.virtualValue)return;i.originalValue=a,o(i)}),mutationRunner:o,setValue:r,getCurrentValue:n};if(t==="position"&&e.parentNode)i.observer.observe(e.parentNode,{childList:!0,subtree:!0,attributes:!1,characterData:!1});else i.observer.observe(e,QHc(t));return i}
function SZt(e,t){var n=t.getCurrentValue(t.el);if(t.virtualValue=e,e&&typeof e!=="string"){if(!n||e.parentNode!==n.parentNode||e.insertBeforeNode!==n.insertBeforeNode)t.isDirty=!0,HWo()}else if(e!==n)t.isDirty=!0,HWo()}
function ZHc(e){var t=e.originalValue;e.mutations.forEach(function(n){return t=n.mutate(t)}),SZt(mIc(t),e)}
function eIc(e){var t=new Set(e.originalValue.split(/\s+/).filter(Boolean));e.mutations.forEach(function(n){return n.mutate(t)}),SZt(Array.from(t).filter(Boolean).join(" "),e)}
function tIc(e){var t=e.originalValue;e.mutations.forEach(function(n){return t=n.mutate(t)}),SZt(t,e)}
function nIc(e){var{parentSelector:t,insertBeforeSelector:n}=e,r=document.querySelector(t);if(!r)return null;var o=n?document.querySelector(n):null;if(n&&!o)return null;return{parentNode:r,insertBeforeNode:o}}
function rIc(e){var t=e.originalValue;e.mutations.forEach(function(n){var r=n.mutate(),o=nIc(r);t=o||t}),SZt(t,e)}
function DWo(e){var t=yZt(e);if(!t.html)t.html=TZt(e,"html",oIc,sIc,ZHc);return t.html}
function PWo(e){var t=yZt(e);if(!t.position)t.position=TZt(e,"position",iIc,aIc,rIc);return t.position}
function OWo(e){var t=yZt(e);if(!t.classes)t.classes=TZt(e,"class",cIc,lIc,eIc);return t.classes}
function LWo(e,t){var n=yZt(e);if(!n.attributes[t])n.attributes[t]=TZt(e,t,uIc(t),dIc(t),tIc);return n.attributes[t]}
function pIc(e,t){var n=_Zt.get(e);if(!n)return;if(t==="html"){var r,o;(r=n.html)==null||(o=r.observer)==null||o.disconnect(),delete n.html}else if(t==="class"){var s,i;(s=n.classes)==null||(i=s.observer)==null||i.disconnect(),delete n.classes}else if(t==="position"){var a,l;(a=n.position)==null||(l=a.observer)==null||l.disconnect(),delete n.position}else{var c,u,d;(c=n.attributes)==null||(u=c[t])==null||(d=u.observer)==null||d.disconnect(),delete n.attributes[t]}}
function mIc(e){if(!AZt)AZt=document.createElement("div");return AZt.innerHTML=e,AZt.innerHTML}
function hZt(e,t,n){if(!n.isDirty)return;n.isDirty=!1;var r=n.virtualValue;if(!n.mutations.length)pIc(e,t);n.setValue(e,r)}
function fIc(e,t){e.html&&hZt(t,"html",e.html),e.classes&&hZt(t,"class",e.classes),e.position&&hZt(t,"position",e.position),Object.keys(e.attributes).forEach(function(n){hZt(t,n,e.attributes[n])})}
function HWo(){_Zt.forEach(fIc)}
function AIc(e,t){var n=null;if(e.kind==="html")n=DWo(t);else if(e.kind==="class")n=OWo(t);else if(e.kind==="attribute")n=LWo(t,e.attribute);else if(e.kind==="position")n=PWo(t);if(!n)return;n.mutations.push(e),n.mutationRunner(n)}
function hIc(e,t){var n=null;if(e.kind==="html")n=DWo(t);else if(e.kind==="class")n=OWo(t);else if(e.kind==="attribute")n=LWo(t,e.attribute);else if(e.kind==="position")n=PWo(t);if(!n)return;var r=n.mutations.indexOf(e);if(r!==-1)n.mutations.splice(r,1);n.mutationRunner(n)}
function MWo(e){if(e.kind==="position"&&e.elements.size===1)return;var t=new Set(e.elements),n=document.querySelectorAll(e.selector);n.forEach(function(r){if(!t.has(r))e.elements.add(r),AIc(e,r)})}
function gIc(e){e.elements.forEach(function(t){return hIc(e,t)}),e.elements.clear(),xdr.delete(e)}
function IWo(){xdr.forEach(MWo)}
function _Ic(){if(typeof document>"u")return;if(!vdr)vdr=new MutationObserver(function(){IWo()});IWo(),vdr.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!1,characterData:!1})}
function bZt(e){if(typeof document>"u")return Rdr;return xdr.add(e),MWo(e),{revert:function(){gIc(e)}}}
function wdr(e,t){return bZt({kind:"html",elements:new Set,mutate:t,selector:e})}
function NWo(e,t){return bZt({kind:"position",elements:new Set,mutate:t,selector:e})}
function NSt(e,t){return bZt({kind:"class",elements:new Set,mutate:t,selector:e})}
function gZt(e,t,n){if(!XHc.test(t))return Rdr;if(t==="class"||t==="className")return NSt(e,function(r){var o=n(Array.from(r).join(" "));if(r.clear(),!o)return;o.split(/\s+/g).filter(Boolean).forEach(function(s){return r.add(s)})});return bZt({kind:"attribute",attribute:t,elements:new Set,mutate:n,selector:e})}
function yIc(e){var{selector:t,action:n,value:r,attribute:o,parentSelector:s,insertBeforeSelector:i}=e;if(o==="html"){if(n==="append")return wdr(t,function(a){return a+(r!=null?r:"")});else if(n==="set")return wdr(t,function(){return r!=null?r:""})}else if(o==="class"){if(n==="append")return NSt(t,function(a){if(r)a.add(r)});else if(n==="remove")return NSt(t,function(a){if(r)a.delete(r)});else if(n==="set")return NSt(t,function(a){if(a.clear(),r)a.add(r)})}else if(o==="position"){if(n==="set"&&s)return NWo(t,function(){return{insertBeforeSelector:i,parentSelector:s}})}else if(n==="append")return gZt(t,o,function(a){return a!==null?a+(r!=null?r:""):r!=null?r:""});else if(n==="set")return gZt(t,o,function(){return r!=null?r:""});else if(n==="remove")return gZt(t,o,function(){return null});return Rdr}
var XHc,Rdr,_Zt,xdr,oIc=function(t){return t.innerHTML},sIc=function(t,n){return t.innerHTML=n},iIc=function(t){return{parentNode:t.parentElement,insertBeforeNode:t.nextElementSibling}},aIc=function(t,n){if(n.insertBeforeNode&&!n.parentNode.contains(n.insertBeforeNode))return;n.parentNode.insertBefore(t,n.insertBeforeNode)},lIc=function(t,n){return n?t.className=n:t.removeAttribute("class")},cIc=function(t){return t.className},uIc=function(t){return function(n){var r;return(r=n.getAttribute(t))!=null?r:null}},dIc=function(t){return function(n,r){return r!==null?n.setAttribute(t,r):n.removeAttribute(t)}},AZt,vdr,TIc,BWo;
var FWo=b(()=>{XHc=/^[a-zA-Z:_][a-zA-Z0-9:_.-]*$/,Rdr={revert:function(){}},_Zt=new Map,xdr=new Set;_Ic();TIc={html:wdr,classes:NSt,attribute:gZt,position:NWo,declarative:yIc},BWo=TIc});
export {QHc,yZt,TZt,SZt,ZHc,eIc,tIc,nIc,rIc,DWo,PWo,OWo,LWo,pIc,mIc,hZt,fIc,HWo,AIc,hIc,MWo,gIc,IWo,_Ic,bZt,wdr,NWo,NSt,gZt,yIc,XHc,Rdr,_Zt,xdr,oIc,sIc,iIc,aIc,lIc,cIc,uIc,dIc,AZt,vdr,TIc,BWo,FWo};
