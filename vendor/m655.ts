// @ts-nocheck
import {X} from "../runtime.ts";
import {kQo} from "./m650.ts";
import {HQo} from "./m651.ts";
import {MQo} from "./m654.ts";
var UQo=X((Uyf,FQo)=>{var eYc=require("path"),NQo=kQo(),BQo=HQo(),tYc=MQo(),nYc=/\.(?:com|exe)$/i,rYc=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function oYc(e){e.file=NQo(e);let t=e.file&&tYc(e.file);if(t)return e.args.unshift(e.file),e.command=t,NQo(e);return e.file}function sYc(e){return e}function iYc(e,t,n){if(t&&!Array.isArray(t))n=t,t=null;t=t?t.slice(0):[],n=Object.assign({},n);let r={command:e,args:t,options:n,file:void 0,original:{command:e,args:t}};return n.shell?r:sYc(r)}FQo.exports=iYc});
export {UQo};
