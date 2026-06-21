// @ts-nocheck
import {b} from "../runtime.ts";
function CDa(e){return EDa.test(e)}
function Tlt(e){let t=EDa.exec(e);if(t){let n=t[0].codePointAt(0);throw new lU(`Refusing to send command containing control character U+${n.toString(16).padStart(4,"0").toUpperCase()} to terminal pane`)}}
function JUt(e){return e==="tmux"||e==="iterm2"}
var lU,EDa;
var XUt=b(()=>{lU=class lU extends Error{constructor(e){super(e);this.name="SwarmPaneError"}};EDa=/\p{Cc}/u});
export {CDa,Tlt,JUt,lU,EDa,XUt};
