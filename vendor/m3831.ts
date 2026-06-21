// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function ooo(e,t,n=!1,r=!1){let o=EUt.useRef(e),s=EUt.useRef(t),i=EUt.useRef(0),a=EUt.useRef(e);if(t>s.current)o.current=e,s.current=t,i.current=0,a.current=e;let l;if(n)l=0,o.current=e;else l=e-o.current;let c=l>1e4&&!n,u=c?Math.min((l-1e4)/1e4,1):0;if(!r&&(u>0||i.current>0)){let p=e-a.current;if(p>=50){let m=Math.floor(p/50),f=i.current;for(let A=0;A<m;A++){let h=u-f;if(Math.abs(h)<0.01){f=u;break}f+=h*0.1}i.current=f,a.current=e}}else i.current=u,a.current=e;let d=r?u:i.current;return{isStalled:c,stalledIntensity:d,timeSinceLastToken:l}}
var EUt;
var soo=b(()=>{EUt=M(Te(),1)});
export {ooo,EUt,soo};
