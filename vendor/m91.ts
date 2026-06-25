// @ts-nocheck
import {jy,DU} from "./m60.ts";
import {Nde,KTt} from "./m90.ts";
import {gre,$Tt} from "./m70.ts";
import {fre,FTt} from "./m48.ts";
import {SKe,PYt} from "./m76.ts";
import {bYt,asr} from "./m54.ts";
import {E4o,C4o} from "./m58.ts";
import {q4o,W4o} from "./m85.ts";
import {b} from "../runtime.ts";
function jAc(e,t,n,r,o,s){var i=jy(e),a=jy(t),l=i?Z4o:Nde(e),c=a?Z4o:Nde(t);l=l==Q4o?UYt:l,c=c==Q4o?UYt:c;var u=l==UYt,d=c==UYt,p=l==c;if(p&&gre(e)){if(!gre(t))return!1;i=!0,u=!1}if(p&&!u)return s||(s=new fre),i||SKe(e)?bYt(e,t,n,r,o,s):E4o(e,t,l,n,r,o,s);if(!(n&KAc)){var m=u&&eqo.call(e,"__wrapped__"),f=d&&eqo.call(t,"__wrapped__");if(m||f){var h=m?e.value():e,g=f?t.value():t;return s||(s=new fre),o(h,g,n,r,s)}}if(!p)return!1;return s||(s=new fre),q4o(e,t,n,r,o,s)}
var KAc=1,Q4o="[object Arguments]",Z4o="[object Array]",UYt="[object Object]",zAc,eqo,tqo;
var nqo=b(()=>{FTt();asr();C4o();W4o();KTt();DU();$Tt();PYt();zAc=Object.prototype,eqo=zAc.hasOwnProperty;tqo=jAc});
export {jAc,KAc,Q4o,Z4o,UYt,zAc,eqo,tqo,nqo};
