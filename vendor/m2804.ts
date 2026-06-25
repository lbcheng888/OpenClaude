// @ts-nocheck
import {b} from "../runtime.ts";
import {fWi,mWi} from "./m2803.ts";
var rjr;
var hWi=b(()=>{fWi();rjr=class rjr extends TransformStream{constructor({onError:e,onRetry:t,onComment:n}={}){let r;super({start(o){r=mWi({onEvent:(s)=>{o.enqueue(s)},onError(s){e==="terminate"?o.error(s):typeof e=="function"&&e(s)},onRetry:t,onComment:n})},transform(o){r.feed(o)}})}}});
export {rjr,hWi};
