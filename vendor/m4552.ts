// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {dDe,y6t} from "./m4548.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
var pll={};
isFullscreenWithTTY(pll,{redirectMessageFor:()=>redirectMessageFor,call:()=>HGp});
function redirectMessageFor(e){let t=e&&ull[e]?e:"vim";return`/${t} moved \u2192 ${ull[t]} in /config`}
var vje,ull,HGp=async(e,t,n,r)=>{let o=redirectMessageFor(r);return vje.createElement(Box,{flexDirection:"column"},vje.createElement(Text,{color:"suggestion"},o),vje.createElement(dDe,{onClose:()=>e(o),context:t,defaultTab:"Config"}))};
var mll=b(()=>{y6t();ze();vje=M(Te(),1),ull={vim:"Editor mode","output-style":"Output style"}});
export {pll,redirectMessageFor,vje,ull,HGp,mll};
