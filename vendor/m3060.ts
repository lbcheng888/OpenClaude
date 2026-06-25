// @ts-nocheck
import {A0n,eNt,R0n} from "./m3055.ts";
import {b,x} from "../runtime.ts";
import {cYr} from "./m3048.ts";
import {JQi} from "./m3059.ts";
function QQi(e){return e>0?cHe.default.cursorDown(e):""}
class w0n{rl;height=0;extraLinesUnderPrompt=0;cursorPos;constructor(e){this.rl=e,this.rl=e,this.cursorPos=e.getCursorPos()}write(e){this.rl.output.unmute(),this.rl.output.write(e),this.rl.output.mute()}render(e,t=""){let n=i6d(e),r=ZQi.default(n),o=r;if(this.rl.line.length>0)o=o.slice(0,-this.rl.line.length);this.rl.setPrompt(o),this.cursorPos=this.rl.getCursorPos();let s=A0n();if(e=eNt(e,s),t=eNt(t,s),r.length%s===0)e+=`
`;let i=e+(t?`
`+t:""),l=Math.floor(r.length/s)-this.cursorPos.rows+(t?XQi(t):0);if(l>0)i+=cHe.default.cursorUp(l);i+=cHe.default.cursorTo(this.cursorPos.cols),this.write(QQi(this.extraLinesUnderPrompt)+cHe.default.eraseLines(this.height)+i),this.extraLinesUnderPrompt=l,this.height=XQi(i)}checkCursorPos(){let e=this.rl.getCursorPos();if(e.cols!==this.cursorPos.cols)this.write(cHe.default.cursorTo(e.cols)),this.cursorPos=e}done({clearContent:e}){this.rl.setPrompt("");let t=QQi(this.extraLinesUnderPrompt);t+=e?cHe.default.eraseLines(this.height):`
`,t+=cHe.default.cursorShow,this.write(t),this.rl.close()}}
var ZQi,cHe,XQi=(e)=>e.split(`
`).length,i6d=(e)=>e.split(`
`).pop()??"";
var eZi=b(()=>{R0n();ZQi=x(cYr(),1),cHe=x(JQi(),1)});
export {QQi,w0n,ZQi,cHe,XQi,i6d,eZi};
