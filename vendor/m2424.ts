// @ts-nocheck
import {yz,btt,o4} from "./m2386.ts";
import {b} from "../runtime.ts";
function P0i(e,t,n){if(!t)return!1;let r=t.toLowerCase(),o=r.length,s=e.width,i=e.noSelect,a=e.height,l=!1;for(let c=0;c<a;c++){let u=c*s,d="",p=[],m=[];for(let h=0;h<s;h++){let g=u+h,_=yz(e,g);if(_.width===2||_.width===3||i[g]===1)continue;let T=_.char.toLowerCase(),y=p.length;for(let S=0;S<T.length;S++)m.push(y);d+=T,p.push(h)}let f=d.indexOf(r);while(f>=0){l=!0;let h=m[f],g=m[f+o-1];for(let _=h;_<=g;_++){let T=p[_],y=yz(e,u+T);btt(e,T,c,n.withInverse(y.styleId))}f=d.indexOf(r,f+o)}}return l}
var O0i=b(()=>{o4()});
export {P0i,O0i};
