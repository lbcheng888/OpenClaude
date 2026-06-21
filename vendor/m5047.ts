// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {Li} from "./m2572.ts";
import {rs} from "./m2546.ts";
import {$P} from "./m4515.ts";
import {ze} from "./m2452.ts";
import {Ts} from "./m2542.ts";
import {gUt} from "./m3822.ts";
import {Ug} from "./m2264.ts";
import {yr} from "../src/config/0740_updateSettingsForSource.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var _Ro=()=>{};
var tIl={};
isFullscreenWithTTY(tIl,{initialQuietIndexFor:()=>initialQuietIndexFor,initialIndexFor:()=>initialIndexFor,call:()=>ldm});
function initialIndexFor(e,t){if(!e)return 0;let n=t??120,r=1,o=1/0;for(let s=1;s<ZHl.length;s++){let i=Math.abs(ZHl[s].intervalMinutes-n);if(i<o)o=i,r=s}return r}
function initialQuietIndexFor(e){if(!e.enabled||!e.start||!e.end)return 0;for(let t=1;t<eIl.length;t++){let n=eIl[t].range;if(n.start===e.start&&n.end===e.end)return t}return 0}
var rdm,odm,sdm,ZHl,eIl,ldm=async(e)=>(e("Wellbeing settings are not available in this build"),null);
var nIl=b(()=>{Li();rs();$P();ze();Ts();gUt();_Ro();Ug();yr();rdm=M(rt(),1),odm=M(Te(),1),sdm=M(Te(),1),ZHl=[{label:"Off",intervalMinutes:null},{label:"Every 1 hour",intervalMinutes:60},{label:"Every 2 hours",intervalMinutes:120,hint:"(default)"},{label:"Every 3 hours",intervalMinutes:180},{label:"Every 4 hours",intervalMinutes:240}],eIl=[{label:"Off",range:null},{label:"22:00 \u2013 07:00",range:{start:"22:00",end:"07:00"}},{label:"23:00 \u2013 06:00",range:{start:"23:00",end:"06:00"}},{label:"00:00 \u2013 07:00",range:{start:"00:00",end:"07:00"}}]});
export {_Ro,tIl,initialIndexFor,initialQuietIndexFor,rdm,odm,sdm,ZHl,eIl,ldm,nIl};
