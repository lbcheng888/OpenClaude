// @ts-nocheck
import {b} from "../runtime.ts";
var PEn;
var HIi=b(()=>{PEn=class PEn extends Map{first;last;constructor(e){let t=[],n,r,o,s=0;for(let i of e){let a={label:i.label,value:i.value,description:i.description,previous:o,next:void 0,index:s};if(o)o.next=a;n||=a,r=a,t.push([i.value,a]),s++,o=a}super(t);this.first=n,this.last=r}}});
export {PEn,HIi};
