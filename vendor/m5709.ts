// @ts-nocheck
import {Zle} from "../src/tui/3835_mode.ts";
import {nR,Ax} from "./m5146.ts";
import {mio,FY} from "../src/permissions/3921_toolName.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function W4m(e){if(!Zle(e))return!1;if("isBackgrounded"in e&&e.isBackgrounded===!1)return!1;if(!nR(e.status))return!1;return!e.notified}
function ANo({tasks:e,waits:t,now:n}){let r=!1,o=new Set;for(let s of e){if(!W4m(s))continue;o.add(s.id);let i=t.get(s.id);if(!i)i={firstSeen:n,expired:!1},t.set(s.id,i);if(i.expired)continue;if(n-i.firstSeen>=mio){i.expired=!0,logForDebugging(`[print] task ${s.id} is terminal but its completion notification did not enqueue within ${mio}ms \u2014 exiting without it (enqueue dropped, or post-completion work still in flight)`,{level:"warn"});continue}r=!0}for(let s of t.keys())if(!o.has(s))t.delete(s);return r}
var _lc=b(()=>{Ax();FY();qe()});
export {W4m,ANo,_lc};
