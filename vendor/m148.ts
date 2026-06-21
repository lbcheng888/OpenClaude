// @ts-nocheck
import {Ia,Yr,Wde} from "./m135.ts";
import {QWe,u$o,Drr} from "./m140.ts";
import {b} from "../runtime.ts";
class uSe{constructor(){zj.set(this,void 0),Yj.set(this,void 0),Ia(this,zj,new Uint8Array,"f"),Ia(this,Yj,null,"f")}decode(e){if(e==null)return[];let t=e instanceof ArrayBuffer?new Uint8Array(e):typeof e==="string"?QWe(e):e;Ia(this,zj,u$o([Yr(this,zj,"f"),t]),"f");let n=[],r;while((r=Thc(Yr(this,zj,"f"),Yr(this,Yj,"f")))!=null){if(r.carriage&&Yr(this,Yj,"f")==null){Ia(this,Yj,r.index,"f");continue}if(Yr(this,Yj,"f")!=null&&(r.index!==Yr(this,Yj,"f")+1||r.carriage)){n.push(Drr(Yr(this,zj,"f").subarray(0,Yr(this,Yj,"f")-1))),Ia(this,zj,Yr(this,zj,"f").subarray(Yr(this,Yj,"f")),"f"),Ia(this,Yj,null,"f");continue}let o=Yr(this,Yj,"f")!==null?r.preceding-1:r.preceding,s=Drr(Yr(this,zj,"f").subarray(0,o));n.push(s),Ia(this,zj,Yr(this,zj,"f").subarray(r.index),"f"),Ia(this,Yj,null,"f")}return n}flush(){if(!Yr(this,zj,"f").length)return[];return this.decode(`
`)}}
function Thc(e,t){for(let o=t??0;o<e.length;o++){if(e[o]===10)return{preceding:o,index:o+1,carriage:!1};if(e[o]===13)return{preceding:o,index:o+1,carriage:!0}}return null}
function E$o(e){for(let r=0;r<e.length-1;r++){if(e[r]===10&&e[r+1]===10)return r+2;if(e[r]===13&&e[r+1]===13)return r+2;if(e[r]===13&&e[r+1]===10&&r+3<e.length&&e[r+2]===13&&e[r+3]===10)return r+4}return-1}
var zj,Yj;
var Nrr=b(()=>{Wde();zj=new WeakMap,Yj=new WeakMap;uSe.NEWLINE_CHARS=new Set([`
`,"\r"]);uSe.NEWLINE_REGEXP=/\r\n|[\n\r]/g});
export {uSe,Thc,E$o,zj,Yj,Nrr};
