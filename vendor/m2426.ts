// @ts-nocheck
import {getAttacherCaps,onAttacherCapsChange,lt} from "../src/session/0131_sent.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
import {Bvi} from "./m2425.ts";
function JR(e){let t=e?.env??process.env,n=getAttacherCaps()?.hyperlinks;if(n!==void 0)return n;let r=e?.stdoutSupported??$vi.default.supportsHyperlink(process.stdout);if("FORCE_HYPERLINK"in t)return r;if(r)return!0;let o=t.TERM_PROGRAM;if(o&&Fvi.includes(o))return!0;if(t.TERMINAL_EMULATOR==="JetBrains-JediTerm")return!0;if(o==="tmux"){let[a,l]=(t.TERM_PROGRAM_VERSION??"").split("."),c=parseInt(a??"",10),u=parseInt(l??"",10);if(c>3||c===3&&u>=4)return!0}let s=t.LC_TERMINAL;if(s&&Fvi.includes(s))return!0;if(t.TERM?.includes("kitty"))return!0;return!1}
function FSn(){return Uvi.useSyncExternalStore(onAttacherCapsChange,JR)}
var Uvi,$vi,Fvi;
var U4=b(()=>{lt();Uvi=M(Te(),1),$vi=M(Bvi(),1),Fvi=["ghostty","Hyper","kitty","alacritty","iTerm.app","iTerm2"]});
export {JR,FSn,Uvi,$vi,Fvi,U4};
