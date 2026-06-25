// @ts-nocheck
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {gce,Idt} from "./m4028.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function mYa(e,t){return""}
function fYa(e,t){let n=e.at(-1)?.data;return Zxe.jsx(Yn,{children:Zxe.jsx(Text,{dimColor:!0,children:n?`Running ${n.toolName}\u2026`:"Working\u2026"})})}
function hYa(){return Zxe.jsx(Yn,{children:Zxe.jsx(Text,{color:"warning",children:"Rejected"})})}
function gYa(e,t){if(gce())return Zxe.jsx(pYa.Fragment,{});return Zxe.jsx(Yn,{children:Zxe.jsx(Text,{color:"error",children:typeof e==="string"?e:"Error"})})}
var pYa,Zxe;
var _Ya=b(()=>{Pl();je();Idt();pYa=x(et(),1),Zxe=x(oe(),1)});
export {mYa,fYa,hYa,gYa,pYa,Zxe,_Ya};
