// @ts-nocheck
import {fKe,lsr} from "./m55.ts";
import {mre,lKe} from "./m6.ts";
import {T4o,S4o} from "./m56.ts";
import {hKe,EYt} from "./m57.ts";
import {bYt,asr} from "./m54.ts";
import {b} from "../runtime.ts";
import {PLe,DP} from "./m19.ts";
function TCc(e,t,n,r,o,s,i){switch(n){case yCc:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case _Cc:if(e.byteLength!=t.byteLength||!s(new fKe(e),new fKe(t)))return!1;return!0;case lCc:case cCc:case pCc:return mre(+e,+t);case uCc:return e.name==t.name&&e.message==t.message;case mCc:case hCc:return e==t+"";case dCc:var a=T4o;case fCc:var l=r&iCc;if(a||(a=hKe),e.size!=t.size&&!l)return!1;var c=i.get(e);if(c)return c==t;r|=aCc,i.set(e,t);var u=bYt(a(e),a(t),r,o,s,i);return i.delete(e),u;case gCc:if(csr)return csr.call(e)==csr.call(t)}return!1}
var iCc=1,aCc=2,lCc="[object Boolean]",cCc="[object Date]",uCc="[object Error]",dCc="[object Map]",pCc="[object Number]",mCc="[object RegExp]",fCc="[object Set]",hCc="[object String]",gCc="[object Symbol]",_Cc="[object ArrayBuffer]",yCc="[object DataView]",b4o,csr,E4o;
var C4o=b(()=>{PLe();lsr();lKe();asr();S4o();EYt();b4o=DP?DP.prototype:void 0,csr=b4o?b4o.valueOf:void 0;E4o=TCc});
export {TCc,iCc,aCc,lCc,cCc,uCc,dCc,pCc,mCc,fCc,hCc,gCc,_Cc,yCc,b4o,csr,E4o,C4o};
