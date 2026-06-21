// @ts-nocheck
import {xbt,zmr} from "./m618.ts";
import {Rbt,Kmr} from "./m615.ts";
import {nT,d2} from "./m64.ts";
import {bre,mgt} from "./m74.ts";
import {RWe,sKt} from "./m80.ts";
import {rXo,oXo} from "./m616.ts";
import {Zzt,qor} from "./m207.ts";
import {Ayt,$or} from "./m206.ts";
import {oYt,Wor} from "./m218.ts";
import {_7e,zen} from "./m617.ts";
import {Hde,dgt} from "./m72.ts";
import {iXo,aXo} from "./m619.ts";
import {tT,c2} from "./m13.ts";
import {mWe,N7t} from "./m14.ts";
import {sYt,Gor} from "./m221.ts";
import {b} from "../runtime.ts";
function XKc(e,t,n,r,o,s,i){var a=xbt(e,n),l=xbt(t,n),c=i.get(l);if(c){Rbt(e,n,c);return}var u=s?s(a,l,n+"",e,t,i):void 0,d=u===void 0;if(d){var p=nT(l),m=!p&&bre(l),f=!p&&!m&&RWe(l);if(u=l,p||m||f)if(nT(a))u=a;else if(rXo(a))u=Zzt(a);else if(m)d=!1,u=Ayt(l,!0);else if(f)d=!1,u=oYt(l,!0);else u=[];else if(_7e(l)||Hde(l)){if(u=a,Hde(a))u=iXo(a);else if(!tT(a)||mWe(a))u=sYt(l)}else d=!1}if(d)i.set(l,u),o(u,l,r,s,i),i.delete(l);Rbt(e,n,u)}
var lXo;
var cXo=b(()=>{Kmr();$or();Wor();qor();Gor();dgt();d2();oXo();mgt();N7t();c2();zen();sKt();zmr();aXo();lXo=XKc});
export {XKc,lXo,cXo};
