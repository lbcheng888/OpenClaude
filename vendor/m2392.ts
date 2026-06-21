// @ts-nocheck
import {b} from "../runtime.ts";
import {fZe,kZ} from "./m2370.ts";
function rad(e){let t=e.sequence??"",n=e.name??"";if(n==="space")return" ";if(e.ctrl)return n;if(t.length===1){let r=t.charCodeAt(0);if(r>=32&&r!==127)return t}if(n){if(e.shift&&n.length===1){let r=n.toUpperCase();if(r!==n&&r.length===1)return r}return n}if(t.charCodeAt(0)===27)return"";if(/^(\[<\d[\d;]*[Mm]?)+$/.test(t))return"";return t}
var RZe;
var z2r=b(()=>{fZe();RZe=class RZe extends kZ{key;name;sequence;ctrl;shift;meta;superKey;fn;constructor(e){super("keydown",{bubbles:!0,cancelable:!0});this.key=rad(e),this.name=e.name??"",this.sequence=e.sequence??"",this.ctrl=e.ctrl,this.shift=e.shift,this.meta=e.meta||e.option,this.superKey=e.super,this.fn=e.fn}}});
export {rad,RZe,z2r};
