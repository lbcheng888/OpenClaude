// @ts-nocheck
import {nT,d2} from "./m64.ts";
import {Hde,dgt} from "./m72.ts";
import {bre,mgt} from "./m74.ts";
import {RWe,sKt} from "./m80.ts";
import {WFo,GFo} from "./m69.ts";
import {VTe,fgt} from "./m75.ts";
import {b} from "../runtime.ts";
function yfc(e,t){var n=nT(e),r=!n&&Hde(e),o=!n&&!r&&bre(e),s=!n&&!r&&!o&&RWe(e),i=n||r||o||s,a=i?WFo(e.length,String):[],l=a.length;for(var c in e)if((t||_fc.call(e,c))&&!(i&&(c=="length"||o&&(c=="offset"||c=="parent")||s&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||VTe(c,l))))a.push(c);return a}
var gfc,_fc,iKt;
var Ker=b(()=>{GFo();dgt();d2();mgt();fgt();sKt();gfc=Object.prototype,_fc=gfc.hasOwnProperty;iKt=yfc});
export {yfc,gfc,_fc,iKt,Ker};
