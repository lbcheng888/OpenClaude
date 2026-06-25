// @ts-nocheck
import {b} from "../runtime.ts";
function YFa(e){return jFa.test(e)}
function but(e){let t=jFa.exec(e);if(t){let n=t[0].codePointAt(0);throw new kB(`Refusing to send command containing control character U+${n.toString(16).padStart(4,"0").toUpperCase()} to terminal pane`)}}
function E9t(e){return e==="tmux"||e==="iterm2"}
var kB,jFa;
var C9t=b(()=>{kB=class kB extends Error{constructor(e){super(e);this.name="SwarmPaneError"}};jFa=/\p{Cc}/u});
export {YFa,but,E9t,kB,jFa,C9t};
