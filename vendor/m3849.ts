// @ts-nocheck
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Glo(e,t,n=!1,r=!1){let o=Q$t.useRef(e),s=Q$t.useRef(t),i=Q$t.useRef(0),a=Q$t.useRef(e);if(t>s.current)o.current=e,s.current=t,i.current=0,a.current=e;let l;if(n)l=0,o.current=e;else l=e-o.current;let c=l>1e4&&!n,u=c?Math.min((l-1e4)/1e4,1):0;if(!r&&(u>0||i.current>0)){let p=e-a.current;if(p>=50){let m=Math.floor(p/50),f=i.current;for(let h=0;h<m;h++){let g=u-f;if(Math.abs(g)<0.01){f=u;break}f+=g*0.1}i.current=f,a.current=e}}else i.current=u,a.current=e;let d=r?u:i.current;return{isStalled:c,stalledIntensity:d,timeSinceLastToken:l}}
var Q$t;
var Vlo=b(()=>{Q$t=x(et(),1)});
export {Glo,Q$t,Vlo};
