// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {uPe,z8t} from "./m4576.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
var Whl={};
ft(Whl,{redirectMessageFor:()=>redirectMessageFor,call:()=>OZp});
function redirectMessageFor(e){let t=e&&$hl[e]?e:"vim";return`/${t} moved \u2192 ${$hl[t]} in /config`}
var j8t,$hl,OZp=async(e,t,n,r)=>{let o=redirectMessageFor(r);return j8t.jsxs(Box,{flexDirection:"column",children:[j8t.jsx(Text,{color:"suggestion",children:o}),j8t.jsx(uPe,{onClose:()=>e(o),context:t,defaultTab:"Config"})]})};
var Ghl=b(()=>{z8t();je();j8t=x(oe(),1),$hl={vim:"Editor mode","output-style":"Output style"}});
export {Whl,redirectMessageFor,j8t,$hl,OZp,Ghl};
