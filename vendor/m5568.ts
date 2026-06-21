// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {ln,Ie} from "../src/telemetry/0594_feature_name.ts";
import {Lr} from "./m578.ts";
import {Rat,ENn} from "./m3756.ts";
import {Te} from "./m2253.ts";
import {je} from "./m577.ts";
import {Text} from "./m2423.ts";
var eVt,N2m="no_permissions",lec;
var cec=b(()=>{ze();ln();Lr();Rat();eVt=M(Te(),1),lec={id:"sudo-npm-install",maxImpressions:1,onShown:()=>Ie("sudo_npm_install_notice"),compute:async()=>{if(je.DISABLE_INSTALLATION_CHECKS)return null;let e=await ENn();if(e?.path!=="npm-global"||e.outcome!=="failed"||e.status!==N2m)return null;return{key:"sudo-npm-install",jsx:eVt.createElement(Text,{color:"warning"},"Claude Code can't auto-update",eVt.createElement(Text,{dimColor:!0}," \xB7 run `/doctor`")),priority:"high",timeoutMs:15000}}}});
export {eVt,N2m,lec,cec};
