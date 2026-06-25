// @ts-nocheck
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {m2o,jlc,Enr} from "../src/telemetry/5606_tip.ts";
import {Jlc,Ylc} from "./m5606.ts";
import {oe} from "./m2275.ts";
import {Text} from "./m2433.ts";
var f2o,Xlc=null,Qlc;
var Zlc=b(()=>{je();m2o();Jlc();f2o=x(oe(),1),Qlc=[...Xlc?[Xlc]:[],Ylc,{id:"marketplace-plugin-suggestion",compute:async()=>{let e=await jlc({theme:"dark"}),t=e?.pluginId;if(!e||!t)return null;return Enr(e,"startup"),{key:"marketplace-plugin-suggestion",kind:"upsell",jsx:f2o.jsxs(Text,{color:"suggestion",children:["plugin suggestion: ",t,f2o.jsxs(Text,{color:"text",dimColor:!0,children:[" ","\xB7 /plugin"]})]}),priority:"low"}}}]});
export {f2o,Xlc,Qlc,Zlc};
