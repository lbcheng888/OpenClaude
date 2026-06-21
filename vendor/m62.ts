// @ts-nocheck
import {SWe,Uer} from "./m59.ts";
import {_re,AWe} from "./m29.ts";
import {BFo,FFo} from "./m60.ts";
import {bWe,z7t} from "./m61.ts";
import {K7t,Fer} from "./m58.ts";
import {b} from "../runtime.ts";
import {NOe,dO} from "./m9.ts";
function gmc(e,t,n,r,o,s,i){switch(n){case hmc:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case Amc:if(e.byteLength!=t.byteLength||!s(new SWe(e),new SWe(t)))return!1;return!0;case imc:case amc:case umc:return _re(+e,+t);case lmc:return e.name==t.name&&e.message==t.message;case dmc:case mmc:return e==t+"";case cmc:var a=BFo;case pmc:var l=r&omc;if(a||(a=bWe),e.size!=t.size&&!l)return!1;var c=i.get(e);if(c)return c==t;r|=smc,i.set(e,t);var u=K7t(a(e),a(t),r,o,s,i);return i.delete(e),u;case fmc:if($er)return $er.call(e)==$er.call(t)}return!1}
var omc=1,smc=2,imc="[object Boolean]",amc="[object Date]",lmc="[object Error]",cmc="[object Map]",umc="[object Number]",dmc="[object RegExp]",pmc="[object Set]",mmc="[object String]",fmc="[object Symbol]",Amc="[object ArrayBuffer]",hmc="[object DataView]",UFo,$er,$Fo;
var qFo=b(()=>{NOe();Uer();AWe();Fer();FFo();z7t();UFo=dO?dO.prototype:void 0,$er=UFo?UFo.valueOf:void 0;$Fo=gmc});
export {gmc,omc,smc,imc,amc,lmc,cmc,umc,dmc,pmc,mmc,fmc,Amc,hmc,UFo,$er,$Fo,qFo};
