// @ts-nocheck
import {jK,SZe,N4} from "./m2376.ts";
import {b,M} from "../runtime.ts";
import {qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {mZe} from "./m2367.ts";
import {rAe} from "./m2372.ts";
import {t0t} from "./m2403.ts";
import {gZe} from "../src/config/2375__eventHandlers.ts";
import {o0t} from "./m2409.ts";
import {dTn} from "./m2283.ts";
function hvi(e,t){let n=t.toLowerCase();if(!n)return[];let r=n.length,o=e.width,s=e.height,i=e.noSelect,a=[],l=performance.now();for(let c=0;c<s;c++){let u=c*o,d="",p=[],m=[];for(let A=0;A<o;A++){let h=u+A,g=jK(e,h);if(g.width===2||g.width===3||i[h]===1)continue;let _=g.char.toLowerCase(),y=p.length;for(let T=0;T<_.length;T++)m.push(y);d+=_,p.push(A)}let f=d.indexOf(n);while(f>=0){let A=m[f],h=m[f+r-1],g=p[A],_=p[h]+1;a.push({row:c,col:g,len:_-g}),f=d.indexOf(n,f+r)}}return $ad.scan+=performance.now()-l,a}
function gvi(e,t,n,r,o){if(o<0||o>=n.length)return!1;let s=n[o],i=s.row+r;if(i<0||i>=e.height)return!1;let a=(c)=>t.withCurrentMatch(c),l=i*e.width;for(let c=s.col;c<s.col+s.len;c++){if(c<0||c>=e.width)continue;let u=jK(e,l+c);SZe(e,c,i,a(u.styleId))}return!0}
var Uad,$ad;
var _vi=b(()=>{qe();mZe();rAe();t0t();gZe();o0t();N4();Uad=M(dTn(),1),$ad={reconcile:0,yoga:0,paint:0,scan:0,calls:0}});
export {hvi,gvi,Uad,$ad,_vi};
