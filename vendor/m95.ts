// @ts-nocheck
import {nT,d2} from "./m64.ts";
import {Ide,_gt} from "./m94.ts";
import {bre,mgt} from "./m74.ts";
import {Tre,ugt} from "./m52.ts";
import {RWe,sKt} from "./m80.ts";
import {K7t,Fer} from "./m58.ts";
import {$Fo,qFo} from "./m62.ts";
import {aUo,lUo} from "./m89.ts";
import {b} from "../runtime.ts";
function Vfc(e,t,n,r,o,s){var i=nT(e),a=nT(t),l=i?_Uo:Ide(e),c=a?_Uo:Ide(t);l=l==gUo?pKt:l,c=c==gUo?pKt:c;var u=l==pKt,d=c==pKt,p=l==c;if(p&&bre(e)){if(!bre(t))return!1;i=!0,u=!1}if(p&&!u)return s||(s=new Tre),i||RWe(e)?K7t(e,t,n,r,o,s):$Fo(e,t,l,n,r,o,s);if(!(n&Wfc)){var m=u&&yUo.call(e,"__wrapped__"),f=d&&yUo.call(t,"__wrapped__");if(m||f){var A=m?e.value():e,h=f?t.value():t;return s||(s=new Tre),o(A,h,n,r,s)}}if(!p)return!1;return s||(s=new Tre),aUo(e,t,n,r,o,s)}
var Wfc=1,gUo="[object Arguments]",_Uo="[object Array]",pKt="[object Object]",Gfc,yUo,TUo;
var SUo=b(()=>{ugt();Fer();qFo();lUo();_gt();d2();mgt();sKt();Gfc=Object.prototype,yUo=Gfc.hasOwnProperty;TUo=Vfc});
export {Vfc,Wfc,gUo,_Uo,pKt,Gfc,yUo,TUo,SUo};
