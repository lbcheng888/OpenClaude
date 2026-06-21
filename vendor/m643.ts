// @ts-nocheck
import {Pt,Go} from "./m632.ts";
import {jt,ws} from "./m228.ts";
import {A_,ng} from "./m132.ts";
import {zt,qs} from "./m635.ts";
import {jMe,L2} from "../src/config/0640_existsSync.ts";
import {b} from "../runtime.ts";
import {QT} from "./m642.ts";
function Ds(e,t){let n=t??Pt()??jt().cwd();if(typeof e!=="string")throw TypeError(`Path must be a string, received ${typeof e}`);if(typeof n!=="string")throw TypeError(`Base directory must be a string, received ${typeof n}`);if(e.includes("\x00")||n.includes("\x00"))throw Error("Path contains null bytes");let r=e.trim();if(!r)return A_(zM.normalize(n));if(r==="~")return A_(ptn.homedir());if(r.startsWith("~/"))return A_(zM.join(ptn.homedir(),r.slice(2)));let o=r;if(zt()==="windows"&&r.match(/^\/[a-z]\//i))try{o=jMe(r)}catch{o=r}if(zM.isAbsolute(o))return A_(zM.normalize(o));return A_(zM.resolve(n,o))}
function w7e(e){let t=zM.relative(Pt(),e);return t.startsWith("..")?e:t}
function EB(e){let t=Ds(e);if(t.startsWith("\\\\")||t.startsWith("//"))return zM.dirname(t);try{if(jt().statSync(t).isDirectory())return t}catch{}return zM.dirname(t)}
function poe(e){return/(?:^|[\\/])\.\.(?:[\\/]|$)/.test(e)}
function EO(e){let t=ptn.homedir();if(e===t)return"~";if(e.startsWith(t+zM.sep))return"~"+e.slice(t.length);return e}
function u7(e){return zM.normalize(e).replaceAll("\\","/")}
var ptn,zM;
var Iu=b(()=>{ng();Go();ws();qs();L2();QT();ptn=require("os"),zM=require("path")});
export {Ds,w7e,EB,poe,EO,u7,ptn,zM,Iu};
