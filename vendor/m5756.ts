// @ts-nocheck
import {cte} from "../src/tui/3853_mode.ts";
import {lv,vw} from "./m5178.ts";
import {zdo,_Y} from "../src/permissions/3988_toolName.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function XYm(e){if(!cte(e))return!1;if("isBackgrounded"in e&&e.isBackgrounded===!1)return!1;if(!lv(e.status))return!1;return!e.notified}
function s9o({tasks:e,waits:t,now:n}){let r=!1,o=new Set;for(let s of e){if(!XYm(s))continue;o.add(s.id);let i=t.get(s.id);if(!i)i={firstSeen:n,expired:!1},t.set(s.id,i);if(i.expired)continue;if(n-i.firstSeen>=zdo){i.expired=!0,logForDebugging(`[print] task ${s.id} is terminal but its completion notification did not enqueue within ${zdo}ms \u2014 exiting without it (enqueue dropped, or post-completion work still in flight)`,{level:"warn"});continue}r=!0}for(let s of t.keys())if(!o.has(s))t.delete(s);return r}
var wyc=b(()=>{vw();_Y();qe()});
export {XYm,s9o,wyc};
