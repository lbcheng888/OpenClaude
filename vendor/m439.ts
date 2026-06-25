// @ts-nocheck
import {b} from "../runtime.ts";
function rBc(e){return e==="html"?{childList:!0,subtree:!0,attributes:!0,characterData:!0}:{childList:!1,subtree:!1,attributes:!0,attributeFilter:[e]}}
function Ztn(e){var t=Qtn.get(e);if(!t)t={element:e,attributes:{}},Qtn.set(e,t);return t}
function enn(e,t,n,r,o){var s=n(e),i={isDirty:!1,originalValue:s,virtualValue:s,mutations:[],el:e,_positionTimeout:null,observer:new MutationObserver(function(){if(t==="position"&&i._positionTimeout)return;else if(t==="position")i._positionTimeout=setTimeout(function(){i._positionTimeout=null},1000);var a=n(e);if(t==="position"&&a.parentNode===i.virtualValue.parentNode&&a.insertBeforeNode===i.virtualValue.insertBeforeNode)return;if(a===i.virtualValue)return;i.originalValue=a,o(i)}),mutationRunner:o,setValue:r,getCurrentValue:n};if(t==="position"&&e.parentNode)i.observer.observe(e.parentNode,{childList:!0,subtree:!0,attributes:!1,characterData:!1});else i.observer.observe(e,rBc(t));return i}
function tnn(e,t){var n=t.getCurrentValue(t.el);if(t.virtualValue=e,e&&typeof e!=="string"){if(!n||e.parentNode!==n.parentNode||e.insertBeforeNode!==n.insertBeforeNode)t.isDirty=!0,wYo()}else if(e!==n)t.isDirty=!0,wYo()}
function oBc(e){var t=e.originalValue;e.mutations.forEach(function(n){return t=n.mutate(t)}),tnn(yBc(t),e)}
function sBc(e){var t=new Set(e.originalValue.split(/\s+/).filter(Boolean));e.mutations.forEach(function(n){return n.mutate(t)}),tnn(Array.from(t).filter(Boolean).join(" "),e)}
function iBc(e){var t=e.originalValue;e.mutations.forEach(function(n){return t=n.mutate(t)}),tnn(t,e)}
function aBc(e){var{parentSelector:t,insertBeforeSelector:n}=e,r=document.querySelector(t);if(!r)return null;var o=n?document.querySelector(n):null;if(n&&!o)return null;return{parentNode:r,insertBeforeNode:o}}
function lBc(e){var t=e.originalValue;e.mutations.forEach(function(n){var r=n.mutate(),o=aBc(r);t=o||t}),tnn(t,e)}
function HYo(e){var t=Ztn(e);if(!t.html)t.html=enn(e,"html",cBc,uBc,oBc);return t.html}
function IYo(e){var t=Ztn(e);if(!t.position)t.position=enn(e,"position",dBc,pBc,lBc);return t.position}
function xYo(e){var t=Ztn(e);if(!t.classes)t.classes=enn(e,"class",fBc,mBc,sBc);return t.classes}
function DYo(e,t){var n=Ztn(e);if(!n.attributes[t])n.attributes[t]=enn(e,t,hBc(t),gBc(t),iBc);return n.attributes[t]}
function _Bc(e,t){var n=Qtn.get(e);if(!n)return;if(t==="html"){var r,o;(r=n.html)==null||(o=r.observer)==null||o.disconnect(),delete n.html}else if(t==="class"){var s,i;(s=n.classes)==null||(i=s.observer)==null||i.disconnect(),delete n.classes}else if(t==="position"){var a,l;(a=n.position)==null||(l=a.observer)==null||l.disconnect(),delete n.position}else{var c,u,d;(c=n.attributes)==null||(u=c[t])==null||(d=u.observer)==null||d.disconnect(),delete n.attributes[t]}}
function yBc(e){if(!Ytn)Ytn=document.createElement("div");return Ytn.innerHTML=e,Ytn.innerHTML}
function Jtn(e,t,n){if(!n.isDirty)return;n.isDirty=!1;var r=n.virtualValue;if(!n.mutations.length)_Bc(e,t);n.setValue(e,r)}
function TBc(e,t){e.html&&Jtn(t,"html",e.html),e.classes&&Jtn(t,"class",e.classes),e.position&&Jtn(t,"position",e.position),Object.keys(e.attributes).forEach(function(n){Jtn(t,n,e.attributes[n])})}
function wYo(){Qtn.forEach(TBc)}
function SBc(e,t){var n=null;if(e.kind==="html")n=HYo(t);else if(e.kind==="class")n=xYo(t);else if(e.kind==="attribute")n=DYo(t,e.attribute);else if(e.kind==="position")n=IYo(t);if(!n)return;n.mutations.push(e),n.mutationRunner(n)}
function bBc(e,t){var n=null;if(e.kind==="html")n=HYo(t);else if(e.kind==="class")n=xYo(t);else if(e.kind==="attribute")n=DYo(t,e.attribute);else if(e.kind==="position")n=IYo(t);if(!n)return;var r=n.mutations.indexOf(e);if(r!==-1)n.mutations.splice(r,1);n.mutationRunner(n)}
function PYo(e){if(e.kind==="position"&&e.elements.size===1)return;var t=new Set(e.elements),n=document.querySelectorAll(e.selector);n.forEach(function(r){if(!t.has(r))e.elements.add(r),SBc(e,r)})}
function EBc(e){e.elements.forEach(function(t){return bBc(e,t)}),e.elements.clear(),ngr.delete(e)}
function kYo(){ngr.forEach(PYo)}
function CBc(){if(typeof document>"u")return;if(!Zhr)Zhr=new MutationObserver(function(){kYo()});kYo(),Zhr.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!1,characterData:!1})}
function nnn(e){if(typeof document>"u")return tgr;return ngr.add(e),PYo(e),{revert:function(){EBc(e)}}}
function egr(e,t){return nnn({kind:"html",elements:new Set,mutate:t,selector:e})}
function OYo(e,t){return nnn({kind:"position",elements:new Set,mutate:t,selector:e})}
function cAt(e,t){return nnn({kind:"class",elements:new Set,mutate:t,selector:e})}
function Xtn(e,t,n){if(!nBc.test(t))return tgr;if(t==="class"||t==="className")return cAt(e,function(r){var o=n(Array.from(r).join(" "));if(r.clear(),!o)return;o.split(/\s+/g).filter(Boolean).forEach(function(s){return r.add(s)})});return nnn({kind:"attribute",attribute:t,elements:new Set,mutate:n,selector:e})}
function ABc(e){var{selector:t,action:n,value:r,attribute:o,parentSelector:s,insertBeforeSelector:i}=e;if(o==="html"){if(n==="append")return egr(t,function(a){return a+(r!=null?r:"")});else if(n==="set")return egr(t,function(){return r!=null?r:""})}else if(o==="class"){if(n==="append")return cAt(t,function(a){if(r)a.add(r)});else if(n==="remove")return cAt(t,function(a){if(r)a.delete(r)});else if(n==="set")return cAt(t,function(a){if(a.clear(),r)a.add(r)})}else if(o==="position"){if(n==="set"&&s)return OYo(t,function(){return{insertBeforeSelector:i,parentSelector:s}})}else if(n==="append")return Xtn(t,o,function(a){return a!==null?a+(r!=null?r:""):r!=null?r:""});else if(n==="set")return Xtn(t,o,function(){return r!=null?r:""});else if(n==="remove")return Xtn(t,o,function(){return null});return tgr}
var nBc,tgr,Qtn,ngr,cBc=function(t){return t.innerHTML},uBc=function(t,n){return t.innerHTML=n},dBc=function(t){return{parentNode:t.parentElement,insertBeforeNode:t.nextElementSibling}},pBc=function(t,n){if(n.insertBeforeNode&&!n.parentNode.contains(n.insertBeforeNode))return;n.parentNode.insertBefore(t,n.insertBeforeNode)},mBc=function(t,n){return n?t.className=n:t.removeAttribute("class")},fBc=function(t){return t.className},hBc=function(t){return function(n){var r;return(r=n.getAttribute(t))!=null?r:null}},gBc=function(t){return function(n,r){return r!==null?n.setAttribute(t,r):n.removeAttribute(t)}},Ytn,Zhr,RBc,LYo;
var MYo=b(()=>{nBc=/^[a-zA-Z:_][a-zA-Z0-9:_.-]*$/,tgr={revert:function(){}},Qtn=new Map,ngr=new Set;CBc();RBc={html:egr,classes:cAt,attribute:Xtn,position:OYo,declarative:ABc},LYo=RBc});
export {rBc,Ztn,enn,tnn,oBc,sBc,iBc,aBc,lBc,HYo,IYo,xYo,DYo,_Bc,yBc,Jtn,TBc,wYo,SBc,bBc,PYo,EBc,kYo,CBc,nnn,egr,OYo,cAt,Xtn,ABc,nBc,tgr,Qtn,ngr,cBc,uBc,dBc,pBc,mBc,fBc,hBc,gBc,Ytn,Zhr,RBc,LYo,MYo};
