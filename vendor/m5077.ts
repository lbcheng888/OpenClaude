// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {di} from "./m2583.ts";
import {Wo} from "./m2557.ts";
import {sP} from "./m4535.ts";
import {je} from "./m2462.ts";
import {ss} from "./m2553.ts";
import {K$t} from "./m3840.ts";
import {mg} from "./m2209.ts";
import {br} from "../src/config/0745_updateSettingsForSource.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var vxo=()=>{};
var vNl={};
ft(vNl,{initialQuietIndexFor:()=>initialQuietIndexFor,initialIndexFor:()=>initialIndexFor,call:()=>TSm});
function initialIndexFor(e,t){if(!e)return 0;let n=t??120,r=1,o=1/0;for(let s=1;s<ANl.length;s++){let i=Math.abs(ANl[s].intervalMinutes-n);if(i<o)o=i,r=s}return r}
function initialQuietIndexFor(e){if(!e.enabled||!e.start||!e.end)return 0;for(let t=1;t<RNl.length;t++){let n=RNl[t].range;if(n.start===e.start&&n.end===e.end)return t}return 0}
var hSm,gSm,wNl,ANl,RNl,TSm=async(e)=>(e("Wellbeing settings are not available in this build"),null);
var kNl=b(()=>{di();Wo();sP();je();ss();K$t();vxo();mg();br();hSm=x(tt(),1),gSm=x(et(),1),wNl=x(oe(),1),ANl=[{label:"Off",intervalMinutes:null},{label:"Every 1 hour",intervalMinutes:60},{label:"Every 2 hours",intervalMinutes:120,hint:"(default)"},{label:"Every 3 hours",intervalMinutes:180},{label:"Every 4 hours",intervalMinutes:240}],RNl=[{label:"Off",range:null},{label:"22:00 \u2013 07:00",range:{start:"22:00",end:"07:00"}},{label:"23:00 \u2013 06:00",range:{start:"23:00",end:"06:00"}},{label:"00:00 \u2013 07:00",range:{start:"00:00",end:"07:00"}}]});
export {vxo,vNl,initialIndexFor,initialQuietIndexFor,hSm,gSm,wNl,ANl,RNl,TSm,kNl};
