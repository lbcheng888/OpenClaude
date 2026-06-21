// @ts-nocheck
import {bc,Ug} from "./m2264.ts";
import {je} from "./m577.ts";
import {isShiftEnterKeyBindingInstalled,hasUsedBackslashReturn,Cwe} from "./m2517.ts";
import {b} from "../runtime.ts";
import {Lr} from "./m578.ts";
function Cne(){return bc("editorMode","normal").value==="vim"}
function Mul(){if(je.terminal==="Apple_Terminal")return"shift + \u23CE for newline";if(isShiftEnterKeyBindingInstalled())return"shift + \u23CE for newline";return hasUsedBackslashReturn()?"\\\u23CE for newline":"backslash (\\) + return (\u23CE) for newline"}
function Nul(e,t){if(t.ctrl||t.meta)return!1;if(MKp.has(e))return!1;return e.length>0&&!/^\s/.test(e)}
function Bul(e){return e.length>0&&".,?!:;)]".includes(e.charAt(0))}
var MKp;
var $6t=b(()=>{Cwe();Lr();Ug();MKp=new Set(["escape","return","enter","tab","backspace","delete","up","down","left","right","pageup","pagedown","home","end","insert","clear","center","undefined","mouse","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"])});
export {Cne,Mul,Nul,Bul,MKp,$6t};
