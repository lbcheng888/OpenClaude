// @ts-nocheck
import {FF,w4r} from "./m2365.ts";
import {b} from "../runtime.ts";
function I4r(e){if(WCn.has(e))return e;if(k4r.has(e))return k4r.get(e);if(e.startsWith(GCn))return jhd;if(e=e.slice(2),e.startsWith("38"))return FF.color.close;else if(e.startsWith("48"))return FF.bgColor.close;let t=FF.codes.get(parseInt(e,10));if(t)return FF.color.ansi(t);else return FF.reset.open}
function QM(e){return e.map((t)=>t.code).join("")}
var Jki,Xki,Qki,WCn,k4r,GCn="\x1B]8;;",H4r,Zki="\x07",ugg,jhd;
var fPt=b(()=>{w4r();Jki=new Set([27,155]),Xki="[".codePointAt(0),Qki="]".codePointAt(0),WCn=new Set,k4r=new Map;for(let[e,t]of FF.codes)WCn.add(FF.color.ansi(t)),k4r.set(FF.color.ansi(e),FF.color.ansi(t));H4r=GCn.split("").map((e)=>e.charCodeAt(0)),ugg=Zki.charCodeAt(0),jhd=`\x1B]8;;${Zki}`});
export {I4r,QM,Jki,Xki,Qki,WCn,k4r,GCn,H4r,Zki,ugg,jhd,fPt};
