// @ts-nocheck
import {Lxn,wLt,Mxn} from "./m3045.ts";
import {b,M} from "../runtime.ts";
import {xGr} from "./m3038.ts";
import {r7i} from "./m3049.ts";
function s7i(e){return e>0?Sxe.default.cursorDown(e):""}
class Bxn{rl;height=0;extraLinesUnderPrompt=0;cursorPos;constructor(e){this.rl=e,this.rl=e,this.cursorPos=e.getCursorPos()}write(e){this.rl.output.unmute(),this.rl.output.write(e),this.rl.output.mute()}render(e,t=""){let n=v1d(e),r=i7i.default(n),o=r;if(this.rl.line.length>0)o=o.slice(0,-this.rl.line.length);this.rl.setPrompt(o),this.cursorPos=this.rl.getCursorPos();let s=Lxn();if(e=wLt(e,s),t=wLt(t,s),r.length%s===0)e+=`
`;let i=e+(t?`
`+t:""),l=Math.floor(r.length/s)-this.cursorPos.rows+(t?o7i(t):0);if(l>0)i+=Sxe.default.cursorUp(l);i+=Sxe.default.cursorTo(this.cursorPos.cols),this.write(s7i(this.extraLinesUnderPrompt)+Sxe.default.eraseLines(this.height)+i),this.extraLinesUnderPrompt=l,this.height=o7i(i)}checkCursorPos(){let e=this.rl.getCursorPos();if(e.cols!==this.cursorPos.cols)this.write(Sxe.default.cursorTo(e.cols)),this.cursorPos=e}done({clearContent:e}){this.rl.setPrompt("");let t=s7i(this.extraLinesUnderPrompt);t+=e?Sxe.default.eraseLines(this.height):`
`,t+=Sxe.default.cursorShow,this.write(t),this.rl.close()}}
var i7i,Sxe,o7i=(e)=>e.split(`
`).length,v1d=(e)=>e.split(`
`).pop()??"";
var a7i=b(()=>{Mxn();i7i=M(xGr(),1),Sxe=M(r7i(),1)});
export {s7i,Bxn,i7i,Sxe,o7i,v1d,a7i};
