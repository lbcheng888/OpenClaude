// @ts-nocheck
import {b} from "../runtime.ts";
class eTi{proc;constructor(e=process){this.proc=e}isJetBrainsIdeTerminal(){return this.proc.env.TERMINAL_EMULATOR==="JetBrains-JediTerm"}isMicrosoftWindowsTerminal(){return this.proc.platform==="win32"&&!!this.proc.env.WT_SESSION}isGhostty(){return this.proc.env.TERM==="xterm-ghostty"||this.proc.env.TERM_PROGRAM==="ghostty"}isMintty(){if(this.proc.env.TERM_PROGRAM==="mintty")return!0;if(this.proc.platform==="win32"&&this.proc.env.MSYSTEM)return!0;return!1}windowsConsoleSupportsVirtualTerminalSequences(){if(this.isMicrosoftWindowsTerminal())return!0;if(this.proc.platform==="win32"&&this.proc.env.TERM_PROGRAM==="vscode"&&this.proc.env.TERM_PROGRAM_VERSION)return!0;if(this.isMintty())return!0;return!1}hasGeometricShapesInkBleedBug(){return this.isGhostty()}}
var die;
var rZe=b(()=>{die=new eTi});
export {eTi,die,rZe};
