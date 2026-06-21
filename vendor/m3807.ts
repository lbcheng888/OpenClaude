// @ts-nocheck
import {X} from "../runtime.ts";
import {Yle} from "./m3775.ts";
import {Wro} from "./m3776.ts";
import {Yro} from "./m3804.ts";
import {Gka} from "./m3805.ts";
import {gBn} from "./m3803.ts";
import {zka} from "./m3806.ts";
import {aI} from "./m3780.ts";
import {pUt} from "./m3801.ts";
var Jka=X((Yka,HHe)=>{(function(){var e,t,n,r,o,s,i,a,l;({assign:a,isFunction:l}=Yle()),n=Wro(),r=Yro(),o=Gka(),i=gBn(),s=zka(),e=aI(),t=pUt(),HHe.exports.create=function(c,u,d,p){var m,f;if(c==null)throw Error("Root element needs a name.");if(p=a({},u,d,p),m=new r(p),f=m.element(c),!p.headless){if(m.declaration(p),p.pubID!=null||p.sysID!=null)m.dtd(p)}return f},HHe.exports.begin=function(c,u,d){if(l(c))[u,d]=[c,u],c={};if(u)return new o(c,u,d);else return new r(c)},HHe.exports.stringWriter=function(c){return new i(c)},HHe.exports.streamWriter=function(c,u){return new s(c,u)},HHe.exports.implementation=new n,HHe.exports.nodeType=e,HHe.exports.writerState=t}).call(Yka)});
export {Jka};
