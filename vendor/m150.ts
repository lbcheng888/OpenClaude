// @ts-nocheck
import {ma,Xr,Qde} from "./m137.ts";
import {jKe,t5o,alr} from "./m142.ts";
import {b} from "../runtime.ts";
class Vbe{constructor(){u5.set(this,void 0),d5.set(this,void 0),ma(this,u5,new Uint8Array,"f"),ma(this,d5,null,"f")}decode(e){if(e==null)return[];let t=e instanceof ArrayBuffer?new Uint8Array(e):typeof e==="string"?jKe(e):e;ma(this,u5,t5o([Xr(this,u5,"f"),t]),"f");let n=[],r;while((r=Avc(Xr(this,u5,"f"),Xr(this,d5,"f")))!=null){if(r.carriage&&Xr(this,d5,"f")==null){ma(this,d5,r.index,"f");continue}if(Xr(this,d5,"f")!=null&&(r.index!==Xr(this,d5,"f")+1||r.carriage)){n.push(alr(Xr(this,u5,"f").subarray(0,Xr(this,d5,"f")-1))),ma(this,u5,Xr(this,u5,"f").subarray(Xr(this,d5,"f")),"f"),ma(this,d5,null,"f");continue}let o=Xr(this,d5,"f")!==null?r.preceding-1:r.preceding,s=alr(Xr(this,u5,"f").subarray(0,o));n.push(s),ma(this,u5,Xr(this,u5,"f").subarray(r.index),"f"),ma(this,d5,null,"f")}return n}flush(){if(!Xr(this,u5,"f").length)return[];return this.decode(`
`)}}
function Avc(e,t){for(let o=t??0;o<e.length;o++){if(e[o]===10)return{preceding:o,index:o+1,carriage:!1};if(e[o]===13)return{preceding:o,index:o+1,carriage:!0}}return null}
function f5o(e){for(let r=0;r<e.length-1;r++){if(e[r]===10&&e[r+1]===10)return r+2;if(e[r]===13&&e[r+1]===13)return r+2;if(e[r]===13&&e[r+1]===10&&r+3<e.length&&e[r+2]===13&&e[r+3]===10)return r+4}return-1}
var u5,d5;
var plr=b(()=>{Qde();u5=new WeakMap,d5=new WeakMap;Vbe.NEWLINE_CHARS=new Set([`
`,"\r"]);Vbe.NEWLINE_REGEXP=/\r\n|[\n\r]/g});
export {Vbe,Avc,f5o,u5,d5,plr};
