// @ts-nocheck
import {lc,mg} from "./m2209.ts";
import {Ne} from "./m583.ts";
import {isShiftEnterKeyBindingInstalled,hasUsedBackslashReturn,cwe} from "./m2528.ts";
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
function h6(){return lc("editorMode","normal").value==="vim"}
function $ml(){if(Ne.terminal==="Apple_Terminal")return"shift + \u23CE for newline";if(isShiftEnterKeyBindingInstalled())return"shift + \u23CE for newline";return hasUsedBackslashReturn()?"\\\u23CE for newline":"backslash (\\) + return (\u23CE) for newline"}
function qml(e,t){if(t.ctrl||t.meta)return!1;if(iXp.has(e))return!1;return e.length>0&&!/^\s/.test(e)}
function Wml(e){return e.length>0&&".,?!:;)]".includes(e.charAt(0))}
var iXp;
var zft=b(()=>{cwe();Ir();mg();iXp=new Set(["escape","return","enter","tab","backspace","delete","up","down","left","right","pageup","pagedown","home","end","insert","clear","center","undefined","mouse","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"])});
export {h6,$ml,qml,Wml,iXp,zft};
