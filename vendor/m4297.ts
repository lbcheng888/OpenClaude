// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {q_o,HXa} from "../src/telemetry/4297_command.ts";
import {Yn,Pl} from "./m2465.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
function IXa(e){if(!e.message)return"";return e.message}
function xXa(e){let t;if(e.disabledReason==="config_off")t=Zq.jsxs(Box,{flexDirection:"row",children:[Zq.jsxs(Text,{children:['Not sent because "Push when Claude decides" is disabled in'," "]}),Zq.jsx(q_o,{command:"config"}),Zq.jsx(Text,{children:"."})]});else if(e.disabledReason==="user_present")t=Zq.jsx(Text,{children:"Not sent because you're active in this terminal."});else if(e.disabledReason==="no_transport")t=e.localSent?Zq.jsx(Text,{children:"Terminal notification sent."}):Zq.jsxs(Box,{flexDirection:"row",children:[Zq.jsx(Text,{children:"Not sent \u2014 Remote Control is off. Enable with "}),Zq.jsx(q_o,{command:"remote-control"}),Zq.jsx(Text,{children:"."})]});else{if(e.localSent===void 0)return null;t=Zq.jsx(Text,{children:e.localSent?"Terminal and mobile notification sent.":"Mobile notification sent."})}return Zq.jsx(Yn,{height:1,children:t})}
var Zq;
var DXa=b(()=>{Pl();HXa();je();Zq=x(oe(),1)});
export {IXa,xXa,Zq,DXa};
