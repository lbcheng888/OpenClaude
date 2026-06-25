// @ts-nocheck
import {XDe,DVn} from "../src/telemetry/4533_DVn.ts";
import {Ghl,Whl} from "./m4580.ts";
import {b} from "../runtime.ts";
function Vhl(e,t){return{type:"local-jsx",name:e,description:`${t} moved to /config`,isHidden:!0,isEnabled:()=>XDe(),load:()=>Promise.resolve().then(() => (Ghl(),Whl))}}
var Khl,zhl;
var jhl=b(()=>{DVn();Khl=Vhl("vim","Editor mode"),zhl=Vhl("output-style","Output style")});
export {Vhl,Khl,zhl,jhl};
