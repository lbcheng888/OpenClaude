// @ts-nocheck
import {X} from "../runtime.ts";
import {EQo} from "./m648.ts";
import {vQo} from "./m649.ts";
var kQo=X((Lyf,xQo)=>{var wQo=require("path"),Vzc=EQo(),Kzc=vQo();function RQo(e,t){let n=e.options.env||process.env,r=process.cwd(),o=e.options.cwd!=null,s=o&&process.chdir!==void 0&&!process.chdir.disabled;if(s)try{process.chdir(e.options.cwd)}catch(a){}let i;try{i=Vzc.sync(e.command,{path:n[Kzc({env:n})],pathExt:t?wQo.delimiter:void 0})}catch(a){}finally{if(s)process.chdir(r)}if(i)i=wQo.resolve(o?e.options.cwd:"",i);return i}function zzc(e){return RQo(e)||RQo(e,!0)}xQo.exports=zzc});
export {kQo};
