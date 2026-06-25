// @ts-nocheck
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {mn,He} from "../src/telemetry/0600_feature_name.ts";
import {Ir} from "./m584.ts";
import {vct,fUn} from "./m3772.ts";
import {oe} from "./m2275.ts";
import {Ne} from "./m583.ts";
import {Text} from "./m2433.ts";
var Cnr,pGm="no_permissions",Ylc;
var Jlc=b(()=>{je();mn();Ir();vct();Cnr=x(oe(),1),Ylc={id:"sudo-npm-install",maxImpressions:1,onShown:()=>He("sudo_npm_install_notice"),compute:async()=>{if(Ne.DISABLE_INSTALLATION_CHECKS)return null;let e=await fUn();if(e?.path!=="npm-global"||e.outcome!=="failed"||e.status!==pGm)return null;return{key:"sudo-npm-install",jsx:Cnr.jsxs(Text,{color:"warning",children:["Claude Code can't auto-update",Cnr.jsx(Text,{dimColor:!0,children:" \xB7 run `/doctor`"})]}),priority:"high",timeoutMs:15000}}}});
export {Cnr,pGm,Ylc,Jlc};
