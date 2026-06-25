// @ts-nocheck
import {Wx,hre} from "./m66.ts";
import {i5,OLe} from "./m22.ts";
import {d7e,PXt} from "./m211.ts";
import {b} from "../runtime.ts";
function dou(e){if(!Wx(e)||i5(e)!=iou)return!1;var t=d7e(e);if(t===null)return!0;var n=cou.call(t,"constructor")&&t.constructor;return typeof n=="function"&&n instanceof n&&nrs.call(n)==uou}
var iou="[object Object]",aou,lou,nrs,cou,uou,hje;
var Hrn=b(()=>{OLe();PXt();hre();aou=Function.prototype,lou=Object.prototype,nrs=aou.toString,cou=lou.hasOwnProperty,uou=nrs.call(Object);hje=dou});
export {dou,iou,aou,lou,nrs,cou,uou,hje,Hrn};
