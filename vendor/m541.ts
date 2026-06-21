// @ts-nocheck
import {Y_,KX} from "./m522.ts";
import {Ji,o8} from "./m461.ts";
import {b} from "../runtime.ts";
var SMe="1.15.2";
function ubt(e){let t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}
function Kpr(e,t,n){let r=n&&n.Blob||Y_.classes.Blob,o=ubt(e);if(t===void 0&&r)t=!0;if(o==="data"){e=o.length?e.slice(o.length+1):e;let s=M2c.exec(e);if(!s)throw new Ji("Invalid URL",Ji.ERR_INVALID_URL);let i=s[1],a=s[2],l=s[3],c=Buffer.from(decodeURIComponent(l),a?"base64":"utf8");if(t){if(!r)throw new Ji("Blob is not supported",Ji.ERR_NOT_SUPPORT);return new r([c],{type:i})}return c}throw new Ji("Unsupported protocol "+o,Ji.ERR_NOT_SUPPORT)}
var M2c;
var MKo=b(()=>{o8();KX();M2c=/^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/});
export {SMe,ubt,Kpr,M2c,MKo};
