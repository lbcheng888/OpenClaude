// @ts-nocheck
import {jy,DU} from "./m60.ts";
import {Mde,BTt} from "./m68.ts";
import {gre,$Tt} from "./m70.ts";
import {SKe,PYt} from "./m76.ts";
import {R4o,v4o} from "./m65.ts";
import {Rbe,qTt} from "./m71.ts";
import {b} from "../runtime.ts";
function bAc(e,t){var n=jy(e),r=!n&&Mde(e),o=!n&&!r&&gre(e),s=!n&&!r&&!o&&SKe(e),i=n||r||o||s,a=i?R4o(e.length,String):[],l=a.length;for(var c in e)if((t||SAc.call(e,c))&&!(i&&(c=="length"||o&&(c=="offset"||c=="parent")||s&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||Rbe(c,l))))a.push(c);return a}
var TAc,SAc,OYt;
var hsr=b(()=>{v4o();BTt();DU();$Tt();qTt();PYt();TAc=Object.prototype,SAc=TAc.hasOwnProperty;OYt=bAc});
export {bAc,TAc,SAc,OYt,hsr};
