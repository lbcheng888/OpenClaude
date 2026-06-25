// @ts-nocheck
import {C_,lk} from "./m125.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {Ov,GN} from "./m640.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {u3} from "./m706.ts";
import {b} from "../runtime.ts";
function jje(e){DRt=e,C_()}
function vas(){DRt=null,uSr=void 0,dSr=!1}
function was(){dSr=!0}
function kas(){return dSr}
function _oe(e){return uSr=e,e}
function qpe(){return}
function Don(){return qpe()??Ras.join(or(),xau)}
function Dau(){try{let e=Ov(Don()),t=qt(u3(e));if(!t||typeof t!=="object"||Array.isArray(t))return null;return t}catch{return null}}
function Wpe(){if(!qpe()&&uSr!==!0)return null;if(DRt)return DRt;let e=Dau();if(e)return DRt=e,C_(),e;return null}
var Ras,xau="remote-settings.json",DRt=null,uSr,dSr=!1;
var PRt=b(()=>{dn();GN();lk();tn();Ras=require("path")});
export {jje,vas,was,kas,_oe,qpe,Don,Dau,Wpe,Ras,xau,DRt,uSr,dSr,PRt};
