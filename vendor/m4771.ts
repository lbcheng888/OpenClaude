// @ts-nocheck
import {fp,__,Mf,initKp} from "./m609.ts";
import {Dl,lo} from "../src/tools/5190_userPromptCount.ts";
import {Fdt,eJ} from "./m4342.ts";
import {Ms,Pp} from "../src/config/2273_loggedTmuxCcDisable.ts";
import {b} from "../runtime.ts";
function u_l({enabled:e,isLoading:t,hasToolsInProgress:n}){if(!e)return null;if(t||n)return"indeterminate";return"completed"}
function d_l(e){if(e.type!=="user")return!1;let t=e.message.content[0];if(t?.type!=="text")return!1;if(!t.text.includes(`<${fp}`))return!1;if(Dl(t.text,__)!=="completed")return!1;return Dl(t.text,Mf)?.startsWith(Fdt)??!1}
function p_l(e,t){if(!Ms())return e;if(t)return e;let n=[],r=0;while(r<e.length){let o=e[r];if(d_l(o)){let s=0;while(r<e.length&&d_l(e[r]))s++,r++;if(s===1)n.push(o);else n.push({...o,message:{role:"user",content:[{type:"text",text:`<${fp}><${__}>completed</${__}><${Mf}>${s} background commands completed</${Mf}></${fp}>`}]}})}else n.push(o),r++}return n}
var m_l=b(()=>{initKp();eJ();Pp();lo()});
export {u_l,d_l,p_l,m_l};
