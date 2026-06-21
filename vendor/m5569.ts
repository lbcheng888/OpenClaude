// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {WMo,aec,SQn} from "../src/telemetry/5568_tip.ts";
import {cec,lec} from "./m5568.ts";
import {Te} from "./m2253.ts";
import {Text} from "./m2423.ts";
var tVt,uec=null,dec;
var pec=b(()=>{ze();WMo();cec();tVt=M(Te(),1),dec=[...uec?[uec]:[],lec,{id:"marketplace-plugin-suggestion",compute:async()=>{let e=await aec({theme:"dark"}),t=e?.pluginId;if(!e||!t)return null;return SQn(e,"startup"),{key:"marketplace-plugin-suggestion",kind:"upsell",jsx:tVt.createElement(Text,{color:"suggestion"},"plugin suggestion: ",t,tVt.createElement(Text,{color:"text",dimColor:!0}," ","\xB7 /plugin")),priority:"low"}}}]});
export {tVt,uec,dec,pec};
