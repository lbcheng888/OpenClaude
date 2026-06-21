// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {Dv,VZ} from "../src/telemetry/2527_VZ.ts";
import {useVoiceState,iAe} from "./m2457.ts";
import {useAnimationFrame,p0t} from "../src/config/2442_isVisible.ts";
import {Oy,XS} from "../src/config/2341_XS.ts";
import {mEn,AEn,GZ} from "./m2525.ts";
import {b} from "../runtime.ts";
function PHi(){B0t=0,r3r=!1}
function hEn(){let e=mt((g)=>Dv(g.settings.prefersReducedMotion)),n=useVoiceState((g)=>g.voiceState)==="recording";if(n&&!r3r)B0t=0;r3r=n;let r=useVoiceState((g)=>g.voiceAudioLevels),o=n&&!e,[s,i]=useAnimationFrame(o?50:null);if(!o)return[s,null];let a=r.at(-1)??0,l=Math.min(a*yfd,1);B0t=B0t*DHi+l*(1-DHi);let c=Math.max(1,Math.min(Math.round(B0t*(n3r.length-1)),n3r.length-1)),u=a<Tfd,d=i/1000*90%360,p=Oy()?mEn(d):d,{r:m,g:f,b:A}=u?{r:128,g:128,b:128}:AEn(p),h=`#${(m<<16|f<<8|A).toString(16).padStart(6,"0")}`;return[s,{char:n3r[c],hex:h}]}
var n3r=" \u2581\u2582\u2583\u2584\u2585\u2586\u2587\u2588",DHi=0.7,yfd=1.8,Tfd=0.15,B0t=0,r3r=!1;
var o3r=b(()=>{GZ();iAe();p0t();XS();configProtoStore();VZ()});
export {PHi,hEn,n3r,DHi,yfd,Tfd,B0t,r3r,o3r};
