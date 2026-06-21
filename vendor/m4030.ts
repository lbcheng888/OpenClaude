// @ts-nocheck
import {kV,qOe} from "./m109.ts";
import {Gj,jOe} from "./m110.ts";
import {_Fa,yFa} from "./m4029.ts";
import {w4,BHt} from "./m2206.ts";
import {b} from "../runtime.ts";
function cvp(e,t){t=kV(t,e);var n=-1,r=t.length;if(!r)return!0;while(++n<r){var o=Gj(t[n]);if(o==="__proto__"&&!lvp.call(e,"__proto__"))return!1;if((o==="constructor"||o==="prototype")&&n<r-1)return!1}var s=_Fa(e,t);return s==null||delete s[Gj(w4(t))]}
var avp,lvp,TFa;
var SFa=b(()=>{qOe();BHt();yFa();jOe();avp=Object.prototype,lvp=avp.hasOwnProperty;TFa=cvp});
export {cvp,avp,lvp,TFa,SFa};
