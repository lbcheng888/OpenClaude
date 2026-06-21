// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Vpo,lVa} from "../src/telemetry/4279_command.ts";
import {Gn,sc} from "./m2455.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function cVa(e){if(!e.message)return"";return e.message}
function uVa(e){let t;if(e.disabledReason==="config_off")t=dG.default.createElement(Box,{flexDirection:"row"},dG.default.createElement(Text,null,'Not sent because "Push when Claude decides" is disabled in'," "),dG.default.createElement(Vpo,{command:"config"}),dG.default.createElement(Text,null,"."));else if(e.disabledReason==="user_present")t=dG.default.createElement(Text,null,"Not sent because you're active in this terminal.");else if(e.disabledReason==="no_transport")t=e.localSent?dG.default.createElement(Text,null,"Terminal notification sent."):dG.default.createElement(Box,{flexDirection:"row"},dG.default.createElement(Text,null,"Not sent \u2014 Remote Control is off. Enable with "),dG.default.createElement(Vpo,{command:"remote-control"}),dG.default.createElement(Text,null,"."));else{if(e.localSent===void 0)return null;t=dG.default.createElement(Text,null,e.localSent?"Terminal and mobile notification sent.":"Mobile notification sent.")}return dG.default.createElement(Gn,{height:1},t)}
var dG;
var dVa=b(()=>{sc();lVa();ze();dG=M(Te(),1)});
export {cVa,uVa,dG,dVa};
