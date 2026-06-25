// @ts-nocheck
import {b} from "../runtime.ts";
class vAi{proc;constructor(e=process){this.proc=e}isJetBrainsIdeTerminal(){return this.proc.env.TERMINAL_EMULATOR==="JetBrains-JediTerm"}isMicrosoftWindowsTerminal(){return this.proc.platform==="win32"&&!!this.proc.env.WT_SESSION}isGhostty(){return this.proc.env.TERM==="xterm-ghostty"||this.proc.env.TERM_PROGRAM==="ghostty"}isMintty(){if(this.proc.env.TERM_PROGRAM==="mintty")return!0;if(this.proc.platform==="win32"&&this.proc.env.MSYSTEM)return!0;return!1}windowsConsoleSupportsVirtualTerminalSequences(){if(this.isMicrosoftWindowsTerminal())return!0;if(this.proc.platform==="win32"&&this.proc.env.TERM_PROGRAM==="vscode"&&this.proc.env.TERM_PROGRAM_VERSION)return!0;if(this.isMintty())return!0;return!1}hasGeometricShapesInkBleedBug(){return this.isGhostty()}hasOsc52ClipboardUtf8Bug(){if(this.proc.env.TERM_PROGRAM!=="vscode")return!1;let e=Fud(this.proc.env.TERM_PROGRAM_VERSION);return e!==null&&e>=1123000&&e<1125000}macCmdClickArrivesWithoutSgrModifierBit(){return this.proc.platform==="darwin"&&this.proc.env.TERM_PROGRAM==="ghostty"}}
function Fud(e){if(!e)return null;let t=/^(\d+)\.(\d+)\.(\d+)/.exec(e);if(!t)return null;return+t[1]*1e6+ +t[2]*1000+ +t[3]}
var YM;
var Tve=b(()=>{YM=new vAi});
export {vAi,Fud,YM,Tve};
