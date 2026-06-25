// @ts-nocheck
import {Q} from "../runtime.ts";
import {efo} from "./m4111.ts";
var nfo=Q((QCy,J5a)=>{var Y5a=efo();J5a.exports=tfo;function tfo(){Y5a.call(this),this.screenX=this.screenY=this.clientX=this.clientY=0,this.ctrlKey=this.altKey=this.shiftKey=this.metaKey=!1,this.button=0,this.buttons=1,this.relatedTarget=null}tfo.prototype=Object.create(Y5a.prototype,{constructor:{value:tfo},initMouseEvent:{value:function(e,t,n,r,o,s,i,a,l,c,u,d,p,m,f){switch(this.initEvent(e,t,n,r,o),this.screenX=s,this.screenY=i,this.clientX=a,this.clientY=l,this.ctrlKey=c,this.altKey=u,this.shiftKey=d,this.metaKey=p,this.button=m,m){case 0:this.buttons=1;break;case 1:this.buttons=4;break;case 2:this.buttons=2;break;default:this.buttons=0;break}this.relatedTarget=f}},getModifierState:{value:function(e){switch(e){case"Alt":return this.altKey;case"Control":return this.ctrlKey;case"Shift":return this.shiftKey;case"Meta":return this.metaKey;default:return!1}}}})});
export {nfo};
