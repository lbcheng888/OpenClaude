// @ts-nocheck
import {Q} from "../runtime.ts";
var uko=Q((cko)=>{var OPe=[{x:[0],y:[0]},{x:[4],y:[0]},{x:[0,4],y:[4]},{x:[2,6],y:[0,4]},{x:[0,2,4,6],y:[2,6]},{x:[1,3,5,7],y:[0,2,4,6]},{x:[0,1,2,3,4,5,6,7],y:[1,3,5,7]}];cko.getImagePasses=function(e,t){let n=[],r=e%8,o=t%8,s=(e-r)/8,i=(t-o)/8;for(let a=0;a<OPe.length;a++){let l=OPe[a],c=s*l.x.length,u=i*l.y.length;for(let d=0;d<l.x.length;d++)if(l.x[d]<r)c++;else break;for(let d=0;d<l.y.length;d++)if(l.y[d]<o)u++;else break;if(c>0&&u>0)n.push({width:c,height:u,index:a})}return n};cko.getInterlaceIterator=function(e){return function(t,n,r){let o=t%OPe[r].x.length,s=(t-o)/OPe[r].x.length*8+OPe[r].x[o],i=n%OPe[r].y.length,a=(n-i)/OPe[r].y.length*8+OPe[r].y[i];return s*4+a*e*4}}});
export {uko};
