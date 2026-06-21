// @ts-nocheck
import {b} from "../runtime.ts";
import {E9i,b9i} from "./m2791.ts";
var EWr;
var C9i=b(()=>{E9i();EWr=class EWr extends TransformStream{constructor({onError:e,onRetry:t,onComment:n}={}){let r;super({start(o){r=b9i({onEvent:(s)=>{o.enqueue(s)},onError(s){e==="terminate"?o.error(s):typeof e=="function"&&e(s)},onRetry:t,onComment:n})},transform(o){r.feed(o)}})}}});
export {EWr,C9i};
