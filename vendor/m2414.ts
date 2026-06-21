// @ts-nocheck
import {jK,SZe,N4} from "./m2376.ts";
import {b} from "../runtime.ts";
function Tvi(e,t,n){if(!t)return!1;let r=t.toLowerCase(),o=r.length,s=e.width,i=e.noSelect,a=e.height,l=!1;for(let c=0;c<a;c++){let u=c*s,d="",p=[],m=[];for(let A=0;A<s;A++){let h=u+A,g=jK(e,h);if(g.width===2||g.width===3||i[h]===1)continue;let _=g.char.toLowerCase(),y=p.length;for(let T=0;T<_.length;T++)m.push(y);d+=_,p.push(A)}let f=d.indexOf(r);while(f>=0){l=!0;let A=m[f],h=m[f+o-1];for(let g=A;g<=h;g++){let _=p[g],y=jK(e,u+_);SZe(e,_,c,n.withInverse(y.styleId))}f=d.indexOf(r,f+o)}}return l}
var Svi=b(()=>{N4()});
export {Tvi,Svi};
