// @ts-nocheck
import {Q} from "../runtime.ts";
import {Sos} from "./m654.ts";
import {Eos} from "./m655.ts";
var vos=Q((nxf,Ros)=>{var Cos=require("path"),csu=Sos(),usu=Eos();function Aos(e,t){let n=e.options.env||process.env,r=process.cwd(),o=e.options.cwd!=null,s=o&&process.chdir!==void 0&&!process.chdir.disabled;if(s)try{process.chdir(e.options.cwd)}catch(a){}let i;try{i=csu.sync(e.command,{path:n[usu({env:n})],pathExt:t?Cos.delimiter:void 0})}catch(a){}finally{if(s)process.chdir(r)}if(i)i=Cos.resolve(o?e.options.cwd:"",i);return i}function dsu(e){return Aos(e)||Aos(e,!0)}Ros.exports=dsu});
export {vos};
