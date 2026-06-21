// @ts-nocheck
import {Txe,Dxn} from "./m3029.ts";
import {h$e,kxn} from "./m3022.ts";
import {EGr,A$e} from "./m3020.ts";
import {b} from "../runtime.ts";
function _$e(e){let t=Txe(e);t.current=e,h$e((n)=>{let r=!1,o=EGr((s,i)=>{if(r)return;t.current(i,n)});return n.input.on("keypress",o),()=>{r=!0,n.input.removeListener("keypress",o)}},[])}
var mVi=b(()=>{Dxn();kxn();A$e()});
export {_$e,mVi};
