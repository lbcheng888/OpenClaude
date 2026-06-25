// @ts-nocheck
import {isTmuxControlMode,Po} from "./m638.ts";
import {Wt,ps} from "./m230.ts";
import {A_,zf} from "./m133.ts";
import {Yt,Es} from "./m641.ts";
import {M1e,r2} from "../src/config/0646_existsSync.ts";
import {b} from "../runtime.ts";
import {VT} from "./m648.ts";
function hs(e,t){let n=t??isTmuxControlMode()??Wt().cwd();if(typeof e!=="string")throw TypeError(`Path must be a string, received ${typeof e}`);if(typeof n!=="string")throw TypeError(`Base directory must be a string, received ${typeof n}`);if(e.includes("\x00")||n.includes("\x00"))throw Error("Path contains null bytes");let r=e.trim();if(!r)return A_(lM.normalize(n));if(r==="~")return A_(zrn.homedir());if(r.startsWith("~/"))return A_(lM.join(zrn.homedir(),r.slice(2)));let o=r;if(Yt()==="windows"&&r.match(/^\/[a-z]\//i))try{o=M1e(r)}catch{o=r}if(lM.isAbsolute(o))return A_(lM.normalize(o));return A_(lM.resolve(n,o))}
function Cje(e){let t=lM.relative(isTmuxControlMode(),e);return t.startsWith("..")?e:t}
function VN(e){let t=hs(e);if(t.startsWith("\\\\")||t.startsWith("//"))return lM.dirname(t);try{if(Wt().statSync(t).isDirectory())return t}catch{}return lM.dirname(t)}
function uoe(e){return/(?:^|[\\/])\.\.(?:[\\/]|$)/.test(e)}
function WP(e){let t=zrn.homedir();if(e===t)return"~";if(e.startsWith(t+lM.sep))return"~"+e.slice(t.length);return e}
function NK(e){let t=lM.normalize(e);if(Yt()==="windows")return t.replaceAll("\\","/");return t}
var zrn,lM;
var Tu=b(()=>{zf();Po();ps();Es();r2();VT();zrn=require("os"),lM=require("path")});
export {hs,Cje,VN,uoe,WP,NK,zrn,lM,Tu};
