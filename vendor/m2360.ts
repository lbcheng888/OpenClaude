// @ts-nocheck
import {sn,mc} from "./m237.ts";
import {b} from "../runtime.ts";
function ctt(e){let t=UCn.get(e);if(t!==void 0)return t;let n=sn(e);if(UCn.size>=$hd)UCn.clear();return UCn.set(e,n),n}
var UCn,$hd=4096;
var $Cn=b(()=>{mc();UCn=new Map});
export {ctt,UCn,$hd,$Cn};
