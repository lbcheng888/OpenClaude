// @ts-nocheck
import {yz,btt,o4} from "./m2386.ts";
import {b,x} from "../runtime.ts";
import {qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {mtt} from "./m2377.ts";
import {mhe} from "./m2382.ts";
import {DPt} from "./m2413.ts";
import {_tt} from "../src/config/2385__eventHandlers.ts";
import {LPt} from "./m2419.ts";
import {XEn} from "./m2294.ts";
function H0i(e,t){let n=t.toLowerCase();if(!n)return[];let r=n.length,o=e.width,s=e.height,i=e.noSelect,a=[],l=performance.now();for(let c=0;c<s;c++){let u=c*o,d="",p=[],m=[];for(let h=0;h<o;h++){let g=u+h,_=yz(e,g);if(_.width===2||_.width===3||i[g]===1)continue;let T=_.char.toLowerCase(),y=p.length;for(let S=0;S<T.length;S++)m.push(y);d+=T,p.push(h)}let f=d.indexOf(n);while(f>=0){let h=m[f],g=m[f+r-1],_=p[h],T=p[g]+1;a.push({row:c,col:_,len:T-_}),f=d.indexOf(n,f+r)}}return pyd.scan+=performance.now()-l,a}
function I0i(e,t,n,r,o){if(o<0||o>=n.length)return!1;let s=n[o],i=s.row+r;if(i<0||i>=e.height)return!1;let a=(c)=>t.withCurrentMatch(c),l=i*e.width;for(let c=s.col;c<s.col+s.len;c++){if(c<0||c>=e.width)continue;let u=yz(e,l+c);btt(e,c,i,a(u.styleId))}return!0}
var dyd,pyd;
var x0i=b(()=>{qe();mtt();mhe();DPt();_tt();LPt();o4();dyd=x(XEn(),1),pyd={reconcile:0,yoga:0,paint:0,scan:0,calls:0}});
export {H0i,I0i,dyd,pyd,x0i};
