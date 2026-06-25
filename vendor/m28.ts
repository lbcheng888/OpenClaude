// @ts-nocheck
import {zy,xU} from "./m23.ts";
import {M3o,N3o} from "./m26.ts";
import {uKe,fYt} from "./m24.ts";
import {Ode,rsr} from "./m27.ts";
import {b} from "../runtime.ts";
function AEc(e){if(!zy(e)||M3o(e))return!1;var t=uKe(e)?CEc:yEc;return t.test(Ode(e))}
var _Ec,yEc,TEc,SEc,bEc,EEc,CEc,F3o;
var B3o=b(()=>{fYt();N3o();xU();rsr();_Ec=/[\\^$.*+?()[\]{}|]/g,yEc=/^\[object .+?Constructor\]$/,TEc=Function.prototype,SEc=Object.prototype,bEc=TEc.toString,EEc=SEc.hasOwnProperty,CEc=RegExp("^"+bEc.call(EEc).replace(_Ec,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");F3o=AEc});
export {AEc,_Ec,yEc,TEc,SEc,bEc,EEc,CEc,F3o,B3o};
