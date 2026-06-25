// @ts-nocheck
import {b} from "../runtime.ts";
import {ftt,AZ} from "./m2380.ts";
function k_d(e){let t=e.sequence??"",n=e.name??"";if(n==="space")return" ";if(e.ctrl)return n;if(t.length===1){let r=t.charCodeAt(0);if(r>=32&&r!==127)return t}if(n){if(e.shift&&n.length===1){let r=n.toUpperCase();if(r!==n&&r.length===1)return r}return n}if(t.charCodeAt(0)===27)return"";if(/^(\[<\d[\d;]*[Mm]?)+$/.test(t))return"";return t}
var ktt;
var vqr=b(()=>{ftt();ktt=class ktt extends AZ{key;name;sequence;ctrl;shift;meta;superKey;fn;constructor(e){super("keydown",{bubbles:!0,cancelable:!0});this.key=k_d(e),this.name=e.name??"",this.sequence=e.sequence??"",this.ctrl=e.ctrl,this.shift=e.shift,this.meta=e.meta||e.option,this.superKey=e.super,this.fn=e.fn}}});
export {k_d,ktt,vqr};
