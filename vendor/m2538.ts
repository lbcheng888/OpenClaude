// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {MA,qZ} from "../src/telemetry/2538_qZ.ts";
import {useVoiceState,The} from "./m2467.ts";
import {useAnimationFrame,qPt} from "../src/config/2452_isVisible.ts";
import {xy,nS} from "../src/config/2351_nS.ts";
import {evn,nvn,$Z} from "./m2536.ts";
import {b} from "../runtime.ts";
function eMi(){hOt=0,L5r=!1}
function rvn(){let e=_t((_)=>MA(_.settings.prefersReducedMotion)),n=useVoiceState((_)=>_.voiceState)==="recording";if(n&&!L5r)hOt=0;L5r=n;let r=useVoiceState((_)=>_.voiceAudioLevels),o=n&&!e,[s,i]=useAnimationFrame(o?50:null);if(!o)return[s,null];let a=r.at(-1)??0,l=Math.min(a*VAd,1);hOt=hOt*ZLi+l*(1-ZLi);let c=Math.max(1,Math.min(Math.round(hOt*(O5r.length-1)),O5r.length-1)),u=a<KAd,d=i/1000*90%360,p=xy()?evn(d):d,{r:m,g:f,b:h}=u?{r:128,g:128,b:128}:nvn(p),g=`#${(m<<16|f<<8|h).toString(16).padStart(6,"0")}`;return[s,{char:O5r[c],hex:g}]}
var O5r=" \u2581\u2582\u2583\u2584\u2585\u2586\u2587\u2588",ZLi=0.7,VAd=1.8,KAd=0.15,hOt=0,L5r=!1;
var ovn=b(()=>{$Z();The();qPt();nS();uo();qZ()});
export {eMi,rvn,O5r,ZLi,VAd,KAd,hOt,L5r,ovn};
