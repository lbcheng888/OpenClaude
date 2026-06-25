// @ts-nocheck
import {X_,GX} from "./m528.ts";
import {Hi,S5} from "./m467.ts";
import {b} from "../runtime.ts";
var f1e="1.15.2";
function MAt(e){let t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}
function E_r(e,t,n){let r=n&&n.Blob||X_.classes.Blob,o=MAt(e);if(t===void 0&&r)t=!0;if(o==="data"){e=o.length?e.slice(o.length+1):e;let s=WGc.exec(e);if(!s)throw new Hi("Invalid URL",Hi.ERR_INVALID_URL);let i=s[1],a=s[2],l=s[3],c=Buffer.from(decodeURIComponent(l),a?"base64":"utf8");if(t){if(!r)throw new Hi("Blob is not supported",Hi.ERR_NOT_SUPPORT);return new r([c],{type:i})}return c}throw new Hi("Unsupported protocol "+o,Hi.ERR_NOT_SUPPORT)}
var WGc;
var PZo=b(()=>{S5();GX();WGc=/^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/});
export {f1e,MAt,E_r,WGc,PZo};
