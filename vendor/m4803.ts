// @ts-nocheck
import {bc,Qd,Fu,Ud} from "./m615.ts";
import {fl,po} from "../src/tools/5224_userPromptCount.ts";
import {Fmt,vG} from "./m4362.ts";
import {Cs,tp} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {b} from "../runtime.ts";
function avl({enabled:e,isLoading:t,hasToolsInProgress:n}){if(!e)return null;if(t||n)return"indeterminate";return"completed"}
function lvl(e){if(e.type!=="user")return!1;let t=e.message.content[0];if(t?.type!=="text")return!1;if(!t.text.includes(`<${bc}`))return!1;if(fl(t.text,Qd)!=="completed")return!1;return fl(t.text,Fu)?.startsWith(Fmt)??!1}
function cvl(e,t){if(!Cs())return e;if(t)return e;let n=[],r=0;while(r<e.length){let o=e[r];if(lvl(o)){let s=0;while(r<e.length&&lvl(e[r]))s++,r++;if(s===1)n.push(o);else n.push({...o,message:{role:"user",content:[{type:"text",text:`<${bc}><${Qd}>completed</${Qd}><${Fu}>${s} background commands completed</${Fu}></${bc}>`}]}})}else n.push(o),r++}return n}
var uvl=b(()=>{Ud();vG();tp();po()});
export {avl,lvl,cvl,uvl};
