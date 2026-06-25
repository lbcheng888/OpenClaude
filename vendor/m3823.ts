// @ts-nocheck
import {Q} from "../runtime.ts";
import {zle} from "./m3791.ts";
import {wlo} from "./m3792.ts";
import {Dlo} from "./m3820.ts";
import {uMa} from "./m3821.ts";
import {l2n} from "./m3819.ts";
import {mMa} from "./m3822.ts";
import {LI} from "./m3796.ts";
import {q$t} from "./m3817.ts";
var hMa=Q((fMa,y0e)=>{(function(){var e,t,n,r,o,s,i,a,l;({assign:a,isFunction:l}=zle()),n=wlo(),r=Dlo(),o=uMa(),i=l2n(),s=mMa(),e=LI(),t=q$t(),y0e.exports.create=function(c,u,d,p){var m,f;if(c==null)throw Error("Root element needs a name.");if(p=a({},u,d,p),m=new r(p),f=m.element(c),!p.headless){if(m.declaration(p),p.pubID!=null||p.sysID!=null)m.dtd(p)}return f},y0e.exports.begin=function(c,u,d){if(l(c))[u,d]=[c,u],c={};if(u)return new o(c,u,d);else return new r(c)},y0e.exports.stringWriter=function(c){return new i(c)},y0e.exports.streamWriter=function(c,u){return new s(c,u)},y0e.exports.implementation=new n,y0e.exports.nodeType=e,y0e.exports.writerState=t}).call(fMa)});
export {hMa};
