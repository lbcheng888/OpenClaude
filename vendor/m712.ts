// @ts-nocheck
import {f_,Kx} from "./m128.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {ER,bB} from "./m634.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {V3} from "./m701.ts";
import {b} from "../runtime.ts";
function J7e(e){sEt=e,f_()}
function Hts(){sEt=null,LAr=void 0,MAr=!1}
function Its(){MAr=!0}
function Dts(){return MAr}
function yoe(e){return LAr=e,e}
function Lpe(){return}
function Qtn(){return Lpe()??kts.join(tr(),AXc)}
function hXc(){try{let e=ER(Qtn()),t=qt(V3(e));if(!t||typeof t!=="object"||Array.isArray(t))return null;return t}catch{return null}}
function Mpe(){if(!Lpe()&&LAr!==!0)return null;if(sEt)return sEt;let e=hXc();if(e)return sEt=e,f_(),e;return null}
var kts,AXc="remote-settings.json",sEt=null,LAr,MAr=!1;
var iEt=b(()=>{sn();bB();Kx();Xt();kts=require("path")});
export {J7e,Hts,Its,Dts,yoe,Lpe,Qtn,hXc,Mpe,kts,AXc,sEt,LAr,MAr,iEt};
