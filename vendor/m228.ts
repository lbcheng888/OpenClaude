// @ts-nocheck
import {zy,xU} from "./m23.ts";
import {jy,DU} from "./m60.ts";
import {T8o,S8o} from "./m215.ts";
import {DXt,gcr} from "./m209.ts";
import {Nde,KTt} from "./m90.ts";
import {gre,$Tt} from "./m70.ts";
import {qbt,hcr} from "./m208.ts";
import {FXt,Tcr} from "./m223.ts";
import {_8o,y8o} from "./m213.ts";
import {c8o,u8o} from "./m207.ts";
import {h8o,g8o} from "./m210.ts";
import {r8o,o8o} from "./m203.ts";
import {H8o,I8o} from "./m221.ts";
import {fre,FTt} from "./m48.ts";
import {q8o,W8o} from "./m227.ts";
import {N8o,F8o} from "./m225.ts";
import {p7e,LXt} from "./m214.ts";
import {VTt,_sr} from "./m84.ts";
import {Pre,u7e} from "./m206.ts";
import {YV,MLe} from "./m83.ts";
import {t8o,n8o} from "./m198.ts";
import {Qbe,Ubt} from "./m201.ts";
import {b} from "../runtime.ts";
function BXt(e,t,n,r,o,s){var i,a=t&_kc,l=t&ykc,c=t&Tkc;if(n)i=o?n(e,r,o,s):n(e);if(i!==void 0)return i;if(!zy(e))return e;var u=jy(e);if(u){if(i=T8o(e),!a)return DXt(e,i)}else{var d=Nde(e),p=d==V8o||d==Akc;if(gre(e))return qbt(e,a);if(d==K8o||d==G8o||p&&!o){if(i=l||p?{}:FXt(e),!a)return l?_8o(e,c8o(i,e)):h8o(e,r8o(i,e))}else{if(!tC[d])return o?e:{};i=H8o(e,d,a)}}s||(s=new fre);var m=s.get(e);if(m)return m;if(s.set(e,i),q8o(e))e.forEach(function(g){i.add(BXt(g,t,n,g,e,s))});else if(N8o(e))e.forEach(function(g,_){i.set(_,BXt(g,t,n,_,e,s))});var f=c?l?p7e:VTt:l?Pre:YV,h=u?void 0:f(e);return t8o(h||e,function(g,_){if(h)_=g,g=e[_];Qbe(i,_,BXt(g,t,n,_,e,s))}),i}
var _kc=1,ykc=2,Tkc=4,G8o="[object Arguments]",Skc="[object Array]",bkc="[object Boolean]",Ekc="[object Date]",Ckc="[object Error]",V8o="[object Function]",Akc="[object GeneratorFunction]",Rkc="[object Map]",vkc="[object Number]",K8o="[object Object]",wkc="[object RegExp]",kkc="[object Set]",Hkc="[object String]",Ikc="[object Symbol]",xkc="[object WeakMap]",Dkc="[object ArrayBuffer]",Pkc="[object DataView]",Okc="[object Float32Array]",Lkc="[object Float64Array]",Mkc="[object Int8Array]",Nkc="[object Int16Array]",Fkc="[object Int32Array]",Bkc="[object Uint8Array]",Ukc="[object Uint8ClampedArray]",$kc="[object Uint16Array]",qkc="[object Uint32Array]",tC,z8o;
var j8o=b(()=>{FTt();n8o();Ubt();o8o();u8o();hcr();gcr();g8o();y8o();_sr();LXt();KTt();S8o();I8o();Tcr();DU();$Tt();F8o();xU();W8o();MLe();u7e();tC={};tC[G8o]=tC[Skc]=tC[Dkc]=tC[Pkc]=tC[bkc]=tC[Ekc]=tC[Okc]=tC[Lkc]=tC[Mkc]=tC[Nkc]=tC[Fkc]=tC[Rkc]=tC[vkc]=tC[K8o]=tC[wkc]=tC[kkc]=tC[Hkc]=tC[Ikc]=tC[Bkc]=tC[Ukc]=tC[$kc]=tC[qkc]=!0;tC[Ckc]=tC[V8o]=tC[xkc]=!1;z8o=BXt});
export {BXt,_kc,ykc,Tkc,G8o,Skc,bkc,Ekc,Ckc,V8o,Akc,Rkc,vkc,K8o,wkc,kkc,Hkc,Ikc,xkc,Dkc,Pkc,Okc,Lkc,Mkc,Nkc,Fkc,Bkc,Ukc,$kc,qkc,tC,z8o,j8o};
