// @ts-nocheck
import {b} from "../runtime.ts";
function nhc({remote:e,isNonInteractiveSession:t,isContinue:n,pendingAssistantChat:r,pendingConnectUrl:o,pendingSSHHost:s}){if(t)return!1;if(n)return!1;return e!==null||Boolean(r?.sessionId)||Boolean(r?.discover)||Boolean(o)||Boolean(s)}
function rhc(e,t){return e?null:t}
function h$o(e){if(thc.test(e))return e;if(e.includes("/")&&!/\s/.test(e)){for(let t of e.split(/[/?#]/))if(thc.test(t))return t}return null}
var thc;
var ohc=b(()=>{thc=/^(?:session|cse)_[A-Za-z0-9_]+$/});
export {nhc,rhc,h$o,thc,ohc};
