// @ts-nocheck
import {b} from "../runtime.ts";
function mic({remote:e,isNonInteractiveSession:t,isContinue:n,pendingAssistantChat:r,pendingConnectUrl:o,pendingSSHHost:s}){if(t)return!1;if(n)return!1;return e!==null||Boolean(r?.sessionId)||Boolean(r?.discover)||Boolean(o)||Boolean(s)}
function fic(e,t){return e?null:t}
function j1o(e){if(pic.test(e))return e;if(e.includes("/")&&!/\s/.test(e)){for(let t of e.split(/[/?#]/))if(pic.test(t))return t}return null}
var pic;
var Aic=b(()=>{pic=/^(?:session|cse)_[A-Za-z0-9_]+$/});
export {mic,fic,j1o,pic,Aic};
