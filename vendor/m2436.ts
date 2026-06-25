// @ts-nocheck
import {getAttacherCaps,onAttacherCapsChange,lt} from "../src/session/0132_sent.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
import {exi} from "./m2435.ts";
function lw(e){let t=e?.env??process.env,n=getAttacherCaps()?.hyperlinks;if(n!==void 0)return n;let r=e?.stdoutSupported??rxi.default.supportsHyperlink(process.stdout);if("FORCE_HYPERLINK"in t)return r;if(r)return!0;let o=t.TERM_PROGRAM;if(o&&txi.includes(o))return!0;if(t.TERMINAL_EMULATOR==="JetBrains-JediTerm")return!0;if(o==="tmux"){let[a,l]=(t.TERM_PROGRAM_VERSION??"").split("."),c=parseInt(a??"",10),u=parseInt(l??"",10);if(c>3||c===3&&u>=4)return!0}let s=t.LC_TERMINAL;if(s&&txi.includes(s))return!0;if(t.TERM?.includes("kitty"))return!0;return!1}
function vAn(){return nxi.useSyncExternalStore(onAttacherCapsChange,lw)}
var nxi,rxi,txi;
var a4=b(()=>{lt();nxi=x(et(),1),rxi=x(exi(),1),txi=["ghostty","Hyper","kitty","alacritty","iTerm.app","iTerm2"]});
export {lw,vAn,nxi,rxi,txi,a4};
