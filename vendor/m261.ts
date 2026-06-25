// @ts-nocheck
import {b} from "../runtime.ts";
class IQt{constructor(e=[]){if(this.content=[],this.indent=0,this)this.args=e}indented(e){this.indent+=1,e(this),this.indent-=1}write(e){if(typeof e==="function"){e(this,{execution:"sync"}),e(this,{execution:"async"});return}let n=e.split(`
`).filter((s)=>s),r=Math.min(...n.map((s)=>s.length-s.trimStart().length)),o=n.map((s)=>s.slice(r)).map((s)=>" ".repeat(this.indent*2)+s);for(let s of o)this.content.push(s)}compile(){let e=Function,t=this?.args,r=[...(this?.content??[""]).map((o)=>`  ${o}`)];return new e(...t,r.join(`
`))}}
var version;
var cdr=b(()=>{version={major:4,minor:0,patch:0}});
export {IQt,version,cdr};
