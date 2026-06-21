// @ts-nocheck
import {tDe,f8n} from "../src/telemetry/4513_f8n.ts";
import {mll,pll} from "./m4552.ts";
import {b} from "../runtime.ts";
function fll(e,t){return{type:"local-jsx",name:e,description:`${t} moved to /config`,isHidden:!0,isEnabled:()=>tDe(),load:()=>Promise.resolve().then(() => (mll(),pll))}}
var All,hll;
var gll=b(()=>{f8n();All=fll("vim","Editor mode"),hll=fll("output-style","Output style")});
export {fll,All,hll,gll};
